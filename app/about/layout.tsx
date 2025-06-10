"use client"
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ResponsiveNav/>
      {/* <Navbar/> */}
      <div className="pt-[12vh]"></div>
      {children}  
    </div>
    
  )
}