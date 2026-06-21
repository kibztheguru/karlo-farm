import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string | null;
  image: string;
};

export default async function Gallery() {
  const { data: images, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("📦 Gallery data:", images);
  console.log("❌ Gallery error:", error);

  // ERROR STATE
  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        Failed to load gallery: {error.message}
      </div>
    );
  }

  // EMPTY STATE
  if (!images || images.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No images found in gallery
      </div>
    );
  }

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
            Our Gallery
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Take a closer look at our farm, our produce, and our daily operations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {images.map((image: GalleryItem) => (
            <div
              key={image.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >

              {/* SAFE IMAGE (NO Next/Image CRASH) */}
              <img
                src={image.image}
                alt={image.title || "Gallery image"}
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition duration-500"
                onError={(e) => {
                  console.log("❌ Image failed:", image.image);
                }}
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-black">
                  {image.title || "Farm Image"}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Kalro Farm • Nakuru, Kenya
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}