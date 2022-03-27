import type { DictionaryValue, Pluralization } from '../types/dictionary'

export default function translate(value: DictionaryValue, plural: number) {
	if ((plural || plural === 0) && value && value.constructor === Object) {
		if (plural === 0) {
			value = (value as Pluralization).none
		} else if (plural === 1) {
			value = (value as Pluralization).one || (value as Pluralization).many
		} else {
			value = (value as Pluralization).many
		}
	}

	return value
}
