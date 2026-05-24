import axios from 'axios';

export const apiClient = axios.create({
  // Production API backend endpoint for DevSync
  baseURL: 'https://devsync-ai-workspace.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('devsync_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);