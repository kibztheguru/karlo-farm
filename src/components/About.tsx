export default function About() {
  return (
    <section id="story" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700">
            Our Story
          </h2>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Kalro Farm is dedicated to providing high-quality farm products
            to families, businesses, and communities across Kenya.
            Located in Nakuru, we combine modern farming practices with
            a commitment to quality, sustainability, and customer satisfaction.
          </p>
        </div>

      </div>

      {/* Curved Transition */}
      <div className="mt-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f0fdf4"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}