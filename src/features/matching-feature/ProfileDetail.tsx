'use client'

import { useGetLikeReceivedDetailApi, useSkipUserApi } from '@/api'
import { Button, Footer, HeaderLogged } from '@/components/ui'
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
  religonJP,
  residenceJP,
  UserType,
} from '@/types/profile'
import { Card, Modal } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProfileDetailProps {
  userId: string
}

//TODO: write storybook
export default function ProfileDetail({
  userId,
}: ProfileDetailProps): JSX.Element {
  const [openModalMale, setOpenModalMale] = useState(false)
  const [openModalFemale, setOpenModalFemale] = useState(false)
  const router = useRouter()
  const skipUserLiked = useSkipUserApi()

  const currentUser = useUserStore((state) => state.user)
  const { data: profileData } = useGetLikeReceivedDetailApi(userId)
  const isUserFirst24h =
    dayjs() > dayjs(currentUser?.created_at).add(1, 'day')

  const handleClickReply = (): void => {
    if (isUserFirst24h) {
      if (
        !currentUser?.identity_verified &&
        currentUser?.gender === Gender.FEMALE
      ) {
        setOpenModalFemale(true)
        return
      }
      if (
        currentUser?.gender === Gender.MALE &&
        currentUser?.user_type === UserType.DEFAULT
      ) {
        setOpenModalMale(true)
        return
      }
      router.push(`/match_create/${profileData?.id}`)
    }
    router.push(`/match_create/${profileData?.id}`)
  }

  const handleSkipUser = (): void => {
    skipUserLiked.mutate(userId, {
      onSuccess: () => {
        router.push('/likeds')
      },
    })
  }

  const physiqueJapanese = physiqueJP[profileData?.physique ?? '']
  const maritialStatus = maritalStatusJP[profileData?.marital_status ?? '']
  const childrenJapanese = childrenJP[profileData?.children ?? '']
  const householdJapanese = householdJP[profileData?.household ?? '']
  const residenceJapanese = residenceJP[profileData?.residence ?? '']
  const religonJapanese = religonJP[profileData?.religion ?? '']
  const cigaretteJapanese = cigaretteJP[profileData?.cigarette ?? '']
  const gambleJapanese = gambleJP[profileData?.gamble ?? '']
  const educationBackgroundJapanese =
    educationBackgrounJP[profileData?.educational_background ?? '']
  const [previewImgSrc, setPreviewImgSrc] = useState<string>('')

  return (
    <main className="grow">
      <div className="w-full mt-14">
        <HeaderLogged title="プロフィール" />
        {profileData?.message && (
          <div className="bg-red h-11 p-4">
            <div className="text-white text-sm font-bold">
              メッセージ付きいいねが届いています
            </div>
          </div>
        )}
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
                unoptimized
                priority
                fill
                objectFit="contain"
              />
            </div>
            <Button className="!text-sm mt-3xl !w-[150px] !h-[50px]">
              × 閉じる
            </Button>
          </div>
        )}
        <div className="flex justify-center">
          <div className="justify-center max-w-base p-3 self-center h-max w-full flex flex-col bg-slate-50">
            <div className="flex justify-center cursor-pointer">
              <div className="w-60 min-h-60 my-4 flex flex-row">
                {profileData?.main_photo_url && (
                  <Image
                    loader={() => profileData?.main_photo_url ?? ''}
                    src={profileData?.main_photo_url}
                    alt="avatar"
                    width={240}
                    height={240}
                    unoptimized
                    priority
                    className="rounded-xl h-60 object-cover"
                    onClick={() =>
                      setPreviewImgSrc(profileData?.main_photo_url ?? '')
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex gap-1 overflow-y-auto">
              {profileData?.sub_photos_url &&
                profileData?.sub_photos_url.map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className="flex w-20 h-20 relative flex-none"
                    >
                      <Image
                        loader={() => item}
                        src={item}
                        width={80}
                        height={80}
                        unoptimized
                        priority
                        alt="sub-menu"
                        className="rounded-md object-cover"
                        onClick={() => setPreviewImgSrc(item)}
                      />
                    </div>
                  ),
                )}
            </div>

            <div className="mt-2 mb-5">
              <div className="text-base text-blue font-medium">
                {profileData?.nickname} から、
                {currentUser?.nickname} さんに、いいねが届いています。
              </div>
            </div>

            <div className="package-check-container mb-5">
              {profileData?.message && (
                <div className="text-base text-blue font-medium">
                  いいねと合わせてメッセージが届いています。
                </div>
              )}

              {currentUser?.gender === Gender.MALE &&
              currentUser?.user_type === UserType.DEFAULT &&
              profileData?.message &&
              isUserFirst24h ? (
                <Link href="/purchase">
                  <div className="bg-sub-3 p-2 rounded-md mt-1">
                    <div className="w-80 m-1">
                      <Image
                        src="/check_pakage.svg"
                        width={300}
                        height={50}
                        alt="check_package"
                      />
                    </div>
                    <div className="text-cetacean-blue text-sm font-medium m-1 mt-3">
                      このメッセージを見るには <br />{' '}
                      有料会員への入会が必要です。
                    </div>
                  </div>
                </Link>
              ) : (
                <>
                  {currentUser?.gender === Gender.MALE &&
                  currentUser?.user_type === UserType.PREMIUM &&
                  profileData?.message ? (
                    <div className="bg-sub-3 pt-2 pb-5 pl-3 rounded-md mt-1">
                      <div className="text-cetacean-blue text-sm font-medium">
                        {profileData?.message ? profileData?.message : ''}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}

              {currentUser?.gender === Gender.FEMALE &&
              !currentUser?.identity_verified &&
              profileData?.message &&
              isUserFirst24h ? (
                <Link href="/identification_index">
                  <div className="bg-sub-3 p-2 rounded-md mt-1">
                    <div className="w-80 m-1">
                      <Image
                        src="/check_pakage.svg"
                        width={300}
                        height={50}
                        alt="check_package"
                      />
                    </div>
                    <div className="text-cetacean-blue text-sm font-medium m-1 mt-3">
                      このメッセージを見るには
                      <br />
                      年齢確認が必要です。
                    </div>
                  </div>
                </Link>
              ) : (
                <>
                  {!isUserFirst24h ||
                  (currentUser?.gender === Gender.FEMALE &&
                    currentUser?.identity_verified &&
                    profileData?.message) ? (
                    <div className="bg-sub-3 pt-2 pb-5 pl-3 rounded-md mt-1">
                      <div className="text-cetacean-blue text-sm font-medium">
                        {profileData?.message ? profileData?.message : ''}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>

            <div className="flex flex-row justify-between w-full mt-1">
              <div className="flex flex-col flex-grow justify-start">
                <h4 className="text-2xl font-bold w-full my-3 text-cetacean-blue">
                  {profileData?.nickname}
                </h4>
              </div>
            </div>

            <div className="text-lg font-bold text-philippine-gray self-start mb-2">
              プロフィール
            </div>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="text-sm font-bold mb-2 text-cetacean-blue">
                ひとこと
              </div>
              <div className="text-sm font-normal text-cetacean-blue">
                {profileData?.introduction_summary}
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
                {profileData?.search_targets &&
                profileData?.search_targets.length > 0
                  ? profileData?.search_targets.map(
                      (item: string, index: number) => (
                        <div key={index}> {item} </div>
                      ),
                    )
                  : '未設定'}
              </div>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="text-sm font-bold mb-2 text-cetacean-blue">
                コミュニティ
              </div>
              <div className="text-sm font-normal text-cetacean-blue flex flex-wrap">
                {profileData?.hobbies && profileData.hobbies.length > 0
                  ? profileData?.hobbies.map(
                      (item: string, index: number) =>
                        index < 2 && (
                          <div
                            className="bg-bubbles text-picton-blue rounded-lg p-1 text-sm mt-3 mr-4 "
                            key={index}
                          >
                            {item}
                          </div>
                        ),
                    )
                  : '未設定'}
              </div>
            </Card>

            {(profileData?.search_targets.includes('恋人・パートナー') ||
              profileData?.search_targets.includes('異性の友人')) && (
              <Card
                bordered={false}
                className="flex flex-col justify-center w-full !my-3"
              >
                <div className="font-bold w-full pb-3 text-cetacean-blue">
                  自己紹介（異性向け）
                </div>
                <div className="text-cetacean-blue break-words">
                  {profileData?.introduction_for_partner_or_opposite_sex_friend}
                </div>
              </Card>
            )}

            {profileData?.search_targets.includes('同性の友人') && (
              <Card
                bordered={false}
                className="flex flex-col justify-center w-full !my-3"
              >
                <div className="font-bold w-full pb-3 text-cetacean-blue">
                  自己紹介（同性向け）
                </div>
                <div className="text-cetacean-blue break-words">
                  {profileData?.introduction_for_same_sex_friend}
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
              </div>
              <div className="text-philippine-gray min-h-3 h-max w-full my-3">
                基本情報
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  住まい
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.prefecture ? profileData?.prefecture : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  出生地
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.place_of_birth
                    ? profileData?.place_of_birth
                    : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  年齢
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.age ? profileData?.age : '未設定'}
                  {' 才'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  生年月日
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.date_of_birth}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  性別
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.gender === Gender.MALE ? '男性' : '女性'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  性格タイプ
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.characters && profileData?.characters.length > 0
                    ? profileData?.characters.join(', ')
                    : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  体格
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {physiqueJapanese ? physiqueJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  身長
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.height && profileData?.height > 1
                    ? profileData?.height + 'cm'
                    : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  結婚歴
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {maritialStatus ? maritialStatus : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  子供有無
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {childrenJapanese ? childrenJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  生活
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {householdJapanese ? householdJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  住居
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {residenceJapanese ? residenceJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  車
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.cars && profileData.cars.length > 0
                    ? profileData?.cars.map((item: string, index: number) => (
                        <div key={index}>{item}</div>
                      ))
                    : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  話せる言語
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.languages && profileData.languages.length > 0
                    ? profileData?.languages.join(', ')
                    : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  宗教
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {religonJapanese ? religonJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  タバコ
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {cigaretteJapanese ? cigaretteJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  ギャンブル
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {gambleJapanese ? gambleJapanese : '未設定'}
                </div>
              </div>
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  年収
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.income ? profileData?.income : '未設定'}
                </div>
              </div>
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
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  学校名
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.school_name
                    ? profileData?.school_name
                    : '未設定'}
                </div>
              </div>
              {profileData?.retired && (
                <div className="min-h-10 h-max w-full flex flex-row my-3">
                  <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow"></div>
                  <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                    退職済み
                  </div>
                </div>
              )}
              <div className="min-h-10 h-max w-full flex flex-row my-3">
                <div className="max-w-[40%] text-primary-dark-green w-2/5 font-bold self-center flex-grow">
                  職業
                </div>
                <div className="flex flex-col justify-center self-center text-cetacean-blue max-w-[60%] w-3/5 flex-grow">
                  {profileData?.business ? profileData?.business : '未設定'}
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="fixed max-w-base bottom-20 w-full flex px-3">
            <Button
              type="link"
              className="!h-12 w-1/3 !bg-chinese-silver !border-none mr-2 !text-white !text-sm"
              onClick={handleSkipUser}
            >
              スキップ
            </Button>
            <Button
              type="primary"
              className="!h-12 w-2/3 !text-sm"
              onClick={handleClickReply}
            >
              {currentUser?.gender === Gender.FEMALE &&
              !currentUser?.identity_verified &&
              isUserFirst24h
                ? '年歳確認をする'
                : 'お返事する'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        closeIcon={null}
        footer={null}
        open={openModalMale}
        width={312}
        maskClosable={true}
      >
        <Image
          src="/matching.png"
          alt="Landscape picture"
          width={312}
          height={160}
          priority
          className="rounded-lg"
        />
        <div className="text-center text-xl font-bold mt-5">
          有料会員への入会が必要です。
        </div>
        <div className="mt-3 mb-2 text-center">
          マッチングをして、やり取りをするには
          <br />
          有料会員へ入会してください。
        </div>
        <div className="flex my-3 flex-col items-center">
          <Link href="/purchase">
            <Button type="primary" className="!h-11 !text-sm w-60 mb-3">
              プランを確認する
            </Button>
          </Link>
          <Button
            type="link"
            className="button-matching !h-11 !text-sm w-40 !text-cetacean-blue mb-4"
            onClick={() => setOpenModalMale(false)}
          >
            閉じる
          </Button>
        </div>
      </Modal>

      <Modal
        closeIcon={null}
        footer={null}
        open={openModalFemale}
        width={312}
        maskClosable={true}
      >
        <Image
          src="/matching.png"
          alt="Landscape picture"
          width={312}
          height={160}
          priority
          className="rounded-lg"
        />
        <div className="text-center text-xl font-bold mt-5">
          本人確認が必要です。
        </div>
        <div className="mt-3 mb-2 text-center">
          マッチングをして、やり取りをするには
          <br />
          年齢確認が必要です。
        </div>
        <div className="flex my-3 flex-col items-center">
          <Link href="/identification_index">
            <Button type="primary" className="!h-11 !text-sm w-60 mb-3">
              年歳確認をする
            </Button>
          </Link>
          <Button
            type="link"
            className="button-matching !h-11 !text-sm w-40 !text-cetacean-blue mb-4"
            onClick={() => setOpenModalFemale(false)}
          >
            閉じる
          </Button>
        </div>
      </Modal>
      <style jsx global>{`
        .ant-modal-content {
          padding: 0px !important;
          border-radius: 12px !important;
        }
        .button-matching:hover {
          background-color: aliceblue !important;
        }
      `}</style>
    </main>
  )
}
