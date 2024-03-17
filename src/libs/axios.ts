import { ApiConfig } from '@/configs/api'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

// TODO: move token getter and setter to other file
export function storeAccessTokens(token: string): void {
  localStorage.setItem('token', token)
}

export function storeRefreshToken(token: string): void {
  localStorage.setItem('refresh_token', token)
}

export function getAccessTokens(): string | null {
  return localStorage.getItem('token')
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token')
}

export function clearAccessTokens(): void {
  localStorage.removeItem('token')
}

export function clearRefreshTokens(): void {
  localStorage.removeItem('refresh_token')
}

const fetchNewToken = async (): Promise<string | null> => {
  try {
    const token: string = await axiosInstance
      .post<{ refresh_token: string }, { token: string }>(
        '/auth/token/refresh',
        { refresh_token: getRefreshToken() },
      )
      .then((res) => {
        return res.token
      })
    return token
  } catch (error) {
    return null
  }
}

const refreshAuth = async (): Promise<string> => {
  const newToken = await fetchNewToken()

  if (newToken) {
    storeAccessTokens(newToken)
    return Promise.resolve(newToken)
  } else {
    return Promise.reject()
  }
}

const axiosInstance = axios.create({
  baseURL: ApiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessTokens()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  } else {
    delete config.headers.Authorization
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data?.data || {}
  },
  (error) => {
    // TODO: use message hook to notify error to screen
    return Promise.reject(error)
  },
)

createAuthRefreshInterceptor(axiosInstance, refreshAuth, {
  pauseInstanceWhileRefreshing: true,
  //TODO: Recheck API
  statusCodes: [401, 403],
})

export { axiosInstance }
