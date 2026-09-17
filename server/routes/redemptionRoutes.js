const express = require("express");

const {
  createRedemption,
} = require("../controllers/redemptionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/redemptions
router.post("/", authMiddleware, createRedemption);

module.exports = router;