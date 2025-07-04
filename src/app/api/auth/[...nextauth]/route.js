// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"

// const handler = NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// })

// // export default NextAuth(authOptions)
// export { handler as GET, handler as POST }


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "@/app/lib/UserModel";
import { connectDB } from "@/app/lib/db";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // await connectDB();

        // // ✅ use model, not schema
        // const user = await User.findOne({ email: credentials.email });
        // if (!user) return null;
        
        console.log("Authorize:", credentials.email, credentials.password);
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        console.log("Found user:", !!user, user?.email);
        if (!user) return null;


        if (credentials.password !== user.password) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=credentials",
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
