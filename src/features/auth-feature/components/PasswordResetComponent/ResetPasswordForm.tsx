'use client'

import { useForgotPasswordApi } from '@/api'
import { Button } from '@/components/ui'
import { useResetPasswordStore } from '@/stores/ResetPasswordStore'
import { Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// TODO: write storybook
export default function ResetPasswordForm(): JSX.Element {
  const [form] = Form.useForm()
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)
  const router = useRouter()
  const setEmail = useResetPasswordStore((state) => state.setEmail)

  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsDisbledSubmit(false)
      },
      () => {
        setIsDisbledSubmit(true)
      },
    )
  }, [form, values])

  // TODO: seperate logic into other component
  const resetPasswordApi = useForgotPasswordApi()

  const onFinish = (values: { email: string }): void => {
    resetPasswordApi.mutate(
      { email: values.email },
      {
        onSuccess: () => {
          router.push('/reset_pw_create_success')
        },
        onError: () => {
          alert('電子メールが存在しません')
        },
      },
    )
    setEmail(values.email)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
      className="order-3"
    >
      <Form.Item
        name="email"
        label="メールアドレス"
        className="!pt-4 px-0 !pb-[2px] opacity-100 min-w-full max-w-full min-h-0 h-max w-full mx-0 mb-3 break-words"
        rules={[
          {
            type: 'email',
            message: 'メールアドレスを正しく入力してください。',
          },
          {
            required: true,
            message: 'メールアドレスを入力してください。',
          },
        ]}
      >
        <Input placeholder="email" className="h-[48px] font-normal" autoFocus />
      </Form.Item>

      <div className="text-[14px] font-normal leading-snug self-start min-w-full max-w-full min-h-11 h-max w-full mx-0 mt-6 break-words">
        ※登録したメールアドレスをお忘れの場合、
        <Link href="/contact" target="_blank">
          こちら
        </Link>
        よりお問い合わせをお願いいたします。
      </div>
      <Form.Item>
        <Button
          className="!h-[45px] mx-0 mt-[30px] px-3 py-6 w-full"
          type="primary"
          htmlType="submit"
          disabled={isDisabledSubmit}
        >
          リセットメールを送信
        </Button>
      </Form.Item>
    </Form>
  )
}
