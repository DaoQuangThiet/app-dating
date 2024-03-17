import { RcFile } from 'antd/es/upload'
import { createStore } from 'zustand-x'

type State = {
  preview: string
  listPreview: string[]
  fileImage: RcFile | null
  listFileImages: RcFile[]
  imageGray: string
  imageSepia: string
  imageBeauty: string
  selectImage: string
  dataGray: string
  dataSepia: string
  dataBeauty: string
}

export const avatarUploadStore = createStore('avatarUploadStore')(
  <State>{
    preview: '',
    listPreview: [],
    fileImage: null,
    listFileImages: [],
    imageGray: '',
    imageSepia: '',
    imageBeauty: '',
    selectImage: 'normal',
    dataGray: '',
    dataSepia: '',
    dataBeauty: '',
  },
  {
    devtools: { enabled: true },
  },
)
