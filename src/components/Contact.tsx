"use client";

import { useState } from "react";

type Settings = {
  phone?: string;
  email?: string;
  whatsapp?: string;
};

export default function Contact({ settings }: { settings: Settings | null }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { supabase } = await import("@/lib/supabase");

    const { error } = await supabase.from("messages").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong!");
    } else {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* INFO */}
          <div className="space-y-3 text-gray-700">

            <p>📍 Nakuru, Kenya</p>

            <p>
              📞 {settings?.phone || "0783265524"}
            </p>

            <p>
              📧 {settings?.email || "kalrofarm@gmail.com"}
            </p>

            <a
              href={`https://wa.me/${settings?.whatsapp || "254783265524"}`}
              target="_blank"
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Chat on WhatsApp
            </a>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border p-3 rounded text-black"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-3 rounded text-black"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full border p-3 rounded text-black"
              rows={5}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded w-full"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}