import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

//if no user token exist protect dashboard page
export default async function auth(req) {
  const token = await getToken({ req, secret })
  const { origin } = req.nextUrl.clone()
  if (!token) {
    return NextResponse.redirect(`${origin}`)
  } else {
    return NextResponse.next()
  }
}
