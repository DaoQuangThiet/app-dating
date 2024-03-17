import { useGetCommunicationApi } from '@/api'
import { communicationStore } from '@/features/communication-feature/store/communicationStore'
import { UserMatched } from '@/types/matches'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

type ReturnType = {
  status: 'error' | 'success' | 'pending'
  showUserMatched: number | undefined
  fetchNextPage: () => Promise<UseInfiniteQueryResult>
  hasNextPage: boolean
  isFetching: boolean
}

export default function useMatched(): ReturnType {
  const {
    data: matchedData,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetCommunicationApi()
  const showUserMatched = matchedData?.pages[0].total

  const dataUser = useMemo(() => {
    const data: UserMatched[] = []

    return matchedData?.pages.reduce((acc, page) => {
      const newData = page.data.map((item: UserMatched) => ({
        ...item,
      }))
      return [...acc, ...newData]
    }, data)
  }, [matchedData])

  useEffect(() => {
    if (status === 'success' && dataUser) {
      communicationStore.set.listCommunication(dataUser)
    }
  }, [dataUser, status])

  return {
    showUserMatched,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
  }
}
