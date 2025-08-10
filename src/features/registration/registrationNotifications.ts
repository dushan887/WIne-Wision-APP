/**
 * Registration Process Notifications
 * Wine Vision App - Comprehensive notification system for registration flow
 */

import { AppDispatch } from '../store';
import { createMessageActions } from './messageHelpers';

export interface RegistrationStep {
  stepNumber: number;
  stepName: string;
  userType: 'exhibitor' | 'buyer' | 'visitor';
  isCompleted: boolean;
  isRequired: boolean;
}

export interface RegistrationNotificationOptions {
  showProgressMessages?: boolean;
  showValidationMessages?: boolean;
  showSuccessMessages?: boolean;
  customDuration?: number;
}

export const createRegistrationNotifications = (dispatch: AppDispatch, options: RegistrationNotificationOptions = {}) => {
  const actions = createMessageActions(dispatch);
  
  const {
    showProgressMessages = true,
    showValidationMessages = true,
    showSuccessMessages = true,
    customDuration = 4000
  } = options;

  return {
    // Step Navigation Messages
    stepStarted: (stepNumber: number, stepName: string, userType: string) => {
      if (!showProgressMessages) return;
      
      const userTypeDisplay = userType.charAt(0).toUpperCase() + userType.slice(1);
      actions.showInfo(
        `Complete this step to continue your ${userTypeDisplay} registration.`,
        `📝 Step ${stepNumber}: ${stepName}`,
        customDuration
      );
    },

    stepCompleted: (stepNumber: number, stepName: string, totalSteps: number) => {
      if (!showSuccessMessages) return;
      
      actions.showSuccess(
        `Step ${stepNumber} of ${totalSteps} completed successfully!`,
        `✅ ${stepName}`,
        3000
      );
    },

    stepValidationError: (errors: string[], stepName: string) => {
      if (!showValidationMessages) return;
      
      const errorMessage = errors.length === 1 
        ? errors[0]
        : `Please fix the following issues:\n• ${errors.join('\n• ')}`;
      
      actions.showError(
        errorMessage,
        `❌ ${stepName} - Validation Required`,
        0 // Don't auto-dismiss validation errors
      );
    },

    // User Type Specific Messages
    exhibitorWelcome: () => {
      actions.showInfoHTML(
        `<strong>Welcome, Exhibitor!</strong><br/>You're registering to showcase your products at Wine Vision 2025. Complete all steps to activate your exhibitor profile.`,
        '🍷 Exhibitor Registration',
        6000
      );
    },

    buyerWelcome: () => {
      actions.showInfoHTML(
        `<strong>Welcome, Professional Buyer!</strong><br/>You're registering to discover premium wines and connect with exhibitors at Wine Vision 2025.`,
        '🛒 Buyer Registration',
        6000
      );
    },

    visitorWelcome: () => {
      actions.showInfoHTML(
        `<strong>Welcome, Visitor!</strong><br/>You're registering to attend Wine Vision 2025 and explore the world of premium wines.`,
        '👤 Visitor Registration',
        6000
      );
    },

    // Progress Tracking Messages
    registrationProgress: (completedSteps: number, totalSteps: number, userType: string) => {
      if (!showProgressMessages) return;
      
      const percentage = Math.round((completedSteps / totalSteps) * 100);
      const userTypeDisplay = userType.charAt(0).toUpperCase() + userType.slice(1);
      
      if (percentage >= 75) {
        actions.showSuccess(
          `Almost done! ${percentage}% of your ${userTypeDisplay} registration completed.`,
          `🎯 Registration Progress`,
          4000
        );
      } else if (percentage >= 50) {
        actions.showInfo(
          `Great progress! ${percentage}% of your ${userTypeDisplay} registration completed.`,
          `📊 Registration Progress`,
          4000
        );
      } else {
        actions.showInfo(
          `Getting started! ${percentage}% of your ${userTypeDisplay} registration completed.`,
          `🚀 Registration Progress`,
          4000
        );
      }
    },

    // Photo Upload Messages
    photoUploadStarted: (photoType: 'profile' | 'company') => {
      const type = photoType === 'profile' ? 'Profile Photo' : 'Company Logo';
      actions.showInfo(
        `Uploading your ${type.toLowerCase()}... Please wait.`,
        `📸 ${type} Upload`,
        3000
      );
    },

    photoUploadSuccess: (photoType: 'profile' | 'company') => {
      const type = photoType === 'profile' ? 'Profile Photo' : 'Company Logo';
      actions.showSuccess(
        `Your ${type.toLowerCase()} has been uploaded successfully!`,
        `✅ ${type} Uploaded`,
        3000
      );
    },

    photoUploadError: (photoType: 'profile' | 'company', error?: string) => {
      const type = photoType === 'profile' ? 'Profile Photo' : 'Company Logo';
      const message = error || `Failed to upload ${type.toLowerCase()}. Please try again.`;
      actions.showError(
        message,
        `❌ ${type} Upload Failed`,
        0
      );
    },

    // Password Creation Messages
    passwordRequirements: () => {
      actions.showInfoHTML(
        `<strong>Password Requirements:</strong><br/>• At least 8 characters<br/>• Include uppercase & lowercase letters<br/>• Include numbers<br/>• Include special characters (!@#$%^&*)`,
        '🔒 Secure Password',
        8000
      );
    },

    passwordStrengthWeak: () => {
      actions.showWarning(
        'Your password is weak. Please add more characters, numbers, or special symbols.',
        '⚠️ Password Strength',
        5000
      );
    },

    passwordMismatch: () => {
      actions.showError(
        'Passwords do not match. Please ensure both password fields are identical.',
        '❌ Password Confirmation',
        5000
      );
    },

    passwordCreated: () => {
      actions.showSuccess(
        'Secure password created successfully!',
        '✅ Password Set',
        3000
      );
    },

    // Final Registration Messages
    registrationSubmitting: () => {
      actions.showInfo(
        'Submitting your registration... This may take a few moments.',
        '⏳ Processing Registration',
        0 // Don't auto-dismiss while processing
      );
    },

    registrationSuccess: (userType: string) => {
      const userTypeDisplay = userType.charAt(0).toUpperCase() + userType.slice(1);
      actions.showSuccessHTML(
        `<strong>Welcome to Wine Vision 2025!</strong><br/>Your ${userTypeDisplay} registration is complete. Check your email for account verification instructions.`,
        '🎉 Registration Complete',
        10000
      );
    },

    registrationError: (error?: string) => {
      const message = error || 'Registration failed due to an unexpected error. Please try again.';
      actions.showError(
        message,
        '❌ Registration Failed',
        0
      );
    },

    // Email Verification Messages
    verificationEmailSent: () => {
      actions.showSuccess(
        'A verification email has been sent to your email address. Please check your inbox and spam folder.',
        '📧 Verification Email Sent',
        8000
      );
    },

    resendVerificationEmail: () => {
      actions.showInfo(
        'Verification email has been resent. Please check your inbox and spam folder.',
        '📧 Email Resent',
        5000
      );
    },

    // Connection & Server Messages
    connectionLost: () => {
      actions.showWarning(
        'Connection lost. Your progress is saved. Please check your internet connection.',
        '⚠️ Connection Issue',
        0
      );
    },

    connectionRestored: () => {
      actions.showSuccess(
        'Connection restored! You can continue with your registration.',
        '✅ Back Online',
        3000
      );
    },

    serverMaintenance: () => {
      actions.showWarning(
        'Server maintenance in progress. Your registration will be saved automatically.',
        '🔧 Maintenance Mode',
        0
      );
    },

    // Utility Methods
    clearAllNotifications: () => {
      actions.clearAll();
    },

    // Field Validation System
    validateStepFields: (
      stepNumber: number, 
      userType: 'exhibitor' | 'buyer' | 'visitor', 
      formData: Record<string, any>
    ) => {
      const stepConfig = STEP_FIELD_REQUIREMENTS[userType][stepNumber as keyof typeof STEP_FIELD_REQUIREMENTS[typeof userType]];
      if (!stepConfig) return { isValid: true, errors: [] };

      const errors: string[] = [];
      const { required, validations } = stepConfig;

      // Check required fields
      required.forEach(fieldName => {
        const value = formData[fieldName];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          const displayName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          errors.push(`${displayName} is required`);
        }
      });

      // Check field validations
      Object.entries(validations).forEach(([fieldName, rules]) => {
        const value = formData[fieldName];
        const displayName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        if (value) {
          // String validations
          if (typeof value === 'string') {
            if (rules.minLength && value.length < rules.minLength) {
              errors.push(`${displayName} must be at least ${rules.minLength} characters long`);
            }
            if (rules.maxLength && value.length > rules.maxLength) {
              errors.push(`${displayName} must not exceed ${rules.maxLength} characters`);
            }
            if (rules.pattern && !rules.pattern.test(value)) {
              if (fieldName === 'email') {
                errors.push(`${displayName} must be a valid email address`);
              } else if (fieldName === 'phone') {
                errors.push(`${displayName} must be a valid phone number`);
              } else if (fieldName === 'website') {
                errors.push(`${displayName} must be a valid website URL`);
              } else {
                errors.push(`${displayName} format is invalid`);
              }
            }
          }

          // Number validations
          if (typeof value === 'number' || !isNaN(Number(value))) {
            const numValue = Number(value);
            if (rules.min !== undefined && numValue < rules.min) {
              errors.push(`${displayName} must be at least ${rules.min}`);
            }
            if (rules.max !== undefined && numValue > rules.max) {
              errors.push(`${displayName} must not exceed ${rules.max}`);
            }
          }

          // Array validations
          if (Array.isArray(value)) {
            if (rules.minItems && value.length < rules.minItems) {
              errors.push(`Please select at least ${rules.minItems} option(s) for ${displayName}`);
            }
          }

          // Password validations
          if (fieldName === 'password') {
            if (rules.requireUppercase && !/[A-Z]/.test(value)) {
              errors.push('Password must contain at least one uppercase letter');
            }
            if (rules.requireLowercase && !/[a-z]/.test(value)) {
              errors.push('Password must contain at least one lowercase letter');
            }
            if (rules.requireNumbers && !/\d/.test(value)) {
              errors.push('Password must contain at least one number');
            }
            if (rules.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
              errors.push('Password must contain at least one special character');
            }
          }

          // Confirm password validation
          if (fieldName === 'confirmPassword' && rules.mustMatch) {
            const originalValue = formData[rules.mustMatch];
            if (value !== originalValue) {
              errors.push('Password confirmation does not match');
            }
          }
        }
      });

      return { isValid: errors.length === 0, errors };
    },

    // Custom Wine Vision Messages
    wineVisionWelcome: () => {
      actions.showInfoHTML(
        `<strong>Welcome to Wine Vision 2025!</strong><br/>Join the premier wine industry event connecting producers, buyers, and enthusiasts worldwide.`,
        '🍷 Wine Vision 2025',
        7000
      );
    },

    eventDetails: () => {
      actions.showInfoHTML(
        `<strong>Wine Vision 2025</strong><br/>📅 Event Date: Coming Soon<br/>📍 Location: Belgrade, Serbia<br/>🌟 Premium Wine Industry Event`,
        '🎪 Event Information',
        8000
      );
    },

    // Form Validation Helpers
    requiredFieldsMissing: (fields: string[]) => {
      if (!showValidationMessages) return;
      
      const fieldsList = fields.map(field => `• ${field}`).join('\n');
      actions.showError(
        `Please complete the following required fields:\n${fieldsList}`,
        '❌ Required Fields Missing',
        0
      );
    },

    invalidEmailFormat: () => {
      if (!showValidationMessages) return;
      
      actions.showError(
        'Please enter a valid email address (e.g., user@example.com)',
        '❌ Invalid Email',
        4000
      );
    },

    invalidPhoneFormat: () => {
      if (!showValidationMessages) return;
      
      actions.showError(
        'Please enter a valid phone number with country code',
        '❌ Invalid Phone Number',
        4000
      );
    },
  };
};

