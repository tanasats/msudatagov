import ResponsiveNav from '@/components/Navbar/ResponsiveNav'
import LandingPage from './landing/page';


export default function Home() {
  //redirect("/home");
  return (
    <div>
      <ResponsiveNav/>
      <div className='pt-[12vh]'>
        <LandingPage />
      </div>
    </div>
  );
}
