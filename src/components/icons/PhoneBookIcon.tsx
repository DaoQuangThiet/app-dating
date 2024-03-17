'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function PhoneBookSvg(selected?: boolean): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3254_18749"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3254_18749)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 4H5L5 18H16V4ZM5 2C3.89543 2 3 2.89543 3 4V18C3 19.1046 3.89543 20 5 20H16C17.1046 20 18 19.1046 18 18V4C18 2.89543 17.1046 2 16 2H5Z"
          fill={selected ? '#06c755' : '#606060'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 21V22C6 23.1046 6.89543 24 8 24H20C21.1046 24 22 23.1046 22 22V7C22 5.89543 21.1046 5 20 5H19V7H20V22H8V21H6Z"
          fill={selected ? '#06c755' : '#606060'}
        />
        <path
          d="M10.5 11.5C9.88125 11.5 9.35156 11.2797 8.91094 10.8391C8.47031 10.3984 8.25 9.86875 8.25 9.25C8.25 8.63125 8.47031 8.10156 8.91094 7.66094C9.35156 7.22031 9.88125 7 10.5 7C11.1188 7 11.6484 7.22031 12.0891 7.66094C12.5297 8.10156 12.75 8.63125 12.75 9.25C12.75 9.86875 12.5297 10.3984 12.0891 10.8391C11.6484 11.2797 11.1188 11.5 10.5 11.5ZM6 16V14.425C6 14.1062 6.08203 13.8133 6.24609 13.5461C6.41016 13.2789 6.62813 13.075 6.9 12.9344C7.48125 12.6438 8.07187 12.4258 8.67188 12.2805C9.27188 12.1352 9.88125 12.0625 10.5 12.0625C11.1188 12.0625 11.7281 12.1352 12.3281 12.2805C12.9281 12.4258 13.5188 12.6438 14.1 12.9344C14.3719 13.075 14.5898 13.2789 14.7539 13.5461C14.918 13.8133 15 14.1062 15 14.425V16H6Z"
          fill={selected ? '#06c755' : '#606060'}
        />
      </g>
    </svg>
  )
}

export default function PhoneBookIcon(
  props: Partial<CustomIconComponentProps> & { selected?: boolean },
): JSX.Element {
  return <Icon component={() => PhoneBookSvg(props.selected)} {...props} />
}
