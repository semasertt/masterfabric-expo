import { Stack } from 'expo-router';
import { ThemeProvider } from 'masterfabric-expo-core';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SnackbarQueue } from '../src/shared/components';
import { RITUAL_COLORS } from '../src/shared/constants';
import { LocaleProvider } from '../src/shared/i18n';
import { createRootLayoutStyles } from '../src/shared/layouts';
import '../src/shared/services/snackbar-bridge';
import { checkSupabaseAvailability } from '../src/shared/services/supabase-service';

const styles = createRootLayoutStyles();

export default function RootLayout() {
  useEffect(() => {
    const checkConnection = async () => {
      const { available, message } = await checkSupabaseAvailability();
      if (available) {
        console.log('✅', message);
      } else {
        console.warn('⚠️', message);
      }
    };
    checkConnection();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider defaultTheme="system" enablePersistence={true}>
        <LocaleProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: RITUAL_COLORS.background.primary,
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <SnackbarQueue />
        </View>
        </LocaleProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
