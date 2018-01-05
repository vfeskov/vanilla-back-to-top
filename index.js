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
      scrollContainer = document.documentElement,
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

    scrollEventTarget().addEventListener('scroll', adapt)
    adapt()

    function adapt () {
      scrollContainer.scrollTop >= showWhenScrollTopIs ?
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

    function scrollEventTarget () {
      return scrollContainer === document.documentElement ? window : scrollContainer
    }

    function appendElement () {
      const upEl = document.createElement('div')
      upEl.id = id
      upEl.className = 'hidden'
      const upLinkEl = document.createElement('a')
      upLinkEl.addEventListener('click', event => {
        event.preventDefault()
        scrollUp()
      })
      upLinkEl.appendChild(innerElement)
      upEl.appendChild(upLinkEl)
      document.body.appendChild(upEl)
      return upEl
    }

    function appendStyles () {
      const fontSize = Math.round(0.64 * size)
      const lineHeight = Math.round(1.28 * size)
      const styles = /*css*/`
        #${id} {
          bottom: ${cornerOffset}px;
          opacity: 1;
          position: fixed;
          right: ${cornerOffset}px;
          transition: bottom 0.2s, opacity 0.2s;
          z-index: ${zIndex};
        }
        #${id}.hidden {
          bottom: -${size}px;
          opacity: 0;
        }
        #${id} a {
          background: ${backgroundColor};
          border-radius: ${size}px;
          color: ${textColor};
          cursor: pointer;
          display: block;
          font-family: monospace;
          font-size: ${fontSize}px;
          height: ${size}px;
          line-height: ${lineHeight}px;
          text-align: center;
          text-decoration: none;
          vertical-align: middle;
          width: ${size}px;
        }
      `
      const styleEl = document.createElement('style')
      styleEl.appendChild(document.createTextNode(styles))
      document.head.insertAdjacentElement('afterbegin', styleEl)
    }

    function scrollUp () {
      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        scrollContainer.scrollTop = onClickScrollTo
      }
      const start = performance.now()
      const initScrollTop = scrollContainer.scrollTop
      const pxsToScrollBy = initScrollTop - onClickScrollTo

      requestAnimationFrame(step)

      function step (timestamp) {
        const delta = timestamp - start
        const progress = Math.min(delta / scrollDuration, 1)
        scrollContainer.scrollTop = initScrollTop - Math.round(progress * pxsToScrollBy)
        if (progress < 1) { requestAnimationFrame(step) }
      }
    }
  }
  // FUNCTION END
}))
