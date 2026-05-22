import {AccessibilityInfo} from 'react-native'

export const PlatformInfo = {
  getIsReducedMotionEnabled: () => {
    // Fallback shim for expo-bluesky-swiss-army native module
    // Returns false synchronously; for async checks use AccessibilityInfo directly
    return false
  },
}
