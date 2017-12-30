function addBackToTop ({
  id = 'back-to-top',
  scrollContainer = document.documentElement,
  showWhenScrollTopIs = 300,
  onClickScrollTo = 0,
  innerElement = document.createTextNode('Up'),
  size = 50,
  fontSize = 14,
  cornerOffset = 20,
  backgroundColor = '#000',
  textColor = '#fff',
  zIndex = 1
}) {
  appendStyles()
  const upEl = appendElement()

  let hidden
  hide()

  scrollEventTarget().addEventListener(() => {
    scrollContainer.scrollTop >= showWhenScrollTopIs ?
      show() :
      hide()
  })

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
    const upLinkEl = document.createElement('a')
    upLinkEl.addEventListener('click', event => {
      event.preventDefault()
      scrollContainer.scrollTop = onClickScrollTo
    })
    upLinkEl.appendChild(innerElement)
    upEl.appendChild(upLinkEl)
    document.body.appendChild(upEl)
    return upEl
  }

  function appendStyles () {
    const styles = /*minifyCss*/`
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
        align-items: center;
        background: ${backgroundColor};
        border-radius: ${size}px;
        color: ${textColor};
        display: flex;
        font-size: ${fontSize}px;
        height: ${size}px;
        justify-content: center;
        text-decoration: none;
        width: ${size}px;
      }
    `
    const styleEl = document.createElement('style')
    styleEl.appendChild(document.createTextNode(styles))
    document.head.insertAdjacentElement('afterbegin', styleEl)
  }
}
