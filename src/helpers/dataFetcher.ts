import data from '../data/data.json'
import type { IData } from "../data/data"

export interface IPageInformation {
  [pageId: string]: {
    slug: string,
    backofficeName: string,
  }
}

export async function getPageData(pageName: string) {
  return (data as IData)[pageName || 'homeroot']
}

export async function getPages() {
  const result: IPageInformation = {}
  Object.keys(data).forEach(
    (pageId) => {
      const {children, ...pageInfo} = data[pageId]
      result[pageId] = {...pageInfo}
    }
  )
  return result
}

export async function getPagesId() {
  return Object.keys(data)
}