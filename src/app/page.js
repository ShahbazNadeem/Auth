'use client'
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        Signed in as {session.user.name} <br />
        <img src={session.user.image} alt="img"/> <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (

    <div className='flex flex-col justify-center items-center h-screen'>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <CardFooter className="flex-col gap-2 mt-10">
        <Button onClick={() => signIn("google")} variant="outline" className="w-full">
          Login with Google
        </Button>
        <Button onClick={() => signIn("github")} variant="outline" className="w-full">
          Login with GitHub
        </Button>
        <Button onClick={() => signIn("linkedin")} variant="outline" className="w-full">
          Login with LinkedIn
        </Button>
      </CardFooter>

      {/* <button onClick={() => signIn("github")}>Sign in with GitHub</button> */}
      {/* <div>  go to  <Link href='/signin'>sign In page</Link></div><br />
      <div><Link href='/dashboard'>Dashboard</Link></div> */}
    </div>
  );
}
