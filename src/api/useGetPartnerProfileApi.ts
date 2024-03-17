import { axiosInstance } from '@/libs/axios'
import { Profile } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useGetPartnerProfileApi = (id: string) =>
  useQuery({
    queryKey: ['partner-profile', id],
    queryFn: (): Promise<Profile> => axiosInstance.get(`/partner-search/${id}`),
  })
