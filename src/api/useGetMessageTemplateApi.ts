import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type GetMessageTemplateResponse = {
  id: string
  message: string
  created_at: string
  updated_at: string
}

export const useGetMessageTemplateApi = () =>
  useMutation({
    mutationFn: (): Promise<GetMessageTemplateResponse> =>
      axiosInstance.get(`/message/template`),
  })
