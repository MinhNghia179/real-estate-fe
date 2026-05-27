import { router } from 'expo-router';

import { authService } from '@services/authService';

import { useAuthStore } from '@stores/authStore';

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser } = useAuthStore();

  const logout = async () => {
    await authService.signOut();
    setUser(null);
    router.replace('/login');
  };

  return { user, isLoading, isAuthenticated, logout };
};
