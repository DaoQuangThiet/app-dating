'use client'

import { LikeWaveHandIcon } from '@/components/icons'
import ModalSendLike from '@/components/ModalSendLike'
import Profile from '@/components/Profile'
import usePartnerProfile from '../hooks/usePartnerProfile'

export default function PartnerProfile(): JSX.Element {
  const {
    isLiked,
    selectedPartner,
    sendLikeStep,
    handleRefetch,
    handleSendLike,
    getSelectedPartner,
  } = usePartnerProfile()

  return (
    <>
      <Profile profile={selectedPartner} />
      {isLiked !== undefined && (
        <div className="flex justify-center fixed bottom-20 left-1/2 -translate-x-1/2 px-5 w-full">
          <div
            className={`flex items-center justify-center gap-4 rounded-lg w-full max-w-[444px] h-[52px] bg-white border-2 border-solid cursor-pointer ${
              isLiked ? 'border-[#7d8796]' : 'border-[#12b756]'
            }`}
            onClick={handleSendLike}
          >
            <LikeWaveHandIcon isLiked={Boolean(isLiked)} />
            <div
              className={`text-[17px] font-bold ${
                isLiked ? 'text-[#7d8796]' : 'text-[#12b756]'
              }`}
            >
              {isLiked ? 'いいね！済み' : 'いいね！を送る'}
            </div>
          </div>
        </div>
      )}

      {sendLikeStep !== 'none' && (
        <ModalSendLike
          targetProfile={selectedPartner}
          getProfileFields={getSelectedPartner}
          refetch={handleRefetch}
        />
      )}
    </>
  )
}
