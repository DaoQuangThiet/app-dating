'use client'

import { Button, HeaderOnboard } from '@/components/ui'
import { actions } from '@/stores'
import Image from 'next/image'

type IdentityVerificationProps = {
  handleClickNextStep: () => void
}

// TODO: write storybook
const StepIdentityVerification: React.FC<IdentityVerificationProps> = ({
  handleClickNextStep,
}) => {
  return (
    <>
      <HeaderOnboard
        title="本人確認"
        showIcon={false}
        clickBack={actions.onboard.backStep}
      />
      <div className="justify-center flex">
        <div className="justify-center pb-16 self-center w-full p-3">
          <div className="max-w-[480px] mx-auto">
            <h5 className="text-2xl font-bold mb-3 text-[#091747]">
              本人確認が必要です
            </h5>
            <p className="text-[#091747] min-h-[45px]">
              公的証明書の提出をお願いします。
            </p>
          </div>

          <div className="bg-[#bac6d3] max-w-[480px] mx-auto justify-start rounded-xl p-3 w-full mb-3 relative z-20 flex flex-col">
            <div className="py-3 w-full relative text-[#091747]">
              <h5 className="text-xl font-bold text-center mb-3">
                公的証明書を使って
                <br />
                氏名・住所・生年月日などを確認します
              </h5>

              <div className="flex justify-center">
                <Image
                  src="/identity_verification_1.png"
                  alt="Identity Verification Image"
                  width={436}
                  height={124}
                />
              </div>
              <div className="text-[15px] self-center relative">
                マイナンバー通知カードや年金手帳、障害者手帳、学生証は証明書としてご利用頂けません。
                <br />
                上記に当てはまらない証明書をお持ちのお客様はヘルプページを参照し、ハハロルカスタマーサポートまでお問合せください。
              </div>
            </div>
          </div>

          <div className="bg-[#32b156] min-h-14 text-sm h-max w-full flex">
            <div className="max-w-[480px] mx-auto text-sub-1 w-full p-[10px]">
              <h5 className="text-2xl font-bold mb-3">
                証明書を撮影してください
              </h5>
              <div className="text-[15px] self-center relative">
                他人の証明書を使用するなりすましを防ぐため
                <br />
                次の画面で証明書全体が写るように撮影してください。
              </div>
              <div className="mx-auto w-fit mt-6 -mb-20">
                <Image
                  src="/identity_verification_2.png"
                  alt="Identity Verification Image"
                  width={280}
                  height={160}
                />
              </div>
            </div>
          </div>

          <div className="max-w-[480px] mx-auto mt-24 text-center">
            <div>以下のような画像は承認されません</div>
            <div className="mx-auto w-fit my-6">
              <Image
                src="/identity_verification_3.png"
                alt="Identity Verification Image"
                width={380}
                height={155}
              />
            </div>
          </div>

          <div className="max-w-[480px] mx-auto mt-12 text-[#091747] rounded-xl border-2 border-green-500 p-3">
            <h5 className="text-xl font-bold text-center mb-3 mt-3">
              お客様情報は厳重に管理しています
            </h5>
            <div className="text-[15px] self-center relative mb-3">
              提出いただいた証明書の画像は本人確認のみに使用し、それ以外の目的で使用しません。また、証明書を含むお客様からお預かりした個人情報は退会後、一定期間保管させていただいたのちに削除しています。
            </div>
          </div>

          <div className="max-w-[480px] mx-auto mt-4 text-center">
            <Button
              className="!h-[45px] w-72"
              type="primary"
              onClick={handleClickNextStep}
            >
              証明書を撮影する
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default StepIdentityVerification
