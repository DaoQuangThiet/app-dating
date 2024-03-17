import NewPasswordComponent from '@/features/auth-feature/components/NewPasswordComponent'
import { Suspense } from 'react'

export const metadata = {
  title: 'HHLL',
}

export default function NewPassword(): JSX.Element {
  return (
    <Suspense>
      <NewPasswordComponent />
    </Suspense>
  )
}
