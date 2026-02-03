import axios from "axios";

// 1. 🧠 Smart Base URL: Auto-detects if you are on Localhost or Vercel
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api" // 🏠 Running Locally? Use Local Backend
    : "https://hotelsphere-backend.onrender.com/api"; // ☁️ Running Online? Use Render Backend

// 2. Create the Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// 3. 🔥 Add Interceptor to attach Token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
