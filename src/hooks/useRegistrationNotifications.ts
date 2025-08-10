/**
 * useRegistrationNotifications Hook
 * Wine Vision App - Easy access to registration notifications
 */

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { 
  createRegistrationNotifications, 
  getRegistrationNotifications,
  validateStepFields,
  validateStepTransition,
  validateFieldRealTime,
  getPasswordStrength,
  getStepRequirements,
  isFieldRequired,
  RegistrationNotificationOptions,
  REGISTRATION_STEPS,
  STEP_FIELD_REQUIREMENTS
} from '../utils/registrationNotifications';

/**
 * Custom hook for managing registration process notifications
 * Follows Wine Vision design standards and provides comprehensive feedback
 */
export const useRegistrationNotifications = (options?: RegistrationNotificationOptions) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Create notification methods with optional custom configuration
  const notifications = options 
    ? createRegistrationNotifications(dispatch, options)
    : getRegistrationNotifications(dispatch);

  // Enhanced methods with additional context tracking
  const enhancedNotifications = {
    ...notifications,

    // Field Validation System - use standalone functions
    validateStepFields: (
      stepNumber: number, 
      userType: 'exhibitor' | 'buyer' | 'visitor', 
      formData: Record<string, any>
    ) => validateStepFields(stepNumber, userType, formData),

    // Step transition validation - use standalone function
    validateStepTransition: (
      fromStep: number,
      toStep: number,
      userType: 'exhibitor' | 'buyer' | 'visitor',
      formData: Record<string, any>
    ) => validateStepTransition(fromStep, toStep, userType, formData, dispatch),

    // Real-time field validation - use standalone function
    validateFieldRealTime: (
      fieldName: string,
      value: any,
      stepNumber: number,
      userType: 'exhibitor' | 'buyer' | 'visitor',
      formData: Record<string, any>
    ) => validateFieldRealTime(fieldName, value, stepNumber, userType, formData, dispatch),

    // Password strength checker - use standalone function
    getPasswordStrength: (password: string) => getPasswordStrength(password),

    // Step field requirements getter - use standalone function
    getStepRequirements: (stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => 
      getStepRequirements(stepNumber, userType),

    // Check if field is required for step - use standalone function
    isFieldRequired: (fieldName: string, stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => 
      isFieldRequired(fieldName, stepNumber, userType),

    // Step management with automatic progress tracking
    startStep: (stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => {
      const steps = REGISTRATION_STEPS[userType];
      const currentStep = steps.find(s => s.stepNumber === stepNumber);
      
      if (currentStep) {
        notifications.stepStarted(stepNumber, currentStep.stepName, userType);
        
        // Show progress
        const completedSteps = stepNumber - 1;
        const totalSteps = steps.length;
        notifications.registrationProgress(completedSteps, totalSteps, userType);
      }
    },

    completeStep: (stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => {
      const steps = REGISTRATION_STEPS[userType];
      const currentStep = steps.find(s => s.stepNumber === stepNumber);
      
      if (currentStep) {
        notifications.stepCompleted(stepNumber, currentStep.stepName, steps.length);
        
        // Show updated progress
        notifications.registrationProgress(stepNumber, steps.length, userType);
      }
    },

    // Validation with context
    validateStep: (
      stepNumber: number, 
      userType: 'exhibitor' | 'buyer' | 'visitor', 
      errors: string[]
    ) => {
      const steps = REGISTRATION_STEPS[userType];
      const currentStep = steps.find(s => s.stepNumber === stepNumber);
      
      if (currentStep && errors.length > 0) {
        notifications.stepValidationError(errors, currentStep.stepName);
        return false;
      }
      return true;
    },

    // Welcome message based on user type
    showWelcome: (userType: 'exhibitor' | 'buyer' | 'visitor') => {
      // Clear any existing messages first
      notifications.clearAllNotifications();
      
      // Show Wine Vision welcome
      notifications.wineVisionWelcome();
      
      // Show user-specific welcome after a delay
      setTimeout(() => {
        switch (userType) {
          case 'exhibitor':
            notifications.exhibitorWelcome();
            break;
          case 'buyer':
            notifications.buyerWelcome();
            break;
          case 'visitor':
            notifications.visitorWelcome();
            break;
        }
      }, 2000);
    },

    // Photo upload with progress tracking
    handlePhotoUpload: async (
      photoType: 'profile' | 'company',
      uploadFunction: () => Promise<any>
    ) => {
      try {
        notifications.photoUploadStarted(photoType);
        const result = await uploadFunction();
        notifications.photoUploadSuccess(photoType);
        return result;
      } catch (error: any) {
        const errorMessage = error?.message || error?.response?.data?.message;
        notifications.photoUploadError(photoType, errorMessage);
        throw error;
      }
    },

    // Password validation with real-time feedback
    validatePassword: (password: string, confirmPassword?: string) => {
      const errors: string[] = [];
      
      // Check length
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      
      // Check uppercase
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      
      // Check lowercase
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      
      // Check numbers
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      
      // Check special characters
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
      
      // Check confirmation match
      if (confirmPassword && password !== confirmPassword) {
        notifications.passwordMismatch();
        return false;
      }
      
      // Show appropriate feedback
      if (errors.length > 0) {
        if (password.length > 0) {
          notifications.passwordStrengthWeak();
        }
        return false;
      } else {
        if (password.length > 0) {
          notifications.passwordCreated();
        }
        return true;
      }
    },

    // Form field validation helpers
    validateEmail: (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        notifications.invalidEmailFormat();
        return false;
      }
      return true;
    },

    validatePhone: (phone: string) => {
      const phoneRegex = /^\+?[\d\s\-\(\)]{8,}$/;
      if (!phoneRegex.test(phone)) {
        notifications.invalidPhoneFormat();
        return false;
      }
      return true;
    },

    validateRequired: (fields: { [key: string]: any }, requiredFields: string[]) => {
      const missing: string[] = [];
      
      requiredFields.forEach(field => {
        if (!fields[field] || (typeof fields[field] === 'string' && fields[field].trim() === '')) {
          missing.push(field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
        }
      });
      
      if (missing.length > 0) {
        notifications.requiredFieldsMissing(missing);
        return false;
      }
      return true;
    },

    // Registration completion flow
    completeRegistration: async (
      userType: 'exhibitor' | 'buyer' | 'visitor',
      submitFunction: () => Promise<any>
    ) => {
      try {
        notifications.registrationSubmitting();
        const result = await submitFunction();
        
        // Clear processing message
        notifications.clearAllNotifications();
        
        // Show success
        notifications.registrationSuccess(userType);
        notifications.verificationEmailSent();
        
        return result;
      } catch (error: any) {
        // Clear processing message
        notifications.clearAllNotifications();
        
        const errorMessage = error?.response?.data?.message || error?.message;
        notifications.registrationError(errorMessage);
        throw error;
      }
    },

    // Get step information
    getStepInfo: (userType: 'exhibitor' | 'buyer' | 'visitor') => {
      return REGISTRATION_STEPS[userType];
    },

    // Check if step is required
    isStepRequired: (stepNumber: number, userType: 'exhibitor' | 'buyer' | 'visitor') => {
      const steps = REGISTRATION_STEPS[userType];
      const step = steps.find(s => s.stepNumber === stepNumber);
      return step?.isRequired || false;
    },

    // Get total steps count
    getTotalSteps: (userType: 'exhibitor' | 'buyer' | 'visitor') => {
      return REGISTRATION_STEPS[userType].length;
    },

    // Connection status management
    handleConnectionLoss: () => {
      notifications.connectionLost();
    },

    handleConnectionRestore: () => {
      notifications.connectionRestored();
    },
  };

  return enhancedNotifications;
};

export default useRegistrationNotifications;
