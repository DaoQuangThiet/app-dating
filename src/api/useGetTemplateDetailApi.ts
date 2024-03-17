import { axiosInstance } from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'
import { GetTemplatesResponse } from './useGetTemplatesApi'

export const useGetTemplateDetailApi = (templateId: string) =>
  useQuery({
    queryKey: ['template-detail', templateId],
    queryFn: (): Promise<GetTemplatesResponse> =>
      axiosInstance.get(`/message-template/${templateId}`),
  })
