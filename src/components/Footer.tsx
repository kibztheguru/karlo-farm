import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold">
              Karlo Farm
            </h3>

            <p className="mt-3 text-gray-300">
              Delivering quality farm products from Nakuru with a commitment to quality, sustainability, and customer satisfaction.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">
              Contact
            </h4>

            <p>📞 0790424835</p>

            <a
              href="mailto:karlofarmnaivasha@gmail.com"
              className="block mt-2 hover:text-green-300 transition"
            >
              📧 karlofarmnaivasha@gmail.com
            </a>

            <p className="mt-2">📍 Nakuru, Kenya</p>

            <a
              href="https://wa.me/254790424835?text=Hello%20Karlo%20Farm,%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 hover:text-green-300 transition"
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-3">
              Follow Us
            </h4>

            <div className="flex gap-5 text-3xl">

              <a
                href="https://instagram.com/naivashakalrofarm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/254790424835"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaWhatsapp />
              </a>

            </div>
          </div>

        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-center text-sm text-gray-300">
          © 2026 Karlo Farm. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}