/* import * as jose from "jose"
import { serialize } from "cookie"
import data from "../db.json"

const secret = process.env.NEXT_SECRET

export default async function (req, res) {
  const { Username, Password } = req.body
  const exist = data.users.filter(
    (user) => user.username === Username && user.password === Password
  )

  if (exist.length === 0) {
    return res.status(404).json({ message: "user not found" })
  } else {
    const token = await new jose.SignJWT({
      userId: exist[0].id,
      username: exist[0].username
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(secret))

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NEXT_NODE_ENV !== "development",
      maxAge: 60 * 60 * 24,
      path: "/"
    })
    res.setHeader("Set-Cookie", serialized)
    const userdata = Object.assign({}, ...exist)
    const { id, username } = userdata
    res.status(200).json({ id, username })
  }
}
 */
