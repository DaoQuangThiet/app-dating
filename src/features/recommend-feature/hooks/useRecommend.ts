import { useGetRecommendedApi } from '@/api'
import { useRecommendedTargetStore } from '@/features/recommend-feature/store/RecommendedTarget'
import { Detail, Profile } from '@/types/profile'
import { useEffect, useState } from 'react'
import { useSendLikeStep } from '../store/SendLikeStep'

type ReturnType = {
  error: Error | null
  sendLikeStep: 'none' | 'like' | 'sended' | 'complete'
  handleOpenLikeModal: () => void
  handleSkipCurrent: () => void
  recommendedTarget: Profile | null
  getRecommendedTarget: (attributeList: Detail[]) => Detail[]
  isFetching: boolean
}

export default function useRecommend(): ReturnType {
  const [getSkippedTarget, setGetSkippedTarget] = useState(false)
  const sendLikeStep = useSendLikeStep((state) => state.step)
  const setSendLikeStep = useSendLikeStep((state) => state.setStep)
  const recommendedTarget = useRecommendedTargetStore(
    (state) => state.recommendedTarget,
  )
  const setRecommendedTarget = useRecommendedTargetStore(
    (state) => state.setRecommendedTarget,
  )
  const getRecommendedTarget = useRecommendedTargetStore(
    (state) => state.getRecommendedTarget,
  )

  const { data, refetch, isSuccess, isFetching, error } =
    useGetRecommendedApi(getSkippedTarget)

  const handleOpenLikeModal = (): void => setSendLikeStep('like')
  const handleSkipCurrent = (): void => {
    !getSkippedTarget ? setGetSkippedTarget(true) : refetch()
  }

  useEffect(() => {
    isSuccess && setRecommendedTarget(data)
  }, [data, isSuccess, setRecommendedTarget])

  return {
    error,
    sendLikeStep,
    handleOpenLikeModal,
    handleSkipCurrent,
    recommendedTarget,
    getRecommendedTarget,
    isFetching,
  }
}
