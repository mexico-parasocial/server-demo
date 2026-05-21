import {useCallback, useSyncExternalStore} from 'react'

import * as persisted from '#/state/persisted'
import {useSession} from '#/state/session'

export type MapProvider = 'google' | 'maplibre'
export type MapViewMode = 'standard' | 'satellite' | 'terrain' | 'hybrid'

/**
 * Resolves which map provider + view mode to use.
 *
 * Rules:
 * 1. Anonymous users (no session) → always 'maplibre' (privacy-first)
 * 2. Authenticated with explicit preference → that preference
 * 3. Authenticated with no preference → 'google'
 */
export function useMapProvider() {
  const {hasSession} = useSession()

  const provider = useSyncExternalStore(
    cb => persisted.onUpdate('mapProvider', cb),
    () => persisted.get('mapProvider'),
  )

  const viewMode = useSyncExternalStore(
    cb => persisted.onUpdate('mapViewMode', cb),
    () => persisted.get('mapViewMode'),
  )

  // Anonymous → always MapLibre for privacy
  const resolvedProvider: MapProvider = hasSession
    ? provider ?? 'google'
    : 'maplibre'

  const resolvedViewMode: MapViewMode = viewMode ?? 'standard'

  // In anonymous mode, the toggle is locked to MapLibre
  const canChangeProvider = hasSession

  const setProvider = useCallback(
    (value: MapProvider) => {
      if (!hasSession) return // locked in anonymous
      void persisted.write('mapProvider', value)
    },
    [hasSession],
  )

  const setViewMode = useCallback((value: MapViewMode) => {
    void persisted.write('mapViewMode', value)
  }, [])

  return {
    provider: resolvedProvider,
    viewMode: resolvedViewMode,
    canChangeProvider,
    setProvider,
    setViewMode,
  }
}
