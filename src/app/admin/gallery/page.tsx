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

  // FETCH IMAGES
  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

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

    const fileName = `${Date.now()}-${file.name}`;

    // upload to storage
    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (error) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    // get public URL
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    // save to database
    await supabase.from("gallery").insert([
      {
        image: data.publicUrl,
      },
    ]);

    setUploading(false);
    fetchImages();
  };

  // DELETE IMAGE
  const deleteImage = async (id: string) => {
    await supabase.from("gallery").delete().eq("id", id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-green-700">
        Gallery Manager
      </h1>

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

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteImage(img.id)}
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