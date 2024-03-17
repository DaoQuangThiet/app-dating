'use client'

import { useCreateUploadUrlApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions } from '@/stores'
import { Upload, UploadProps } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

type SubmidIdentityVerificationProps = {
  handleClickBack: () => void
  handleSubmitVerify: () => void
}

const StepSubmitIdentityVerification: React.FC<
  SubmidIdentityVerificationProps
> = ({ handleSubmitVerify, handleClickBack }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // TODO: move to api hook
  const { mutateAsync } = useCreateUploadUrlApi()

  const props: UploadProps = {
    maxCount: 1,
    accept: 'image/png, image/jpeg',
    beforeUpload: async (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        alert('JPG/PNGファイルのみアップロード可能です。')
        return false
      }
      const fileName = file.name
      const filePath = fileName.split('.').slice(0, -1).join('.')
      const addFilePath = 'verification/' + filePath
      const fileExtension = fileName.split('.').pop()

      const dataBody = {
        file_path: addFilePath,
        file_extension: fileExtension,
      }

      const uploadImage = await mutateAsync(dataBody)
      actions.onboard.verificationPhoto(uploadImage.file_name)
      setImageUrl(URL.createObjectURL(file))
      const urlS3 = uploadImage.upload_url
      await axios.put(urlS3, file)

      return false
    },
  }

  return (
    <>
      <HeaderOnboard
        title="本人確認"
        showIcon={true}
        clickBack={handleClickBack}
      />
      <div className="justify-center flex">
        <div className="justify-center p-3 pb-16 self-center w-full">
          <div className="max-w-[480px] mx-auto">
            <h5 className="text-[20px] font-bold mb-3 text-primary-dark-green">
              本人確認書類を提出してください
            </h5>
            <p className="text-[#091747] min-h-[45px]">
              公的証明書の提出をお願いします。
            </p>
          </div>

          <div className="max-w-[480px] mx-auto text-center rounded-md p-3 w-full bg-sub-3 cursor-pointer relative">
            <Upload
              className="h-[200px] justify-center flex items-center w-full"
              {...props}
            >
              {imageUrl ? (
                <Image
                  width={120}
                  height={120}
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="h-[120px] object-contain w-full rounded-md"
                />
              ) : (
                <div className="max-w-[480px] w-[480px] h-56 p-24">
                  写真をアップロード
                </div>
              )}
            </Upload>
            {imageUrl && (
              <div
                className="text-sm font-normal absolute bottom-8 left-0 right-0 text-center"
                onClick={() => setImageUrl(null)}
              >
                ファイルを削除
              </div>
            )}
          </div>

          <div className="max-w-[480px] mx-auto mt-6 text-center">
            <Button
              className="!h-[45px] w-[290px]"
              type="primary"
              disabled={!imageUrl}
              onClick={handleSubmitVerify}
            >
              送信
            </Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .ant-upload .ant-upload-select {
          width: 100% !important;
          height: 100% !important;
        }
        .ant-upload-wrapper .ant-upload-list {
          display: none;
        }
      `}</style>
    </>
  )
}

export default StepSubmitIdentityVerification
