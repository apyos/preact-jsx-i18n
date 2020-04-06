export default function translate(value, plural) {
	if ((plural || plural === 0) && value && value.constructor === Object) {
		if (plural === 0) {
			value = value.none
		} else if (plural === 1) {
			value = value.one || value.many
		} else {
			value = value.many
		}
	}

	return value
}
