import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

export type GenerateIntroParams = {
  nickname: string
  gender: string
  search_target_ids: CheckboxValueType[]
  prefecture_id: number | null
  character_ids: string[]
  introduction_summary: string
}

export const useGenerateIntroApi = () => {
  return useMutation({
    mutationFn: (
      params: GenerateIntroParams,
    ): Promise<{ introduction: string }> =>
      axiosInstance.get(`/profile/generate-introduction`, {
        params,
      }),
  })
}
