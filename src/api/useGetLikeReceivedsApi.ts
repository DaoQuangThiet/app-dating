import { axiosInstance } from '@/libs/axios'
import { LikedsReceive } from '@/types/likeds'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetLikeReceivedsApi = () =>
  useInfiniteQuery({
    queryKey: ['get-liked-received'],
    queryFn: ({
      pageParam,
    }): Promise<{ data: LikedsReceive[]; page: number; total: number }> =>
      axiosInstance.get(`/like/received?page=${pageParam}&limit=10`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage?.page
      const totalItems = allPages.reduce(
        (acc, page) => acc + page.data.length,
        0,
      )
      if (totalItems % 10 === 0) {
        return currentPage + 1
      } else {
        return null
      }
    },
  })
