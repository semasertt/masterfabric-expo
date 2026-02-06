import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IMAGES } from '../../../assets';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import {
  FIRST_STEP_INDEX,
  ONBOARDING_ICON_SHADOW,
  ONBOARDING_ICON_SIZE,
  ONBOARDING_I18N_PREFIX,
} from '../constants';
import type { OnboardingStep } from '../models/onboarding-models';
import { isIoniconName } from '../utils';
import { createStyles } from '../styles/step-content.styles';

interface StepContentProps {
  step: OnboardingStep;
}

export const StepContent: React.FC<StepContentProps> = ({ step }) => {
  const styles = createStyles();
  const isFirstStep = step.id === FIRST_STEP_INDEX;
  const accentColor = RITUAL_COLORS.accent.primary;

  const getIconStyle = () => ({
    backgroundColor: accentColor,
    shadowColor: accentColor,
    ...ONBOARDING_ICON_SHADOW,
  });

  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <View style={styles.graphic}>
          {isFirstStep ? (
            <View style={styles.logoContainer}>
              <Image
                source={IMAGES.logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.appName}>
                {t(`${ONBOARDING_I18N_PREFIX}.step1.title`)}
              </Text>
              <Text style={styles.tagline}>
                {t(`${ONBOARDING_I18N_PREFIX}.step1.description`)}
              </Text>
            </View>
          ) : (
            <View style={styles.iconTextContainer}>
              <View style={styles.iconWrapper}>
                <View style={[styles.iconContainer, getIconStyle()]}>
                  {isIoniconName(step.icon) ? (
                    <Ionicons
                      name={step.icon}
                      size={ONBOARDING_ICON_SIZE}
                      color={RITUAL_COLORS.text.primary}
                    />
                  ) : (
                    <Text style={styles.icon}>{step.icon}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.description}>{step.description}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
