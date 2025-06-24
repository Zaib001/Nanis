// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = async (endpoint, method = 'GET', data = null) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};

// Auth APIs
export const loginUser = (payload) => request('/auth/login', 'POST', payload);
export const registerUser = (payload) => request('/auth/signup', 'POST', payload);
