'use client'
import { useSessionContext } from '@/context/SessionContext'
import React from 'react'

const DashboardPage = () => {
  const {user} = useSessionContext();
  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <div>Dashboard</div>
      <span className='text-sm'>สวัสดี คุณ{user?.name}</span>
    </div>
  )
}

export default DashboardPage