export { RegistrationProvider, useRegistration } from './RegistrationProvider';
export { default as RegistrationFlow } from './RegistrationFlow';

// Export step components if needed elsewhere
export { default as PersonalInfoStep } from './steps/PersonalInfoStep';
export { default as PasswordStep } from './steps/PasswordStep';
export { default as RoleCompanyStep } from './steps/RoleCompanyStep';
export { default as AddressStep } from './steps/AddressStep';
export { default as TermsPhotoStep } from './steps/TermsPhotoStep';

// Re-export types
export type { RegistrationFormData, RegistrationValidationError, RegistrationContextType } from './RegistrationProvider';
