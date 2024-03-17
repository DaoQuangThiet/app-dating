'use client'

import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { actions, useStore } from '@/stores'
import { Radio } from 'antd'

// TODO: write storybook
const StepSelectGender: React.FC = () => {
  const gender = useStore().onboard.gender()

  return (
    <>
      <Header title="情報登録" backIcon={false} bordered={false} />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り9項目
        </div>
      </div>
      {/*Form select gender */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              性別
            </h5>
            <Radio.Group
              value={gender}
              onChange={(e) => actions.onboard.gender(e.target.value)}
            >
              <Radio.Button
                value="MALE"
                className="!flex !p-0 min-h-[50px] !my-4 justify-center !border-2 !border-philippine-gray rounded flex-col"
              >
                <div className="text-sm font-bold text-philippine-gray p-4">
                  男性
                </div>
              </Radio.Button>
              <Radio.Button
                value="FEMALE"
                className="!flex !p-0 min-h-[50px] !my-4 justify-center !border-2 !border-philippine-gray rounded flex-col"
              >
                <div className="text-sm font-bold text-philippine-gray p-4">
                  女性
                </div>
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>

      {/*Button continue */}
      <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            className="!h-[45px]"
            type="primary"
            disabled={!gender}
            onClick={actions.onboard.nextStep}
          >
            次に進む
          </Button>
        </div>
      </div>

      {/* TODO: do not make change to ant design css */}
      <style jsx global>{`
        .ant-radio-button-wrapper-checked {
          border-color: #06c755 !important;
        }
        .ant-radio-button-wrapper:not(:first-child)::before {
          width: 0 !important;
        }
      `}</style>
    </>
  )
}
export default StepSelectGender
