'use client'

import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { Form, Input } from 'antd'

// TODO: write storybook
const StepEnterIntro: React.FC = () => {
  const introductionSummary = useStore().onboard.introductionSummary()
  const [form] = Form.useForm()

  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り4項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              ひとこと
            </h5>
            <div className="font-normal min-h-11 w-full mb-5 text-sm">
              簡単なあいさつや、あなたを表すひとことで、
              <br />
              相手にアピールしましょう。
              <br />
              探すページやあなたのプロフィールで表示されます。
            </div>
            <Form layout="vertical" form={form}>
              <Form.Item
                className="!m-0"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input
                  className="!h-[48px]"
                  placeholder="ひとこと"
                  onChange={(e) =>
                    actions.onboard.introductionSummary(e.target.value)
                  }
                  value={introductionSummary}
                  maxLength={100}
                />
              </Form.Item>
              <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
                <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
                  <Button
                    type="primary"
                    disabled={!introductionSummary}
                    className="!h-[45px]"
                    htmlType="submit"
                    onClick={actions.onboard.nextStep}
                  >
                    次に進む
                  </Button>
                </div>
              </div>
            </Form>
            <div className="bg-[#f4f5be] text-base h-12 font-bold pl-10 w-full mt-10 relative z-20 flex items-center">
              ひとことコメントの例
            </div>
            <div className="text-base font-normal self-center min-h-11 w-full mb-5 relative z-10">
              ・趣味のカラオケが一緒にできると嬉しいです！
              <br />
              ・庭でたくさんの草花を育てています。
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default StepEnterIntro
