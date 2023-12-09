import { useStore } from '@nanostores/react'
import { $pagesData } from '../store/pagesData.ts'
import { useEffect, useState } from 'react'
import type { IComponentData } from '../data/data.ts'

export type TProps = {
	id?: string
  [key: string]: any
}

function findElement (childrens: IComponentData[], targetId: string): IComponentData | undefined {
  return childrens.find(
    (element) => {
      if (element.id === targetId) {
        return element
      }
      if (element.children) {
        return findElement(element.children, targetId)
      }
      return false
    }
  )
}

export default function ReactRenderer({id, ...rest}: TProps) {

  const [order, setOrder] = useState([])
  const pagesData = useStore($pagesData)
  useEffect(
    () => {
      console.log({id, pagesData})
      if (!id) {
        setOrder(pagesData.pageData.children.sort(
          (a, b) => a.order - b.order 
        ).map(
          (element) => {
            return element.id
          }
        ))
      } else {
        const element = findElement(pagesData.pageData.children, id)
        console.log({element})
        setOrder(element.children.sort(
          (a, b) => a.order - b.order 
        ).map(
          (element) => {
            return element.id
          }
        ))
      }
    }, [pagesData]
  )
  console.log({
    id, order , rest, "slot_grid1": rest.slot_grid1
  })
	return (
    <>
      {order.map(
        (elementId) => rest['slot_' + elementId]
      )}
    </>
  )
}
