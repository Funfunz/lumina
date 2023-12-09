import { $data } from '../../store/componentData.ts'
import { computed } from 'nanostores'

export function getComponentData<T>(id: string) {
  return computed($data, data => data[id] as T)
}
