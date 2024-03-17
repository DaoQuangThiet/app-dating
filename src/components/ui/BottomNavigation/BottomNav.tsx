'use client'

import {
  EnvelopeOutlineIcon,
  PhoneBookIcon,
  SearchOutlineIcon,
  WaveHandIcon,
} from '@/components/icons'
import { useShowTotalLikesStore } from '@/stores/TotalLikesStore'
import { useUserStore } from '@/stores/UserStore'
import { Avatar } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

//TODO Write Story Boook
export default function BottomNav(): JSX.Element {
  const user = useUserStore((state) => state.user)
  const totalLikes = useShowTotalLikesStore((state) => state.total)
  const pathname = usePathname()

  return (
    <>
      <div className="bg-white shadow-2xl min-h-14 left-0 right-0 bottom-0 fixed z-40 justify-center flex flex-row items-center">
        <Link href="/mypage_single">
          <div
            className={`cursor-pointer w-14 flex flex-col items-center justify-center flex-wrap ${
              pathname === '/mypage_single'
                ? 'text-[#06c755]'
                : 'text-primary-dark [&_path]:hover:fill-[#06c755] hover:text-[#06c755]'
            }`}
          >
            <PhoneBookIcon selected={pathname === '/mypage_single'} />
            <div className="text-[9px] font-bold leading-snug mt-2">
              おすすめ
            </div>
          </div>
        </Link>
        <Link href="/mypage">
          <div
            className={`cursor-pointer w-14 flex flex-col items-center justify-center flex-wrap ${
              pathname === '/mypage'
                ? 'text-[#06c755]'
                : 'text-primary-dark [&_path]:hover:fill-[#06c755] hover:text-[#06c755]'
            }`}
          >
            <SearchOutlineIcon selected={pathname === '/mypage'} />
            <div className="text-[9px] font-bold leading-snug mt-2">さがす</div>
          </div>
        </Link>
        <Link href="/likeds">
          <div
            className={`cursor-pointer w-14 flex flex-col items-center justify-center flex-wrap ${
              pathname === '/likeds'
                ? 'text-[#06c755]'
                : 'text-primary-dark [&_path]:hover:fill-[#06c755] hover:text-[#06c755]'
            }`}
          >
            <WaveHandIcon selected={pathname === '/likeds'} />
            <div className="text-[9px] font-bold leading-snug mt-2">
              相手から
            </div>
          </div>
          {totalLikes > 0 && (
            <div className="w-6 h-6 rounded-full absolute ml-9 bg-red top-[-10px] flex justify-center items-center">
              <div className="text-[8px] text-white font-bold">
                {totalLikes}
              </div>
            </div>
          )}
        </Link>
        <Link href="/matches">
          <div
            className={`cursor-pointer w-14 flex flex-col items-center justify-center flex-wrap ${
              pathname === '/matches'
                ? 'text-[#06c755]'
                : 'text-primary-dark [&_path]:hover:fill-[#06c755] hover:text-[#06c755]'
            }`}
          >
            <EnvelopeOutlineIcon selected={pathname === '/matches'} />
            <div className="text-[9px] font-bold leading-snug mt-2">
              やりとり
            </div>
          </div>
        </Link>
        <Link href="/profile">
          <div className="flex flex-col max-w-14 justify-center cursor-pointer flex-grow">
            <div className="flex flex-row self-center">
              <Avatar src={user?.thumbnail} size="large" />
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
