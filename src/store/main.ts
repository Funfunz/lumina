import { map } from 'nanostores'

export interface IMenuBackofficeLayout {
  open: boolean
}
export interface IBackofficeLayout {
  menu: IMenuBackofficeLayout
}

const defaultBackofficeLayout = {
  menu: {
    open: false
  }
}

export const $data = map<Record<string, Record<string, unknown>>>({})

export const $backofficeLayout = map(defaultBackofficeLayout)

export function setComponentData(id: string, data: Record<string, unknown>) {
  $data.setKey(id, {
    ...getComponentData(id),
    ...data
  });
}

export function getComponentData(id: string) {
  return $data.get()[id]
}

export function setBackofficeLayout(id: keyof IBackofficeLayout, data: IMenuBackofficeLayout) {
  $backofficeLayout.setKey(id, {
    ...getBackofficeLayout(id),
    ...data
  });
}

export function getBackofficeLayout(id: string) {
  return $data.get()[id]
}