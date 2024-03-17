import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type SeenMessageBody = {
  match_id: string
  list_id: string[]
}

export const useSeenMessageApi = () => {
  return useMutation({
    mutationFn: (data: SeenMessageBody) =>
      axiosInstance.put(`/message/seen`, data),
  })
}
