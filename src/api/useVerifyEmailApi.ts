import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type VerifyEmailBody = {
  token: string
}

export type VerifyEmailResponse = {
  token: string
  refresh_token: string
}

export const useVerifyEmailApi = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailBody): Promise<VerifyEmailResponse> =>
      axiosInstance.post(`/auth/email/verify`, data),
  })
}
