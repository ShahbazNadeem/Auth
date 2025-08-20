import CredentialsProvider from 'next-auth/providers/credentials';
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_AI;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    console.log("📡 Fetching users...");
                    const response = await axios.get(`${API_BASE_URL}`);
                    const users = response.data;
                    const user = users.find((u) => u.email === credentials.email);
                    if (!user) {
                        console.log("User not found with email:", credentials.email);
                        return null;
                    }

                    console.log("Comparing passwords...");
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        console.log("Password mismatch for email:", credentials.email);
                        return null;
                    }

                    console.log("User authenticated:", user.email);
                    return {
                        Id: user.id,
                        Name: user.name,
                        Email: user.email,
                    };
                } catch (error) {
                    console.error("🔥 Authorization error:", error);
                    return null;
                }
            }

        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.Id || user.id;
                token.name = user.Name || user.name;
                token.email = user.Email || user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },

    },
    secret: process.env.AUTH_SECRET,
};
