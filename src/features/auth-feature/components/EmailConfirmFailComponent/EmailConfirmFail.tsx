'use client'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import Link from 'next/link'

export default function EmailConfirmFail(): JSX.Element {
  return (
    <>
      <Header title="新規登録" bordered={false} />
      <div className="flex justify-center">
        <div className="justify-start self-center min-w-[280px] max-w-[280px] min-h-[280px] h-max w-[280px] mx-0 my-0 flex-col flex-nowrap flex items-center text-sm">
          <div className="whitespace-pre-wrap leading-relaxed min-w-full max-w-full order-1 min-h-11 h-max w-full mx-0 my-0 z-10 relative break-words">
            認証に失敗しました。
          </div>
          <div className="text-sm font-normal pt-16 pb-1 min-w-full max-w-full order-2 h-max w-full">
            大変お手数をおかけしますが、ログインした後、確認メールを再度送信してください。
          </div>
          <Link href="/login" className="order-3 ">
            <Button
              type="primary"
              className="!h-[45px] !text-sm mt-2 w-52 !bg-neutral-400"
            >
              再ログイン
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
