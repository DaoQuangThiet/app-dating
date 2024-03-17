'use client'

import {
  CreateTemplateBody,
  useCreateTemplateApi,
  useGetTemplateDetailApi,
  useUpdateTemplateApi,
} from '@/api'
import { Button, Form, Input, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface TemplateDetailProps {
  templateId?: string
}
export default function FormTemplateMessage({
  templateId,
}: TemplateDetailProps): JSX.Element {
  const [form] = Form.useForm()
  const router = useRouter()
  const { mutate: updateTemplate } = useUpdateTemplateApi(templateId || '')
  const { data: templateDetail } = useGetTemplateDetailApi(templateId || '')
  const { mutate: createTemplate } = useCreateTemplateApi()

  function redirectToTemplate() {
    router.push('/template_message')
  }

  const onSubmit = (values: CreateTemplateBody): void => {
    if (templateId) {
      updateTemplate(values, {
        onSuccess: redirectToTemplate,
      })
    } else {
      createTemplate(values, {
        onSuccess: redirectToTemplate,
      })
    }
  }

  useEffect(() => {
    if (templateDetail) {
      form.setFieldsValue(templateDetail)
    }
  }, [form, templateDetail])

  return (
    <div className="w-full max-w-[460px]">
      <Form
        form={form}
        requiredMark={false}
        colon={false}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Typography className="mb-5 !text-lg font-bold">
          メッセージテンプレートを作成する
        </Typography>
        <Form.Item
          label="テンプレートタイトルを入力"
          name="title"
          rules={[
            {
              required: true,
              whitespace: true,
              max: 140,
              message: '',
            },
          ]}
          className="!mb-[30px]"
        >
          <Input maxLength={140} className="h-12" placeholder="同じ趣味の人" />
        </Form.Item>
        <Form.Item
          label="メッセージ内容を入力"
          name="content"
          rules={[
            {
              required: true,
              max: 1000,
              message: '',
            },
          ]}
          className="!mb-[30px]"
        >
          <Input.TextArea
            maxLength={1000}
            autoSize={{
              minRows: 13,
              maxRows: 13,
            }}
            placeholder={`こんにちは！プロフィールを拝見しました。\n[共通の趣味や興味]についてお話しできたらと思います。\n最近、[その趣味や興味に関する何か]についてどう思いますか？`}
            className="field-content"
          />
        </Form.Item>

        <div className="mt-[10px] mb-10">
          <Button
            htmlType="submit"
            className="!h-12 !border-[2px] !border-solid !border-[#06c755] !text-[#06c755] !text-[15px] !leading-[1.4] !font-semibold !rounded-[5px]"
            block
          >
            {templateId ? 'テンプレートを更新する' : 'テンプレートを作成する'}
          </Button>
        </div>
      </Form>
      {/*Todo: Tìm giải pháp khác thay vì tuỳ chỉnh trực tiếp css của antd */}
      <style jsx global>{`
        .ant-input-status-error.field-content {
          border-width: 2px !important;
        }
      `}</style>
    </div>
  )
}
