import { map } from 'nanostores'
import type { IPageData } from '../data/data'
import type { IPageInformation } from '../helpers/dataFetcher'

export interface IPagesData {
  pageData: IPageData
  selectedPage: string
  pages: IPageInformation
}

export const $pagesData = map<IPagesData>()

export function setPagesData(id: keyof IPagesData, data: any) {
  const currentData = getPagesData(id)
  if (typeof currentData === 'string') {
    return $pagesData.setKey(id, currentData)
  }

  $pagesData.setKey(id, {
    ...currentData,
    ...data
  })
}

export function getPagesData(id: keyof IPagesData) {
  return $pagesData.get()[id]
}