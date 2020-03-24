import { h, render } from 'preact'
import { setupScratch, teardown } from '../_util/helpers'
import { IntlProvider, Text } from '../../src'

const Money = ({ children }) => <span>${children}</span>
const Bold = ({ children }) => <b>{children}</b>

describe('<Text>', () => {
	let scratch

	beforeEach(() => {
		scratch = setupScratch()
	})

	afterEach(() => {
		teardown(scratch)
	})

	it('should fall back if not wrapped in a Provider', () => {
		render(<Text>FOO</Text>, scratch)

		expect(scratch.innerHTML).toBe('FOO')
	})

	it('should render text without scope', () => {
		render(
			<IntlProvider dictionary={{ foo: 'FOO!' }}>
				<div>
					<Text id="foo" />
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML).toBe('<div>FOO!</div>')
	})

	it('should render html markup as string data, not markup', () => {
		render(
			<IntlProvider dictionary={{ foo: '<b>FOO</b>' }}>
				<div>
					<Text id="foo" />
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe('<div>&lt;b&gt;FOO&lt;/b&gt;</div>')
	})

	it('should render default when requested id is not present', () => {
		render(
			<IntlProvider dictionary={{ foo: { bar: 'BAR!' } }}>
				<div>
					<Text id="asdf">DEFAULT</Text>
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe('<div>DEFAULT</div>')
	})

	it('should support a single variable', () => {
		render(
			<IntlProvider dictionary={{ text: ({ variable }) => variable }}>
				<div>
					<Text id="text" variable={200} />
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe('<div>200</div>')
	})

	it('should support variables with text', () => {
		render(
			<IntlProvider
				dictionary={{ text: ({ variable }) => ['Hello ', variable, '!'] }}
			>
				<div>
					<Text id="text" variable="you" />
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe('<div>Hello you!</div>')
	})

	it('should support a single component', () => {
		render(
			<IntlProvider dictionary={{ text: ({ money }) => money }}>
				<div>
					<Text id="text" money={<Money>200</Money>} />
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe('<div><span>$200</span></div>')
	})

	it('should support components with text', () => {
		render(
			<IntlProvider
				dictionary={{
					text: ({ item, money }) => ['The ', item, ' costs ', money, '.'],
				}}
			>
				<div>
					<Text
						id="text"
						item={<Bold>computer</Bold>}
						money={<Money>2000</Money>}
					/>
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe(
			'<div>The <b>computer</b> costs <span>$2000</span>.</div>'
		)
	})

	it('should support components nested in html', () => {
		render(
			<IntlProvider
				dictionary={{
					text: ({ nested, component }) => [
						'This is a ',
						<span>
							<i>{nested}</i> {component}
						</span>,
						'...',
					],
				}}
			>
				<div>
					<Text
						id="text"
						nested={<Bold>nested</Bold>}
						component={<Bold>component</Bold>}
					/>
				</div>
			</IntlProvider>,
			scratch
		)

		expect(scratch.innerHTML, '').toBe(
			'<div>This is a <span><i><b>nested</b></i> <b>component</b></span>...</div>'
		)
	})
})
