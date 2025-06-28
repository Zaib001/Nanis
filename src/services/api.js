// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log({ BASE_URL });

const request = async (endpoint, method = "GET", data = null) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || "Something went wrong");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};

// Auth APIs
export const loginUser = (payload) => request("/auth/login", "POST", payload);
export const registerUser = (payload) =>
  request("/auth/signup", "POST", payload);
export const loginGoogle = () => request("/auth/google", "GET");
export const loginMicrosoft = () => request("/auth/microsoft", "GET");
export const loginApple = () => request("/auth/apple", "GET");
export const requestPasswordReset = (payload) =>
  request("/auth/request-password-reset", "POST", payload);
export const resetPassword = (payload) => request("/auth/reset-password", "POST", payload)
export const verifySignupOtp = (payload) =>
  request("/auth/verify-otp", "POST", payload);
export const resendOtp = (payload) =>
  request("/auth/resend-otp", "POST", payload);

export const updateUserProfile = (payload) =>
  request("/user/update", "POST", payload);

export const uploadProfilePic = (payload) => request("/user/upload-picture","POST",payload)
