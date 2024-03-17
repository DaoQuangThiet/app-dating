'use client'

import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { Form, Input } from 'antd'

// TODO: write storybook
const StepEnterName: React.FC = () => {
  const nickname = useStore().onboard.nickname()
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
          残り5項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              ニックネーム
            </h5>
            <div className="min-h-11 font-normal text-sm">
              8文字以内で入力してください。
            </div>
            <Form layout="vertical" form={form} className="">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input
                  className="!h-[48px]"
                  placeholder="ニックネーム"
                  onChange={(e) => {
                    actions.onboard.nickname(e.target.value)
                  }}
                  value={nickname}
                  maxLength={8}
                />
              </Form.Item>
              <Form.Item>
                <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
                  <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
                    <Button
                      type="primary"
                      className="!h-[45px]"
                      disabled={!nickname}
                      htmlType="submit"
                      onClick={actions.onboard.nextStep}
                    >
                      次に進む
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
export default StepEnterName
