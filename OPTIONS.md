# All options

None of them are required, call `addBackToTop()` without params to get nice default looks

```js
addBackToTop({
  id: 'back-to-top',
  scrollContainer: 'body',  // selector string or DOMElement
  showWhenScrollTopIs: 1, // px
  onClickScrollTo: 0, // px
  scrollDuration: 100, // ms
  innerHTML: '<strong>Go Up</strong>',
  diameter: 56, // px
  cornerOffset: 20, // px
  backgroundColor: '#000',
  textColor: '#fff',
  zIndex: 1
})
```
