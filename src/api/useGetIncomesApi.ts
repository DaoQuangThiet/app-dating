import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetIncomesApi = () => {
  return useQuery({
    queryKey: ['incomes'],
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/incomes`),
  })
}
