import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createMessageActions, MESSAGE_PATTERNS } from '../utils/messageHelpers';

// Custom hook for easy message handling
export const useMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const actions = createMessageActions(dispatch);

  return {
    ...actions,
    patterns: MESSAGE_PATTERNS,
    
    // Convenience methods for common scenarios
    handleServerError: (error: any) => {
      if (error?.response?.data?.message) {
        actions.showServerResponse(error.response.data, 'error');
      } else if (error?.message) {
        actions.showServerResponse(error, 'error');
      } else {
        actions.showError(MESSAGE_PATTERNS.SERVER_ERROR);
      }
    },

    handleNetworkError: () => {
      actions.showError(MESSAGE_PATTERNS.NETWORK_ERROR);
    },

    handleUnauthorized: () => {
      actions.showWarning(MESSAGE_PATTERNS.UNAUTHORIZED);
    },

    handleSessionExpired: () => {
      actions.showWarning(MESSAGE_PATTERNS.SESSION_EXPIRED);
    },
  };
};

export default useMessages;
