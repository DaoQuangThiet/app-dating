import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateMessageTemplateApi = () =>
  useMutation({
    mutationFn: (data: { message: string }) =>
      axiosInstance.post(`/message/template`, data),
  })
