import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type UpdateProfileBody = {
  date_of_birth: string | null
  gender: string
  nickname: string | null
  residence: string | null
  school_name: string | null
  main_photo: string
  retired: boolean
  household: string | null
  educational_background: string | null
  cigarette: string | null
  gamble: string | null
  religion: string | null
  marital_status: string | null
  height: number | null
  physique: string | null
  introduction_summary: string | null
  introduction_for_partner_or_opposite_sex_friend: string | null
  introduction_for_same_sex_friend: string | null
  business_id: string | null
  income_id: string | null
  prefecture_id: string | null
  place_of_birth_id: string | null
  hobby_ids: string[]
  language_ids: string[]
  car_ids: string[]
  search_target_ids: string[]
  character_ids: string[]
  children: string | null
  sub_photos: string[]
}

export const useUpdateProfileApi = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileBody) =>
      axiosInstance.patch(`/profile`, data),
  })
}
