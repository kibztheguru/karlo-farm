"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-green-700">
          Karlo Farm Admin
        </h1>

        <p className="text-gray-600 mt-2">
          Manage products, gallery and customer inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          href="/admin/messages"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-black">
            Messages
          </h2>

          <p className="text-gray-600 mt-2">
            View customer inquiries.
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-black">
            Products
          </h2>

          <p className="text-gray-600 mt-2">
            Add, edit and delete products.
          </p>
        </Link>

        <Link
          href="/admin/gallery"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-black">
            Gallery
          </h2>

          <p className="text-gray-600 mt-2">
            Manage farm images.
          </p>
        </Link>

      </div>
    </div>
  );
}