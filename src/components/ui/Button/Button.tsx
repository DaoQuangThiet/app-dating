import { Button as AntButton, ButtonProps } from 'antd'
import { ButtonType } from 'antd/es/button'
import { useMemo } from 'react'

type Props = ButtonProps & {
  type?: ButtonType
  disabled?: boolean
}

export default function Button({
  type = 'default',
  disabled = false,
  className,
  ...remainProps
}: Props): JSX.Element {
  const color: string = useMemo(() => {
    switch (type) {
      case 'primary':
        return '!bg-primary-green !text-white'
      case 'default':
        return '!bg-white !text-primary-green !border-2 !border-primary-green'
      default:
        return ''
    }
  }, [type])

  const disabledStyle: string = useMemo(() => {
    return disabled ? 'opacity-10' : ''
  }, [disabled])

  const hoverStyle: string = useMemo(() => {
    return disabled ? '' : 'hover:opacity-80'
  }, [disabled])

  return (
    <AntButton
      type={type}
      className={`${color} ${disabledStyle} ${hoverStyle} !text-[17px] !font-bold ${className}`}
      disabled={disabled}
      {...remainProps}
    />
  )
}
