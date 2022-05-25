import dbConnect from "../../lib/dbConnect"
import { User } from "../../models/user"

export default async (req, res) => {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "POST":
      {
        const { id } = req.query
        const user = await User.findById(id)
        const index = await user.wishlist.id.findIndex(
          (id) => id == String(req.body.id)
        )

        if (index == -1) {
          user.wishlist.id.push(req.body.id)
          user.wishlist.brand.push(req.body.brand)
          user.wishlist.name.push(req.body.name)
          user.wishlist.price.push(req.body.price)
          user.wishlist.type.push(req.body.type)
          user.wishlist.img.push(req.body.img[0])
        } else {
          return res.status(201).json("Already in your wishlist")
        }

        await User.findByIdAndUpdate(id, user, {
          new: true
        })
        return res.status(200).json("Successfuly added")
      }
      break
    case "GET":
      const id = await req.query.id
      const user = await User.findById(id)
      const wishlist = await user.wishlist
      return res.status(200).json(wishlist)
      break
    default:
      break
  }
}
