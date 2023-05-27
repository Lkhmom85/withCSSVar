withCSSVar
===

`withCSSVar` is a simple helper to access/modify css variables in your code

How to use:
---
install via npm or yarn
`npm i with-css-var` or `yarn i with-css-var`

Just import and use it:

```
import withCSSVar from 'with-css-var';

//default invocation will look for root css variables
const vars = withCSSVar()

// look up variable using standard JS camelCase 
vars.marginRight // returns the content of --margin-right
vars.backgroundColor // returns the content of --background-color

```
css variables are always strings; in case of an undefined css variable it will return empty string.

you can pass a selector to retrieve an element specific css variable:

```
withCSSVar('section#two').backgroundColor
```

