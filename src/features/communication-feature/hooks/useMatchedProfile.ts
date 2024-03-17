import { useGetPartnerProfileApi } from '@/api'
import { useUserStore } from '@/stores/UserStore'
import { Gender, Profile, UserProfile, UserType } from '@/types/profile'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { communicationStore } from '../store/communicationStore'

type ReturnType = {
  currentUser: UserProfile | null
  paymentOrVerifyRequired: () => boolean
  partnerProfile: Profile | undefined
  openTooltip: boolean
  handleCloseTooltip: () => void
  handleRedirect: () => void
}

export default function useMatchedProfile(): ReturnType {
  const { id }: { id: string } = useParams()
  const router = useRouter()
  const [openTooltip, setOpenTooltip] = useState(true)
  const currentUser = useUserStore((state) => state.user)

  const { data: partnerProfile } = useGetPartnerProfileApi(id)

  const paymentOrVerifyRequired = () => {
    if (dayjs() <= dayjs(currentUser?.created_at).add(1, 'day')) {
      return false
    }
    if (currentUser?.gender === Gender.FEMALE) {
      return !currentUser.identity_verified
    }
    if (currentUser?.gender === Gender.MALE) {
      return currentUser.user_type !== UserType.PREMIUM
    }
    return false
  }

  const handleCloseTooltip = (): void => {
    openTooltip && setOpenTooltip(false)
  }

  const handleRedirect = () => {
    if (
      currentUser?.gender === Gender.MALE &&
      currentUser.user_type !== UserType.PREMIUM
    ) {
      router.push('/purchase')
      return
    }
    if (
      currentUser?.gender === Gender.FEMALE &&
      !currentUser.identity_verified
    ) {
      router.push('/identification_index')
    }
  }

  useEffect(() => {
    if (partnerProfile) {
      communicationStore.set.targetProfile(partnerProfile)
    }
  }, [partnerProfile])

  return {
    currentUser,
    paymentOrVerifyRequired,
    partnerProfile,
    openTooltip,
    handleCloseTooltip,
    handleRedirect,
  }
}