// Export convenience function for quick access
export const getRegistrationNotifications = (dispatch: AppDispatch) => {
  return createRegistrationNotifications(dispatch, {
    showProgressMessages: true,
    showValidationMessages: true,
    showSuccessMessages: true,
    customDuration: 4000
  });
};

// Field validation configurations for each step
export const STEP_FIELD_REQUIREMENTS = {
  exhibitor: {
    1: { // Company Information
      required: ['companyName', 'companyType', 'country', 'region'],
      optional: ['website', 'companyDescription'],
      validations: {
        companyName: { minLength: 2, maxLength: 100 },
        website: { pattern: /^https?:\/\/.+\..+/ },
      }
    },
    2: { // Contact Details
      required: ['contactPersonName', 'email', 'phone', 'position'],
      optional: ['alternateEmail', 'alternatePhone'],
      validations: {
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { pattern: /^\+?[\d\s\-\(\)]{8,}$/ },
        contactPersonName: { minLength: 2, maxLength: 50 },
      }
    },
    3: { // Wine Products
      required: ['wineTypes', 'productionVolume', 'exportMarkets'],
      optional: ['certifications', 'awards'],
      validations: {
        wineTypes: { minItems: 1 },
        productionVolume: { min: 0 },
      }
    },
    4: { // Business Information
      required: ['establishedYear', 'numberOfEmployees', 'annualProduction'],
      optional: ['distributionChannels', 'targetMarkets'],
      validations: {
        establishedYear: { min: 1800, max: new Date().getFullYear() },
        numberOfEmployees: { min: 1 },
      }
    },
    5: { // Company Photos
      required: [],
      optional: ['companyLogo', 'facilityPhotos', 'productPhotos'],
      validations: {}
    },
    6: { // Profile Photo
      required: [],
      optional: ['profilePhoto'],
      validations: {}
    },
    7: { // Password Setup
      required: ['password', 'confirmPassword'],
      optional: [],
      validations: {
        password: { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecialChars: true },
        confirmPassword: { mustMatch: 'password' },
      }
    },
    8: { // Review & Submit
      required: ['termsAccepted', 'privacyAccepted'],
      optional: ['marketingConsent'],
      validations: {}
    }
  },
  buyer: {
    1: { // Personal Information
      required: ['firstName', 'lastName', 'email', 'phone'],
      optional: ['title', 'linkedIn'],
      validations: {
        firstName: { minLength: 2, maxLength: 30 },
        lastName: { minLength: 2, maxLength: 30 },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { pattern: /^\+?[\d\s\-\(\)]{8,}$/ },
      }
    },
    2: { // Company Details
      required: ['companyName', 'position', 'country', 'businessType'],
      optional: ['website', 'companySize'],
      validations: {
        companyName: { minLength: 2, maxLength: 100 },
        website: { pattern: /^https?:\/\/.+\..+/ },
      }
    },
    3: { // Buying Preferences
      required: ['wineTypesInterest', 'priceRange', 'volumeRequirements'],
      optional: ['preferredRegions', 'certificationPreferences'],
      validations: {
        wineTypesInterest: { minItems: 1 },
        volumeRequirements: { min: 0 },
      }
    },
    4: { // Business Information
      required: ['currentSuppliers', 'buyingFrequency', 'targetMarkets'],
      optional: ['existingBrands', 'marketingChannels'],
      validations: {}
    },
    5: { // Profile Photo
      required: [],
      optional: ['profilePhoto'],
      validations: {}
    },
    6: { // Password Setup
      required: ['password', 'confirmPassword'],
      optional: [],
      validations: {
        password: { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecialChars: true },
        confirmPassword: { mustMatch: 'password' },
      }
    },
    7: { // Review & Submit
      required: ['termsAccepted', 'privacyAccepted'],
      optional: ['marketingConsent'],
      validations: {}
    }
  },
  visitor: {
    1: { // Personal Information
      required: ['firstName', 'lastName', 'email', 'phone', 'country'],
      optional: ['occupation', 'interests'],
      validations: {
        firstName: { minLength: 2, maxLength: 30 },
        lastName: { minLength: 2, maxLength: 30 },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { pattern: /^\+?[\d\s\-\(\)]{8,}$/ },
      }
    },
    2: { // Contact Details
      required: ['preferredLanguage', 'eventInterests'],
      optional: ['dietaryRestrictions', 'accessibilityNeeds'],
      validations: {
        eventInterests: { minItems: 1 },
      }
    },
    3: { // Profile Photo
      required: [],
      optional: ['profilePhoto'],
      validations: {}
    },
    4: { // Password Setup
      required: ['password', 'confirmPassword'],
      optional: [],
      validations: {
        password: { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecialChars: true },
        confirmPassword: { mustMatch: 'password' },
      }
    },
    5: { // Review & Submit
      required: ['termsAccepted', 'privacyAccepted'],
      optional: ['marketingConsent'],
      validations: {}
    }
  }
} as const;

