'use client'

import PlusFilledOutlinedIcon from '@/components/icons/PlusFilledOutlined'
import useCommunication from '@/features/communication-feature/hooks/useCommunication'
import { Gender } from '@/types/profile'
import { Button, Form, Input, Select, Spin } from 'antd'
import Link from 'next/link'
import React from 'react'
import CommunicationHeader from './CommunicationHeader'
import ListMessage from './ListMessage'

export default function Communication(): JSX.Element {
  const {
    form,
    chatStartRef,
    currentUser,
    isFetched,
    listMessage,
    total,
    getConversationFetching,
    getChatDetailFetching,
    listMessageTemplate,
    openTooltip,
    selectedTemplate,
    handleSetSelectedTemplate,
    handleSendMessage,
    isDisplayChatFunction,
    paymentOrVerifyRequired,
    handleCloseTooltip,
    handleRedirect,
    handleSelectTemplate,
  } = useCommunication()

  if (getChatDetailFetching) {
    return (
      <div className="h-screen flex">
        <div className="m-auto">
          <Spin className="m-auto" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-screen grid grid-rows-[auto_1fr] overflow-auto"
      onClick={handleCloseTooltip}
    >
      <CommunicationHeader openTooltip={openTooltip} backTarget="/matches" />

      {/* reverse order when placing message */}
      <div className="flex flex-col-reverse overflow-auto pb-36">
        <ListMessage
          isFetched={isFetched}
          listMessage={listMessage}
          total={total || 0}
          chatStartRef={chatStartRef}
        />

        {getConversationFetching && (
          <div className="mx-auto my-5">
            <Spin />
          </div>
        )}
      </div>

      {paymentOrVerifyRequired() ? (
        <div className="bg-gradient-to-b from-[#ffffff80] from-0% via-[#ffffff] via-50% to-[#ffffff] to-100% absolute bottom-0 left-0 w-full pt-[10px] pb-[30px]">
          <div className="mx-auto flex flex-col gap-2 w-[236px] text-center">
            <div className="text-[#06c755] text-[14px] leading-[1.5] font-bold h-[45px]">
              メッセージを表示・送信するには
              <br />
              本人確認が必要です。
            </div>
            <Button
              className="!h-[45px] !bg-[#06c755] !border-none !text-white !text-[15px] !leading-[1] !font-semibold"
              onClick={handleRedirect}
            >
              {currentUser?.gender === Gender.MALE
                ? 'プランを確認する'
                : '本人確認をする'}
            </Button>
          </div>
        </div>
      ) : null}

      {isDisplayChatFunction() ? (
        <div className="bg-lotion absolute bottom-0 left-0 w-full min-h-[100px] px-[5px]">
          <div className="flex items-center justify-between min-h-10">
            <div className="flex items-center gap-[10px]">
              <Select
                value={selectedTemplate}
                placeholder="テンプレを選択"
                options={listMessageTemplate}
                className="w-40"
                onSelect={(value) => handleSetSelectedTemplate(value)}
                notFoundContent={null}
              />
              <div
                className="flex items-center w-20 h-[30px] p-[5px] border border-solid border-[#06c755] rounded-[5px] cursor-pointer"
                onClick={handleSelectTemplate}
              >
                <PlusFilledOutlinedIcon />
                <div className="text-[#06c755] text-sm mx-auto">適用</div>
              </div>
            </div>
            <div className="underline bg-white shadow-[0_0_16px_4px_#00000005] rounded-full text-primary-green mr-[10px] w-[135px] h-[30px] flex">
              <Link
                href="/template_message"
                className="text-primary-green text-sm hover:text-primary-green m-auto"
              >
                テンプレート管理へ
              </Link>
            </div>
          </div>
          <Form form={form} onFinish={handleSendMessage}>
            <div className="flex justify-between min-h-10">
              <div className="w-full my-auto">
                <Form.Item name="content" className="!mb-2">
                  <Input.TextArea
                    autoSize={{
                      minRows: 1,
                      maxRows: 13,
                    }}
                    placeholder="メッセージを入力..."
                    className="text-sm !text-[#091747]"
                  />
                </Form.Item>
              </div>
              <div className="mx-[10px] mb-2 mt-auto">
                <Button
                  htmlType="submit"
                  className="!w-[50px] !h-[22px] !rouned-[5px] !border-none !text-white !text-[10px] !leading-[1] !font-semibold !bg-[#51afe6]"
                >
                  送信
                </Button>
              </div>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  )
}
