'use client'

import ModalSendLike from '@/components/ModalSendLike'
import Header from '@/components/ui/Header'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import useRecommend from '../../hooks/useRecommend'
import RecommendedMemberDetail from './RecommendedMemberDetail'

// TODO: write storybook

export default function MyPageSingle(): JSX.Element {
  const {
    error,
    sendLikeStep,
    handleOpenLikeModal,
    handleSkipCurrent,
    recommendedTarget,
    getRecommendedTarget,
    isFetching,
  } = useRecommend()

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header title="おすすめ" backIcon={false} bordered={false} />
      <div className="flex w-full max-w-[480px] flex-col p-5 mt-14 mx-auto">
        {!error ? (
          <>
            <div className="w-full min-h-[400px] shadow-[#00000005_0_0_16px_4px] p-[10px] rounded-[10px] mx-auto relative">
              <RecommendedMemberDetail
                recommendedTarget={recommendedTarget}
                getRecommendedTarget={getRecommendedTarget}
                isLoading={isFetching}
              />
            </div>

            <div className="w-full grid grid-cols-[40%_60%] justify-center gap-3 px-5 mt-[24px] mb-[120px] mx-auto">
              <Button
                block
                className="!bg-[#c5cbc7] !border-none hover:!border-none !h-[45px] !rounded-[5px]"
                onClick={handleSkipCurrent}
              >
                <span className="text-white font-semibold text-[15px] leading-[15px]">
                  スキップ
                </span>
              </Button>
              <Button
                block
                className="!bg-[#06c755] !border-none hover:!bg-[#06c755cc] hover:!border-none !h-[45px] !rounded-[5px]"
                onClick={handleOpenLikeModal}
              >
                <span className="text-white font-semibold text-[15px] leading-[15px]">
                  いいねをする
                </span>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-5 w-full shadow-[#00000005_0_0_16px_4px] py-10 rounded-[10px] mx-auto">
            <div className="text-[17px] leading-[1.4] font-bold text-center text-[#091747]">
              現在表示できるお相手はいません
            </div>
            <Link href="/mypage" className="mx-auto">
              <Button
                block
                className="!bg-[#06c755] !border-none hover:!bg-[#06c755cc] hover:!border-none !h-[45px] !w-60 !rounded-[5px]"
              >
                <span className="text-white font-semibold text-[15px] leading-[15px]">
                  一覧からさがす
                </span>
              </Button>
            </Link>
          </div>
        )}
      </div>
      {sendLikeStep !== 'none' && (
        <ModalSendLike
          targetProfile={recommendedTarget}
          getProfileFields={getRecommendedTarget}
          handleSkip={handleSkipCurrent}
        />
      )}
    </div>
  )
}
