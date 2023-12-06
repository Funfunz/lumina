import { $data } from '../../store/main.ts'
import { computed } from 'nanostores'

export function getComponentData<T>(id: string) {
  console.log($data.get())
  return computed($data, data => data[id] as T)
}