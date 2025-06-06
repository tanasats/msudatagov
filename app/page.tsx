import { redirect } from 'next/navigation'


export default function Home() {
  redirect("/home");
  // return (
  //   <div>
  //     <h1>Homepage-หน้าหลัก</h1>
  //     <span>MSU SSO Template</span>
  //   </div>
  // );
}
