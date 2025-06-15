"use client"
import { Navlinks } from '@/constant/constant'
import Link from 'next/link'
//import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LuBug } from 'react-icons/lu'
import { UserAuthNav } from './UserAuthNav'
import { useSessionContext } from '@/context/SessionContext'

type Props = {
  openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
  const { isAuthenticated } = useSessionContext()
  const [ navBg, setNavBg ] = useState(false);
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  //const router = useRouter();
  // const handlerLogin = () => {
  //   router.push("/signin");
  // }

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    }
    window.addEventListener("scroll", handlerScroll);
    return () => window.removeEventListener("scroll", handlerScroll);
  }, []);

  return (
    <div className={`transition-all ${navBg ? 'bg-white shadow-md' : 'fixed'} duration-200 h-[12vh] z-[100] fixed w-full`}>
      <div className='flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto'>
        {/* LOGO */}
        <div className='flex items-center space-x-2'>
          <Link href={"/"} className='flex gap-4 items-center'>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 dark:bg-white rounded-full flex items-center justify-center flex-col">
              <LuBug className='text-white text-3xl' />
            </div>
            <h1 className="text-xl font-extrabold hidden sm:block md:text-2xl">{APP_NAME}</h1>
          </Link>
        </div>
        {/* Navlinks */}
        <div className="hidden lg:flex items-center space-x-4">

          {isAuthenticated && Navlinks.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.url}
                className='transition-all duration-200 '>
                {/* <p>{link.label}</p> */}
                <div className='hover:bg-gray-100 px-8 py-2.5 rounded-xl transition-all duration-200'>{link.label}</div>
              </Link>
            )
          })}
          
        </div>
        <div className='flex items-center'>
          {/* Join buttons */}
          <UserAuthNav />
          {/* <div onClick={handlerLogin} className='hover:bg-slate-100 px-8 py-2.5 rounded-full cursor-pointer'>
            เข้าระบบ
          </div> */}
          {/* <button onClick={handlerLogin} className="hidden lg:flex bg-primary px-8 py-2.5 text-white font-bold rounded-lg hover:bg-blue-400 transition-all duration-200">
            เข้าระบบ
          </button> */}
          {/* <button
            onClick={handlerLogin} // เปลี่ยนเป็น onClick={handleLogin} ในโปรเจกต์จริง
            className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Login
          </button> */}
          {/* Theme Toggle */}
          {/* Menu Toggle Icon */}
          <button onClick={openNav} className="lg:hidden px-0 py-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="Toggle Menu">
            <svg className="h-8 w-8" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path
                d="M3 5H21M3 12H21M3 19H21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>


      </div>
    </div>
  )
}

export default Nav