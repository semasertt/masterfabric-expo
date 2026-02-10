/**
 * SnackbarQueue Component
 *
 * Global snackbar queue renderer
 * Place this in your app root layout
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSnackbar } from '../hooks/use-snackbar';
import type { SnackbarProps } from '../services/snackbar-service';
import { RITUAL_COLORS } from '../constants';

interface SingleSnackbarProps {
  snackbar: SnackbarProps;
  index: number;
  onDismiss: (id: string) => void;
}

function SingleSnackbar({ snackbar, index, onDismiss }: SingleSnackbarProps) {
  const insets = useSafeAreaInsets();

  const [isExpanded, setIsExpanded] = React.useState(false);

  const translateY = useRef(new Animated.Value(100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in (refs are stable, no need in deps)
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- translateY/opacity are Animated refs, stable
  }, []);

  // Swipe to dismiss gesture
  const panGesture = Gesture.Pan()
    .activeOffsetX(10)
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.setValue(event.translationX);
        const newOpacity = Math.max(0, 1 - event.translationX / 250);
        opacity.setValue(newOpacity);
      }
    })
    .onEnd((event) => {
      const shouldDismiss = event.translationX > 80 || event.velocityX > 500;

      if (shouldDismiss) {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 500,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => onDismiss(snackbar.id));
      } else {
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 120,
            friction: 10,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });

  const getSnackbarColors = () => {
    const customBg = snackbar.customColor;
    const customIcon = snackbar.customIcon;

    if (customBg) {
      return {
        background: customBg,
        icon: RITUAL_COLORS.text.primary,
        iconName: 'information-circle' as const,
        customIcon: customIcon,
      };
    }

    switch (snackbar.type) {
      case 'success':
        return {
          background: RITUAL_COLORS.status.success,
          icon: RITUAL_COLORS.text.primary,
          iconName: 'checkmark-circle' as const,
          customIcon: undefined,
        };
      case 'error':
        return {
          background: RITUAL_COLORS.status.error,
          icon: RITUAL_COLORS.text.primary,
          iconName: 'close-circle' as const,
          customIcon: undefined,
        };
      case 'warning':
        return {
          background: RITUAL_COLORS.status.warning,
          icon: RITUAL_COLORS.text.primary,
          iconName: 'warning' as const,
          customIcon: undefined,
        };
      case 'info':
      default:
        return {
          background: RITUAL_COLORS.status.info,
          icon: RITUAL_COLORS.text.primary,
          iconName: 'information-circle' as const,
          customIcon: undefined,
        };
    }
  };

  const snackbarColors = getSnackbarColors();
  const isTop = snackbar.position === 'top';
  const isCenter = snackbar.position === 'center';

  // Calculate vertical offset for stacking
  const stackOffset = index * 68;
  const bottomPosition = isTop || isCenter ? undefined : insets.bottom + 16 + stackOffset;
  const topPosition = isTop ? insets.top + 16 + stackOffset : (isCenter ? '50%' : undefined);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.container,
          isCenter ? {
            top: '50%',
            transform: [
              { translateY: -30 },
              { translateX },
            ],
          } : {
            [isTop ? 'top' : 'bottom']: isTop ? topPosition : bottomPosition,
            transform: [
              { translateY: isTop ? Animated.multiply(translateY, -1) : translateY },
              { translateX },
            ],
          },
          {
            opacity,
            zIndex: 9999 - index,
          },
        ]}
        pointerEvents="auto"
      >
        <View
          style={[
            styles.snackbar,
            {
              backgroundColor: snackbarColors.background,
            },
          ]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              {snackbarColors.customIcon ? (
                <Text style={{ fontSize: 32, lineHeight: 32, color: RITUAL_COLORS.text.primary }}>
                  {snackbarColors.customIcon}
                </Text>
              ) : (
                <Ionicons
                  name={snackbarColors.iconName}
                  size={32}
                  color={snackbarColors.icon}
                />
              )}
            </View>

            <Pressable onPress={() => setIsExpanded(!isExpanded)} style={{ flex: 1 }}>
              <Text
                style={[
                  styles.message,
                  {
                    color: RITUAL_COLORS.text.primary,
                    flex: undefined,
                    flexShrink: 1,
                  }
                ]}
                numberOfLines={isExpanded ? undefined : 3}
                ellipsizeMode="tail"
              >
                {snackbar.message}
              </Text>
            </Pressable>

          {snackbar.action && (
            <Pressable
              onPress={() => {
                snackbar.action?.onPress();
                onDismiss(snackbar.id);
              }}
              style={styles.actionButton}
            >
              <Text
                style={[
                  styles.actionText,
                  {
                    color: RITUAL_COLORS.text.primary,
                    fontSize: snackbar.action.label.length <= 2 ? 28 : 14,
                  },
                ]}
              >
                {snackbar.action.label}
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={() => onDismiss(snackbar.id)}
          style={styles.closeButton}
          hitSlop={8}
        >
          <Ionicons name="close" size={20} color={RITUAL_COLORS.text.primary} />
        </Pressable>
      </View>
      </Animated.View>
    </GestureDetector>
  );
}

export function SnackbarQueue() {
  const { snackbars, dismissSnackbar } = useSnackbar();

  if (snackbars.length === 0) return null;

  // Separate snackbars by position
  const centerSnackbars = snackbars.filter(s => s.position === 'center');
  const otherSnackbars = snackbars.filter(s => s.position !== 'center');

  // For center position, show only the latest one
  const displaySnackbars = [
    ...otherSnackbars,
    ...(centerSnackbars.length > 0 ? [centerSnackbars[centerSnackbars.length - 1]] : [])
  ];

  const topCenterSnackbar = centerSnackbars.length > 0 ? centerSnackbars[centerSnackbars.length - 1] : null;

  const handleBackdropPress = () => {
    if (topCenterSnackbar) {
      dismissSnackbar(topCenterSnackbar.id);
    }
  };

  return (
    <Modal
      visible={displaySnackbars.length > 0}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={handleBackdropPress}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        {topCenterSnackbar && (
          <Pressable
            style={[StyleSheet.absoluteFillObject, { backgroundColor: RITUAL_COLORS.overlay.backdrop }]}
            onPress={handleBackdropPress}
          />
        )}
        {displaySnackbars.map((snackbar, index) => (
          <SingleSnackbar
            key={snackbar.id}
            snackbar={snackbar}
            index={snackbar.position === 'center' ? 0 : index}
            onDismiss={dismissSnackbar}
          />
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 99999,
  },
  snackbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 60,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
