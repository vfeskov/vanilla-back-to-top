## Other ways to install

If you don't want to rely on [unpkg.com](https://unpkg.com/#/about), save [the file](https://unpkg.com/vanilla-back-to-top@7.1.1/dist/vanilla-back-to-top.min.js) to your project and serve it from your server:
```html
<script src="/assets/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>
```

You can also install the package via npm and import it into your bundle:
```bash
npm install --save vanilla-back-to-top
```
```js
import { addBackToTop } from 'vanilla-back-to-top'
addBackToTop()
```

## CSS

Use `#back-to-top` selector to override:

```css
#back-to-top {
  background-image: url(back-to-top.png)
}
@media screen and (max-width: 479px) {
  #back-to-top {
    right: 10px;
    bottom: 10px;
  }
}
```

## Examples

<img src="https://i.pi.gy/j3GO0.png" width="68" />

```js
addBackToTop({
  backgroundColor: 'pink',
  textColor: '#ad19b7'
})
```

<img src="https://i.pi.gy/30OGz.png" width="50" />

```js
addBackToTop({
  size: 40
})
```

<img src="https://i.pi.gy/YnL8p.png" width="65" />

```js
addBackToTop({
  innerHTML: '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z"/><path fill="#fff" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>'
});
```

## All arguments

```js
addBackToTop({
  id: 'back-to-top',
  showWhenScrollTopIs: 1, // px
  onClickScrollTo: 0, // px
  scrollDuration: 100, // ms
  innerHTML = '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>', // https://material.io/icons/#ic_keyboard_arrow_up
  diameter: 56, // px
  cornerOffset: 20, // px
  backgroundColor: '#000',
  textColor: '#fff',
  zIndex: 1
})
```

----------


[&#9733; Star me on GitHub](https://github.com/vfeskov/vanilla-back-to-top)
