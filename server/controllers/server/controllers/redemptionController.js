const Member = require("../models/Member");
const Reward = require("../models/Reward");
const Transaction = require("../models/Transaction");

const createRedemption = async (req, res) => {
  try {
    const { memberId, rewardId } = req.body;

    if (!memberId || !rewardId) {
      return res.status(400).json({
        message: "memberId and rewardId are required",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({
        message: "Reward not found",
      });
    }

    if (!reward.active) {
      return res.status(400).json({
        message: "This reward is not active",
      });
    }

    if (member.pointsBalance < reward.pointsRequired) {
      return res.status(400).json({
        message: "Insufficient points",
        pointsBalance: member.pointsBalance,
        pointsRequired: reward.pointsRequired,
      });
    }

    member.pointsBalance -= reward.pointsRequired;

    await member.save();

    const transaction = await Transaction.create({
      memberId: member._id,
      type: "REDEMPTION",
      points: -reward.pointsRequired,
      purchaseAmount: 0,
      rewardId: reward._id,
      balanceAfter: member.pointsBalance,
    });

    res.status(201).json({
      message: "Reward redeemed successfully",
      redemption: {
        rewardId: reward._id,
        rewardName: reward.name,
        pointsUsed: reward.pointsRequired,
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
      message: "Failed to redeem reward",
      error: error.message,
    });
  }
};

module.exports = {
  createRedemption,
};