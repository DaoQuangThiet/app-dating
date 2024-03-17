import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const useLogoutApi = () => {
  return useMutation({
    mutationFn: () => axiosInstance.post(`/auth/logout`),
  })
}
