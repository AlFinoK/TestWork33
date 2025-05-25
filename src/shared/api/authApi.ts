import {
  API_URL,
  httpClient,
  httpClientWithAuth,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from '../lib'

export const authApi = {
  login: (username: string, password: string): Promise<LoginResponse> =>
    httpClient(`${API_URL}/auth/login`, {
      method: 'POST',
      data: { username, password },
    }),

  refreshToken: (token: string, expiresInMins: number): Promise<RefreshTokenResponse> =>
    httpClientWithAuth(`${API_URL}/auth/refresh`, {
      method: 'POST',
      data: { refreshToken: token, expiresInMins },
    }),

  getCurrentUser: (): Promise<User> =>
    httpClientWithAuth(`${API_URL}/auth/me`, {
      method: 'GET',
    }),
}
