import mongoose from "mongoose"

const MONGODB_URI = process.env.NEXT_MONGO_URI

async function dbConnect() {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.")
    return
  }

  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))
}

export default dbConnect
