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
import bcrypt from 'bcryptjs';

const page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const hamdleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Find existing users
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_AI}`);
            const users = await res.json();

            // Step 2: Check if email already exists
            const existingUser = users.find((user) => user.email === email);

            if (existingUser) {
                alert("User with this email already exists.");
                return;
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Step 3: Register new user
            const createUserRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_AI}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password: hashedPassword,
                }),
            });

            if (!createUserRes.ok) {
                throw new Error("Failed to create user.");
            }

            alert("Signup successful! Redirecting to login...");
            window.location.href = "/signin";
        } catch (err) {
            console.error("Signup error:", err);
            alert("An error occurred during signup.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>
                        Enter your name, email and password below to create your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link"><Link href='/signin'>Log In</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={hamdleSignUp}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Jhon Smith"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                                </div>
                                <Input id="password" type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page