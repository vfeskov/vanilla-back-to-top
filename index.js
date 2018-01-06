(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['exports'], factory)
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
      factory(exports)
  } else {
      factory((root.commonJsStrict = {}))
  }
}(typeof self !== 'undefined' ? self : this, function (exports) {
  exports.addBackToTop = addBackToTop
  // FUNCTION START
  function addBackToTop (params = {}) {
    const {
      id = 'back-to-top',
      showWhenScrollTopIs = 1, // px
      onClickScrollTo = 0, // px
      scrollDuration = 100, // ms
      innerElement = document.createTextNode('^'),
      size = 56, // px
      cornerOffset = 20, // px
      backgroundColor = '#000',
      textColor = '#fff',
      zIndex = 1
    } = params

    appendStyles()
    const upEl = appendElement()
    let hidden = true

    window.addEventListener('scroll', adapt)
    adapt()

    function adapt () {
      getScrollTop() >= showWhenScrollTopIs ?
        show() :
        hide()
    }

    function show () {
      if (!hidden) { return }
      upEl.className = ''
      hidden = false
    }

    function hide () {
      if (hidden) { return }
      upEl.className = 'hidden'
      hidden = true
    }

    function appendElement () {
      const upEl = document.createElement('div')
      upEl.id = id
      upEl.className = 'hidden'
      upEl.appendChild(innerElement)
      upEl.addEventListener('click', event => {
        event.preventDefault()
        scrollUp()
      })
      document.body.appendChild(upEl)
      return upEl
    }

    function appendStyles () {
      const fontSize = Math.round(0.43 * size)
      const lineHeight = Math.round(1.21 * size)
      const styles = /*css*/`
        #${id} {
          background: ${backgroundColor};
          border-radius: ${size}px;
          bottom: ${cornerOffset}px;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
          color: ${textColor};
          cursor: pointer;
          display: block;
          font-family: "Courier New", Courier, monospace;
          font-size: ${fontSize}px;
          height: ${size}px;
          line-height: ${lineHeight}px;
          opacity: 1;
          outline: none;
          position: fixed;
          right: ${cornerOffset}px;
          -webkit-tap-highlight-color: transparent;
          text-align: center;
          text-decoration: none;
          -webkit-touch-callout: none;
          transition: bottom 0.2s, opacity 0.2s;
          user-select: none;
          vertical-align: middle;
          width: ${size}px;
          z-index: ${zIndex};
        }
        #${id}.hidden {
          bottom: -${size}px;
          opacity: 0;
        }
      `
      const styleEl = document.createElement('style')
      styleEl.appendChild(document.createTextNode(styles))
      document.head.insertAdjacentElement('afterbegin', styleEl)
    }

    function scrollUp () {
      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        return setScrollTop(onClickScrollTo)
      }
      const start = performance.now()
      const initScrollTop = getScrollTop()
      const pxsToScrollBy = initScrollTop - onClickScrollTo

      requestAnimationFrame(step)

      function step (timestamp) {
        const delta = timestamp - start
        const progress = Math.min(delta / scrollDuration, 1)
        setScrollTop(initScrollTop - Math.round(progress * pxsToScrollBy))
        if (progress < 1) { requestAnimationFrame(step) }
      }
    }

    function getScrollTop () {
      return window.scrollY || window.pageYOffset || document.body.scrollTop || (document.documentElement && document.documentElement.scrollTop || 0)
    }

    function setScrollTop (value) {
      document.body.scrollTop = document.documentElement.scrollTop = value
    }
  }
  // FUNCTION END
}))
