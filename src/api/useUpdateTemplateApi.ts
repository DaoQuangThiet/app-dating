import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type UpdateTemplate = {
  title: string
  content: string
}

export const useUpdateTemplateApi = (id: string) => {
  return useMutation({
    mutationFn: (data: UpdateTemplate) =>
      axiosInstance.put(`/message-template/${id}`, data),
  })
}
