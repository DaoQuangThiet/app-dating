'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function BackIconSvg(): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3_6"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3_6)">
        <path
          d="M14.3333 20.3334L6 12.0001L14.3333 3.66675L15.8125 5.14591L8.95833 12.0001L15.8125 18.8542L14.3333 20.3334Z"
          fill="black"
        />
      </g>
    </svg>
  )
}

export default function BackIcon(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={BackIconSvg} {...props} />
}
