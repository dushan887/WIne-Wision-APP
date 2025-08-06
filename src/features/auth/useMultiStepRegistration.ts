import { useState } from 'react';

export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
}

export interface RegistrationData {
  // Step 1: Basic Info
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Info
  firstName: string;
  lastName: string;
  phone: string;
  
  // Step 3: Professional Info
  company: string;
  position: string;
  industry: string;
  
  // Step 4: Role Selection
  role: 'visitor' | 'exhibitor' | 'organizer';
  
  // Step 5: Preferences
  interests: string[];
  notifications: boolean;
}

const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    id: 1,
    title: 'Account Details',
    description: 'Create your login credentials',
  },
  {
    id: 2,
    title: 'Personal Information',
    description: 'Tell us about yourself',
  },
  {
    id: 3,
    title: 'Professional Details',
    description: 'Your work information',
  },
  {
    id: 4,
    title: 'Role Selection',
    description: 'Choose your role at the event',
  },
  {
    id: 5,
    title: 'Preferences',
    description: 'Customize your experience',
  },
];

export const useMultiStepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    position: '',
    industry: '',
    role: 'visitor',
    interests: [],
    notifications: true,
  });

  const nextStep = () => {
    if (currentStep < REGISTRATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          registrationData.email &&
          registrationData.password &&
          registrationData.confirmPassword &&
          registrationData.password === registrationData.confirmPassword
        );
      case 2:
        return !!(
          registrationData.firstName &&
          registrationData.lastName &&
          registrationData.phone
        );
      case 3:
        return !!(
          registrationData.company &&
          registrationData.position &&
          registrationData.industry
        );
      case 4:
        return !!registrationData.role;
      case 5:
        return true; // Preferences are optional
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === REGISTRATION_STEPS.length;

  return {
    currentStep,
    steps: REGISTRATION_STEPS,
    registrationData,
    nextStep,
    prevStep,
    updateData,
    canProceed,
    isFirstStep,
    isLastStep,
    isStepValid,
  };
};
