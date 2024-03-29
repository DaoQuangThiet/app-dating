'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function RadioSelectedSvg(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7.5" stroke="#BAC6D3" />
      <circle cx="8" cy="8" r="5" fill="#3F92F3" />
    </svg>
  )
}

export default function RadioSelected(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={RadioSelectedSvg} {...props} />
}
