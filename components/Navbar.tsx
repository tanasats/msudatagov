// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useSession } from '@/context/SessionContext';
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const { isAuthenticated } = useSession();

  return (
    <nav className="bg-slate-200 p-4 flex justify-between items-center">
      <Link href="/home" className="text-xl font-bold">
        MyApp
      </Link>
      <div>
        {isAuthenticated ? (
        <UserDropdown />
        ) : (
          <Link href="/signin" className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}