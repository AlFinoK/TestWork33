import axios, { AxiosRequestConfig } from 'axios'

import { tokenService } from '@/shared/api'

const addAuthHeader = (token: string, config: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const isFormData = config.data instanceof FormData

  return {
    ...config,
    headers: {
      Accept: 'application/json',
      'Accept-Language': navigator.language,
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...config.headers,
    },
  }
}

export const httpClientWithAuth = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  let token: string

  try {
    token = tokenService.getAccessToken()
  } catch (e) {
    console.warn('Ошибка получения токена', e)
    throw e
  }

  const configWithAuth = addAuthHeader(token, config || {})

  try {
    const response = await axios(url, configWithAuth)
    return response.data
  } catch (error: any) {
    let errorMessage = 'Something went wrong'

    if (error.response?.data) {
      errorMessage = error.response.data.message || errorMessage
    }

    throw new Error(errorMessage)
  }
}

export const httpClient = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const configWithHeaders: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': navigator.language,
      ...(config?.headers || {}),
    },
    ...config,
  }

  try {
    const response = await axios(url, configWithHeaders)
    return response.data
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Something went wrong'
    throw new Error(errorMessage)
  }
}
