import { act, cleanup, renderHook } from '@testing-library/react'
import { useRegisteredEmailStore } from '../RegisteredEmailStore'

describe('useRegisteredEmailStore', () => {
  const initialStoreState = useRegisteredEmailStore.getState()

  afterEach(() => {
    jest.resetAllMocks()
    cleanup()
    useRegisteredEmailStore.setState(initialStoreState, true)
  })

  describe('showEmail', () => {
    test('email updated', () => {
      const { result } = renderHook(() =>
        useRegisteredEmailStore((state) => state),
      )

      act(() => {
        result.current.setEmail('xxx@example.com')
      })

      expect(result.current.email).toEqual('xxx@example.com')
    })
  })
})
