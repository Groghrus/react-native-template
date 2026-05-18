import { httpClient } from '@shared/api/http-client';
import { User, AuthTokens } from '@shared/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

const authApi = {
  login: (data: LoginRequest) =>
    httpClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    httpClient.post<AuthResponse>('/auth/register', data),

  refresh: (refreshToken: string) =>
    httpClient.post<{ tokens: AuthTokens }>('/auth/refresh', { refreshToken }),

  logout: () =>
    httpClient.post('/auth/logout'),
};

export { authApi };
