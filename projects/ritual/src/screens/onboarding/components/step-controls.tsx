import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { t } from '../../../shared/i18n';
import { FIRST_STEP_INDEX, ONBOARDING_I18N_PREFIX } from '../constants';
import { createStyles } from '../styles/step-controls.styles';

export interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onStart: () => void;
}

const I18N_KEYS = {
  previous: `${ONBOARDING_I18N_PREFIX}.previous`,
  next: `${ONBOARDING_I18N_PREFIX}.next`,
  start: `${ONBOARDING_I18N_PREFIX}.start`,
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
  const isFirstStep = currentStep === FIRST_STEP_INDEX;

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
