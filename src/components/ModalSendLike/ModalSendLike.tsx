'use client'

import useSendLike from '@/hooks/useSendLike'
import { Detail, Profile } from '@/types/profile'
import { Button, Input } from 'antd'
import Image from 'next/image'
import { Modal } from '../ui'
import ProfileConfirm from './ProfileConfirm'

type Props = {
  targetProfile: Profile | null
  getProfileFields: (attributeList: Detail[]) => Detail[]
  handleSkip?: () => void
  refetch?: () => void
}

// TODO: write storybook
export default function ModalSendLike({
  targetProfile,
  getProfileFields,
  handleSkip = undefined,
  refetch = undefined,
}: Props): JSX.Element {
  const {
    sendLikeStep,
    closeModalSendLike,
    switchToCompleteStep,
    selectedTab,
    setSelectedTab,
    message,
    setMessage,
    handleSaveTemplate,
    handleSendLike,
    saveMessageTemplateStatus,
    sendLikeStatus,
    handleGetMessageTemplate,
    isNoTemplate,
    handleSendLikeWithoutMessage,
    isHaveMessage,
  } = useSendLike(targetProfile?.user_id || '', handleSkip, refetch)

  const handleFinishSendLike = (): void => {
    handleSkip && handleSkip()
    closeModalSendLike()
  }

  return (
    <Modal
      open
      footer={null}
      closable={false}
      maskClosable={false}
      width={312}
      className="send-like-custom-modal"
    >
      {sendLikeStep === 'like' ? (
        <>
          {isHaveMessage ? (
            <div className="border-[2px] border-solid border-[#06c755] bg-[#d9f4de] font-medium text-[#06c755] text-center py-2 px-5 rounded-md">
              テンプレを使用するにはメッセージ内の文章を空欄にしてください。
            </div>
          ) : null}
          {isNoTemplate ? (
            <div className="border-[2px] border-solid border-[#06c755] bg-[#d9f4de] font-medium text-[#06c755] text-center py-2 px-5 rounded-md">
              まだテンプレ文章を保存しておりません。
            </div>
          ) : null}
          <div className="text-[17px] leading-[1.4] font-bold text-center whitespace-pre-wrap text-[#091747] break-words mt-2 mx-[10px] mb-5">
            {targetProfile?.nickname}さんに
            <br />
            いいね！を送りました
          </div>
          <div className="flex flex-col items-center bg-[#d9f4de] rounded-[5px] pt-[10px] pb-5">
            <Image
              src="/waving_hand_green.svg"
              alt="waving_hand"
              width={36}
              height={36}
            />
            <div className="text-[#091747] text-[13px] leading-[1.5] mt-[10px]">
              メッセージがあるとマッチ率が高くなります
            </div>
            <div className="text-[#091747] text-[12px] leading-[1.4] mt-[5px]">
              メッセージは残り7回、いいねと共に送信できます。
            </div>
          </div>

          <div className="w-full grid grid-cols-2 h-[60px]">
            <div
              className={`flex h-[45px] cursor-pointer border-0 border-b border-solid ${
                selectedTab === 'message'
                  ? 'text-[#06c755] border-[#06c755]'
                  : 'text-[#091747] border-[#eaeaea]'
              }`}
              onClick={() => setSelectedTab('message')}
            >
              <div className="m-auto">メッセージを送る</div>
            </div>
            <div
              className={`flex h-[45px] cursor-pointer border-0 border-b border-solid ${
                selectedTab === 'information'
                  ? 'text-[#06c755] border-[#06c755]'
                  : 'text-[#091747] border-[#eaeaea]'
              }`}
              onClick={() => setSelectedTab('information')}
            >
              <div className="m-auto">プロフィール確認</div>
            </div>
          </div>

          {selectedTab === 'message' ? (
            <div className="h-[300px]">
              <div className="bg-[#f6f8fb] h-40">
                <Input.TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  bordered={false}
                  maxLength={500}
                  autoSize={{
                    maxRows: 5,
                    minRows: 5,
                  }}
                  placeholder="ここにメッセージを書きます。"
                  className="text-[14px] leading-[1.5] font-bold"
                />
              </div>

              <div
                className="text-[#06c755] text-[15px] leading-[1.4] py-[10px] text-center cursor-pointer"
                onClick={() => handleGetMessageTemplate()}
              >
                メッセージテンプレを使用する
              </div>

              <div className="flex justify-around py-[10px]">
                <Button
                  className="!bg-[#f6f8fb] !border-none !text-[#222222] !text-[14px] !leading-[14px] !font-semibold !w-[130px] !h-[52px] !whitespace-pre-wrap !py-3 !px-6"
                  onClick={handleSendLikeWithoutMessage}
                >
                  メッセージは送らない
                </Button>
                <Button
                  disabled={!message}
                  className={`!border-none !text-white !text-[14px] !leading-[14px] !font-semibold !w-[130px] !h-[52px] !whitespace-pre-wrap !py-3 !px-6 ${
                    message
                      ? '!bg-[#06c755]'
                      : '!bg-[#06c7551a] !cursor-default'
                  }`}
                  onClick={() => {
                    sendLikeStatus !== 'pending' && handleSendLike()
                  }}
                >
                  メッセージも送る
                </Button>
              </div>
            </div>
          ) : (
            <ProfileConfirm
              targetProfile={targetProfile}
              getProfileFields={getProfileFields}
            />
          )}
        </>
      ) : null}
      {sendLikeStep === 'sended' ? (
        <>
          <div className="text-[17px] font-bold text-[#091747] leading-[1.4] pt-2 pb-[10px] text-center min-h-[31px]">
            送ったメッセージを
            <br />
            テンプレとして保存しますか？
          </div>
          <div className="border-0 border-t border-solid border-[#f6f8fb]">
            <div className="m-[10px] p-[10px] bg-[#f4f4f4] min-h-10 max-h-[240px] rounded-[5px] overflow-auto">
              {message}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5 mb-[10px] mx-[10px]">
            <Button
              className="!text-[#06c755] !border-[2px] !border-solid !border-[#06c755] !px-4 !py-3 !text-[15px] !font-semibold !leading-[21px] !h-[50px]"
              onClick={switchToCompleteStep}
            >
              保存しない
            </Button>
            <Button
              className="!text-white !bg-[#06c755] !border-none !px-4 !py-3 !text-[15px] !font-semibold !leading-[21px] !h-[50px]"
              onClick={() => {
                saveMessageTemplateStatus !== 'pending' && handleSaveTemplate()
              }}
            >
              保存する
            </Button>
          </div>
        </>
      ) : null}
      {sendLikeStep === 'complete' ? (
        <>
          <div className="text-[17px] font-bold text-[#091747] leading-[1.4] pt-2 pb-[10px] text-center min-h-[31px]">
            {targetProfile?.nickname}さんに
            <br />
            メッセージを送りました
          </div>
          <div className="mt-5 mb-[10px]">
            <Button
              block
              className="!text-white !bg-[#06c755] !border-none !px-4 !py-3 !text-[15px] !font-semibold !leading-[21px] !h-[50px]"
              onClick={handleFinishSendLike}
            >
              OK
            </Button>
          </div>
        </>
      ) : null}
    </Modal>
  )
}
