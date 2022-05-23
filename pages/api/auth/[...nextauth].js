import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import data from "../db.json"

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credential",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Javad" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const { username, password } = credentials

        if (!username || !password) {
          throw new Error("Please enter username or password")
        }
        // Find user in the database
        const exist = data.users.filter(
          (user) => user.username === username && user.password === password
        )

        if (exist.length === 0) {
          throw new Error("Invalid Data")
        }

        const user = Object.assign({}, ...exist)

        return { id: user.id, name: user.username }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
    updateAge: 60 * 60 // 1 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  },

  callbacks: {
    // Called after successful login
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },

    // Called after successful signup
    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }

      return session
    }
  }
})
