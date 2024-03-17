'use client'

import { Button, HeaderLogged } from '@/components/ui'
import Link from 'next/link'

//TODO: write storybook
export default function NoLike(): JSX.Element {
  return (
    <>
      <HeaderLogged title="相手から" settingIcon={false} />
      <div className="flex justify-center">
        <div className="max-w-base self-center p-3 w-full mt-52 rounded shadow-md bg-white items-center">
          <div className="flex justify-center min-h-10 my-3">
            <div className="text-lg font-bold text-center">
              相手からの <br />
              「いいね」はありません
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-xs text-center w-60 text-cetacean-blue">
              自己紹介が少ない場合、
              <br /> 相手方に不信感を与える場合があります。
              <br />
              自己紹介を充実させて
              <br />
              良好なコミュニケーションをとりましょう。
            </div>
          </div>
          <Link href="/profile_edit" className="flex justify-center">
            <Button
              type="link"
              className="!bg-roman-silver !text-white !h-[45px] !rounded-[5px] !w-48 !text-xs my-4"
            >
              プロフィールへ
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
