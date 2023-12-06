import { $backofficeLayout } from '../../store/main.ts'
import { computed } from 'nanostores'

export function getBackofficeLayout<T>(id: string) {
  return computed($backofficeLayout, data => data[id] as T)
}
