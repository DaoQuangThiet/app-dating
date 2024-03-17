import Link from 'next/link'

// TODO: Create Footer storybook
export default function Footer(): JSX.Element {
  return (
    <div className="mt-10 mb-24">
      <div className="flex justify-center items-center gap-5 py-[10px]">
        <Link
          target="_blank"
          href="https://fir-steam-3b8.notion.site/c4d5bd02b6604588b3fb7b6d8832d29b"
          className="h-[15px] text-[10px] leading-[1.5] border-0 border-b border-solid border-[#000]"
        >
          プライバシーポリシー
        </Link>
        <div className="w-[1px] h-5 bg-cetacean-blue" />
        <Link
          target="_blank"
          href="https://fir-steam-3b8.notion.site/578717316bf64c31874f37715e5a2c97"
          className="h-[15px] text-[10px] leading-[1.5] border-0 border-b border-solid border-[#000]"
        >
          利用規約
        </Link>
      </div>
      <div className="font-sans font-bold text-[10px] leading-[1.5] text-center">
        ©︎ 2023 HHLL Inc. &nbsp;ALL Right Reserved.
      </div>
    </div>
  )
}
