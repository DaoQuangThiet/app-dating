import MatchCreate from '@/features/matching-feature/MatchCreate'

export default function MatchCreatePage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  const { id } = params
  return <MatchCreate userId={id} />
}
