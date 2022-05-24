import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  wishlist: {
    id: { type: [Number], default: [] },
    brand: { type: [String], default: [] },
    name: { type: [String], default: [] },
    price: { type: [Number], default: [] },
    type: { type: [String], default: [] },
    img: { type: [String], default: [] }
  }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
