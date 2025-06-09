// components/UserDropdown.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/context/SessionContext';
import { LuChevronDown } from "react-icons/lu";

export default function UserDropdown() {
  const { user, logout } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  //const router = useRouter();

  if (!user) return null; // ไม่แสดงถ้าไม่มี user

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    // อาจจะ redirect ไปหน้า home หรือ signin
    //window.location.href = '/signin'; // หรือใช้ useRouter().push('/')
    //router.push('/');
  };

  return (
    <div className="relative">
      <div className='flex items-center cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {user.name}<LuChevronDown/>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link href="/dashboard/profile" onClick={() => setIsOpen(false)} 
          className="block px-4 py-2  hover:bg-gray-100">
            Profile
          </Link>
          <button onClick={handleLogout} 
          className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}