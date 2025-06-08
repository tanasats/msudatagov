import React from 'react'
import { getCurrentUser } from '@/lib/auth'

const ProfilePage = async () => {
  const user: any = await getCurrentUser();

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