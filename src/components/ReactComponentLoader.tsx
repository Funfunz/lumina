import { reactComponents } from "./components"

export type Props = {
	id: string
  edit?: boolean
	type: string
	children: JSX.Element
	[key: string]: any
}

export default function ReactComponentLoader(
  {id, edit, type, children, ...rest}: Props
) {
	const Component = reactComponents[type]
	
	return (
		<Component id={id} edit={edit} {...rest}>
			{children}
		</Component>
	)
}
