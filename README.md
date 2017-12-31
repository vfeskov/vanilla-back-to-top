# Vanilla Back To Top

Configurable zero dependency Back To Top button that will work for [over 95% of all users](http://browserl.ist/?q=ie+%3E%3D10%2Cedge+%3E%3D15%2Cfirefox+%3E%3D28%2Cchrome+%3E%3D21%2Csafari+%3E%3D6.1%2Copera+%3E%3D15%2Cios+%3E%3D7.1%2Candroid+%3E%3D4.4%2C%3E%3D0.5%25) worldwide.

Ideal for pre-rendered blogs with no frameworks, e.g., [Hexo](https://hexo.io/).

<img src="http://i.pi.gy/DoaQa.gif" width="300px"/>

## How to use

Add this to your HTML:
```
<script src="https://unpkg.com/vanilla-back-to-top@2.0.1/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop({})</script>
```

Optionally customise CSS of the button using `#back-to-top` selector, e.g.:
```
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

## Options

`addBackToTop` function accepts many options, e.g.:
```
addBackToTop({
  id: 'back-to-top',
  showWhenScrollTopIs: 300,
  onClickScrollTo: 0,
  innerElement: document.createTextNode('Up'),
  size: 50,
  fontSize: 14,
  cornerOffset: 20,
  backgroundColor: '#000',
  textColor: '#fff',
  zIndex: 1,
  scrollContainer: document.documentElement
})
```
^ All these are also default values.

- `id` - id attribute of the button
- `showWhenScrollTopIs` - show the button when page got scrolled by this number of pixels
- `onClickScrollTo` - where to scroll to when the button gets clicked, `0` means the very top
- `innerElement` - DOM element to put inside the button; with jQuery you can put something like this: `$('<svg>...</svg>').get(0)`
- `size` - width and height of the button in pixels
- `fontSize` - font size of the text inside the button
- `cornerOffset` - right and bottom offset of the button relative to viewport
- `backgroundColor` - background color of the button
- `textColor` - text color of the button
- `zIndex` - z-index of the button
- `scrollContainer` - if only part of your website gets scrolled, e.g., when your sidebar never scrolls with content, put the scrolled DOM element here

## Supported browsers

- IE >=10,
- Edge >=15
- Firefox >=28
- Chrome >=21
- Safari >=6.1
- Opera >=15
- iOS Safari >=7.1
- Android Browser >=4.4
- All other browsers used by more than 0.5% of users

This gives [95.12% global coverage](http://browserl.ist/?q=ie+%3E%3D10%2Cedge+%3E%3D15%2Cfirefox+%3E%3D28%2Cchrome+%3E%3D21%2Csafari+%3E%3D6.1%2Copera+%3E%3D15%2Cios+%3E%3D7.1%2Candroid+%3E%3D4.4%2C%3E%3D0.5%25).

On Opera Mini and IE 10 the button doesn't appear or disappear as nicely as in other browsers, otherwise it's fully functional.
