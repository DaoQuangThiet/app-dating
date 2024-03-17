import Image from 'next/image'
import Link from 'next/link'

export default function NotFound(): JSX.Element {
  return (
    <>
      <div className="h-14 bg-white border-b border-b-sub-3" />
      <div className="flex justify-center mt-32">
        <div className="p-4 max-w-base w-full">
          <div className="flex justify-center">
            <Image
              src="/Logo_vertical.svg"
              alt="Logo"
              priority
              width={158}
              height={100}
            />
          </div>
          <div className="text-primary-dark-green text-center font-bold text-base my-6">
            <div>404 Error</div>
            <div>お探しのページは見つけませんでした。</div>
          </div>
          <Link href="/" className="flex justify-center">
            <div className="flex items-center gap-1">
              <div className="text-xs font-medium text-black-2nd">トップページに戻る</div>
              <Image
                src="/svg/next_icon.svg"
                width={12}
                height={12}
                alt="Next Icon"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
