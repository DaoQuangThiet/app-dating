import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type CreateQuestionBody = {
  name: string
  email: string
  question: string
}

export const useCreateQuestionApi = () => {
  return useMutation({
    mutationFn: (data: CreateQuestionBody): Promise<object> =>
      axiosInstance.post(`/questions`, data),
  })
}
