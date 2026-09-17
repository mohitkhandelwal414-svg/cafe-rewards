const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    type: {
      type: String,
      enum: ["PURCHASE", "REDEMPTION"],
      required: true,
    },

    points: {
      type: Number,
      required: true,
    },

    purchaseAmount: {
      type: Number,
      default: 0,
    },

    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reward",
      default: null,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);