import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import routes from "./src/routes/index.js";

const PORT = process.env.PORT || 9999;
const app = express();

// Middleware Setup
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (Manually setting headers)
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://car-renting-system.vercel.app"
  ); // Replace with your frontend URL
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
  next();
});

// Cookie parser middleware
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("DB connected.");
});

// Test route to check if app is working
app.get("/", (req, res) => {
  try {
    res.send("App Working");
  } catch (err) {
    console.log(err);
  }
});

// API Routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`App running at PORT:${PORT}.`);
});
