import { axiosInstance } from '@/libs/axios'
import { Conversation } from '@/types/matches'
import { useInfiniteQuery } from '@tanstack/react-query'

export type GetConversationResponse = {
  data: Conversation[]
  page: number
  total: number
}

export const GET_CONVERSATION_QUERY_KEY = ['conversation']

export const useGetConversationApi = (id: string) =>
  useInfiniteQuery({
    queryKey: [...GET_CONVERSATION_QUERY_KEY, id],
    queryFn: ({ pageParam }): Promise<GetConversationResponse> =>
      axiosInstance.get(`/communication/${id}/message`, {
        params: { page: pageParam, limit: 20 },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.length < 20) {
        return undefined
      }
      return lastPageParam + 1
    },
    enabled: false,
  })
