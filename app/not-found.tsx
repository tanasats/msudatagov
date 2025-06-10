import ResponsiveNav from '@/components/Navbar/ResponsiveNav'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex flex-col w-full mx-auto mt-[12vh]'>      
      <div className="text-center">
        <h2 className="text-3xl text-red-500">Page Not Found !</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className='text-blue-700 hover:underline'>Return Home</Link>
      </div>
    </div>
  )
}