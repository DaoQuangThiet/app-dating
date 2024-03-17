import { axiosInstance } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'

export const usePaidyPaymentCheckingApi = () => {
  return useMutation({
    mutationFn: (paymentId: string): Promise<null> =>
      axiosInstance.post(`/payment/paidy/${paymentId}/checking`),
  })
}
