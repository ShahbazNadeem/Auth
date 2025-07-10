import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      go to  <Link href='/signin'>sign In page</Link>
    </div>
  );
}
