'use client'

import { useGetProfileApi } from '@/api'
import Profile from '@/components/Profile'
import { Footer } from '@/components/ui'
import { usePathname } from 'next/navigation'

export default function ProfilePage(): JSX.Element {
  const { data: profileData } = useGetProfileApi()
  const pathname = usePathname()

  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <Profile
            profile={profileData}
            isPreviewable
            isPathname={pathname === '/profile'}
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
