'use client'

import { Button } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'

//TODO: write storybook
export default function NoMatched(): JSX.Element {
  return (
    <>
      <div className="max-w-base w-full pt-24">
        <div className="flex justify-center">
          <div className="hands w-24 h-24 my-6">
            <Image
              src="/high_five_blue.svg"
              alt="high-five"
              width={96}
              height={96}
              className="h-24"
            />
          </div>
        </div>
        <h5 className="text-xl text-cetacean-blue text-center font-bold px-2">
          まだマッチした相手がいません
        </h5>
        <div className="text-sm px-2 mt-3 text-philippine-gray text-center">
          あなたの情報をもっと充実させて
          <br />
          相手からのいいねをもらいましょう
        </div>
        <div className="flex justify-center">
          <Link href="/profile">
            <Button
              type="link"
              className="button-no-match !h-[45px] w-[200px] mt-6 !text-white !bg-philippine-gray"
            >
              プロフィールへ
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
