import Image from 'next/image'
import React from 'react'

type ImageSelectorProps = {
  image: string
  label: string
  isSelected: boolean
  onClick: () => void
}

// TODO: write storybook
const AvatarFilter: React.FC<ImageSelectorProps> = ({
  image,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className="self-center justify-start cursor-pointer h-max w-64 mt-4 flex flex-col"
      onClick={onClick}
    >
      <div className="self-center w-[130px] h-[130px]">
        <Image
          loader={() => image}
          src={image}
          alt="Image Updated"
          title="Image Updated"
          width={130}
          height={130}
          style={{ height: '130px' }}
          className="object-cover rounded-md"
        />
      </div>
      <div className="self-center h-max w-full my-3 flex flex-row justify-center">
        <div
          className={`text-sm font-normal self-center w-[70px] h-max break-words flex-grow max-w-20 ${
            !isSelected ? 'text-sub-4' : 'text-black'
          }`}
        >
          {label}
        </div>
        <div className="text-gray-400 p-1 self-center w-9 h-9 flex">
          {isSelected ? (
            <Image
              src="/check_green.svg"
              alt="circle svg"
              width={23}
              height={23}
              className="h-[23px]"
            />
          ) : (
            <Image
              src="/circle.svg"
              alt="circle svg"
              width={23}
              height={23}
              className="h-[23px]"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AvatarFilter
