export type PaidyResultData = {
  id: string
  amount: string
  currency: string
  created_at: string
  status: string
}

export type OrderItem = {
  id: string
  quantity: 1
  title: string
  unit_price: number
  description: string
}

export const plan30: OrderItem = {
  id: 'PLAN_30',
  quantity: 1,
  title: '毎月払いプラン（３０日）',
  unit_price: 4500,
  description: '',
}

export const plan90: OrderItem = {
  id: 'PLAN_90',
  quantity: 1,
  title: '3ヶ月毎プラン（９０日）',
  unit_price: 10000,
  description: '',
}

export const plan150: OrderItem = {
  id: 'PLAN_150',
  quantity: 1,
  title: '5ヶ月毎プラン（１５０日）',
  unit_price: 15000,
  description: '',
}

export const plan90wLikeCommit: OrderItem = {
  id: 'PLAN_90WLIKECOMMIT',
  quantity: 1,
  title: '3ヶ月毎プラン（いいね！保証付き、９０日）',
  unit_price: 15000,
  description: '',
}
