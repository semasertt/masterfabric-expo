import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { t } from '../../../shared/i18n';
import { useHomeStore } from '../../home/store/home-store';
import { createStyles } from '../styles/game-world-screen.styles';

export const GameWorldScreen: React.FC = () => {
  const styles = createStyles();
  const { points, syncPointsFromProfile } = useHomeStore();

  // Refresh GP from backend whenever tab gains focus (so balance is correct when returning from Home)
  useFocusEffect(
    useCallback(() => {
      syncPointsFromProfile();
    }, [syncPointsFromProfile])
  );

  return (
    <View style={styles.container}>
      <View style={styles.gpBadge}>
        <Text style={styles.gpLabel}>{t('screens.gameWorld.gpLabel')}</Text>
        <Text style={styles.gpValue}>{points}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t('screens.tabs.gameWorld')}</Text>
        <Text style={styles.subtitle}>{t('screens.gameWorld.comingSoon')}</Text>
      </View>
    </View>
  );
};
