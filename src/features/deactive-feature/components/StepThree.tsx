'use client'

import { Button } from '@/components/ui'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

export default function StepThree(): JSX.Element {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)
  const onFinish = (): void => useDeactiveStore.set.nextStep()

  useEffect(() => {
    useDeactiveStore.set.message(values?.message)
    form
      .validateFields()
      .then(() => {
        setIsDisbledSubmit(false)
      })
      .catch(() => {
        setIsDisbledSubmit(true)
      })
  }, [form, values])

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        message: useDeactiveStore.get.message(),
      }}
    >
      <div className="mb-5">
        サービスの充実のためアドバイスいただけますと幸いです
      </div>

      <Form.Item
        name="message"
        className="w-full"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'アドバイスは必須です',
          },
          {
            max: 1000,
            message: 'アドバイスは最大1000文字です',
          },
        ]}
      >
        <TextArea autoSize={{ minRows: 4, maxRows: 10 }} className="w-full" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full !h-[50px]"
        disabled={isDisabledSubmit}
      >
        アンケートに回答する
      </Button>
    </Form>
  )
}
