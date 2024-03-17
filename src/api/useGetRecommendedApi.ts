import { axiosInstance } from '@/libs/axios'
import { Profile } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useGetRecommendedApi = (isSkip: boolean) => {
  return useQuery({
    queryKey: ['recommend', isSkip],
    queryFn: (): Promise<Profile> =>
      axiosInstance.get(`/recommend`, {
        params: { is_skip: isSkip },
      }),
    retry: false,
  })
}
