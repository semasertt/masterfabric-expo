/**
 * Icon Names (Ionicons)
 * String constants for @expo/vector-icons/Ionicons
 */

export const ICONS = {
  add: 'add' as const,
  close: 'close' as const,
  save: 'save' as const,
  trophy: 'trophy' as const,
  buildPoints: 'compass' as const,
  calendar: 'calendar' as const,
  checkmark: 'checkmark' as const,
  ellipsisVertical: 'ellipsis-vertical' as const,
  trashOutline: 'trash-outline' as const,
  chevronBack: 'chevron-back' as const,
  chevronForward: 'chevron-forward' as const,
  home: 'home' as const,
  gameController: 'game-controller' as const,
  person: 'person' as const,
  informationCircle: 'information-circle' as const,
  checkmarkCircle: 'checkmark-circle' as const,
  closeCircle: 'close-circle' as const,
  warning: 'warning' as const,
  eye: 'eye-outline' as const,
  eyeOff: 'eye-off-outline' as const,
  settings: 'settings-outline' as const,
} as const;

export type IconName = (typeof ICONS)[keyof typeof ICONS];
