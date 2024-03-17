'use client'

import { Spin } from 'antd'
import { useEffect } from 'react'
import useMatched from '../hooks/useMatched'
import NoMatched from './NoMatched'
import UsersMatched from './UserMatched'

//TODO: write storybook
export default function Matches(): JSX.Element {
  const { showUserMatched, status, fetchNextPage, hasNextPage, isFetching } =
    useMatched()

  useEffect(() => {
    const handleScroll = (): void => {
      if (
        hasNextPage &&
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  if (status === 'pending') {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spin />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center">
        {showUserMatched ? (
          <UsersMatched isFetching={isFetching} />
        ) : (
          <NoMatched />
        )}
      </div>
    </>
  )
}
