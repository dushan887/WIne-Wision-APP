import { AppDispatch } from '../store';
import { 
  addSuccessMessage, 
  addErrorMessage, 
  addWarningMessage, 
  addInfoMessage,
  removeMessage,
  clearAllMessages 
} from '../store/slices/messagesSlice';
import { containsHTML, extractCleanMessage } from './htmlSanitizer';

// Helper functions to easily dispatch messages from anywhere in the app
export const createMessageActions = (dispatch: AppDispatch) => ({
  showSuccess: (message: string, title?: string, duration?: number) => {
    dispatch(addSuccessMessage({ message, title, duration }));
  },

  showError: (message: string, title?: string, duration?: number) => {
    dispatch(addErrorMessage({ message, title, duration }));
  },

  showWarning: (message: string, title?: string, duration?: number) => {
    dispatch(addWarningMessage({ message, title, duration }));
  },

  showInfo: (message: string, title?: string, duration?: number) => {
    dispatch(addInfoMessage({ message, title, duration }));
  },

  // Enhanced methods that handle HTML content
  showSuccessHTML: (htmlMessage: string, htmlTitle?: string, duration?: number) => {
    const message = containsHTML(htmlMessage) ? htmlMessage : htmlMessage;
    const title = htmlTitle && containsHTML(htmlTitle) ? htmlTitle : htmlTitle;
    dispatch(addSuccessMessage({ message, title, duration }));
  },

  showErrorHTML: (htmlMessage: string, htmlTitle?: string, duration?: number) => {
    const message = containsHTML(htmlMessage) ? htmlMessage : htmlMessage;
    const title = htmlTitle && containsHTML(htmlTitle) ? htmlTitle : htmlTitle;
    dispatch(addErrorMessage({ message, title, duration }));
  },

  showWarningHTML: (htmlMessage: string, htmlTitle?: string, duration?: number) => {
    const message = containsHTML(htmlMessage) ? htmlMessage : htmlMessage;
    const title = htmlTitle && containsHTML(htmlTitle) ? htmlTitle : htmlTitle;
    dispatch(addWarningMessage({ message, title, duration }));
  },

  showInfoHTML: (htmlMessage: string, htmlTitle?: string, duration?: number) => {
    const message = containsHTML(htmlMessage) ? htmlMessage : htmlMessage;
    const title = htmlTitle && containsHTML(htmlTitle) ? htmlTitle : htmlTitle;
    dispatch(addInfoMessage({ message, title, duration }));
  },

  // Smart method that auto-detects HTML and processes server responses
  showServerResponse: (response: any, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
    let message = '';
    let title = '';
    
    // Handle different response formats
    if (typeof response === 'string') {
      message = response;
    } else if (response?.message) {
      message = response.message;
      title = response.title || '';
    } else if (response?.error) {
      message = response.error;
      type = 'error';
    } else if (response?.data?.message) {
      message = response.data.message;
      title = response.data.title || '';
    } else {
      message = 'Unknown server response';
    }

    // Process the message based on type
    const actionMap = {
      success: addSuccessMessage,
      error: addErrorMessage,
      warning: addWarningMessage,
      info: addInfoMessage,
    };

    dispatch(actionMap[type]({ message, title, duration }));
  },

  dismissMessage: (id: string) => {
    dispatch(removeMessage(id));
  },

  clearAll: () => {
    dispatch(clearAllMessages());
  },
});

// Common message patterns
export const MESSAGE_PATTERNS = {
  LOGIN_SUCCESS: 'Welcome back! You have successfully logged in.',
  LOGIN_ERROR: 'Login failed. Please check your credentials and try again.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  REGISTRATION_SUCCESS: 'Account created successfully! Please check your email to verify your account.',
  REGISTRATION_ERROR: 'Registration failed. Please try again.',
  PROFILE_UPDATE_SUCCESS: 'Your profile has been updated successfully.',
  PROFILE_UPDATE_ERROR: 'Failed to update profile. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
  FEATURE_COMING_SOON: 'This feature is coming soon!',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
};
