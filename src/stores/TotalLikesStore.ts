import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  total: number
}
type Action = {
  setTotalLike: (total: number) => void
}

export const useShowTotalLikesStore = create<State & Action>()(
  devtools((set) => ({
    total: 0,
    setTotalLike: (res): void => set(() => ({ total: res })),
  })),
)
