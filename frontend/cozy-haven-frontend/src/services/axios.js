import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL
});

// Automatically attach token if exists
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('cozyUser'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
