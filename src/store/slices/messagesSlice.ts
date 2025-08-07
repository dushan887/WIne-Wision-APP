import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // Auto-dismiss time in milliseconds (0 = no auto-dismiss)
  dismissible?: boolean;
  timestamp: number;
}

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      const message: Message = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        duration: action.payload.duration ?? 5000, // Default 5 seconds
        dismissible: action.payload.dismissible ?? true,
      };
      state.messages.push(message);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
    clearAllMessages: (state) => {
      state.messages = [];
    },
    // Helper actions for common message types
    addSuccessMessage: (state, action: PayloadAction<{ message: string; title?: string; duration?: number }>) => {
      const message: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'success',
        message: action.payload.message,
        title: action.payload.title,
        duration: action.payload.duration ?? 5000,
        dismissible: true,
        timestamp: Date.now(),
      };
      state.messages.push(message);
    },
    addErrorMessage: (state, action: PayloadAction<{ message: string; title?: string; duration?: number }>) => {
      const message: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'error',
        message: action.payload.message,
        title: action.payload.title,
        duration: action.payload.duration ?? 0, // Errors don't auto-dismiss by default
        dismissible: true,
        timestamp: Date.now(),
      };
      state.messages.push(message);
    },
    addWarningMessage: (state, action: PayloadAction<{ message: string; title?: string; duration?: number }>) => {
      const message: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'warning',
        message: action.payload.message,
        title: action.payload.title,
        duration: action.payload.duration ?? 7000,
        dismissible: true,
        timestamp: Date.now(),
      };
      state.messages.push(message);
    },
    addInfoMessage: (state, action: PayloadAction<{ message: string; title?: string; duration?: number }>) => {
      const message: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'info',
        message: action.payload.message,
        title: action.payload.title,
        duration: action.payload.duration ?? 5000,
        dismissible: true,
        timestamp: Date.now(),
      };
      state.messages.push(message);
    },
  },
});

export const {
  addMessage,
  removeMessage,
  clearAllMessages,
  addSuccessMessage,
  addErrorMessage,
  addWarningMessage,
  addInfoMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
