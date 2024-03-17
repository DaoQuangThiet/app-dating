'use client'

import Profile from '@/components/Profile'
import { Gender } from '@/types/profile'
import { Button } from 'antd'
import React from 'react'
import useMatchedProfile from '../hooks/useMatchedProfile'
import CommunicationHeader from './CommunicationHeader'

export default function MatchedProfileComponent(): JSX.Element | null {
  const {
    currentUser,
    openTooltip,
    partnerProfile,
    paymentOrVerifyRequired,
    handleCloseTooltip,
    handleRedirect,
  } = useMatchedProfile()

  return (
    <div
      className="h-screen grid grid-rows-[auto_1fr] overflow-auto"
      onClick={handleCloseTooltip}
    >
      {partnerProfile ? (
        <CommunicationHeader openTooltip={openTooltip} />
      ) : null}

      <Profile profile={partnerProfile} />

      {paymentOrVerifyRequired() && (
        <div className="bg-gradient-to-b from-[#ffffff80] from-0% via-white via-50% to-wvia-white to-100% absolute bottom-0 left-0 w-full pt-[10px] pb-[30px]">
          <div className="mx-auto flex flex-col gap-2 w-[236px] text-center">
            <div className="text-primary-green text-[14px] leading-[1.5] font-bold h-[45px]">
              メッセージを表示・送信するには
              <br />
              有料会員への入会が必要です。
            </div>
            <Button
              className="!h-[45px] !bg-primary-green !border-none !text-white !text-[15px] !leading-[1] !font-semibold"
              onClick={handleRedirect}
            >
              {currentUser?.gender === Gender.MALE
                ? 'プランを確認する'
                : '本人確認をする'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
