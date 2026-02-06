import React from 'react';
import { Text, View } from 'react-native';
import { t } from '../../../shared/i18n';
import { createStyles } from '../styles/home-header.styles';

export const HomeHeader: React.FC = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screens.home.appTitle')}</Text>
    </View>
  );
};
