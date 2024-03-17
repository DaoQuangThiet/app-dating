import { UserMatched } from '@/types/matches'
import { Profile } from '@/types/profile'
import { createStore } from 'zustand-x'

type State = {
  listCommunication: UserMatched[]
  chatDetail: UserMatched | null
  targetProfile: Profile | null
}

export const communicationStore = createStore('communicationStore')(
  <State>{
    listCommunication: [],
    chatDetail: null,
    targetProfile: null,
  },
  {
    devtools: { enabled: true },
  },
)
