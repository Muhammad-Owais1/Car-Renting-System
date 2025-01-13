import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; // For authentication
import routes from "./src/routes/index.js"; // Your API routes

const PORT = process.env.PORT || 9999;
const app = express();

// CORS Configuration - Allow specific origins
const allowedOrigins = [
  "https://your-frontend-domain.com", // Replace with your frontend URL
  "http://localhost:3000", // For local development
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
app.use(
  cors({
    origin: allowedOrigins, // Restrict access to these origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
  })
);

// Handle Preflight Requests for all routes
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your specific frontend origin if needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200); // Respond with 200 for preflight requests
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

// Authentication Middleware (if you're using JWT)
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }); // Send Unauthorized error if token is missing
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" }); // Invalid token
  }
};

// Sample Route (for testing)
app.get("/", (req, res) => {
  try {
    res.send("App Working");
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Use authentication middleware in your API routes
app.use("/api", authenticateUser, routes);

// Global Error Handler - Catch unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`App running at PORT:${PORT}.`);
});
