import { useCallback, useEffect, useRef } from "react"
import { reactComponents, astroComponents } from "../components"
import './TreeLevel.css'
import { addComponent } from "../../store/pagesData"


interface Props {
  friendlyName: string
  id: string
  open: boolean
}

export const TreeLevelDialog = ({ friendlyName, id, open }: Props) => {
  
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (open) {
        dialogRef.current.showModal()
      }
    }, [open]
  )

	const handleDialogOutsideClick = (e) => {
		if (e.target === dialogRef.current) dialogRef.current.close()
	}

  const handleSaveClick = useCallback(
    () => {
      console.log({
        friendlyName: inputRef.current.value,
        type: selectRef.current.selectedOptions[0]
      })
      addComponent({
        friendlyName: inputRef.current.value,
        type: selectRef.current.selectedOptions[0].value
      }, id)
      dialogRef.current.close()
    }, [id]
  )

  return (
    <dialog className="treelevel-dialog" ref={dialogRef} onClick={handleDialogOutsideClick}>
      <h1>
        Add component inside {friendlyName}
      </h1>
      <div className="form-container">
        <label className="form-item" htmlFor="friendlyName">
          <input ref={inputRef} placeholder="Component name" type="text" name="friendlyName" id="friendlyName"/>
        </label>
        <label className="form-item" htmlFor="component">
          Select a component
          <select ref={selectRef} name="component" id="component">
            {[...Object.keys(reactComponents), ...Object.keys(astroComponents)].sort().map(
              (componentName) => (<option value={componentName}>{componentName}</option>)
            )}
          </select>
        </label>
        <div className="action-bar">
          <button className="button" onClick={handleSaveClick}>Save</button>
          <button className="button">Cancel</button>
        </div>
      </div>
    </dialog>
  )
}