import { axiosInstance } from '@/libs/axios'
import { UserMatched } from '@/types/matches'
import { useQuery } from '@tanstack/react-query'

export const GET_CHAT_DETAIL_KEY = ['chat-detail']

export const useGetChatDetailApi = (id: string) => {
  return useQuery({
    queryKey: [...GET_CHAT_DETAIL_KEY, id],
    queryFn: (): Promise<UserMatched> =>
      axiosInstance.get(`/communication/${id}`),
  })
}
