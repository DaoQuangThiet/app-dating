'use client'

import { useOnboardApi } from '@/api'
import { actions, store, useStore } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import StepDetailIntro from './StepDetailIntro'
import StepEnterIntro from './StepEnterIntro'
import StepEnterName from './StepEnterName'
import StepIdentityVerification from './StepIdentityVerification'
import StepSelectBirthday from './StepSelectBirthday'
import StepSelectCharacter from './StepSelectCharacter'
import StepSelectCity from './StepSelectCity'
import StepSelectGender from './StepSelectGender'
import StepSelectObject from './StepSelectTarget'
import StepSubmitIdentityVerification from './StepSubmitIdentityVerification'
import StepUploadImage from './StepUploadImage'

export default function Onboarding(): JSX.Element {
  const step = useStore().onboard.currentStep()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate } = useOnboardApi()

  const handleSubmit = (): void => {
    const currentState = store.onboard.jsonOnboardRequest()
    mutate(currentState, {
      onSuccess: () => {
        queryClient.invalidateQueries()
        router.push('/on_boarding_completed')
      },
    })
  }
  const renderCurrentComponent = (): JSX.Element | null => {
    switch (step) {
      case 1:
        return <StepSelectGender />
      case 2:
        return <StepSelectObject />
      case 3:
        return <StepSelectCity />
      case 4:
        return <StepSelectBirthday />
      case 5:
        return <StepEnterName />
      case 6:
        return <StepEnterIntro />
      case 7:
        return <StepSelectCharacter />
      case 8:
        return <StepUploadImage />
      case 9:
        return <StepDetailIntro />
      case 10:
        return (
          <StepIdentityVerification
            handleClickNextStep={actions.onboard.nextStep}
          />
        )
      case 11:
        return (
          <StepSubmitIdentityVerification
            handleSubmitVerify={handleSubmit}
            handleClickBack={actions.onboard.backStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <main className="grow">
        <div className="w-full">
          <div className="mt-14">{renderCurrentComponent()}</div>
        </div>
      </main>
    </>
  )
}
