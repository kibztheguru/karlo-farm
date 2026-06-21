"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section
      id="products"
      className="py-16 sm:py-20 lg:py-24 bg-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
            Products & Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            We provide fresh, high-quality farm produce grown using
            sustainable agricultural practices.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {products.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-4 left-4 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="text-xl font-bold text-black mb-2">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-green-700 font-bold text-lg">
                      {item.price}
                    </p>

                    <a
                      href="https://wa.me/254783265524"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
                    >
                      Order Now
                    </a>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}