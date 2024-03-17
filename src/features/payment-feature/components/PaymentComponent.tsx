'use client'

import {
  GET_AUTH_QUERY_KEY,
  useGetCommunicationApi,
  useGetLikeReceivedsApi,
  useGetProfileApi,
} from '@/api'
import { usePaidyPaymentCheckingApi } from '@/api/usePaidyPaymentCheckingApi'
import CheckGreenIcon from '@/components/icons/CheckGreen'
import { Button, HeaderLogged } from '@/components/ui'
import { config } from '@/configs'
import { useStore } from '@/stores'
import { useUserStore } from '@/stores/UserStore'
import { Window } from '@/types'
import { LikedsReceive } from '@/types/likeds'
import { UserMatched } from '@/types/matches'
import { useQueryClient } from '@tanstack/react-query'
import { App, Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { PaidyResultData } from '../types'
import ListPlan from './ListPlanComponent'

declare const window: Window

function FeatureFirst(): JSX.Element {
  return (
    <>
      1日の上限数アップ（無料：13回→有料
      <strong className="text-primary-dark-green">40</strong>回）
    </>
  )
}
function FeatureSecond(): JSX.Element {
  return (
    <>
      1日のメッセージオプション上限数アップ（無料：7回→有料
      <strong className="text-primary-dark-green">20</strong>回）
    </>
  )
}

const feature = [
  {
    id: 1,
    titlle: <FeatureFirst />,
  },
  {
    id: 2,
    titlle: <FeatureSecond />,
  },
  {
    id: 3,
    titlle: '届いたメッセージの確認',
  },
  {
    id: 4,
    titlle: '届いたいいねにお返しのいいねをする',
  },
  {
    id: 5,
    titlle: 'マッチングをした相手にいいねを送信',
  },
]

export default function Payment(): JSX.Element {
  const { data: userLikes } = useGetLikeReceivedsApi()
  const { data: userMatches } = useGetCommunicationApi()
  const selectedPlan = useStore().payment.plan()
  const user = useUserStore((state) => state.user)
  const { data: userProfile } = useGetProfileApi()
  const router = useRouter()
  const [spinning, setSpinning] = useState(false)
  const queryClient = useQueryClient()

  // TODO: move message to store
  const { message } = App.useApp()

  const nicknameUserLikes = useMemo(() => {
    return (
      userLikes?.pages[0].data.map((item: LikedsReceive) => item.nickname) ?? []
    )
  }, [userLikes])

  const listNicknames = useMemo(() => {
    const listNames = userMatches?.pages[0].data
      .map((item: UserMatched) => item.partner_nickname)
      ?.concat(nicknameUserLikes)
    return listNames?.slice(0, 5)
  }, [nicknameUserLikes, userMatches?.pages])

  const [paymentId, setPaymentId] = useState('')
  const { mutate: checkPaymentStatusMutation } = usePaidyPaymentCheckingApi()

  useEffect(() => {
    if (!paymentId) return
    setSpinning(true)

    checkPaymentStatusMutation(paymentId, {
      onSuccess: () => {
        message.success('支払いが正常に処理されました')
        queryClient.invalidateQueries({ queryKey: GET_AUTH_QUERY_KEY })
      },
      onError: () => {
        message.error('支払いが失敗しました')
      },
      onSettled: () => {
        setSpinning(false)
        router.push('/profile')
      },
    })
  }, [checkPaymentStatusMutation, message, paymentId, queryClient, router])

  const payWithStarpayment = () => {
    // TODO: move to external function
    router.push(
      `https://pay3.star-pay.jp/site/pc/site_credit_pc.php?clientip=D20007&sendid=${user?.id}-${selectedPlan.id}&email=${user?.email}&money=${selectedPlan.unit_price}&backurl=https%3A%2F%2F${config.app.url}%2Fprofile%2F`,
    )
  }

  const payWithPaidy = () => {
    if (!window.Paidy || !user || !selectedPlan || !userProfile) {
      return
    }
    const paidyConfig = {
      api_key: config.paidy.publicKey,
      logo_url:
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fef37da01fa78523d72a0103f6908f784.cdn.bubble.io%2Ff1679619107670x257063121562168830%2F334891849_3390099831252444_2688333301650710470_n%25201.png?w=192&h=122&auto=compress&dpr=2&fit=max',
      closed: (data: PaidyResultData) => {
        if (data.status === 'rejected') return

        if (!data.id) return

        setPaymentId(data.id)
      },
    }
    const paidyHandler = window.Paidy.configure(paidyConfig)
    const payload = {
      amount: selectedPlan.unit_price,
      currency: 'JPY',
      store_name: 'ハハロル決済',
      buyer: {
        email: user.email,
        name1: user.nickname,
        dob: userProfile.date_of_birth,
        date_of_birth: userProfile.date_of_birth,
      },
      buyer_data: {
        user_id: user.id,
        age: userProfile.age,
        days_since_first_transaction: 29,
        ltv: 0,
        order_count: 1,
        last_order_amount: 0,
        last_order_at: 0,
      },
      order: {
        items: [selectedPlan],
        shipping: 0,
        tax: 0,
      },
      description: 'ハハロル決済',
      metadata: {
        'user-id': user.id,
      },
    }
    paidyHandler.launch(payload)
  }

  return (
    <main className="grow">
      <Spin spinning={spinning} fullscreen />

      <div className="w-full mt-14">
        <HeaderLogged title="有料プランの購入" settingIcon={false} />
        <div className="flex justify-center bg-lotion py-6 px-4">
          <div className="w-full self-center max-w-base p-3 mb-32">
            <div className="w-full">
              <Image
                src="/purchase.png"
                width={460}
                height={229}
                alt="purchase"
                quality={100}
                priority
                className="w-full"
              />
            </div>

            <h5 className="min-h-14 mt-5 text-xl font-bold text-sub-5">
              1.プランを選択してください
            </h5>

            <ListPlan />

            {!!listNicknames?.length && (
              <div className="state-logged p-3 mb-8 bg-white flex flex-wrap">
                <div className="text-cetacean-blue text-sm">
                  今有料会員になると、{listNicknames?.join('、')}
                  とやりとりができるようになります。
                </div>

                <div className="grid">
                  {nicknameUserLikes.map(
                    (items, index: number) =>
                      index < 4 && (
                        <div
                          key={index}
                          className="pt-3 text-sm text-cetacean-blue"
                        >
                          {items}さんは、直近24時間以内にログインしています
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <h5 className="text-sub-5 text-xl font-bold mt-5 mb-3">
                有料プランについて
              </h5>
              <h5 className="mb-5 text-sub-5 text-base font-bold">
                有料プランには以下の機能が含まれます。
              </h5>
              <div className="bg-white p-3 mb-3 flex flex-col">
                {feature.map((items) => (
                  <div className="flex my-1" key={items.id}>
                    <CheckGreenIcon />
                    <div className="text-sm text-cetacean-blue self-center ml-1">
                      {items.titlle}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h5 className="min-h-14 mt-5 text-xl font-bold text-sub-5">
              2.支払い方法を選択してくだい
            </h5>

            <div className="flex justify-center">
              <div className="flex items-center flex-col gap-6 w-[368px]">
                <Button
                  type="primary"
                  block
                  className="!h-14  !text-sm"
                  onClick={payWithStarpayment}
                >
                  クレジットカード払い
                </Button>
                <Button
                  type="primary"
                  block
                  className="!h-14 !text-sm"
                  onClick={payWithPaidy}
                >
                  コンビニ払い
                </Button>
                <Button
                  type="primary"
                  block
                  className="!h-14 !text-sm"
                  onClick={payWithPaidy}
                >
                  銀行振込
                </Button>
              </div>
            </div>

            <div className="text-sm text-sub-5 mt-5 font-bold">
              外部サイトに遷移し、決済後ハハロルサービスに戻ります。
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