// Registration step configurations for different user types
export const REGISTRATION_STEPS = {
  exhibitor: [
    { stepNumber: 1, stepName: 'Company Information', isRequired: true },
    { stepNumber: 2, stepName: 'Contact Details', isRequired: true },
    { stepNumber: 3, stepName: 'Wine Products', isRequired: true },
    { stepNumber: 4, stepName: 'Business Information', isRequired: true },
    { stepNumber: 5, stepName: 'Company Photos', isRequired: false },
    { stepNumber: 6, stepName: 'Profile Photo', isRequired: false },
    { stepNumber: 7, stepName: 'Password Setup', isRequired: true },
    { stepNumber: 8, stepName: 'Review & Submit', isRequired: true },
  ],
  buyer: [
    { stepNumber: 1, stepName: 'Personal Information', isRequired: true },
    { stepNumber: 2, stepName: 'Company Details', isRequired: true },
    { stepNumber: 3, stepName: 'Buying Preferences', isRequired: true },
    { stepNumber: 4, stepName: 'Business Information', isRequired: true },
    { stepNumber: 5, stepName: 'Profile Photo', isRequired: false },
    { stepNumber: 6, stepName: 'Password Setup', isRequired: true },
    { stepNumber: 7, stepName: 'Review & Submit', isRequired: true },
  ],
  visitor: [
    { stepNumber: 1, stepName: 'Personal Information', isRequired: true },
    { stepNumber: 2, stepName: 'Contact Details', isRequired: true },
    { stepNumber: 3, stepName: 'Profile Photo', isRequired: false },
    { stepNumber: 4, stepName: 'Password Setup', isRequired: true },
    { stepNumber: 5, stepName: 'Review & Submit', isRequired: true },
  ],
} as const;

