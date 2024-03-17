import {
  useChatSendMessageApi,
  useGetChatDetailApi,
  useGetConversationApi,
  useGetTemplatesApi,
} from '@/api'
import { useSeenMessageApi } from '@/api/useSeenMessageApi'
import { SocketStore } from '@/stores/SocketStore'
import { useUserStore } from '@/stores/UserStore'
import { Conversation } from '@/types/matches'
import { Gender, UserProfile, UserType } from '@/types/profile'
import { Form, FormInstance } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { communicationStore } from '../store/communicationStore'

type ReturnType = {
  form: FormInstance
  currentUser: UserProfile | null
  listMessage: Conversation[]
  isFetched: boolean
  getConversationFetching: boolean
  getChatDetailFetching: boolean
  total: number | undefined
  chatStartRef: React.MutableRefObject<null>
  listMessageTemplate: {
    label: string
    value: string
  }[]
  openTooltip: boolean
  selectedTemplate: string | undefined
  handleSetSelectedTemplate: (value: string) => void
  handleSelectTemplate: () => void
  paymentOrVerifyRequired: () => boolean
  isDisplayChatFunction: () => boolean
  handleCloseTooltip: () => void
  handleRedirect: () => void
  handleSendMessage: (values: { content: string }) => void
}

export default function useCommunication(): ReturnType {
  const router = useRouter()
  const params: { id: string } = useParams()
  const chatStartRef = useRef(null)
  const [form] = Form.useForm()
  const currentUser = useUserStore((state) => state.user)
  const socket = SocketStore.get.socket()
  const [listMessage, setListMessage] = useState<Conversation[]>([])
  const [openTooltip, setOpenTooltip] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string>()
  const [isLastMessageSeen, setIsLastMessageSeen] = useState(false)

  const { mutate: sendMessageMutate, isPending } = useChatSendMessageApi()

  const {
    data: chatDetail,
    isSuccess,
    isFetching: getChatDetailFetching,
  } = useGetChatDetailApi(params.id)

  const {
    data: conversation,
    fetchNextPage,
    refetch,
    isFetched,
    isFetching: getConversationFetching,
  } = useGetConversationApi(params.id)

  const { mutate: seenMessageMutate } = useSeenMessageApi()

  const { data: messageTemplate } = useGetTemplatesApi()

  const total =
    conversation?.pages[0].total &&
    listMessage.length > conversation.pages[0].total
      ? listMessage.length
      : conversation?.pages[0].total

  const paymentOrVerifyRequired = (): boolean => {
    if (isFetched && currentUser) {
      if (dayjs() > dayjs(currentUser.created_at).add(1, 'day')) {
        if (currentUser?.gender === Gender.MALE) {
          return currentUser.user_type !== UserType.PREMIUM
        }
        if (currentUser?.gender === Gender.FEMALE) {
          return !currentUser.identity_verified
        }
        return false
      }
    }
    return false
  }

  const isDisplayChatFunction = (): boolean => {
    if (isFetched && currentUser) {
      if (dayjs() <= dayjs(currentUser.created_at).add(1, 'day')) {
        return true
      }
      if (currentUser?.gender === Gender.MALE) {
        return currentUser.user_type === UserType.PREMIUM
      }
      if (currentUser?.gender === Gender.FEMALE) {
        return currentUser.identity_verified
      }
    }
    return false
  }

  const handleSendMessage = (values: { content: string }): void => {
    if (!isPending) {
      sendMessageMutate(
        {
          content: values.content,
          match_id: params.id,
        },
        {
          onSuccess: (result: Conversation) => {
            form.resetFields()
            setListMessage((prev) => [result, ...prev])
          },
          onError: () => form.resetFields(),
        },
      )
    }
  }

  const listMessageTemplate =
    messageTemplate?.data.map((item) => ({
      label: item.title,
      value: item.content,
    })) || []

  const handleCloseTooltip = (): void => {
    openTooltip && setOpenTooltip(false)
    const isNewMessage =
      listMessage[0] &&
      listMessage[0].receiver_id === currentUser?.id &&
      !listMessage[0].seen_at &&
      !isLastMessageSeen
    isNewMessage &&
      seenMessageMutate(
        {
          match_id: communicationStore.get.chatDetail()?.id || '',
          list_id: [listMessage[0].id],
        },
        {
          onSuccess: () => {
            setIsLastMessageSeen(true)
          },
        },
      )
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

  const handleSetSelectedTemplate = (value: string) => {
    setSelectedTemplate(value)
  }

  const handleSelectTemplate = (): void => {
    if (selectedTemplate) {
      form.setFieldValue('content', selectedTemplate)
      setSelectedTemplate(undefined)
    }
  }

  const receiveMessage = useCallback((event: MessageEvent) => {
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
    setListMessage((prev) => [receiveMessage, ...prev])
    setIsLastMessageSeen(false)
  }, [])

  useEffect(() => {
    if (chatDetail && isSuccess && !getChatDetailFetching) {
      communicationStore.set.chatDetail(chatDetail)
      refetch().then((data) => {
        const newListMessage: Conversation[] = data.data?.pages[0].data || []
        setListMessage(newListMessage)
      })
    }
  }, [chatDetail, getChatDetailFetching, isSuccess, refetch])

  useEffect(() => {
    if (
      conversation?.pages &&
      conversation?.pages[conversation.pages.length - 1]?.total <= 20
    )
      return

    if (!chatStartRef?.current) return

    if (!listMessage.length) return

    if (getConversationFetching) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage().then((data) => {
          const nextPage: Conversation[] =
            data.data?.pages[data.data.pages.length - 1].data || []
          setListMessage((prev) => [...prev, ...nextPage])
        })
      }
    })

    observer.observe(chatStartRef.current)

    return () => {
      observer.disconnect()
    }
  }, [conversation?.pages, fetchNextPage, getConversationFetching, listMessage])

  useEffect(() => {
    if (!socket) return

    socket.addEventListener('message', receiveMessage)
  }, [receiveMessage, socket])

  return {
    form,
    currentUser,
    listMessage,
    isFetched,
    getConversationFetching,
    getChatDetailFetching,
    chatStartRef,
    total,
    listMessageTemplate,
    openTooltip,
    selectedTemplate,
    handleSetSelectedTemplate,
    handleCloseTooltip,
    handleRedirect,
    paymentOrVerifyRequired,
    isDisplayChatFunction,
    handleSendMessage,
    handleSelectTemplate,
  }
}
