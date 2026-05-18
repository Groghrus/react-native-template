import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@entities/user';
import { authApi } from '@features/auth/api/auth-api';
import { storage } from '@shared/lib/storage';

const useAuth = () => {
  const { setUser, logout: storeLogout } = useUserStore();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      storage.set('accessToken', data.tokens.accessToken);
      storage.set('refreshToken', data.tokens.refreshToken);
      setUser(data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: ({ data }) => {
      storage.set('accessToken', data.tokens.accessToken);
      storage.set('refreshToken', data.tokens.refreshToken);
      setUser(data.user);
    },
  });

  const login = useCallback(
    (email: string, password: string) => loginMutation.mutateAsync({ email, password }),
    [loginMutation],
  );

  const register = useCallback(
    (email: string, password: string, name: string) =>
      registerMutation.mutateAsync({ email, password, name }),
    [registerMutation],
  );

  const logout = useCallback(() => {
    authApi.logout().catch(() => {});
    storeLogout();
  }, [storeLogout]);

  return {
    login,
    register,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
  };
};

export { useAuth };
