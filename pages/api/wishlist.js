import dbConnect from "../../lib/dbConnect"
import { User } from "../../models/user"

export default async (req, res) => {
  const { id } = req.query

  const user = await User.findById(id)
  console.log(user)
  const index = await user.wishlist.id.findIndex(
    (id) => id == String(req.body.id)
  )

  try {
    if (index == 1) {
      console.log("already in wishlist")
      return null
    } else {
      user.wishlist.id.push(req.body.id)
      user.wishlist.brand.push(req.body.brand)
      user.wishlist.name.push(req.body.name)
      user.wishlist.price.push(req.body.price)
      user.wishlist.type.push(req.body.type)
      user.wishlist.img.push(req.body.img[0])
    }

    const result = await User.findByIdAndUpdate(id, user, {
      new: true
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
