import 'react-native-reanimated';

import { useEffect } from 'react';

import { Stack, router, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { authService } from '@services/authService';

import { useAuthStore } from '@stores/authStore';

import { queryClient } from '@config/queryClient';

export const unstable_settings = {
  anchor: '(tabs)',
};

// TODO: remove when Firebase credentials are configured
const BYPASS_AUTH = true;

function AuthGate() {
  const { setUser, isLoading } = useAuthStore();
  const navState = useRootNavigationState();

  useEffect(() => {
    if (!navState?.key) return;

    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      if (!isLoading) {
        router.replace(user ? '/(tabs)' : '/login');
      }
    });
    return unsubscribe;
  }, [navState?.key, setUser, isLoading]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!BYPASS_AUTH && <AuthGate />}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ title: 'Quên mật khẩu' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
