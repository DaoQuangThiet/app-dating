import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTemplateApi = () => {
  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/message-template/${id}`),
  })
}
