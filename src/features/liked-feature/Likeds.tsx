'use client'

import { useGetLikeReceivedsApi } from '@/api'
import { LoadingIcon } from '@/components/icons'
import { HeaderLogged } from '@/components/ui'
import { LikedsReceive } from '@/types/likeds'
import { genderJP } from '@/types/profile'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

//TODO: write storybook
export default function Likeds(): JSX.Element {
  const router = useRouter()

  const {
    data: likeReceived,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetLikeReceivedsApi()

  useEffect(() => {
    const handleScroll = (): void => {
      if (
        hasNextPage &&
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  const likeTotal = useMemo(() => likeReceived?.pages[0].total, [likeReceived])

  if (likeTotal === 0) {
    router.push('/no_liked')
  }

  const dataLikeReceived = useMemo(() => {
    const likedsReceived: LikedsReceive[] = []

    return likeReceived?.pages.reduce((acc, page) => {
      const data = page.data.map((item: LikedsReceive) => ({
        ...item,
        gender: genderJP[item.gender],
      }))
      return [...acc, ...data]
    }, likedsReceived)
  }, [likeReceived])

  return (
    <>
      <HeaderLogged title="相手から" settingIcon={false} />
      <div className="bg-blue h-11 flex justify-center items-center">
        <div className="max-w-base w-full text-sm font-bold text-white mt-2 ml-2">
          {likeReceived
            ? `いいねが${likeTotal}件届いています`
            : 'いいねが0件届いています'}
        </div>
      </div>
      {/* Infomation user section */}
      <div className="flex justify-center">
        <div className="p-3 max-w-base w-full">
          <div className="flex justify-center">
            {/*container list */}
            <div className="users-like-container relative self-center grid-cols-2 max-w-[360px] w-full grid">
              {likeReceived?.pages[0].total
                ? dataLikeReceived?.map(
                    (items: LikedsReceive, index: number) => (
                      <Link href={`/profile/${items.id}/liked`} key={index}>
                        <div className="cursor-pointer flex flex-col rounded-md justify-start max-w-[170px] min-h-64 self-start w-full m-1 shadow-md">
                          {/*Image */}
                          <div className="image-container flex self-start w-full">
                            <div className="relative grid">
                              {items.is_online && (
                                <div className="absolute top-[5px] left-[5px] w-[90px] h-6 flex gap-2 justify-center items-center bg-[#00000099] z-10 rounded-xl">
                                  <div className="h-[9px] w-[9px] bg-[#17DB4E] rounded" />
                                  <div className="text-[#17DB4E] text-xs font-bold">
                                    ログイン中
                                  </div>
                                </div>
                              )}
                              <div className="rounded-t-md overflow-hidden">
                                <Image
                                  loader={() => `${items.main_photo}`}
                                  src={`${items.main_photo}`}
                                  width={170}
                                  height={170}
                                  alt="Avartar"
                                  className="object-cover h-[170px]"
                                />
                              </div>
                              {/*intro on image*/}
                              <div className="intro-container absolute flex flex-col self-center justify-self-center max-w-36 min-h-20 mt-16">
                                <div className="bg-white rounded-full h-[70px] overflow-hidden w-36"></div>
                                <div className="text-xs text-black-2nd pt-3 px-4 relative bottom-16 h-[60px] line-clamp-3">
                                  {items.introduction_summary}
                                </div>
                                <div className="relative bottom-14">
                                  <div className="bg-white rounded-full w-3 h-3 ml-9"></div>
                                  <div className="bg-white rounded-full w-2 h-2 ml-7"></div>
                                </div>
                              </div>
                              {items.message && (
                                <div className="bg-red text-[10px] text-white font-bold text-center py-1 px-6 absolute bottom-0 w-full">
                                  メッセージ付きいいね有り
                                </div>
                              )}
                            </div>
                          </div>
                          {/*Infomation */}
                          <div className="info-container px-3 py-3 self-center flex flex-col justify-start w-full max-h-32 min-h-32">
                            <h5 className="text-xs font-bold text-cetacean-blue mb-1 w-full flex h-8">
                              {items.nickname}・{items.prefecture}・{items.age}{' '}
                              才・
                              {items.gender}
                            </h5>
                            {items.business ? (
                              <div className="text-[10px] text-cetacean-blue mb-1 max-h-3">
                                {items.business}
                              </div>
                            ) : (
                              <div className="text-[10px] text-cetacean-blue mb-1">
                                未設定
                              </div>
                            )}
                            {items.hobby && (
                              <div className="text-[10px] text-white overflow-hidden flex justify-start">
                                <span className="bg-picton-blue px-2">
                                  {items.hobby}
                                </span>
                              </div>
                            )}
                            {items.introduction_summary && (
                              <div className="text-[10px] text-cetacean-blue mt-1 h-8 line-clamp-2">
                                {items.introduction_summary}...
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ),
                  )
                : null}
            </div>
          </div>
          {isFetching && (
            <div className="flex justify-center">
              <div className="text-center max-w-[360px] w-full pt-4 pl-4 self-center">
                <LoadingIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
