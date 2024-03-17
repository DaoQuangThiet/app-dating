import { createStore } from 'zustand-x'
import { OrderItem, plan90 } from '../types'

type State = {
  plan: OrderItem
}

export const paymentStore = createStore('paymentStore')(
  <State>{
    plan: plan90,
  },
  {
    devtools: { enabled: true },
  },
)
