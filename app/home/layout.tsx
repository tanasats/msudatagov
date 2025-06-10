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
      {children}  
    </div>
    
  )
}