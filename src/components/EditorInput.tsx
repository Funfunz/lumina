import EditorInput from './EditorInput.astro'
import './editorModal.css'
import { useCallback } from 'react'

interface Props {
	name: string
  friendlyName: string
  value: unknown
}

function getElementType(value: unknown) {
  switch (typeof value) {
    case 'number':
      return 'number'
    default:
      return 'text'
  }
}

export default function EditorModal({name, friendlyName, value}: Props) {
  return (
    <>
      <label className="input-container" htmlFor={name}>
        <span className="input-name">{friendlyName}</span>
        <input className="input-field" id={name} name={name} type={getElementType(value)} defaultValue={value as string}/>
      </label>
    </>
  )
}
