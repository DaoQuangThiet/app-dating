import { axiosInstance } from '@/libs/axios'
import { Profile } from '@/types/profile'
import { useInfiniteQuery } from '@tanstack/react-query'

export const GET_PARTNERS_QUERY_KEY = ['partner-list']

export const useGetPartnersApi = () =>
  useInfiniteQuery({
    queryKey: GET_PARTNERS_QUERY_KEY,
    queryFn: ({ pageParam }) :Promise<{data: Profile[], page: number, total:number}>=>
      axiosInstance.get(`/partner-search`, { params: { page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.length < 10) {
        return undefined
      }
      return lastPageParam + 1
    },
  })
