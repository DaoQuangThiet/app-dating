import { useResetPasswordApi } from '@/api'
import { Button } from '@/components/ui'
import { Form, Input } from 'antd'
import { RuleObject } from 'antd/es/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// TODO: write storybook
// TODO: make this in to container
export default function NewPasswordForm(): JSX.Element {
  const [form] = Form.useForm()
  const [isDisabledSubmit, setIsDisbledSubmit] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const getReset = searchParams.get('reset')
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

  const typePasswordApi = useResetPasswordApi()

  const onFinish = async (data: {
    password: string
    token: string
  }): Promise<void> => {
    const postData = { password: data.password, token: `${getReset}` }
    typePasswordApi.mutate(postData, {
      onSuccess: () => {
        router.push('/mypage_single')
      },
      onError: () => {
        alert(
          'このパスワードリセットは無効です。再度パスワードリセットメールの送信を受けてください。',
        )
      },
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className="order-2 !mt-3"
      onFinish={onFinish}
    >
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
          type="password"
          placeholder="password"
          autoFocus
        />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label={<label className="font-bold">ログインパスワードを再入力</label>}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '(再確認) パスワードを入力してください。',
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
      >
        <Input.Password
          size="large"
          type="password"
          className="h-12"
          placeholder="password を再入力"
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={isDisabledSubmit}
          className="!h-[45px]"
          type="primary"
          block
          htmlType="submit"
        >
          パスワードリセット
        </Button>
      </Form.Item>
    </Form>
  )
}
