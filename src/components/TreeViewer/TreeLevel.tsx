import { useCallback } from "react"
import type { IComponentData } from "../../data/data"

interface Props {
  toRender: IComponentData[]
}

export function TreeLevel({toRender}: Props) {
  const handleMoveUpClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert(`moveUp, ${component.id}`)
    }, [parent]
  )
  const handleMoveDownClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert(`moveDown, ${component.id}`)
    }, [parent]
  )
  const handleCreateClick = useCallback(
    (component: IComponentData): React.MouseEventHandler<HTMLButtonElement> => (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert(`create, ${component.id}`)
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
        </li>
      ))}
    </ul>
  )
}