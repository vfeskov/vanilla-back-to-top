# Vanilla Back To Top
[![npm version](https://badge.fury.io/js/vanilla-back-to-top.svg)](https://badge.fury.io/js/vanilla-back-to-top)
[![License](https://img.shields.io/npm/l/vanilla-back-to-top.svg)](https://github.com/vfeskov/vanilla-back-to-top/blob/master/LICENSE)
[![Dependency Status](https://img.shields.io/david/vfeskov/vanilla-back-to-top.svg)](https://github.com/vfeskov/vanilla-back-to-top/blob/master/package.json)
[![File Size](	https://img.shields.io/github/size/vfeskov/vanilla-back-to-top/dist/vanilla-back-to-top.min.js.gz.svg)](https://github.com/vfeskov/vanilla-back-to-top/blob/master/dist/vanilla-back-to-top.min.js.gz)
[![Downloads](https://img.shields.io/npm/dm/vanilla-back-to-top.svg)](https://www.npmjs.com/package/vanilla-back-to-top)

Tiny and configurable Back To Top button with no dependencies that will work for [basically all users in the world](http://browserl.ist/?q=explorer+%3E%3D9%2Cexplorermobile+%3E%3D10%2Cedge+%3E%3D12%2Cfirefox+%3E%3D2%2Cfirefoxandroid+%3E%3D2%2Cchrome+%3E%3D4%2Csafari+%3E%3D5.1%2Copera+%3E%3D11.5%2Coperamobile+%3E%3D12%2Cchromeandroid+%3E%3D4%2Cios+%3E%3D7.1%2Cucandroid+%3E%3D11.4%2Candroid+%3E%3D3%2Csamsung+%3E%3D4%2Cblackberry+%3E%3D7)

Works universally great **with** frameworks - [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/) etc, and **without** them, e.g., on pre-rendered static websites like [Jekyll](https://jekyllrb.com), [Hugo](http://gohugo.io/) or [Hexo](https://hexo.io/)

<img src="https://i.pi.gy/Vab3n.gif" width="300px"/>

Just the button: <img src="https://i.pi.gy/xkg2d.gif" width="98px"/>

## How to use

### Global declaration

This is the simplest way to use it, works great with classic non modular JavaScript.

Add this to your HTML:
```html
<script src="https://unpkg.com/vanilla-back-to-top@6.0.1/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>
```

If you don't want to rely on [unpkg.com](https://unpkg.com/#/about), save [the file](https://unpkg.com/vanilla-back-to-top@6.0.1/dist/vanilla-back-to-top.min.js) to your project and serve it from your server:
```html
<script src="/assets/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>
```

### Isolated UMD module

This is how you would use it with a modular app, e.g., with [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/) etc

Install the package with npm:
```bash
npm install --save vanilla-back-to-top
```
Import it as ES6, Node.js or RequireJS module, for example:
```js
import { addBackToTop } from 'vanilla-back-to-top'
addBackToTop()
// your Vue/React/Angular/etc bootstrapping code here
```

## Styling

You can change the looks of the button using `#back-to-top` selector in your CSS:
```css
#back-to-top {
  text-indent: -9999px;
  background-image: url(back-to-top.png)
}
@media screen and (max-width: 479px) {
  #back-to-top {
    right: 10px;
    bottom: 10px;
  }
}
```

## Examples of some options

In addition to styling with CSS, you can call `addBackToTop` function with many [options](#options), these are some examples:

- Change colors: <img src="https://i.pi.gy/GYQNv.png" width="65" />
```js
addBackToTop({
  backgroundColor: 'pink',
  textColor: '#ad19b7'
})
```

- Change size: <img src="https://i.pi.gy/drmp0.png" width="48" />
```js
addBackToTop({
  size: 40
})
```

- Use [SVG icon](https://material.io/icons/#ic_arrow_upward) instead of `^` character: <img src="https://i.pi.gy/YnL8p.png" width="65" />
```js
var backToTopSvg = document.createElement('span');
backToTopSvg.innerHTML = '<svg height="100%" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z"/><path fill="#fff" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>';
addBackToTop({
  innerElement: backToTopSvg
});
```

## <a id="options"></a>All options

These are all the options you can possibly provide to `addBackToTop` function:
```js
// the values are also the default ones, so the call is equivalent to addBackToTop()
addBackToTop({
  id: 'back-to-top',
  showWhenScrollTopIs: 1, // px
  onClickScrollTo: 0, // px
  scrollDuration: 100, // ms
  innerElement: document.createTextNode('^'),
  size: 56, // px
  cornerOffset: 20, // px
  backgroundColor: '#000',
  textColor: '#fff',
  zIndex: 1
})
```

|Option|Description|
|-|-|
|`id`|id attribute of the button|
|`showWhenScrollTopIs`|Show the button when page got scrolled by this number of pixels|
|`onClickScrollTo`|Where to scroll to, in pixels, when the button gets clicked, `0` means the very top|
|`scrollDuration`|How long, in milliseconds, scrolling to top should take. Set to `0` to make scrolling instant|
|`innerElement`|DOM element to put inside the button; with jQuery you can put something like this: `$('<svg>...</svg>').get(0)`|
|`size`|Width and height of the button in pixels|
|`cornerOffset`|Right and bottom offset of the button relative to viewport|
|`backgroundColor`|Background color of the button|
|`textColor`|Text color of the button|
|`zIndex`|z-index of the button|

### [&#9733; Star me on GitHub](https://github.com/vfeskov/vanilla-back-to-top)
