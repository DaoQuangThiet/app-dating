import { Footer } from '@/components/ui'
import PartnerProfile from '@/features/partner-search-feature/components/PartnerProfile'

export default function ProfilePage(): JSX.Element {
  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <PartnerProfile />
        </div>
      </div>
      <Footer />
    </main>
  )
}
