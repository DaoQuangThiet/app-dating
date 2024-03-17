'use client'

import { useGetPrefectureApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { Select, Space } from 'antd'
import Image from 'next/image'

// TODO: write storybook
const StepSelectCity: React.FC = () => {
  const prefectureId = useStore().onboard.prefectureId()

  // TODO: move to api hook
  const { data: prefecturesData } = useGetPrefectureApi()

  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center order-2 text-sub-1">
          残り7項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex order-3">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              お住まいの地域
            </h5>
            <div className="min-h-11 h-max w-full relative z-20 font-normal text-sm">
              現在お住まいの地域を指定してください
            </div>
            <div className="order-4 flex">
              <Image
                src="/location_on.svg"
                alt="Location"
                width={24}
                height={24}
                className="min-w-6 order-1 w-6 h-6 ml-2 z-50 relative top-3 right-full"
              />
              <Space
                wrap
                defaultValue=""
                className="min-w-full w-full relative z-40"
              >
                <Select
                  placeholder="都道府県"
                  className="min-w-24 h-12 w-full"
                  onChange={(prefectureId: number) => {
                    actions.onboard.prefectureId(prefectureId)
                  }}
                  value={prefectureId}
                  options={prefecturesData?.edges.map(
                    (prefecture: { id: string; name: string }) => ({
                      value: prefecture.id,
                      label: prefecture.name,
                    }),
                  )}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            type="primary"
            className="!h-[45px]"
            disabled={!prefectureId}
            onClick={actions.onboard.nextStep}
          >
            次に進む
          </Button>
        </div>
      </div>

      {/* TODO: do not make change to ant design css */}
      <style jsx global>{`
        .ant-space-item {
          width: 100%;
        }
        .ant-select-single {
          height: 50px !important;
        }
        .ant-select-selector {
          border-color: #909090 !important;
        }
        .ant-select-selection-placeholder {
          margin-left: 30px;
        }
        .ant-select-selection-item {
          margin-left: 30px;
        }
      `}</style>
    </>
  )
}
export default StepSelectCity
