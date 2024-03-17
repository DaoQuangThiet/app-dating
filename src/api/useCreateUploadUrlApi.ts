import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type CreateUploadUrlBody = {
  file_path: string
  file_extension: string | undefined
}

export type CreateUploadUrlResponse = {
  file_name: string
  upload_url: string
}

export const useCreateUploadUrlApi = () => {
  return useMutation({
    mutationFn: (data: CreateUploadUrlBody): Promise<CreateUploadUrlResponse> =>
      axiosInstance.post(`/external/get-upload-url`, data),
  })
}
