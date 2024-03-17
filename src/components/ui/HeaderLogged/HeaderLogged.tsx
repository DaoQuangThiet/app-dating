import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  title?: string
  settingIcon?: boolean
}

//TODO: Create Header storybook
export default function HeaderLogged({
  title = '',
  settingIcon = true,
}: Props): JSX.Element {
  const router = useRouter()

  return (
    <div className="absolute top-0 h-16 w-full bg-white">
      <div className="flex h-full items-center justify-end">
        <div className="font-bold text-sm flex justify-center w-full absolute z-10">
          {title}
        </div>
        {settingIcon && (
          <div
            className="cursor-pointer self-start mt-1 flex flex-col items-center pr-5 pt-1 z-20"
            onClick={() => router.push('/setting')}
          >
            <div>
              <Image
                src="/settings.svg"
                alt="setting icon"
                width={26}
                height={26}
              />
            </div>
            <div className="text-xs font-normal w-full my-1">設定</div>
          </div>
        )}
      </div>
    </div>
  )
}
