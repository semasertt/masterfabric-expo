import React from 'react';
import { View } from 'react-native';

import type { StepIndicatorProps } from '../models/onboarding-models';
import { createStyles } from '../styles/step-indicator.styles';

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const styles = createStyles();
  const safeStep = Math.max(0, Math.min(currentStep, totalSteps - 1));

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === safeStep && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};
