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
  'use strict'
  function addBackToTop (params = {}) {
    const {
      backgroundColor = '#000',
      cornerOffset = 20, // px
      diameter = 56, // px
      ease = inOutSine, // any one from https://www.npmjs.com/package/ease-component will do
      id = 'back-to-top',
      innerHTML = '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>', // https://material.io/icons/#ic_keyboard_arrow_up
      onClickScrollTo = 0, // px, or a function returning number
      scrollContainer = document.body, // or a DOM element, e.g., document.getElementById('content')
      scrollDuration = 100, // ms
      showWhenScrollTopIs = 1, // px
      size = diameter, // alias for diameter
      textColor = '#fff',
      zIndex = 1
    } = params

    const scrollContainerIsBody = scrollContainer === document.body
    const scrollDocumentElement = scrollContainerIsBody && document.documentElement

    appendStyles()
    const upEl = appendElement()
    let hidden = true

    const scrollEmitter = scrollContainerIsBody ? window : scrollContainer
    scrollEmitter.addEventListener('scroll', adapt)
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
      upEl.innerHTML = innerHTML
      upEl.addEventListener('click', event => {
        event.preventDefault()
        scrollUp()
      })
      document.body.appendChild(upEl)
      return upEl
    }

    function appendStyles () {
      const svgSize = Math.round(0.43 * size)
      const svgTop = Math.round(0.29 * size)
      const styles = /*css*/`
        #${id} {
          background: ${backgroundColor};
          border-radius: 50%;
          bottom: ${cornerOffset}px;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
          color: ${textColor};
          cursor: pointer;
          display: block;
          height: ${size}px;
          opacity: 1;
          outline: none;
          position: fixed;
          right: ${cornerOffset}px;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          transition: bottom 0.2s, opacity 0.2s;
          user-select: none;
          width: ${size}px;
          z-index: ${zIndex};
        }
        #${id} svg {
          display: block;
          fill: currentColor;
          height: ${svgSize}px;
          margin: ${svgTop}px auto 0;
          width: ${svgSize}px;
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
      const scrollTo = typeof onClickScrollTo === 'function' ? onClickScrollTo() : onClickScrollTo
      const { performance, requestAnimationFrame } = window
      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        return setScrollTop(scrollTo)
      }
      const start = performance.now()
      const initScrollTop = getScrollTop()
      const pxsToScrollBy = initScrollTop - scrollTo

      requestAnimationFrame(step)

      function step (timestamp) {
        const progress = Math.min((timestamp - start) / scrollDuration, 1)
        setScrollTop(initScrollTop - Math.round(ease(progress) * pxsToScrollBy))
        if (progress < 1) { requestAnimationFrame(step) }
      }
    }

    function getScrollTop () {
      return scrollContainer.scrollTop || (scrollDocumentElement && document.documentElement.scrollTop || 0)
    }

    function setScrollTop (value) {
      scrollContainer.scrollTop = value
      if (scrollDocumentElement) {
        document.documentElement.scrollTop = value
      }
    }

    function inOutSine (n) {
      return 0.5 * (1 - Math.cos(Math.PI * n))
    }
  }
  // FUNCTION END
}))
