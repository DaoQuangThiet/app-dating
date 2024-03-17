import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetCarsApi = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/cars`),
  })
}
