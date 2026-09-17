const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getMembers = async (token, search = "", page = 1, limit = 10, sortBy = "pointsBalance", order = "desc") => {
  const params = new URLSearchParams({ search, page, limit, sortBy, order });
  const response = await fetch(`${API_URL}/members?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const createMember = async (token, name, phone) => {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, phone }),
  });
  return response.json();
};

export const recordPurchase = async (token, memberId, purchaseAmount) => {
  const response = await fetch(`${API_URL}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ memberId, purchaseAmount }),
  });
  return response.json();
};

export const getRewards = async (token) => {
  const response = await fetch(`${API_URL}/rewards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const createReward = async (token, name, description, pointsRequired) => {
  const response = await fetch(`${API_URL}/rewards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, pointsRequired }),
  });
  return response.json();
};

export const redeemReward = async (token, memberId, rewardId) => {
  const response = await fetch(`${API_URL}/redemptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ memberId, rewardId }),
  });
  return response.json();
};

export const getMemberTransactions = async (token, memberId) => {
  const response = await fetch(`${API_URL}/members/${memberId}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};