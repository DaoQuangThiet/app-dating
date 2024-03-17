import { createStore } from 'zustand-x'

type State = {
  socket: WebSocket | null
}

export const SocketStore = createStore('socketStore')(
  <State>{
    socket: null,
  },
  {
    devtools: { enabled: true },
  },
)
