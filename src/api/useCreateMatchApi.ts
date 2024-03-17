import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type CreateMatchResponse = {
  message: string
  data: object
}

export const useCreateMatchApi = () =>
  useMutation({
    mutationFn: ({
      userId,
      message,
    }: {
      userId: string
      message: string
    }): Promise<CreateMatchResponse> =>
      axiosInstance.post(`/like/received/${userId}`, {
        message,
      }),
  })

export const useSkipMatchApi = () =>
  useMutation({
    mutationFn: (userId: string): Promise<CreateMatchResponse> =>
      axiosInstance.post(`/like/received/${userId}/skip`),
  })
