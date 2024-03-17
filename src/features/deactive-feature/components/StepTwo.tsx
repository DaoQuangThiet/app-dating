'use client'

import { Button } from '@/components/ui'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { Form, Radio, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

export default function StepTwo(): JSX.Element {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)

  const onFinish = (): void => useDeactiveStore.set.nextStep()

  useEffect(() => {
    if (!values?.reason && !values?.reasonOther) return
    useDeactiveStore.set.reason(values.reason)
    useDeactiveStore.set.reasonOther(values.reasonOther)
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
        reason: useDeactiveStore.get.reason(),
        reasonOther: useDeactiveStore.get.reasonOther(),
      }}
    >
      <div className="text-body-m/medium mb-5">
        ハハロルをご利用いただきましてありがとうございました。退会の理由を一つお聞かせください
      </div>
      <Form.Item
        name="reason"
        rules={[
          {
            required: true,
            message: '理由は必須です',
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="異性のユーザーが少ない">異性のユーザーが少ない</Radio>
            <Radio value="異性のユーザーから返事が来ない">
              異性のユーザーから返事が来ない
            </Radio>
            <Radio value="サービスの使い方が分かりにくい">
              サービスの使い方が分かりにくい
            </Radio>
            <Radio value="料金が高い">料金が高い</Radio>
            <Radio value="他サービスの方が良い">他サービスの方が良い</Radio>
            <Radio value="メールの数が多い">メールの数が多い</Radio>
            <Radio value="other">その他（自由記載）</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="reasonOther"
        className="w-full"
        dependencies={['reason']}
        hidden={form.getFieldValue('reason') !== 'other'}
        rules={[
          {
            validator(_, value): Promise<void> {
              if (
                form.getFieldValue('reason') === 'other' &&
                (!value || !value.replace(/\s/g, ''))
              ) {
                return Promise.reject(new Error('理由は必須です'))
              }
              return Promise.resolve()
            },
          },
          {
            max: 1000,
            message: '理由は最大1000文字です',
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
