'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function PlusFilledOutlinedSvg(): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#06c755"
      width={20}
      height={20}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect x="0" fill="none" width="20" height="20"></rect>
        <g>
          <path d="M15.8 4.2c3.2 3.21 3.2 8.39 0 11.6-3.21 3.2-8.39 3.2-11.6 0C1 12.59 1 7.41 4.2 4.2 7.41 1 12.59 1 15.8 4.2zm-4.3 11.3v-4h4v-3h-4v-4h-3v4h-4v3h4v4h3z"></path>
        </g>
      </g>
    </svg>
  )
}

export default function PlusFilledOutlinedIcon(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={PlusFilledOutlinedSvg} {...props} />
}
