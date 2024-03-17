import ProfileDetail from '@/features/matching-feature/ProfileDetail'

export default function ProfileDetailPage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  const { id } = params
  return <ProfileDetail userId={id} />
}
