import { $data } from '../../store/main.ts'
import { computed } from 'nanostores'

export function setComponentData(id: string, data: Record<string, unknown>) {
  $data.setKey(id, data)
}

export function getComponentData<T>(id: string) {
  return computed($data, data => data[id] as T)
}
