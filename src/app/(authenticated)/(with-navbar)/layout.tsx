
import { BottomNavigation } from '@/components/ui'
import React, { ReactNode } from 'react'

export default function WithNavbarLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
