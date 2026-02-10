import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { navigationConfig } from '../../../navigation';
import { t } from '../../../shared/i18n';
import { useOnboardingStore } from '../store/onboarding-store';
import { createStyles } from '../styles/onboarding-screen.styles';
import { getOnboardingSteps, TOTAL_STEPS } from '../utils';
import { StepContent } from './step-content';
import { StepControls } from './step-controls';
import { StepIndicator } from './step-indicator';

const { routes } = navigationConfig;

export const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const styles = createStyles();
  const { currentStep, next, back, skip, complete } = useOnboardingStore();

  const steps = useMemo(() => getOnboardingSteps(t), []);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      next();
    } else {
      handleStart();
    }
  };

  const handleStart = async () => {
    await complete();
    router.replace(routes.auth);
  };

  const handleSkip = async () => {
    await skip();
    router.replace(routes.auth);
  };

  const currentStepData = steps[currentStep] ?? steps[0];

  return (
    <View style={styles.container}>
      {/* Header with Skip Button */}
      <View style={styles.header}>
        <View style={styles.backButton} />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>{t('screens.onboarding.skip')}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {currentStepData && <StepContent step={currentStepData} />}
      </View>

      {/* Progress Indicator – between Next and content (Build) */}
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Controls */}
      <StepControls
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onNext={handleNext}
        onPrevious={back}
        onSkip={handleSkip}
        onStart={handleStart}
      />
    </View>
  );
};
