import EmailConfirmComponent from '@/features/auth-feature/components/EmailConfirmComponent'
import { Suspense } from 'react'

export default function EmailConfirm(): JSX.Element {
  return (
    <Suspense>
      <EmailConfirmComponent />
    </Suspense>
  )
}
