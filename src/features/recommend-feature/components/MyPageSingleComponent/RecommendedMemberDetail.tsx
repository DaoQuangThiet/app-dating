'use client'

import { getPersonAge } from '@/libs/utils'
import { Detail, Profile } from '@/types/profile'
import { Spin } from 'antd'
import Image from 'next/image'
import React from 'react'
import recommendedMemberDetail from '../../configs/recommendedMemberDetail'
import HobbyTag from './HobbyTag'

type Props = {
  recommendedTarget: Profile | null
  getRecommendedTarget: (attributeList: Detail[]) => Detail[]
  isLoading: boolean
}

// TODO: write storybook

export default function RecommendedMemberDetail({
  recommendedTarget,
  getRecommendedTarget,
  isLoading,
}: Props): JSX.Element {
  if (isLoading || !recommendedTarget) {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <Spin />
      </div>
    )
  }

  return (
    <>
      <div className="w-[200px] min-h-[240px] mx-auto relative">
        <Image
          loader={() => recommendedTarget.main_photo || ''}
          src={recommendedTarget.main_photo || ''}
          alt="recommend-user-image"
          fill
          unoptimized
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="h-7">
        <h5 className="text-xl font-bold">
          {`
          ${recommendedTarget.nickname}・
          ${recommendedTarget.prefecture}・
          ${
            recommendedTarget.date_of_birth
              ? `${getPersonAge(recommendedTarget.date_of_birth)}才`
              : null
          }
          `}
        </h5>
      </div>
      <div className="my-2 text-[10px] leading-[10px]">
        {recommendedTarget.business}
      </div>
      <div className="flex flex-wrap">
        {recommendedTarget.hobbies?.map((item) => (
          <HobbyTag key={item} text={item} />
        ))}
      </div>
      <div className="flex flex-col">
        {getRecommendedTarget(recommendedMemberDetail).map((item) => (
          <div
            key={item.key}
            className="grid grid-cols-[40%_60%] min-h-10 my-[10px] items-center"
          >
            <div className="text-[14px] leading-[14px] font-bold text-[#019f42]">
              {item.label}
            </div>
            <div className="text-[14px] leading-5 text-[#091747]">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
