import { useEffect } from 'react'
import EditorModal from '../Editor/EditorModal.js'
import { useStore } from '@nanostores/react'
import { getComponentData } from './ImageStore.js'
import { setComponentData } from '../../store/main.js'
import './Image.css'

export type TComponentData = {
	src: string
	alt: string
}

export default function Image({
	src: initialSrc,
	alt: initialAlt,
	id,
	friendlyName,
	edit = false,
	children
}: TComponentData & {
	id: string
	friendlyName: string
	edit: boolean
	children: JSX.Element
}) {
	const componentData = useStore(getComponentData<TComponentData>(id))
	useEffect(() => {
		setComponentData(id, {src: initialSrc, alt: initialAlt})
	}, [])

	const elementProps = {
		src: {
			friendlyName: 'Image Url',
			value: componentData?.src || initialSrc
		},
		alt: {
			friendlyName: 'Alternative text',
			value: componentData?.alt || initialAlt
		}
	}

	return (
		<div>
			<img className='custom-image' src={componentData?.src || initialSrc} alt={componentData?.alt || initialAlt}/>
			{edit && <EditorModal id={id} elementProps={elementProps} setComponentData={setComponentData} />}
			{children}
		</div>
	);
}
