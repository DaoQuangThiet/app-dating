'use client'

import { useCreateMatchApi, useGetLikeReceivedDetailApi } from '@/api'
import { Button } from '@/components/ui'
import { useUserStore } from '@/stores/UserStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MatchCreateProps {
  userId: string
}
//TODO: write storybook
export default function MatchCreate({ userId }: MatchCreateProps): JSX.Element {
  const router = useRouter()
  const { data: partnerData } = useGetLikeReceivedDetailApi(userId)
  const user = useUserStore((state) => state.user)

  const { mutate } = useCreateMatchApi()

  const handleCreateMatch = (message: string): void => {
    mutate(
      { userId, message },
      {
        onSuccess: () => router.push('/matches'),
      },
    )
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
                  unoptimized
                  priority
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
                  unoptimized
                  priority
                  alt="flower"
                  className="h-full object-cover rounded-[12px]"
                />
              </div>
            </div>
          </div>

          <div className="text-center text-xl text-white font-bold">
            {partnerData?.nickname}と
            <br />
            マッチしました！
          </div>

          {partnerData?.message && (
            <div className="flex justify-center">
              <div className="bg-ghost-white my-5 rounded-md w-[368px] ">
                <div className="text-cetacean-blue text-sm font-bold">
                  {partnerData.nickname}さんからのメッセージ
                </div>
                <div className="text-cetacean-blue text-sm p-2 pb-4">
                  {partnerData.message}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <div>
              <div
                className="w-[348px] cursor-pointer h-16 bg-ghost-white p-3 mb-3"
                onClick={() =>
                  handleCreateMatch(
                    'いいね、ありがとうございます！よろしくお願いいたします！',
                  )
                }
              >
                いいね、ありがとうございます！よろしくお願いいたします！
              </div>
              <div
                className="w-[348px] cursor-pointer h-16 bg-ghost-white p-3 mb-3"
                onClick={() =>
                  handleCreateMatch(
                    'いいね、を頂きありがとうございます。お話できることを楽しみにしています。',
                  )
                }
              >
                いいね、を頂きありがとうございます。お話できる
                <br />
                ことを楽しみにしています。
              </div>
              <div
                className="w-[348px] cursor-pointer h-16 bg-ghost-white p-3 mb-3"
                onClick={() =>
                  handleCreateMatch(
                    '「いいね」ありがとうございます!楽しみにしてお ります',
                  )
                }
              >
                「いいね」ありがとうございます!楽しみにしてお ります
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-24">
            <Button
              type="link"
              className="w-80 mt-3 !h-[45px] !bg-columbia-blue !border-none !text-black-1st !text-sm !font-semibold"
              onClick={() =>
                router.push(`/match_create_message_edit/${userId}`)
              }
            >
              {partnerData?.nickname}さんとやりとりする
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
