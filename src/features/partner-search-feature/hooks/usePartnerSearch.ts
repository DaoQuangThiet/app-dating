import { useGetPartnersApi } from '@/api'
import { useSendLikeStep } from '@/features/recommend-feature/store/SendLikeStep'
import { Detail, Profile } from '@/types/profile'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { usePartnerSearchStore } from '../store/PartnerSearch'

type ReturnType = {
  isOpenModal: string
  partnerSearch: Profile[]
  pageEndRef: MutableRefObject<null>
  selectedPartner: Profile | null
  status: 'error' | 'success' | 'pending'
  sendLikeStep: 'none' | 'like' | 'sended' | 'complete'
  handleRefetch: () => void
  handleCancel: () => void
  handleOpenModalSendLike: () => void
  handleOpenConfirmSendLike: (name: string) => void
  getSelectedPartner: (attributeList: Detail[]) => Detail[]
  setSelectedPartner: (selectedPartner: Profile | null) => void
}

export default function usePartnerSearch(): ReturnType {
  const pageEndRef = useRef(null)
  const [isOpenModal, setIsOpenModal] = useState('')

  const {
    partnerSearch,
    setPartnerSearch,
    getSelectedPartner,
    selectedPartner,
    setSelectedPartner,
  } = usePartnerSearchStore()

  const { step: sendLikeStep, setStep: setSendLikeStep } = useSendLikeStep()

  const {
    data: partnerPages,
    refetch,
    fetchNextPage,
    status,
  } = useGetPartnersApi()

  const handleRefetch = (): void => {
    refetch()
  }

  const handleOpenConfirmSendLike = (name: string): void => {
    setIsOpenModal(name)
  }

  const handleOpenModalSendLike = (): void => {
    setSendLikeStep('like')
    setIsOpenModal('')
  }

  const handleCancel = (): void => {
    setSelectedPartner(null)
    setIsOpenModal('')
  }

  useEffect(() => {
    if (partnerPages?.pages && partnerPages?.pages[0].data.length < 10) return

    if (!pageEndRef?.current) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
      }
    })

    observer.observe(pageEndRef.current)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, partnerPages?.pages])

  useEffect(() => {
    if (status === 'success') {
      const partnerList: Profile[] = partnerPages?.pages.reduce(
        (prev, next) => prev.concat(next.data),
        <Profile[]>[],
      )
      setPartnerSearch(partnerList)
    }
  }, [partnerPages, setPartnerSearch, status])

  return {
    isOpenModal,
    partnerSearch,
    pageEndRef,
    status,
    selectedPartner,
    sendLikeStep,
    handleRefetch,
    handleOpenModalSendLike,
    handleOpenConfirmSendLike,
    handleCancel,
    getSelectedPartner,
    setSelectedPartner,
  }
}
