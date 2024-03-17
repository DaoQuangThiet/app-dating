import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type ForgotPasswordBody = {
  email: string
}

export const useForgotPasswordApi = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordBody) =>
      axiosInstance.post(`/auth/password/forgot`, data),
  })
}
