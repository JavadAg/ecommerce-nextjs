import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function auth(req, res, next) {
  const token = await getToken({ req })
  const url = req.nextUrl.clone()
  if (!token) {
    return NextResponse.redirect(url)
  } else {
    console.log(token)
    return NextResponse.next()
  }
}
