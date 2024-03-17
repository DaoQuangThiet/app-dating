import { Footer } from '@/components/ui'
import SettingComponent from '@/features/setting-feature'

export default function ProfilePage(): JSX.Element {
  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <SettingComponent />
        </div>
      </div>
      <Footer />
    </main>
  )
}
