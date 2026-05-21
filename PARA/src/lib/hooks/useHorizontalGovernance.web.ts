import {useMemo} from 'react'

import {Features} from '#/analytics/features'
import {useAnalytics} from '#/analytics'

export function useHorizontalGovernanceEnabled(): boolean {
  const ax = useAnalytics()
  return useMemo(
    () => ax.features.enabled(Features.HorizontalGovernanceEnable),
    [ax.features],
  )
}
