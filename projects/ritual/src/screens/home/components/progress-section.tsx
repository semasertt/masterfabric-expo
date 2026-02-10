import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Card } from '../../../shared/components';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import type { ProgressSectionProps } from '../models/home-models';
import { createStyles } from '../styles/progress-section.styles';

const CIRCLE_SIZE = 72;
const CIRCLE_STROKE = 6;
const CIRCLE_R = (CIRCLE_SIZE - CIRCLE_STROKE) / 2;
const CIRCLE_CX = CIRCLE_SIZE / 2;
const CIRCLE_CY = CIRCLE_SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

export const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
  const styles = createStyles();
  const pct = progress.progress_percentage;
  const strokeDashOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <Card variant="elevated" style={styles.container}>
      <Text style={styles.title}>{t('screens.home.todaysProgress')}</Text>
      <View style={styles.row}>
        <View style={styles.leftBlock}>
          <Text style={styles.xOfY}>
            <Text style={styles.xOfYCompleted}>{progress.completed_habits}</Text>
            <Text style={styles.xOfYOf}>{t('screens.home.of')}</Text>
            <Text style={styles.xOfYTotal}>{progress.total_habits} </Text>
            <Text style={styles.xOfYLabel}>{t('screens.home.completedLabel')}</Text>
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, pct)}%` },
              ]}
            />
          </View>
        </View>
        <View style={styles.circleWrap}>
          <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
            <Circle
              cx={CIRCLE_CX}
              cy={CIRCLE_CY}
              r={CIRCLE_R}
              stroke={RITUAL_COLORS.border.divider}
              strokeWidth={CIRCLE_STROKE}
              fill="transparent"
            />
            <Circle
              cx={CIRCLE_CX}
              cy={CIRCLE_CY}
              r={CIRCLE_R}
              stroke={RITUAL_COLORS.accent.primary}
              strokeWidth={CIRCLE_STROKE}
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${CIRCLE_CX} ${CIRCLE_CY})`}
            />
          </Svg>
          <View style={styles.percentOverlay}>
            <Text style={styles.percentText}>{pct}%</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
