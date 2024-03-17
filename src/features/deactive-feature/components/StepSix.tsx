'use client'

import { LeaveBody, useLeaveApi } from '@/api'
import { Button } from '@/components/ui'
import { clearAccessTokens, clearRefreshTokens } from '@/libs/axios'
import { useRouter } from 'next/navigation'
import { useDeactiveStore } from '../stores/deactive-store'

export default function StepSix(): JSX.Element {
  const router = useRouter()
  const leaveAppMutation = useLeaveApi()

  const deactive = (): void => {
    const {
      reason,
      reasonOther,
      message,
      chatFrequency,
      chatFrequencyOther,
      lifestyle,
      lifestyleOther,
    } = useDeactiveStore.get.state()
    const data: LeaveBody = {
      reason: reason === 'other' ? reasonOther : reason,
      message,
      lifestyle: lifestyle === 'other' ? lifestyleOther : lifestyle,
      chat_frequency:
        chatFrequency === 'other' ? chatFrequencyOther : chatFrequency,
    }
    leaveAppMutation.mutate(data, {
      onSuccess: () => {
        clearAccessTokens()
        clearRefreshTokens()
        router.push('/left')
      },
    })
  }

  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        htmlType="submit"
        className="w-full !h-[50px]"
        onClick={deactive}
      >
        退会する
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full !h-[50px] mt-5 !bg-sub-4"
        onClick={() => router.push('/setting')}
      >
        戻る
      </Button>
      <div>退会します。この操作は取り消せません。よろしいですか？</div>
    </div>
  )
}
