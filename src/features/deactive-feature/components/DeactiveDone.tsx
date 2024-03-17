'use client'

import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'

//TODO: Write storybook
export default function DeactiveDone(): JSX.Element {
  const router = useRouter()
  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <Header title="退会済み" bordered={false} backIcon={false} />
          <div className="flex justify-center">
            <div className="max-w-[460px] w-full">
              <div className="!text-[20px] text-subtitle-m/bold text-primary-dark-green">
                このアカウントは退会済みです
              </div>
              <div className="mt-3">ご利用ありがとうございました。</div>
              <div className="bottom-5 fixed">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Button
                    type="primary"
                    className="w-[430px] !h-[45px]"
                    onClick={() => router.push('/contact')}
                  >
                    お問い合わせ
                  </Button>
                  <Button
                    type="primary"
                    className="w-[430px] !h-[45px]"
                    onClick={() => router.push('/')}
                  >
                    公式ページへ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
