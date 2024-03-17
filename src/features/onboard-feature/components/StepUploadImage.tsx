'use client'

import { useCreateUploadUrlApi, useFilterAvatarApi } from '@/api'
import { Button, HeaderOnboard } from '@/components/ui'
import { actions, store, useStore } from '@/stores'
import { Modal, Spin, Upload, UploadProps } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import AvatarFilter from './AvatarFilter'

// TODO: write storybook
const StepUploadImage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [brightness, setBrightness] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fileImage = useStore().avatarUpload.fileImage()
  const preview = useStore().avatarUpload.preview()
  const selectImage = useStore().avatarUpload.selectImage()
  const imageGray = useStore().avatarUpload.imageGray()
  const imageSepia = useStore().avatarUpload.imageSepia()
  const imageBeauty = useStore().avatarUpload.imageBeauty()

  const handleSelectImage = (
    typeImage: 'normal' | 'gray' | 'sepia' | 'beauty',
  ): void => {
    actions.avatarUpload.selectImage(typeImage)

    if (typeImage === 'gray') {
      actions.onboard.mainPhoto(store.avatarUpload.dataGray())
    }
    if (typeImage === 'sepia') {
      actions.onboard.mainPhoto(store.avatarUpload.dataSepia())
    }
    if (typeImage === 'beauty') {
      actions.onboard.mainPhoto(store.avatarUpload.dataBeauty())
    }
  }

  const handleAddBrightness = (): void => {
    setBrightness(!brightness)
  }

  const { mutateAsync } = useFilterAvatarApi()
  const { mutateAsync: createUploadUrl } = useCreateUploadUrlApi()

  const runFileUploadFlow = useCallback(
    async ({ option = '' }: { option: string }): Promise<void> => {
      setIsLoading(true)
      try {
        if (!fileImage) return

        const fileName = fileImage.name
        const fileExtension = fileName.split('.').pop()
        const filePath = fileName.split('.').slice(0, -1).join('.')
        const pathfile = 'avatar/' + filePath
        const dataBody = {
          file_path: pathfile,
          file_extension: fileExtension,
        }

        const dataUpload = await createUploadUrl(dataBody)
        actions.onboard.mainPhoto(dataUpload.file_name)

        const urlS3 = dataUpload.upload_url
        await axios.put(urlS3, store.avatarUpload.fileImage())

        const dataFileName = dataUpload.file_name

        const filterGray = {
          key: dataFileName,
          type: 'gray',
          option,
        }
        const filterSepia = {
          key: dataFileName,
          type: 'sepia',
          option,
        }
        const filterBeauty = {
          key: dataFileName,
          type: 'beauty',
          option,
        }
        const filterNormal = {
          key: dataFileName,
          type: '',
          option,
        }

        const [resImageNormal, resImageGray, resImageSepia, resImageBeauty] =
          await Promise.all([
            mutateAsync(filterNormal),
            mutateAsync(filterGray),
            mutateAsync(filterSepia),
            mutateAsync(filterBeauty),
          ])

        actions.avatarUpload.preview(resImageNormal.image_url)
        actions.avatarUpload.imageGray(resImageGray.image_url)
        actions.avatarUpload.imageSepia(resImageSepia.image_url)
        actions.avatarUpload.imageBeauty(resImageBeauty.image_url)

        actions.avatarUpload.dataGray(resImageGray.key)
        actions.avatarUpload.dataSepia(resImageSepia.key)
        actions.avatarUpload.dataBeauty(resImageBeauty.key)
      } catch (error) {
        // TODO show toast
        alert('画像をアップロードできません')
      } finally {
        setIsLoading(false)
      }
    },
    [createUploadUrl, fileImage, mutateAsync],
  )

  useEffect(() => {
    if (brightness) {
      runFileUploadFlow({ option: 'gamma1' })
    } else {
      runFileUploadFlow({ option: '' })
    }
  }, [brightness, runFileUploadFlow])

  const props: UploadProps = {
    accept: 'image/png, image/jpeg',
    beforeUpload: async (file) => {
      actions.avatarUpload.fileImage(file)

      return false
    },
    maxCount: 1,
  }

  const skip = async (): Promise<void> => {
    setOpenModal(true)
  }

  const handleSkip = async (): Promise<void> => {
    try {
      const response = await fetch('/flower.jpg')
      const blob = await response.blob()

      const file: File = new File([blob], 'flower.jpg', {
        type: blob.type,
      })

      const fileName = file.name
      const fileExtension = fileName.split('.').pop()
      const filePath = fileName.split('.').slice(0, -1).join('.')
      const pathfile = 'avatar/' + filePath
      const dataBody = {
        file_path: pathfile,
        file_extension: fileExtension,
      }

      const dataUpload = await createUploadUrl(dataBody)
      actions.onboard.mainPhoto(dataUpload.file_name)

      const urlS3 = dataUpload.upload_url
      await axios.put(urlS3, file)

      actions.onboard.nextStep()
    } catch {
      alert('ファイルの選択をスキップできません')
    }
  }

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  return (
    <>
      {isLoading && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 !bg-sub-5/75 z-[99] w-full h-full">
          {/* TODO remove style */}
          <Spin
            className="!absolute"
            style={{ top: '50%', left: '50%', margin: '-10px' }}
          />
        </div>
      )}
      <HeaderOnboard
        title="情報登録"
        showIcon={true}
        clickBack={actions.onboard.backStep}
      />
      <div className="bg-primary-green min-h-14 text-sm flex">
        <div className="font-bold px-5 py-4 self-center text-sub-1">
          残り2項目
        </div>
      </div>
      {/*Form Select Object */}
      <div className="justify-center flex">
        <div className="p-3 pb-52 self-center max-w-base w-full">
          <div className="py-6 px-4 flex-col flex">
            <h5 className="min-h-11 w-full mb-6 text-xl font-bold text-primary-dark-green relative z-10">
              顔写真を
              <br />
              登録しましょう
            </h5>
            <div className="min-h-11 w-full relative z-20 font-normal text-sm">
              マッチ率を上げるために、あなたの顔がはっきりわかる写真にしましょう。
            </div>
            <h5 className="text-sm font-normal min-h-2 w-full mt-5 relative z-10 flex items-baseline">
              顔写真
              <p className="text-blue text-[10px]">※後で変更が可能です / </p>
            </h5>
            {/*doc upload image */}
            <div className="bg-ghost-white justify-start rounded-xl p-3 min-h-64 w-full mt-3 mb-5 relative z-20 flex flex-col">
              <div className="justify-start py-3 w-full relative z-0 flex items-center">
                <div>
                  <Image
                    src="/imageupload1.png"
                    alt="Upload Image"
                    width={188}
                    height={155}
                  />
                </div>
                <div className="text-base self-center min-h-11 w-48 m-3 relative z-0">
                  スマホを持った手を水平に伸ばして、写真を撮ってみましょう。
                  <br />
                  顔がはっきり分かる写真の方がマッチ率が上がります。
                </div>
              </div>
              <div className="justify-start py-3 w-full relative z-0 flex items-center">
                <div>
                  <Image
                    src="/imageupload2.jpg"
                    alt="Upload Image"
                    width={188}
                    height={155}
                  />
                </div>
                <div className="text-base self-center min-h-11 w-48 m-3 relative z-0">
                  撮影後に、美肌補正機能を使い写真をきれいにする事が可能です。
                </div>
              </div>
            </div>
            {/*section upload */}
            <div className="justify-start self-start w-full relative z-20 flex flex-col">
              {preview ? (
                <>
                  <div
                    className="self-center justify-start cursor-pointer w-64 mt-7 flex flex-col"
                    onClick={() => handleSelectImage('normal')}
                  >
                    <div className="self-center w-[150px] h-[150px]">
                      <Image
                        loader={() => preview}
                        src={preview}
                        alt="Image Updated"
                        title="Image Updated"
                        width={150}
                        height={150}
                        style={{ height: '150px' }}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="self-center w-full my-3 flex flex-row justify-center">
                      <div
                        className={`text-sm font-normal self-center w-[70px] break-words flex-grow max-w-20 ${
                          selectImage === 'normal' ? 'text-black' : 'text-sub-4'
                        }`}
                      >
                        オリジナル
                      </div>
                      <div className="text-gray-400 p-1 self-center w-9 h-9 flex">
                        {selectImage === 'normal' ? (
                          <Image
                            src="/check_green.svg"
                            alt="circle svg"
                            width={23}
                            height={23}
                            style={{ height: '23px' }}
                          />
                        ) : (
                          <Image
                            src="/circle.svg"
                            alt="circle svg"
                            width={23}
                            height={23}
                            style={{ height: '23px' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {imageGray && (
                      <AvatarFilter
                        image={imageGray}
                        label="モノクロ"
                        isSelected={selectImage === 'gray'}
                        onClick={() => handleSelectImage('gray')}
                      />
                    )}
                    {imageSepia && (
                      <AvatarFilter
                        image={imageSepia}
                        label="セビア"
                        isSelected={selectImage === 'sepia'}
                        onClick={() => handleSelectImage('sepia')}
                      />
                    )}
                    {imageBeauty && (
                      <AvatarFilter
                        image={imageBeauty}
                        label="美肌補正"
                        isSelected={selectImage === 'beauty'}
                        onClick={() => handleSelectImage('beauty')}
                      />
                    )}
                  </div>
                  <div className="self-center">
                    <Upload
                      {...props}
                      className="self-center w-full !mt-5 relative z-10 flex flex-col items-stretch"
                    >
                      <div className="content-start w-full relative z-20 flex-col flex">
                        <div className="cursor-pointer h-11 w-52 mt-3 divide-solid border border-[#06c755] rounded-md flex items-center justify-center">
                          <Button
                            type="link"
                            className="!text-primary-green !text-sm !font-normal"
                          >
                            写真を撮り直す
                          </Button>
                        </div>
                      </div>
                    </Upload>
                  </div>
                  <div className="p-3 mt-8 w-full flex flex-col">
                    <h5 className="text-sm font-normal w-full">画像の補正</h5>
                    <div
                      className={`divide-solid border rounded-md cursor-pointer min-h-12 w-full mt-3 mb-5 flex flex-row items-center ${
                        brightness
                          ? 'border-primary-green text-primary-green'
                          : 'border-[#bac6d3]'
                      }`}
                      onClick={handleAddBrightness}
                    >
                      <h5 className="text-sm font-normal self-center w-24 flex-grow ml-3">
                        明るさ補正をオンにする
                      </h5>
                      <div className="p-1 self-center max-w-8 w-8 h-8 flex flex-grow mr-3">
                        {brightness ? (
                          <Image
                            src="/check_green.svg"
                            alt="circle svg"
                            width={23}
                            height={23}
                            style={{ height: '23px' }}
                          />
                        ) : (
                          <Image
                            src="/check_dark.svg"
                            alt="circle svg"
                            width={23}
                            height={23}
                            style={{ height: '23px' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="self-center w-64 mt-7 flex flex-col">
                    <div className="self-center w-[150px] h-[150px]">
                      <Image
                        src="/imageupload3.jpg"
                        alt="avatar"
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>
                  <div className="self-center">
                    <Upload
                      {...props}
                      className="self-center w-full mt-5 relative z-10 flex flex-row items-stretch"
                    >
                      <div className="content-start w-full relative z-20 flex-col flex">
                        <div className="cursor-pointer self-center h-11 w-52 mt-8 mb-3 divide-solid border-[1px] border-primary-green rounded-md flex items-center justify-center">
                          <Button
                            type="link"
                            className="!text-primary-green !text-sm !font-normal"
                          >
                            写真をアップする
                          </Button>
                        </div>
                      </div>
                    </Upload>
                  </div>
                  <div className="cursor-pointer self-center h-11 w-52 mt-5 mb-3 divide-solid border border-[#dfe3e8] rounded-md flex items-center justify-center">
                    <Button
                      type="link"
                      className="!text-[#909090] !text-sm !font-normal"
                      onClick={skip}
                    >
                      スキップする
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-12 left-0 right-0 top-[unset] bottom-0 mr-auto fixed z-50 justify-end flex flex-col">
        <div className="justify-start self-center min-w-[10%] max-w-[430px] min-h-2 w-full flex flex-col mb-3 relative z-20">
          <Button
            type="primary"
            block
            onClick={actions.onboard.nextStep}
            disabled={!preview}
            className="!h-[45px]"
          >
            次に進む
          </Button>
        </div>
      </div>
      <Modal closeIcon={null} footer={null} width={320} open={openModal}>
        <h5 className="text-lg font-bold text-center min-h-11 w-full text-cetacean-blue">
          優先度が下がります！
        </h5>
        <div className="text-sm text-cetacean-blue">
          <p>顔写真の登録をスキップし、ランダムな画像を挿入します。</p>
          <br />
          スキップした場合は、お相手に表示される優先度が下がります。
          <br />
          優先度を上げるには、プロフィール編集画面にて、顔写真をアップロードしてください。
        </div>
        <div className="text-center mt-5 flex justify-between">
          <Button
            type="primary"
            className="!h-[45px] max-w-[120px] !w-[120px] !text-sm !font-semibold text-center"
            onClick={handleSkip}
          >
            スキップする
          </Button>
          <Button
            type="link"
            className="!text-[#909090] !h-[45px] max-w-[120px] !w-[120px] !text-sm !font-semibold text-center !divide-solid !border !border-[#dfe3e8]"
            onClick={handleCloseModal}
          >
            戻る
          </Button>
        </div>
      </Modal>
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
export default StepUploadImage
