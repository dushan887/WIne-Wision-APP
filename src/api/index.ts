import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base API configuration
const API_BASE_URL = 'https://dev6.dushan887mob3.com/wp-json/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await SecureStore.deleteItemAsync('authToken');
      // You can dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API endpoints
export const endpoints = {
  auth: {
    login: 'jwt-auth/v1/token',
    register: 'wv/v1/register',
    refresh: '/wp/v2/auth/refresh',
  },
  user: {
    profile: 'wv/v1/profile',
    updateProfile: 'wv/v1/profile',
  },
  news: {
    articles: '/wp/v2/posts',
    article: (id: number) => `/wp/v2/posts/${id}`,
  },
  notifications: {
    announcements: '/wp/v2/announcements',
    markRead: (id: number) => `/wp/v2/announcements/${id}/read`,
  },
};
