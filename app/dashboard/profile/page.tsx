import React from 'react'
import { getCurrentUser } from '@/lib/auth'
import { User } from '@/types';
import Image from 'next/image';

const ProfilePage = async () => {
  const user: User = await getCurrentUser() as User;

  return (
    <div className='w-[90%] md:w-[80%] mx-auto'>
      <div className='flex flex-col gap-4 w-[350px] bg-slate-50 p-8'>
        <div className='flex justify-center'>
          <Image src={"/images/avatar.jpg"} width={250} height={250} alt="avatar" className='border border-gray-300 p-2 rounded-lg'/>
        </div>
        <div>
              {user && <>
                <div className='text-2xl'>{user?.name}</div>
                <div>{user?.faculty}</div>
                <div>{user?.email}</div>
                <div>{user?.role}</div>
              </>
              }
          
          </div>
      </div>







    </div>
  );
}

export default ProfilePage