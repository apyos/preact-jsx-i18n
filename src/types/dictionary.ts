import type { ComponentChildren } from 'preact'

export type Pluralization = {
	none: DictionaryValue
	one?: DictionaryValue
	many: DictionaryValue
}

export type DictionaryValue = Dictionary | ComponentChildren | Pluralization
export type Dictionary = { [key: string]: DictionaryValue }
