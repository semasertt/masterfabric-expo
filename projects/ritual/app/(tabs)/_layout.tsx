import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { ICONS } from '../../src/assets';
import { RITUAL_COLORS } from '../../src/shared/constants';
import { t } from '../../src/shared/i18n';
import { createTabsLayoutStyles, TABS_LAYOUT } from '../../src/shared/layouts';

const styles = createTabsLayoutStyles();

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: RITUAL_COLORS.accent.primary,
        tabBarInactiveTintColor: RITUAL_COLORS.text.placeholder,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('screens.tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={ICONS.home}
              size={size ?? TABS_LAYOUT.defaultIconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="game-world"
        options={{
          title: t('screens.tabs.gameWorld'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={ICONS.gameController}
              size={size ?? TABS_LAYOUT.defaultIconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('screens.tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={ICONS.person}
              size={size ?? TABS_LAYOUT.defaultIconSize}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
