import { axiosInstance } from '@/libs/axios'
import { UserProfile } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const GET_AUTH_QUERY_KEY = ['auth/profile']

export const useGetAuthApi = () => {
  return useQuery({
    queryKey: GET_AUTH_QUERY_KEY,
    queryFn: (): Promise<UserProfile> => axiosInstance.get(`/auth/profile`),
  })
}
