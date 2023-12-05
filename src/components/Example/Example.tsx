import { useState } from 'react'
import EditorModal from '../EditorModal.tsx'

export default function Example({
	text: initialText,
	id,
	edit = false,
}: {
	text: string
	id: string
	edit: boolean
}) {
	const [text, setText] = useState(initialText)

	const elementProps = {
		text: {
			friendlyName: 'Text',
			value: text
		}
	}

	return (
		<>
			<div>{text}{edit && <EditorModal id={id} elementProps={elementProps}/>}</div>
		</>
	);
}
