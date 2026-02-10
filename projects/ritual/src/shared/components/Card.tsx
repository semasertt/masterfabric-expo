import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { RITUAL_COLORS } from '../constants';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  ...props
}) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: RITUAL_COLORS.background.secondary,
    borderRadius: 12,
    padding: 0,
    marginBottom: 12,
    borderWidth: 0,
    overflow: 'hidden',
  },
  elevated: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: RITUAL_COLORS.border.divider,
  },
});
