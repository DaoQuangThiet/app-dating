'use client'

import { LoginBody, useLoginApi } from '@/api'
import { QuestionMarkIcon, RightIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { storeAccessTokens, storeRefreshToken } from '@/libs/axios'
import { Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// TODO: write storybook
// TODO: make this in to container
export default function LoginComponent(): JSX.Element {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true)

  const values = Form.useWatch([], form)

  const { mutate: loginUser } = useLoginApi()

  const onSubmit = (data: LoginBody): void => {
    loginUser(data, {
      onSuccess: (res) => {
        storeAccessTokens(res.token)
        storeRefreshToken(res.refresh_token)
        router.push('/mypage_single')
      },
      onError: () => {
        alert(
          'メールアドレスまたはパスワードが一致しません。正確な情報を入力してください。',
        )
      },
    })
  }

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

  return (
    <>
      <Header title="ログイン" bordered={false} backTo="/" />
      <div className="flex justify-center">
        <div className="w-[280px]">
          <div className="text-primary-dark-green text-[20px] font-bold mb-5">
            ログイン
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={<label className="font-bold">メールアドレス</label>}
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
              <Input
                size="large"
                className="h-12"
                placeholder="email"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<label className="font-bold">ログインパスワード</label>}
              rules={[
                {
                  required: true,
                  message: 'パスワードを入力してください。',
                },
              ]}
            >
              <Input.Password
                size="large"
                className="h-12"
                placeholder="password"
              />
            </Form.Item>

            <Form.Item shouldUpdate>
              <Button
                className="!h-[45px]"
                type="primary"
                block
                htmlType="submit"
                disabled={isDisabledSubmit}
              >
                ログイン
              </Button>
            </Form.Item>
          </Form>
          <Link href="/reset_pw_create" className="flex justify-center my-10">
            <div className="flex items-center gap-2">
              <QuestionMarkIcon />
              <div className="text-[12px]">ログインできない場合のお問合せ</div>
              <RightIcon />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
