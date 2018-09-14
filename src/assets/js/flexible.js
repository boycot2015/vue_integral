/**
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
// !function (window) {

//     /* 设计图文档宽度 */
//     var docWidth = 750;

//     var doc = window.document,
//         docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

//     var recalc = (function refreshRem () {
//         var clientWidth = docEl.getBoundingClientRect().width;

//         /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
//         docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

//         return refreshRem;
//     })();

//     /* 添加倍屏标识，安卓倍屏为1 */
//     docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

//     if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
//         /* 添加IOS标识 */
//         doc.documentElement.classList.add('ios');
//         /* IOS8以上给html添加hairline样式，以便特殊处理 */
//         if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
//             doc.documentElement.classList.add('hairline');
//     }

//     if (!doc.addEventListener) return;
//     window.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);

// }(window);




// (function flexible (window, document) {
//     var docEl = document.documentElement
//     var dpr = window.devicePixelRatio || 1
  
//     // adjust body font size
//     function setBodyFontSize () {
//       if (document.body) {
//         document.body.style.fontSize = (12 * dpr) + 'px'
//       }
//       else {
//         document.addEventListener('DOMContentLoaded', setBodyFontSize)
//       }
//     }
//     setBodyFontSize();
  
//     // set 1rem = viewWidth / 10
//     alert(docEl.clientWidth)
//     function setRemUnit () {
//       var rem = docEl.clientWidth / 10
//       docEl.style.fontSize = rem + 'px'
//     }
  
//     setRemUnit()
  
//     // reset rem unit on page resize
//     window.addEventListener('resize', setRemUnit)
//     window.addEventListener('pageshow', function (e) {
//       if (e.persisted) {
//         setRemUnit()
//       }
//     })
  
//     // detect 0.5px supports
//     if (dpr >= 2) {
//       var fakeBody = document.createElement('body')
//       var testElement = document.createElement('div')
//       testElement.style.border = '.5px solid transparent'
//       fakeBody.appendChild(testElement)
//       docEl.appendChild(fakeBody)
//       if (testElement.offsetHeight === 1) {
//         docEl.classList.add('hairlines')
//       }
//       docEl.removeChild(fakeBody)
//     }
//   }(window, document))


'use strict';
!function(win, lib) {
  /**
   * @return {undefined}
   */
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    /** @type {string} */
    var i = navigator.userAgent.toLowerCase();
    if (!/ipad.*yanxuan/.test(i)) {
      if (width / dpr > 750) {
        /** @type {number} */
        width = 750 * dpr;
      }
    }
    /** @type {number} */
    var rem = width / 10;
    /** @type {string} */
    docEl.style.fontSize = rem + "px";
    /** @type {number} */
    flexible.rem = win.rem = rem;
  }
  var tid;
  var doc = win.document;
  var docEl = doc.documentElement;
  var meta = doc.querySelector('meta[name="viewport"]');
  var l = doc.querySelector('meta[name="flexible"]');
  /** @type {number} */
  var dpr = 0;
  /** @type {number} */
  var scale = 0;
  var flexible = lib.flexible || (lib.flexible = {});
  if (meta) {
    // console.warn("\u5c06\u6839\u636e\u5df2\u6709\u7684meta\u6807\u7b7e\u6765\u8bbe\u7f6e\u7f29\u653e\u6bd4\u4f8b");
    var rDefs = meta.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    if (rDefs) {
      /** @type {number} */
      scale = parseFloat(rDefs[1]);
      /** @type {number} */
      dpr = parseInt(1 / scale);
    }
  } else {
    if (l) {
      var p = l.getAttribute("content");
      if (p) {
        var rDefs = p.match(/initial\-dpr=([\d\.]+)/);
        var jParts = p.match(/maximum\-dpr=([\d\.]+)/);
        if (rDefs) {
          /** @type {number} */
          dpr = parseFloat(rDefs[1]);
          /** @type {number} */
          scale = parseFloat((1 / dpr).toFixed(2));
        }
        if (jParts) {
          /** @type {number} */
          dpr = parseFloat(jParts[1]);
          /** @type {number} */
          scale = parseFloat((1 / dpr).toFixed(2));
        }
      }
    }
  }
  if (!dpr && !scale) {
    /** @type {(Array<string>|null)} */
    var v = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
    /** @type {number} */
    var dPR = win.devicePixelRatio;
    /** @type {number} */
    dpr = v ? dPR >= 3 && (!dpr || dpr >= 3) ? 3 : dPR >= 2 && (!dpr || dpr >= 2) ? 2 : 1 : 1;
    /** @type {number} */
    scale = 1 / dpr;
  }
  if (docEl.setAttribute("data-dpr", dpr), !meta) {
    if (meta = doc.createElement("meta"), meta.setAttribute("name", "viewport"), win.webPageScalable ? meta.setAttribute("content", "initial-scale=" + scale + ", user-scalable=yes") : meta.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no viewport-fit=cover"), docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(meta);
    } else {
      var h = doc.createElement("div");
      h.appendChild(meta);
      doc.write(h.innerHTML);
    }
  }
  win.addEventListener("resize", function() {
    clearTimeout(tid);
    /** @type {number} */
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener("pageshow", function(state) {
    if (state.persisted) {
      clearTimeout(tid);
      /** @type {number} */
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  if ("complete" === doc.readyState) {
    /** @type {string} */
    doc.body.style.fontSize = 12 * dpr + "px";
  } else {
    doc.addEventListener("DOMContentLoaded", function(canCreateDiscussions) {
      /** @type {string} */
      doc.body.style.fontSize = 12 * dpr + "px";
    }, false);
  }
  refreshRem();
  /** @type {number} */
  flexible.dpr = win.dpr = dpr;
  /** @type {function(): undefined} */
  flexible.refreshRem = refreshRem;
  /**
   * @param {string} d
   * @return {?}
   */
  flexible.rem2px = function(d) {
    /** @type {number} */
    var val = parseFloat(d) * this.rem;
    return "string" == typeof d && d.match(/rem$/) && (val = val + "px"), val;
  };
  /**
   * @param {string} d
   * @return {?}
   */
  flexible.px2rem = function(d) {
    /** @type {number} */
    var val = parseFloat(d) / this.rem;
    return "string" == typeof d && d.match(/px$/) && (val = val + "rem"), val;
  };
}(window, window.lib || (window.lib = {}));
