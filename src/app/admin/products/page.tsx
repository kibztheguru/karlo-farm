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

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT HANDLER
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert("Image upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  // ADD / UPDATE PRODUCT
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await supabase
        .from("products")
        .update({
          ...form,
          image: imageUrl,
        })
        .eq("id", editingId);

      setEditingId(null);
    } else {
      await supabase.from("products").insert([
        {
          ...form,
          image: imageUrl,
        },
      ]);
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
    });

    setImageUrl("");

    fetchProducts();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // START EDIT
  const startEdit = (p: Product) => {
    setEditingId(p.id);

    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
    });

    setImageUrl(p.image);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
    });

    setImageUrl("");
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-green-700">
        Products Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={addProduct}
        className="bg-white p-4 rounded-xl shadow space-y-3"
      >

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />

        {uploading && (
          <p className="text-sm text-gray-500">Uploading image...</p>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded w-full"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white py-2 rounded w-full"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow">

              {p.image && (
                <img
                  src={p.image}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-green-700 font-bold">{p.price}</p>
              <p className="text-sm text-gray-500">{p.category}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => startEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}