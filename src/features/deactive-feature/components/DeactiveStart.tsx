'use client'

import Header from '@/components/ui/Header'
import { useDeactiveStore } from '@/features/deactive-feature/stores/deactive-store'
import { useEffect } from 'react'
import StepFive from './StepFive'
import StepFour from './StepFour'
import StepOne from './StepOne'
import StepSix from './StepSix'
import StepThree from './StepThree'
import StepTwo from './StepTwo'

export default function DeactiveStart(): JSX.Element {
  useEffect(() => {
    useDeactiveStore.set.resetStep()
  }, [])

  const renderStep = (): JSX.Element => {
    switch (useDeactiveStore.use.currentStep()) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      case 5:
        return <StepFive />
      case 6:
        return <StepSix />
      default:
        return <></>
    }
  }

  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <Header title="退会確認" bordered={false} backIcon={false} />
          <div className="flex justify-center">
            <div className="max-w-[360px] w-full">{renderStep()}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
