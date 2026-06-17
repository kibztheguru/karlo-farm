export default function Hero() {
  return (
  <section
  id="home"
  className="relative min-h-screen flex items-center justify-center pt-24"
>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">

        <span className="inline-block bg-green-700/80 px-4 py-2 rounded-full text-sm mb-6">
          Premium Agricultural Products
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Fresh From
          <span className="block text-green-400">
            Karlo Farm
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-2xl max-w-3xl mx-auto text-gray-200">
          Delivering fresh, high-quality agricultural products
          grown with care, sustainability, and a commitment to excellence.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <a
            href="#products"
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold transition"
          >
            View Products
          </a>

          <a
            href="#contact"
            className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold transition"
          >
            Contact Us
          </a>

        </div>

        

      </div>
    </section>
  );
}