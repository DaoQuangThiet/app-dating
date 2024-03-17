"use client"

import StepIdentityVerification from '@/features/onboard-feature/components/StepIdentityVerification'
import { useRouter } from 'next/navigation'

export function InstructionsIndentity(): JSX.Element {
  const router = useRouter()

  const handleClickNextStep = (): void => {
    router.push('/identification_create')
  }

  return (
    <main className="grow">
      <div className="w-full mt-14">
        <StepIdentityVerification handleClickNextStep={handleClickNextStep} />
      </div>
    </main>
  )
}
