import { axiosInstance } from '@/libs/axios'
import { Profile } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const GET_PROFILE_QUERY_KEY = ['profile']

export const useGetProfileApi = () => {
  return useQuery({
    queryKey: GET_PROFILE_QUERY_KEY,
    queryFn: (): Promise<Profile> => axiosInstance.get(`/profile`),
  })
}
