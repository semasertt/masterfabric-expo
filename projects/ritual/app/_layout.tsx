import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemeProvider } from 'masterfabric-expo-core';
import { createRootLayoutStyles } from '../src/shared/layouts';
import { RITUAL_COLORS } from '../src/shared/constants';
import { SnackbarQueue } from '../src/shared/components/SnackbarQueue';
import { checkSupabaseAvailability } from '../src/shared/services/supabase-service';
import '../src/shared/services/snackbar-bridge';

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
    <ThemeProvider defaultTheme="system" enablePersistence={true}>
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
    </ThemeProvider>
  );
}
