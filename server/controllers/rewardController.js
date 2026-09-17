const Reward = require("../models/Reward");

// Get all active rewards
const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ active: true }).sort({
      pointsRequired: 1,
    });

    res.json({
      rewards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rewards",
      error: error.message,
    });
  }
};

// Create a reward
const createReward = async (req, res) => {
  try {
    const { name, description, pointsRequired } = req.body;

    if (!name || pointsRequired === undefined) {
      return res.status(400).json({
        message: "name and pointsRequired are required",
      });
    }

    if (isNaN(pointsRequired) || Number(pointsRequired) < 0) {
      return res.status(400).json({
        message: "pointsRequired must be a valid non-negative number",
      });
    }

    const reward = await Reward.create({
      name,
      description,
      pointsRequired: Number(pointsRequired),
      active: true,
    });

    res.status(201).json({
      message: "Reward created successfully",
      reward,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create reward",
      error: error.message,
    });
  }
};

module.exports = {
  getRewards,
  createReward,
};