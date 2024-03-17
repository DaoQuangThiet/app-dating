import { create } from 'zustand'

type State = {
  email: string
}

type Action = {
  setEmail: (email: string) => void
}

export const useRegisteredEmailStore = create<State & Action>()((set) => ({
  email: '',
  setEmail: (registeredEmail): void => set(() => ({ email: registeredEmail })),
}))
