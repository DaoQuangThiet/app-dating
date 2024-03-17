import { CloseTip } from '@/components/icons'
import Image from 'next/image'

type TipUploadProps = {
  onClick: () => void
}

export default function TipsUploadImage({
  onClick,
}: TipUploadProps): JSX.Element {
  return (
    <>
      <div className="fixed top-0 w-full bg-white">
        <div className="flex h-full items-center">
          <div className="w-6 h-6 m-4">
            <div className="cursor-pointer relative z-50" onClick={onClick}>
              <CloseTip />
            </div>
          </div>
          <div className="font-bold text-sm flex justify-center w-full absolute z-10">
            マッチしやすい写真のコツ
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-base p-3 self-center overflow-hidden w-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-primary-dark-green min-h-9 mt-6">
              ポイント①
            </h3>
            <h5 className="text-2xl font-bold min-h-9 mb-6 text-cetacean-blue">
              1枚目について
            </h5>
            <div className="whitespace-pre-wrap text-base text-roman-silver">
              １枚目の写真を大切に(変更は簡単にできます)
              <br />
              表札代わりのようなものです。ひとりで写っている明るくて鮮
              <br />
              明な写真を使ってください。笑顔だともっといいですね。後
              <br />
              で簡単に変更できるので気軽な気持ちで１枚を。
            </div>
            <div className="mt-6 w-full">
              <Image
                src="/tip_one.jpg"
                width={445}
                height={241}
                alt="Tip one"
                quality={100}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-primary-dark-green min-h-9 mt-6">
              ポイント②
            </h3>
            <h5 className="text-2xl font-bold min-h-9 mb-6 text-cetacean-blue">
              2枚目以降について
            </h5>
            <div className="whitespace-pre-wrap text-base text-roman-silver">
              ２枚目以降は興味を惹きつけるような写真を(変更は簡単にできます)
              <br />
              あなたに話しかけるきっかけになります。今までの想い出や趣味や、例えば３０年前のご自身の写真なども素敵ですね。
            </div>
            <div className="mt-6 w-full">
              <Image
                src="/tip_two.jpg"
                width={445}
                height={241}
                alt="Tip one"
                quality={100}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-primary-dark-green min-h-9 mt-6">
              ポイント③
            </h3>
            <h5 className="text-2xl font-bold min-h-9 mb-6 text-cetacean-blue">
              お互いに気持ちよく
            </h5>
            <div className="whitespace-pre-wrap text-base text-roman-silver">
              相手を不快にさせるような写真や、どちら様かわからないような写真では、本当の自分が伝わりません。
              <br />
              個人を特定するものも、写真に写さないでください。（電話番号やLINEは、知り合ってから交換すべきです。）
            </div>
            <div className="mt-6 w-full">
              <Image
                src="/tip_three.jpg"
                width={445}
                height={241}
                alt="Tip one"
                quality={100}
              />
            </div>
          </div>
          <div className="flex flex-col mb-32">
            <h3 className="text-lg font-bold text-primary-dark-green min-h-9 mt-6">
              ポイント④
            </h3>
            <h5 className="text-2xl font-bold min-h-9 mb-6 text-cetacean-blue">
              プロフィールについて
            </h5>
            <div className="whitespace-pre-wrap text-base text-roman-silver">
              最後にプロフィールについてですが、あなたの今までの経験や、これからの展望を文字で表現してみましょう。自分ですべて考える必要はありません。自動生成と選択肢がサポートします。
            </div>
            <div className="mt-6 w-full">
              <Image
                src="/tip_four.jpg"
                width={445}
                height={241}
                alt="Tip one"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
