import FormTemplateMessage from '@/features/template-message-feature/components/FormTemplateMessage'
import React from 'react'

export default function EditTemplateMessagePage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  const { id } = params
  return <FormTemplateMessage templateId={id} />
}
