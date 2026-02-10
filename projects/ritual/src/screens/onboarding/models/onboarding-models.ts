/**
 * Onboarding Screen Models and Types
 */

export interface OnboardingStep {
  id: number;
  icon: string;
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

export interface StepContentProps {
  step: OnboardingStep;
}

export interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onStart: () => void;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}
