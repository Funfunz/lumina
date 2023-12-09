import { $backofficeLayout } from '../../store/backofficeLayout.ts'
import { computed } from 'nanostores'

export function getBackofficeLayout<T>(id: string) {
  return computed($backofficeLayout, data => data[id] as T)
}
