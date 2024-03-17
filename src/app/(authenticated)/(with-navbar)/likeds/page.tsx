import { Footer } from '@/components/ui'
import LikedsComponent from '@/features/liked-feature'

export default function LikedsPage(): JSX.Element {
  return (
    <>
      <div className="w-full mt-14 min-h-screen bg-lotion">
        <LikedsComponent />
      </div>
      <Footer />
    </>
  )
}
