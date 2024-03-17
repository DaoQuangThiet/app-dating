'use client'

import { SocketConfig } from '@/configs/socket'
import { getAccessTokens } from '@/libs/axios'
import { SocketStore } from '@/stores/SocketStore'
import { useEffect } from 'react'

export default function SocketConnectionProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  useEffect(() => {
    if (!SocketStore.get.socket()) {
      socketInitializer()
    }
  }, [])

  const socketInitializer = async (): Promise<void> => {
    const socket = new WebSocket(
      `${SocketConfig.url}?token=${getAccessTokens()}`,
    )

    socket.addEventListener('open', () => {
      socket.send('Connection established')
    })

    SocketStore.set.socket(socket)
  }

  return <>{children}</>
}
