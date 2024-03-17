import ProfileEdit from '@/features/profile-feature/ProfileEdit'

export const metadata = {
  title: 'HHLL',
}

export default function ProfileEditPage(): JSX.Element {
  return (
    <main className="grow">
      <div className="w-full">
        <div className="mt-14">
          <ProfileEdit />
        </div>
      </div>
    </main>
  )
}
