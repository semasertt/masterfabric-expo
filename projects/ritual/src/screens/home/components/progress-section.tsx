import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../shared/components';
import { createStyles } from '../styles/progress-section.styles';
import { t } from '../../../shared/i18n';
import { RITUAL_COLORS } from '../../../shared/constants';
import type { ProgressSectionProps } from '../models/home-models';

export const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
  const styles = createStyles();

  const remainingTasks = progress.total_habits - progress.completed_habits;
  const motivationText =
    remainingTasks > 0
      ? t('screens.home.almostThere', { count: remainingTasks })
      : t('screens.home.complete');

  return (
    <Card variant="elevated" style={styles.container}>
      <Text style={styles.title}>
        {t('screens.home.constructionProgress')}
      </Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {progress.progress_percentage}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress.progress_percentage}%`,
                backgroundColor: RITUAL_COLORS.accent.primary,
              },
            ]}
          />
        </View>
        <Text style={styles.motivationText}>{motivationText}</Text>
      </View>
    </Card>
  );
};
