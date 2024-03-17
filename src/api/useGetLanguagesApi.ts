import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetLanguagesApi = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/languages`),
  })
}
