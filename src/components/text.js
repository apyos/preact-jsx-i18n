import { Fragment, h } from 'preact'
import { useContext } from 'preact/hooks'
import dlv from 'dlv'

import { Context } from './provider'
import translate from '../lib/translate'

export const Text = ({ id, plural, children, ...props }) => {
	const definitions = useContext(Context)
	const value = translate(id && dlv(definitions, id), plural)
	return (
		<Fragment>
			{(typeof value === 'function' ? value(props) : value) || children}
		</Fragment>
	)
}
