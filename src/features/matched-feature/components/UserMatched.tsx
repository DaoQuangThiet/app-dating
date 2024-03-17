'use client'

import { useSeenMessageApi } from '@/api/useSeenMessageApi'
import { actions, useStore } from '@/stores'
import { SocketStore } from '@/stores/SocketStore'
import { useUserStore } from '@/stores/UserStore'
import { Conversation, UserMatched } from '@/types/matches'
import { Gender, UserType } from '@/types/profile'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

interface UsersMatchedProps {
  isFetching: boolean
}

//TODO: write storybook
export default function UsersMatched({
  isFetching,
}: UsersMatchedProps): JSX.Element {
  const router = useRouter()
  const currentUser = useUserStore((state) => state.user)
  const socket = SocketStore.get.socket()
  const listCommunication = useStore().communication.listCommunication()

  const { mutate: seenMessageMutate } = useSeenMessageApi()

  const paymentOrVerifyRequired = (): boolean => {
    if (currentUser) {
      if (dayjs() > dayjs(currentUser.created_at).add(1, 'day')) {
        if (
          currentUser?.gender === Gender.MALE &&
          currentUser.user_type === UserType.PREMIUM
        ) {
          return true
        }
        if (
          currentUser?.gender === Gender.FEMALE &&
          currentUser.identity_verified
        ) {
          return true
        }
        return false
      }
      return true
    }
    return false
  }

  const handleSelectCommunication = (communication: UserMatched): void => {
    const isNewMessage =
      communication.last_message &&
      communication.last_message.receiver_id === currentUser?.id &&
      !communication.last_message.seen_at
    isNewMessage &&
      seenMessageMutate({
        match_id: communication.id,
        list_id: [communication.last_message.id],
      })
    router.push(`/matches/${communication.id}`)
  }

  const receiveMessage = useCallback(
    (event: MessageEvent) => {
      const jsonParseData = JSON.parse(event.data)
      const receiveMessage: Conversation = {
        id: jsonParseData?.id || '',
        content: jsonParseData?.content || '',
        match_id: jsonParseData?.match_id || '',
        seen_at: jsonParseData?.seen_at || '',
        receiver_id: jsonParseData?.receiver_id || '',
        sender_id: jsonParseData?.sender_id || '',
        created_at: jsonParseData?.created_at || '',
        updated_at: jsonParseData?.updated_at || '',
      }
      const newListCommunication = listCommunication.map((item) =>
        item.id === receiveMessage.match_id
          ? { ...item, last_message: receiveMessage }
          : item,
      )
      actions.communication.listCommunication(newListCommunication)
    },
    [listCommunication],
  )

  useEffect(() => {
    if (!socket) return

    socket.addEventListener('message', receiveMessage)
  }, [receiveMessage, socket])

  return (
    <div className="max-w-base w-full pb-28">
      <h5 className="text-xl font-bold px-3 mt-5 text-cetacean-blue">
        やりとりを続けましょう
      </h5>
      <div className="text-sm text-philippine-gray px-3 mt-3 mb-5">
        なるべく時間を空けずにご連絡することが重要です。
      </div>
      {listCommunication.map((items: UserMatched) => (
        <div
          className="grid grid-cols-[auto_1fr_auto] p-2 cursor-pointer"
          key={items.id}
          onClick={() => handleSelectCommunication(items)}
        >
          <div className="image w-[60px] h-[60px] relative">
            <Image
              loader={() => `${items.partner_main_photo}`}
              src={`${items.partner_main_photo}`}
              fill
              sizes="100%"
              unoptimized
              alt="avatar"
              className="object-cover rounded-full"
            />
          </div>
          <div className="name-and-message grid">
            <div className="text-sm text-cetacean-blue font-bold ml-1">
              {items.partner_nickname}
            </div>
            <div className="text-sm text-cetacean-blue ml-1 truncate">
              {paymentOrVerifyRequired()
                ? items.last_message?.content
                : '--------------'}
            </div>
          </div>
          <div className="flex flex-col w-28 text-end">
            <div className="time text-sm text-cetacean-blue h-5">
              {items.last_message?.created_at
                ? dayjs(items.last_message.created_at).format('MM月DD日 HH:mm')
                : null}
            </div>
            {items.last_message &&
            items.last_message?.receiver_id === currentUser?.id &&
            !items.last_message.seen_at ? (
              <div className="online w-3 h-3 ml-auto rounded-full bg-primary-green mt-2"></div>
            ) : null}
          </div>
        </div>
      ))}
      {isFetching && (
        <div className="flex justify-center">
          <div className="text-center max-w-[360px] w-full pt-4 pl-4 self-center">
            <Spin />
          </div>
        </div>
      )}
    </div>
  )
}
