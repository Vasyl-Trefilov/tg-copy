import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import User from "./models/User";
import bcrypt from "bcrypt";

const app = express();

mongoose
  .connect(
    "mongodb+srv://vasya-tref:Z4so6vL1MK6cjiXf@cluster0.qjag7.mongodb.net/telegram",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(json());

app.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {}
});

app.post('/register', async (req, res) => {
  const { username, password, phoneNumber, email, fullName, bio, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      phoneNumber,
      email,
      fullName,
      bio,
      avatar,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

app.listen(5555, () => {
  console.log(`Server started on port http://localhost:5555`);
});
