'use client'

import { useGetProfileApi } from '@/api'
import { Button } from '@/components/ui'
import { Card } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

// TODO: write storybook
export default function OnboardingComplete(): JSX.Element {
  const { data: onboardData } = useGetProfileApi()

  return (
    <>
      <main className="grow">
        <div className="w-full">
          <div className="justify-center flex p-3">
            <div className="justify-center self-center max-w-[480px] min-h-11 w-full flex-col flex-nowrap flex mb-9">
              <h5 className="min-h-11 text-xl font-bold text-primary-dark-green flex items-center">
                あなたのプロフィールが完成しました
              </h5>
              <div className="text-sm min-h-11 text-cetacean-blue">
                入力おつかれさまでした。
                <br />
                ハハロルの世界を体験しましょう！
              </div>
              <div className="bg-sub-5 rounded-md py-5 px-4 w-full my-8 flex flex-col">
                <div className="text-lg font-bold text-white max-w-full min-h-1 w-full">
                  プロフィールの入力
                </div>
              </div>
              {onboardData?.main_photo_url && (
                <div className="self-center w-[200px] h-[240px]">
                  <Image
                    loader={() => onboardData.main_photo_url}
                    src={onboardData.main_photo_url}
                    alt="Image Updated"
                    title="Image Updated"
                    width={200}
                    height={240}
                    style={{ height: '240px' }}
                    className="object-cover rounded-md"
                  />
                </div>
              )}

              {onboardData && (
                <h4 className="text-2xl text-cetacean-blue min-h-2 w-full font-bold my-3 break-words">
                  {onboardData.nickname}
                </h4>
              )}
              <Card
                bordered={false}
                className="!bg-lotion  justify-center w-full flex flex-col !my-3 break-words"
              >
                {onboardData && (
                  <p className="text-cetacean-blue">
                    {onboardData.introduction_summary}
                  </p>
                )}
              </Card>
              <Card
                bordered={false}
                className="!bg-lotion  justify-center w-full !my-3 flex flex-col "
              >
                {onboardData && (
                  <div className="text-cetacean-blue">
                    {onboardData.search_targets.map(
                      (item: string, index: number) => (
                        <div key={index}> {item} </div>
                      ),
                    )}
                  </div>
                )}
              </Card>
              <Card
                bordered={false}
                className="!bg-lotion  justify-center w-full !my-3 flex flex-col "
              >
                <div className="p-3 min-h-24 w-full flex flex-col">
                  <div className="font-bold w-full text-cetacean-blue">
                    ステータス
                  </div>
                  <div className="text-philippine-gray min-h-3 w-full my-3">
                    基本情報
                  </div>
                  {onboardData && (
                    <div className="min-h-10 w-full flex flex-row my-3">
                      <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                        住まい
                      </div>
                      <div className="flex flex-col justify-center self-center max-w-[60%] w-3/5 flex-grow text-cetacean-blue">
                        {onboardData.prefecture}
                      </div>
                    </div>
                  )}
                  {onboardData && (
                    <div className="min-h-10 w-full flex flex-row my-3">
                      <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                        年齢
                      </div>
                      <div className="flex flex-col justify-center self-center max-w-[60%] w-3/5 flex-grow text-cetacean-blue">
                        {onboardData.age}
                        {' 才'}
                      </div>
                    </div>
                  )}
                  {onboardData && (
                    <div className="min-h-10 w-full flex flex-row my-3">
                      <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                        生年月日
                      </div>
                      <div className="flex flex-col justify-center self-center max-w-[60%] w-3/5 flex-grow text-cetacean-blue">
                        {onboardData.date_of_birth}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              <Card
                bordered={false}
                className="!bg-lotion  justify-center w-full !my-3 flex flex-col "
              >
                <div className="font-bold w-full pb-3 text-cetacean-blue">
                  自己紹介（異性向け）
                </div>
                {onboardData && (
                  <div className="text-cetacean-blue">
                    {
                      onboardData.introduction_for_partner_or_opposite_sex_friend
                    }
                  </div>
                )}
              </Card>
              <Card
                bordered={false}
                className="!bg-lotion  justify-center w-full !my-3 flex flex-col "
              >
                <div className="font-bold w-full pb-3 text-cetacean-blue">
                  自己紹介（同性向け）
                </div>
                {onboardData && (
                  <div className="text-cetacean-blue">
                    {onboardData.introduction_for_same_sex_friend}
                  </div>
                )}
              </Card>
              <Link href="/mypage_single">
                <Button className="!h-[49px] w-full !text-sm mb-3 break-words">
                  さっそく相手を探してみる
                </Button>
              </Link>
              <div className="font-bold text-sm 0 w-full mt-5 text-red break-words">
                \ マッチ率を上げるためには/
              </div>
              <h5 className="text-lg text-primary-dark-green font-bold 1 min-h-9 w-full mt-1 break-words">
                プロフィールをもっと充実させましょう
              </h5>
              <div className="text-sub-5 text-sm whitespace-break-spaces font-normal 2 min-h-11 w-full break-words">
                あなたの情報をもっと登録すると
                <br />
                相手からいいねされやすくなります
              </div>
              <Link href="/profile_edit" className="self-center mt-3">
                <Button
                  className="!h-[45px] !w-[368px] !text-sm break-words"
                  type="primary"
                >
                  プロフィールを追加する
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/*Footer */}
        <div className="text-[10px] mt-12 mb-36 w-full">
          <div className="flex justify-center gap-3">
            <Link
              target="_blank"
              href="https://fir-steam-3b8.notion.site/c4d5bd02b6604588b3fb7b6d8832d29b"
              className="underline"
            >
              プライバシーポリシー
            </Link>
            <div>|</div>
            <Link
              target="_blank"
              href="https://fir-steam-3b8.notion.site/578717316bf64c31874f37715e5a2c97"
              className="underline"
            >
              利用規約
            </Link>
          </div>
          <div className="font-bold flex justify-center">
            ©︎ 2023 HHLL Inc. &nbsp;ALL Right Reserved.
          </div>
        </div>
      </main>
    </>
  )
}
