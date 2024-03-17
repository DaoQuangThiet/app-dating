'use client'

import { useGetCharactersApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { Select, Space } from 'antd'

// TODO: write storybook
const StepSelectCharacter: React.FC = () => {
  const characterIds = useStore().onboard.characterIds()

  const { data: characterData } = useGetCharactersApi()

  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り3項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              性格タイプ
            </h5>
            <div className="min-h-11 font-normal text-sm">
              あなたの性格にあてはまるものを選択してください
            </div>
            <Space
              direction="vertical"
              className="min-h-11 relative z-40 flex flex-row flex-wrap"
            >
              <Select
                mode="multiple"
                allowClear
                className="min-w-24 z-0 w-full"
                placeholder="未設定"
                onChange={(value) => actions.onboard.characterIds(value)}
                value={characterIds}
                options={characterData?.edges?.map(
                  (items: { id: string; name: string }) => ({
                    value: items.id,
                    label: items.name,
                  }),
                )}
              />
            </Space>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            type="primary"
            disabled={characterIds.length === 0}
            className="!h-[45px]"
            onClick={actions.onboard.nextStep}
          >
            次に進む
          </Button>
        </div>
      </div>

      {/* TODO: do not make change to ant design css */}
      <style jsx global>{`
        .ant-select-selector {
          border: none !important;
          background-color: #f6f8fb !important;
          min-height: 45px;
        }
      `}</style>
    </>
  )
}
export default StepSelectCharacter
