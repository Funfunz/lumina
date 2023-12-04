import data from '../data/data.json'
import type { IData } from "../data/data"

export async function getPageData(pageName: string) {
  return (data as IData)[pageName || 'homeroot']
}

export async function getPages() {
  return Object.keys(data)
}