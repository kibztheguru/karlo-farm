"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
 <nav className="fixed w-full z-50 bg-transparent transition-all duration-300">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 rounded-b-xl">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
            KF
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-green-800">
              Kalro Farm
            </h1>
            <p className="text-xs text-gray-500">
              Fresh • Quality • Sustainable
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-black">
          <li><a href="#home">Home</a></li>
          <li><a href="#story">About</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-black"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">

          {/* BLUR BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDE MENU */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 animate-slide-in">

            {/* Close Button */}
            <button
              className="text-2xl text-black mb-8"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Links */}
            <ul className="flex flex-col gap-6 text-black font-medium">
              <li onClick={() => setMenuOpen(false)}><a href="#home">Home</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#story">About</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#products">Products</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#gallery">Gallery</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#testimonials">Testimonials</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#contact">Contact</a></li>
            </ul>

          </div>
        </div>
      )}
    </nav>
  );
}