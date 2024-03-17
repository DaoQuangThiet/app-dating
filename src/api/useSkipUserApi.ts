import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useSkipUserApi = () =>
  useMutation({
    mutationFn: (userId: string) => axiosInstance.post(`/like/received/${userId}/skip`),
  })
