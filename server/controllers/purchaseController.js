const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

const {
  getTierDetails,
  calculatePurchasePoints,
  calculateTier,
} = require("../services/rewardsService");

// Create a purchase and award points
const createPurchase = async (req, res) => {
  try {
    const { memberId, purchaseAmount } = req.body;

    if (!memberId || purchaseAmount === undefined) {
      return res.status(400).json({
        message: "memberId and purchaseAmount are required",
      });
    }

    if (Number(purchaseAmount) <= 0) {
      return res.status(400).json({
        message: "Purchase amount must be greater than 0",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Get current tier multiplier
    const tierDetails = getTierDetails(member.qualifyingPoints);

    // Calculate points using current tier
    const pointsEarned = calculatePurchasePoints(
      Number(purchaseAmount),
      tierDetails.multiplier
    );

    // Update balances
    member.pointsBalance += pointsEarned;
    member.qualifyingPoints += pointsEarned;

    // Recalculate tier after purchase
    member.tier = calculateTier(member.qualifyingPoints);

    await member.save();

    // Record transaction
    const transaction = await Transaction.create({
      memberId: member._id,
      type: "PURCHASE",
      points: pointsEarned,
      purchaseAmount: Number(purchaseAmount),
      balanceAfter: member.pointsBalance,
    });

    res.status(201).json({
      message: "Purchase recorded successfully",
      purchase: {
        purchaseAmount: Number(purchaseAmount),
        pointsEarned,
        tier: member.tier,
        multiplier: tierDetails.multiplier,
      },
      member: {
        id: member._id,
        name: member.name,
        pointsBalance: member.pointsBalance,
        qualifyingPoints: member.qualifyingPoints,
        tier: member.tier,
      },
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to record purchase",
      error: error.message,
    });
  }
};

module.exports = {
  createPurchase,
};