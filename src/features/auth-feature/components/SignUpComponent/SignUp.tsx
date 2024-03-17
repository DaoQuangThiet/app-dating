'use client'

import { useRegisterApi } from '@/api'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { storeAccessTokens } from '@/libs/axios'
import { useRegisteredEmailStore } from '@/stores/RegisteredEmailStore'
import { Form, Input, Modal } from 'antd'
import { RuleObject } from 'antd/es/form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// TODO: write storybook
// TODO: make this in to container
export default function SignUpComponent(): JSX.Element {
  const [form] = Form.useForm()
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)

  const router = useRouter()
  const setEmail = useRegisteredEmailStore((state) => state.setEmail)
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

  const { mutate, isPending, isError, reset } = useRegisterApi()

  const onFinish = (values: { email: string; password: string }): void => {
    setEmail(values.email)
    mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: (data) => {
          router.push('/wait_for_confirmation')
          storeAccessTokens(data.token)
        },
      },
    )
  }

  return (
    <>
      <Header title="新規登録" />
      <div className="flex justify-center">
        <div className="w-[320px] py-10">
          <div className="flex flex-col">
            <div className="text-primary-dark-green text-xl font-bold h-11 mb-4">
              新規登録
            </div>
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label={
                  <label className="text-[14px] font-bold">
                    メールアドレス
                  </label>
                }
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
                className="!mb-4"
              >
                <Input
                  size="large"
                  placeholder="email"
                  className="h-[48px]"
                  autoFocus
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <label className="text-[14px] font-bold">
                    ログインパスワード
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: 'パスワードを入力してください。',
                  },
                ]}
                className="!mb-4"
              >
                <Input.Password
                  size="large"
                  placeholder="password"
                  className="h-[48px]"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                label={
                  <label className="text-[14px] font-bold">
                    ログインパスワードを再入力
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: '(再確認）パスワードを入力してください。',
                  },
                  ({ getFieldValue }): RuleObject => ({
                    validator(_, value): Promise<void> {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('(再確認）パスワードが一致しません。'),
                      )
                    },
                  }),
                ]}
                className="!mb-4"
              >
                <Input.Password
                  size="large"
                  placeholder="passwordを再入力"
                  className="h-[48px]"
                />
              </Form.Item>

              <div className="flex justify-center">
                <Button
                  className="!w-[288px] !h-[57px] mt-[14px]"
                  type="primary"
                  block
                  htmlType="submit"
                  disabled={isDisabledSubmit}
                >
                  新規登録
                </Button>
              </div>
            </Form>
          </div>

          <div className="bg-[#f6f8fb] py-4 px-3 mt-4">
            <div className="text-primary-dark-green text-[18px] font-bold mb-5">
              このあとの流れ
            </div>
            <div className="text-[12px] font-bold">
              登録を完了するためのメールが以下のメールアドレスから届きます。
            </div>
            <div className="flex justify-center pt-[10px]">
              <Image
                src="/signup_email_sample.png"
                alt="Landscape picture"
                width={200}
                height={266}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <Modal closeIcon={null} footer={null} open={isPending} width={320}>
        <Image
          src="/mail_sended.jpeg"
          alt="Landscape picture"
          width={309}
          height={160}
          priority
        />
        <div className="text-center text-lg font-bold mt-3">
          メールアドレスを確認中
        </div>
        <div className="mt-3 mb-2">
          ただいま、ご入力いただいたメールアドレスにメールが正しく到着するか、確認をしております。
          このまま少々お待ちください。
        </div>
      </Modal>

      <Modal closeIcon={null} footer={null} open={isError} width={320}>
        <div className="flex flex-col py-4">
          <div className="text-center">メールの送信に失敗しました。</div>
          <div className="text-center">
            メールアドレスをご確認の上、再度入力してください。
          </div>
          <Button
            className="self-center !w-[150px] !h-[45px] mt-5 text-center"
            type="primary"
            block
            onClick={() => reset()}
          >
            OK
          </Button>
        </div>
      </Modal>
    </>
  )
}
