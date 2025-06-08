// components/mobile-nav.tsx
"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { AppIcon } from "./appicon";
//import { AppIcon } from "@/components/icons";

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={`block py-2 text-base font-medium ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="px-0 py-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 me-4"
        aria-label="Toggle Menu"
      >
        <svg
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6" 
        >
          <path
            d="M3 5H21M3 12H21M3 19H21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>

      {/* Mobile Sheet/Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
          >
            <div className="flex items-center justify-between">
              <MobileLink href="/" className="flex items-center space-x-2" onOpenChange={setOpen}>
                <AppIcon/>
                <span className="font-bold text-lg">My App</span>
              </MobileLink>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close Menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-4">
              <MobileLink href="/news" onOpenChange={setOpen}>
                News
              </MobileLink>
              <div className="pl-4">
                <span className="block py-2 text-base font-medium text-gray-700">Products</span>
                <div className="flex flex-col space-y-2 pl-4">
                  <MobileLink href="/products/general" onOpenChange={setOpen} className="text-gray-600 hover:text-gray-900">
                    General
                  </MobileLink>
                  <MobileLink href="/products/computer" onOpenChange={setOpen} className="text-gray-600 hover:text-gray-900">
                    Computer
                  </MobileLink>
                  <MobileLink href="/products/sports" onOpenChange={setOpen} className="text-gray-600 hover:text-gray-900">
                    Sports
                  </MobileLink>
                </div>
              </div>
              <MobileLink href="/about" onOpenChange={setOpen}>
                About
              </MobileLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}