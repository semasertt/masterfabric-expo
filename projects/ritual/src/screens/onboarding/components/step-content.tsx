import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IMAGES } from '../../../assets';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import type { StepContentProps } from '../models/onboarding-models';
import { createStyles } from '../styles/step-content.styles';
import { isIoniconName } from '../utils';

export const StepContent: React.FC<StepContentProps> = ({ step }) => {
  const styles = createStyles();
  const isFirstStep = step.id === 0;
  const accentColor = RITUAL_COLORS.accent.primary;

  const getIconStyle = () => ({
    backgroundColor: accentColor,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
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
                {t('screens.onboarding.step1.title')}
              </Text>
              <Text style={styles.tagline}>
                {t('screens.onboarding.step1.description')}
              </Text>
            </View>
          ) : (
            <View style={styles.iconTextContainer}>
              <View style={styles.iconWrapper}>
                <View style={[styles.iconContainer, getIconStyle()]}>
                  {isIoniconName(step.icon) ? (
                    <Ionicons
                      name={step.icon}
                      size={80}
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
