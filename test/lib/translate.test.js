import translate from '../../src/lib/translate'

describe('translate()', () => {
	it('should use correct pluralization', () => {
		const value = {
			none: 'none',
			one: 'one',
			many: 'many',
		}

		expect(translate(value, 0)).toBe('none')
		expect(translate(value, 1)).toBe('one')
		expect(translate(value, 2)).toBe('many')
		expect(translate(value, 10)).toBe('many')
	})

	it('should work with plural key without pluralization object', () => {
		const value = 'text'

		expect(translate(value, 0)).toBe('text')
		expect(translate(value, 1)).toBe('text')
		expect(translate(value, 2)).toBe('text')
		expect(translate(value, 10)).toBe('text')
	})
})
