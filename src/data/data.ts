export interface IComponentProps  {
  [key: string]: string | number
}

export interface IComponentData {
  type: string,
  id: string,
  friendlyName: string,
  order: number,
  children?: IComponentData[],
  props?: IComponentProps
}

export interface IPageData {
  children: IComponentData[]
}

export interface IData {
  [key: string]: IPageData
}