'use client'

import {
  useCreateMatchApi,
  useGetLikeReceivedDetailApi,
  useSkipMatchApi,
} from '@/api'
import { Button } from '@/components/ui'
import { useUserStore } from '@/stores/UserStore'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MatchCreateProps {
  userId: string
}
//TODO: write storybook
export default function EditMessage({ userId }: MatchCreateProps): JSX.Element {
  const [content, setContent] = useState('')
  const router = useRouter()
  const { data: partnerData } = useGetLikeReceivedDetailApi(userId)
  const user = useUserStore((state) => state.user)

  const { mutate: createMatchMutate } = useCreateMatchApi()
  const { mutate: skipMatchMutate } = useSkipMatchApi()

  const handleContenChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setContent(e.target.value)
  }

  const handleCreateMatch = (): void => {
    createMatchMutate(
      { userId, message: content },
      {
        onSuccess: () => router.push('/matches'),
      },
    )
  }

  const handleSkip = (): void => {
    skipMatchMutate(userId, {
      onSuccess: () => router.push('/matches'),
    })
  }

  return (
    <main className="grow">
      <div className="flex justify-center">
        <div className="max-w-base w-full bg-pale-robin-egg-blue p-3">
          <div className="text-center text-2xl font-bold text-white mt-12">
            おめでとうございます！
          </div>

          <div className="flex justify-center">
            <div className="h-[280px] w-[368px] flex">
              <div className="image-personal w-[178px] h-[178px] border-solid border-2 border-white rounded-[12px] relative z-10">
                <Image
                  loader={() => user?.thumbnail ?? ''}
                  src={user?.thumbnail ?? ''}
                  width={178}
                  height={178}
                  alt="flower"
                  className="h-full object-cover rounded-[12px]"
                />
              </div>
              <div className="image-partner w-[178px] h-[178px] border-solid border-2 border-white rounded-[12px] relative z-0">
                <Image
                  loader={() => partnerData?.main_photo_url ?? ''}
                  src={partnerData?.main_photo_url ?? ''}
                  width={178}
                  height={178}
                  alt="flower"
                  className="h-full object-cover rounded-[12px]"
                />
              </div>
            </div>
          </div>

          <div className="text-center text-xl text-white font-bold">
            くだささんと
            <br />
            マッチしました！
          </div>

          {partnerData?.message && (
            <div className="flex justify-center">
              <div className="bg-ghost-white my-5 rounded-md w-[368px] ">
                <div className="text-cetacean-blue text-sm font-bold">
                  くだささんからのメッセージ {partnerData.nickname}
                </div>
                <div className="text-cetacean-blue text-sm p-2 pb-4">
                  {partnerData.message}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <TextArea
              value={content}
              onChange={handleContenChange}
              placeholder="メッセージを入力"
              autoSize={{ minRows: 10, maxRows: 20 }}
              maxLength={1000}
              className="!bg-ghost-white !w-[368px] !border-none"
            />
          </div>
          <div className="flex justify-center mb-2">
            <Button
              type="link"
              className="w-[368px] mt-3 !h-[45px] !bg-columbia-blue !border-none !text-black-1st !text-sm !font-semibold"
              disabled={!content}
              onClick={handleCreateMatch}
            >
              送信
            </Button>
          </div>
          <div className="flex justify-center mb-3">
            <Button
              type="link"
              className="w-[368px] mt-3 !h-[45px] !bg-ghost-white !border-none !text-black-1st !text-sm !font-semibold"
              onClick={handleSkip}
            >
              戻る
            </Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .image-personal {
          transform: rotate(-6deg);
          place-self: center start;
        }
        .image-partner {
          transform: rotate(6deg);
          place-self: center end;
        }
      `}</style>
    </main>
  )
}
