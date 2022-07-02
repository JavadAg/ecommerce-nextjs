import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { gql } from "graphql-request"
import { request } from "../../../lib/graphcms"

export default NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        //destrucure form
        const { username, password, firstname, lastname, email, sign } =
          credentials

        //case switch for register and login
        switch (sign) {
          //case register ( if true do register)
          case "true":
            try {
              if (!username || !password || !firstname || !lastname || !email) {
                throw new Error("Please fill all fields")
              }

              // query to see if user already exist

              let query = gql`
                query MyQuery(
                  $OR: [NextUserWhereInput!] = [
                    { email: "${email}" }
                    { username: "${username}" }
                  ]
                ) {
                  nextUsers(where: { OR: $OR }) {
                    id
                  }
                }
              `

              let { nextUsers } = await request({
                query: query
              })

              //if exist throw error
              if (nextUsers.length > 0) {
                throw new Error("user already exists")
              }

              //hashing password
              const hashedPassword = await bcrypt.hash(password, 10)

              let mutate = gql`
                mutation MyMutation {
                  createNextUser(
                    data: {
                      username: "${username}"
                      password:"${hashedPassword}"
                      firstname: "${firstname}"
                      lastname: "${lastname}"
                      email: "${email}"
                    }
                  ) {
                    id
                  }
                }
              `

              let { createNextUser } = await request({
                query: mutate
              })

              const createdId = createNextUser.id

              //publish user since graphcms doesnt do it
              let mutate1 = gql`
                mutation MyMutation {
                  publishNextUser(where: { id: "${createdId}" }) {
                    id
                    email
                    password
                    username
                    firstname
                    lastname
                    wishlist
                  }
                }
              `
              let { publishNextUser } = await request({
                query: mutate1
              })

              return publishNextUser
            } catch (error) {
              console.log(error.message)
            }
            break

          //if false do login
          case "false":
            //case login
            try {
              if (!username || !password) {
                throw new Error("Please enter username or password")
              }

              //check for user

              let query = gql`
                query MyQuery {
                  nextUsers(where: { username: "${username}" }) {
                    id
                    email
                    password
                    username
                    firstname
                    lastname
                    wishlist
                  }
                }
              `

              let { nextUsers } = await request({
                query: query
              })

              if (nextUsers.length === 0) {
                throw new Error("username or password is wrong")
              } else {
                const user = Object.assign({}, ...nextUsers)
                //check password using bcrypt
                const isPasswordsValid = await bcrypt.compare(
                  password,
                  user.password
                )
                if (!isPasswordsValid) {
                  throw new Error("Wrong password")
                }
                return user
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

  //custom nextauth pages
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/"
  },

  callbacks: {
    // Called after successful login
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user: user
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }

      return session
    }
  }
})
