const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

// Create a new member
const createMember = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }

    const existingMember = await Member.findOne({ phone });

    if (existingMember) {
      return res.status(400).json({
        message: "Member with this phone number already exists",
      });
    }

    const member = await Member.create({
      name,
      phone,
      pointsBalance: 0,
      qualifyingPoints: 0,
      tier: "BRONZE",
    });

    res.status(201).json({
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create member",
      error: error.message,
    });
  }
};

// Get all members with search, pagination and sorting
const getMembers = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);

    const query = {};

    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { phone: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const allowedSortFields = [
      "name",
      "phone",
      "pointsBalance",
      "qualifyingPoints",
      "tier",
      "createdAt",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const sortOrder = order === "asc" ? 1 : -1;

    const total = await Member.countDocuments(query);

    const members = await Member.find(query)
      .sort({ [safeSortBy]: sortOrder })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({
      members,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch members",
      error: error.message,
    });
  }
};

// Get one member
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json({
      member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch member",
      error: error.message,
    });
  }
};

// Get member balance
const getMemberBalance = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).select(
      "name phone pointsBalance qualifyingPoints tier"
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json({
      member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch member balance",
      error: error.message,
    });
  }
};

// Get member transactions
const getMemberTransactions = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const transactions = await Transaction.find({
      memberId: req.params.id,
    })
      .populate("rewardId", "name pointsRequired")
      .sort({ createdAt: -1 });

    res.json({
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  getMemberBalance,
  getMemberTransactions,
};