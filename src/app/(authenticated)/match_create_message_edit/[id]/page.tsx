import EditMessage from "@/features/matching-feature/EditMessage"

export default function EditMessagePage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  const { id } = params
  return <EditMessage userId={id} />
}
