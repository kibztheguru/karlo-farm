import Image from "next/image";

const images = [
  {
    src: "/images/farm1.jpg",
    title: "Fresh Farm Produce",
  },
  {
    src: "/images/farm2.jpg",
    title: "Healthy Crops",
  },
  {
    src: "/images/farm3.jpg",
    title: "Quality Harvest",
  },
  {
    src: "/images/farm4.jpg",
    title: "Sustainable Farming",
  },
  {
    src: "/images/farm5.jpg",
    title: "Farm Operations",
  },
  {
    src: "/images/farm6.jpg",
    title: "Premium Products",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
            Our Gallery
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Take a closer look at our farm, our produce, and the
            dedication that goes into delivering quality agricultural
            products to our customers.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {images.map((image, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={600}
                  height={400}
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-black">
                  {image.title}
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