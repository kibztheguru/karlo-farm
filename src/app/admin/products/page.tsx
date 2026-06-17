"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE INPUT
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD PRODUCT
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase.from("products").insert([form]);

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });

    fetchProducts();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Products Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={addProduct}
        className="bg-white p-4 rounded-xl shadow mb-8 grid gap-3"
      >

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-green-600 text-white py-2 rounded">
          Add Product
        </button>

      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow">

              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-green-700 font-bold">{p.price}</p>
              <p className="text-sm text-gray-500">{p.category}</p>

              <button
                onClick={() => deleteProduct(p.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}