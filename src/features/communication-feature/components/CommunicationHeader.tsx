import BackIcon from '@/components/icons/BackIcon'
import { useStore } from '@/stores'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  openTooltip: boolean
  backTarget?: string
}

export default function CommunicationHeader({
  openTooltip,
  backTarget,
}: Props): JSX.Element | null {
  const router = useRouter()

  const chatDetail = useStore().communication.chatDetail()
  const targetProfile = useStore().communication.targetProfile()

  const handleBack = (): void => {
    backTarget ? router.push(backTarget) : router.back()
  }

  if (!chatDetail && !targetProfile) return null

  return (
    <div className="h-[50px] flex justify-between items-center border-0 border-b border-solid border-[#c4c4c4]">
      <div
        className="flex justify-center w-[30px] cursor-pointer"
        onClick={handleBack}
      >
        <BackIcon />
      </div>
      <div className="text-sm font-bold">
        {chatDetail?.partner_nickname || targetProfile?.nickname}
      </div>

      <div className="flex justify-center w-[50px] relative">
        <Link
          href={`/profile/${
            chatDetail?.partner_id || targetProfile?.user_id
          }/matched`}
        >
          <div className="w-6 h-6 relative">
            <Image
              loader={() =>
                chatDetail?.partner_main_photo ||
                targetProfile?.main_photo_url ||
                ''
              }
              src={
                chatDetail?.partner_main_photo ||
                targetProfile?.main_photo_url ||
                ''
              }
              fill
              unoptimized
              priority
              quality={80}
              alt="avatar"
              className="object-cover rounded-full"
            />
          </div>
        </Link>
        {openTooltip && (
          <div className="absolute top-7 right-5 w-[140px] p-[10px] bg-[#eb5757] rounded-s-[20px] rounded-br-[20px]">
            <div className="text-xs font-bold text-white">
              プロフィールを確認
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
