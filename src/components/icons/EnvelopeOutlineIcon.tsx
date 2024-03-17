'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function EnvelopeOutlineSvg(selected?: boolean): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1032_9336"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1032_9336)">
        <path
          d="M4 17C3.45 17 2.97917 16.8042 2.5875 16.4125C2.19583 16.0208 2 15.55 2 15V7.15C2 6.9 2.07083 6.65417 2.2125 6.4125C2.35417 6.17083 2.55 5.98333 2.8 5.85L10.5 2L18.05 5.85C18.25 5.95 18.4208 6.10833 18.5625 6.325C18.7042 6.54167 18.8 6.76667 18.85 7H15.925L10.5 4.25L4 7.475V17ZM7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V10C5 9.45 5.19583 8.97917 5.5875 8.5875C5.97917 8.19583 6.45 8 7 8H20C20.55 8 21.0208 8.19583 21.4125 8.5875C21.8042 8.97917 22 9.45 22 10V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H7ZM13.5 15.35L7 12V19H20V12L13.5 15.35ZM13.5 13.35L20 10H7L13.5 13.35Z"
          fill={selected ? '#06c755' : '#606060'}
        />
      </g>
    </svg>
  )
}

export default function EnvelopeOutlineIcon(
  props: Partial<CustomIconComponentProps> & { selected?: boolean },
): JSX.Element {
  return (
    <Icon component={() => EnvelopeOutlineSvg(props.selected)} {...props} />
  )
}
