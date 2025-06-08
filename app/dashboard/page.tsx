'use client'
import { useSession } from '@/context/SessionContext'
import React from 'react'

const DashboardPage = () => {
  const {user} = useSession();
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div>Dashboard</div>
      <span className='text-sm'>สวัสดี คุณ{user?.name}</span>
    </div>
  )
}

export default DashboardPage