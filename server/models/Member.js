const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    pointsBalance: {
      type: Number,
      default: 0,
    },

    qualifyingPoints: {
      type: Number,
      default: 0,
    },

    tier: {
      type: String,
      default: "BRONZE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);