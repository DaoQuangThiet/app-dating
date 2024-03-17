import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useSendLikeApi = () =>
  useMutation({
    mutationFn: (data: { user_id: string; message: string }) =>
      axiosInstance.post(`/like`, data),
  })
