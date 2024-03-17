import ChatBubbleIcon from '@/components/icons/ChatBubbleIcon'
import dayjs from 'dayjs'
import React from 'react'

type Props = {
  message: string
  sendTime: string
  isSend: boolean // distinguish between message send by you or receive from other
  isDisplay: boolean
}

export default function ChatBubble({
  message,
  sendTime,
  isSend,
  isDisplay,
}: Props): JSX.Element {
  if (isSend) {
    return (
      <div className="flex flex-col items-end p-[10px]">
        <div className="bg-bluegreen w-full max-w-[600px] rounded-s-[10px] rounded-tr-[10px] p-3">
          <div className="min-h-[45px] text-cetacean-blue text-sm">
            {message}
          </div>
        </div>
        <div className="text-[10px] leading-[14px] font-[100] text-[#939aaf]">
          {dayjs(sendTime).format('YY/MM/DD HH:mm')}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-[10px]">
      {isDisplay ? (
        <div className="bg-sub-3 w-full max-w-[600px] rounded-e-[10px] rounded-tl-[10px] p-2">
          <div className="min-h-[45px] text-cetacean-blue text-sm">
            {message}
          </div>
        </div>
      ) : (
        <ChatBubbleIcon />
      )}
      <div className="text-[10px] leading-[14px] font-[100] text-[#939aaf]">
        {dayjs(sendTime).format('YY/MM/DD HH:mm')}
      </div>
    </div>
  )
}
