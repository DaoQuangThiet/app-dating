import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type CreateVerifyBody = {
  verification_photo: string
}

export const useCreateVerifyForFemaleApi = () => {
  return useMutation({
    mutationFn: (data: CreateVerifyBody): Promise<null> =>
      axiosInstance.post(`/auth/verification-request`, data),
  })
}
