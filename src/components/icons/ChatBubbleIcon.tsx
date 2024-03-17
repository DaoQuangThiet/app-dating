'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function ChatBubbleSvg(): JSX.Element {
  return (
    <svg
      width={110}
      height={50}
      viewBox="0 0 196 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0H180C188.837 0 196 7.16344 196 16V68C196 76.8366 188.837 84 180 84H0V16Z"
        fill="#DFE3E8"
      />
      <rect x="16" y="12" width="78" height="16" rx="2" fill="#BAC6D3" />
      <rect x="16" y="34" width="164" height="16" rx="2" fill="#BAC6D3" />
      <rect x="16" y="56" width="127" height="16" rx="2" fill="#BAC6D3" />
    </svg>
  )
}

export default function ChatBubbleIcon(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={ChatBubbleSvg} {...props} />
}
