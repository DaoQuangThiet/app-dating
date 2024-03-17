type Props = {
  text: string
}

// TODO: write storybook

export default function HobbyTag({ text }: Props): JSX.Element {
  return (
    <div className="my-[10px] mr-[15px] py-[5px] px-[15px] bg-[#e4f9fe] text-[#3cb7da] text-[14px] leading-[14px] rounded-[10px]">
      {text}
    </div>
  )
}
