import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'

export type GetTemplatesResponse = {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}
export const GET_TEMPLATES_QUERY_KEY = ['template']

export const useGetTemplatesApi = () =>
  useQuery({
    queryKey: GET_TEMPLATES_QUERY_KEY,
    queryFn: (): Promise<{ data: GetTemplatesResponse[] }> =>
      axiosInstance.get(`/message-template`),
  })
