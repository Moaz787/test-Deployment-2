import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error.message);
  }
};
