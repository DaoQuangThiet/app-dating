import Modal from '@/components/ui/Modal'
import { Button } from 'antd'
import React from 'react'

type Props = {
  open: boolean
  handleCloseModalDelete: () => void
  templateId: string | undefined
  handleDeleteTemplate: (templateId: string) => void
  templateTitle: string | undefined
}

export default function ModalDeleteTemplateMessage({
  open,
  handleCloseModalDelete,
  handleDeleteTemplate,
  templateId,
  templateTitle,
}: Props): JSX.Element {
  const handleConfirmDelete = (): void => {
    if (templateId) {
      handleDeleteTemplate(templateId)
    }
  }
  return (
    <Modal open={open} width={320} closable={false} footer={null}>
      <div className="text-center text-cetacean-blue text-lg font-bold my-[10px]">
        本当に削除しますか？
      </div>
      <div className="min-h-[45px] text-xs font-bold text-roman-silver text-center">
        {templateTitle}&nbsp;を削除しますか？
        <br />
        削除後の復元は不可能です。
      </div>
      <div className="flex gap-5 items-center justify-center mt-5">
        <Button
          className="!border-none !bg-[#06c755] !text-white !font-semibold !text-[15px] !leading-5 !font-semi-bold !w-[120px] !h-[45px] !rounded-[5px]"
          onClick={handleConfirmDelete}
        >
          削除する
        </Button>
        <Button
          className="!border-[2px] !border-solid !border-[#06c755] !text-[#06c755] !font-semibold !text-[15px] !leading-5 !font-semi-bold !w-[120px] !h-[45px] !rounded-[5px]"
          onClick={handleCloseModalDelete}
        >
          閉じる
        </Button>
      </div>
    </Modal>
  )
}
