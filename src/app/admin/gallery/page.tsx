"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  image: string;
  created_at: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH IMAGES
  const fetchImages = async () => {
    setError(null);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("📦 FETCH RESULT:", data);
    console.log("❌ FETCH ERROR:", error);

    if (error) {
      setError(error.message);
      return;
    }

    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // UPLOAD IMAGE
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      // 1. Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;

      // 3. Insert into DB
      const { error: dbError } = await supabase
        .from("gallery")
        .insert([{ image: imageUrl }]);

      if (dbError) {
        setError(dbError.message);
        setUploading(false);
        return;
      }

      fetchImages();
    } catch (err) {
      setError("Unexpected error occurred");
    }

    setUploading(false);
  };

  // DELETE IMAGE
  const deleteImage = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Delete this image?");
    if (!confirmDelete) return;

    try {
      const fileName = imageUrl.split("/").pop();

      if (fileName) {
        await supabase.storage
          .from("gallery")
          .remove([fileName]);
      }

      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (error) {
        setError(error.message);
        return;
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-green-700">
        Gallery Manager
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          ❌ {error}
        </div>
      )}

      {/* UPLOAD */}
      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full"
        />

        {uploading && (
          <p className="text-sm text-gray-500 mt-2">
            Uploading image...
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {images.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-xl overflow-hidden shadow"
          >
            <img
              src={img.image}
              className="w-full h-40 object-cover"
            />

            <button
              onClick={() => deleteImage(img.id, img.image)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}