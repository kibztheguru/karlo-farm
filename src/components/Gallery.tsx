"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  image: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-green-800 text-center mb-10">
          Our Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow">
              <img
                src={img.image}
                alt="Gallery image"
                className="w-full h-64 object-cover"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}