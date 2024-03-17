'use client'

import ModalSendLike from '@/components/ModalSendLike'
import { Button, Modal, Spin } from 'antd'
import React from 'react'
import usePartnerSearch from '../hooks/usePartnerSearch'
import Partner from './Partner'

export default function PartnerList(): JSX.Element {
  const {
    isOpenModal,
    handleRefetch,
    handleOpenModalSendLike,
    handleOpenConfirmSendLike,
    partnerSearch,
    pageEndRef,
    getSelectedPartner,
    handleCancel,
    selectedPartner,
    sendLikeStep,
    status,
  } = usePartnerSearch()

  if (status === 'pending') {
    return <Spin />
  }

  return (
    <>
      <div className="grid grid-cols-2 mx-auto gap-2">
        {partnerSearch?.map((partner) => (
          <Partner
            key={partner.user_id}
            partner={partner}
            handleOpenConfirmSendLike={handleOpenConfirmSendLike}
          />
        ))}

        {/* page end flag */}
        <div ref={pageEndRef} />

        <Modal
          open={Boolean(isOpenModal)}
          width={312}
          closable={false}
          footer={null}
        >
          <div className="text-center text-cetacean-blue text-lg font-bold mt-2 mb-9">
            {isOpenModal} さんに
            <br />
            いいね！を送りますか？
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Button
              className="!border-none !bg-primary-green hover:!bg-opacity-80 !text-white !text-lg !font-bold !w-[240px] !h-[50px] !shadow-none"
              onClick={handleOpenModalSendLike}
            >
              はい
            </Button>
            <Button
              className="!border-none !text-[#222222] !text-lg !font-bold !w-[240px] !h-[50px] !shadow-md"
              onClick={handleCancel}
            >
              いいえ
            </Button>
          </div>
        </Modal>

        {sendLikeStep !== 'none' && (
          <ModalSendLike
            targetProfile={selectedPartner}
            getProfileFields={getSelectedPartner}
            refetch={handleRefetch}
          />
        )}
      </div>
    </>
  )
}
