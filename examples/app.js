new Vue({
  el: '#app',
  data: {
    CURRENT_EXAMPLE_CODE: (() => {
      const { params, styles } = CURRENT_EXAMPLE;
      let result = '<script>addBackToTop(' + (params ? JSON.stringify(params, null, 2) : '') + ')</script>';
      if (styles) {
        result += `\n<style>${styles}</style>`
      }
      return result
    })()
  },
  template: `
    <div>
      <ol>
        <li
          v-for="example in EXAMPLES"
          v-bind:class="{active: example === CURRENT_EXAMPLE}"
        >
          <a v-bind:href="example.href">
            {{ example.label }}
          </a>
        </li>
      </ol>
      <pre><code>{{ CURRENT_EXAMPLE_CODE }}</code></pre>
    </div>
  `
});
