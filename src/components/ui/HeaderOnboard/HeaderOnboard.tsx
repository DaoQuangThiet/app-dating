'use client'

import Image from 'next/image'

type Props = {
  title: string
  showIcon: boolean
  clickBack: () => void
}

//TODO write storybook
export default function HeaderOnboard({
  title,
  showIcon,
  clickBack,
}: Props): JSX.Element {
  return (
    <div className="h-14 absolute top-0 w-full">
      <div className="flex h-full items-center">
        {showIcon && (
          <div
            className="cursor-pointer h-full flex items-center pl-4 absolute"
            onClick={clickBack}
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
