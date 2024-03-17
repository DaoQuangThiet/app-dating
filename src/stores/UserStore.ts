import { UserProfile } from '@/types/profile'
import { create } from 'zustand'

type State = {
  user: UserProfile | null
}

type Action = {
  setUser: (user: UserProfile | null) => void
}

export const useUserStore = create<State & Action>()((set) => ({
  user: null,
  setUser: (user): void => set(() => ({ user: user })),
}))
