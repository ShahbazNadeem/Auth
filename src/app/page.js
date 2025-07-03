'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { Image } from 'next/image';

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.name}  <img src={session.user.image}/><br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}