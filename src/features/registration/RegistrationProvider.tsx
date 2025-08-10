import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';

// Types for registration form state
export interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Role and Company
  role: 'exhibitor' | 'buyer' | 'visitor' | '';
  companyName: string;
  jobTitle: string;
  
  // Address
  country: string;
  city: string;
  address: string;
  
  // Additional fields based on role
  exhibitorFields?: Record<string, any>;
  buyerFields?: Record<string, any>;
  visitorFields?: Record<string, any>;
  
  // Terms and Photo
  photoUri?: string;
  termsAccepted: boolean;
  
  // Form state
  currentStep: number;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface RegistrationValidationError {
  field: string;
  message: string;
}

// Initial state
const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  companyName: '',
  jobTitle: '',
  country: '',
  city: '',
  address: '',
  termsAccepted: false,
  currentStep: 1,
  isSubmitting: false,
  errors: {},
};

// Action types
type RegistrationAction =
  | { type: 'UPDATE_FIELD'; field: keyof RegistrationFormData; value: any }
  | { type: 'UPDATE_MULTIPLE_FIELDS'; fields: Partial<RegistrationFormData> }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'SET_ROLE_FIELDS'; role: string; fields: Record<string, any> };

// Reducer
function registrationReducer(state: RegistrationFormData, action: RegistrationAction): RegistrationFormData {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        // Clear error when field is updated
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
      
    case 'UPDATE_MULTIPLE_FIELDS':
      return {
        ...state,
        ...action.fields,
      };
      
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
      
    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
      
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
      };
      
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
      
    case 'RESET_FORM':
      return initialFormData;
      
    case 'SET_ROLE_FIELDS':
      const roleFieldKey = `${action.role}Fields` as keyof RegistrationFormData;
      return {
        ...state,
        [roleFieldKey]: action.fields,
      };
      
    default:
      return state;
  }
}

// Context interface
interface RegistrationContextType {
  formData: RegistrationFormData;
  updateField: (field: keyof RegistrationFormData, value: any) => void;
  updateMultipleFields: (fields: Partial<RegistrationFormData>) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearError: (field: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  setRoleFields: (role: string, fields: Record<string, any>) => void;
  validateCurrentStep: () => boolean;
  isStepValid: (step: number) => boolean;
}

// Create context
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Provider props
interface RegistrationProviderProps {
  children: ReactNode;
}

// Provider component
export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [formData, dispatch] = useReducer(registrationReducer, initialFormData);

  // Action creators
  const updateField = useCallback((field: keyof RegistrationFormData, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);

  const updateMultipleFields = useCallback((fields: Partial<RegistrationFormData>) => {
    dispatch({ type: 'UPDATE_MULTIPLE_FIELDS', fields });
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    dispatch({ type: 'SET_ERRORS', errors });
  }, []);

  const clearError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_ERROR', field });
  }, []);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      dispatch({ type: 'SET_STEP', step: Math.min(formData.currentStep + 1, 5) });
    }
  }, [formData.currentStep]);

  const prevStep = useCallback(() => {
    dispatch({ type: 'SET_STEP', step: Math.max(formData.currentStep - 1, 1) });
  }, [formData.currentStep]);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const setRoleFields = useCallback((role: string, fields: Record<string, any>) => {
    dispatch({ type: 'SET_ROLE_FIELDS', role, fields });
  }, []);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateCurrentStep = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    switch (formData.currentStep) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;

      case 2: // Password
        if (!formData.password) {
          errors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
          errors.password = 'Password must be at least 8 characters long';
        }
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 3: // Role and Company
        if (!formData.role) errors.role = 'Please select your role';
        if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
        if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
        break;

      case 4: // Address
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        break;

      case 5: // Terms and Photo
        if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';
        break;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  }, [formData]);

  const isStepValid = useCallback((step: number): boolean => {
    // This is a simplified check - in a real app you might want more sophisticated validation
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword);
      case 3:
        return !!(formData.role && formData.companyName && formData.jobTitle);
      case 4:
        return !!(formData.country && formData.city);
      case 5:
        return formData.termsAccepted;
      default:
        return false;
    }
  }, [formData]);

  const contextValue: RegistrationContextType = {
    formData,
    updateField,
    updateMultipleFields,
    setErrors,
    clearError,
    nextStep,
    prevStep,
    goToStep,
    setSubmitting,
    resetForm,
    setRoleFields,
    validateCurrentStep,
    isStepValid,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};

// Hook to use registration context
export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

// Export types for use in components
export type { RegistrationContextType };
