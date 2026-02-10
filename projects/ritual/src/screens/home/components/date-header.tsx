import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { ICONS, IMAGES } from '../../../assets';

import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';

import type { DateHeaderProps } from '../models/home-models';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/date-header.styles';
import { formatDate, isToday } from '../utils';

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  hideBuildPoints = false,
  showSettingsIcon = false,
}) => {
  const styles = createStyles();
  const router = useRouter();
  const { progress } = useHomeStore();
  const dateText = isToday(date)
    ? t('screens.home.today', { date: formatDate(date) })
    : formatDate(date);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {!hideBuildPoints && (
          <View style={styles.pointsContainer}>
            <Image source={IMAGES.buildPointsIcon} style={styles.buildPointsIcon} resizeMode="contain" />
            <Text style={styles.pointsText}>{t('screens.home.pointsBp', { points: progress.points_earned })}</Text>
          </View>
        )}
        <View style={styles.dateContainer}>
          <Ionicons name={ICONS.calendar} size={20} color={RITUAL_COLORS.text.primary} />
          <Text style={styles.dateText}>{dateText}</Text>
        </View>
      </View>
      {showSettingsIcon ? (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/(tabs)/profile')}
          accessibilityLabel="Settings"
          accessibilityRole="button"
        >
          <Ionicons name={ICONS.settings} size={20} color={RITUAL_COLORS.text.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};
