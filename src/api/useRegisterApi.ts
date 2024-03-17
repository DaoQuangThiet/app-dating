import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type RegisterBody = {
  email: string
  password: string
}

export type RegisterResponse = {
  token: string
}

export const useRegisterApi = () => {
  return useMutation({
    mutationFn: (data: RegisterBody): Promise<RegisterResponse> =>
      axiosInstance.post(`/auth/register`, data),
  })
}
