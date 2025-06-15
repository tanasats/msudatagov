"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSessionContext } from '@/context/SessionContext'

const LandingPage = () => {
  const { isAuthenticated } = useSessionContext();
  return (

    <div className="relative w-full flex justify-center flex-col">

      <div className="w-[90%] md:w-[80%] mx-auto grid items-center grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Text content */}
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mt-6 font-extrabold leading-[2.5rem] md:leading-[4rem]">
            <span className="text-pink-600">Data</span>
            -Driven Decision Making
          </h1>
          {/* Sub header */}
          <p className='text-xl md:text-2xl mt-2'>
            -- การตัดสินใจโดยการขับเคลื่อนด้วยข้อมูล --
          </p>
          {!isAuthenticated && (
            <div className='mt-8'>
              <Link href={"/signin"} className='text-xl px-8 py-2.5 text-white bg-blue-500 hover:bg-blue-600 w-fit rounded-full cursor-pointer'>
                เข้าใช้งานระบบ
              </Link>
            </div>
          )}
        </div>
        {/* Image content */}
        <div className='flex justify-center'>
          <Image src="/images/1.png" alt="img" width={500} height={500} />
        </div>
      </div>

    </div>

  )
}

export default LandingPage