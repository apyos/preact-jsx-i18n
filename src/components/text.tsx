import { useContext } from 'preact/hooks'
import dlv from 'dlv'

import { Context } from './provider'
import translate from '../lib/translate'

import type { ComponentChildren, VNode } from 'preact'

export type TextProps = {
	id: string
	plural: number
	children: ComponentChildren
	[key: string]: any
}

export const Text = ({
	id,
	plural,
	children,
	...props
}: TextProps): VNode<any> => {
	const definitions = useContext(Context)
	const value = translate(id && dlv(definitions, id), plural)
	return (typeof value === 'function' ? value(props) : value) || children
}
