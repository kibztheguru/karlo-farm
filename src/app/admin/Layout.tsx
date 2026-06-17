"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Messages", path: "/admin/messages" },
    { name: "Products", path: "/admin/products" },
    { name: "Gallery", path: "/admin/gallery" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          Karlo Admin
        </h1>

        <nav className="flex flex-col gap-4">

          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`p-2 rounded ${
                pathname === item.path
                  ? "bg-green-700"
                  : "hover:bg-green-800"
              }`}
            >
              {item.name}
            </Link>
          ))}

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}