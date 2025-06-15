"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
//import { useSession } from 'next-auth/react';
import { useSessionContext } from '@/context/SessionContext';
import { useSession } from 'next-auth/react';


const ProfilePage = () => {
  const {data:session} = useSession();
  const {user} = useSessionContext()
  useEffect(()=>{
    
  },[])

  return (
    <div className='w-[90%] md:w-[80%] mx-auto'>
      {/* User profile card */}
      <div className='flex flex-col gap-4 w-[350px] bg-slate-50 p-8 rounded-xl'>
        <div className='flex justify-center'>
          <Image src={"/images/avatar.jpg"} width={250} height={250} alt="avatar" className='border border-gray-300 p-2 rounded-lg'/>
          {/* <Image src={"https://pd.msu.ac.th/staff/picture/5002658.jpg"} width={250} height={250} alt="avatar" className='border border-gray-300 p-2 rounded-lg'/> */}
        </div>
        <div className='w-[250px] mx-auto'>
              {user && <>
                <div className='text-2xl'>{user?.name}</div>
                <div>{user?.faculty}</div>
                <div>{user?.email}</div>
                <div>{user?.role}</div>
              </>
              }
              <div>
                {session && (
                  <div className=' mt-2 text-slate-400 text-[12px] italic'>Signin by Google</div>
                )}
              </div>
          </div>
      </div>
      {/* User activity info */}







    </div>
  );
}

export default ProfilePage