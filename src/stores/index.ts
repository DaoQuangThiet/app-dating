

import { communicationStore } from '@/features/communication-feature'
import { avatarUploadStore, onboardStore } from '@/features/onboard-feature'
import { paymentStore } from '@/features/payment-feature/stores'
import { mapValuesKey } from 'zustand-x'

// Global store
export const rootStore = {
  onboard: onboardStore,
  avatarUpload: avatarUploadStore,
  communication: communicationStore,
  payment: paymentStore,
}

// Global hook selectors
const selectors = mapValuesKey('use', rootStore)
export const useStore = (): typeof selectors => selectors

// Global tracked hook selectors
const trackedSelectors = mapValuesKey('useTracked', rootStore)
export const useTrackedStore = (): typeof trackedSelectors => trackedSelectors

// Global getter selectors
export const store = mapValuesKey('get', rootStore)

// Global actions
export const actions = mapValuesKey('set', rootStore)
