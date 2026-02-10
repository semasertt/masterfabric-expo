import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { t } from '../../../shared/i18n';
import type { StepControlsProps } from '../models/onboarding-models';
import { createStyles } from '../styles/step-controls.styles';

const I18N_PREFIX = 'screens.onboarding' as const;
const I18N_KEYS = {
  previous: `${I18N_PREFIX}.previous`,
  next: `${I18N_PREFIX}.next`,
  start: `${I18N_PREFIX}.start`,
} as const;

export const StepControls: React.FC<StepControlsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onStart,
}) => {
  const styles = createStyles();
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <View style={[styles.container, isFirstStep && styles.containerFirstStep]}>
      <View style={styles.buttonContainer}>
        {!isFirstStep && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onPrevious}
          >
            <Text style={styles.secondaryButtonText}>
              {t(I18N_KEYS.previous)}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            isFirstStep && styles.primaryButtonFirstStep,
            !isFirstStep && { flex: 1 },
          ]}
          onPress={isLastStep ? onStart : onNext}
        >
          <Text style={styles.buttonText}>
            {isLastStep ? t(I18N_KEYS.start) : t(I18N_KEYS.next)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
