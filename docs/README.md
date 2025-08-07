# Wine Vision App Documentation

Welcome to the Wine Vision App documentation! This folder contains all the technical documentation and integration guides for the app.

## 📚 Documentation Index

### 🎨 **Design & Typography**
- [**Font Integration Success**](./FONT_INTEGRATION_SUCCESS.md) - Complete guide to Wine Vision font integration
- [**Wine Vision Integration**](./WINE_VISION_INTEGRATION.md) - Brand and design system integration

### 🧭 **Navigation & Structure**
- [**Navigation Structure**](./NAVIGATION_STRUCTURE.md) - App navigation and screen organization

### 💬 **Messaging System**
- [**Message System Guide**](./MESSAGE_SYSTEM_GUIDE.md) - Complete guide to the message system implementation
- [**HTML Message Support**](./HTML_MESSAGE_SUPPORT.md) - How to handle HTML content in messages

### 🔌 **API Integration**
- [**WordPress API Integration Success**](./WORDPRESS_API_INTEGRATION_SUCCESS.md) - Backend API integration guide

## 🏗️ **Architecture Overview**

### Core Technologies
- **React Native** with Expo
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **Tailwind CSS** (via twrnc) for styling

### Key Features
- 🎨 Custom Wine Vision typography and branding
- 💬 Global message system with HTML support
- 🔐 Authentication and user management
- 📱 Responsive design for iOS and Android
- 🌐 WordPress API integration

### Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── navigation/     # Navigation configuration
├── store/          # Redux store and slices
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── types/          # TypeScript type definitions
```

## 🚀 **Quick Start**

1. **Development Setup**: Follow the main README.md in the root directory
2. **Font Testing**: Use the FontTest screen to verify typography
3. **Message Testing**: Use the demo screens to test message functionality
4. **API Testing**: Check authentication and data fetching

## 📝 **Contributing**

When adding new features:
1. Update relevant documentation
2. Add new docs to this index
3. Follow the established naming conventions
4. Include code examples and screenshots where helpful

---

*Last updated: August 7, 2025*
