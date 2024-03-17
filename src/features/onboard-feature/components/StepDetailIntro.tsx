'use client'

import { useGenerateIntroApi, useOnboardApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions, store, useStore } from '@/stores'
import { Gender } from '@/types/profile'
import { useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// TODO: write storybook
const StepDetailIntro: React.FC = () => {
  const router = useRouter()
  const introduction = useStore().onboard.introduction()
  const queryClient = useQueryClient()
  const [isGenerating, setIsGenerating] = useState(false)

  const { mutate } = useOnboardApi()

  const handleIntroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    actions.onboard.introduction(e.target.value)
  }

  const handleSubmit = (): void => {
    if (store.onboard.gender() === Gender.MALE) {
      const currentState = store.onboard.jsonOnboardRequest()
      mutate(currentState, {
        onSuccess: () => {
          queryClient.invalidateQueries()
          router.push('/on_boarding_completed')
        },
        onError: (error) => {
          console.error('Error during postApi:', error)
        },
      })
    } else {
      actions.onboard.nextStep()
    }
  }
  const { mutateAsync: generateIntro } = useGenerateIntroApi()
  // TODO: move this into seperate function
  const handleGenerateIntroduction = async (): Promise<void> => {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      actions.onboard.introduction('')
      const res = await generateIntro({
        gender: store.onboard.gender(),
        search_target_ids: store.onboard.searchTargetIds(),
        prefecture_id: store.onboard.prefectureId(),
        nickname: store.onboard.nickname(),
        introduction_summary: store.onboard.introductionSummary(),
        character_ids: store.onboard.characterIds(),
      })
      const intro = res?.introduction
      const words = intro.split('')
      let index = 0
      const intervalId = setInterval(() => {
        if (index < words.length) {
          actions.onboard.appendIntroduction(words[index])
          index++
        } else {
          clearInterval(intervalId)
          setIsGenerating(false)
        }
      }, 50)
    } catch (error) {
      message.error('Generate Introduction Fail')
      setIsGenerating(false)
    }
  }
  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り1項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              自己紹介
            </h5>
            <div className="min-h-11 relative z-20 font-normal text-sm">
              AIに下書きを書いてもらいましょう！
              <br />
              右下のボタンで文章を生成させることが何度でもできます。
              <br />
              （※１回目は時間が掛かることがございます。）
            </div>

            {/*section introduction */}
            <div className="w-full min-h-24 relative z-0 flex flex-col">
              <div className="font-bold pb-3 relative z-10 text-sm mt-12">
                自己紹介
              </div>
              <TextArea
                value={introduction}
                className="z-20 overflow-hidden break-words !mt-10"
                placeholder="ここに自己紹介を書きます。"
                maxLength={1000}
                onChange={handleIntroChange}
                autoSize={{ minRows: 3 }}
              />
              <div className="self-end min-h-6 w-60 relative flex flex-row">
                <div
                  className={`w-6 h-6 ml-5 relative flex flex-row cursor-pointer ${
                    isGenerating ? 'opacity-50' : ''
                  }`}
                  onClick={handleGenerateIntroduction}
                >
                  <Image
                    src="/reload.svg"
                    width={24}
                    height={24}
                    alt="Reload"
                  />
                  <div className="text-sm font-normal min-w-40 min-h-6 w-40 ml-4 relative z-0 break-words flex items-center">
                    AIで自己紹介を生成する
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            type="primary"
            disabled={!introduction}
            className="!h-[45px]"
            onClick={handleSubmit}
          >
            登録
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .ant-input {
          resize: none !important;
        }
      `}</style>
    </>
  )
}
export default StepDetailIntro
