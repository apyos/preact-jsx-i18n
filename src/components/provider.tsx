import { createContext } from 'preact'
import type { ComponentChildren, VNode } from 'preact'
import type { Dictionary } from '../types/dictionary'

export type IntlProviderProps = {
	children: ComponentChildren
	dictionary: Dictionary
}

export const Context = createContext<Dictionary>({})
export const IntlProvider = ({
	children,
	dictionary,
}: IntlProviderProps): VNode<any> => (
	<Context.Provider value={dictionary} children={children} />
)
