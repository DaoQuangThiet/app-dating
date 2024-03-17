import { axiosInstance } from '@/libs/axios'
import { Conversation } from '@/types/matches'
import { useMutation } from '@tanstack/react-query'

export type ChatSendMessageBody = {
  content: string
  match_id: string
}

export const useChatSendMessageApi = () =>
  useMutation({
    mutationFn: (data: ChatSendMessageBody): Promise<Conversation> =>
      axiosInstance.post(`/message`, data),
  })
