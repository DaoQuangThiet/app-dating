import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

export type OnboardBody = {
  gender: string
  search_target_ids: CheckboxValueType[]
  prefecture_id: number | null
  date_of_birth?: string
  nickname: string
  introduction_summary: string
  character_ids: string[]
  main_photo: string
  introduction: string
  verification_photo: string
}

export const useOnboardApi = () => {
  return useMutation({
    mutationFn: (data: OnboardBody) =>
      axiosInstance.post(`/auth/onboard`, data),
  })
}
