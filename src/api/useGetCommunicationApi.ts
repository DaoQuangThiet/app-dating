import { axiosInstance } from '@/libs/axios'
import { UserMatched } from '@/types/matches'
import { useInfiniteQuery } from '@tanstack/react-query'

export type GetCommunicationResponse = {
  data: UserMatched[]
  page: number
  total: number
}

export const GET_COMMUNICATION_QUERY_KEY = ['communication']

export const useGetCommunicationApi = () =>
  useInfiniteQuery({
    queryKey: GET_COMMUNICATION_QUERY_KEY,
    queryFn: ({ pageParam }): Promise<GetCommunicationResponse> =>
      axiosInstance.get(`/communication?page=${pageParam}&limit=10`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.page
      if (lastPage.data.length >= 10) {
        return currentPage + 1
      }
      return null
    },
  })
