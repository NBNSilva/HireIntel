import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;
const finalUrl = envUrl !== undefined ? envUrl : "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: finalUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
