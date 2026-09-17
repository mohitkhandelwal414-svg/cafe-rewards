const API_URL = "http://localhost:5000/api";

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};

export const getMembers = async (token) => {
  const response = await fetch(`${API_URL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};