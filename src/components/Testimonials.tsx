export default function Testimonials() {
  const testimonials = [
    {
      name: "James Mwangi",
      role: "Regular Customer",
      message:
        "Karlo Farm consistently delivers fresh, high-quality produce. Their service is reliable and professional.",
    },
    {
      name: "Grace Wanjiku",
      role: "Restaurant Owner",
      message:
        "We've sourced farm products from Karlo Farm for months. The quality and consistency are outstanding.",
    },
    {
      name: "Peter Kiptoo",
      role: "Local Buyer",
      message:
        "Excellent customer service and top-quality products. I highly recommend Karlo Farm to anyone.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            We take pride in providing quality agricultural products
            and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-yellow-500 text-lg sm:text-xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
                "{testimonial.message}"
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold text-black">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}