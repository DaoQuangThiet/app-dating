'use client'

import { useGetAuthApi, useGetLikeReceivedsApi } from '@/api'
import {
  clearAccessTokens,
  clearRefreshTokens,
  getAccessTokens,
  getRefreshToken,
} from '@/libs/axios'
import SocketConnectionProvider from '@/providers/SocketConnectionProvider'
import { useShowTotalLikesStore } from '@/stores/TotalLikesStore'
import { useUserStore } from '@/stores/UserStore'
import { Skeleton } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Template({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const setUser = useUserStore((state) => state.setUser)
  const setTotalLikes = useShowTotalLikesStore((state) => state.setTotalLike)

  const [isLoading, setIsLoading] = useState(true)

  const { data, error } = useGetAuthApi()
  const { data: likeReceived } = useGetLikeReceivedsApi()

  useEffect(() => {
    // TODO: make an useLocalStorage hook
    if (!getAccessTokens() && !getRefreshToken()) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (error) {
      clearAccessTokens()
      clearRefreshTokens()
      return router.push('/login')
    }
  }, [error, router])

  useEffect(() => {
    if (data) {
      if (data?.status === 'WAITING_VERIFY') {
        setIsLoading(false)
        router.push('/wait_for_confirmation')
        return
      }

      if (!data?.onboarding_completed && pathname !== '/on_board1_v4') {
        return router.push('/on_board1_v4')
      }

      if (data?.onboarding_completed && pathname === '/on_board1_v4') {
        return router.push('/on_boarding_completed')
      }

      setIsLoading(false)
      setUser(data)
    }
  }, [data, error, likeReceived?.pages, pathname, router, setUser])

  useEffect(() => {
    setTotalLikes(likeReceived?.pages[0].total || 0)
  }, [likeReceived?.pages, setTotalLikes])

  if (isLoading)
    return (
      <SocketConnectionProvider>
        <main className="flex flex-col items-center">
          <div className="mt-10 w-[25%]">
            <Skeleton active />
          </div>
        </main>
      </SocketConnectionProvider>
    )

  return <>{children}</>
}
