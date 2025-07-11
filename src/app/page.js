import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    <div>  go to  <Link href='/signin'>sign In page</Link></div><br/>
      <div><Link href='/dashboard'>Dashboard</Link></div>
    </div>
  );
}
