import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const GET_SEARCH_TARGET_QUERY_KEY = ['search-target']

export const useGetSearchTargetApi = () => {
  return useQuery({
    queryKey: GET_SEARCH_TARGET_QUERY_KEY,
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/search-targets`),
  })
}
