import EditorInput from './EditorInput.astro'
import { Icon } from 'astro-icon'
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
}


export default function EditorModal({id, elementProps}: Props) {
  const formId = `dialog_form_${id}`
  const dialogId = `dialog_${id}`

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const jsonData = Object.fromEntries(formData)
      console.log(jsonData)
      window[dialogId].close()
    }, []
  )
  return (
    <>
      <button className="dialog-open" onClick={() => { window[dialogId].showModal()}}>
        <Icon name="mdi:edit" />
      </button>
      <dialog id={dialogId}>
        <div data-dialog-container className="dialog-container">
          Data editor
          <form className="editor-form" id={formId} onSubmit={handleOnSubmit}>
            {Object.entries(elementProps).map(
              (elementProp) => (
                <EditorInput
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
