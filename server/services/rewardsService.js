// Calculate points and tier for a member

const getTierDetails = (qualifyingPoints) => {
  if (qualifyingPoints >= 1000) {
    return {
      tier: "GOLD",
      multiplier: 1.5,
    };
  }

  if (qualifyingPoints >= 500) {
    return {
      tier: "SILVER",
      multiplier: 1.25,
    };
  }

  return {
    tier: "BRONZE",
    multiplier: 1,
  };
};

const calculatePurchasePoints = (purchaseAmount, multiplier) => {
  return Math.floor(purchaseAmount * multiplier);
};

const calculateTier = (qualifyingPoints) => {
  return getTierDetails(qualifyingPoints).tier;
};

module.exports = {
  getTierDetails,
  calculatePurchasePoints,
  calculateTier,
};