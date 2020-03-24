import { IntlProvider, Text } from '../src'

describe('preact-localization', () => {
	it('should export things', () => {
		expect(typeof IntlProvider).toBe('function')
		expect(typeof Text).toBe('function')
	})
})
