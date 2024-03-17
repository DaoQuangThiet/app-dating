import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type CreateTemplateBody = {
  title: string
  content: string
}

export const useCreateTemplateApi = () => {
  return useMutation({
    mutationFn: (data: CreateTemplateBody): Promise<object> =>
      axiosInstance.post(`/message-template`, data),
  })
}
