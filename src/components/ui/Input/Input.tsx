import { Input as AntInput, InputProps } from 'antd'

type Props = InputProps

export default function Input({
  className,
  ...remainProps
}: Props): JSX.Element {
  return (
    <AntInput
      className={`h-[48px] !text-cetacean-blue font-normal ${className}`}
      {...remainProps}
    />
  )
}
