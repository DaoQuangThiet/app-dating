import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export type LeaveBody = {
  reason: string
  message: string
  lifestyle: string
  chat_frequency: string
}

export type LeaveResponse = {
  message: string
  data: object
}

export const useLeaveApi = () =>
  useMutation({
    mutationFn: (data: LeaveBody): Promise<LeaveResponse> =>
      axiosInstance.post(`/auth/leave`, data),
  })
