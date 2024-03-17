'use client'

import { useCreateVerifyForFemaleApi } from '@/api'
import { HeaderOnboard } from '@/components/ui'
import StepSubmitIdentityVerification from '@/features/onboard-feature/components/StepSubmitIdentityVerification'
import { store } from '@/stores'
import { useUserStore } from '@/stores/UserStore'
import { message } from 'antd'
import { useRouter } from 'next/navigation'

export function SubmitIdentityVerification(): JSX.Element {
  const router = useRouter()
  const currentUser = useUserStore((state) => state.user)
  const { mutate: createVerifyMutation } = useCreateVerifyForFemaleApi()

  const handleClickBack = (): void => {
    router.back()
  }

  const handleSubmitVerify = (): void => {
    const verifyData = {
      verification_photo: store.onboard.verificationPhoto(),
    }

    createVerifyMutation(verifyData, {
      onSuccess: () => {
        message.success('本人確認書類は正常に送信されました')
        router.push('/profile')
      },
      //TODO: Handle onError case
    })
  }

  if (currentUser?.identity_verification_status === 'WAITING') {
    return (
      <main className="grow">
        <div className="w-full mt-14 min-h-screen bg-sub-1">
          <HeaderOnboard
            title="本人確認"
            showIcon={true}
            clickBack={handleClickBack}
          />
          <div className="flex justify-center p-3">
            申請済みです。審査完了までしばらくお待ちください。
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="grow">
      <div className="w-full mt-14 min-h-screen bg-sub-1">
        <StepSubmitIdentityVerification
          handleSubmitVerify={handleSubmitVerify}
          handleClickBack={handleClickBack}
        />
      </div>
    </main>
  )
}
