const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.disable("x-powered-by");

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Parse JSON request body
app.use(express.json());

// Connect MongoDB
connectDB();

// Authentication routes
app.use("/api/auth", authRoutes);

// Product routes
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});