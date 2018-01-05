function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.commonJsStrict = {});
  }
})(typeof self !== 'undefined' ? self : this, function (exports) {
  exports.addBackToTop = addBackToTop; // FUNCTION START

  function addBackToTop() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$id = params.id,
        id = _params$id === void 0 ? 'back-to-top' : _params$id,
        _params$scrollContain = params.scrollContainer,
        scrollContainer = _params$scrollContain === void 0 ? document.documentElement : _params$scrollContain,
        _params$showWhenScrol = params.showWhenScrollTopIs,
        showWhenScrollTopIs = _params$showWhenScrol === void 0 ? 1 : _params$showWhenScrol,
        _params$onClickScroll = params.onClickScrollTo,
        onClickScrollTo = _params$onClickScroll === void 0 ? 0 : _params$onClickScroll,
        _params$scrollDuratio = params.scrollDuration,
        scrollDuration = _params$scrollDuratio === void 0 ? 100 : _params$scrollDuratio,
        _params$innerElement = params.innerElement,
        innerElement = _params$innerElement === void 0 ? document.createTextNode('^') : _params$innerElement,
        _params$size = params.size,
        size = _params$size === void 0 ? 56 : _params$size,
        _params$cornerOffset = params.cornerOffset,
        cornerOffset = _params$cornerOffset === void 0 ? 20 : _params$cornerOffset,
        _params$backgroundCol = params.backgroundColor,
        backgroundColor = _params$backgroundCol === void 0 ? '#000' : _params$backgroundCol,
        _params$textColor = params.textColor,
        textColor = _params$textColor === void 0 ? '#fff' : _params$textColor,
        _params$zIndex = params.zIndex,
        zIndex = _params$zIndex === void 0 ? 1 : _params$zIndex;
    appendStyles();
    var upEl = appendElement();
    var hidden = true;
    scrollEventTarget().addEventListener('scroll', adapt);
    adapt();

    function adapt() {
      scrollContainer.scrollTop >= showWhenScrollTopIs ? show() : hide();
    }

    function show() {
      if (!hidden) {
        return;
      }

      upEl.className = '';
      hidden = false;
    }

    function hide() {
      if (hidden) {
        return;
      }

      upEl.className = 'hidden';
      hidden = true;
    }

    function scrollEventTarget() {
      return scrollContainer === document.documentElement ? window : scrollContainer;
    }

    function appendElement() {
      var upEl = document.createElement('div');
      upEl.id = id;
      upEl.className = 'hidden';
      var upLinkEl = document.createElement('a');
      upLinkEl.addEventListener('click', function (event) {
        event.preventDefault();
        scrollUp();
      });
      upLinkEl.appendChild(innerElement);
      upEl.appendChild(upLinkEl);
      document.body.appendChild(upEl);
      return upEl;
    }

    function appendStyles() {
      var fontSize = Math.round(0.64 * size);
      var lineHeight = Math.round(1.28 * size);
      var styles = "#".concat(id, "{bottom:").concat(cornerOffset, "px;opacity:1;position:fixed;right:").concat(cornerOffset, "px;-webkit-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;z-index:").concat(zIndex, "}#").concat(id, ".hidden{bottom:-").concat(size, "px;opacity:0}#").concat(id, " a{background:").concat(backgroundColor, ";-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-webkit-border-radius:").concat(size, "px;-moz-border-radius:").concat(size, "px;border-radius:").concat(size, "px;color:").concat(textColor, ";cursor:pointer;display:block;font-family:monospace;font-size:").concat(fontSize, "px;height:").concat(size, "px;line-height:").concat(lineHeight, "px;text-align:center;text-decoration:none;vertical-align:middle;width:").concat(size, "px}");
      var styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(styles));
      document.head.insertAdjacentElement('afterbegin', styleEl);
    }

    function scrollUp() {
      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        scrollContainer.scrollTop = onClickScrollTo;
      }

      var start = performance.now();
      var initScrollTop = scrollContainer.scrollTop;
      var pxsToScrollBy = initScrollTop - onClickScrollTo;
      requestAnimationFrame(step);

      function step(timestamp) {
        var delta = timestamp - start;
        var progress = Math.min(delta / scrollDuration, 1);
        scrollContainer.scrollTop = initScrollTop - Math.round(progress * pxsToScrollBy);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
    }
  } // FUNCTION END

});