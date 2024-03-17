'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function RightIconSvg(): JSX.Element {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.94595 9L2 8.06667L5.10811 5L2 1.93333L2.94595 1L7 5L2.94595 9Z"
        fill="#050505"
      />
    </svg>
  )
}

export default function RightIcon(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={RightIconSvg} {...props} />
}
