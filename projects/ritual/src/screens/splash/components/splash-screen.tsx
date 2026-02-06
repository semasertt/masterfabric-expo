
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { IMAGES } from '../../../assets';
import { t } from '../../../shared/i18n';
import { SPINNER_COLOR, SPINNER_INDICATOR_SIZE } from '../constants';
import { useSplashNavigation } from '../hooks/use-splash-navigation';
import { createStyles } from '../styles/splash-screen.styles';

export const SplashScreen: React.FC = () => {
  const { isChecking } = useSplashNavigation();
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={IMAGES.logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>{t('screens.splash.title')}</Text>
        <Text style={styles.tagline}>{t('screens.splash.tagline')}</Text>
        {isChecking && (
          <ActivityIndicator
            size={SPINNER_INDICATOR_SIZE}
            color={SPINNER_COLOR}
            style={styles.spinner}
          />
        )}
      </View>
    </View>
  );
};
