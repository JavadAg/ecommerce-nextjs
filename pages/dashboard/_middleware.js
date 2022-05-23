import { NextResponse, NextRequest } from "next/server"
import * as jose from "jose"

const secret = process.env.NEXT_SECRET

export default async function auth(req = NextRequest) {
  const { cookies } = req
  const url = req.nextUrl.clone()
  const jwt = cookies.token
  url.pathname = "/"

  if (jwt === undefined) {
    return NextResponse.redirect(url)
  } else {
    try {
      const { payload } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      )
      return NextResponse.next()
    } catch (e) {
      console.log(e.message)
      return NextResponse.redirect(url)
    }
  }
}
