import { useCallback, useRef, useState } from "react"
import type { IComponentData, IPageData } from "../../data/data"
import { getPagesData, setPagesData } from "../../store/pagesData"
import { reactComponents, astroComponents } from "../components"
import './TreeLevel.css'
import { TreeLevelDialog } from "./TreeLevelDialog"


interface Props {
  toRender: IComponentData[]
}

function updateComponentsOrder(pageData: IPageData | IComponentData, component: IComponentData, direction: 'up' | 'down') {
  const currentOrder = component.order
  const found = pageData.children.find(
    (child) => {
      return child.id === component.id
    }
  )
  return {
    ...pageData,
    children: pageData.children.map(
      (child) => {
        if (found) {
          if (child.id === component.id) {
            if (direction === 'up') {
              child.order--
            } else {
              child.order++
            }
          } else {
            if (direction === 'up') {
              if ((child.order + 1) == currentOrder && child.order < pageData.children.length) {
                child.order++
              }
            } else {
              if ((child.order - 1) === currentOrder && child.order > 0) {
                child.order--
              }
            }
          }
          console.log(child)
          return {...child}
          
        }
        
        if (child.children) {
          return updateComponentsOrder(child, component, direction)
        }
        return child
      }
    )
  }
}

export function TreeLevel({toRender}: Props) {
  
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  const handleMoveUpClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      setPagesData('pageData', updateComponentsOrder(getPagesData('pageData') as IPageData, component, 'up'))
    }, [parent]
  )
  const handleMoveDownClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      setPagesData('pageData', updateComponentsOrder(getPagesData('pageData') as IPageData, component, 'down'))
    }, [parent]
  )
  const handleCreateClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsOpen(
        (isOpen) => {
          return {
            ...isOpen,
            [component.id]: !isOpen[component.id]
          }
        }
      )
    }, [parent]
  )
  const handleEditClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert(`edit, ${component.id}`)
    }, [parent]
  )
  const handleDeleteClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert(`delete, ${component.id}`)
    }, [parent]
  )
  return (
    <ul>
      {toRender.sort((a, b) => {
        return a.order - b.order
      }).map((component, index) => (
        <li>
          {component.friendlyName} - {(index > 0) ? (<button onClick={handleMoveUpClick(component)} className="button-arrow-up">&#8593;</button>) : undefined}
          {(index + 1 < toRender.length) ? (<button onClick={handleMoveDownClick(component)} className="button-arrow-down">&#8595;</button>) : undefined}
          <button onClick={handleCreateClick(component)}>+</button>
          <button onClick={handleEditClick(component)} className="button-edit">&#9998;</button>
          <button onClick={handleDeleteClick(component)}>X</button>
          {component.children && (<TreeLevel toRender={component.children}/>)}
          <TreeLevelDialog id={component.id} open={isOpen[component.id]} friendlyName={component.friendlyName}/>
        </li>
      ))}
    </ul>
  )
}