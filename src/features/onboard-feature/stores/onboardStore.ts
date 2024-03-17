import { OnboardBody } from '@/api'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { createStore } from 'zustand-x'

type State = {
  currentStep: number
  gender: string
  searchTargetIds: CheckboxValueType[]
  prefectureId: number | null
  dateOfBirth: string
  nickname: string
  introductionSummary: string
  characterIds: string[]
  mainPhoto: string
  introduction: string
  verificationPhoto: string
}

export const onboardStore = createStore('onboardStore')(
  <State>{
    currentStep: 1,
    gender: '',
    searchTargetIds: [],
    prefectureId: null,
    dateOfBirth: '',
    nickname: '',
    introductionSummary: '',
    characterIds: [],
    mainPhoto: '',
    introduction: '',
    verificationPhoto: '',
  },
  {
    devtools: { enabled: true },
  },
)
  .extendSelectors((_, get) => ({
    jsonOnboardRequest: (): OnboardBody => ({
      gender: get.gender(),
      search_target_ids: get.searchTargetIds(),
      prefecture_id: get.prefectureId(),
      date_of_birth: get.dateOfBirth(),
      nickname: get.nickname(),
      introduction_summary: get.introductionSummary(),
      character_ids: get.characterIds(),
      main_photo: get.mainPhoto(),
      introduction: get.introduction(),
      verification_photo: get.verificationPhoto(),
    }),
  }))
  .extendActions((set, get) => ({
    nextStep: (): void => {
      set.currentStep(get.currentStep() + 1)
    },
    backStep: (): void => {
      set.currentStep(get.currentStep() - 1)
    },
    appendIntroduction: (text: string): void => {
      set.introduction(get.introduction() + text)
    },
  }))
