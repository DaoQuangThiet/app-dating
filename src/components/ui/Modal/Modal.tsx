import { Modal as AntModal, ModalProps } from 'antd'
import React from 'react'

type Props = ModalProps

export default function Modal(props: Props): JSX.Element {
  return <AntModal {...props} />
}
