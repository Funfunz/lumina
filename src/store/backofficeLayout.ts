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

export const $backofficeLayout = map<IBackofficeLayout>(defaultBackofficeLayout)

export function setBackofficeLayout(id: keyof IBackofficeLayout, data: IMenuBackofficeLayout) {
  $backofficeLayout.setKey(id, {
    ...getBackofficeLayout(id),
    ...data
  });
}

export function getBackofficeLayout(id: keyof IBackofficeLayout) {
  return $backofficeLayout.get()[id]
}
