# Message System Integration Guide

## Overview
The message system provides a centralized way to display success, error, warning, and info messages throughout the Wine Vision app. Messages appear as animated banners at the top of the screen, below the header. **Now with full HTML support for server responses!**

## Features
- **4 Message Types**: Success (green), Error (red), Warning (yellow), Info (purple)
- **HTML Content Support**: Safely renders HTML content from server responses
- **Auto-sanitization**: Removes dangerous HTML while preserving safe formatting
- **Auto-dismiss**: Configurable timeout for automatic dismissal
- **Manual Dismiss**: Users can tap the X button to dismiss messages
- **Animated**: Smooth slide-in/out animations
- **Global State**: Messages persist across navigation until dismissed
- **Responsive**: Adapts to different screen sizes

## Quick Start

### 1. Using the `useMessages` Hook (Recommended)
```tsx
import { useMessages } from '../hooks';

const MyComponent = () => {
  const messages = useMessages();

  const handleSuccess = () => {
    messages.showSuccess('Profile updated successfully!');
  };

  const handleError = () => {
    messages.showError('Failed to save changes', 'Error');
  };

  const handleWarning = () => {
    messages.showWarning('Please verify your email address');
  };

  const handleInfo = () => {
    messages.showInfo('New features are available!');
  };

  return (
    // Your component JSX
  );
};
```

### 2. Using Predefined Message Patterns
```tsx
import { useMessages } from '../hooks';

const LoginComponent = () => {
  const messages = useMessages();

  const handleLogin = async () => {
    try {
      await loginUser();
      messages.showSuccess(messages.patterns.LOGIN_SUCCESS);
    } catch (error) {
      messages.showError(messages.patterns.LOGIN_ERROR);
    }
  };
};
```

### 3. Handling HTML Content from Server
```tsx
import { useMessages } from '../hooks';

const ApiComponent = () => {
  const messages = useMessages();

  const handleApiResponse = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const data = await response.json();
      
      // Automatically handles HTML content safely
      messages.showServerResponse(data, 'success');
    } catch (error) {
      // Smart error handling
      messages.handleServerError(error);
    }
  };

  const handleHtmlMessage = () => {
    // For messages with HTML formatting
    messages.showSuccessHTML(
      '<p>Profile updated <strong>successfully</strong>!</p>',
      '<strong>Success</strong>'
    );
  };
};
```

### 4. Smart Server Response Handling
```tsx
const messages = useMessages();

// Automatically detects and handles different response formats
messages.showServerResponse({
  message: '<p>Welcome back, <strong>John</strong>!</p>',
  title: 'Login Successful'
}, 'success');

// Handles WordPress-style responses
messages.showServerResponse({
  error: '<strong>ERROR</strong>: Invalid credentials provided.'
});

// Network and common error shortcuts
messages.handleNetworkError();
messages.handleUnauthorized();
messages.handleSessionExpired();
```

### 5. Direct Redux Dispatch
```tsx
import { useDispatch } from 'react-redux';
import { addSuccessMessage, addErrorMessage } from '../store';

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(addSuccessMessage({ 
      message: 'Action completed successfully!',
      title: 'Success',
      duration: 3000 
    }));
  };
};
```

## HTML Content Support

### Supported HTML Tags
The system safely renders the following HTML elements:
- **Text formatting**: `<strong>`, `<b>`, `<em>`, `<i>`
- **Paragraphs**: `<p>`, `<br>`
- **Lists**: `<ul>`, `<ol>`, `<li>`
- **Links**: `<a>` (click handling disabled for security)

### Automatic Sanitization
- Removes dangerous elements: `<script>`, `<iframe>`, `<object>`
- Strips harmful attributes: `onclick`, `javascript:`, `data:`
- Removes form elements: `<form>`, `<input>`, `<button>`
- Preserves safe formatting and styling

### Server Response Examples
```tsx
// WordPress error response
{
  "message": "<strong>ERROR</strong>: Username is required."
}

// Formatted success message
{
  "message": "<p>Welcome back, <strong>John Doe</strong>!</p><p>Last login: <em>2 hours ago</em></p>"
}

// Complex HTML content
{
  "message": "<p>Your profile has been updated with the following changes:</p><ul><li>Email address</li><li>Phone number</li></ul>"
}
```

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(addSuccessMessage({ 
      message: 'Action completed successfully!',
      title: 'Success',
      duration: 3000 
    }));
  };
};
```

## Message Options

### Message Properties
- **message** (required): The main message text
- **title** (optional): Bold title text displayed above the message
- **duration** (optional): Auto-dismiss time in milliseconds (0 = no auto-dismiss)
- **dismissible** (optional): Whether users can manually dismiss (default: true)

### Default Durations
- **Success**: 5 seconds
- **Error**: No auto-dismiss (user must dismiss manually)
- **Warning**: 7 seconds
- **Info**: 5 seconds

## Available Message Patterns

The system includes predefined message patterns for common scenarios:

- `LOGIN_SUCCESS`
- `LOGIN_ERROR`
- `LOGOUT_SUCCESS`
- `REGISTRATION_SUCCESS`
- `REGISTRATION_ERROR`
- `PROFILE_UPDATE_SUCCESS`
- `PROFILE_UPDATE_ERROR`
- `NETWORK_ERROR`
- `SERVER_ERROR`
- `VALIDATION_ERROR`
- `FEATURE_COMING_SOON`
- `UNAUTHORIZED`
- `SESSION_EXPIRED`

## Custom Styling

Messages automatically use the app's color scheme from `tailwind.config.js`:

- **Success**: Green background (`colors.g`)
- **Error**: Red background (`colors.r`)
- **Warning**: Yellow background (`colors.y`)
- **Info**: Purple background (`colors.v`)

## Integration in Existing Components

The message area is already integrated into the `CustomHeader` component and will appear on all screens that use this header. No additional setup is required for basic usage.

## Advanced Usage

### Clearing All Messages
```tsx
const messages = useMessages();
messages.clearAll();
```

### Dismissing Specific Messages
```tsx
const messages = useMessages();
const messageId = 'some-message-id';
messages.dismissMessage(messageId);
```

### Custom Duration Examples
```tsx
const messages = useMessages();

// Never auto-dismiss
messages.showError('Critical error', 'Error', 0);

// Quick dismiss (2 seconds)
messages.showInfo('Quick notification', undefined, 2000);

// Long duration (10 seconds)
messages.showWarning('Important warning', 'Warning', 10000);
```

## Best Practices

1. **Use Appropriate Types**: Choose the correct message type for the context
2. **Keep Messages Concise**: Short, clear messages are more effective
3. **Use Titles Sparingly**: Only when additional context is needed
4. **Handle Errors Gracefully**: Always show user-friendly error messages
5. **Avoid Message Spam**: Don't show multiple messages for the same action
6. **Test Auto-dismiss**: Ensure messages don't disappear too quickly

## Troubleshooting

### Messages Not Appearing
- Ensure `CustomHeader` is rendered on the screen
- Check if the Redux store includes the `messages` slice
- Verify the message area is not hidden by other UI elements

### Messages Not Auto-dismissing
- Check if `duration` is set to 0 (no auto-dismiss)
- Verify the message component is properly mounted

### Styling Issues
- Ensure Tailwind CSS colors are properly configured
- Check if custom styles are overriding message styles

## Future Enhancements

Potential improvements for the message system:
- Sound notifications
- Persistent messages across app restarts
- Message categories and filtering
- Rich content support (images, buttons)
- Position customization (top/bottom)
