import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useResendVerifyEmailApi = () => {
  return useMutation({
    mutationFn: () => axiosInstance.get(`/auth/email/verify/resend`),
  })
}
