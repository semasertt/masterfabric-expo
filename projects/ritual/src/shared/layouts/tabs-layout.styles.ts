import { Platform, StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../constants';
import { getTabBarHeight, getTabBarPaddingBottom, TABS_LAYOUT } from './constants';

export const createTabsLayoutStyles = () =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: RITUAL_COLORS.background.primary,
      borderTopColor: RITUAL_COLORS.border.divider,
      borderTopWidth: TABS_LAYOUT.borderTopWidth,
      paddingBottom: getTabBarPaddingBottom(),
      paddingTop: TABS_LAYOUT.paddingTop,
      height: getTabBarHeight(),
    },
    tabBarLabel: {
      fontSize: TABS_LAYOUT.labelFontSize,
      fontWeight: TABS_LAYOUT.labelFontWeight,
      marginTop: TABS_LAYOUT.labelMarginTop,
    },
  });
