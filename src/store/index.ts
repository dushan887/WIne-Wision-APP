import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export actions
export * from './actions';

// Export slice actions
export * from './slices/userSlice';
export * from './slices/notificationsSlice';
