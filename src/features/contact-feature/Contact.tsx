'use client'

import {
  CreateQuestionBody,
  useCreateQuestionApi,
  useGetProfileApi,
} from '@/api'
import { Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import { useUserStore } from '@/stores/UserStore'
import { App, Card, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'

//TODO: Write storybook
export default function Contact(): JSX.Element {
  const { data } = useGetProfileApi()
  const user = useUserStore((state) => state.user)
  const createQuestionMutation = useCreateQuestionApi()
  const { message } = App.useApp()
  const [form] = Form.useForm()

  const onSubmit = (formData: CreateQuestionBody): void => {
    createQuestionMutation.mutate(formData, {
      onSuccess: () => {
        message.success('送信完了しました。')
        form.setFieldsValue({
          question: '',
        })
      },
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      name: data?.nickname,
      email: user?.email,
    })
  }, [data?.nickname, form, user?.email])

  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <Header title="お問合せ" bordered={false} />
          <div className="flex justify-center">
            <div className="max-w-[480px] w-full">
              <Card bordered={false} className="!bg-[#fcfcfc]">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onSubmit}
                  requiredMark={false}
                >
                  <div className="min-h-11 h-max mb-5 flex">
                    <div className="text-sm font-normal self-center min-h-11 h-max max-w-[40%] w-[40%]">
                      お名前：
                    </div>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: '名前は必須です',
                        },
                        {
                          max: 50,
                          message: '名前は最大50文字です',
                        },
                      ]}
                      className="w-full"
                    >
                      <Input
                        className="h-[48px] font-normal"
                        placeholder="山田 花子"
                        readOnly={!!data}
                      />
                    </Form.Item>
                  </div>
                  <div className="min-h-11 h-max mb-5 flex">
                    <div className="text-sm font-normal self-center min-h-11 h-max max-w-[40%] w-[40%]">
                      メールアドレス:
                    </div>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'メールアドレスは必須です',
                        },
                        {
                          required: true,
                          message: 'メールアドレスは最大50文字です',
                        },
                      ]}
                      className="w-full"
                    >
                      <Input
                        className="h-[48px] font-normal"
                        placeholder="example@example.com"
                        readOnly={!!data}
                      />
                    </Form.Item>
                  </div>
                  <div className="text-sm font-nomal min-h-11 h-max">
                    お問合せの内容:
                  </div>
                  <Form.Item
                    name="question"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '質問は必須です',
                      },
                      {
                        max: 1000,
                        message: '質問は最大1000文字です',
                      },
                    ]}
                    className="w-full"
                  >
                    <TextArea
                      placeholder="ここにお問い合わせの内容を入力してください"
                      autoSize={{ minRows: 4, maxRows: 10 }}
                      className="!border-none !bg-[#f6f8fb]"
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    className="!h-[45px] w-[150px] mt-6"
                    htmlType="submit"
                  >
                    送信
                  </Button>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
