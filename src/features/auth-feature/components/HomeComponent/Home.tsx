'use client'

import { QuestionMarkIcon, RightIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'

// TODO: add Home Storybbook
export default function HomeComponent(): JSX.Element {
  return (
    <div className="flex flex-col justify-center">
      <div className="min-h-[280px] flex flex-col items-center justify-center">
        <Image
          src="/Logo_vertical.svg"
          alt="Logo"
          priority
          width={158}
          height={100}
        />
        <div className="text-primary-green text-[14px] leading-[1.7] font-bold mt-[30px] text-center">
          <div>あと50年の人生には相棒が必要だ</div>
          <div>相棒をさがそう</div>
        </div>
      </div>
      <div className="min-h-[280px] flex flex-col items-center">
        <Link href="/sign_up" className="w-[280px] m-1">
          <Button className="!h-[65px]" block type="primary">
            <div>
              <div className="text-[9px] font-thin ">
                ハハロルアカウントをお持ちでない方
              </div>
              <div className="mt-1">新規登録</div>
            </div>
          </Button>
        </Link>
        <Link href="/login" className="w-[280px] m-1">
          <Button className="!h-[65px]" block>
            <div>
              <div className="text-[9px] font-thin !text-black">
                ハハロルアカウントをお持ちの方
              </div>
              <div className="mt-1">ログイン</div>
            </div>
          </Button>
        </Link>
        <Link href="/reset_pw_create" className="mt-[30px]">
          <div className="flex items-center h-[30px] gap-2">
            <QuestionMarkIcon />
            <div className="text-[12px] leading-[1.2]">
              ログインできない場合のお問合せ
            </div>
            <RightIcon />
          </div>
        </Link>
      </div>
    </div>
  )
}
