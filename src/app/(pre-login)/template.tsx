'use client'

import { useGetAuthApi } from '@/api'
import { Footer } from '@/components/ui'
import {
  clearAccessTokens,
  clearRefreshTokens,
  getAccessTokens,
  getRefreshToken,
} from '@/libs/axios'
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
  const [isLoading, setIsLoading] = useState(true)

  const { data, isPending, error } = useGetAuthApi()

  useEffect(() => {
    if (isPending || !router || !pathname) {
      return
    }

    if (!getAccessTokens() && !getRefreshToken()) {
      setIsLoading(false)
      return
    }

    if (error) {
      clearAccessTokens()
      clearRefreshTokens()
      setIsLoading(false)
      return
    }

    if (!data && pathname.includes('/email_confirmation')) {
      setIsLoading(false)
      router.push('/')
      return
    }

    if (
      data?.status === 'WAITING_VERIFY' &&
      !pathname.includes('/email_confirmation')
    ) {
      router.push('/wait_for_confirmation')
      return
    }

    if (!data?.onboarding_completed && data.status === 'ACTIVE') {
      router.push('/on_board1_v4')
      return
    }

    if (data?.onboarding_completed && data.status === 'ACTIVE') {
      router.push('/mypage_single')
      return
    }

    setIsLoading(false)
  }, [router, data, error, pathname, isPending])

  if (isLoading)
    return (
      <main className="flex flex-col items-center">
        <div className="mt-10 w-[25%]">
          <Skeleton active />
        </div>
      </main>
    )

  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">{children}</div>
      </div>
      <Footer />
    </main>
  )
}
