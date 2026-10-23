import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False during SSR and hydration, true on the client afterwards. Portals use it
 * to wait for `document`, without a setState-in-effect round trip.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false)
}
