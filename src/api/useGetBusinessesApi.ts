import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetBusinessesApi = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/businesses`),
  })
}
