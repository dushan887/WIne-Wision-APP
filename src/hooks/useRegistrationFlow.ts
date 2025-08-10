/**
 * useRegistrationFlow Hook
 * Wine Vision App - Manages registration flow state and navigation
 * Mirrors WordPress registration flow logic
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { 
  getStepsConfig,
  determineNextStep,
  validateStepData,
  prefillCoexhibitorSession,
  canNavigatePrevious,
  clearRegistrationSession,
  type RegistrationSession,
  type StepConfig
} from '../utils/registrationFlow';
import { useRegistrationNotifications } from './useRegistrationNotifications';

export interface NavigationDirection {
  type: 'next' | 'prev' | 'submit';
  targetStep?: string;
}

export interface RegistrationFlowState {
  currentStep: string;
  sessionData: RegistrationSession;
  navigationPath: string[];
  isLoading: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  totalSteps: number;
  currentStepIndex: number;
}

export interface UseRegistrationFlowReturn {
  // State
  state: RegistrationFlowState;
  
  // Navigation
  navigateNext: () => Promise<boolean>;
  navigatePrevious: () => boolean;
  navigateToStep: (stepKey: string) => boolean;
  submitRegistration: () => Promise<boolean>;
  
  // Data management
  updateStepData: (stepKey: string, data: Record<string, any>) => void;
  getStepData: (stepKey: string) => Record<string, any>;
  validateCurrentStep: () => { isValid: boolean; errors: string[]; fields: string[] };
  
  // Step information
  getCurrentStepConfig: () => StepConfig | null;
  getStepComponent: () => string | null;
  isStepRequired: (stepKey: string) => boolean;
  
  // Invitation handling
  handleCoexhibitorInvite: (inviteData: any) => void;
  clearSession: () => void;
  
  // Utilities
  getFormattedProgress: () => { current: number; total: number; percentage: number };
  getStepTitle: () => string;
}

export const useRegistrationFlow = (
  initialStep: string = '1',
  inviteToken?: string
): UseRegistrationFlowReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useRegistrationNotifications();
  
  // Initialize state
  const [state, setState] = useState<RegistrationFlowState>(() => ({
    currentStep: initialStep,
    sessionData: { wv_reg_path: [] },
    navigationPath: [],
    isLoading: false,
    canGoNext: false,
    canGoPrevious: false,
    totalSteps: 0,
    currentStepIndex: 0,
  }));

  // Get current step configuration
  const getCurrentStepConfig = useCallback((): StepConfig | null => {
    const stepsConfig = getStepsConfig();
    return stepsConfig[state.currentStep] || null;
  }, [state.currentStep]);

  // Get step component name
  const getStepComponent = useCallback((): string | null => {
    const config = getCurrentStepConfig();
    return config?.component || null;
  }, [getCurrentStepConfig]);

  // Update step data in session
  const updateStepData = useCallback((stepKey: string, data: Record<string, any>) => {
    setState(prevState => ({
      ...prevState,
      sessionData: {
        ...prevState.sessionData,
        [`wv_reg_${stepKey}`]: data,
      },
    }));
  }, []);

  // Get step data from session
  const getStepData = useCallback((stepKey: string): Record<string, any> => {
    return state.sessionData[`wv_reg_${stepKey}`] || {};
  }, [state.sessionData]);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    const currentStepData = getStepData(state.currentStep);
    return validateStepData(state.currentStep, currentStepData, state.sessionData);
  }, [state.currentStep, state.sessionData, getStepData]);

  // Check if step is required
  const isStepRequired = useCallback((stepKey: string): boolean => {
    const config = getStepsConfig()[stepKey];
    return config?.required.length > 0 || false;
  }, []);

  // Update navigation capabilities
  const updateNavigationState = useCallback(() => {
    const config = getCurrentStepConfig();
    const validation = validateCurrentStep();
    
    setState(prevState => ({
      ...prevState,
      canGoNext: validation.isValid && !!config,
      canGoPrevious: canNavigatePrevious(prevState.currentStep, prevState.sessionData),
    }));
  }, [getCurrentStepConfig, validateCurrentStep]);

  // Navigate to next step
  const navigateNext = useCallback(async (): Promise<boolean> => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      
      // Validate current step
      const validation = validateCurrentStep();
      if (!validation.isValid) {
        notifications.stepValidationError(validation.errors, state.currentStep);
        return false;
      }

      // Force conditional field selection if required
      const config = getCurrentStepConfig();
      if (config?.conditionField) {
        const currentStepData = getStepData(state.currentStep);
        const hasDefault = Array.isArray(config.nextForm) && 
          config.nextForm.some(([match]) => match === 'default');
        
        if (!hasDefault && !currentStepData[config.conditionField]) {
          notifications.requiredFieldsMissing(['Please select an option']);
          return false;
        }
      }

      // Determine next step
      const nextStepKey = determineNextStep(state.currentStep, state.sessionData);
      
      if (!nextStepKey || nextStepKey === 'submit') {
        // Ready for submission
        notifications.registrationSubmitting();
        return true;
      }

      // Update navigation path
      const newPath = [...(state.sessionData.wv_reg_path || []), state.currentStep];
      
      // Clear data if looping back to step 1
      let newSessionData = state.sessionData;
      if (nextStepKey === '1') {
        newSessionData = clearRegistrationSession(state.sessionData);
        newPath.length = 0;
      }

      // Update state
      setState(prevState => ({
        ...prevState,
        currentStep: nextStepKey,
        sessionData: {
          ...newSessionData,
          wv_reg_path: newPath,
        },
        navigationPath: newPath,
        isLoading: false,
      }));

      // Show progress notification
      const stepIndex = newPath.length;
      notifications.stepCompleted(
        stepIndex, 
        `Step ${stepIndex}`, 
        state.totalSteps
      );

      return true;
    } catch (error) {
      console.error('Navigation error:', error);
      notifications.registrationError('An error occurred during navigation. Please try again.');
      setState(prevState => ({ ...prevState, isLoading: false }));
      return false;
    }
  }, [
    state.currentStep, 
    state.sessionData, 
    state.currentStepIndex, 
    state.totalSteps,
    validateCurrentStep, 
    getCurrentStepConfig, 
    getStepData, 
    notifications
  ]);

  // Navigate to previous step
  const navigatePrevious = useCallback((): boolean => {
    if (!canNavigatePrevious(state.currentStep, state.sessionData)) {
      return false;
    }

    const path = state.sessionData.wv_reg_path || [];
    const previousStep = path.pop() || '1';
    
    setState(prevState => ({
      ...prevState,
      currentStep: previousStep,
      sessionData: {
        ...prevState.sessionData,
        wv_reg_path: path,
      },
      navigationPath: path,
    }));

    return true;
  }, [state.currentStep, state.sessionData]);

  // Navigate directly to a specific step
  const navigateToStep = useCallback((stepKey: string): boolean => {
    const stepsConfig = getStepsConfig();
    if (!stepsConfig[stepKey]) {
      notifications.registrationError(`Step "${stepKey}" not found.`);
      return false;
    }

    setState(prevState => ({
      ...prevState,
      currentStep: stepKey,
    }));

    return true;
  }, [notifications]);

  // Submit registration
  const submitRegistration = useCallback(async (): Promise<boolean> => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      
      // Final validation of all collected data
      const allValid = Object.keys(state.sessionData)
        .filter(key => key.startsWith('wv_reg_'))
        .every(key => {
          const stepKey = key.replace('wv_reg_', '');
          const stepData = state.sessionData[key] as Record<string, any>;
          const validation = validateStepData(stepKey, stepData, state.sessionData);
          return validation.isValid;
        });

      if (!allValid) {
        notifications.requiredFieldsMissing(['Please complete all required fields']);
        return false;
      }

      // Process registration (this would call your API)
      notifications.registrationSubmitting();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear session after successful submission
      setState(prevState => ({
        ...prevState,
        sessionData: clearRegistrationSession(prevState.sessionData),
        isLoading: false,
      }));

      const profileType = state.sessionData['wv_reg_1']?.wv_profileSelection || 'User';
      notifications.registrationSuccess(profileType);
      return true;
    } catch (error) {
      console.error('Registration submission error:', error);
      notifications.registrationError('Registration failed. Please try again.');
      setState(prevState => ({ ...prevState, isLoading: false }));
      return false;
    }
  }, [state.sessionData, notifications]);

  // Handle co-exhibitor invitation
  const handleCoexhibitorInvite = useCallback((inviteData: any) => {
    const prefilledSession = prefillCoexhibitorSession(inviteData, state.sessionData);
    
    setState(prevState => ({
      ...prevState,
      currentStep: 'wv-ex-step-3', // Start at step 3 for co-exhibitors
      sessionData: prefilledSession,
      navigationPath: prefilledSession.wv_reg_path || [],
    }));

    notifications.wineVisionWelcome();
  }, [state.sessionData, notifications]);

  // Clear all session data
  const clearSession = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      currentStep: '1',
      sessionData: clearRegistrationSession(prevState.sessionData),
      navigationPath: [],
    }));
    
    notifications.clearAllNotifications();
  }, [notifications]);

  // Get formatted progress information
  const getFormattedProgress = useCallback(() => {
    const total = state.totalSteps;
    const current = state.currentStepIndex + 1;
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    
    return { current, total, percentage };
  }, [state.totalSteps, state.currentStepIndex]);

  // Get current step title
  const getStepTitle = useCallback((): string => {
    const config = getCurrentStepConfig();
    if (!config) return 'Registration Step';
    
    // You could maintain a mapping of step keys to friendly titles
    const stepTitles: Record<string, string> = {
      '1': 'Choose Your Profile',
      'wv-ex-step-1': 'Field of Work',
      'wv-ex-step-2': 'Participation Model',
      'wv-ex-step-3': 'User Category',
      'wv-ex-step-4': 'Category Details',
      'wv-ex-step-5': 'Products & Services',
      'wv-ex-step-6': 'Company Description',
      'wv-ex-step-7': 'Company Information',
      'wv-ex-step-8': 'Registration Details',
      'wv-ex-step-9': 'Social Media',
      'wv-ex-step-10': 'Personal Information',
      'wv-g-photo-company': 'Company Logo',
      'wv-g-photo-profile': 'Profile Photo',
      'wv-g-password': 'Password Setup',
      'final': 'Review & Submit',
    };
    
    return stepTitles[state.currentStep] || 'Registration Step';
  }, [state.currentStep, getCurrentStepConfig]);

  // Update navigation state when dependencies change
  useEffect(() => {
    updateNavigationState();
  }, [updateNavigationState]);

  // Calculate total steps and current index based on user type
  useEffect(() => {
    const profileSelection = state.sessionData['wv_reg_1']?.wv_profileSelection;
    if (profileSelection) {
      const userType = profileSelection.toLowerCase() as 'exhibitor' | 'buyer' | 'visitor';
      // This would be calculated based on the actual flow path
      const estimatedTotalSteps = userType === 'exhibitor' ? 12 : userType === 'buyer' ? 10 : 6;
      const currentIndex = (state.sessionData.wv_reg_path || []).length;
      
      setState(prevState => ({
        ...prevState,
        totalSteps: estimatedTotalSteps,
        currentStepIndex: currentIndex,
      }));
    }
  }, [state.sessionData]);

  return {
    state,
    navigateNext,
    navigatePrevious,
    navigateToStep,
    submitRegistration,
    updateStepData,
    getStepData,
    validateCurrentStep,
    getCurrentStepConfig,
    getStepComponent,
    isStepRequired,
    handleCoexhibitorInvite,
    clearSession,
    getFormattedProgress,
    getStepTitle,
  };
};
