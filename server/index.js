import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/index.js";

const PORT = process.env.PORT || 9999;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "https://your-frontend-domain.com", // Replace with your frontend URL
  "http://localhost:3000", // For local development
];

app.use(
  cors({
    origin: allowedOrigins, // Restrict access to these origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
  })
);

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with specific origin(s) if needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected."))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

// Routes
app.get("/", (req, res) => {
  try {
    res.send("App Working");
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api", routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`App running at PORT:${PORT}.`);
});
