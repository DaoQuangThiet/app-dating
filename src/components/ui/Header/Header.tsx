'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  title?: string
  bordered?: boolean
  backIcon?: boolean
  backTo?: string
}

// TODO: create Header storybook
export default function Header({
  title = '',
  bordered = true,
  backIcon = true,
  backTo = undefined,
}: Props): JSX.Element {
  const router = useRouter()

  const borderedClassName = bordered ? 'border-b border-b-[#dfe3e8]' : ''

  return (
    <div className={`absolute top-0 h-14 w-full bg-white ${borderedClassName}`}>
      <div className="flex h-full items-center">
        {backIcon && (
          <div
            className="cursor-pointer h-full flex items-center pl-4 absolute"
            onClick={() => (backTo ? router.push(backTo) : router.back())}
          >
            <Image
              src="/arrow_back.svg"
              className="w-[26px] h-[26px]"
              height={26}
              width={26}
              alt="back"
            />
          </div>
        )}
        <div className="font-bold text-[14px] flex justify-center w-full">
          {title}
        </div>
      </div>
    </div>
  )
}
