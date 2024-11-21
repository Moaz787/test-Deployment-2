import mongoose from "mongoose";

const employsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const employsModel = mongoose.model("employ", employsSchema);

export default employsModel;
