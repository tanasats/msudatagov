"use client" 
// layout.tsx ที่ไม่ใช่ React Function Component แบบปกติ แต่เป็น Server Component โดยดีฟอลต์
// ซึ่งตอนนี้ใน layout.tsx เรากำลังเรียก <Navbar /> ซึ่ง อาจเป็น Component ที่ใช้ React Hook ด้านใน
// และ React Hook เช่น useState, useContext, useEffect จะ ไม่สามารถเรียกใน Server Component ได้
// วิธีแก้ไข : ทำให้ layout.tsx เป็น Client Component เพิ่ม "use client" ที่บรรทัดบนสุดของ app/dashboard/layout.tsx
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header/>
      {/* <Navbar/> */}
      {children}  
    </div>
    
  )
}