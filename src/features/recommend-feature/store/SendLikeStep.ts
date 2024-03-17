import { create } from 'zustand'

type State = {
  step: 'none' | 'like' | 'sended' | 'complete'
}

type Action = {
  setStep: (step: 'none' | 'like' | 'sended' | 'complete') => void
}

export const useSendLikeStep = create<State & Action>()((set) => ({
  step: 'none',
  setStep: (step): void => set(() => ({ step })),
}))
