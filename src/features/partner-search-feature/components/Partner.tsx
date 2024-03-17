'use client'

import { getPersonAge } from '@/libs/utils'
import { Profile } from '@/types/profile'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { MouseEvent } from 'react'
import { usePartnerSearchStore } from '../store/PartnerSearch'

type Props = {
  partner: Profile
  handleOpenConfirmSendLike: (name: string) => void
}

export default function Partner({
  partner,
  handleOpenConfirmSendLike,
}: Props): JSX.Element {
  const router = useRouter()
  const setSelectedPartner = usePartnerSearchStore(
    (state) => state.setSelectedPartner,
  )

  const onLikePartner = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    handleOpenConfirmSendLike(partner.nickname)
    setSelectedPartner(partner)
  }

  const visitUserProfile = (): void => {
    router.push(`/profile/${partner.user_id}`)
  }

  return (
    <>
      <div
        className="flex flex-col w-[170px] rounded-[5px] overflow-hidden shadow cursor-pointer"
        onClick={visitUserProfile}
      >
        <div className="h-[150px] relative">
          {partner.is_online && (
            <div className="absolute top-[5px] left-[5px] w-[90px] h-6 flex gap-2 justify-center items-center bg-[#00000099] z-10 rounded-xl">
              <div className="h-[9px] w-[9px] bg-[#17db4e] rounded" />
              <div className="text-[#17db4e] text-xs font-bold">ログイン中</div>
            </div>
          )}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${partner.main_photo_url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="flex flex-col absolute top-10 left-3 z-[2]">
            <div className="px-4 pt-4 w-[146px] h-[70px] bg-white rounded-[35px]">
              <div className="text-black-2nd text-xs h-[48px] overflow-hidden">
                {partner.introduction_summary}
              </div>
            </div>
            <div className="w-[10px] h-[10px] ml-9 rounded-full bg-white" />
            <div className="w-[7px] h-[7px] ml-7 rounded-full bg-white" />
          </div>
          <div
            className="absolute bottom-5 right-3 w-9 h-9 rounded-full z-[3]"
            onClick={onLikePartner}
          >
            <Image src="/waving_hand_fill.svg" alt="send like icon" fill />
          </div>
        </div>
        <div className="flex flex-col pt-1 pb-3 px-3 min-h-[100px] max-h-[700px]">
          <div className="grid grid-cols-[1fr_auto] items-center gap-1">
            <div className="text-sm font-bold text-black-1st">
              {partner.nickname}・{partner.prefecture}・
              {getPersonAge(partner.date_of_birth)}
            </div>
            <div>&gt;</div>
          </div>
          <div className="mb-1 text-[10px] leading-[14px] text-cetacean-blue">
            {partner.business}
          </div>
          {partner.hobbies.length ? (
            <div className="flex">
              <div className="px-[10px] py-[2px] text-[10px] leading-[1.0] text-white rounded-[2px] bg-[#5ca4ed]">
                {partner.hobbies[0]}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
