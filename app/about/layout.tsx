"use client"
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Navbar/> */}
      <Header />
      {children}  
    </div>
    
  )
}