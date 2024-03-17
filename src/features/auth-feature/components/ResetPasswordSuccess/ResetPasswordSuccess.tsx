'use client'

import { useForgotPasswordApi } from '@/api'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { useResetPasswordStore } from '@/stores/ResetPasswordStore'
import { useEffect, useState } from 'react'

// TODO create storybook
// TODO create logic components
export default function ResetPasswordSuccess(): JSX.Element {
  const [isDisabled, setIsDisabled] = useState(false)
  const [countdown, setCountdown] = useState(59)
  const email = useResetPasswordStore((state) => state.email)

  const resetPasswordApi = useForgotPasswordApi()

  const handleClick = (): void => {
    resetPasswordApi.mutate(
      { email: email },
      {
        onError: () => {
          alert('電子メールが存在しません')
        },
      },
    )
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
      <Header title="パスワードリセット" bordered={false} />
      <div className="flex justify-center">
        <div className="justify-start self-center min-w-[280px] max-w-[280px] min-h-[280px] h-max w-[280px] mx-0 my-0 flex-col flex-nowrap flex">
          <h5 className="whitespace-pre-wrap text-[20px] font-bold text-[#019f42] leading-relaxed min-w-full max-w-full order-1 min-h-11 h-max w-full mx-0 my-0 break-words">
            パスワードをお忘れの方
          </h5>
          <div className="whitespace-pre-wrap text-[14px] font-normal text-[#091747] leading-snug min-w-full max-w-full order-2 min-h-11 h-max w-full mx-0 my-0 break-words">
            パスワードリセットメールを送信しました。
            メールに添付されたリンクからパスワードリセットを行ってください。
          </div>
          <Button
            type="primary"
            className="!h-[45px] !text-sm order-3 mt-7"
            onClick={handleClick}
            disabled={isDisabled}
          >
            リセットメールを再送する
          </Button>
          <div
            className="order-4 mt-3 text-center text-sm text-red-600"
            hidden={!isDisabled}
          >
            再送信まで1分お待ちください。( 0:{countdown}s )
          </div>
        </div>
      </div>
    </>
  )
}
