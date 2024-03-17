import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type ResetPasswordBody = {
  token: string
  password: string
}

export const useResetPasswordApi = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordBody) =>
      axiosInstance.post(`/auth/password/reset`, data),
  })
}
