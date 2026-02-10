import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'masterfabric-expo-core';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t, useLocale } from '../../../shared/i18n';
import { signOut } from '../../../shared/services/auth-service';
import { createStyles } from '../styles/profile-screen.styles';

export const ProfileScreen: React.FC = () => {
  const styles = createStyles();
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const { currentTheme, setTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      t('screens.profile.logout'),
      undefined,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('screens.profile.logout'),
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (!error) {
              router.replace('/auth');
            }
          },
        },
      ]
    );
  };

  const showLanguagePicker = () => {
    Alert.alert(
      t('screens.profile.language'),
      undefined,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('screens.profile.languageTr'),
          onPress: () => setLocale('tr'),
        },
        {
          text: t('screens.profile.languageEn'),
          onPress: () => setLocale('en'),
        },
      ]
    );
  };

  const showThemePicker = () => {
    Alert.alert(
      t('screens.profile.theme'),
      undefined,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('screens.profile.themeDark'),
          onPress: () => setTheme('dark'),
        },
        {
          text: t('screens.profile.themeLight'),
          onPress: () => setTheme('light'),
        },
        {
          text: t('screens.profile.themeSystem'),
          onPress: () => setTheme('system'),
        },
      ]
    );
  };

  const localeLabel = locale === 'tr' ? t('screens.profile.languageTr') : t('screens.profile.languageEn');
  const themeLabel =
    currentTheme === 'dark'
      ? t('screens.profile.themeDark')
      : currentTheme === 'light'
        ? t('screens.profile.themeLight')
        : t('screens.profile.themeSystem');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screens.profile.title')}</Text>

      <View style={styles.menu}>
        <Pressable
          style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          onPress={showLanguagePicker}
        >
          <Ionicons name="language-outline" size={22} color={RITUAL_COLORS.text.primary} />
          <Text style={styles.menuItemText}>{t('screens.profile.language')}</Text>
          <Text style={styles.menuItemValue}>{localeLabel}</Text>
          <Ionicons name="chevron-forward" size={20} color={RITUAL_COLORS.text.tertiary} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          onPress={showThemePicker}
        >
          <Ionicons name="moon-outline" size={22} color={RITUAL_COLORS.text.primary} />
          <Text style={styles.menuItemText}>{t('screens.profile.theme')}</Text>
          <Text style={styles.menuItemValue}>{themeLabel}</Text>
          <Ionicons name="chevron-forward" size={20} color={RITUAL_COLORS.text.tertiary} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.menuItem, styles.menuItemLogout, pressed && styles.menuItemPressed]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color={RITUAL_COLORS.status.error} />
          <Text style={[styles.menuItemText, styles.menuItemTextLogout]}>{t('screens.profile.logout')}</Text>
          <Ionicons name="chevron-forward" size={20} color={RITUAL_COLORS.text.tertiary} />
        </Pressable>
      </View>
    </View>
  );
};
