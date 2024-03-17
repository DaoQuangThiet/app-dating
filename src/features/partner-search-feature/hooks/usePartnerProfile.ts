import { useGetPartnerProfileApi } from '@/api'
import { useSendLikeStep } from '@/features/recommend-feature/store/SendLikeStep'
import { Detail, Profile } from '@/types/profile'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePartnerSearchStore } from '../store/PartnerSearch'

type ReturnType = {
  isLiked: boolean | undefined
  selectedPartner: Profile | null
  sendLikeStep: 'none' | 'like' | 'sended' | 'complete'
  handleRefetch: () => void
  handleSendLike: () => void
  getSelectedPartner: (attributeList: Detail[]) => Detail[]
}

export default function usePartnerProfile(): ReturnType {
  const [isLiked, setIsLiked] = useState<boolean>()
  const params: { id: string } = useParams()
  const { step: sendLikeStep, setStep: setSendLikeStep } = useSendLikeStep()
  const { selectedPartner, setSelectedPartner, getSelectedPartner } =
    usePartnerSearchStore()

  const { data: profile, refetch, status } = useGetPartnerProfileApi(params.id)

  const handleRefetch = (): void => {
    refetch()
  }

  const handleSendLike = (): void => {
    if (!isLiked) {
      setIsLiked(true)
      setSendLikeStep('like')
    }
  }

  useEffect(() => {
    if (status === 'success') {
      setSelectedPartner(profile)
      setIsLiked(profile.is_liked)
    }
  }, [profile, setSelectedPartner, status])

  return {
    handleRefetch,
    handleSendLike,
    selectedPartner,
    sendLikeStep,
    getSelectedPartner,
    isLiked,
  }
}
