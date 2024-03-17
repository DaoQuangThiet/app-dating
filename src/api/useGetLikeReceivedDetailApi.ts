import { axiosInstance } from '@/libs/axios'
import { ProfileWithMessage } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

// TODO: find a more suitable name
export const useGetLikeReceivedDetailApi = (userId: string) =>
  useQuery({
    queryKey: ['like-received', userId],
    queryFn: (): Promise<ProfileWithMessage> =>
      axiosInstance.get(`/like/received/${userId}`),
  })
