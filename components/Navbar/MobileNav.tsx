import { Navlinks } from '@/constant/constant'
import Link from 'next/link'
import React from 'react'
import { LuX } from 'react-icons/lu'

type Props = {
  showNav:boolean;
  closeNav:()=>void;
}

const MobileNav = ({showNav,closeNav}:Props) => {
  const navControl = showNav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div>
      {/* Overlay */}
      <div className={`fixed ${navControl} inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-70 w-full h-screen`}></div>
      {/* Navelinks */}
      <div className={`text-white fixed flex flex-col justify-center h-full ${navControl} transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-blue-950 space-y-6 z-[1050]`}>
        {Navlinks.map((link) => {
          return (
            <Link
              key={link.id}
              href={link.url}
              className='w-fit ml-12 border-b-[1.5px] pb-1 border-yellow-300 text-[20px] sm:text-[30px]'>
              <p>{link.label}</p>
            </Link>
          )
        })}
        {/* Close icon */}
        <LuX onClick={closeNav} className='absolute top-[0.7rem] right-[1.4rem] w-6 h-6 sm:w-8 sm:h-8' />
      </div>


    </div>
  )
}

export default MobileNav