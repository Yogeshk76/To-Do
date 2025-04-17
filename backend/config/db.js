import mongoose from "mongoose";



export const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
  }
  ).catch((err) => {
    console.log(err);
  });
}

