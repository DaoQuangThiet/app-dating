'use client'

import { Button } from '@/components/ui'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { Form, Radio, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

export default function StepFour(): JSX.Element {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)

  const onFinish = (): void => useDeactiveStore.set.nextStep()

  useEffect(() => {
    if (!values?.lifestyle && !values?.lifestyleOther) return
    useDeactiveStore.set.lifestyle(values.lifestyle)
    useDeactiveStore.set.lifestyleOther(values.lifestyleOther)
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
        lifestyle: useDeactiveStore.get.lifestyle(),
        lifestyleOther: useDeactiveStore.get.lifestyleOther(),
      }}
    >
      <div className="text-body-m/medium mb-5">
        現在の生活形態を教えてください。
      </div>
      <Form.Item
        name="lifestyle"
        rules={[
          {
            required: true,
            message: '形態は必須です',
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="夫婦のみ">夫婦のみ</Radio>
            <Radio value="その他">その他</Radio>
            <Radio value="一人暮らし">一人暮らし</Radio>
            <Radio value="other">その他（自由記載）</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="lifestyleOther"
        className="w-full"
        dependencies={['lifestyle']}
        hidden={form.getFieldValue('lifestyle') !== 'other'}
        rules={[
          {
            validator(_, value): Promise<void> {
              if (
                form.getFieldValue('lifestyle') === 'other' &&
                (!value || !value.replace(/\s/g, ''))
              ) {
                return Promise.reject(new Error('形態は必須です'))
              }
              return Promise.resolve()
            },
          },
          {
            max: 1000,
            message: '形態は最大1000文字です',
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
