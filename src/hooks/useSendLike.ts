import {
  useCreateMessageTemplateApi,
  useGetMessageTemplateApi,
  useSendLikeApi,
} from '@/api'
import { useSendLikeStep } from '@/features/recommend-feature/store/SendLikeStep'
import { Dispatch, SetStateAction, useState } from 'react'

type ReturnType = {
  isNoTemplate: boolean
  isHaveMessage: boolean
  saveMessageTemplateStatus: 'error' | 'success' | 'idle' | 'pending'
  sendLikeStatus: 'error' | 'success' | 'idle' | 'pending'
  sendLikeStep: 'none' | 'like' | 'sended' | 'complete'
  selectedTab: 'message' | 'information'
  message: string
  closeModalSendLike: () => void
  switchToLikeStep: () => void
  switchToSaveTemplateStep: () => void
  setSelectedTab: Dispatch<SetStateAction<'message' | 'information'>>
  setMessage: Dispatch<SetStateAction<string>>
  handleSaveTemplate: () => void
  handleSendLike: () => void
  switchToCompleteStep: () => void
  handleGetMessageTemplate: () => void
  handleSendLikeWithoutMessage: () => void
}

export default function useSendLike(
  target_id: string,
  handleSkip?: () => void,
  refetch?: () => void,
): ReturnType {
  const { step: sendLikeStep, setStep: setSendLikeStep } = useSendLikeStep()
  const [selectedTab, setSelectedTab] = useState<'message' | 'information'>(
    'message',
  )
  const [message, setMessage] = useState('')
  const [isNoTemplate, setIsNoTemplate] = useState(false)
  const [isHaveMessage, setIsHaveMessage] = useState(false)

  const closeModalSendLike = (): void => setSendLikeStep('none')
  const switchToLikeStep = (): void => setSendLikeStep('like')
  const switchToSaveTemplateStep = (): void => setSendLikeStep('sended')
  const switchToCompleteStep = (): void => setSendLikeStep('complete')

  const { mutate: saveTemplateMutate, status: saveMessageTemplateStatus } =
    useCreateMessageTemplateApi()

  const { mutate: sendLikeMutate, status: sendLikeStatus } = useSendLikeApi()

  const { mutate: getMessageTemplateMutate } = useGetMessageTemplateApi()

  const handleSaveTemplate = (): void => {
    saveTemplateMutate(
      { message },
      {
        onSuccess: () => switchToCompleteStep(),
        onError: () => closeModalSendLike(),
      },
    )
  }

  const handleSendLike = (): void => {
    sendLikeMutate(
      { user_id: target_id, message },
      {
        onSuccess: () => {
          refetch && refetch()
          switchToSaveTemplateStep()
        },
        onError: () => closeModalSendLike(),
      },
    )
  }

  const handleSendLikeWithoutMessage = (): void => {
    sendLikeMutate(
      { user_id: target_id, message: '' },
      {
        onSuccess: () => {
          handleSkip && handleSkip()
          refetch && refetch()
          closeModalSendLike()
        },
        onError: () => closeModalSendLike(),
      },
    )
  }

  const handleGetMessageTemplate = (): void => {
    if (!message) {
      getMessageTemplateMutate(undefined, {
        onSuccess: (res) => {
          if (res?.message) {
            setMessage(res.message)
          } else {
            setIsNoTemplate(true)
            setTimeout(() => {
              setIsNoTemplate(false)
            }, 5000)
          }
        },
      })
    } else {
      setIsHaveMessage(true)
      setTimeout(() => {
        setIsHaveMessage(false)
      }, 5000)
    }
  }

  return {
    sendLikeStep,
    closeModalSendLike,
    switchToLikeStep,
    switchToSaveTemplateStep,
    switchToCompleteStep,
    selectedTab,
    setSelectedTab,
    message,
    setMessage,
    handleSaveTemplate,
    saveMessageTemplateStatus,
    handleSendLike,
    sendLikeStatus,
    handleGetMessageTemplate,
    isNoTemplate,
    handleSendLikeWithoutMessage,
    isHaveMessage,
  }
}
