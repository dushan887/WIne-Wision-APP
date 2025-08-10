# Wine Vision App Documentation

Welcome to the Wine Vision App documentation! This folder contains all the technical documentation and integration guides for the app, now organized into logical categories.

## 📚 Documentation Index

### 🎨 **Design & UI System** (`/design/`)
- [**Design System Audit**](./design/DESIGN_SYSTEM_AUDIT.md) - Complete design system assessment and guidelines
- [**Font Integration Success**](./design/FONT_INTEGRATION_SUCCESS.md) - Complete guide to Wine Vision font integration
- [**Tailwind Warnings Solved**](./design/TAILWIND_WARNINGS_SOLVED.md) - Resolution of all Tailwind CSS utility warnings

### 🛠️ **Development** (`/development/`)
- [**Development Summary**](./development/DEVELOPMENT_SUMMARY.md) - Overall development progress and milestones
- [**Performance Optimizations**](./development/PERFORMANCE_OPTIMIZATIONS.md) - App performance improvements and best practices
- [**Tailwind Warnings Resolution**](./development/TAILWIND_WARNINGS_RESOLUTION.md) - Technical details on Tailwind warning fixes
- [**Changelog**](./development/CHANGELOG.md) - Version history and changes
- [**Deployment Ready**](./development/DEPLOYMENT_READY.md) - Production deployment readiness checklist

### 🔧 **Features** (`/features/`)
- [**Navigation Structure**](./features/NAVIGATION_STRUCTURE.md) - App navigation and screen organization
- [**Message System Guide**](./features/MESSAGE_SYSTEM_GUIDE.md) - Complete guide to the message system implementation
- [**Registration Flow Validation**](./features/REGISTRATION_FLOW_VALIDATION.md) - Complete WordPress parity validation for registration flow system
- [**Form Field Utilities**](./features/FORM_FIELD_UTILITIES.md) - Form handling and validation utilities

### 🔌 **Integrations** (`/integrations/`)
- [**Wine Vision Integration**](./integrations/WINE_VISION_INTEGRATION.md) - Brand and design system integration
- [**WordPress API Integration Success**](./integrations/WORDPRESS_API_INTEGRATION_SUCCESS.md) - Backend API integration guide
- [**HTML Message Support**](./integrations/HTML_MESSAGE_SUPPORT.md) - How to handle HTML content in messages

## 🏗️ **Architecture Overview**

### Core Technologies
- **React Native** with Expo
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **Tailwind CSS** (via twrnc) for styling

### Key Features
- 🎨 Custom Wine Vision typography and branding with comprehensive color system
- 💬 Global message system with HTML support
- 🔐 Complete registration flow with WordPress parity
- 📱 Responsive design for iOS and Android
- 🌐 WordPress API integration
- ⚡ Zero Tailwind warnings with optimized CSS-in-JS approach

### Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── navigation/     # Navigation configuration
├── store/          # Redux store and slices
├── hooks/          # Custom React hooks
├── utils/          # Utility functions (including wvColors.ts)
└── types/          # TypeScript type definitions
```

### Documentation Structure
```
docs/
├── design/         # Design system, fonts, styling
├── development/    # Development notes, deployment, changelog
├── features/       # App features and functionality
└── integrations/   # External API and service integrations
```

## 🚀 **Quick Start**

1. **Development Setup**: Follow the main README.md in the root directory
2. **Design System**: Check `/design/` folder for styling guidelines
3. **Feature Testing**: Use demo screens in `/features/` documentation
4. **API Integration**: Reference `/integrations/` for backend setup

## 📝 **Contributing**

When adding new features:
1. Place documentation in the appropriate subfolder
2. Update this index with new entries
3. Follow the established naming conventions
4. Include code examples and screenshots where helpful

## 🗂️ **Documentation Organization**

- **Design**: UI/UX, styling, fonts, color systems
- **Development**: Technical implementation, performance, deployment
- **Features**: App functionality, user flows, feature guides
- **Integrations**: External services, APIs, third-party tools

---

*Last updated: August 10, 2025*
*Documentation reorganized and categorized for better navigation*
