'use client'

import {
  GET_TEMPLATES_QUERY_KEY,
  GetTemplatesResponse,
  useDeleteTemplateApi,
  useGetTemplatesApi,
} from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ModalDeleteTemplateMessage from './ModalDeleteTemplateMessage'

export default function TemplateMessage(): JSX.Element {
  const queryClient = useQueryClient()
  const [selectedTemplate, setSelectedTemplate] = useState<string>()
  const { data: templateList } = useGetTemplatesApi()
  const { mutate } = useDeleteTemplateApi()

  const handleOpenModalDelete = (templateId: string): void => {
    setSelectedTemplate(templateId)
  }

  const handleCloseModalDelete = (): void => {
    setSelectedTemplate(undefined)
  }
  const handleDeleteTemplate = (templateId: string): void => {
    mutate(templateId, {
      onSuccess: () => {
        setSelectedTemplate(undefined)
        queryClient.invalidateQueries({ queryKey: GET_TEMPLATES_QUERY_KEY })
      },
    })
  }

  return (
    <>
      <div className="max-w-[420px] w-full min-h-10 flex justify-center bg-white rounded-[10px] shadow-[0_0_16px_4px_#00000005]">
        <div className="w-[150px] border border-solid border-[#dfe3e8] flex">
          <div className="m-auto text-[#252525] text-sm">テンプレート名</div>
        </div>
        <div className="w-[150px] border border-solid border-[#dfe3e8] flex">
          <div className="m-auto text-[#252525] text-sm">編集</div>
        </div>
      </div>

      {templateList?.data.map((template: GetTemplatesResponse) => (
        <div
          className="flex justify-center bg-lotion min-h-[60px]"
          key={template.id}
        >
          <div className="w-[150px] border border-solid border-[#dfe3e8] flex p-[10px] truncate">
            <div className="my-auto text-black-2nd text-sm truncate">
              {template.title}
            </div>
          </div>
          <div className="w-[150px] border border-solid border-[#dfe3e8] flex justify-center items-center gap-[10px]">
            <Link href={`/template_message/${template.id}`}>
              <Button className="!w-[60px] !h-[32px] !rounded-[5px] !border-[2px] !border-solid !border-sub-3 !text-black-2nd !text-sm">
                編集
              </Button>
            </Link>

            <Button
              className="!w-[60px] !h-[32px] !rounded-[5px] !border-[2px] !border-solid !border-sub-3 !text-black-2nd !text-sm"
              onClick={() => handleOpenModalDelete(template.id)}
            >
              削除
            </Button>
          </div>
        </div>
      ))}

      {!templateList?.data.length && (
        <div className="p-8 text-primary-green">
          <div className="flex justify-center p-2">
            <Image
              src="/table_list.png"
              width={52}
              height={52}
              alt="Table list"
            />
          </div>
          テンプレートが見つかりません
        </div>
      )}

      {!(templateList?.data?.length === 3) && (
        <div className="max-w-[420px] w-full p-5">
          <Link href="/template_message/create">
            <div className="py-3 rounded-[5px] hover:bg-[#f0f0f0] border-[2px] border-solid border-primary-green">
              <div className="text-center text-[15px] leading-[21px] font-semibold text-primary-green">
                テンプレートを作成する
              </div>
            </div>
          </Link>
        </div>
      )}

      <ModalDeleteTemplateMessage
        open={Boolean(selectedTemplate)}
        handleCloseModalDelete={handleCloseModalDelete}
        templateId={selectedTemplate}
        handleDeleteTemplate={handleDeleteTemplate}
        templateTitle={
          templateList?.data.find(
            (template) => template.id === selectedTemplate,
          )?.title
        }
      />
    </>
  )
}
