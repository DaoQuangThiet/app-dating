import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const GET_CHARACTER_QUERY_KEY = ['character']

export const useGetCharactersApi = () => {
  return useQuery({
    queryKey: GET_CHARACTER_QUERY_KEY,
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/characters`),
  })
}
