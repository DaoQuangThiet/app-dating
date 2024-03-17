import React, { ReactNode } from 'react'

export default function TemplateMessageLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] bg-lotion">
      <div className="w-full h-[60px] bg-white flex">
        <div className="text-cetacean-blue text-sm font-bold m-auto">
          メッセージテンプレート一覧
        </div>
      </div>

      <div className="flex flex-col items-center py-[10px] px-[30px]">{children}</div>
    </div>
  )
}
