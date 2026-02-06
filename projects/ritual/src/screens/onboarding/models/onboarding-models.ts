/**
 * Onboarding Screen Models and Types
 */

export interface OnboardingStep {
  id: number;
  icon: string; // Icon name or emoji
  title: string;
  description: string;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export interface OnboardingStoreState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  next: () => void;
  back: () => void;
  skip: () => void;
  goToStep: (step: number) => void;
  complete: () => void;
}
