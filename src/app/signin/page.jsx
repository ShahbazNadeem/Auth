'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const hamdleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });
      console.log(result, 'in signin page');


      if (result.error) {
        console.log('error in signin page')
        // setError('Login failed. Please check your credentials.');
      } else {
        console.log('login in signin page')
        router.push('/')
      }
    } catch (err) {
      console.error('An error occurred during login:', err);
      // setError('An unexpected error occurred.');
    }

  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href='/signup'>Sign Up</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={hamdleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card> */}
      <button onClick={() => signIn("google")} variant="outline" className="w-full">
        Login with Google
      </button>

      <Button onClick={() => signIn("github")} variant="outline" className="w-full">
        Login with GitHub
      </Button>

    </div>
  )
}

export default page