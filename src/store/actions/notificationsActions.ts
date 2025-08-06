import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { endpoints } from '../../api';
import { setNotificationsLoading, setNotifications, setNotificationsError, markAsRead } from '../slices/notificationsSlice';

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setNotificationsLoading(true));
      
      const response = await apiClient.get(endpoints.notifications.announcements);
      const notifications = response.data;
      
      dispatch(setNotifications(notifications));
      return notifications;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch notifications';
      dispatch(setNotificationsError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setNotificationsLoading(false));
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { dispatch, rejectWithValue }) => {
    try {
      await apiClient.post(endpoints.notifications.markRead(parseInt(notificationId)));
      
      dispatch(markAsRead(notificationId));
      return notificationId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to mark as read';
      dispatch(setNotificationsError(message));
      return rejectWithValue(message);
    }
  }
);
