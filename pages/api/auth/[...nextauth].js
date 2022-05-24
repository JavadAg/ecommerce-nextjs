import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "../../../lib/dbConnect"
import { User } from "../../../models/user"

export default NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const { username, password, firstname, lastname, email, sign } =
          credentials

        await dbConnect()

        switch (sign) {
          //case register
          case "true":
            try {
              if (!username || !password || !firstname || !lastname || !email) {
                throw new Error("Please fill all fields")
              }
              const exist = await User.findOne({ email })

              if (exist) {
                throw new Error("user already exists")
              }
              const hashedPassword = await bcrypt.hash(password, 10)
              const user = await User.create({
                username,
                password: hashedPassword,
                firstname,
                lastname,
                email
              })
              return { id: user.id, name: user.username }
            } catch (error) {
              console.log(error.message)
            }
            break
          case "false":
            //case login
            try {
              if (!username || !password) {
                throw new Error("Please enter username or password")
              }
              const exist = await User.findOne({ username })

              if (!exist) {
                throw new Error("user not exist")
              } else {
                const isPasswordsValid = await bcrypt.compare(
                  password,
                  exist.password
                )
                if (!isPasswordsValid) {
                  throw new Error("Wrong password")
                } else {
                  return { id: exist.id, name: exist.username }
                }
              }
            } catch (error) {
              console.log(error.message)
            }
            break
          default:
            break
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
    updateAge: 60 * 60 // 1 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/"
  },

  callbacks: {
    // Called after successful login
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }

      return session
    }
  }
})
