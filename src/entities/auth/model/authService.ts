import { authApi, tokenService } from '@/shared/api'
import toast from 'react-hot-toast'

export const authService = {
  async signIn(username: string, password: string) {
    const response = await authApi.login(username, password)

    if (!response?.accessToken) {
      throw new Error('Токен не получен')
    }

    tokenService.saveTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    })

    toast.success('Вы успешно вошли')
    return response
  },

  logout() {
    tokenService.clearTokens()
    toast.success('Вы вышли из аккаунта')
  },

  async checkAuth(): Promise<boolean> {
    const accessToken = tokenService.getAccessToken()

    if (accessToken) {
      try {
        await authApi.getCurrentUser()
        return true
      } catch {
        tokenService.clearTokens()
        return false
      }
    }

    const refreshToken = tokenService.getRefreshToken()
    if (!refreshToken) {
      tokenService.clearTokens()
      return false
    }

    try {
      const refreshed = await authApi.refreshToken(refreshToken, 60)
      tokenService.saveTokens({
        accessToken: refreshed.refreshToken,
        refreshToken,
      })
      return true
    } catch {
      tokenService.clearTokens()
      return false
    }
  },
}
