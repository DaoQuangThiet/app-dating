'use client'

import { Button, HeaderLogged } from '@/components/ui'
import { getPersonAge } from '@/libs/utils'
import { useUserStore } from '@/stores/UserStore'
import {
  childrenJP,
  cigaretteJP,
  educationBackgrounJP,
  gambleJP,
  Gender,
  householdJP,
  maritalStatusJP,
  physiqueJP,
  Profile,
  religonJP,
  residenceJP,
} from '@/types/profile'
import { Card } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type Props = {
  profile: Profile | undefined | null
  isPreviewable?: boolean
  isPathname?: boolean
}

const isBrowser = (): boolean => typeof window !== 'undefined'
function scrollToTop(): void {
  if (!isBrowser()) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

//TODO: write storybook
export default function Profile({
  profile,
  isPreviewable = false,
  isPathname,
}: Props): JSX.Element | null {
  const pathname = usePathname()
  const user = useUserStore((state) => state.user)

  const [isPreview, setIsPreview] = useState(false)
  const physiqueJapanese = profile?.physique ? physiqueJP[profile.physique] : ''
  const maritialStatusJapanese = profile?.marital_status
    ? maritalStatusJP[profile.marital_status]
    : ''
  const childrenJapanese = profile?.children ? childrenJP[profile.children] : ''
  const householdJapanese = profile?.household
    ? householdJP[profile.household]
    : ''
  const residenceJapanese = profile?.residence
    ? residenceJP[profile.residence]
    : ''
  const religonJapanese = profile?.religion ? religonJP[profile.religion] : ''
  const cigaretteJapanese = profile?.cigarette
    ? cigaretteJP[profile.cigarette]
    : ''
  const gambleJapanese = profile?.gamble ? gambleJP[profile.gamble] : ''
  const educationBackgroundJapanese = profile?.educational_background
    ? educationBackgrounJP[profile.educational_background]
    : ''
  const [previewImgSrc, setPreviewImgSrc] = useState<string | null>('')

  if (!profile) {
    return null
  }

  return (
    <>
      {!pathname.includes('/matched') && <HeaderLogged title="プロフィール" />}
      {previewImgSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center"
          onClick={() => setPreviewImgSrc('')}
        >
          <div className="relative mt-[100px] w-[500px] h-[500px]">
            <Image
              loader={() => previewImgSrc}
              src={previewImgSrc}
              alt="avatar"
              onClick={(e) => e.stopPropagation()}
              fill
              objectFit="contain"
            />
          </div>
          <Button className="!text-sm mt-3xl !w-[150px] !h-[50px]">
            × 閉じる
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="grid p-3 h-max w-full max-w-base bg-slate-50">
          <div className="flex justify-center cursor-pointer">
            <div className="w-60 min-h-60 my-4 flex">
              {profile?.main_photo_url && (
                <Image
                  loader={() => profile.main_photo_url || ''}
                  src={profile.main_photo_url}
                  alt="avatar"
                  width={240}
                  height={240}
                  unoptimized
                  priority
                  quality={100}
                  className="rounded-xl h-60 object-cover"
                  onClick={() => setPreviewImgSrc(profile.main_photo_url)}
                />
              )}
            </div>
          </div>

          <div className="flex flex-nowrap gap-1 overflow-auto">
            {profile?.sub_photos_url &&
              profile.sub_photos_url.map((item: string) => (
                <div
                  key={item}
                  className="min-w-20 max-w-20 min-h-20 max-h-20 relative"
                >
                  <Image
                    loader={() => item}
                    src={item}
                    fill
                    sizes="100%"
                    unoptimized
                    priority
                    quality={100}
                    alt="sub-menu"
                    className="rounded-md object-cover"
                    onClick={() => setPreviewImgSrc(item)}
                  />
                </div>
              ))}
          </div>

          <div className="flex flex-row justify-between w-full mt-1">
            <div className="flex flex-col flex-grow justify-start">
              <h4 className="text-2xl font-bold w-full my-3 text-cetacean-blue">
                {profile.nickname}
              </h4>
            </div>

            {isPreviewable && !isPreview && (
              <div className="flex flex-row justify-end self-center min-h-3 w-20">
                <Link href="/profile_edit">
                  <Button
                    type="link"
                    className="!flex items-center w-20 mt-3 !bg-roman-silver !text-white !rounded-full !text-sm !font-normal !h-max"
                  >
                    <Image
                      src="/edit_icon.svg"
                      width={16}
                      height={16}
                      alt="edit icon"
                      className="mr-1"
                    />
                    編集
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="text-lg font-bold text-philippine-gray self-start mb-2">
            プロフィール
          </div>

          {isPreviewable && !isPreview && (
            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              {profile.gender === Gender.MALE && (
                <div className="flex flex-row min-h-10 my-2 justify-between">
                  <div className="text-sm font-bold self-center w-1/3 text-cetacean-blue">
                    プラン
                  </div>
                  <div className="w-2/3 flex flex-row max-w-28 self-center justify-end">
                    <Link href="/purchase">
                      <Button
                        type="link"
                        className="!flex items-center !bg-roman-silver !text-white !text-xs !font-bold !h-max"
                      >
                        {user?.user_type === 'PREMIUM'
                          ? 'いいねを追加 ＞'
                          : '無料プラン ＞'}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex flex-row min-h-6 my-2">
                <div className="text-sm font-bold self-center w-2/3 text-cetacean-blue">
                  いいね
                </div>
              </div>

              <div className="flex flex-row min-h-10 w-full my-2">
                <div className="text-sm text-cetacean-blue font-bold self-center w-2/3">
                  メッセージオプション
                </div>
              </div>

              {profile.gender === Gender.MALE && (
                <div className="flex flex-row my-3">
                  <Link href="/purchase" className="mt-3 w-full">
                    <Button className="w-full !text-sm !h-12 !flex justify-center items-center">
                      <Image
                        src="/waving_hand_fill.svg"
                        width={24}
                        height={24}
                        alt="edit icon"
                        className="mr-1"
                      />
                      有料プランに加入していいねを追加
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          )}

          <Card
            bordered={false}
            className="flex flex-col justify-center w-full !my-3"
          >
            <div className="text-sm font-bold mb-2 text-cetacean-blue">
              ひとこと
            </div>
            <div className="text-sm font-normal text-cetacean-blue">
              {profile.introduction_summary}
            </div>
          </Card>

          <Card
            bordered={false}
            className="flex flex-col justify-center w-full !my-3"
          >
            <div className="text-sm font-bold mb-2 text-cetacean-blue">
              マッチしたい相手
            </div>
            <div className="text-sm font-normal text-cetacean-blue">
              {profile.search_targets.map((item: string) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </Card>

          {isPathname && !!profile.hobbies.length ? (
            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="text-sm font-bold mb-2 text-cetacean-blue">
                コミュニティ
              </div>
              <div className="text-sm font-normal text-cetacean-blue flex flex-wrap">
                {profile.hobbies.map((item: string) => (
                  <div
                    className="bg-bubbles text-picton-blue rounded-lg p-1 text-sm mt-3 mr-4 "
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            !isPathname && (
              <Card
                bordered={false}
                className="flex flex-col justify-center w-full !my-3"
              >
                <div className="text-sm font-bold mb-2 text-cetacean-blue">
                  コミュニティ
                </div>
                <div className="text-sm font-normal text-cetacean-blue flex flex-wrap">
                  {profile.hobbies.length
                    ? profile.hobbies.map((item: string) => (
                        <div
                          className="bg-bubbles text-picton-blue rounded-lg p-1 text-sm mt-3 mr-4 "
                          key={item}
                        >
                          {item}
                        </div>
                      ))
                    : '未設定'}
                </div>
              </Card>
            )
          )}

          {(profile.search_targets.includes('恋人・パートナー') ||
            profile.search_targets.includes('異性の友人')) && (
            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="font-bold w-full pb-3 text-cetacean-blue">
                自己紹介（異性向け）
              </div>
              <div className="text-cetacean-blue">
                {profile.introduction_for_partner_or_opposite_sex_friend}
              </div>
            </Card>
          )}

          {profile.search_targets.includes('同性の友人') && (
            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="font-bold w-full pb-3 text-cetacean-blue">
                自己紹介（同性向け）
              </div>
              <div className="text-cetacean-blue">
                {profile.introduction_for_same_sex_friend}
              </div>
            </Card>
          )}

          <Card
            bordered={false}
            className="flex flex-col justify-center w-full !my-3"
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col flex-grow justify-start">
                <div className="font-bold w-full text-cetacean-blue">
                  ステータス
                </div>
              </div>
              {isPreviewable && !isPreview && (
                <Link href="/profile_edit">
                  <Button
                    type="link"
                    className="!flex items-center w-20 !bg-roman-silver !text-white !rounded-full !text-sm !font-normal !h-max"
                  >
                    <Image
                      src="/edit_icon.svg"
                      width={16}
                      height={16}
                      alt="edit icon"
                      className="mr-1"
                    />
                    編集
                  </Button>
                </Link>
              )}
            </div>
            <div className="text-philippine-gray min-h-3 h-max w-full my-3">
              基本情報
            </div>
            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                住まい
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile.prefecture}
              </div>
            </div>

            {/* place of birth */}
            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                出生地
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile.place_of_birth || '未設定'}
              </div>
            </div>

            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                年齢
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile?.date_of_birth ? (
                  <>{getPersonAge(profile.date_of_birth)}&nbsp;才</>
                ) : (
                  '未設定'
                )}
                &nbsp;
              </div>
            </div>
            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                生年月日
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile.date_of_birth}
              </div>
            </div>
            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                性別
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile.gender === Gender.MALE ? '男性' : '女性'}
              </div>
            </div>
            <div className="min-h-10 h-max w-full flex flex-row my-3">
              <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                性格タイプ
              </div>
              <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                {profile.characters.join(', ')}
              </div>
            </div>

            {/* physique */}
            {isPathname && physiqueJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  体格
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {physiqueJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    体格
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {physiqueJapanese ? physiqueJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && profile.height ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  身長
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.height}cm
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    身長
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile?.height ? <>{profile.height}cm</> : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && maritialStatusJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  結婚歴
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {maritialStatusJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    結婚歴
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {maritialStatusJapanese ? maritialStatusJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && childrenJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  子供有無
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {childrenJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    子供有無
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {childrenJapanese ? childrenJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && householdJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  生活
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {householdJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    生活
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {householdJapanese ? householdJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && residenceJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  住居
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {residenceJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    住居
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {residenceJapanese ? residenceJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && !!profile.cars.length ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  車
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.cars.map((item: string) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    車
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile.cars.length
                      ? profile.cars.map((item: string) => (
                          <div key={item}>{item}</div>
                        ))
                      : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && !!profile.languages.length ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  話せる言語
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.languages.join(', ')}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    話せる言語
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile.languages.length
                      ? profile.languages.join(', ')
                      : '未設定'}
                  </div>
                </div>
              )
            )}
            {isPathname && religonJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  宗教
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {religonJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    宗教
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {religonJapanese ? religonJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && cigaretteJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  タバコ
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {cigaretteJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    タバコ
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {cigaretteJapanese ? cigaretteJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && gambleJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  ギャンブル
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {gambleJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    ギャンブル
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {gambleJapanese ? gambleJapanese : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && profile.income ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  年収
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.income}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    年収
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile.income || '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && educationBackgroundJapanese ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  学歴
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {educationBackgroundJapanese}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    学歴
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {educationBackgroundJapanese
                      ? educationBackgroundJapanese
                      : '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && profile.school_name ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  学校名
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.school_name}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    学校名
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile.school_name || '未設定'}
                  </div>
                </div>
              )
            )}

            {isPathname && profile.business ? (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  職業
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profile.business}
                </div>
              </div>
            ) : (
              !isPathname && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                    職業
                  </div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    {profile.business || '未設定'}
                  </div>
                </div>
              )
            )}

            {profile.retired && (
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow"></div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  退職済み
                </div>
              </div>
            )}
          </Card>

          {isPreviewable && isPreview && (
            <div className="flex flex-row my-3">
              <Button
                className="mt-3 w-full !text-sm !h-12 !flex justify-center items-center"
                onClick={() => setIsPreview(false)}
              >
                <Image
                  src="/face_female_green.svg"
                  width={24}
                  height={24}
                  alt="edit icon"
                  className="mr-1"
                />
                プレビューを終了
              </Button>
            </div>
          )}
          {isPreviewable && !isPreview && (
            <div className="flex flex-row my-3">
              <Button
                className="mt-3 w-full !text-sm !h-12 !flex justify-center items-center"
                onClick={() => {
                  setIsPreview(true)
                  scrollToTop()
                }}
              >
                <Image
                  src="/face_female_green.svg"
                  width={24}
                  height={24}
                  alt="edit icon"
                  className="mr-1"
                />
                プロフィールをプレビュー
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
