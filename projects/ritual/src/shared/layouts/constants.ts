/**
 * Layout Constants
 * Tab bar and root layout configuration
 */

import { Platform } from 'react-native';

export const TABS_LAYOUT = {
  borderTopWidth: 2,
  paddingBottomIos: 34,
  paddingBottomAndroid: 80,
  paddingTop: 8,
  heightIos: 90,
  heightAndroid: 70,
  labelFontSize: 11,
  labelFontWeight: '600' as const,
  labelMarginTop: 4,
  defaultIconSize: 24,
} as const;

export const getTabBarHeight = () =>
  Platform.OS === 'ios' ? TABS_LAYOUT.heightIos : TABS_LAYOUT.heightAndroid;

export const getTabBarPaddingBottom = () =>
  Platform.OS === 'ios' ? TABS_LAYOUT.paddingBottomIos : TABS_LAYOUT.paddingBottomAndroid;
