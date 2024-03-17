import { create } from 'zustand'

type State = {
  email: string
}

type Action = {
  setEmail: (email: string) => void
}
export const useResetPasswordStore = create<State & Action>()((set) => ({
  email: '',
  setEmail: (res): void => set(() => ({ email: res })),
}))
