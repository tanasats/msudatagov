import React from 'react'
import { getCurrentUser } from '@/lib/auth'
import { User } from '@/types';

const ProfilePage = async () => {
  const user: User = await getCurrentUser() as User;

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      profile
      {user && <>
        <div>id : {user?.id}</div>
        <div>user : {user?.name}</div>
        <div>mail : {user?.email}</div>
        <div>faculty : {user?.faculty}</div>
        <div>role : {user?.role}</div>
      </>
      }
 
    </div>
  );
}

export default ProfilePage