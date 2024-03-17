import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const GET_PREFECTURE_QUERY_KEY = ['master-data/prefectures']

export const useGetPrefectureApi = () => {
  return useQuery({
    queryKey: GET_PREFECTURE_QUERY_KEY,
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/prefectures`),
  })
}
