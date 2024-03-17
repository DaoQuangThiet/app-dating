import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type FilterAvatarBody = {
  key: string
  type: string
}

export const useFilterAvatarApi = () => {
  return useMutation({
    mutationFn: (
      data: FilterAvatarBody,
    ): Promise<{ key: string; image_url: string }> =>
      axiosInstance.post(`/external/avatar/filter`, data),
  })
}
