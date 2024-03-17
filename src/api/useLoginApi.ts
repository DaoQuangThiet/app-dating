import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  refresh_token: string
}

export const useLoginApi = () => {
  return useMutation({
    mutationFn: (data: LoginBody): Promise<LoginResponse> =>
      axiosInstance.post(`/auth/login`, data),
  })
}
