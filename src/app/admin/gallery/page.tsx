"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  image: string;
  created_at: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Track which item is deleting
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FETCH
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // UPLOAD
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    // Clean filename to avoid URL breaking characters
    const cleanFileName = file.name.replace(/[^\w.-]/g, "");
    const fileName = `${Date.now()}-${cleanFileName}`;

    try {
      // 1. Upload file to Storage
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL (Synchronous)
      const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
      if (!data?.publicUrl) throw new Error("Could not generate public URL");

      // 3. Save to Database
      const { error: dbError } = await supabase
        .from("gallery")
        .insert([{ image: data.publicUrl }]);

      if (dbError) throw dbError;

      // Success adjustments
      fetchImages();
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    } catch (err: any) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  // DELETE
  const deleteImage = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    setDeletingId(id);
    setError(null);

    try {
      // Extract filename safely, discarding any query strings if present
      const urlWithoutQueries = imageUrl.split("?")[0];
      const fileName = urlWithoutQueries.split("/").pop();

      if (!fileName) throw new Error("Invalid image URL layout");

      // 1. Remove from Storage
      const { error: storageError } = await supabase.storage
        .from("gallery")
        .remove([fileName]);
      
      if (storageError) throw storageError;

      // 2. Remove from Database
      const { error: dbError } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // Optimistic UI update or local filter
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred during deletion");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Gallery Admin</h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded border border-red-200">
          {error}
        </div>
      )}

      {/* UPLOAD */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="mb-6 disabled:opacity-50"
      />

      {uploading && (
        <p className="text-sm text-gray-500 mb-4 animate-pulse">Uploading...</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative bg-white shadow group overflow-hidden rounded">
            <img
              src={img.image}
              alt="Gallery item"
              className="w-full h-40 object-cover"
              loading="lazy"
            />

            <button
              onClick={() => deleteImage(img.id, img.image)}
              disabled={deletingId === img.id}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
            >
              {deletingId === img.id ? "..." : "X"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}