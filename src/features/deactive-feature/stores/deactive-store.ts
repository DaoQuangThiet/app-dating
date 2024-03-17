import { createStore } from 'zustand-x'

export const useDeactiveStore = createStore('deactiveStore')(
  {
    currentStep: 1,
    reason: '',
    reasonOther: '',
    message: '',
    lifestyle: '',
    lifestyleOther: '',
    chatFrequency: '',
    chatFrequencyOther: '',
  },
  {
    devtools: { enabled: true },
    persist: { enabled: true, name: 'deacttive-info' },
  },
).extendActions((set, get) => ({
  nextStep: (): void => {
    set.currentStep(get.currentStep() + 1)
  },
  resetStep: (): void => {
    set.currentStep(1)
  },
  resetSavedData: (): void => {
    set.reason('')
    set.reasonOther('')
    set.message('')
    set.lifestyle('')
    set.lifestyleOther('')
    set.chatFrequency('')
    set.chatFrequencyOther('')
  },
}))
