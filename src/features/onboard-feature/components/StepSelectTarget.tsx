'use client'

import { useGetSearchTargetApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { Checkbox } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

// TODO: write storybook
const StepSelectObject: React.FC = () => {
  const searchTargetIds = useStore().onboard.searchTargetIds()

  // TODO: move to api hook
  const { data: targetData } = useGetSearchTargetApi()

  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り8項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              探したい人は誰ですか
            </h5>
            <div className="min-h-11 font-normal text-sm">
              複数選択できます。
            </div>
            {targetData && (
              <Checkbox.Group
                value={searchTargetIds}
                onChange={(checkedValues: CheckboxValueType[]): void => {
                  actions.onboard.searchTargetIds(checkedValues)
                }}
              >
                {targetData?.edges.map(
                  (object: { id: string; name: string }, index: number) => (
                    <Checkbox
                      key={index}
                      value={object.id}
                      className="!flex !p-0 min-h-[50px] w-full !my-2 justify-center !border-2 !border-philippine-gray rounded flex-col !border-l-2 text-sm font-bold !text-philippine-gray !leading-[0] break-words"
                    >
                      <span className="ml-2">{object.name}</span>
                    </Checkbox>
                  ),
                )}
              </Checkbox.Group>
            )}
            <div className="mt-4 relative z-30 text-sm font-normal">
              複数選択できます。
              <br />
              あとで変更ができます。
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 top-[unset] bottom-0 mr-auto fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            type="primary"
            onClick={actions.onboard.nextStep}
            className="!h-[45px]"
          >
            次に進む
          </Button>
        </div>
      </div>

      {/* TODO: do not make change to ant design css */}
      <style jsx global>{`
        .ant-checkbox {
          display: none !important;
        }
        .ant-checkbox-wrapper-checked {
          border-color: #06c755 !important;
          color: #091747 !important;
        }
        .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #06c755 !important;
          border-color: #06c755 !important;
          color: #091747 !important;
        }
      `}</style>
    </>
  )
}
export default StepSelectObject
