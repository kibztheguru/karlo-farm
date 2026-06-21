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

    const fileName = `${Date.now()}-${file.name}`;

    // upload file
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    // get URL
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    // save DB
    const { error: dbError } = await supabase
      .from("gallery")
      .insert([{ image: data.publicUrl }]);

    if (dbError) {
      setError(dbError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
    fetchImages();
  };

  // DELETE
  const deleteImage = async (id: string, imageUrl: string) => {
    const fileName = imageUrl.split("/").pop();

    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    await supabase.from("gallery").delete().eq("id", id);

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Gallery Admin
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">
          {error}
        </div>
      )}

      {/* UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-6"
      />

      {uploading && (
        <p className="text-sm text-gray-500 mb-4">
          Uploading...
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {images.map((img) => (
          <div key={img.id} className="relative bg-white shadow">

            <img
              src={img.image}
              className="w-full h-40 object-cover"
            />

            <button
              onClick={() => deleteImage(img.id, img.image)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1"
            >
              X
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}