"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  image: string;
  title: string | null;
  created_at: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("📦 Gallery data:", data);
      console.log("❌ Gallery error:", error);

      if (error) {
        setError(error.message);
      } else {
        setImages(data || []);
      }

      setLoading(false);
    };

    fetchGallery();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading gallery...
      </section>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <section className="py-20 text-center text-red-600">
        Error loading gallery: {error}
      </section>
    );
  }

  // EMPTY STATE
  if (images.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500">
        No images found in gallery
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
          Our Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              {/* IMAGE */}
              <img
                src={img.image}
                alt={img.title || "Gallery image"}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  console.log("❌ Image failed to load:", img.image);
                }}
              />

              {/* TITLE */}
              <div className="p-4">
                <h3 className="font-semibold text-black">
                  {img.title || "Farm Image"}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}