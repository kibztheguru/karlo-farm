"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string | null;
  image: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("📦 Gallery data:", data);
      console.log("❌ Gallery error:", error);

      if (error) {
        console.log(error.message);
      } else {
        setImages(data || []);
      }

      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading gallery...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No images found
      </div>
    );
  }

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
          Our Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow">

              <img
                src={img.image}
                alt={img.title || "gallery"}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
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