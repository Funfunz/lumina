import EditorInput from './EditorInput.tsx'
import './editorModal.css'
import { useCallback } from 'react'

interface Props {
	id: string
  elementProps?: {
    [key: string]: {
      value: unknown
      friendlyName?: string
    }
  }
  setComponentData: (id: string, data: Record<string, unknown>) => void
}


export default function EditorModal({id, elementProps, setComponentData}: Props) {
  const formId = `dialog_form_${id}`
  const dialogId = `dialog_${id}`

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const jsonData = Object.fromEntries(formData)
      setComponentData(id, jsonData)
      window[dialogId].close()
    }, []
  )

  const handleEditClick = useCallback(
    () => {
      window[dialogId].showModal()
    }, [dialogId]
  )

  const handleOutsideClick = useCallback(
    () => {
      window[dialogId].close()
    }, [dialogId]
  )

  const handleContainerClick = useCallback(
    (e) => {
      e.stopPropagation()
    }, [dialogId]
  )
  return (
    <>
      <button className="dialog-open" onClick={handleEditClick}>
        Edit
      </button>
      <dialog id={dialogId} onClick={handleOutsideClick}>
        <div onClick={handleContainerClick} className="dialog-container">
          Data editor
          <form className="editor-form" id={formId} onSubmit={handleOnSubmit}>
            {Object.entries(elementProps).map(
              (elementProp) => (
                <EditorInput
                  key={elementProp[0]}
                  name={elementProp[0]}
                  friendlyName={elementProp[1].friendlyName || elementProp[0]}
                  value={elementProp[1].value}
                />
              )
            )}
            <input type="submit" value="save"/>
          </form>
        </div>
      </dialog>
    </>
  )
}
