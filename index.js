import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import employsModel from "./models/employs.js";

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const allEmploys = await employsModel.find();
    res
      .status(201)
      .json({ success: true, message: "the data is gotten", data: allEmploys });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.post("/create", async (req, res) => {
  const employs = req.body;

  if (!employs.name || !employs.age || !employs.email)
    return res
      .status(404)
      .json({ success: false, message: "provide all fields" });

  const newEmploy = new employsModel(employs);

  try {
    await newEmploy.save();
    res.status(201).json({ success: true, data: newEmploy });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await employsModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "delete is successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "delete is failed" });
  }
});

app.listen(5050, () => {
  connectToDB();
  console.log("http://localhost:5050");
});
