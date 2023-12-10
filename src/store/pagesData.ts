import { map } from 'nanostores'
import type { IComponentData, IPageData } from '../data/data'
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

export interface INewComponentData {
  type: string,
  friendlyName: string
}

function newComponentFactory(componentData: INewComponentData, currentComponents: IComponentData[]) {
  return {
    id: `${componentData.type}_${Math.random()}`,
    type: componentData.type,
    friendlyName: componentData.friendlyName,
    order: Math.max(...currentComponents.map((component) => component.order)) + 1,
    children: [],
    props: {}
  }
}

function findAndAddComponent(currentTreeLevel: IPageData | IComponentData, componentData: INewComponentData, parentId: string) {
  return currentTreeLevel.children.find((
    (component) => {
      if (component.id === parentId) {
        console.log({currentTreeLevel, componentid:component.id, parentId})
        component.children.push(newComponentFactory(componentData, currentTreeLevel.children))
        return true
      }
      if (component.children.length) {
        return findAndAddComponent(component, componentData, parentId)
      }
      return false
    }
  ))
}

export function addComponent(componentData: INewComponentData, parentId?: string) {
  let result: unknown = false
  const currentPagesData = getPagesData('pageData') as IPageData
  console.log({parentId, currentPagesData})
  if (parentId === undefined) {
    result = currentPagesData.children.push(newComponentFactory(componentData, currentPagesData.children))
    
  } else {
    result = findAndAddComponent(currentPagesData, componentData, parentId)
  }

  if (result) {
    setPagesData('pageData', currentPagesData)
  }
  return false
}

export function getPagesData(id: keyof IPagesData) {
  return $pagesData.get()[id]
}