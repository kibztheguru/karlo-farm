"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    console.log("📡 Fetching gallery images...");

    const { data, error } = await supabase
      .from("gallery")
      .select("*");

    console.log("📦 RAW RESPONSE DATA:", data);
    console.log("❌ RAW RESPONSE ERROR:", error);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold text-green-700">
        Gallery Debug Page
      </h1>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          <p>❌ Error: {error}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && <p>Loading images...</p>}

      {/* DEBUG INFO */}
      <div className="bg-gray-100 p-3 rounded text-sm">
        <p><strong>Total Images:</strong> {images.length}</p>
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {images.map((img, index) => (
          <div key={index} className="border rounded p-2">

            <p className="text-xs text-gray-500 mb-1">
              ID: {img.id}
            </p>

            <p className="text-xs text-gray-500 mb-2 break-all">
              URL: {img.image}
            </p>

            <img
              src={img.image}
              alt="gallery"
              className="w-full h-40 object-cover rounded"
              onError={(e) => {
                console.log("❌ Image failed to load:", img.image);
              }}
            />

          </div>
        ))}

      </div>

    </div>
  );
}