'use client'
import { useVerifyEmailApi } from '@/api'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { storeAccessTokens, storeRefreshToken } from '@/libs/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const CLIENT_REQUIRED_TIMEOUT = 1000

export default function EmailConfirm(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { mutate, isPending } = useVerifyEmailApi()

  useEffect(() => {
    if (mutate && searchParams) {
      const token = searchParams.get('token')
      if (token) {
        mutate(
          { token },
          {
            onSuccess: (data) => {
              storeAccessTokens(data.token)
              storeRefreshToken(data.refresh_token)
              setTimeout(() => {
                router.push('/on_board1_v4')
              }, CLIENT_REQUIRED_TIMEOUT)
            },
            onError: () => {
              router.push('/email_confirmation_fail')
            },
          },
        )
      }
    }
  }, [mutate, router, searchParams])

  const handleClick = (): void => {
    router.push('/mypage_single')
  }

  return (
    <>
      <Header title="新規登録" bordered={false} />
      <div className="flex justify-center">
        <div className="justify-start self-center h-max w-[280px] mx-0 my-0 flex-col flex-nowrap flex items-center">
          <h5 className="text-xl font-bold text-primary-dark-green w-full">
            {isPending ? '確認中...' : '登録が完了しました'}
          </h5>
          <div className="text-sm font-normal mt-7 h-max w-full">
            {isPending
              ? 'しばらくお待ちください'
              : '続いてプロフィールの登録に進んでください。'}
          </div>
          <Button
            type="primary"
            disabled={isPending}
            className="!h-[45px] mt-44 !w-52"
            onClick={handleClick}
          >
            プロフィール登録へ
          </Button>
        </div>
      </div>
    </>
  )
}
