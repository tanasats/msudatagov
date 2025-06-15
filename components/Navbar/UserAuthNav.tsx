// components/user-auth-nav.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/context/SessionContext";
import LogoutModal from "../Modal/logout-modal";
import { LuLogIn } from "react-icons/lu";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/types";
import { signToken } from "@/lib/jwt";
import toast from "react-hot-toast";

export function UserAuthNav() {
  const { user, isAuthenticated, logout, login } = useSessionContext(); //<-- Custom Session (Main)
  const { data: session } = useSession(); //<-- NextAuth
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);


  React.useEffect(() => {
    const _signToken = async (data: User) => {
      const token = await signToken(data);
      if (token) login(data, token);
      else toast.error("ต้องใช้ email@msu.ac.th เท่านั้น");
    }

    if (!isAuthenticated && session?.user) {
      const userdata: User = {
        id: '0',
        username: session.user.email as string,
        name: session.user.name as string,
        faculty: "",
        email: session.user.email as string,
        role: 'member',
      };
      _signToken(userdata);
    }
    else {
      signOut({ redirect: false });//<-- บังคับให้ signOut ออกจาก NextAuth 
      //const nextauthsession = Cookies.get("next-auth.session-token");
      // if (!nextauthsession) {
      //   signOut({ redirect: false });//<-- บังคับให้ signOut ออกจาก NextAuth  
      // }
    }

  }, [session, login, isAuthenticated]);

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
  }, [])

  const handlerLogout = () => {
    // ต้องเคลียร์ NextAuth(google) และ SessionContext ให้เสร็จก่อน แล้วค่อย redirect
    logout();
    setOpenLogoutModal(false);
    setIsDropdownOpen(false);
    signOut({ redirect: false }); //<- NextAuth
    router.push("/");
  };

  const handlerLogin = () => {
    router.push("/signin");
  };

  return (
    <>
      {/* <SigninButton /> */}
      {isAuthenticated ? (
        <div className="relative me-2" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center h-12 w-12 text-2xl rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            {user?.name.charAt(0).toUpperCase()}
            {user?.name.split(" ")[1].charAt(0).toUpperCase()}
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
                onClick={() => setOpenLogoutModal(true)}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handlerLogin}
          className="flex items-center justify-center h-12 w-12 mx-4 text-2xl rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <LuLogIn />
        </button>
      )}

      <LogoutModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={handlerLogout}
      />

    </>
  );
}