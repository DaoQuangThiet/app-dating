'use client'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function LikeWaveHandSvg(isLiked: boolean): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17.4545 24C19.2727 24 20.8182 23.3636 22.0909 22.0909C23.3636 20.8182 24 19.2727 24 17.4545H22.3636C22.3636 18.8182 21.8864 19.9773 20.9318 20.9318C19.9773 21.8864 18.8182 22.3636 17.4545 22.3636V24ZM0 6.54545H1.63636C1.63636 5.18182 2.11364 4.02273 3.06818 3.06818C4.02273 2.11364 5.18182 1.63636 6.54545 1.63636V0C4.72727 0 3.18182 0.636364 1.90909 1.90909C0.636364 3.18182 0 4.72727 0 6.54545ZM2.75455 21.2455C0.936364 19.4273 0.0272727 17.2455 0.0272727 14.7C0.0272727 12.1545 0.936364 9.97273 2.75455 8.15455L6.6 4.28182C7.12727 3.75455 7.76818 3.49091 8.52273 3.49091C9.27727 3.49091 9.91818 3.75455 10.4455 4.28182C10.5182 4.35455 10.5864 4.42727 10.65 4.5C10.7136 4.57273 10.7636 4.64545 10.8 4.71818L13.5545 1.96364C14.0818 1.43636 14.7227 1.17273 15.4773 1.17273C16.2318 1.17273 16.8727 1.43636 17.4 1.96364C17.4909 2.05455 17.5636 2.13636 17.6182 2.20909L17.7818 2.42727C18.3091 2.06364 18.9 1.90909 19.5545 1.96364C20.2091 2.01818 20.7727 2.28182 21.2455 2.75455C21.6636 3.17273 21.9182 3.65 22.0091 4.18636C22.1 4.72273 22.0364 5.25455 21.8182 5.78182C21.9273 5.83636 22.0318 5.9 22.1318 5.97273C22.2318 6.04545 22.3273 6.12727 22.4182 6.21818C22.9455 6.74546 23.2091 7.38636 23.2091 8.14091C23.2091 8.89545 22.9455 9.53636 22.4182 10.0636L21.9818 10.5C22.0545 10.5364 22.1273 10.5864 22.2 10.65C22.2727 10.7136 22.3455 10.7818 22.4182 10.8545C22.9455 11.3818 23.2091 12.0227 23.2091 12.7773C23.2091 13.5318 22.9455 14.1727 22.4182 14.7L15.8455 21.2455C14.0273 23.0636 11.8455 23.9727 9.3 23.9727C6.75455 23.9727 4.57273 23.0636 2.75455 21.2455ZM4.28182 19.7182C4.97273 20.4091 5.75455 20.9273 6.62727 21.2727C7.5 21.6182 8.39091 21.7909 9.3 21.7909C10.2091 21.7909 11.1 21.6182 11.9727 21.2727C12.8455 20.9273 13.6273 20.4091 14.3182 19.7182L20.8636 13.1455C20.9727 13.0364 21.0273 12.9091 21.0273 12.7636C21.0273 12.6182 20.9727 12.4909 20.8636 12.3818C20.7545 12.2727 20.6273 12.2182 20.4818 12.2182C20.3364 12.2182 20.2091 12.2727 20.1 12.3818L16.2545 16.2545L14.7 14.7L20.8636 8.53636C20.9727 8.42727 21.0273 8.29545 21.0273 8.14091C21.0273 7.98636 20.9727 7.85455 20.8636 7.74545C20.7545 7.65455 20.6273 7.60455 20.4818 7.59545C20.3364 7.58636 20.2091 7.63636 20.1 7.74545L14.7 13.1455L13.1455 11.6182L19.7182 5.04545C19.8273 4.93636 19.8818 4.80909 19.8818 4.66364C19.8818 4.51818 19.8273 4.39091 19.7182 4.28182C19.6091 4.17273 19.4818 4.11818 19.3364 4.11818C19.1909 4.11818 19.0636 4.17273 18.9545 4.28182L12.3818 10.8545L10.8545 9.3L15.8455 4.28182C15.9545 4.17273 16.0091 4.04545 16.0091 3.9C16.0091 3.75455 15.9545 3.62727 15.8455 3.51818C15.7545 3.40909 15.6318 3.35455 15.4773 3.35455C15.3227 3.35455 15.1909 3.40909 15.0818 3.51818L8.20909 10.3909C8.59091 11.3727 8.68182 12.3955 8.48182 13.4591C8.28182 14.5227 7.78182 15.4545 6.98182 16.2545L5.45455 14.7C6.09091 14.0636 6.40909 13.2909 6.40909 12.3818C6.40909 11.4727 6.09091 10.7 5.45455 10.0636L8.91818 6.6C9.02727 6.49091 9.08182 6.36364 9.08182 6.21818C9.08182 6.07273 9.02727 5.94545 8.91818 5.83636C8.80909 5.72727 8.68182 5.67727 8.53636 5.68636C8.39091 5.69545 8.26364 5.74545 8.15455 5.83636L4.28182 9.68182C3.59091 10.3727 3.07273 11.1545 2.72727 12.0273C2.38182 12.9 2.20909 13.7909 2.20909 14.7C2.20909 15.6091 2.38182 16.5 2.72727 17.3727C3.07273 18.2455 3.59091 19.0273 4.28182 19.7182Z"
        fill={isLiked ? '#7d8796' : '#12B756'}
      />
    </svg>
  )
}

export default function LikeWaveHandIcon(
  props: Partial<CustomIconComponentProps> & {
    isLiked: boolean
  },
): JSX.Element {
  return <Icon component={() => LikeWaveHandSvg(props.isLiked)} {...props} />
}