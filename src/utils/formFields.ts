// Form field types and validation rules
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'select' 
  | 'multiselect' 
  | 'textarea' 
  | 'checkbox' 
  | 'radio' 
  | 'country' 
  | 'image' 
  | 'password';

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, allData?: any) => string | null;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation?: FieldValidation;
  options?: SelectOption[];
  dependsOn?: string; // Field key that this field depends on
  showWhen?: (data: any) => boolean; // Conditional display logic
  section?: string; // Grouping identifier
  description?: string;
  helpText?: string;
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  website: /^https?:\/\/.+/,
  iban: /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/,
  swift: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
} as const;

// Common validation functions
export const VALIDATORS = {
  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },
  
  email: (value: string): string | null => {
    if (value && !VALIDATION_PATTERNS.email.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },
  
  minLength: (min: number) => (value: string): string | null => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },
  
  maxLength: (max: number) => (value: string): string | null => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },
  
  password: (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 10) return 'Password must be at least 10 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/\d/.test(value)) return 'Password must contain at least one number';
    return null;
  },

  passwordConfirm: (value: string, allData?: any): string | null => {
    if (value !== allData?.wv_user_password) {
      return 'Passwords do not match';
    }
    return null;
  },
} as const;
