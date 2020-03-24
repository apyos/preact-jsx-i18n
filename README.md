# preact-jsx-i18n 🌎 [![npm](https://img.shields.io/npm/v/preact-jsx-i18n.svg?style=flat)](https://npm.im/preact-jsx-i18n) [![travis](https://travis-ci.org/apyos/preact-jsx-i18n.svg?branch=master)](https://travis-ci.org/apyos/preact-jsx-i18n) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fapyos%2Fpreact-jsx-i18n.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fapyos%2Fpreact-jsx-i18n?ref=badge_shield)

**Localization for Preact using JSX components**

This library makes it possible to use JSX components as localization inputs. This may seem messy, but is actually very useful in practice. For simple JSON texts with variables that render to strings, [preact-localization](https://github.com/apyos/preact-localization) or [preact-i18n](https://github.com/synacor/preact-i18n) are still options.

This tool is particularly interesting when used in conjunction with [string-to-jsx-loader](https://github.com/apyos/string-to-jsx-loader). The two tools combined provide a good compromise between simple translation files and flexibility.

## Install

```
$ npm install -S preact-jsx-i18n
```

## Getting Started

1. Create a dictionary. Typically JSON files, we'll call ours `fr.js`:

```jsx
module.exports = {
	news: {
		title: <b>Nouvelles du Monde</b>,
		totalStories: {
			none: [<i>Aucun</i>, ' article'],
			one: 'Un article',
			many: ({ count }) => [count, 'articles'],
		},
	},
}
```

2. Expose the dictionary to your whole app via `<IntlProvider>`:

```jsx
import { IntlProvider } from 'preact-jsx-i18n'
import dictionary from './fr'

render(
	<IntlProvider dictionary={dictionary}>
		<App />
	</IntlProvider>
)
```

3. Use `<Text />` to translate string literals:

```jsx
import { Text } from 'preact-jsx-i18n'

// Assume the "stories" prop is a list of news stories.
const App = ({ stories = [] }) => (
	<div class="app">
		<h1>
			{/* Default fallback text example: */}
			<Text id="news.title">World News</Text>
		</h1>
		<footer>
			{/* Pluralization example: */}
			<Text
				id="news.totalStories"
				plural={stories.length}
				count={stories.length}
			/>
		</footer>
	</div>
)
```

That's it!

### JSX

As seen in the examples, the `dictionary` can either:

- Be a single JSX component
- Be a single string
- Be an array of JSX components and strings

If the text requires a variable, a function needs to be returned.

### Fallback Text

Rendering our example app with an empty dictionary _(or without the Provider)_ will attempt to use any text contained within `<Text>..</Text>` as fallback text.

In our example, this would mean rendering without a dictionary for `news.title` would produce `<h1>World News</h1>`.

If we provide a dictionary that has a `title` key inside a `news` object, that value will be rendered instead.

### Pluralization and Templating

In our example, `<footer>` is using `<Text>` as a convenient way to do pluralization and templating. In our dictionary, `news.totalStories` is an Object with pluralization keys. The values in that object will be selected based on an integer `plural` prop passed to `<Text>`.

Any dictionary value _(including pluralization values)_ can contain arbitrary JSX, or a function with variables that returns JSX. These placeholders get replaced with matched keys in an object passed as the `fields` prop. In our example, the "many" plural form is such a template - it will render `"5 articles"` when `count={5}`.

The available forms for specifying pluralization values are as follows:

- `"key": { "none": "no apples", "one": "apple", "many": "apples" }`

Taking `<Text id="news.totalStories" ..>` from our example:

- `<.. plural={0}>` renders `Aucun article` _(no articles)_
- `<.. plural={1}>` renders `Un article` _(one article)_
- `<.. plural={2} count={2}>` renders `2 articles`
- `<.. plural={3} count={3}>` renders `3 articles`

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fapyos%2Fpreact-jsx-i18n.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fapyos%2Fpreact-jsx-i18n?ref=badge_large)
