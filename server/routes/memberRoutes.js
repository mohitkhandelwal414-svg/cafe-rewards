const express = require("express");

const {
  createMember,
  getMembers,
  getMemberById,
  getMemberBalance,
  getMemberTransactions,
} = require("../controllers/memberController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create member
router.post("/", authMiddleware, createMember);

// Get all members
router.get("/", authMiddleware, getMembers);

// Get member by ID
router.get("/:id", authMiddleware, getMemberById);

// Get member balance
router.get("/:id/balance", authMiddleware, getMemberBalance);

// Get member transactions
router.get("/:id/transactions", authMiddleware, getMemberTransactions);

module.exports = router;