// Standalone validation functions

// Field validation for a specific step
export const validateStepFields = (
  stepNumber: number, 
  userType: 'exhibitor' | 'buyer' | 'visitor', 
  formData: Record<string, any>
) => {
  const stepConfig = STEP_FIELD_REQUIREMENTS[userType][stepNumber as keyof typeof STEP_FIELD_REQUIREMENTS[typeof userType]];
  if (!stepConfig) return { isValid: true, errors: [] };

  const errors: string[] = [];
  const { required, validations } = stepConfig;

  // Check required fields
  required.forEach(fieldName => {
    const value = formData[fieldName];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      const displayName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      errors.push(`${displayName} is required`);
    }
  });

  // Check field validations
  Object.entries(validations).forEach(([fieldName, rules]: [string, any]) => {
    const value = formData[fieldName];
    const displayName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    if (value) {
      // String validations
      if (typeof value === 'string') {
        if (rules.minLength && value.length < rules.minLength) {
          errors.push(`${displayName} must be at least ${rules.minLength} characters long`);
        }
        if (rules.maxLength && value.length > rules.maxLength) {
          errors.push(`${displayName} must not exceed ${rules.maxLength} characters`);
        }
        if (rules.pattern && !rules.pattern.test(value)) {
          if (fieldName === 'email') {
            errors.push(`${displayName} must be a valid email address`);
          } else if (fieldName === 'phone') {
            errors.push(`${displayName} must be a valid phone number`);
          } else if (fieldName === 'website') {
            errors.push(`${displayName} must be a valid website URL`);
          } else {
            errors.push(`${displayName} format is invalid`);
          }
        }
      }

      // Number validations
      if (typeof value === 'number' || !isNaN(Number(value))) {
        const numValue = Number(value);
        if (rules.min !== undefined && numValue < rules.min) {
          errors.push(`${displayName} must be at least ${rules.min}`);
        }
        if (rules.max !== undefined && numValue > rules.max) {
          errors.push(`${displayName} must not exceed ${rules.max}`);
        }
      }

      // Array validations
      if (Array.isArray(value)) {
        if (rules.minItems && value.length < rules.minItems) {
          errors.push(`Please select at least ${rules.minItems} option(s) for ${displayName}`);
        }
      }

      // Password validations
      if (fieldName === 'password') {
        if (rules.requireUppercase && !/[A-Z]/.test(value)) {
          errors.push('Password must contain at least one uppercase letter');
        }
        if (rules.requireLowercase && !/[a-z]/.test(value)) {
          errors.push('Password must contain at least one lowercase letter');
        }
        if (rules.requireNumbers && !/\d/.test(value)) {
          errors.push('Password must contain at least one number');
        }
        if (rules.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
          errors.push('Password must contain at least one special character');
        }
      }

      // Confirm password validation
      if (fieldName === 'confirmPassword' && rules.mustMatch) {
        const originalValue = formData[rules.mustMatch];
        if (value !== originalValue) {
          errors.push('Password confirmation does not match');
        }
      }
    }
  });

  return { isValid: errors.length === 0, errors };
};

