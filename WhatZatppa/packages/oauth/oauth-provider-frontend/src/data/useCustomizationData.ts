import { useHydrationData } from './useHydrationData.js'

export function useCustomizationData() {
  return useHydrationData('__customizationData')
}
