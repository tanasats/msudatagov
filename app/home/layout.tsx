"use client"
import Header from "@/components/Header";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Navbar/> */}
      <ResponsiveNav/>
      {/* <Header /> */}
      {children}  
    </div>
    
  )
}