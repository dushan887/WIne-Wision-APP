import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import apiClient, { endpoints } from '../../api';
import { setLoading, setUser, setError, clearUser } from '../slices/userSlice';

// Login action
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      const response = await apiClient.post(endpoints.auth.login, credentials);
      const { user, token } = response.data;
      
      // Store token securely
      await SecureStore.setItemAsync('authToken', token);
      
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Register action
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      const response = await apiClient.post(endpoints.auth.register, userData);
      const { user, token } = response.data;
      
      // Store token securely
      await SecureStore.setItemAsync('authToken', token);
      
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      const response = await apiClient.get(endpoints.user.profile);
      const user = response.data;
      
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      const response = await apiClient.put(endpoints.user.updateProfile, userData);
      const user = response.data;
      
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Logout action
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      // Remove token from secure store
      await SecureStore.deleteItemAsync('authToken');
      
      // Clear user data
      dispatch(clearUser());
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user data even if token removal fails
      dispatch(clearUser());
    }
  }
);

// Check authentication status on app start
export const checkAuthStatus = createAsyncThunk(
  'user/checkAuthStatus',
  async (_, { dispatch }) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      
      if (token) {
        // Token exists, fetch user profile
        dispatch(fetchProfile());
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear any invalid tokens
      await SecureStore.deleteItemAsync('authToken');
    }
  }
);
