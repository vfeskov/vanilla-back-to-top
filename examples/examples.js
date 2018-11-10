window.EXAMPLES = [
  {
    href: 'index.html',
    label: 'Default'
  },
  {
    href: '?coral',
    label: 'Coral',
    params: {
      diameter: 56,
      backgroundColor: 'rgb(255, 82, 82)',
      textColor: '#fff'
    }
  },
  {
    href: '?smaller',
    label: 'Smaller',
    params: {
      diameter: 40,
      backgroundColor: '#ddd',
      textColor: 'red'
    }
  },
  {
    href: '?rectangle',
    label: 'Rectangle',
    params: {
      backgroundColor: '#fff',
      innerHTML: 'Back to Top',
      textColor: '#333'
    },
    styles: `
  #back-to-top {
    border: 1px solid #ccc;
    border-radius: 0;
    font-family: sans-serif;
    font-size: 14px;
    width: 100px;
    text-align: center;
    line-height: 30px;
    height: 30px;
  }
`
  },
  {
    href: '?different-arrow',
    label: 'Different arrow',
    params: {
      backgroundColor: '#ffda0c',
      innerHTML: '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
      textColor: '#96071f'
    }
  }
];

window.CURRENT_EXAMPLE = window.EXAMPLES.find(e => e.href === window.location.search) || window.EXAMPLES[0];
