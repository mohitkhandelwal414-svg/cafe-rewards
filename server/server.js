require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const redemptionRoutes = require("./routes/redemptionRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Member routes
app.use("/api/members", memberRoutes);

// Purchase routes
app.use("/api/purchases", purchaseRoutes);

// Redemption routes
app.use("/api/redemptions", redemptionRoutes);

// Reward routes
app.use("/api/rewards", rewardRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CaféRewards API is running",
  });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});