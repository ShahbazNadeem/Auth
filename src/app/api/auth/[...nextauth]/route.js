import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here 10:32 https://www.youtube.com/watch?v=2JnEq3ZmLH0&t=249s https://www.youtube.com/results?search_query=auth+js+tutorial
  ],
})

// export default NextAuth(authOptions)
export { handler as GET, handler as POST }