// Step transition validation
export const validateStepTransition = (
  fromStep: number,
  toStep: number,
  userType: 'exhibitor' | 'buyer' | 'visitor',
  formData: Record<string, any>,
  dispatch: AppDispatch
) => {
  // Clear any existing validation errors
  dispatch({ type: 'messages/clearAll' });

  // Validate current step before allowing transition
  const validation = validateStepFields(fromStep, userType, formData);
  
  if (!validation.isValid) {
    const stepName = REGISTRATION_STEPS[userType].find(s => s.stepNumber === fromStep)?.stepName || `Step ${fromStep}`;
    const notifications = getRegistrationNotifications(dispatch);
    notifications.stepValidationError(validation.errors, stepName);
    return false;
  }

  // Step successfully validated
  const notifications = getRegistrationNotifications(dispatch);
  notifications.stepCompleted(fromStep, REGISTRATION_STEPS[userType].find(s => s.stepNumber === fromStep)?.stepName || `Step ${fromStep}`, REGISTRATION_STEPS[userType].length);
  
  // If moving to next step, show progress
  if (toStep > fromStep) {
    setTimeout(() => {
      notifications.registrationProgress(fromStep, REGISTRATION_STEPS[userType].length, userType);
    }, 1000);
  }

  return true;
};

// Real-time field validation
export const validateFieldRealTime = (
  fieldName: string,
  value: any,
  stepNumber: number,
  userType: 'exhibitor' | 'buyer' | 'visitor',
  formData: Record<string, any>,
  dispatch: AppDispatch
) => {
  const stepConfig = STEP_FIELD_REQUIREMENTS[userType][stepNumber as keyof typeof STEP_FIELD_REQUIREMENTS[typeof userType]];
  if (!stepConfig || !(fieldName in (stepConfig.validations as any))) return { isValid: true, message: null };

  const rules = (stepConfig.validations as any)[fieldName];
  const displayName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: null }; // Don't show error for empty fields in real-time
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return { isValid: false, message: `${displayName} must be at least ${rules.minLength} characters` };
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      if (fieldName === 'email') {
        return { isValid: false, message: 'Please enter a valid email address' };
      } else if (fieldName === 'phone') {
        return { isValid: false, message: 'Please enter a valid phone number' };
      } else if (fieldName === 'website') {
        return { isValid: false, message: 'Please enter a valid website URL (http://...)' };
      }
    }
  }

  // Password strength validation
  if (fieldName === 'password') {
    const strength = getPasswordStrength(value);
    if (strength.score < 3) {
      dispatch({ type: 'messages/addWarningMessage', payload: {
        message: `Password strength: ${strength.level}. ${strength.suggestions.join(' ')}`,
        title: '⚠️ Password Strength',
        duration: 4000
      }});
      return { isValid: false, message: null };
    } else {
      dispatch({ type: 'messages/addSuccessMessage', payload: {
        message: 'Strong password created!',
        title: '✅ Password Strength',
        duration: 2000
      }});
    }
  }

  // Confirm password validation
  if (fieldName === 'confirmPassword') {
    const password = formData.password;
    if (password && value !== password) {
      return { isValid: false, message: 'Passwords do not match' };
    } else if (password && value === password) {
      dispatch({ type: 'messages/addSuccessMessage', payload: {
        message: 'Password confirmation matches!',
        title: '✅ Password Match',
        duration: 2000
      }});
    }
  }

  return { isValid: true, message: null };
};

// Password strength checker
export const getPasswordStrength = (password: string) => {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) score++;
  else suggestions.push('Use at least 8 characters.');

  if (/[A-Z]/.test(password)) score++;
  else suggestions.push('Add uppercase letters.');

  if (/[a-z]/.test(password)) score++;
  else suggestions.push('Add lowercase letters.');

  if (/\d/.test(password)) score++;
  else suggestions.push('Add numbers.');

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  else suggestions.push('Add special characters.');

  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return {
    score,
    level: levels[score] || 'Very Weak',
    suggestions
  };
};

// Get step field requirements
export const getStepRequirements = (stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => {
  return STEP_FIELD_REQUIREMENTS[userType][stepNumber as keyof typeof STEP_FIELD_REQUIREMENTS[typeof userType]] || { required: [], optional: [], validations: {} };
};

// Check if field is required for step  
export const isFieldRequired = (fieldName: string, stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => {
  const requirements = getStepRequirements(stepNumber, userType);
  return (requirements.required as readonly string[]).includes(fieldName);
};
