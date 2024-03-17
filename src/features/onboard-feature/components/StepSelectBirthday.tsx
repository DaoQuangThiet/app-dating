'use client'

import { Button, HeaderOnboard } from '@/components/ui'
import { actions, useStore } from '@/stores'
import { DatePicker, DatePickerProps, Form, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

// TODO: write storybook
const StepSelectBirthday: React.FC = () => {
  const birthday = useStore().onboard.dateOfBirth()

  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true)
  const [clickedOnce, setClickedOnce] = useState(false)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsDisabledSubmit(false)
      },
      () => {
        setIsDisabledSubmit(true)
      },
    )
  }, [form, values])

  const handleBirthdayChange: DatePickerProps['onChange'] = (
    _date,
    dateString,
  ) => {
    // TODO: use date instead of dateString
    if (typeof dateString === 'string') actions.onboard.dateOfBirth(dateString)
  }

  return (
    <>
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm w-full flex">
        <div className="font-bold px-5 py-4 self-center min-w-[200px] break-words text-sub-1">
          残り6項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 text-xl font-bold text-primary-dark-green">
              生年月日
            </h5>
            <div className="min-h-11 font-normal text-sm">
              本人確認するために正しい生年月日を入力してください。
            </div>
            <div className="flex">
              <Space
                direction="vertical"
                className="min-h-2 w-full relative z-40 flex flex-row"
              >
                <Form form={form} requiredMark={false}>
                  <Form.Item
                    name="date-picker"
                    initialValue={
                      birthday
                        ? dayjs(birthday, 'YYYY/MM/DD')
                        : dayjs('1960/01/12', 'YYYY/MM/DD')
                    }
                    rules={[
                      {
                        validator: (_, value): Promise<void> => {
                          const eighteen = dayjs().subtract(18, 'year')
                          if (!value || value.isAfter(eighteen)) {
                            return Promise.reject(
                              new Error(
                                'ユーザーは18歳以上でなければなりません',
                              ),
                            )
                          } else {
                            return Promise.resolve()
                          }
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      showNow={false}
                      className="min-w-24 h-12 z-0 w-full"
                      format={'YYYY/MM/DD'}
                      onChange={handleBirthdayChange}
                      onClick={() => {
                        setClickedOnce(true)
                        if (!birthday) actions.onboard.dateOfBirth('1960/01/12')
                      }}
                    />
                  </Form.Item>
                </Form>
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 top-[unset] bottom-0 fixed z-50 flex flex-col">
        <div className="self-center max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            className="!h-[45px]"
            type="primary"
            disabled={isDisabledSubmit || !clickedOnce}
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
        .ant-picker {
          background-color: #f6f8fb;
        }
      `}</style>
    </>
  )
}
export default StepSelectBirthday
