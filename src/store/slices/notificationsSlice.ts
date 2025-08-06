import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'announcement' | 'system' | 'event';
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    setNotificationsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearNotificationsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setNotificationsLoading,
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  setNotificationsError,
  clearNotificationsError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
