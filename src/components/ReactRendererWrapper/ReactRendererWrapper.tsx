import { useStore } from '@nanostores/react'
import { $pagesData } from '../../store/pagesData.ts'
import { useEffect, useState } from 'react'

export type Props = {
	children: JSX.Element
}

export default function ReactRendererWrapper({children}: Props) {
	const [forceUpdate, setForceUpdate] = useState(1)
	const pagesData = useStore($pagesData)
	useEffect(
		() => {
			setForceUpdate(forceUpdate + 1)
		}, [pagesData]
	)
	return (
		<>
			{children}
		</>
	);
}
