'use client'

import { Button } from '@/components/ui'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { Form, Radio, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

export default function StepFive(): JSX.Element {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)

  const onFinish = (): void => useDeactiveStore.set.nextStep()

  useEffect(() => {
    if (!values?.chatFrequency && !values?.chatFrequencyOther) return
    useDeactiveStore.set.chatFrequency(values.chatFrequency)
    useDeactiveStore.set.chatFrequencyOther(values.chatFrequencyOther)
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
        chatFrequency: useDeactiveStore.get.chatFrequency(),
        chatFrequencyOther: useDeactiveStore.get.chatFrequencyOther(),
      }}
    >
      <div className="text-body-m/medium mb-5">話す頻度を教えてください。</div>
      <Form.Item
        name="chatFrequency"
        rules={[
          {
            required: true,
            message: '理由は必須です',
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="毎日">毎日</Radio>
            <Radio value="一週間に一回">一週間に一回</Radio>
            <Radio value="一週間に一回未満・ほとんど話をしない">
              一週間に一回未満・ほとんど話をしない
            </Radio>
            <Radio value="２−３日に一回">２−３日に一回</Radio>
            <Radio value="other">その他（自由記載）</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="chatFrequencyOther"
        className="w-full"
        dependencies={['reason']}
        hidden={form.getFieldValue('chatFrequency') !== 'other'}
        rules={[
          {
            validator(_, value): Promise<void> {
              if (
                form.getFieldValue('chatFrequency') === 'other' &&
                (!value || !value.replace(/\s/g, ''))
              ) {
                return Promise.reject(new Error('話す頻度は必須です'))
              }
              return Promise.resolve()
            },
          },
          {
            max: 1000,
            message: '話す頻度は最大1000文字です',
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
