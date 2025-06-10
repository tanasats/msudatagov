// components/user-auth-nav.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

// จำลองการใช้ Session Context (แทนที่ด้วย useSession ของคุณ)
// interface SessionContextType {
//   user: { name: string } | null;
//   isAuthenticated: boolean;
//   login: () => void; // จำลอง
//   logout: () => void; // จำลอง
// }

// const useMockSession = (): SessionContextType => {
//   const [user, setUser] = React.useState<{ name: string } | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   React.useEffect(() => {
//     const storedUser = localStorage.getItem('mockUser');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = () => {
//     const mockUser = { name: "John Doe" };
//     setUser(mockUser);
//     setIsAuthenticated(true);
//     localStorage.setItem('mockUser', JSON.stringify(mockUser));
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('mockUser');
//   };

//   return { user, isAuthenticated, login, logout };
// };

export function UserAuthNav() {
  const { user, isAuthenticated,logout } = useSession();
  //const { user, isAuthenticated, logout, login } = useMockSession(); // เปลี่ยนเป็น useSession() ในโปรเจกต์จริง
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/signin");
  };

  // // จำลองการ login จากหน้านี้เลย สำหรับการทดสอบ
  // const handleDirectLogin = () => {
  //   login();
  // };

  // ปิด dropdown เมื่อคลิกนอกพื้นที่
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="relative me-2" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center h-12 w-12 text-2xl rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            {user?.name.charAt(0)}
            {user?.name.split(" ")[1].charAt(0)}
            
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm font-normal text-gray-700">
                <p className="font-medium leading-none">{user?.name}</p>
                {/* <p className="text-xs leading-none text-gray-500">{user?.email}</p> */}
              </div>
              <div className="my-1 border-t border-gray-100" />
              <Link
                href="/dashboard/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin} // เปลี่ยนเป็น onClick={handleLogin} ในโปรเจกต์จริง
          className="px-8 py-2.5 rounded-xl  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Login
        </button>
      )}
    </>
  );
}