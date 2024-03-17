import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetHobbiesApi = () => {
  return useQuery({
    queryKey: ['hobbies'],
    queryFn: (): Promise<{ edges: { id: string; name: string }[] }> =>
      axiosInstance.get(`/master-data/hobbies`),
  })
}
