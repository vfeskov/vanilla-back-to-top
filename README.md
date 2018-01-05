# Vanilla Back To Top

Tiny and configurable Back To Top button with no dependencies that will work for [basically all users in the world](http://browserl.ist/?q=explorer+%3E%3D10%2Cexplorermobile+%3E%3D10%2Cedge+%3E%3D0%2Cfirefox+%3E%3D2%2Cfirefoxandroid+%3E%3D57%2Cchrome+%3E%3D4%2Csafari+%3E%3D5.1%2Copera+%3E%3D12.1%2Coperamobile+%3E%3D12.1%2Cchromeandroid+%3E%3D62%2Cios+%3E%3D7.1%2Cucandroid+%3E%3D11.4%2Candroid+%3E%3D4.4%2Csamsung+%3E%3D4%2Cblackberry+%3E%3D7)

Works great **with** frameworks - [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/) etc, and **without** them, e.g., on pre-rendered static websites like [Jekyll](https://jekyllrb.com), [Hugo](http://gohugo.io/) or [Hexo](https://hexo.io/)

<img src="https://i.pi.gy/Vab3n.gif" width="300px"/>

Just the button: <img src="https://i.pi.gy/xkg2d.gif" width="98px"/>

## How to use

### Global declaration

This is the simplest way to use it, works great with classic non modular JavaScript.

Add this to your HTML:
```html
<script src="https://unpkg.com/vanilla-back-to-top@5.0.0/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>
```

If you don't want to rely on [unpkg.com](https://unpkg.com/#/about), save [the file](https://unpkg.com/vanilla-back-to-top@5.0.0/dist/vanilla-back-to-top.min.js) to your project and serve it from your server:
```html
<script src="/assets/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>
```

### Isolated UMD module

This is how you would use it with a modular app, e.g., on [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/) etc

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
#back-to-top a {
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

## Examples

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

- Use [SVG icon](https://material.io/icons/#ic_keyboard_arrow_up) instead of `^` character: <img src="https://i.pi.gy/O1Ggw.png" width="66" />
```js
var backToTopSvg = document.createElement('span');
backToTopSvg.innerHTML = '<svg height="100%" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="white"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>';
addBackToTop({
  innerElement: backToTopSvg
});
```

## All options

`addBackToTop` function can be called with many options:
```js
addBackToTop({
  id: 'back-to-top',
  showWhenScrollTopIs: 1,
  onClickScrollTo: 0,
  scrollDuration: 100,
  innerElement: document.createTextNode('^'),
  size: 56,
  cornerOffset: 20,
  backgroundColor: '#000',
  textColor: '#fff',
  zIndex: 1,
  scrollContainer: document.documentElement
})
```
^ All these are also default values.

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
|`scrollContainer`|If only part of your website gets scrolled, e.g., when your sidebar never scrolls with content, put the scrolled DOM element here|

### [&#9733; Star me on GitHub](https://github.com/vfeskov/vanilla-back-to-top)
