'use client'

import { useGetAuthApi, useLogoutApi } from '@/api'
import Header from '@/components/ui/Header'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { clearAccessTokens, clearRefreshTokens } from '@/libs/axios'
import { SocketStore } from '@/stores/SocketStore'
import { useUserStore } from '@/stores/UserStore'
import { Gender } from '@/types/profile'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

//TODO: write storybook
export default function Setting(): JSX.Element {
  const setUser = useUserStore((state) => state.setUser)
  const router = useRouter()
  const { data } = useGetAuthApi()
  const { mutate } = useLogoutApi()
  const queryClient = useQueryClient()

  const logout = (): void => {
    clearAccessTokens()
    clearRefreshTokens()
    useDeactiveStore.set.resetSavedData()
    setUser(null)
    SocketStore.get.socket()?.close()
    SocketStore.set.socket(null)
    queryClient.invalidateQueries()
    queryClient.clear()
    mutate()
    router.push('/')
  }

  const status = useMemo(() => {
    if (data?.gender === Gender.MALE) return '未確認'

    if (data?.gender === Gender.FEMALE) {
      if (data?.identity_verified) {
        return '確認済み'
      }
      return '未確認'
    }
    return ''
  }, [data?.gender, data?.identity_verified])

  return (
    <>
      <Header title="設定" />
      <div className="flex justify-center bg-sub-3">
        <div className="p-3 max-w-base w-full">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex flex-col gap-3">
              <div className="font-bold">アカウント</div>
              <div>
                <div className="grid grid-cols-3">
                  <div className="text-primary-green">本人確認</div>
                  <div className="col-span-2 text-right">{status}</div>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-primary-green">メールアドレス</div>
                <div className="col-span-2 text-right">{data?.email}</div>
              </div>
            </div>
          </div>
          <div
            className="bg-white py-2 font-bold rounded-lg cursor-pointer mb-4"
            onClick={() =>
              window.open(
                'https://fir-steam-3b8.notion.site/578717316bf64c31874f37715e5a2c97',
              )
            }
          >
            <div className="flex items-center justify-center">利用規約</div>
          </div>
          <div
            className="bg-white py-2 font-bold rounded-lg cursor-pointer mb-4"
            onClick={() =>
              window.open(
                'https://fir-steam-3b8.notion.site/c4d5bd02b6604588b3fb7b6d8832d29b',
              )
            }
          >
            <div className="flex items-center justify-center">
              プライバシーポリシー
            </div>
          </div>
          <div
            className="bg-white py-2 font-bold rounded-lg cursor-pointer mb-4"
            onClick={() => router.push('/contact')}
          >
            <div className="flex items-center justify-center">お問い合わせ</div>
          </div>
          <div
            className="bg-white py-2 text-red font-bold rounded-lg cursor-pointer mb-4"
            onClick={logout}
          >
            <div className="flex items-center justify-center">ログアウト</div>
          </div>
          <div
            className="bg-white py-2 text-red font-bold rounded-lg cursor-pointer mb-4"
            onClick={() => router.push('/leave_confirmation')}
          >
            <div className="flex items-center justify-center">退会する</div>
          </div>
        </div>
      </div>
    </>
  )
}
