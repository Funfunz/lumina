import { useStore } from '@nanostores/react'
import { $pagesData } from '../store/pagesData.ts'
import { cloneElement, useEffect, useState } from 'react'
import type { IComponentData } from '../data/data.ts'
import { templates } from './templates.ts'

export type TProps = {
	id?: string
  [key: string]: any
}

function findElement (childrens: IComponentData[], targetId: string): IComponentData | undefined {
  let found: IComponentData | undefined
  const result = childrens.find(
    (element) => {
      if (element.id === targetId) {
        found = element
        return element
      }
      if (element.children) {
        found = findElement(element.children, targetId)
        return found
      }
      return false
    }
  )
  return found
}

const newElements = {}

export default function ReactRenderer({id, ...rest}: TProps) {
  const [order, setOrder] = useState<IComponentData[]>([])
  const pagesData = useStore($pagesData)
  Object.keys(rest).map(
    (key) => {
      if (key.indexOf("slot_astro_") === 0 || key.indexOf("slot_react_") === 0) {
        templates[key.replace("slot_astro_", "").replace("slot_react_", "")] = rest[key]
      }
    }
  )
  useEffect(
    () => {
      if (!id) {
        setOrder([...pagesData.pageData.children].sort(
          (a, b) => a.order - b.order 
        ).map(
          (element) => {
            return {...element}
          }
        ))
      } else {
        const element = findElement(pagesData.pageData.children, id)
        if (!element.children?.length) {
          setOrder([])
        } else {
          setOrder([...element.children].sort(
            (a, b) => a.order - b.order 
          ).map(
            (element) => {
              return {...element}
            }
          ))
        }
      }
    }, [pagesData]
  )
	return order.map(
    (element) => {
      if (rest['slot_' + element.id]) {
        return rest['slot_' + element.id]
      } else if(newElements[element.id]) {
        return newElements[element.id]
      } else if(templates[element.type]) {
        newElements[element.id] = cloneElement(templates[element.type])
        return newElements[element.id]
      }
    }
  )
}
