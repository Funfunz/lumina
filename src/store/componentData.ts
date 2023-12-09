import { map } from 'nanostores'

export const $data = map<Record<string, Record<string, unknown>>>({})

export function setComponentData(id: string, data: Record<string, unknown>) {
  $data.setKey(id, {
    ...getComponentData(id),
    ...data
  });
}

export function getComponentData(id: string) {
  return $data.get()[id]
}