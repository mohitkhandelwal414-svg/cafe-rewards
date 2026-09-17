const express = require("express");

const {
  getRewards,
  createReward,
} = require("../controllers/rewardController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/rewards
router.get("/", authMiddleware, getRewards);

// POST /api/rewards
router.post("/", authMiddleware, createReward);

module.exports = router;