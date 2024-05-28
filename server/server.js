import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import apiAuth from "./routes/auth.js";
import apiDiary from "./routes/diary.js";

// Load environment variables
config();

const app = express();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", apiAuth);
app.use("/api/diary", apiDiary);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
