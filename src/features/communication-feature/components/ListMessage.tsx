'use client'

import { useUserStore } from '@/stores/UserStore'
import { Conversation } from '@/types/matches'
import { Gender, UserType } from '@/types/profile'
import dayjs from 'dayjs'
import React, { MutableRefObject } from 'react'
import { communicationStore } from '../store/communicationStore'
import ChatBubble from './ChatBubble'

type Props = {
  isFetched: boolean
  listMessage: Conversation[]
  total: number
  chatStartRef: MutableRefObject<null>
}

export default function ListMessage({
  isFetched,
  listMessage,
  total,
  chatStartRef,
}: Props) {
  const currentUser = useUserStore((state) => state.user)
  const isDisplay =
    dayjs() <= dayjs(currentUser?.created_at).add(1, 'day') ||
    (currentUser?.gender === Gender.MALE &&
      currentUser.user_type === UserType.PREMIUM) ||
    (currentUser?.gender === Gender.FEMALE && currentUser.identity_verified)

  if (!isFetched) return null

  if (listMessage.length < 3) {
    return (
      <>
        <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
          {communicationStore.get.chatDetail()?.partner_nickname}
          さんとマッチしました！！
        </div>
        {listMessage[0] && (
          <ChatBubble
            message={listMessage[0]?.content}
            sendTime={listMessage[0]?.created_at}
            isSend={listMessage[0].sender_id === currentUser?.id}
            isDisplay={isDisplay}
          />
        )}
        <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
          {communicationStore.get.chatDetail()?.partner_nickname}
          さんからのメッセージ付きいいね！
        </div>
        {listMessage[1] && (
          <ChatBubble
            message={listMessage[1]?.content}
            sendTime={listMessage[1]?.created_at}
            isSend={listMessage[1].sender_id === currentUser?.id}
            isDisplay={isDisplay}
          />
        )}
        <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
          {currentUser?.nickname}さんからのメッセージ付きいいね！
        </div>
      </>
    )
  }

  return (
    <>
      {listMessage.map((message, index) => {
        const isSend = message.sender_id === currentUser?.id
        if (listMessage.length === total && index === listMessage.length - 1) {
          return (
            <React.Fragment key={message.id}>
              <ChatBubble
                key={message.id}
                message={message?.content}
                sendTime={message?.created_at}
                isSend={isSend}
                isDisplay={isDisplay}
              />
              <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
                {currentUser?.nickname}さんからのメッセージ付きいいね！
              </div>
            </React.Fragment>
          )
        }
        if (listMessage.length === total && index === listMessage.length - 2) {
          if (!isSend) {
            return (
              <React.Fragment key={message.id}>
                <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
                  {communicationStore.get.chatDetail()?.partner_nickname}
                  さんとマッチしました！！
                </div>
                <ChatBubble
                  key={message.id}
                  message={message?.content}
                  sendTime={message?.created_at}
                  isSend={isSend}
                  isDisplay={isDisplay}
                />
                <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
                  {communicationStore.get.chatDetail()?.partner_nickname}
                  さんからのメッセージ付きいいね！
                </div>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment key={message.id}>
                <ChatBubble
                  key={message.id}
                  message={message?.content}
                  sendTime={message?.created_at}
                  isSend={isSend}
                  isDisplay={isDisplay}
                />
                <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
                  {communicationStore.get.chatDetail()?.partner_nickname}
                  さんとマッチしました！！
                </div>
                <div className="my-2 mx-[50px] py-1 px-6 bg-[#f6f8fb] text-[#091747] text-sm rounded-full text-center">
                  {communicationStore.get.chatDetail()?.partner_nickname}
                  さんからのメッセージ付きいいね！
                </div>
              </React.Fragment>
            )
          }
        }
        return (
          <React.Fragment key={message.id}>
            <ChatBubble
              key={message.id}
              message={message?.content}
              sendTime={message?.created_at}
              isSend={isSend}
              isDisplay={isDisplay}
            />
          </React.Fragment>
        )
      })}
      {listMessage.length < total ? <div ref={chatStartRef} /> : null}
    </>
  )
}
