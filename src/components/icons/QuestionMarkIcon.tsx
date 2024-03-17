'use client'

import Icon, { QuestionCircleOutlined } from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

function QuestionMarkIconSvg(): JSX.Element {
  return <QuestionCircleOutlined />
}

export default function QuestionMarkIcon(
  props: Partial<CustomIconComponentProps>,
): JSX.Element {
  return <Icon component={QuestionMarkIconSvg} {...props} />
}
