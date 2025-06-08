// components/site-header.tsx

import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { AppIcon } from "./appicon";
import { MainNav } from "./main-nav";
import { UserAuthNav } from "./user-auth-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center ">
        {/* Logo and Mobile Nav */}
        <div className="flex  items-center">
          <MobileNav /> {/* Mobile menu first for small screens */}
          <Link href="/" className="flex flex-grow items-center space-x-2">
            <AppIcon />
            <span className="inline-block font-bold text-lg text-gray-800">My App</span>
          </Link>
        </div>

        {/* Main Nav (Desktop) */}
        <nav className="flex-1 flex justify-start pl-8"> {/* Adjusted for spacing */}
          <MainNav />
        </nav>

        {/* Right Section (Login/User Dropdown) */}
        <div className="flex items-center justify-end space-x-2">
          <UserAuthNav />
        </div>
      </div>
    </header>
  );
}