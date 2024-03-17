'use client'

import { useResendVerifyEmailApi } from '@/api'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { useRegisteredEmailStore } from '@/stores/RegisteredEmailStore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// TODO: write storybook
// TODO: make this in to container
export default function WaitForConfirmationComponent(): JSX.Element {
  const [isDisabled, setIsDisabled] = useState(false)

  // TODO: save count down to local storage
  const [countdown, setCountdown] = useState(59)

  const email = useRegisteredEmailStore((state) => state.email)
  const { mutate } = useResendVerifyEmailApi()

  const clickResendEmail = (): void => {
    mutate()
    setIsDisabled(true)
  }

  // TODO: move to a seperate hook
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer)
            setIsDisabled(false)
            return 59
          } else {
            return prevCountdown - 1
          }
        })
      }, 1000)
    }

    return (): void => {
      clearInterval(timer)
    }
  }, [isDisabled])

  return (
    <>
      <Header title="新規登録" backIcon={false} />

      <div className="flex justify-center">
        <main className="w-[360px]">
          <article className="flex flex-col gap-5 mt-7">
            <h1 className="text-primary-dark-green text-lg font-bold">
              確認メールをお送りしました
            </h1>
            <p className="text-xs">
              あなたのメールアドレスに確認メールをお送りいたしました。
            </p>
            <p>{email}</p>
            <p className="text-xs">
              24時間以内にメールに記載のURLをクリックしてください。
            </p>
          </article>

          <article className="bg-sub-1 mt-7 p-3 rounded-lg">
            <div className=" text-primary-dark-green text-[18px] font-bold mb-5">
              このあとの流れ
            </div>
            <div className="text-[12px] font-bold">
              登録を完了するためのメールが以下のメールアドレスから届きます。
            </div>
            <div className="flex justify-center">
              <Image
                src="/signup_email_sample.png"
                alt="Landscape picture"
                width={227}
                height={300}
                priority
              />
            </div>
          </article>

          <article className="mt-7 flex flex-col">
            <h1 className="bg-sub-5 font-bold text-white p-5 rounded">
              メールが届かない場合
            </h1>
            <p className="mt-2 text-xs">
              こちらより、確認メールを再送信できます。
            </p>
            <Button
              className="w-[226px] !h-[57px] mt-8 self-center"
              type="primary"
              onClick={clickResendEmail}
              disabled={isDisabled}
            >
              確認メールを再送信
            </Button>
            <div
              className="order-4 mt-3 text-center text-sm text-red-600"
              hidden={!isDisabled}
            >
              再送信まで1分お待ちください。( 0:{countdown}s )
            </div>
          </article>

          <article className="mt-10 flex flex-col">
            <h1 className="bg-sub-5 font-bold text-white p-5 rounded">
              確認後に先に進めない場合
            </h1>
            <p className="mt-2 text-xs">
              再度ログインし直すことをお試しください
            </p>
            <Link href="/login" className="mt-8 self-center">
              <Button className="w-[226px] !h-[57px] " type="primary">
                再ログイン
              </Button>
            </Link>
          </article>
        </main>
      </div>
    </>
  )
}
