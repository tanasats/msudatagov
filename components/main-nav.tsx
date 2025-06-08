// components/main-nav.tsx
"use client";

import * as React from "react";
import Link from "next/link";

export function MainNav() {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = React.useState(false);
  const productsDropdownRef = React.useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อคลิกนอกพื้นที่
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Dashboard
      </Link>

      {/* Products with sub-menu */}
      <div className="relative" ref={productsDropdownRef}>
        <button
          onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isProductsDropdownOpen ? "true" : "false"}
        >
          Products
          <svg
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
              isProductsDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isProductsDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
            <Link
              href="/products/general"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProductsDropdownOpen(false)}
            >
              General
            </Link>
            <Link
              href="/products/computer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProductsDropdownOpen(false)}
            >
              Computer
            </Link>
            <Link
              href="/products/sports"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProductsDropdownOpen(false)}
            >
              Sports
            </Link>
          </div>
        )}
      </div>

      <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
        About
      </Link>
    </div>
  );
}