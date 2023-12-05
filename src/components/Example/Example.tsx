import { useEffect, useState } from 'react'
import EditorModal from '../EditorModal.tsx'
import { useStore } from '@nanostores/react'
import { getComponentData, setComponentData } from './exampleStore.ts'

export type TComponentData = {
	text: string
}

export default function Example({
	text: initialText,
	id,
	edit = false,
	children
}: {
	text: string
	id: string
	edit: boolean
	children: JSX.Element
}) {
	const componentData = useStore(getComponentData<TComponentData>(id))
	useEffect(() => {
		setComponentData(id, {text: initialText})
	}, [])

	const elementProps = {
		text: {
			friendlyName: 'Text',
			value: componentData?.text || initialText
		}
	}

	return (
		<>
			<div>{componentData?.text || initialText}{edit && <EditorModal id={id} elementProps={elementProps} setComponentData={setComponentData} />}{children}</div>
		</>
	);
}
