"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function common() {
  $(window).load(function () {
    closePreloader();
  }), Pace.on("done", function () {
    $("body").removeClass("ng-cloak"), closePreloader();
  }), setTimeout(function () {
    closePreloader();
  }, 5e3);
}

function closePreloader() {
  var $preloader = $("#preloader");
  $preloader.length > 0 && $preloader.is(":visible") && $preloader.hide();
}

function navBarDropdownShown() {
  var $navbar = $(".navbar");
  $navbar.length > 0 && ($navbar.on("show.bs.dropdown", function (e) {
    var $imgsOfDropdown = $(this).find("img");
    startLoadImages($imgsOfDropdown);
  }), $navbar.on("show.bs.collapse", function (e) {
    var $imgsOfDropdown = $(this).find("img");
    startLoadImages($imgsOfDropdown);
  }));
}

function jumpSection(hashId, offset, scrollSpeed) {
  var target = $(hashId),
      defaultScrollSpeed = 0;
  if ("undefined" != typeof scrollSpeed && (defaultScrollSpeed = scrollSpeed), target.length) return "undefined" != typeof offset ? $("html,body").animate({
    scrollTop: target.offset().top + offset
  }, defaultScrollSpeed) : $("html,body").animate({
    scrollTop: target.offset().top
  }, defaultScrollSpeed), !1;
}

function stopScrollWhenOpenMobileMenu() {
  var $body = $("body");
  $(".navbar-collapse").on("shown.bs.collapse", function () {
    $body.css("overflow", "hidden");
  }), $(".navbar-collapse").on("hidden.bs.collapse", function () {
    $body.css("overflow", "auto");
  });
}

function autoGenerateRwdTableInEditor() {
  var $editor = $(".editor"),
      $tablesOfEditor = $editor.find("table"),
      countOfTables = $tablesOfEditor.length;
  if (countOfTables > 0) for (var i = 0; i < countOfTables; i++) {
    var $tmpTable = $($tablesOfEditor[i]),
        $parentElem = $tmpTable.parent(),
        isRwdTable = $parentElem.hasClass("table-responsive");
    0 == isRwdTable && $tmpTable.wrap('<div class="table-responsive"></div>');
  }
}

function productTabsChanged() {
  var $productTabs = $("ul.tabs-nav");
  $productTabs.length > 0 && $productTabs.find('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    var $imagesOfTab = $(e.target).find("img");
    startLoadImages($imagesOfTab);
  });
}

function blogBookmark() {
  var $bookmark = $(".bookmark-list-wrapper");

  if ($bookmark.length > 0) {
    var offset = ($(".editor"), $bookmark.data("offset")),
        $bookmarkMenu = $(".bookmark-menu"),
        isOpen = !0;
    $bookmarkMenu.click(function () {
      isOpen ? $bookmark.removeClass("active") : $bookmark.addClass("active"), isOpen = !isOpen;
    }), $bookmark.find("a").click(function () {
      var $currLink = $(this);
      jumpSection("#" + $currLink.attr("data-bookmark-id"), offset, 500);
    });
  }
}

function removeErrorMasterSliderContainer($elemMS) {
  if ($elemMS.length > 0) {
    var $msContainers = $elemMS.find(".ms-container");
    $msContainers.length >= 2 && $msContainers[0].remove();
  }
}

function setMasterSliderImageOnScreen($banner) {
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width,
      $imgsCovers = $banner.find("img");
  if (width <= 576) for (var i = 0; i < $imgsCovers.length; i++) {
    var $img = $($imgsCovers[i]);
    $img.attr("src") != $img.attr("data-mobile") && $img.attr("data-src", $img.attr("data-mobile"));
  } else for (var i = 0; i < $imgsCovers.length; i++) {
    var $img = $($imgsCovers[i]);
    $img.attr("src") != $img.attr("data-desktop") && $img.attr("data-src", $img.attr("data-desktop"));
  }
}

function loadBasedThemeWebfontLoader() {
  Pace.on("done", function () {
    "undefined" != typeof WebFont && WebFont.load({
      timeout: 2e3,
      google: {
        families: ["Material Icons"]
      }
    });
  });
}

function detectGA(cb) {
  var gaCheckerId,
      gaCounter = 0,
      gaMaxCounter = 10,
      gaChecker = function gaChecker() {
    gaCounter++, gaCounter == gaMaxCounter ? clearInterval(gaCheckerId) : "function" == typeof window.ga && (clearInterval(gaCheckerId), cb());
  };

  gaCheckerId = setInterval(gaChecker, 1e3);
}

function TraceCloudFlareLoc() {
  var cfCGI = window.MYAPP.endpoint + "cdn-cgi/trace";
  $.get(cfCGI, function (data, status, jqXHR) {
    if (200 == jqXHR.status) {
      var match = data.match(/(colo|loc)=(\w+)/g),
          colo = match[0].split("=")[1],
          loc = match[1].split("=")[1];
      window.ga("send", "event", "cloudflare", loc, colo);
    }
  });
}

function lazyloadGlobal() {
  var $body = $("body"),
      isLazy = $body.data("isLazy");

  if ("undefined" == typeof isLazy) {
    $body.data("isLazy", !0);
    var $gloalImages = $body.find("*").not(".ms-slide").find("img");
    lazyloadImages($gloalImages);
  }
}

function stopLoadImages($inputLazyImages) {
  for (var lenOfImages = $inputLazyImages.length, i = 0; i < lenOfImages; i++) {
    var $imgTmp = $($inputLazyImages[i]);
    if ("undefined" == typeof $imgTmp.attr("data-nolazy")) if ("undefined" == typeof $imgTmp.attr("data-lazy")) {
      var imgSrc = $imgTmp.attr("src");
      "" == imgSrc && (imgSrc = $imgTmp.attr("data-lazy-v2")), $imgTmp.addClass("lazyload"), "undefined" == typeof $imgTmp.attr("data-src") && ($imgTmp.parent().hasClass("ms-slide-bgcont") || ($imgTmp.attr("data-lazy", imgSrc), $imgTmp.removeAttr("src"), $imgTmp.removeAttr("data-lazy-v2")));
    } else if ("undefined" != typeof $imgTmp.attr("data-lazy-v2")) {
      var imgSrc = $imgTmp.attr("data-lazy-v2");
      $imgTmp.attr("data-lazy", imgSrc), $imgTmp.removeAttr("src"), $imgTmp.removeAttr("data-lazy-v2");
    }
  }
}

function startLoadImages($imgsNotLoad) {
  if ($imgsNotLoad.length > 0) for (var i = 0; i < $imgsNotLoad.length; i++) {
    var $img = $($imgsNotLoad[i]);
    $img.attr("src", $img.attr("data-lazy")), $img.removeAttr("data-lazy");
  }
}

function initLazyLoadOfImages($inputLazyImages) {
  $("body").data("data-lazyinit", $inputLazyImages.length), $inputLazyImages.Lazy({
    attribute: "data-lazy",
    effect: "fadeIn",
    effectTime: 0,
    threshold: 0,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
  });
}

function lazyloadImages($inputLazyImages) {
  stopLoadImages($inputLazyImages), initLazyLoadOfImages($inputLazyImages);
}

function initLazyLoadOfIframeOfBlogPosting() {
  if (window.location.href.indexOf(MYAPP.blog_endpoint) >= 0) {
    var $postElem = $(".editor");
    initLazyLoadOfYoutubeByTarget($postElem), initLazyloadOfIFrameByTarget($postElem);
  }
}

function initLazyLoadOfIframeOfProduct() {
  if (window.location.href.indexOf(window.location.host + "/products") >= 0) {
    var $productElem = $(".product-detail");
    initLazyLoadOfYoutubeByTarget($productElem), initLazyloadOfIFrameByTarget($productElem);
  }
}

function initLazyLoadOfIframeOfNews() {
  if (window.location.href.indexOf(window.location.host + "/news") >= 0) {
    var $newsElem = $(".post");
    initLazyLoadOfYoutubeByTarget($newsElem), initLazyloadOfIFrameByTarget($newsElem);
  }
}

function initLazyloadOfIFrameByTarget($targetElem) {
  if ($targetElem.length > 0) {
    var $iframesWithoutYoutube = $targetElem.find('iframe[data-src!="www.youtube.com"]'),
        countYt = $iframesWithoutYoutube.length;
    if (countYt > 0) for (var i = 0; i < countYt; i++) {
      var $noYtIf = $($iframesWithoutYoutube[i]);
      initLazyLoadOfIframe($noYtIf);
    }
  }
}

function initLazyLoadOfYoutubeByTarget($targetElem) {
  if ($targetElem.length > 0) {
    var $youtubeIframes = $targetElem.find('iframe[data-src*="www.youtube.com"]'),
        countYt = $youtubeIframes.length;
    if (countYt > 0) for (var i = 0; i < countYt; i++) {
      var $ytIf = $($youtubeIframes[i]);
      initLazyLoadOfYoutube($ytIf);
    }
  }
}

function initLazyLoadOfYoutube($ytIf) {
  $ytIf.length > 0 && ($ytIf.attr("data-loader", "yt"), $ytIf.attr("data-nocookie", "1"), initLazyload($ytIf));
}

function initLazyLoadOfIframe($if) {
  $if.length > 0 && initLazyload($if);
}

function initLazyload($lazyElem, opts) {
  var settings = {
    attribute: "data-src",
    effect: "fadeIn",
    effectTime: 0,
    threshold: 0,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
  },
      extendSettings = $.extend(settings, opts);
  $lazyElem.Lazy(extendSettings);
}

if (!function (a, b) {
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a);
  } : b(a);
}("undefined" != typeof window ? window : void 0, function (a, b) {
  function s(a) {
    var b = !!a && "length" in a && a.length,
        c = n.type(a);
    return "function" !== c && !n.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }

  function z(a, b, c) {
    if (n.isFunction(b)) return n.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c;
    });
    if (b.nodeType) return n.grep(a, function (a) {
      return a === b !== c;
    });

    if ("string" == typeof b) {
      if (y.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a);
    }

    return n.grep(a, function (a) {
      return h.call(b, a) > -1 !== c;
    });
  }

  function F(a, b) {
    for (; (a = a[b]) && 1 !== a.nodeType;) {
      ;
    }

    return a;
  }

  function H(a) {
    var b = {};
    return n.each(a.match(G) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }

  function J() {
    d.removeEventListener("DOMContentLoaded", J), a.removeEventListener("load", J), n.ready();
  }

  function M() {
    this.expando = n.expando + M.uid++;
  }

  function R(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Q, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
      try {
        c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : P.test(c) ? n.parseJSON(c) : c);
      } catch (e) {}

      O.set(a, b, c);
    } else c = void 0;
    return c;
  }

  function W(a, b, c, d) {
    var e,
        f = 1,
        g = 20,
        h = d ? function () {
      return d.cur();
    } : function () {
      return n.css(a, b, "");
    },
        i = h(),
        j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
        k = (n.cssNumber[b] || "px" !== j && +i) && T.exec(n.css(a, b));

    if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;

      do {
        f = f || ".5", k /= f, n.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }

    return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
  }

  function _(a, b) {
    var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;
  }

  function aa(a, b) {
    for (var c = 0, d = a.length; d > c; c++) {
      N.set(a[c], "globalEval", !b || N.get(b[c], "globalEval"));
    }
  }

  function ca(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], o = 0, p = a.length; p > o; o++) {
      if (f = a[o], f || 0 === f) if ("object" === n.type(f)) n.merge(m, f.nodeType ? [f] : f);else if (ba.test(f)) {
        for (g = g || l.appendChild(b.createElement("div")), h = (Y.exec(f) || ["", ""])[1].toLowerCase(), i = $[h] || $._default, g.innerHTML = i[1] + n.htmlPrefilter(f) + i[2], k = i[0]; k--;) {
          g = g.lastChild;
        }

        n.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
      } else m.push(b.createTextNode(f));
    }

    for (l.textContent = "", o = 0; f = m[o++];) {
      if (d && n.inArray(f, d) > -1) e && e.push(f);else if (j = n.contains(f.ownerDocument, f), g = _(l.appendChild(f), "script"), j && aa(g), c) for (k = 0; f = g[k++];) {
        Z.test(f.type || "") && c.push(f);
      }
    }

    return l;
  }

  function ga() {
    return !0;
  }

  function ha() {
    return !1;
  }

  function ia() {
    try {
      return d.activeElement;
    } catch (a) {}
  }

  function ja(a, b, c, d, e, f) {
    var g, h;

    if ("object" == _typeof(b)) {
      "string" != typeof c && (d = d || c, c = void 0);

      for (h in b) {
        ja(a, h, c, d, b[h], f);
      }

      return a;
    }

    if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = ha;else if (!e) return a;
    return 1 === f && (g = e, e = function e(a) {
      return n().off(a), g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
      n.event.add(this, b, e, d, c);
    });
  }

  function pa(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }

  function qa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }

  function ra(a) {
    var b = na.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }

  function sa(a, b) {
    var c, d, e, f, g, h, i, j;

    if (1 === b.nodeType) {
      if (N.hasData(a) && (f = N.access(a), g = N.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};

        for (e in j) {
          for (c = 0, d = j[e].length; d > c; c++) {
            n.event.add(b, e, j[e][c]);
          }
        }
      }

      O.hasData(a) && (h = O.access(a), i = n.extend({}, h), O.set(b, i));
    }
  }

  function ta(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && X.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
  }

  function ua(a, b, c, d) {
    b = f.apply([], b);
    var e,
        g,
        h,
        i,
        j,
        k,
        m = 0,
        o = a.length,
        p = o - 1,
        q = b[0],
        r = n.isFunction(q);
    if (r || o > 1 && "string" == typeof q && !l.checkClone && ma.test(q)) return a.each(function (e) {
      var f = a.eq(e);
      r && (b[0] = q.call(this, e, f.html())), ua(f, b, c, d);
    });

    if (o && (e = ca(b, a[0].ownerDocument, !1, a, d), g = e.firstChild, 1 === e.childNodes.length && (e = g), g || d)) {
      for (h = n.map(_(e, "script"), qa), i = h.length; o > m; m++) {
        j = e, m !== p && (j = n.clone(j, !0, !0), i && n.merge(h, _(j, "script"))), c.call(a[m], j, m);
      }

      if (i) for (k = h[h.length - 1].ownerDocument, n.map(h, ra), m = 0; i > m; m++) {
        j = h[m], Z.test(j.type || "") && !N.access(j, "globalEval") && n.contains(k, j) && (j.src ? n._evalUrl && n._evalUrl(j.src) : n.globalEval(j.textContent.replace(oa, "")));
      }
    }

    return a;
  }

  function va(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || n.cleanData(_(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && aa(_(d, "script")), d.parentNode.removeChild(d));
    }

    return a;
  }

  function ya(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
        d = n.css(c[0], "display");
    return c.detach(), d;
  }

  function za(a) {
    var b = d,
        c = xa[a];
    return c || (c = ya(a, b), "none" !== c && c || (wa = (wa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = wa[0].contentDocument, b.write(), b.close(), c = ya(a, b), wa.detach()), xa[a] = c), c;
  }

  function Fa(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;
    return c = c || Ca(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Ba.test(g) && Aa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 !== g ? g + "" : g;
  }

  function Ga(a, b) {
    return {
      get: function get() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      }
    };
  }

  function Ma(a) {
    if (a in La) return a;

    for (var b = a[0].toUpperCase() + a.slice(1), c = Ka.length; c--;) {
      if (a = Ka[c] + b, a in La) return a;
    }
  }

  function Na(a, b, c) {
    var d = T.exec(b);
    return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
  }

  function Oa(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) {
      "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
    }

    return g;
  }

  function Pa(a, b, c) {
    var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = Ca(a),
        g = "border-box" === n.css(a, "boxSizing", !1, f);

    if (0 >= e || null == e) {
      if (e = Fa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ba.test(e)) return e;
      d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
    }

    return e + Oa(a, b, c || (g ? "border" : "content"), d, f) + "px";
  }

  function Qa(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
      d = a[g], d.style && (f[g] = N.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = N.access(d, "olddisplay", za(d.nodeName)))) : (e = V(d), "none" === c && e || N.set(d, "olddisplay", e ? c : n.css(d, "display"))));
    }

    for (g = 0; h > g; g++) {
      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    }

    return a;
  }

  function Ra(a, b, c, d, e) {
    return new Ra.prototype.init(a, b, c, d, e);
  }

  function Wa() {
    return a.setTimeout(function () {
      Sa = void 0;
    }), Sa = n.now();
  }

  function Xa(a, b) {
    var c,
        d = 0,
        e = {
      height: a
    };

    for (b = b ? 1 : 0; 4 > d; d += 2 - b) {
      c = U[d], e["margin" + c] = e["padding" + c] = a;
    }

    return b && (e.opacity = e.width = a), e;
  }

  function Ya(a, b, c) {
    for (var d, e = (_a.tweeners[b] || []).concat(_a.tweeners["*"]), f = 0, g = e.length; g > f; f++) {
      if (d = e[f].call(c, b, a)) return d;
    }
  }

  function Za(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = this,
        m = {},
        o = a.style,
        p = a.nodeType && V(a),
        q = N.get(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
      h.unqueued || i();
    }), h.unqueued++, l.always(function () {
      l.always(function () {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
      });
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? N.get(a, "olddisplay") || za(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function () {
      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
    }));

    for (d in b) {
      if (e = b[d], Ua.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;
          p = !0;
        }

        m[d] = q && q[d] || n.style(a, d);
      } else j = void 0;
    }

    if (n.isEmptyObject(m)) "inline" === ("none" === j ? za(a.nodeName) : j) && (o.display = j);else {
      q ? "hidden" in q && (p = q.hidden) : q = N.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {
        n(a).hide();
      }), l.done(function () {
        var b;
        N.remove(a, "fxshow");

        for (b in m) {
          n.style(a, b, m[b]);
        }
      });

      for (d in m) {
        g = Ya(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
      }
    }
  }

  function $a(a, b) {
    var c, d, e, f, g;

    for (c in a) {
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];

        for (c in f) {
          c in a || (a[c] = f[c], b[c] = e);
        }
      } else b[d] = e;
    }
  }

  function _a(a, b, c) {
    var d,
        e,
        f = 0,
        g = _a.prefilters.length,
        h = n.Deferred().always(function () {
      delete i.elem;
    }),
        i = function i() {
      if (e) return !1;

      for (var b = Sa || Wa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) {
        j.tweens[g].run(f);
      }

      return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
    },
        j = h.promise({
      elem: a,
      props: n.extend({}, b),
      opts: n.extend(!0, {
        specialEasing: {},
        easing: n.easing._default
      }, c),
      originalProperties: b,
      originalOptions: c,
      startTime: Sa || Wa(),
      duration: c.duration,
      tweens: [],
      createTween: function createTween(b, c) {
        var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
        return j.tweens.push(d), d;
      },
      stop: function stop(b) {
        var c = 0,
            d = b ? j.tweens.length : 0;
        if (e) return this;

        for (e = !0; d > c; c++) {
          j.tweens[c].run(1);
        }

        return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
      }
    }),
        k = j.props;

    for ($a(k, j.opts.specialEasing); g > f; f++) {
      if (d = _a.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
    }

    return n.map(k, Ya, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
  }

  function fb(a) {
    return a.getAttribute && a.getAttribute("class") || "";
  }

  function wb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d,
          e = 0,
          f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c)) for (; d = f[e++];) {
        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
      }
    };
  }

  function xb(a, b, c, d) {
    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }

    var e = {},
        f = a === tb;
    return g(b.dataTypes[0]) || !e["*"] && g("*");
  }

  function yb(a, b) {
    var c,
        d,
        e = n.ajaxSettings.flatOptions || {};

    for (c in b) {
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    }

    return d && n.extend(!0, a, d), a;
  }

  function zb(a, b, c) {
    for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];) {
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    }

    if (d) for (e in h) {
      if (h[e] && h[e].test(d)) {
        i.unshift(e);
        break;
      }
    }
    if (i[0] in c) f = i[0];else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break;
        }

        g || (g = e);
      }

      f = f || g;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }

  function Ab(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
    if (k[1]) for (g in a.converters) {
      j[g.toLowerCase()] = a.converters[g];
    }

    for (f = k.shift(); f;) {
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break;
          }
        }
        if (g !== !0) if (g && a["throws"]) b = g(b);else try {
          b = g(b);
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          };
        }
      }
    }

    return {
      state: "success",
      data: b
    };
  }

  function Gb(a, b, c, d) {
    var e;
    if (n.isArray(b)) n.each(b, function (b, e) {
      c || Cb.test(a) ? d(a, e) : Gb(a + "[" + ("object" == _typeof(e) && null != e ? b : "") + "]", e, c, d);
    });else if (c || "object" !== n.type(b)) d(a, b);else for (e in b) {
      Gb(a + "[" + e + "]", b[e], c, d);
    }
  }

  function Mb(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
  }

  var c = [],
      d = a.document,
      e = c.slice,
      f = c.concat,
      g = c.push,
      h = c.indexOf,
      i = {},
      j = i.toString,
      k = i.hasOwnProperty,
      l = {},
      m = "2.2.4",
      n = function n(a, b) {
    return new n.fn.init(a, b);
  },
      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      p = /^-ms-/,
      q = /-([\da-z])/gi,
      r = function r(a, b) {
    return b.toUpperCase();
  };

  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function toArray() {
      return e.call(this);
    },
    get: function get(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this);
    },
    pushStack: function pushStack(a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b;
    },
    each: function each(a) {
      return n.each(this, a);
    },
    map: function map(a) {
      return this.pushStack(n.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    },
    slice: function slice() {
      return this.pushStack(e.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    eq: function eq(a) {
      var b = this.length,
          c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: g,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;

    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == _typeof(g) || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) {
      if (null != (a = arguments[h])) for (b in a) {
        c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      }
    }

    return g;
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(a) {
      throw new Error(a);
    },
    noop: function noop() {},
    isFunction: function isFunction(a) {
      return "function" === n.type(a);
    },
    isArray: Array.isArray,
    isWindow: function isWindow(a) {
      return null != a && a === a.window;
    },
    isNumeric: function isNumeric(a) {
      var b = a && a.toString();
      return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
    },
    isPlainObject: function isPlainObject(a) {
      var b;
      if ("object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
      if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype || {}, "isPrototypeOf")) return !1;

      for (b in a) {
        ;
      }

      return void 0 === b || k.call(a, b);
    },
    isEmptyObject: function isEmptyObject(a) {
      var b;

      for (b in a) {
        return !1;
      }

      return !0;
    },
    type: function type(a) {
      return null == a ? a + "" : "object" == _typeof(a) || "function" == typeof a ? i[j.call(a)] || "object" : _typeof(a);
    },
    globalEval: function globalEval(a) {
      var b,
          c = eval;
      a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = d.createElement("script"), b.text = a, d.head.appendChild(b).parentNode.removeChild(b)) : c(a));
    },
    camelCase: function camelCase(a) {
      return a.replace(p, "ms-").replace(q, r);
    },
    nodeName: function nodeName(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function each(a, b) {
      var c,
          d = 0;
      if (s(a)) for (c = a.length; c > d && b.call(a[d], d, a[d]) !== !1; d++) {
        ;
      } else for (d in a) {
        if (b.call(a[d], d, a[d]) === !1) break;
      }
      return a;
    },
    trim: function trim(a) {
      return null == a ? "" : (a + "").replace(o, "");
    },
    makeArray: function makeArray(a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c;
    },
    inArray: function inArray(a, b, c) {
      return null == b ? -1 : h.call(b, a, c);
    },
    merge: function merge(a, b) {
      for (var c = +b.length, d = 0, e = a.length; c > d; d++) {
        a[e++] = b[d];
      }

      return a.length = e, a;
    },
    grep: function grep(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
        d = !b(a[f], f), d !== h && e.push(a[f]);
      }

      return e;
    },
    map: function map(a, b, c) {
      var d,
          e,
          g = 0,
          h = [];
      if (s(a)) for (d = a.length; d > g; g++) {
        e = b(a[g], g, c), null != e && h.push(e);
      } else for (g in a) {
        e = b(a[g], g, c), null != e && h.push(e);
      }
      return f.apply([], h);
    },
    guid: 1,
    proxy: function proxy(a, b) {
      var c, d, f;
      return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (d = e.call(arguments, 2), f = function f() {
        return a.apply(b || this, d.concat(e.call(arguments)));
      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0;
    },
    now: Date.now,
    support: l
  }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    i["[object " + b + "]"] = b.toLowerCase();
  });

  var t = function (a) {
    function fa(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s,
          w = b && b.ownerDocument,
          x = b ? b.nodeType : 9;
      if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;

      if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== x && (o = $.exec(a))) if (f = o[1]) {
          if (9 === x) {
            if (!(j = b.getElementById(f))) return d;
            if (j.id === f) return d.push(j), d;
          } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
        } else {
          if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
          if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d;
        }

        if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== x) w = b, s = a;else if ("object" !== b.nodeName.toLowerCase()) {
            for ((k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']"; h--;) {
              r[h] = l + " " + qa(r[h]);
            }

            s = r.join(","), w = _.test(a) && oa(b.parentNode) || b;
          }
          if (s) try {
            return H.apply(d, w.querySelectorAll(s)), d;
          } catch (y) {} finally {
            k === u && b.removeAttribute("id");
          }
        }
      }

      return i(a.replace(Q, "$1"), b, d, e);
    }

    function ga() {
      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }

      var a = [];
      return b;
    }

    function ha(a) {
      return a[u] = !0, a;
    }

    function ia(a) {
      var b = n.createElement("div");

      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }

    function ja(a, b) {
      for (var c = a.split("|"), e = c.length; e--;) {
        d.attrHandle[c[e]] = b;
      }
    }

    function ka(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c) for (; c = c.nextSibling;) {
        if (c === b) return -1;
      }
      return a ? 1 : -1;
    }

    function la(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a;
      };
    }

    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a;
      };
    }

    function na(a) {
      return ha(function (b) {
        return b = +b, ha(function (c, d) {
          for (var e, f = a([], c.length, b), g = f.length; g--;) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }

    function oa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }

    function pa() {}

    function qa(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) {
        d += a[b].value;
      }

      return d;
    }

    function ra(a, b, c) {
      var d = b.dir,
          e = c && "parentNode" === d,
          f = x++;
      return b.first ? function (b, c, f) {
        for (; b = b[d];) {
          if (1 === b.nodeType || e) return a(b, c, f);
        }
      } : function (b, c, g) {
        var h,
            i,
            j,
            k = [w, f];

        if (g) {
          for (; b = b[d];) {
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
          }
        } else for (; b = b[d];) {
          if (1 === b.nodeType || e) {
            if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
            if (i[d] = k, k[2] = a(b, c, g)) return !0;
          }
        }
      };
    }

    function sa(a) {
      return a.length > 1 ? function (b, c, d) {
        for (var e = a.length; e--;) {
          if (!a[e](b, c, d)) return !1;
        }

        return !0;
      } : a[0];
    }

    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) {
        fa(a, b[d], c);
      }

      return c;
    }

    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      }

      return g;
    }

    function va(a, b, c, d, e, f) {
      return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || ta(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : ua(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) for (j = ua(r, n), d(j, [], h, i), k = j.length; k--;) {
          (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
        }

        if (f) {
          if (e || a) {
            if (e) {
              for (j = [], k = r.length; k--;) {
                (l = r[k]) && j.push(q[k] = l);
              }

              e(null, r = [], j, i);
            }

            for (k = r.length; k--;) {
              (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          }
        } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
      });
    }

    function wa(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
        return a === b;
      }, h, !0), l = ra(function (a) {
        return J(b, a) > -1;
      }, h, !0), m = [function (a, c, d) {
        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
        return b = null, e;
      }]; f > i; i++) {
        if (c = d.relative[a[i].type]) m = [ra(sa(m), c)];else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e && !d.relative[a[e].type]; e++) {
              ;
            }

            return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a));
          }

          m.push(c);
        }
      }

      return sa(m);
    }

    function xa(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function f(_f, g, h, i, k) {
        var l,
            o,
            q,
            r = 0,
            s = "0",
            t = _f && [],
            u = [],
            v = j,
            x = _f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;

        for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
          if (e && l) {
            for (o = 0, g || l.ownerDocument === n || (m(l), h = !p); q = a[o++];) {
              if (q(l, g || n, h)) {
                i.push(l);
                break;
              }
            }

            k && (w = y);
          }

          c && ((l = !q && l) && r--, _f && t.push(l));
        }

        if (r += s, c && s !== r) {
          for (o = 0; q = b[o++];) {
            q(t, u, g, h);
          }

          if (_f) {
            if (r > 0) for (; s--;) {
              t[s] || u[s] || (u[s] = F.call(i));
            }
            u = ua(u);
          }

          H.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
        }

        return k && (w = y, j = v), t;
      };

      return c ? ha(f) : f;
    }

    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ga(),
        z = ga(),
        A = ga(),
        B = function B(a, b) {
      return a === b && (l = !0), 0;
    },
        C = 1 << 31,
        D = {}.hasOwnProperty,
        E = [],
        F = E.pop,
        G = E.push,
        H = E.push,
        I = E.slice,
        J = function J(a, b) {
      for (var c = 0, d = a.length; d > c; c++) {
        if (a[c] === b) return c;
      }

      return -1;
    },
        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        L = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
        O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
        P = new RegExp(L + "+", "g"),
        Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
        R = new RegExp("^" + L + "*," + L + "*"),
        S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
        T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
        U = new RegExp(O),
        V = new RegExp("^" + M + "$"),
        W = {
      ID: new RegExp("^#(" + M + ")"),
      CLASS: new RegExp("^\\.(" + M + ")"),
      TAG: new RegExp("^(" + M + "|[*])"),
      ATTR: new RegExp("^" + N),
      PSEUDO: new RegExp("^" + O),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + K + ")$", "i"),
      needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
    },
        X = /^(?:input|select|textarea|button)$/i,
        Y = /^h\d$/i,
        Z = /^[^{]+\{\s*\[native \w/,
        $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        _ = /[+~]/,
        aa = /'|\\/g,
        ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
        ca = function ca(a, b, c) {
      var d = "0x" + b - 65536;
      return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
    },
        da = function da() {
      m();
    };

    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
    } catch (ea) {
      H = {
        apply: E.length ? function (a, b) {
          G.apply(a, I.call(b));
        } : function (a, b) {
          for (var c = a.length, d = 0; a[c++] = b[d++];) {
            ;
          }

          a.length = c - 1;
        }
      };
    }

    c = fa.support = {}, f = fa.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return !!b && "HTML" !== b.nodeName;
    }, m = fa.setDocument = function (a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ia(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
      }), c.getById ? (d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c ? [c] : [];
        }
      }, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          return a.getAttribute("id") === b;
        };
      }) : (delete d.find.ID, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b;
        };
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function (a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);

        if ("*" === a) {
          for (; c = f[e++];) {
            1 === c.nodeType && d.push(c);
          }

          return d;
        }

        return f;
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0;
      }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ia(function (a) {
        var b = n.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function (a, b) {
        if (b) for (; b = b.parentNode;) {
          if (b === a) return !0;
        }
        return !1;
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
      } : function (a, b) {
        if (a === b) return l = !0, 0;
        var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            g = [a],
            h = [b];
        if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f) return ka(a, b);

        for (c = a; c = c.parentNode;) {
          g.unshift(c);
        }

        for (c = b; c = c.parentNode;) {
          h.unshift(c);
        }

        for (; g[d] === h[d];) {
          d++;
        }

        return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
      }, n) : n;
    }, fa.matches = function (a, b) {
      return fa(a, null, null, b);
    }, fa.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
      } catch (e) {}
      return fa(b, n, null, [a]).length > 0;
    }, fa.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, fa.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, fa.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, fa.uniqueSort = function (a) {
      var b,
          d = [],
          e = 0,
          f = 0;

      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        for (; b = a[f++];) {
          b === a[f] && (e = d.push(f));
        }

        for (; e--;) {
          a.splice(d[e], 1);
        }
      }

      return k = null, a;
    }, e = fa.getText = function (a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;

      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;

          for (a = a.firstChild; a; a = a.nextSibling) {
            c += e(a);
          }
        } else if (3 === f || 4 === f) return a.nodeValue;
      } else for (; b = a[d++];) {
        c += e(b);
      }

      return c;
    }, d = fa.selectors = {
      cacheLength: 50,
      createPseudo: ha,
      match: W,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(a) {
          return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        },
        CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a;
        },
        PSEUDO: function PSEUDO(a) {
          var b,
              c = !a[6] && a[2];
          return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(a) {
          var b = a.replace(ba, ca).toLowerCase();
          return "*" === a ? function () {
            return !0;
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        },
        CLASS: function CLASS(a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(a, b, c) {
          return function (d) {
            var e = fa.attr(d, a);
            return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
          };
        },
        CHILD: function CHILD(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;
          return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h,
                t = !1;

            if (q) {
              if (f) {
                for (; p;) {
                  for (m = b; m = m[p];) {
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  }

                  o = p = "only" === a && !o && "nextSibling";
                }

                return !0;
              }

              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                for (m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();) {
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];
                    break;
                  }
                }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) for (; (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m !== b));) {
                ;
              }

              return t -= e, t === d || t % d === 0 && t / d >= 0;
            }
          };
        },
        PSEUDO: function PSEUDO(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
            for (var d, f = e(a, b), g = f.length; g--;) {
              d = J(a, f[g]), a[d] = !(c[d] = f[g]);
            }
          }) : function (a) {
            return e(a, 0, c);
          }) : e;
        }
      },
      pseudos: {
        not: ha(function (a) {
          var b = [],
              c = [],
              d = h(a.replace(Q, "$1"));
          return d[u] ? ha(function (a, b, c, e) {
            for (var f, g = d(a, null, e, []), h = a.length; h--;) {
              (f = g[h]) && (a[h] = !(b[h] = f));
            }
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }),
        has: ha(function (a) {
          return function (b) {
            return fa(a, b).length > 0;
          };
        }),
        contains: ha(function (a) {
          return a = a.replace(ba, ca), function (b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }),
        lang: ha(function (a) {
          return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
            var c;

            do {
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            } while ((b = b.parentNode) && 1 === b.nodeType);

            return !1;
          };
        }),
        target: function target(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id;
        },
        root: function root(a) {
          return a === o;
        },
        focus: function focus(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        },
        enabled: function enabled(a) {
          return a.disabled === !1;
        },
        disabled: function disabled(a) {
          return a.disabled === !0;
        },
        checked: function checked(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected;
        },
        selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        },
        empty: function empty(a) {
          for (a = a.firstChild; a; a = a.nextSibling) {
            if (a.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(a) {
          return !d.pseudos.empty(a);
        },
        header: function header(a) {
          return Y.test(a.nodeName);
        },
        input: function input(a) {
          return X.test(a.nodeName);
        },
        button: function button(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b;
        },
        text: function text(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        },
        first: na(function () {
          return [0];
        }),
        last: na(function (a, b) {
          return [b - 1];
        }),
        eq: na(function (a, b, c) {
          return [0 > c ? c + b : c];
        }),
        even: na(function (a, b) {
          for (var c = 0; b > c; c += 2) {
            a.push(c);
          }

          return a;
        }),
        odd: na(function (a, b) {
          for (var c = 1; b > c; c += 2) {
            a.push(c);
          }

          return a;
        }),
        lt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) {
            a.push(d);
          }

          return a;
        }),
        gt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) {
            a.push(d);
          }

          return a;
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;

    for (b in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      d.pseudos[b] = la(b);
    }

    for (b in {
      submit: !0,
      reset: !0
    }) {
      d.pseudos[b] = ma(b);
    }

    return pa.prototype = d.filters = d.pseudos, d.setFilters = new pa(), g = fa.tokenize = function (a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);

      for (h = a, i = [], j = d.preFilter; h;) {
        c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(Q, " ")
        }), h = h.slice(c.length));

        for (g in d.filter) {
          !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
            value: c,
            type: g,
            matches: e
          }), h = h.slice(c.length));
        }

        if (!c) break;
      }

      return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
    }, h = fa.compile = function (a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];

      if (!f) {
        for (b || (b = g(a)), c = b.length; c--;) {
          f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
        }

        f = A(a, xa(e, d)), f.selector = a;
      }

      return f;
    }, i = fa.select = function (a, b, e, f) {
      var i,
          j,
          k,
          l,
          m,
          n = "function" == typeof a && a,
          o = !f && g(a = n.selector || a);

      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length);
        }

        for (i = W.needsContext.test(a) ? 0 : j.length; i-- && (k = j[i], !d.relative[l = k.type]);) {
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
            break;
          }
        }
      }

      return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"));
    }), ia(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ja("type|href|height|width", function (a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ia(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ja("value", function (a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
    }), ia(function (a) {
      return null == a.getAttribute("disabled");
    }) || ja(K, function (a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), fa;
  }(a);

  n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;

  var u = function u(a, b, c) {
    for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType;) {
      if (1 === a.nodeType) {
        if (e && n(a).is(c)) break;
        d.push(a);
      }
    }

    return d;
  },
      v = function v(a, b) {
    for (var c = []; a; a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }

    return c;
  },
      w = n.expr.match.needsContext,
      x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      y = /^.[^:#\[\.,]*$/;

  n.filter = function (a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, n.fn.extend({
    find: function find(a) {
      var b,
          c = this.length,
          d = [],
          e = this;
      if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
        for (b = 0; c > b; b++) {
          if (n.contains(e[b], this)) return !0;
        }
      }));

      for (b = 0; c > b; b++) {
        n.find(a, e[b], d);
      }

      return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d;
    },
    filter: function filter(a) {
      return this.pushStack(z(this, a || [], !1));
    },
    not: function not(a) {
      return this.pushStack(z(this, a || [], !0));
    },
    is: function is(a) {
      return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length;
    }
  });

  var A,
      B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      C = n.fn.init = function (a, b, c) {
    var e, f;
    if (!a) return this;

    if (c = c || A, "string" == typeof a) {
      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);

      if (e[1]) {
        if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b)) for (e in b) {
          n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
        }
        return this;
      }

      return f = d.getElementById(e[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = d, this.selector = a, this;
    }

    return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
  };

  C.prototype = n.fn, A = n(d);
  var D = /^(?:parents|prev(?:Until|All))/,
      E = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  n.fn.extend({
    has: function has(a) {
      var b = n(a, this),
          c = b.length;
      return this.filter(function () {
        for (var a = 0; c > a; a++) {
          if (n.contains(this, b[a])) return !0;
        }
      });
    },
    closest: function closest(a, b) {
      for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break;
          }
        }
      }

      return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
    },
    index: function index(a) {
      return a ? "string" == typeof a ? h.call(n(a), this[0]) : h.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
    },
    addBack: function addBack(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }
  }), n.each({
    parent: function parent(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    parents: function parents(a) {
      return u(a, "parentNode");
    },
    parentsUntil: function parentsUntil(a, b, c) {
      return u(a, "parentNode", c);
    },
    next: function next(a) {
      return F(a, "nextSibling");
    },
    prev: function prev(a) {
      return F(a, "previousSibling");
    },
    nextAll: function nextAll(a) {
      return u(a, "nextSibling");
    },
    prevAll: function prevAll(a) {
      return u(a, "previousSibling");
    },
    nextUntil: function nextUntil(a, b, c) {
      return u(a, "nextSibling", c);
    },
    prevUntil: function prevUntil(a, b, c) {
      return u(a, "previousSibling", c);
    },
    siblings: function siblings(a) {
      return v((a.parentNode || {}).firstChild, a);
    },
    children: function children(a) {
      return v(a.firstChild);
    },
    contents: function contents(a) {
      return a.contentDocument || n.merge([], a.childNodes);
    }
  }, function (a, b) {
    n.fn[a] = function (c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || n.uniqueSort(e), D.test(a) && e.reverse()), this.pushStack(e);
    };
  });
  var G = /\S+/g;
  n.Callbacks = function (a) {
    a = "string" == typeof a ? H(a) : n.extend({}, a);

    var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function i() {
      for (e = a.once, d = b = !0; g.length; h = -1) {
        for (c = g.shift(); ++h < f.length;) {
          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
        }
      }

      a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
    },
        j = {
      add: function add() {
        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
          n.each(b, function (b, c) {
            n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c);
          });
        }(arguments), c && !b && i()), this;
      },
      remove: function remove() {
        return n.each(arguments, function (a, b) {
          for (var c; (c = n.inArray(b, f, c)) > -1;) {
            f.splice(c, 1), h >= c && h--;
          }
        }), this;
      },
      has: function has(a) {
        return a ? n.inArray(a, f) > -1 : f.length > 0;
      },
      empty: function empty() {
        return f && (f = []), this;
      },
      disable: function disable() {
        return e = g = [], f = c = "", this;
      },
      disabled: function disabled() {
        return !f;
      },
      lock: function lock() {
        return e = g = [], c || (f = c = ""), this;
      },
      locked: function locked() {
        return !!e;
      },
      fireWith: function fireWith(a, c) {
        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
      },
      fire: function fire() {
        return j.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!d;
      }
    };

    return j;
  }, n.extend({
    Deferred: function Deferred(a) {
      var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
          c = "pending",
          d = {
        state: function state() {
          return c;
        },
        always: function always() {
          return e.done(arguments).fail(arguments), this;
        },
        then: function then() {
          var a = arguments;
          return n.Deferred(function (c) {
            n.each(b, function (b, f) {
              var g = n.isFunction(a[b]) && a[b];
              e[f[1]](function () {
                var a = g && g.apply(this, arguments);
                a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
              });
            }), a = null;
          }).promise();
        },
        promise: function promise(a) {
          return null != a ? n.extend(a, d) : d;
        }
      },
          e = {};
      return d.pipe = d.then, n.each(b, function (a, f) {
        var g = f[2],
            h = f[3];
        d[f[1]] = g.add, h && g.add(function () {
          c = h;
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
          return e[f[0] + "With"](this === e ? d : this, arguments), this;
        }, e[f[0] + "With"] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    },
    when: function when(a) {
      var i,
          j,
          k,
          b = 0,
          c = e.call(arguments),
          d = c.length,
          f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function h(a, b, c) {
        return function (d) {
          b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
        };
      };

      if (d > 1) for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) {
        c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
      }
      return f || g.resolveWith(k, c), g.promise();
    }
  });
  var I;
  n.fn.ready = function (a) {
    return n.ready.promise().done(a), this;
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function holdReady(a) {
      a ? n.readyWait++ : n.ready(!0);
    },
    ready: function ready(a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))));
    }
  }), n.ready.promise = function (b) {
    return I || (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(n.ready) : (d.addEventListener("DOMContentLoaded", J), a.addEventListener("load", J))), I.promise(b);
  }, n.ready.promise();

  var K = function K(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;

    if ("object" === n.type(c)) {
      e = !0;

      for (h in c) {
        K(a, b, h, c[h], !0, f, g);
      }
    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
      return j.call(n(a), c);
    })), b)) for (; i > h; h++) {
      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    }

    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  },
      L = function L(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };

  M.uid = 1, M.prototype = {
    register: function register(a, b) {
      var c = b || {};
      return a.nodeType ? a[this.expando] = c : Object.defineProperty(a, this.expando, {
        value: c,
        writable: !0,
        configurable: !0
      }), a[this.expando];
    },
    cache: function cache(a) {
      if (!L(a)) return {};
      var b = a[this.expando];
      return b || (b = {}, L(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
        value: b,
        configurable: !0
      }))), b;
    },
    set: function set(a, b, c) {
      var d,
          e = this.cache(a);
      if ("string" == typeof b) e[b] = c;else for (d in b) {
        e[d] = b[d];
      }
      return e;
    },
    get: function get(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][b];
    },
    access: function access(a, b, c) {
      var d;
      return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
    },
    remove: function remove(a, b) {
      var c,
          d,
          e,
          f = a[this.expando];

      if (void 0 !== f) {
        if (void 0 === b) this.register(a);else {
          n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in f ? d = [b, e] : (d = e, d = d in f ? [d] : d.match(G) || [])), c = d.length;

          for (; c--;) {
            delete f[d[c]];
          }
        }
        (void 0 === b || n.isEmptyObject(f)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
      }
    },
    hasData: function hasData(a) {
      var b = a[this.expando];
      return void 0 !== b && !n.isEmptyObject(b);
    }
  };
  var N = new M(),
      O = new M(),
      P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Q = /[A-Z]/g;
  n.extend({
    hasData: function hasData(a) {
      return O.hasData(a) || N.hasData(a);
    },
    data: function data(a, b, c) {
      return O.access(a, b, c);
    },
    removeData: function removeData(a, b) {
      O.remove(a, b);
    },
    _data: function _data(a, b, c) {
      return N.access(a, b, c);
    },
    _removeData: function _removeData(a, b) {
      N.remove(a, b);
    }
  }), n.fn.extend({
    data: function data(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;

      if (void 0 === a) {
        if (this.length && (e = O.get(f), 1 === f.nodeType && !N.get(f, "hasDataAttrs"))) {
          for (c = g.length; c--;) {
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), R(f, d, e[d])));
          }

          N.set(f, "hasDataAttrs", !0);
        }

        return e;
      }

      return "object" == _typeof(a) ? this.each(function () {
        O.set(this, a);
      }) : K(this, function (b) {
        var c, d;

        if (f && void 0 === b) {
          if (c = O.get(f, a) || O.get(f, a.replace(Q, "-$&").toLowerCase()), void 0 !== c) return c;
          if (d = n.camelCase(a), c = O.get(f, d), void 0 !== c) return c;
          if (c = R(f, d, void 0), void 0 !== c) return c;
        } else d = n.camelCase(a), this.each(function () {
          var c = O.get(this, d);
          O.set(this, d, b), a.indexOf("-") > -1 && void 0 !== c && O.set(this, a, b);
        });
      }, null, b, arguments.length > 1, null, !0);
    },
    removeData: function removeData(a) {
      return this.each(function () {
        O.remove(this, a);
      });
    }
  }), n.extend({
    queue: function queue(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = N.get(a, b), c && (!d || n.isArray(c) ? d = N.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
    },
    dequeue: function dequeue(a, b) {
      b = b || "fx";

      var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function g() {
        n.dequeue(a, b);
      };

      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    },
    _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";
      return N.get(a, c) || N.access(a, c, {
        empty: n.Callbacks("once memory").add(function () {
          N.remove(a, [b + "queue", c]);
        })
      });
    }
  }), n.fn.extend({
    queue: function queue(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
      });
    },
    dequeue: function dequeue(a) {
      return this.each(function () {
        n.dequeue(this, a);
      });
    },
    clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    },
    promise: function promise(a, b) {
      var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function h() {
        --d || e.resolveWith(f, [f]);
      };

      for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) {
        c = N.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      }

      return h(), e.promise(b);
    }
  });

  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      T = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
      U = ["Top", "Right", "Bottom", "Left"],
      V = function V(a, b) {
    return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
  },
      X = /^(?:checkbox|radio)$/i,
      Y = /<([\w:-]+)/,
      Z = /^$|\/(?:java|ecma)script/i,
      $ = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  $.optgroup = $.option, $.tbody = $.tfoot = $.colgroup = $.caption = $.thead, $.th = $.td;
  var ba = /<|&#?\w+;/;
  !function () {
    var a = d.createDocumentFragment(),
        b = a.appendChild(d.createElement("div")),
        c = d.createElement("input");
    c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();
  var da = /^key/,
      ea = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      fa = /^([^.]*)(?:\.(.+)|)/;
  n.event = {
    global: {},
    add: function add(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = N.get(a);
      if (r) for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {
        return "undefined" != typeof n && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;
      }), b = (b || "").match(G) || [""], j = b.length; j--;) {
        h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && n.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);
      }
    },
    remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = N.hasData(a) && N.get(a);

      if (r && (i = r.events)) {
        for (b = (b || "").match(G) || [""], j = b.length; j--;) {
          if (h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            for (l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) {
              k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            }

            g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);
          } else for (o in i) {
            n.event.remove(a, o + b[j], c, d, !0);
          }
        }

        n.isEmptyObject(i) && N.remove(a, "handle events");
      }
    },
    dispatch: function dispatch(a) {
      a = n.event.fix(a);
      var b,
          c,
          d,
          f,
          g,
          h = [],
          i = e.call(arguments),
          j = (N.get(this, "events") || {})[a.type] || [],
          k = n.event.special[a.type] || {};

      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        for (h = n.event.handlers.call(this, a, j), b = 0; (f = h[b++]) && !a.isPropagationStopped();) {
          for (a.currentTarget = f.elem, c = 0; (g = f.handlers[c++]) && !a.isImmediatePropagationStopped();) {
            a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
          }
        }

        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function handlers(a, b) {
      var c,
          d,
          e,
          f,
          g = [],
          h = b.delegateCount,
          i = a.target;
      if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i !== this; i = i.parentNode || this) {
        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
          for (d = [], c = 0; h > c; c++) {
            f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
          }

          d.length && g.push({
            elem: i,
            handlers: d
          });
        }
      }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function filter(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function filter(a, b) {
        var c,
            e,
            f,
            g = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || d, e = c.documentElement, f = c.body, a.pageX = b.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a;
      }
    },
    fix: function fix(a) {
      if (a[n.expando]) return a;
      var b,
          c,
          e,
          f = a.type,
          g = a,
          h = this.fixHooks[f];

      for (h || (this.fixHooks[f] = h = ea.test(f) ? this.mouseHooks : da.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length; b--;) {
        c = e[b], a[c] = g[c];
      }

      return a.target || (a.target = d), 3 === a.target.nodeType && (a.target = a.target.parentNode), h.filter ? h.filter(a, g) : a;
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function trigger() {
          return this !== ia() && this.focus ? (this.focus(), !1) : void 0;
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function trigger() {
          return this === ia() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function trigger() {
          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0;
        },
        _default: function _default(a) {
          return n.nodeName(a.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        }
      }
    }
  }, n.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c);
  }, n.Event = function (a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ga : ha) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
  }, n.Event.prototype = {
    constructor: n.Event,
    isDefaultPrevented: ha,
    isPropagationStopped: ha,
    isImmediatePropagationStopped: ha,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var a = this.originalEvent;
      this.isDefaultPrevented = ga, a && !this.isSimulated && a.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var a = this.originalEvent;
      this.isPropagationStopped = ga, a && !this.isSimulated && a.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = ga, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;
        return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      }
    };
  }), n.fn.extend({
    on: function on(a, b, c, d) {
      return ja(this, a, b, c, d);
    },
    one: function one(a, b, c, d) {
      return ja(this, a, b, c, d, 1);
    },
    off: function off(a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;

      if ("object" == _typeof(a)) {
        for (e in a) {
          this.off(e, b, a[e]);
        }

        return this;
      }

      return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = ha), this.each(function () {
        n.event.remove(this, a, c, b);
      });
    }
  });
  var ka = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      la = /<script|<style|<link/i,
      ma = /checked\s*(?:[^=]|=\s*.checked.)/i,
      na = /^true\/(.*)/,
      oa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  n.extend({
    htmlPrefilter: function htmlPrefilter(a) {
      return a.replace(ka, "<$1></$2>");
    },
    clone: function clone(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = n.contains(a.ownerDocument, a);
      if (!(l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (g = _(h), f = _(a), d = 0, e = f.length; e > d; d++) {
        ta(f[d], g[d]);
      }
      if (b) if (c) for (f = f || _(a), g = g || _(h), d = 0, e = f.length; e > d; d++) {
        sa(f[d], g[d]);
      } else sa(a, h);
      return g = _(h, "script"), g.length > 0 && aa(g, !i && _(a, "script")), h;
    },
    cleanData: function cleanData(a) {
      for (var b, c, d, e = n.event.special, f = 0; void 0 !== (c = a[f]); f++) {
        if (L(c)) {
          if (b = c[N.expando]) {
            if (b.events) for (d in b.events) {
              e[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
            }
            c[N.expando] = void 0;
          }

          c[O.expando] && (c[O.expando] = void 0);
        }
      }
    }
  }), n.fn.extend({
    domManip: ua,
    detach: function detach(a) {
      return va(this, a, !0);
    },
    remove: function remove(a) {
      return va(this, a);
    },
    text: function text(a) {
      return K(this, function (a) {
        return void 0 === a ? n.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
        });
      }, null, a, arguments.length);
    },
    append: function append() {
      return ua(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.appendChild(a);
        }
      });
    },
    prepend: function prepend() {
      return ua(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.insertBefore(a, b.firstChild);
        }
      });
    },
    before: function before() {
      return ua(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    },
    after: function after() {
      return ua(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && (n.cleanData(_(a, !1)), a.textContent = "");
      }

      return this;
    },
    clone: function clone(a, b) {
      return a = null != a && a, b = null == b ? a : b, this.map(function () {
        return n.clone(this, a, b);
      });
    },
    html: function html(a) {
      return K(this, function (a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;
        if (void 0 === a && 1 === b.nodeType) return b.innerHTML;

        if ("string" == typeof a && !la.test(a) && !$[(Y.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = n.htmlPrefilter(a);

          try {
            for (; d > c; c++) {
              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(_(b, !1)), b.innerHTML = a);
            }

            b = 0;
          } catch (e) {}
        }

        b && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function replaceWith() {
      var a = [];
      return ua(this, arguments, function (b) {
        var c = this.parentNode;
        n.inArray(this, a) < 0 && (n.cleanData(_(this)), c && c.replaceChild(b, this));
      }, a);
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    n.fn[a] = function (a) {
      for (var c, d = [], e = n(a), f = e.length - 1, h = 0; f >= h; h++) {
        c = h === f ? this : this.clone(!0), n(e[h])[b](c), g.apply(d, c.get());
      }

      return this.pushStack(d);
    };
  });

  var wa,
      xa = {
    HTML: "block",
    BODY: "block"
  },
      Aa = /^margin/,
      Ba = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
      Ca = function Ca(b) {
    var c = b.ownerDocument.defaultView;
    return c && c.opener || (c = a), c.getComputedStyle(b);
  },
      Da = function Da(a, b, c, d) {
    var e,
        f,
        g = {};

    for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }

    e = c.apply(a, d || []);

    for (f in b) {
      a.style[f] = g[f];
    }

    return e;
  },
      Ea = d.documentElement;

  !function () {
    function i() {
      h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Ea.appendChild(g);
      var d = a.getComputedStyle(h);
      b = "1%" !== d.top, f = "2px" === d.marginLeft, c = "4px" === d.width, h.style.marginRight = "50%", e = "4px" === d.marginRight, Ea.removeChild(g);
    }

    var b,
        c,
        e,
        f,
        g = d.createElement("div"),
        h = d.createElement("div");
    h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), n.extend(l, {
      pixelPosition: function pixelPosition() {
        return i(), b;
      },
      boxSizingReliable: function boxSizingReliable() {
        return null == c && i(), c;
      },
      pixelMarginRight: function pixelMarginRight() {
        return null == c && i(), e;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return null == c && i(), f;
      },
      reliableMarginRight: function reliableMarginRight() {
        var b,
            c = h.appendChild(d.createElement("div"));
        return c.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", h.style.width = "1px", Ea.appendChild(g), b = !parseFloat(a.getComputedStyle(c).marginRight), Ea.removeChild(g), h.removeChild(c), b;
      }
    }));
  }();
  var Ha = /^(none|table(?!-c[ea]).+)/,
      Ia = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Ja = {
    letterSpacing: "0",
    fontWeight: "400"
  },
      Ka = ["Webkit", "O", "Moz", "ms"],
      La = d.createElement("div").style;
  n.extend({
    cssHooks: {
      opacity: {
        get: function get(a, b) {
          if (b) {
            var c = Fa(a, "opacity");
            return "" === c ? "1" : c;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function style(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = n.camelCase(b),
            i = a.style;
        return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = _typeof(c), "string" === f && (e = T.exec(c)) && e[1] && (c = W(a, b, e), f = "number"), void (null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))));
      }
    },
    css: function css(a, b, c, d) {
      var e,
          f,
          g,
          h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Fa(a, b, d)), "normal" === e && b in Ja && (e = Ja[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
    }
  }), n.each(["height", "width"], function (a, b) {
    n.cssHooks[b] = {
      get: function get(a, c, d) {
        return c ? Ha.test(n.css(a, "display")) && 0 === a.offsetWidth ? Da(a, Ia, function () {
          return Pa(a, b, d);
        }) : Pa(a, b, d) : void 0;
      },
      set: function set(a, c, d) {
        var e,
            f = d && Ca(a),
            g = d && Oa(a, b, d, "border-box" === n.css(a, "boxSizing", !1, f), f);
        return g && (e = T.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = n.css(a, b)), Na(a, c, g);
      }
    };
  }), n.cssHooks.marginLeft = Ga(l.reliableMarginLeft, function (a, b) {
    return b ? (parseFloat(Fa(a, "marginLeft")) || a.getBoundingClientRect().left - Da(a, {
      marginLeft: 0
    }, function () {
      return a.getBoundingClientRect().left;
    })) + "px" : void 0;
  }), n.cssHooks.marginRight = Ga(l.reliableMarginRight, function (a, b) {
    return b ? Da(a, {
      display: "inline-block"
    }, Fa, [a, "marginRight"]) : void 0;
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (a, b) {
    n.cssHooks[a + b] = {
      expand: function expand(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) {
          e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
        }

        return e;
      }
    }, Aa.test(a) || (n.cssHooks[a + b].set = Na);
  }), n.fn.extend({
    css: function css(a, b) {
      return K(this, function (a, b, c) {
        var d,
            e,
            f = {},
            g = 0;

        if (n.isArray(b)) {
          for (d = Ca(a), e = b.length; e > g; g++) {
            f[b[g]] = n.css(a, b[g], !1, d);
          }

          return f;
        }

        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
      }, a, b, arguments.length > 1);
    },
    show: function show() {
      return Qa(this, !0);
    },
    hide: function hide() {
      return Qa(this);
    },
    toggle: function toggle(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        V(this) ? n(this).show() : n(this).hide();
      });
    }
  }), n.Tween = Ra, Ra.prototype = {
    constructor: Ra,
    init: function init(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
    },
    cur: function cur() {
      var a = Ra.propHooks[this.prop];
      return a && a.get ? a.get(this) : Ra.propHooks._default.get(this);
    },
    run: function run(a) {
      var b,
          c = Ra.propHooks[this.prop];
      return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ra.propHooks._default.set(this), this;
    }
  }, Ra.prototype.init.prototype = Ra.prototype, Ra.propHooks = {
    _default: {
      get: function get(a) {
        var b;
        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
      },
      set: function set(a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit);
      }
    }
  }, Ra.propHooks.scrollTop = Ra.propHooks.scrollLeft = {
    set: function set(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    }
  }, n.easing = {
    linear: function linear(a) {
      return a;
    },
    swing: function swing(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    },
    _default: "swing"
  }, n.fx = Ra.prototype.init, n.fx.step = {};
  var Sa,
      Ta,
      Ua = /^(?:toggle|show|hide)$/,
      Va = /queueHooks$/;
  n.Animation = n.extend(_a, {
    tweeners: {
      "*": [function (a, b) {
        var c = this.createTween(a, b);
        return W(c.elem, a, T.exec(b), c), c;
      }]
    },
    tweener: function tweener(a, b) {
      n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);

      for (var c, d = 0, e = a.length; e > d; d++) {
        c = a[d], _a.tweeners[c] = _a.tweeners[c] || [], _a.tweeners[c].unshift(b);
      }
    },
    prefilters: [Za],
    prefilter: function prefilter(a, b) {
      b ? _a.prefilters.unshift(a) : _a.prefilters.push(a);
    }
  }), n.speed = function (a, b, c) {
    var d = a && "object" == _typeof(a) ? n.extend({}, a) : {
      complete: c || !c && b || n.isFunction(a) && a,
      duration: a,
      easing: c && b || b && !n.isFunction(b) && b
    };
    return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
    }, d;
  }, n.fn.extend({
    fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(V).css("opacity", 0).show().end().animate({
        opacity: b
      }, a, c, d);
    },
    animate: function animate(a, b, c, d) {
      var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function g() {
        var b = _a(this, n.extend({}, a), f);

        (e || N.get(this, "finish")) && b.stop(!0);
      };

      return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    },
    stop: function stop(a, b, c) {
      var d = function d(a) {
        var b = a.stop;
        delete a.stop, b(c);
      };

      return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = N.get(this);
        if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
          g[e] && g[e].stop && Va.test(e) && d(g[e]);
        }

        for (e = f.length; e--;) {
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        }

        !b && c || n.dequeue(this, a);
      });
    },
    finish: function finish(a) {
      return a !== !1 && (a = a || "fx"), this.each(function () {
        var b,
            c = N.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;

        for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        }

        for (b = 0; g > b; b++) {
          d[b] && d[b].finish && d[b].finish.call(this);
        }

        delete c.finish;
      });
    }
  }), n.each(["toggle", "show", "hide"], function (a, b) {
    var c = n.fn[b];

    n.fn[b] = function (a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Xa(b, !0), a, d, e);
    };
  }), n.each({
    slideDown: Xa("show"),
    slideUp: Xa("hide"),
    slideToggle: Xa("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (a, b) {
    n.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), n.timers = [], n.fx.tick = function () {
    var a,
        b = 0,
        c = n.timers;

    for (Sa = n.now(); b < c.length; b++) {
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    }

    c.length || n.fx.stop(), Sa = void 0;
  }, n.fx.timer = function (a) {
    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
  }, n.fx.interval = 13, n.fx.start = function () {
    Ta || (Ta = a.setInterval(n.fx.tick, n.fx.interval));
  }, n.fx.stop = function () {
    a.clearInterval(Ta), Ta = null;
  }, n.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, n.fn.delay = function (b, c) {
    return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
      var e = a.setTimeout(c, b);

      d.stop = function () {
        a.clearTimeout(e);
      };
    });
  }, function () {
    var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));
    a.type = "checkbox", l.checkOn = "" !== a.value, l.optSelected = c.selected, b.disabled = !0, l.optDisabled = !c.disabled, a = d.createElement("input"), a.value = "t", a.type = "radio", l.radioValue = "t" === a.value;
  }();
  var ab,
      bb = n.expr.attrHandle;
  n.fn.extend({
    attr: function attr(a, b) {
      return K(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function removeAttr(a) {
      return this.each(function () {
        n.removeAttr(this, a);
      });
    }
  }), n.extend({
    attr: function attr(a, b, c) {
      var d,
          e,
          f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ab : void 0)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d));
    },
    attrHooks: {
      type: {
        set: function set(a, b) {
          if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b;
          }
        }
      }
    },
    removeAttr: function removeAttr(a, b) {
      var c,
          d,
          e = 0,
          f = b && b.match(G);
      if (f && 1 === a.nodeType) for (; c = f[e++];) {
        d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);
      }
    }
  }), ab = {
    set: function set(a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
    }
  }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = bb[b] || n.find.attr;

    bb[b] = function (a, b, d) {
      var e, f;
      return d || (f = bb[b], bb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, bb[b] = f), e;
    };
  });
  var cb = /^(?:input|select|textarea|button)$/i,
      db = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function prop(a, b) {
      return K(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function removeProp(a) {
      return this.each(function () {
        delete this[n.propFix[a] || a];
      });
    }
  }), n.extend({
    prop: function prop(a, b, c) {
      var d,
          e,
          f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    },
    propHooks: {
      tabIndex: {
        get: function get(a) {
          var b = n.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : cb.test(a.nodeName) || db.test(a.nodeName) && a.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), l.optSelected || (n.propHooks.selected = {
    get: function get(a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null;
    },
    set: function set(a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    }
  }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    n.propFix[this.toLowerCase()] = this;
  });
  var eb = /[\t\r\n\f]/g;
  n.fn.extend({
    addClass: function addClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).addClass(a.call(this, b, fb(this)));
      });
      if ("string" == typeof a && a) for (b = a.match(G) || []; c = this[i++];) {
        if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
          for (g = 0; f = b[g++];) {
            d.indexOf(" " + f + " ") < 0 && (d += f + " ");
          }

          h = n.trim(d), e !== h && c.setAttribute("class", h);
        }
      }
      return this;
    },
    removeClass: function removeClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).removeClass(a.call(this, b, fb(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof a && a) for (b = a.match(G) || []; c = this[i++];) {
        if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
          for (g = 0; f = b[g++];) {
            for (; d.indexOf(" " + f + " ") > -1;) {
              d = d.replace(" " + f + " ", " ");
            }
          }

          h = n.trim(d), e !== h && c.setAttribute("class", h);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(a, b) {
      var c = _typeof(a);

      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
        n(this).toggleClass(a.call(this, c, fb(this), b), b);
      }) : this.each(function () {
        var b, d, e, f;
        if ("string" === c) for (d = 0, e = n(this), f = a.match(G) || []; b = f[d++];) {
          e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        } else void 0 !== a && "boolean" !== c || (b = fb(this), b && N.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : N.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(a) {
      var b,
          c,
          d = 0;

      for (b = " " + a + " "; c = this[d++];) {
        if (1 === c.nodeType && (" " + fb(c) + " ").replace(eb, " ").indexOf(b) > -1) return !0;
      }

      return !1;
    }
  });
  var gb = /\r/g,
      hb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function val(a) {
      var b,
          c,
          d,
          e = this[0];
      return arguments.length ? (d = n.isFunction(a), this.each(function (c) {
        var e;
        1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
          return null == a ? "" : a + "";
        })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
      })) : e ? (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(gb, "") : null == c ? "" : c)) : void 0;
    }
  }), n.extend({
    valHooks: {
      option: {
        get: function get(a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a)).replace(hb, " ");
        }
      },
      select: {
        get: function get(a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) {
            if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f) return b;
              g.push(b);
            }
          }

          return g;
        },
        set: function set(a, b) {
          for (var c, d, e = a.options, f = n.makeArray(b), g = e.length; g--;) {
            d = e[g], (d.selected = n.inArray(n.valHooks.option.get(d), f) > -1) && (c = !0);
          }

          return c || (a.selectedIndex = -1), f;
        }
      }
    }
  }), n.each(["radio", "checkbox"], function () {
    n.valHooks[this] = {
      set: function set(a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0;
      }
    }, l.checkOn || (n.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });
  var ib = /^(?:focusinfocus|focusoutblur)$/;
  n.extend(n.event, {
    trigger: function trigger(b, c, e, f) {
      var g,
          h,
          i,
          j,
          l,
          m,
          o,
          p = [e || d],
          q = k.call(b, "type") ? b.type : b,
          r = k.call(b, "namespace") ? b.namespace.split(".") : [];

      if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !ib.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), l = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == _typeof(b) && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, f || !o.trigger || o.trigger.apply(e, c) !== !1)) {
        if (!f && !o.noBubble && !n.isWindow(e)) {
          for (j = o.delegateType || q, ib.test(j + q) || (h = h.parentNode); h; h = h.parentNode) {
            p.push(h), i = h;
          }

          i === (e.ownerDocument || d) && p.push(i.defaultView || i.parentWindow || a);
        }

        for (g = 0; (h = p[g++]) && !b.isPropagationStopped();) {
          b.type = g > 1 ? j : o.bindType || q, m = (N.get(h, "events") || {})[b.type] && N.get(h, "handle"), m && m.apply(h, c), m = l && h[l], m && m.apply && L(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        }

        return b.type = q, f || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !L(e) || l && n.isFunction(e[q]) && !n.isWindow(e) && (i = e[l], i && (e[l] = null), n.event.triggered = q, e[q](), n.event.triggered = void 0, i && (e[l] = i)), b.result;
      }
    },
    simulate: function simulate(a, b, c) {
      var d = n.extend(new n.Event(), c, {
        type: a,
        isSimulated: !0
      });
      n.event.trigger(d, null, b);
    }
  }), n.fn.extend({
    trigger: function trigger(a, b) {
      return this.each(function () {
        n.event.trigger(a, b, this);
      });
    },
    triggerHandler: function triggerHandler(a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0;
    }
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    n.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), n.fn.extend({
    hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    }
  }), l.focusin = "onfocusin" in a, l.focusin || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function (a, b) {
    var c = function c(a) {
      n.event.simulate(b, a.target, n.event.fix(a));
    };

    n.event.special[b] = {
      setup: function setup() {
        var d = this.ownerDocument || this,
            e = N.access(d, b);
        e || d.addEventListener(a, c, !0), N.access(d, b, (e || 0) + 1);
      },
      teardown: function teardown() {
        var d = this.ownerDocument || this,
            e = N.access(d, b) - 1;
        e ? N.access(d, b, e) : (d.removeEventListener(a, c, !0), N.remove(d, b));
      }
    };
  });
  var jb = a.location,
      kb = n.now(),
      lb = /\?/;
  n.parseJSON = function (a) {
    return JSON.parse(a + "");
  }, n.parseXML = function (b) {
    var c;
    if (!b || "string" != typeof b) return null;

    try {
      c = new a.DOMParser().parseFromString(b, "text/xml");
    } catch (d) {
      c = void 0;
    }

    return c && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c;
  };
  var mb = /#.*$/,
      nb = /([?&])_=[^&]*/,
      ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      qb = /^(?:GET|HEAD)$/,
      rb = /^\/\//,
      sb = {},
      tb = {},
      ub = "*/".concat("*"),
      vb = d.createElement("a");
  vb.href = jb.href, n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: jb.href,
      type: "GET",
      isLocal: pb.test(jb.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": ub,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(a, b) {
      return b ? yb(yb(a, n.ajaxSettings), b) : yb(n.ajaxSettings, a);
    },
    ajaxPrefilter: wb(sb),
    ajaxTransport: wb(tb),
    ajax: function ajax(b, c) {
      function z(b, c, d, h) {
        var j,
            l,
            t,
            u,
            w,
            y = c;
        2 !== v && (v = 2, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && 300 > b || 304 === b, d && (u = zb(m, x, d)), u = Ab(m, u, x, j), j ? (m.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (n.lastModified[f] = w), w = x.getResponseHeader("etag"), w && (n.etag[f] = w)), 204 === b || "HEAD" === m.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = u.state, l = u.data, t = u.error, j = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), x.status = b, x.statusText = (c || y) + "", j ? q.resolveWith(o, [l, y, x]) : q.rejectWith(o, [x, y, t]), x.statusCode(s), s = void 0, k && p.trigger(j ? "ajaxSuccess" : "ajaxError", [x, m, j ? l : t]), r.fireWith(o, [x, y]), k && (p.trigger("ajaxComplete", [x, m]), --n.active || n.event.trigger("ajaxStop")));
      }

      "object" == _typeof(b) && (c = b, b = void 0), c = c || {};
      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m = n.ajaxSetup({}, c),
          o = m.context || m,
          p = m.context && (o.nodeType || o.jquery) ? n(o) : n.event,
          q = n.Deferred(),
          r = n.Callbacks("once memory"),
          s = m.statusCode || {},
          t = {},
          u = {},
          v = 0,
          w = "canceled",
          x = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(a) {
          var b;

          if (2 === v) {
            if (!h) for (h = {}; b = ob.exec(g);) {
              h[b[1].toLowerCase()] = b[2];
            }
            b = h[a.toLowerCase()];
          }

          return null == b ? null : b;
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return 2 === v ? g : null;
        },
        setRequestHeader: function setRequestHeader(a, b) {
          var c = a.toLowerCase();
          return v || (a = u[c] = u[c] || a, t[a] = b), this;
        },
        overrideMimeType: function overrideMimeType(a) {
          return v || (m.mimeType = a), this;
        },
        statusCode: function statusCode(a) {
          var b;
          if (a) if (2 > v) for (b in a) {
            s[b] = [s[b], a[b]];
          } else x.always(a[x.status]);
          return this;
        },
        abort: function abort(a) {
          var b = a || w;
          return e && e.abort(b), z(0, b), this;
        }
      };

      if (q.promise(x).complete = r.add, x.success = x.done, x.error = x.fail, m.url = ((b || m.url || jb.href) + "").replace(mb, "").replace(rb, jb.protocol + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = n.trim(m.dataType || "*").toLowerCase().match(G) || [""], null == m.crossDomain) {
        j = d.createElement("a");

        try {
          j.href = m.url, j.href = j.href, m.crossDomain = vb.protocol + "//" + vb.host != j.protocol + "//" + j.host;
        } catch (y) {
          m.crossDomain = !0;
        }
      }

      if (m.data && m.processData && "string" != typeof m.data && (m.data = n.param(m.data, m.traditional)), xb(sb, m, c, x), 2 === v) return x;
      k = n.event && m.global, k && 0 === n.active++ && n.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !qb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (lb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = nb.test(f) ? f.replace(nb, "$1_=" + kb++) : f + (lb.test(f) ? "&" : "?") + "_=" + kb++)), m.ifModified && (n.lastModified[f] && x.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && x.setRequestHeader("If-None-Match", n.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : m.accepts["*"]);

      for (l in m.headers) {
        x.setRequestHeader(l, m.headers[l]);
      }

      if (m.beforeSend && (m.beforeSend.call(o, x, m) === !1 || 2 === v)) return x.abort();
      w = "abort";

      for (l in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        x[l](m[l]);
      }

      if (e = xb(tb, m, c, x)) {
        if (x.readyState = 1, k && p.trigger("ajaxSend", [x, m]), 2 === v) return x;
        m.async && m.timeout > 0 && (i = a.setTimeout(function () {
          x.abort("timeout");
        }, m.timeout));

        try {
          v = 1, e.send(t, z);
        } catch (y) {
          if (!(2 > v)) throw y;
          z(-1, y);
        }
      } else z(-1, "No Transport");

      return x;
    },
    getJSON: function getJSON(a, b, c) {
      return n.get(a, b, c, "json");
    },
    getScript: function getScript(a, b) {
      return n.get(a, void 0, b, "script");
    }
  }), n.each(["get", "post"], function (a, b) {
    n[b] = function (a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      }, n.isPlainObject(a) && a));
    };
  }), n._evalUrl = function (a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    });
  }, n.fn.extend({
    wrapAll: function wrapAll(a) {
      var b;
      return n.isFunction(a) ? this.each(function (b) {
        n(this).wrapAll(a.call(this, b));
      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        for (var a = this; a.firstElementChild;) {
          a = a.firstElementChild;
        }

        return a;
      }).append(this)), this);
    },
    wrapInner: function wrapInner(a) {
      return n.isFunction(a) ? this.each(function (b) {
        n(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = n(this),
            c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a);
      });
    },
    wrap: function wrap(a) {
      var b = n.isFunction(a);
      return this.each(function (c) {
        n(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function unwrap() {
      return this.parent().each(function () {
        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
      }).end();
    }
  }), n.expr.filters.hidden = function (a) {
    return !n.expr.filters.visible(a);
  }, n.expr.filters.visible = function (a) {
    return a.offsetWidth > 0 || a.offsetHeight > 0 || a.getClientRects().length > 0;
  };
  var Bb = /%20/g,
      Cb = /\[\]$/,
      Db = /\r?\n/g,
      Eb = /^(?:submit|button|image|reset|file)$/i,
      Fb = /^(?:input|select|textarea|keygen)/i;
  n.param = function (a, b) {
    var c,
        d = [],
        e = function e(a, b) {
      b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
    };

    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
      e(this.name, this.value);
    });else for (c in a) {
      Gb(c, a[c], b, e);
    }
    return d.join("&").replace(Bb, "+");
  }, n.fn.extend({
    serialize: function serialize() {
      return n.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && Fb.test(this.nodeName) && !Eb.test(a) && (this.checked || !X.test(a));
      }).map(function (a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
          return {
            name: b.name,
            value: a.replace(Db, "\r\n")
          };
        }) : {
          name: b.name,
          value: c.replace(Db, "\r\n")
        };
      }).get();
    }
  }), n.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  };
  var Hb = {
    0: 200,
    1223: 204
  },
      Ib = n.ajaxSettings.xhr();
  l.cors = !!Ib && "withCredentials" in Ib, l.ajax = Ib = !!Ib, n.ajaxTransport(function (b) {
    var _c, d;

    return l.cors || Ib && !b.crossDomain ? {
      send: function send(e, f) {
        var g,
            h = b.xhr();
        if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) {
          h[g] = b.xhrFields[g];
        }
        b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");

        for (g in e) {
          h.setRequestHeader(g, e[g]);
        }

        _c = function c(a) {
          return function () {
            _c && (_c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Hb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
              binary: h.response
            } : {
              text: h.responseText
            }, h.getAllResponseHeaders()));
          };
        }, h.onload = _c(), d = h.onerror = _c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
          4 === h.readyState && a.setTimeout(function () {
            _c && d();
          });
        }, _c = _c("abort");

        try {
          h.send(b.hasContent && b.data || null);
        } catch (i) {
          if (_c) throw i;
        }
      },
      abort: function abort() {
        _c && _c();
      }
    } : void 0;
  }), n.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(a) {
        return n.globalEval(a), a;
      }
    }
  }), n.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), n.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, _c2;

      return {
        send: function send(e, f) {
          b = n("<script>").prop({
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", _c2 = function c(a) {
            b.remove(), _c2 = null, a && f("error" === a.type ? 404 : 200, a.type);
          }), d.head.appendChild(b[0]);
        },
        abort: function abort() {
          _c2 && _c2();
        }
      };
    }
  });
  var Jb = [],
      Kb = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var a = Jb.pop() || n.expando + "_" + kb++;
      return this[a] = !0, a;
    }
  }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Kb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Kb.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Kb, "$1" + e) : b.jsonp !== !1 && (b.url += (lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || n.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments;
    }, d.always(function () {
      void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Jb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script") : void 0;
  }), n.parseHTML = function (a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || d;
    var e = x.exec(a),
        f = !c && [];
    return e ? [b.createElement(e[1])] : (e = ca([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes));
  };
  var Lb = n.fn.load;
  n.fn.load = function (a, b, c) {
    if ("string" != typeof a && Lb) return Lb.apply(this, arguments);
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");
    return h > -1 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == _typeof(b) && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e || "GET",
      dataType: "html",
      data: b
    }).done(function (a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a]);
      });
    }), this;
  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    n.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), n.expr.filters.animated = function (a) {
    return n.grep(n.timers, function (b) {
      return a === b.elem;
    }).length;
  }, n.offset = {
    setOffset: function setOffset(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = n.css(a, "position"),
          l = n(a),
          m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    }
  }, n.fn.extend({
    offset: function offset(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        n.offset.setOffset(this, a, b);
      });
      var b,
          c,
          d = this[0],
          e = {
        top: 0,
        left: 0
      },
          f = d && d.ownerDocument;
      return f ? (b = f.documentElement, n.contains(b, d) ? (e = d.getBoundingClientRect(), c = Mb(f), {
        top: e.top + c.pageYOffset - b.clientTop,
        left: e.left + c.pageXOffset - b.clientLeft
      }) : e) : void 0;
    },
    position: function position() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = {
          top: 0,
          left: 0
        };
        return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - d.top - n.css(c, "marginTop", !0),
          left: b.left - d.left - n.css(c, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        for (var a = this.offsetParent; a && "static" === n.css(a, "position");) {
          a = a.offsetParent;
        }

        return a || Ea;
      });
    }
  }), n.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (a, b) {
    var c = "pageYOffset" === b;

    n.fn[a] = function (d) {
      return K(this, function (a, d, e) {
        var f = Mb(a);
        return void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
      }, a, d, arguments.length);
    };
  }), n.each(["top", "left"], function (a, b) {
    n.cssHooks[b] = Ga(l.pixelPosition, function (a, c) {
      return c ? (c = Fa(a, b), Ba.test(c) ? n(a).position()[b] + "px" : c) : void 0;
    });
  }), n.each({
    Height: "height",
    Width: "width"
  }, function (a, b) {
    n.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function (c, d) {
      n.fn[d] = function (d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
            g = c || (d === !0 || e === !0 ? "margin" : "border");
        return K(this, function (b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
        }, b, f ? d : void 0, f, null);
      };
    });
  }), n.fn.extend({
    bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function unbind(a, b) {
      return this.off(a, null, b);
    },
    delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function undelegate(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    },
    size: function size() {
      return this.length;
    }
  }), n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return n;
  });
  var Nb = a.jQuery,
      Ob = a.$;
  return n.noConflict = function (b) {
    return a.$ === n && (a.$ = Ob), b && a.jQuery === n && (a.jQuery = Nb), n;
  }, b || (a.jQuery = a.$ = n), n;
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
  "use strict";

  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
        b = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var c in b) {
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    }

    return !1;
  }

  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
        d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0;
    });

    var e = function e() {
      c || a(d).trigger(a.support.transition.end);
    };

    return setTimeout(e, b), this;
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function handle(b) {
        if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
      }
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
    });
  }

  var c = '[data-dismiss="alert"]',
      d = function d(b) {
    a(b).on("click", c, this.close);
  };

  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove();
    }

    var e = a(this),
        f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a("#" === f ? [] : f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this;
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.button"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
    });
  }

  var c = function c(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
  };

  c.VERSION = "3.3.7", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1));
    }, this), 0);
  }, c.prototype.toggle = function () {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');

    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this;
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target).closest(".btn");
    b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"));
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == _typeof(b) && b),
          g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }

  var c = function c(b, _c3) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c3, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;

        case 39:
          this.next();
          break;

        default:
          return;
      }

      a.preventDefault();
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;
    return this.$items.eq(f);
  }, c.prototype.to = function (a) {
    var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a);
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  }, c.prototype.next = function () {
    if (!this.sliding) return this.slide("next");
  }, c.prototype.prev = function () {
    if (!this.sliding) return this.slide("prev");
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
        k = a.Event("slide.bs.carousel", {
      relatedTarget: j,
      direction: h
    });

    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active");
      }

      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m);
        }, 0);
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this;
  };

  var e = function e(c) {
    var d,
        e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));

    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
    }
  };

  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c,
        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d);
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == _typeof(b) && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
    });
  }

  var d = function d(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
  };

  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height";
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b,
          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");

      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");

        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;

          var h = function h() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
          };

          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");

      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;

        var e = function e() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };

        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e);
    }, this)).end();
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this;
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();
    c.call(f, h);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent();
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
          e = b(d),
          f = {
        relatedTarget: this
      };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
    }));
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
          d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
    });
  }

  var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function g(b) {
    a(b).on("click.bs.dropdown", this.toggle);
  };

  g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
    var e = a(this);

    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
          g = f.hasClass("open");

      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
      }

      return !1;
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);

      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
            g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
            i = e.find(".dropdown-menu" + h);

        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this;
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation();
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == _typeof(b) && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
    });
  }

  var c = function c(b, _c4) {
    this.options = _c4, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a);
  }, c.prototype.show = function (b) {
    var d = this,
        e = a.Event("show.bs.modal", {
      relatedTarget: b
    });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f);
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
    }));
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
    }, this));
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
    });
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
  }, c.prototype.backdrop = function (b) {
    var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";

    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");

      var g = function g() {
        d.removeBackdrop(), b && b();
      };

      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
    } else b && b();
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog();
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    });
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    });
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;

    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b;
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this;
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({
      remote: !/#/.test(e) && e
    }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus");
      });
    }), b.call(f, g, this);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == _typeof(b) && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
      click: !1,
      hover: !1,
      focus: !1
    }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");

    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle();
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b;
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
        c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d);
    }), b;
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState) {
      if (this.inState[a]) return !0;
    }

    return !1;
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide();
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
          f = this.tip(),
          g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
          i = /\s?auto?\s?/i,
          j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
          l = f[0].offsetWidth,
          m = f[0].offsetHeight;

      if (j) {
        var n = h,
            o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
      }

      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);

      var q = function q() {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
      };

      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function using(a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        });
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
        j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l);
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
    }

    var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);
    if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this;
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, c.prototype.hasContent = function () {
    return this.getTitle();
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = window.SVGElement && c instanceof window.SVGElement,
        g = d ? {
      top: 0,
      left: 0
    } : f ? null : b.offset(),
        h = {
      scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
    },
        i = d ? {
      width: a(window).width(),
      height: a(window).height()
    } : null;
    return a.extend({}, e, h, i, g);
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    };
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);

    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
    } else {
      var j = b.left - f,
          k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
    }

    return e;
  }, c.prototype.getTitle = function () {
    var a,
        b = this.$element,
        c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  }, c.prototype.getUID = function (a) {
    do {
      a += ~~(1e6 * Math.random());
    } while (document.getElementById(a));

    return a;
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip;
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, c.prototype.enable = function () {
    this.enabled = !0;
  }, c.prototype.disable = function () {
    this.enabled = !1;
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null;
    });
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == _typeof(b) && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.init("popover", a, b);
  };

  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  }, c.prototype.getContent = function () {
    var a = this.$element,
        b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == _typeof(c) && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }

  b.VERSION = "3.3.7", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  }, b.prototype.refresh = function () {
    var b = this,
        c = "offset",
        d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
          e = b.data("target") || b.attr("href"),
          f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1]);
    });
  }, b.prototype.process = function () {
    var a,
        b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();

    for (a = e.length; a--;) {
      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this;
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b) {
    this.element = a(b);
  };

  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");

    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
          f = a.Event("hide.bs.tab", {
        relatedTarget: b[0]
      }),
          g = a.Event("show.bs.tab", {
        relatedTarget: e[0]
      });

      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          });
        });
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
    }

    var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this;
  };

  var e = function e(c) {
    c.preventDefault(), b.call(a(this), "show");
  };

  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
  };

  c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();
    if (null != c && "top" == this.affixed) return e < c && "top";
    if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
    var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;
    return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom";
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
        b = this.$element.offset();
    return this.pinnedOffset = b.top - a;
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1);
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
          d = this.options.offset,
          e = d.top,
          f = d.bottom,
          g = Math.max(a(document).height(), a(document.body).height());
      "object" != _typeof(d) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);

      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
            j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
      }

      "bottom" == h && this.$element.offset({
        top: g - b - f
      });
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this;
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
          d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
    });
  });
}(jQuery), function (window, undefined) {
  "use strict";

  function _executeLazy(instance, config, items, events, namespace) {
    function _initialize() {
      _isRetinaDisplay = window.devicePixelRatio > 1, items = _prepareItems(items), config.delay >= 0 && setTimeout(function () {
        _lazyLoadItems(!0);
      }, config.delay), (config.delay < 0 || config.combined) && (events.e = _throttle(config.throttle, function (event) {
        "resize" === event.type && (_actualWidth = _actualHeight = -1), _lazyLoadItems(event.all);
      }), events.a = function (additionalItems) {
        additionalItems = _prepareItems(additionalItems), items.push.apply(items, additionalItems);
      }, events.g = function () {
        return items = $(items).filter(function () {
          return !$(this).data(config.loadedName);
        });
      }, events.f = function (forcedItems) {
        for (var i = 0; i < forcedItems.length; i++) {
          var item = items.filter(function () {
            return this === forcedItems[i];
          });
          item.length && _lazyLoadItems(!1, item);
        }
      }, _lazyLoadItems(), $(config.appendScroll).on("scroll." + namespace + " resize." + namespace, events.e));
    }

    function _prepareItems(items) {
      var defaultImage = config.defaultImage,
          placeholder = config.placeholder,
          imageBase = config.imageBase,
          srcsetAttribute = config.srcsetAttribute,
          loaderAttribute = config.loaderAttribute,
          forcedTags = config._f || {};
      items = $(items).filter(function () {
        var element = $(this),
            tag = _getElementTagName(this);

        return !element.data(config.handledName) && (element.attr(config.attribute) || element.attr(srcsetAttribute) || element.attr(loaderAttribute) || forcedTags[tag] !== undefined);
      }).data("plugin_" + config.name, instance);

      for (var i = 0, l = items.length; i < l; i++) {
        var element = $(items[i]),
            tag = _getElementTagName(items[i]),
            elementImageBase = element.attr(config.imageBaseAttribute) || imageBase;

        tag === _img && elementImageBase && element.attr(srcsetAttribute) && element.attr(srcsetAttribute, _getCorrectedSrcSet(element.attr(srcsetAttribute), elementImageBase)), forcedTags[tag] === undefined || element.attr(loaderAttribute) || element.attr(loaderAttribute, forcedTags[tag]), tag === _img && defaultImage && !element.attr(_src) ? element.attr(_src, defaultImage) : tag === _img || !placeholder || element.css(_backgroundImage) && "none" !== element.css(_backgroundImage) || element.css(_backgroundImage, "url('" + placeholder + "')");
      }

      return items;
    }

    function _lazyLoadItems(allItems, forced) {
      if (!items.length) return void (config.autoDestroy && instance.destroy());

      for (var elements = forced || items, loadTriggered = !1, imageBase = config.imageBase || "", srcsetAttribute = config.srcsetAttribute, handledName = config.handledName, i = 0; i < elements.length; i++) {
        if (allItems || forced || _isInLoadableArea(elements[i])) {
          var element = $(elements[i]),
              tag = _getElementTagName(elements[i]),
              attribute = element.attr(config.attribute),
              elementImageBase = element.attr(config.imageBaseAttribute) || imageBase,
              customLoader = element.attr(config.loaderAttribute);

          element.data(handledName) || config.visibleOnly && !element.is(":visible") || !((attribute || element.attr(srcsetAttribute)) && (tag === _img && (elementImageBase + attribute !== element.attr(_src) || element.attr(srcsetAttribute) !== element.attr(_srcset)) || tag !== _img && elementImageBase + attribute !== element.css(_backgroundImage)) || customLoader) || (loadTriggered = !0, element.data(handledName, !0), _handleItem(element, tag, elementImageBase, customLoader));
        }
      }

      loadTriggered && (items = $(items).filter(function () {
        return !$(this).data(handledName);
      }));
    }

    function _handleItem(element, tag, imageBase, customLoader) {
      ++_awaitingAfterLoad;

      var _errorCallback = function errorCallback() {
        _triggerCallback("onError", element), _reduceAwaiting(), _errorCallback = $.noop;
      };

      _triggerCallback("beforeLoad", element);

      var srcAttribute = config.attribute,
          srcsetAttribute = config.srcsetAttribute,
          sizesAttribute = config.sizesAttribute,
          retinaAttribute = config.retinaAttribute,
          removeAttribute = config.removeAttribute,
          loadedName = config.loadedName,
          elementRetina = element.attr(retinaAttribute);

      if (customLoader) {
        var _loadCallback = function loadCallback() {
          removeAttribute && element.removeAttr(config.loaderAttribute), element.data(loadedName, !0), _triggerCallback(_afterLoad, element), setTimeout(_reduceAwaiting, 1), _loadCallback = $.noop;
        };

        element.off(_error).one(_error, _errorCallback).one(_load, _loadCallback), _triggerCallback(customLoader, element, function (response) {
          response ? (element.off(_load), _loadCallback()) : (element.off(_error), _errorCallback());
        }) || element.trigger(_error);
      } else {
        var imageObj = $(new Image());
        imageObj.one(_error, _errorCallback).one(_load, function () {
          element.hide(), tag === _img ? element.attr(_sizes, imageObj.attr(_sizes)).attr(_srcset, imageObj.attr(_srcset)).attr(_src, imageObj.attr(_src)) : element.css(_backgroundImage, "url('" + imageObj.attr(_src) + "')"), element[config.effect](config.effectTime), removeAttribute && (element.removeAttr(srcAttribute + " " + srcsetAttribute + " " + retinaAttribute + " " + config.imageBaseAttribute), sizesAttribute !== _sizes && element.removeAttr(sizesAttribute)), element.data(loadedName, !0), _triggerCallback(_afterLoad, element), imageObj.remove(), _reduceAwaiting();
        });
        var imageSrc = (_isRetinaDisplay && elementRetina ? elementRetina : element.attr(srcAttribute)) || "";
        imageObj.attr(_sizes, element.attr(sizesAttribute)).attr(_srcset, element.attr(srcsetAttribute)).attr(_src, imageSrc ? imageBase + imageSrc : null), imageObj.complete && imageObj.trigger(_load);
      }
    }

    function _isInLoadableArea(element) {
      var elementBound = element.getBoundingClientRect(),
          direction = config.scrollDirection,
          threshold = config.threshold,
          vertical = _getActualHeight() + threshold > elementBound.top && -threshold < elementBound.bottom,
          horizontal = _getActualWidth() + threshold > elementBound.left && -threshold < elementBound.right;
      return "vertical" === direction ? vertical : "horizontal" === direction ? horizontal : vertical && horizontal;
    }

    function _getActualWidth() {
      return _actualWidth >= 0 ? _actualWidth : _actualWidth = $(window).width();
    }

    function _getActualHeight() {
      return _actualHeight >= 0 ? _actualHeight : _actualHeight = $(window).height();
    }

    function _getElementTagName(element) {
      return element.tagName.toLowerCase();
    }

    function _getCorrectedSrcSet(srcset, imageBase) {
      if (imageBase) {
        var entries = srcset.split(",");
        srcset = "";

        for (var i = 0, l = entries.length; i < l; i++) {
          srcset += imageBase + entries[i].trim() + (i !== l - 1 ? "," : "");
        }
      }

      return srcset;
    }

    function _throttle(delay, callback) {
      var timeout,
          lastExecute = 0;
      return function (event, ignoreThrottle) {
        function run() {
          lastExecute = +new Date(), callback.call(instance, event);
        }

        var elapsed = +new Date() - lastExecute;
        timeout && clearTimeout(timeout), elapsed > delay || !config.enableThrottle || ignoreThrottle ? run() : timeout = setTimeout(run, delay - elapsed);
      };
    }

    function _reduceAwaiting() {
      --_awaitingAfterLoad, items.length || _awaitingAfterLoad || _triggerCallback("onFinishedAll");
    }

    function _triggerCallback(callback, element, args) {
      return !!(callback = config[callback]) && (callback.apply(instance, [].slice.call(arguments, 1)), !0);
    }

    var _awaitingAfterLoad = 0,
        _actualWidth = -1,
        _actualHeight = -1,
        _isRetinaDisplay = !1,
        _afterLoad = "afterLoad",
        _load = "load",
        _error = "error",
        _img = "img",
        _src = "src",
        _srcset = "srcset",
        _sizes = "sizes",
        _backgroundImage = "background-image";

    "event" === config.bind || windowLoaded ? _initialize() : $(window).on(_load + "." + namespace, _initialize);
  }

  function LazyPlugin(elements, settings) {
    var _instance = this,
        _config = $.extend({}, _instance.config, settings),
        _events = {},
        _namespace = _config.name + "-" + ++lazyInstanceId;

    return _instance.config = function (entryName, value) {
      return value === undefined ? _config[entryName] : (_config[entryName] = value, _instance);
    }, _instance.addItems = function (items) {
      return _events.a && _events.a("string" === $.type(items) ? $(items) : items), _instance;
    }, _instance.getItems = function () {
      return _events.g ? _events.g() : {};
    }, _instance.update = function (useThrottle) {
      return _events.e && _events.e({}, !useThrottle), _instance;
    }, _instance.force = function (items) {
      return _events.f && _events.f("string" === $.type(items) ? $(items) : items), _instance;
    }, _instance.loadAll = function () {
      return _events.e && _events.e({
        all: !0
      }, !0), _instance;
    }, _instance.destroy = function () {
      return $(_config.appendScroll).off("." + _namespace, _events.e), $(window).off("." + _namespace), _events = {}, undefined;
    }, _executeLazy(_instance, _config, elements, _events, _namespace), _config.chainable ? elements : _instance;
  }

  var $ = window.jQuery || window.Zepto,
      lazyInstanceId = 0,
      windowLoaded = !1;
  $.fn.Lazy = $.fn.lazy = function (settings) {
    return new LazyPlugin(this, settings);
  }, $.Lazy = $.lazy = function (names, elements, loader) {
    if ($.isFunction(elements) && (loader = elements, elements = []), $.isFunction(loader)) {
      names = $.isArray(names) ? names : [names], elements = $.isArray(elements) ? elements : [elements];

      for (var config = LazyPlugin.prototype.config, forced = config._f || (config._f = {}), i = 0, l = names.length; i < l; i++) {
        (config[names[i]] === undefined || $.isFunction(config[names[i]])) && (config[names[i]] = loader);
      }

      for (var c = 0, a = elements.length; c < a; c++) {
        forced[elements[c]] = names[0];
      }
    }
  }, LazyPlugin.prototype.config = {
    name: "lazy",
    chainable: !0,
    autoDestroy: !0,
    bind: "load",
    threshold: 500,
    visibleOnly: !1,
    appendScroll: window,
    scrollDirection: "both",
    imageBase: null,
    defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    placeholder: null,
    delay: -1,
    combined: !1,
    attribute: "data-src",
    srcsetAttribute: "data-srcset",
    sizesAttribute: "data-sizes",
    retinaAttribute: "data-retina",
    loaderAttribute: "data-loader",
    imageBaseAttribute: "data-imagebase",
    removeAttribute: !0,
    handledName: "handled",
    loadedName: "loaded",
    effect: "show",
    effectTime: 0,
    enableThrottle: !0,
    throttle: 250,
    beforeLoad: undefined,
    afterLoad: undefined,
    onError: undefined,
    onFinishedAll: undefined
  }, $(window).on("load", function () {
    windowLoaded = !0;
  });
}(window), function ($) {
  $.lazy(["frame", "iframe"], "iframe", function (element, response) {
    var instance = this;

    if ("iframe" === element[0].tagName.toLowerCase()) {
      var srcAttr = "data-src",
          errorDetectAttr = "data-error-detect",
          errorDetect = element.attr(errorDetectAttr);
      "true" !== errorDetect && "1" !== errorDetect ? (element.attr("src", element.attr(srcAttr)), instance.config("removeAttribute") && element.removeAttr(srcAttr + " " + errorDetectAttr)) : $.ajax({
        url: element.attr(srcAttr),
        dataType: "html",
        crossDomain: !0,
        xhrFields: {
          withCredentials: !0
        },
        success: function success(content) {
          element.html(content).attr("src", element.attr(srcAttr)), instance.config("removeAttribute") && element.removeAttr(srcAttr + " " + errorDetectAttr);
        },
        error: function error() {
          response(!1);
        }
      });
    } else response(!1);
  });
}(window.jQuery || window.Zepto), function ($) {
  $.lazy(["yt", "youtube"], function (element, response) {
    if ("iframe" === element[0].tagName.toLowerCase()) {
      /1|true/.test(element.attr("data-nocookie"));
      element.attr("src", element.attr("data-src")), this.config("removeAttribute") && element.removeAttr("data-src");
    } else response(!1);
  });
}(window.jQuery || window.Zepto), MYAPP.isMobile = !1, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (MYAPP.isMobile = !0), $(document).ready(function () {
  lazyloadGlobal(), productTabsChanged(), navBarDropdownShown(), initLazyLoadOfIframeOfBlogPosting(), initLazyLoadOfIframeOfProduct(), initLazyLoadOfIframeOfNews(), detectGA(function () {
    TraceCloudFlareLoc();
  }), blogBookmark();
}), window.averta = {}, function ($) {
  function getVendorPrefix() {
    if ("result" in arguments.callee) return arguments.callee.result;
    var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        someScript = document.getElementsByTagName("script")[0];

    for (var prop in someScript.style) {
      if (regex.test(prop)) return arguments.callee.result = prop.match(regex)[0];
    }

    return "WebkitOpacity" in someScript.style ? arguments.callee.result = "Webkit" : "KhtmlOpacity" in someScript.style ? arguments.callee.result = "Khtml" : arguments.callee.result = "";
  }

  function checkStyleValue(prop) {
    var b = document.body || document.documentElement,
        s = b.style,
        p = prop;
    if ("string" == typeof s[p]) return !0;
    v = ["Moz", "Webkit", "Khtml", "O", "ms"], p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i = 0; i < v.length; i++) {
      if ("string" == typeof s[v[i] + p]) return !0;
    }

    return !1;
  }

  function supportsTransitions() {
    return checkStyleValue("transition");
  }

  function supportsTransforms() {
    return checkStyleValue("transform");
  }

  function supports3DTransforms() {
    if (!supportsTransforms()) return !1;
    var has3d,
        el = document.createElement("i"),
        transforms = {
      WebkitTransform: "-webkit-transform",
      OTransform: "-o-transform",
      MSTransform: "-ms-transform",
      msTransform: "-ms-transform",
      MozTransform: "-moz-transform",
      Transform: "transform",
      transform: "transform"
    };
    el.style.display = "block", document.body.insertBefore(el, null);

    for (var t in transforms) {
      void 0 !== el.style[t] && (el.style[t] = "translate3d(1px,1px,1px)", has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]));
    }

    return document.body.removeChild(el), null != has3d && has3d.length > 0 && "none" !== has3d;
  }

  window["package"] = function (name) {
    window[name] || (window[name] = {});
  };

  var extend = function extend(target, object) {
    for (var key in object) {
      target[key] = object[key];
    }
  };

  Function.prototype.extend = function (superclass) {
    "function" == typeof superclass.prototype.constructor ? (extend(this.prototype, superclass.prototype), this.prototype.constructor = this) : (this.prototype.extend(superclass), this.prototype.constructor = this);
  };

  var trans = {
    Moz: "-moz-",
    Webkit: "-webkit-",
    Khtml: "-khtml-",
    O: "-o-",
    ms: "-ms-",
    Icab: "-icab-"
  };
  window._mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), window._touch = "ontouchstart" in document, $(document).ready(function () {
    window._jcsspfx = getVendorPrefix(), window._csspfx = trans[window._jcsspfx], window._cssanim = supportsTransitions(), window._css3d = supports3DTransforms(), window._css2d = supportsTransforms();
  }), window.parseQueryString = function (url) {
    var queryString = {};
    return url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
      queryString[$1] = $3;
    }), queryString;
  };
  var fps60 = 50 / 3;

  if (window.requestAnimationFrame || (window.requestAnimationFrame = function () {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
      window.setTimeout(callback, fps60);
    };
  }()), window.getComputedStyle || (window.getComputedStyle = function (el, pseudo) {
    return this.el = el, this.getPropertyValue = function (prop) {
      var re = /(\-([a-z]){1})/g;
      return "float" == prop && (prop = "styleFloat"), re.test(prop) && (prop = prop.replace(re, function () {
        return arguments[2].toUpperCase();
      })), el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }, el.currentStyle;
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (elt) {
    var len = this.length >>> 0,
        from = Number(arguments[1]) || 0;

    for (from = from < 0 ? Math.ceil(from) : Math.floor(from), from < 0 && (from += len); from < len; from++) {
      if (from in this && this[from] === elt) return from;
    }

    return -1;
  }), window.isMSIE = function (version) {
    if (!$.browser.msie) return !1;
    if (!version) return !0;
    var ieVer = $.browser.version.slice(0, $.browser.version.indexOf("."));
    return "string" == typeof version ? version.indexOf("<") !== -1 || version.indexOf(">") !== -1 ? eval(ieVer + version) : eval(version + "==" + ieVer) : version == ieVer;
  }, $.removeDataAttrs = function ($target, exclude) {
    var i,
        attrName,
        dataAttrsToDelete = [],
        dataAttrs = $target[0].attributes,
        dataAttrsLen = dataAttrs.length;

    for (exclude = exclude || [], i = 0; i < dataAttrsLen; i++) {
      attrName = dataAttrs[i].name, "data-" === attrName.substring(0, 5) && exclude.indexOf(attrName) === -1 && dataAttrsToDelete.push(dataAttrs[i].name);
    }

    $.each(dataAttrsToDelete, function (index, attrName) {
      $target.removeAttr(attrName);
    });
  }, jQuery) {
    $.jqLoadFix = function () {
      if (this.complete) {
        var that = this;
        setTimeout(function () {
          $(that).trigger("load");
        }, 1);
      }
    }, jQuery.uaMatch = jQuery.uaMatch || function (ua) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0);
    var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
    isIE11 && (browser.msie = "true", delete browser.mozilla), jQuery.browser = browser, $.fn.preloadImg = function (src, _event) {
      return this.each(function () {
        var $this = $(this),
            self = this,
            img = new Image();
        img.onload = function (event) {
          null == event && (event = {}), $this.attr("src", src), event.width = img.width, event.height = img.height, $this.data("width", img.width), $this.data("height", img.height), setTimeout(function () {
            _event.call(self, event);
          }, 50), img = null;
        }, img.src = src;
      }), this;
    };
  }
}(jQuery), function () {
  "use strict";

  averta.EventDispatcher = function () {
    this.listeners = {};
  }, averta.EventDispatcher.extend = function (_proto) {
    var instance = new averta.EventDispatcher();

    for (var key in instance) {
      "constructor" != key && (_proto[key] = averta.EventDispatcher.prototype[key]);
    }
  }, averta.EventDispatcher.prototype = {
    constructor: averta.EventDispatcher,
    addEventListener: function addEventListener(event, listener, ref) {
      this.listeners[event] || (this.listeners[event] = []), this.listeners[event].push({
        listener: listener,
        ref: ref
      });
    },
    removeEventListener: function removeEventListener(event, listener, ref) {
      if (this.listeners[event]) {
        for (var i = 0; i < this.listeners[event].length; ++i) {
          listener === this.listeners[event][i].listener && ref === this.listeners[event][i].ref && this.listeners[event].splice(i--, 1);
        }

        0 === this.listeners[event].length && (this.listeners[event] = null);
      }
    },
    dispatchEvent: function dispatchEvent(event) {
      if (event.target = this, this.listeners[event.type]) for (var i = 0, l = this.listeners[event.type].length; i < l; ++i) {
        this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref, event);
      }
    }
  };
}(), function ($) {
  "use strict";

  var isTouch = "ontouchstart" in document,
      isPointer = window.navigator.pointerEnabled,
      isMSPoiner = !isPointer && window.navigator.msPointerEnabled,
      usePointer = isPointer || isMSPoiner,
      ev_start = (isPointer ? "pointerdown " : "") + (isMSPoiner ? "MSPointerDown " : "") + (isTouch ? "touchstart " : "") + "mousedown",
      ev_move = (isPointer ? "pointermove " : "") + (isMSPoiner ? "MSPointerMove " : "") + (isTouch ? "touchmove " : "") + "mousemove",
      ev_end = (isPointer ? "pointerup " : "") + (isMSPoiner ? "MSPointerUp " : "") + (isTouch ? "touchend " : "") + "mouseup",
      ev_cancel = (isPointer ? "pointercancel " : "") + (isMSPoiner ? "MSPointerCancel " : "") + "touchcancel";

  averta.TouchSwipe = function ($element) {
    this.$element = $element, this.enabled = !0, $element.bind(ev_start, {
      target: this
    }, this.__touchStart), $element[0].swipe = this, this.onSwipe = null, this.swipeType = "horizontal", this.noSwipeSelector = "input, textarea, button, .no-swipe, .ms-no-swipe", this.lastStatus = {};
  };

  var p = averta.TouchSwipe.prototype;
  p.getDirection = function (new_x, new_y) {
    switch (this.swipeType) {
      case "horizontal":
        return new_x <= this.start_x ? "left" : "right";

      case "vertical":
        return new_y <= this.start_y ? "up" : "down";

      case "all":
        return Math.abs(new_x - this.start_x) > Math.abs(new_y - this.start_y) ? new_x <= this.start_x ? "left" : "right" : new_y <= this.start_y ? "up" : "down";
    }
  }, p.priventDefultEvent = function (new_x, new_y) {
    var dx = Math.abs(new_x - this.start_x),
        dy = Math.abs(new_y - this.start_y),
        horiz = dx > dy;
    return "horizontal" === this.swipeType && horiz || "vertical" === this.swipeType && !horiz;
  }, p.createStatusObject = function (evt) {
    var temp_x,
        temp_y,
        status_data = {};
    return temp_x = this.lastStatus.distanceX || 0, temp_y = this.lastStatus.distanceY || 0, status_data.distanceX = evt.pageX - this.start_x, status_data.distanceY = evt.pageY - this.start_y, status_data.moveX = status_data.distanceX - temp_x, status_data.moveY = status_data.distanceY - temp_y, status_data.distance = parseInt(Math.sqrt(Math.pow(status_data.distanceX, 2) + Math.pow(status_data.distanceY, 2))), status_data.duration = new Date().getTime() - this.start_time, status_data.direction = this.getDirection(evt.pageX, evt.pageY), status_data;
  }, p.__reset = function (event, jqevt) {
    this.reset = !1, this.lastStatus = {}, this.start_time = new Date().getTime();

    var point = this.__getPoint(event, jqevt);

    this.start_x = point.pageX, this.start_y = point.pageY;
  }, p.__touchStart = function (event) {
    var swipe = event.data.target,
        jqevt = event;

    if (swipe.enabled && !($(event.target).closest(swipe.noSwipeSelector, swipe.$element).length > 0)) {
      if (event = event.originalEvent, usePointer && $(this).css("-ms-touch-action", "horizontal" === swipe.swipeType ? "pan-y" : "pan-x"), !swipe.onSwipe) return void $.error("Swipe listener is undefined");

      if (!(swipe.touchStarted || isTouch && swipe.start_time && "mousedown" === event.type && new Date().getTime() - swipe.start_time < 600)) {
        var point = swipe.__getPoint(event, jqevt);

        swipe.start_x = point.pageX, swipe.start_y = point.pageY, swipe.start_time = new Date().getTime(), $(document).bind(ev_end, {
          target: swipe
        }, swipe.__touchEnd).bind(ev_move, {
          target: swipe
        }, swipe.__touchMove).bind(ev_cancel, {
          target: swipe
        }, swipe.__touchCancel);
        var status = swipe.createStatusObject(point);
        status.phase = "start", swipe.onSwipe.call(null, status), isTouch || jqevt.preventDefault(), swipe.lastStatus = status, swipe.touchStarted = !0;
      }
    }
  }, p.__touchMove = function (event) {
    var swipe = event.data.target,
        jqevt = event;

    if (event = event.originalEvent, swipe.touchStarted) {
      clearTimeout(swipe.timo), swipe.timo = setTimeout(function () {
        swipe.__reset(event, jqevt);
      }, 60);

      var point = swipe.__getPoint(event, jqevt),
          status = swipe.createStatusObject(point);

      swipe.priventDefultEvent(point.pageX, point.pageY) && jqevt.preventDefault(), status.phase = "move", swipe.lastStatus = status, swipe.onSwipe.call(null, status);
    }
  }, p.__touchEnd = function (event) {
    var swipe = event.data.target,
        jqevt = event;
    event = event.originalEvent, clearTimeout(swipe.timo);
    var status = swipe.lastStatus;
    isTouch || jqevt.preventDefault(), status.phase = "end", swipe.touchStarted = !1, swipe.priventEvt = null, $(document).unbind(ev_end, swipe.__touchEnd).unbind(ev_move, swipe.__touchMove).unbind(ev_cancel, swipe.__touchCancel), status.speed = status.distance / status.duration, swipe.onSwipe.call(null, status);
  }, p.__touchCancel = function (event) {
    var swipe = event.data.target;

    swipe.__touchEnd(event);
  }, p.__getPoint = function (event, jqEvent) {
    return isTouch && event.type.indexOf("mouse") === -1 ? event.touches[0] : usePointer ? event : jqEvent;
  }, p.enable = function () {
    this.enabled || (this.enabled = !0);
  }, p.disable = function () {
    this.enabled && (this.enabled = !1);
  };
}(jQuery), function () {
  "use strict";

  averta.Ticker = function () {};

  var st = averta.Ticker,
      list = [],
      len = 0,
      __stopped = !0;

  st.add = function (listener, ref) {
    return list.push([listener, ref]), 1 === list.length && st.start(), len = list.length;
  }, st.remove = function (listener, ref) {
    for (var i = 0, l = list.length; i < l; ++i) {
      list[i] && list[i][0] === listener && list[i][1] === ref && list.splice(i, 1);
    }

    len = list.length, 0 === len && st.stop();
  }, st.start = function () {
    __stopped && (__stopped = !1, __tick());
  }, st.stop = function () {
    __stopped = !0;
  };

  var __tick = function __tick() {
    if (!st.__stopped) {
      for (var item, i = 0; i !== len; i++) {
        item = list[i], item[0].call(item[1]);
      }

      requestAnimationFrame(__tick);
    }
  };
}(), function () {
  "use strict";

  Date.now || (Date.now = function () {
    return new Date().getTime();
  }), averta.Timer = function (delay, autoStart) {
    this.delay = delay, this.currentCount = 0, this.paused = !1, this.onTimer = null, this.refrence = null, autoStart && this.start();
  }, averta.Timer.prototype = {
    constructor: averta.Timer,
    start: function start() {
      this.paused = !1, this.lastTime = Date.now(), averta.Ticker.add(this.update, this);
    },
    stop: function stop() {
      this.paused = !0, averta.Ticker.remove(this.update, this);
    },
    reset: function reset() {
      this.currentCount = 0, this.paused = !0, this.lastTime = Date.now();
    },
    update: function update() {
      this.paused || Date.now() - this.lastTime < this.delay || (this.currentCount++, this.lastTime = Date.now(), this.onTimer && this.onTimer.call(this.refrence, this.getTime()));
    },
    getTime: function getTime() {
      return this.delay * this.currentCount;
    }
  };
}(), function () {
  "use strict";

  window.CSSTween = function (element, duration, delay, ease) {
    this.$element = element, this.duration = duration || 1e3, this.delay = delay || 0, this.ease = ease || "linear";
  };

  var p = CSSTween.prototype;
  p.to = function (callback, target) {
    return this.to_cb = callback, this.to_cb_target = target, this;
  }, p.from = function (callback, target) {
    return this.fr_cb = callback, this.fr_cb_target = target, this;
  }, p.onComplete = function (callback, target) {
    return this.oc_fb = callback, this.oc_fb_target = target, this;
  }, p.chain = function (csstween) {
    return this.chained_tween = csstween, this;
  }, p.reset = function () {
    clearTimeout(this.start_to), clearTimeout(this.end_to);
  }, p.start = function () {
    var element = this.$element[0];
    clearTimeout(this.start_to), clearTimeout(this.end_to), this.fresh = !0, this.fr_cb && (element.style[window._jcsspfx + "TransitionDuration"] = "0ms", this.fr_cb.call(this.fr_cb_target));
    var that = this;
    return this.onTransComplete = function (event) {
      that.fresh && (that.reset(), element.style[window._jcsspfx + "TransitionDuration"] = "", element.style[window._jcsspfx + "TransitionProperty"] = "", element.style[window._jcsspfx + "TransitionTimingFunction"] = "", element.style[window._jcsspfx + "TransitionDelay"] = "", that.fresh = !1, that.chained_tween && that.chained_tween.start(), that.oc_fb && that.oc_fb.call(that.oc_fb_target));
    }, this.start_to = setTimeout(function () {
      that.$element && (element.style[window._jcsspfx + "TransitionDuration"] = that.duration + "ms", element.style[window._jcsspfx + "TransitionProperty"] = that.transProperty || "all", that.delay > 0 ? element.style[window._jcsspfx + "TransitionDelay"] = that.delay + "ms" : element.style[window._jcsspfx + "TransitionDelay"] = "", element.style[window._jcsspfx + "TransitionTimingFunction"] = that.ease, that.to_cb && that.to_cb.call(that.to_cb_target), that.end_to = setTimeout(function () {
        that.onTransComplete();
      }, that.duration + (that.delay || 0)));
    }, 1), this;
  };
}(), function () {
  "use strict";

  function transPos(element, properties) {
    if (void 0 !== properties.x || void 0 !== properties.y) if (_cssanim) {
      var trans = window._jcsspfx + "Transform";
      void 0 !== properties.x && (properties[trans] = (properties[trans] || "") + " translateX(" + properties.x + "px)", delete properties.x), void 0 !== properties.y && (properties[trans] = (properties[trans] || "") + " translateY(" + properties.y + "px)", delete properties.y);
    } else {
      if (void 0 !== properties.x) {
        var posx = "auto" !== element.css("right") ? "right" : "left";
        properties[posx] = properties.x + "px", delete properties.x;
      }

      if (void 0 !== properties.y) {
        var posy = "auto" !== element.css("bottom") ? "bottom" : "top";
        properties[posy] = properties.y + "px", delete properties.y;
      }
    }
    return properties;
  }

  var _cssanim = null;
  window.CTween = {}, CTween.setPos = function (element, pos) {
    element.css(transPos(element, pos));
  }, CTween.animate = function (element, duration, properties, options) {
    if (null == _cssanim && (_cssanim = window._cssanim), options = options || {}, transPos(element, properties), _cssanim) {
      var tween = new CSSTween(element, duration, options.delay, EaseDic[options.ease]);
      return options.transProperty && (tween.transProperty = options.transProperty), tween.to(function () {
        element.css(properties);
      }), options.complete && tween.onComplete(options.complete, options.target), tween.start(), tween.stop = tween.reset, tween;
    }

    var onCl;
    return options.delay && element.delay(options.delay), options.complete && (onCl = function onCl() {
      options.complete.call(options.target);
    }), element.stop(!0).animate(properties, duration, options.ease || "linear", onCl), element;
  }, CTween.fadeOut = function (target, duration, remove) {
    var options = {};
    remove === !0 ? options.complete = function () {
      target.remove();
    } : 2 === remove && (options.complete = function () {
      target.css("display", "none");
    }), CTween.animate(target, duration || 1e3, {
      opacity: 0
    }, options);
  }, CTween.fadeIn = function (target, duration, reset) {
    reset !== !1 && target.css("opacity", 0).css("display", ""), CTween.animate(target, duration || 1e3, {
      opacity: 1
    });
  };
}(), function () {
  window.EaseDic = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    easeInCubic: "cubic-bezier(.55,.055,.675,.19)",
    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
    easeInOutExpo: "cubic-bezier(1,0,0,1)",
    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
    easeInSine: "cubic-bezier(.47,0,.745,.715)",
    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
  };
}(), function () {
  "use strict";

  window.MSAligner = function (type, $container, $img) {
    this.$container = $container, this.$img = $img, this.type = type || "stretch", this.widthOnly = !1, this.heightOnly = !1;
  };

  var p = MSAligner.prototype;
  p.init = function (w, h) {
    switch (this.baseWidth = w, this.baseHeight = h, this.imgRatio = w / h, this.imgRatio2 = h / w, this.type) {
      case "tile":
        this.$container.css("background-image", "url(" + this.$img.attr("src") + ")"), this.$img.remove();
        break;

      case "center":
        this.$container.css("background-image", "url(" + this.$img.attr("src") + ")"), this.$container.css({
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }), this.$img.remove();
        break;

      case "stretch":
        this.$img.css({
          width: "100%",
          height: "100%"
        });
        break;

      case "fill":
      case "fit":
        this.needAlign = !0, this.align();
    }
  }, p.align = function () {
    if (this.needAlign) {
      var cont_w = this.$container[0].offsetWidth,
          cont_h = this.$container[0].offsetHeight,
          contRatio = cont_w / cont_h;
      "fill" == this.type ? this.imgRatio < contRatio ? (this.$img.width(cont_w), this.$img.height(cont_w * this.imgRatio2)) : (this.$img.height(cont_h), this.$img.width(cont_h * this.imgRatio)) : "fit" == this.type && (this.imgRatio < contRatio ? (this.$img.height(cont_h), this.$img.width(cont_h * this.imgRatio)) : (this.$img.width(cont_w), this.$img.height(cont_w * this.imgRatio2))), this.setMargin();
    }
  }, p.setMargin = function () {
    var cont_w = this.$container[0].offsetWidth,
        cont_h = this.$container[0].offsetHeight;
    this.$img.css("margin-top", (cont_h - this.$img[0].offsetHeight) / 2 + "px"), this.$img.css("margin-left", (cont_w - this.$img[0].offsetWidth) / 2 + "px");
  };
}(), function ($) {
  var Polyfill = function Polyfill(userOptions) {
    this.options = $.extend({}, Polyfill.defaultOptions, userOptions), this.isEnabled = !1, !this.options.forcePolyfill && this.supportsPointerEvents() || (this.registerEvents(), this.isEnabled = !0);
  };

  Polyfill.defaultOptions = {
    forcePolyfill: !1,
    selector: "*",
    listenOn: ["click", "dblclick", "mousedown", "mouseup"],
    pointerEventsNoneClass: null,
    pointerEventsAllClass: null,
    eventNamespace: "pointer-events-polyfill"
  }, Polyfill.prototype.registerEvents = function () {
    $(document).on(this.getEventNames(), this.options.selector, $.proxy(this.onElementClick, this));
  }, Polyfill.prototype.getEventNames = function () {
    var eventNamespace = this.options.eventNamespace ? "." + this.options.eventNamespace : "";
    return this.options.listenOn.join(eventNamespace + " ") + eventNamespace;
  }, Polyfill.prototype.supportsPointerEvents = function () {
    var style = document.createElement("a").style;
    return style.cssText = "pointer-events:auto", "auto" === style.pointerEvents;
  }, Polyfill.prototype.isClickThrough = function ($el) {
    var elPointerEventsCss = $el.css("pointer-events");
    return 0 !== $el.length && "all" !== elPointerEventsCss && !$el.is(":root") && !$el.hasClass(this.options.pointerEventsAllClass) && !("none" !== elPointerEventsCss && !$el.hasClass(this.options.pointerEventsNoneClass) && !this.isClickThrough($el.parent()));
  }, Polyfill.prototype.onElementClick = function (e) {
    var $elOrg = $(e.target);
    if (!this.isClickThrough($elOrg)) return !0;
    $elOrg.hide();
    var elBelow = document.elementFromPoint(e.clientX, e.clientY);
    return e.target = elBelow, $(elBelow).trigger(e), "A" === elBelow.tagName && (2 === e.which ? window.open(elBelow.getAttribute("href"), "_blank") : elBelow.click()), $elOrg.show(), !1;
  }, Polyfill.prototype.destroy = function () {
    $(document).off(this.getEventNames()), this.isEnabled = !1;
  }, window.pointerEventsPolyfill = function (userOptions) {
    return new Polyfill(userOptions);
  };
}(jQuery), function () {
  "use strict";

  var _options = {
    bouncing: !0,
    snapping: !1,
    snapsize: null,
    friction: .05,
    outFriction: .05,
    outAcceleration: .09,
    minValidDist: .3,
    snappingMinSpeed: 2,
    paging: !1,
    endless: !1,
    maxSpeed: 160
  },
      Controller = function Controller(min, max, options) {
    if (null === max || null === min) throw new Error("Max and Min values are required.");
    this.options = options || {};

    for (var key in _options) {
      key in this.options || (this.options[key] = _options[key]);
    }

    this._max_value = max, this._min_value = min, this.value = min, this.end_loc = min, this.current_snap = this.getSnapNum(min), this.__extrStep = 0, this.__extraMove = 0, this.__animID = -1;
  },
      p = Controller.prototype;

  p.changeTo = function (value, animate, speed, snap_num, dispatch) {
    if (this.stopped = !1, this._internalStop(), value = this._checkLimits(value), speed = Math.abs(speed || 0), this.options.snapping && (snap_num = snap_num || this.getSnapNum(value), dispatch !== !1 && this._callsnapChange(snap_num), this.current_snap = snap_num), animate) {
      this.animating = !0;

      var self = this,
          active_id = ++self.__animID,
          amplitude = value - self.value,
          timeStep = 0,
          targetPosition = value,
          animFrict = 1 - self.options.friction,
          timeconst = animFrict + (speed - 20) * animFrict * 1.3 / self.options.maxSpeed,
          tick = function tick() {
        if (active_id === self.__animID) {
          var dis = value - self.value;
          if (!(Math.abs(dis) > self.options.minValidDist && self.animating)) return self.animating && (self.value = value, self._callrenderer()), self.animating = !1, active_id !== self.__animID && (self.__animID = -1), void self._callonComplete("anim");
          window.requestAnimationFrame(tick), self.value = targetPosition - amplitude * Math.exp(-++timeStep * timeconst), self._callrenderer();
        }
      };

      return void tick();
    }

    this.value = value, this._callrenderer();
  }, p.drag = function (move) {
    this.start_drag && (this.drag_start_loc = this.value, this.start_drag = !1), this.animating = !1, this._deceleration = !1, this.value -= move, !this.options.endless && (this.value > this._max_value || this.value < 0) ? this.options.bouncing ? (this.__isout = !0, this.value += .6 * move) : this.value > this._max_value ? this.value = this._max_value : this.value = 0 : !this.options.endless && this.options.bouncing && (this.__isout = !1), this._callrenderer();
  }, p.push = function (speed) {
    if (this.stopped = !1, this.options.snapping && Math.abs(speed) <= this.options.snappingMinSpeed) return void this.cancel();

    if (this.__speed = speed, this.__startSpeed = speed, this.end_loc = this._calculateEnd(), this.options.snapping) {
      var snap_loc = this.getSnapNum(this.value),
          end_snap = this.getSnapNum(this.end_loc);
      if (this.options.paging) return snap_loc = this.getSnapNum(this.drag_start_loc), this.__isout = !1, void (speed > 0 ? this.gotoSnap(snap_loc + 1, !0, speed) : this.gotoSnap(snap_loc - 1, !0, speed));
      if (snap_loc === end_snap) return void this.cancel();
      this._callsnapChange(end_snap), this.current_snap = end_snap;
    }

    this.animating = !1, this.__needsSnap = this.options.endless || this.end_loc > this._min_value && this.end_loc < this._max_value, this.options.snapping && this.__needsSnap && (this.__extraMove = this._calculateExtraMove(this.end_loc)), this._startDecelaration();
  }, p.bounce = function (speed) {
    this.animating || (this.stopped = !1, this.animating = !1, this.__speed = speed, this.__startSpeed = speed, this.end_loc = this._calculateEnd(), this._startDecelaration());
  }, p.stop = function () {
    this.stopped = !0, this._internalStop();
  }, p.cancel = function () {
    this.start_drag = !0, this.__isout ? (this.__speed = 4e-4, this._startDecelaration()) : this.options.snapping && this.gotoSnap(this.getSnapNum(this.value), !0);
  }, p.renderCallback = function (listener, ref) {
    this.__renderHook = {
      fun: listener,
      ref: ref
    };
  }, p.snappingCallback = function (listener, ref) {
    this.__snapHook = {
      fun: listener,
      ref: ref
    };
  }, p.snapCompleteCallback = function (listener, ref) {
    this.__compHook = {
      fun: listener,
      ref: ref
    };
  }, p.getSnapNum = function (value) {
    return Math.floor((value + this.options.snapsize / 2) / this.options.snapsize);
  }, p.nextSnap = function () {
    this._internalStop();

    var curr_snap = this.getSnapNum(this.value);
    !this.options.endless && (curr_snap + 1) * this.options.snapsize > this._max_value ? (this.__speed = 8, this.__needsSnap = !1, this._startDecelaration()) : this.gotoSnap(curr_snap + 1, !0);
  }, p.prevSnap = function () {
    this._internalStop();

    var curr_snap = this.getSnapNum(this.value);
    !this.options.endless && (curr_snap - 1) * this.options.snapsize < this._min_value ? (this.__speed = -8, this.__needsSnap = !1, this._startDecelaration()) : this.gotoSnap(curr_snap - 1, !0);
  }, p.gotoSnap = function (snap_num, animate, speed) {
    this.changeTo(snap_num * this.options.snapsize, animate, speed, snap_num);
  }, p.destroy = function () {
    this._internalStop(), this.__renderHook = null, this.__snapHook = null, this.__compHook = null;
  }, p._internalStop = function () {
    this.start_drag = !0, this.animating = !1, this._deceleration = !1, this.__extrStep = 0;
  }, p._calculateExtraMove = function (value) {
    var m = value % this.options.snapsize;
    return m < this.options.snapsize / 2 ? -m : this.options.snapsize - m;
  }, p._calculateEnd = function (step) {
    for (var temp_speed = this.__speed, temp_value = this.value, i = 0; Math.abs(temp_speed) > this.options.minValidDist;) {
      temp_value += temp_speed, temp_speed *= this.options.friction, i++;
    }

    return step ? i : temp_value;
  }, p._checkLimits = function (value) {
    return this.options.endless ? value : value < this._min_value ? this._min_value : value > this._max_value ? this._max_value : value;
  }, p._callrenderer = function () {
    this.__renderHook && this.__renderHook.fun.call(this.__renderHook.ref, this, this.value);
  }, p._callsnapChange = function (targetSnap) {
    this.__snapHook && targetSnap !== this.current_snap && this.__snapHook.fun.call(this.__snapHook.ref, this, targetSnap, targetSnap - this.current_snap);
  }, p._callonComplete = function (type) {
    this.__compHook && !this.stopped && this.__compHook.fun.call(this.__compHook.ref, this, this.current_snap, type);
  }, p._computeDeceleration = function () {
    if (this.options.snapping && this.__needsSnap) {
      var xtr_move = (this.__startSpeed - this.__speed) / this.__startSpeed * this.__extraMove;
      this.value += this.__speed + xtr_move - this.__extrStep, this.__extrStep = xtr_move;
    } else this.value += this.__speed;

    if (this.__speed *= this.options.friction, this.options.endless || this.options.bouncing || (this.value <= this._min_value ? (this.value = this._min_value, this.__speed = 0) : this.value >= this._max_value && (this.value = this._max_value, this.__speed = 0)), this._callrenderer(), !this.options.endless && this.options.bouncing) {
      var out_value = 0;
      this.value < this._min_value ? out_value = this._min_value - this.value : this.value > this._max_value && (out_value = this._max_value - this.value), this.__isout = Math.abs(out_value) >= this.options.minValidDist, this.__isout && (this.__speed * out_value <= 0 ? this.__speed += out_value * this.options.outFriction : this.__speed = out_value * this.options.outAcceleration);
    }
  }, p._startDecelaration = function () {
    if (!this._deceleration) {
      this._deceleration = !0;

      var self = this,
          tick = function tick() {
        self._deceleration && (self._computeDeceleration(), Math.abs(self.__speed) > self.options.minValidDist || self.__isout ? window.requestAnimationFrame(tick) : (self._deceleration = !1, self.__isout = !1, self.__needsSnap && self.options.snapping && !self.options.paging ? self.value = self._checkLimits(self.end_loc + self.__extraMove) : self.value = Math.round(self.value), self._callrenderer(), self._callonComplete("decel")));
      };

      tick();
    }
  }, window.Controller = Controller;
}(), function (window, document, $) {
  window.MSLayerController = function (slide) {
    this.slide = slide, this.slider = slide.slider, this.layers = [], this.layersCount = 0, this.preloadCount = 0, this.$layers = $("<div></div>").addClass("ms-slide-layers"), this.$staticLayers = $("<div></div>").addClass("ms-static-layers"), this.$fixedLayers = $("<div></div>").addClass("ms-fixed-layers"), this.$animLayers = $("<div></div>").addClass("ms-anim-layers");
  };

  var p = MSLayerController.prototype;
  p.addLayer = function (layer) {
    switch (layer.slide = this.slide, layer.controller = this, layer.$element.data("position")) {
      case "static":
        this.hasStaticLayer = !0, layer.$element.appendTo(this.$staticLayers);
        break;

      case "fixed":
        this.hasFixedLayer = !0, layer.$element.appendTo(this.$fixedLayers);
        break;

      default:
        layer.$element.appendTo(this.$animLayers);
    }

    layer.create(), this.layers.push(layer), this.layersCount++, layer.parallax && (this.hasParallaxLayer = !0), layer.needPreload && this.preloadCount++;
  }, p.create = function () {
    this.slide.$element.append(this.$layers), this.$layers.append(this.$animLayers), this.hasStaticLayer && this.$layers.append(this.$staticLayers), "center" == this.slider.options.layersMode && (this.$layers.css("max-width", this.slider.options.width + "px"), this.hasFixedLayer && this.$fixedLayers.css("max-width", this.slider.options.width + "px"));
  }, p.loadLayers = function (callback) {
    if (this._onReadyCallback = callback, 0 === this.preloadCount) return void this._onlayersReady();

    for (var i = 0; i !== this.layersCount; ++i) {
      this.layers[i].needPreload && this.layers[i].loadImage();
    }
  }, p.prepareToShow = function () {
    this.hasParallaxLayer && this._enableParallaxEffect(), this.hasFixedLayer && this.$fixedLayers.prependTo(this.slide.view.$element);
  }, p.showLayers = function () {
    this.layersHideTween && this.layersHideTween.stop(!0), this.fixedLayersHideTween && this.fixedLayersHideTween.stop(!0), this._resetLayers(), this.$animLayers.css("opacity", "").css("display", ""), this.hasFixedLayer && this.$fixedLayers.css("opacity", "").css("display", ""), this.ready && (this._initLayers(), this._locateLayers(), this._startLayers());
  }, p.hideLayers = function () {
    if (this.slide.selected || this.slider.options.instantStartLayers) {
      var that = this;
      that.layersHideTween = CTween.animate(this.$animLayers, 500, {
        opacity: 0
      }, {
        complete: function complete() {
          that._resetLayers();
        }
      }), this.hasFixedLayer && (this.fixedLayersHideTween = CTween.animate(this.$fixedLayers, 500, {
        opacity: 0
      }, {
        complete: function complete() {
          that.$fixedLayers.detach();
        }
      })), this.hasParallaxLayer && this._disableParallaxEffect();
    }
  }, p.animHideLayers = function () {
    if (this.ready) for (var i = 0; i !== this.layersCount; ++i) {
      this.layers[i].hide();
    }
  }, p.setSize = function (width, height, hard) {
    if (this.ready && (this.slide.selected || this.hasStaticLayer) && (hard && this._initLayers(!0), this._locateLayers(!this.slide.selected)), this.slider.options.autoHeight && this.updateHeight(), "center" == this.slider.options.layersMode) {
      var left = Math.max(0, (width - this.slider.options.width) / 2) + "px";
      this.$layers[0].style.left = left, this.$fixedLayers[0].style.left = left;
    }
  }, p.updateHeight = function () {}, p._onlayersReady = function () {
    this.ready = !0, this.hasStaticLayer && !this.slide.isSleeping && this._initLayers(!1, !0), this._onReadyCallback.call(this.slide);
  }, p.onSlideSleep = function () {}, p.onSlideWakeup = function () {
    this.hasStaticLayer && this.ready && this._initLayers(!1, !0);
  }, p.getLayerById = function (layerId) {
    if (!layerId) return null;

    for (var i = 0; i < this.layersCount; ++i) {
      if (this.layers[i].id === layerId) return this.layers[i];
    }

    return null;
  }, p.destroy = function () {
    this.slide.selected && this.hasParallaxLayer && this._disableParallaxEffect();

    for (var i = 0; i < this.layersCount; ++i) {
      this.layers[i].$element.stop(!0).remove();
    }

    this.$layers.remove(), this.$staticLayers.remove(), this.$fixedLayers.remove(), this.$animLayers.remove();
  }, p._startLayers = function () {
    for (var i = 0; i !== this.layersCount; ++i) {
      var layer = this.layers[i];
      layer.waitForAction || layer.start();
    }
  }, p._initLayers = function (force, onlyStatics) {
    if (!(this.init && !force || this.slider.init_safemode)) {
      this.init = onlyStatics !== !0;
      var i = 0;
      if (onlyStatics && !this.staticsInit) for (this.staticsInit = !0; i !== this.layersCount; ++i) {
        this.layers[i].staticLayer && this.layers[i].init();
      } else if (this.staticsInit && !force) for (; i !== this.layersCount; ++i) {
        this.layers[i].staticLayer || this.layers[i].init();
      } else for (; i !== this.layersCount; ++i) {
        this.layers[i].init();
      }
    }
  }, p._locateLayers = function (onlyStatics) {
    var i = 0;
    if (onlyStatics) for (; i !== this.layersCount; ++i) {
      this.layers[i].staticLayer && this.layers[i].locate();
    } else for (; i !== this.layersCount; ++i) {
      this.layers[i].locate();
    }
  }, p._resetLayers = function () {
    this.$animLayers.css("display", "none").css("opacity", 1);

    for (var i = 0; i !== this.layersCount; ++i) {
      this.layers[i].reset();
    }
  }, p._applyParallax = function (x, y, fast) {
    for (var i = 0; i !== this.layersCount; ++i) {
      null != this.layers[i].parallax && this.layers[i].moveParallax(x, y, fast);
    }
  }, p._enableParallaxEffect = function () {
    "swipe" === this.slider.options.parallaxMode ? this.slide.view.addEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this) : this.slide.$element.on("mousemove", {
      that: this
    }, this._mouseParallaxMove).on("mouseleave", {
      that: this
    }, this._resetParalax);
  }, p._disableParallaxEffect = function () {
    "swipe" === this.slider.options.parallaxMode ? this.slide.view.removeEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this) : this.slide.$element.off("mousemove", this._mouseParallaxMove).off("mouseleave", this._resetParalax);
  }, p._resetParalax = function (e) {
    var that = e.data.that;

    that._applyParallax(0, 0);
  }, p._mouseParallaxMove = function (e) {
    var that = e.data.that,
        os = that.slide.$element.offset(),
        slider = that.slider;
    if ("mouse:y-only" !== slider.options.parallaxMode) var x = e.pageX - os.left - that.slide.__width / 2;else var x = 0;
    if ("mouse:x-only" !== slider.options.parallaxMode) var y = e.pageY - os.top - that.slide.__height / 2;else var y = 0;

    that._applyParallax(-x, -y);
  }, p._swipeParallaxMove = function (e) {
    var value = this.slide.position - this.slide.view.__contPos;
    "v" === this.slider.options.dir ? this._applyParallax(0, value, !0) : this._applyParallax(value, 0, !0);
  };
}(window, document, jQuery), function ($, window, document, undefined) {
  "use strict";

  window.MSOverlayLayerController = function (slide) {
    MSLayerController.apply(this, arguments);
  }, MSOverlayLayerController.extend(MSLayerController);
  var p = MSOverlayLayerController.prototype,
      _super = MSLayerController.prototype;
  p.addLayer = function (layer) {
    var showOnSlides = layer.$element.data("show-on"),
        hideOnSlides = layer.$element.data("hide-on");
    hideOnSlides && (layer.hideOnSlides = hideOnSlides.replace(/\s+/g, "").split(",")), showOnSlides && (layer.showOnSlides = showOnSlides.replace(/\s+/g, "").split(",")), _super.addLayer.apply(this, arguments);
  }, p.create = function () {
    _super.create.apply(this, arguments), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.checkLayers.bind(this));
  }, p.checkLayers = function () {
    if (this.ready) for (var i = 0; i !== this.layersCount; ++i) {
      var layer = this.layers[i];
      layer.waitForAction || (this._checkForShow(layer) ? layer.start() : layer.hide());
    }
  }, p._enableParallaxEffect = function () {
    this.slider.view.$element.on("mousemove", {
      that: this
    }, this._mouseParallaxMove).on("mouseleave", {
      that: this
    }, this._resetParalax);
  }, p._disableParallaxEffect = function () {
    this.slider.view.$element.off("mousemove", this._mouseParallaxMove).off("mouseleave", this._resetParalax);
  }, p._startLayers = function () {
    for (var i = 0; i !== this.layersCount; ++i) {
      var layer = this.layers[i];
      this._checkForShow(layer) && !layer.waitForAction && layer.start();
    }
  }, p._checkForShow = function (layer) {
    var slideId = this.slider.api.currentSlide.id,
        layerHideOn = layer.hideOnSlides,
        layerShowOn = layer.showOnSlides;
    return layerShowOn ? !!slideId && layerShowOn.indexOf(slideId) !== -1 : !slideId || !layerHideOn || layerHideOn.length && layerHideOn.indexOf(slideId) === -1;
  };
}(jQuery, window, document), function ($, window, document, undefined) {
  "use strict";

  window.MSOverlayLayers = function (slider) {
    this.slider = slider;
  };

  var p = MSOverlayLayers.prototype;
  p.setupLayerController = function () {
    this.layerController = new MSOverlayLayerController(this), this.slider.api.addEventListener(MSSliderEvent.RESIZE, this.setSize.bind(this)), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.setSize.bind(this)), this.setSize();
  }, p.setSize = function () {
    this.__width = this.$element.width(), this.__height = this.$element.height(), this.layerController.setSize(this.__width, this.__height);
  }, p.create = function () {
    this.layerController.create(), this.layerController.loadLayers(this._onLayersLoad), this.layerController.prepareToShow(), window.pointerEventsPolyfill && window.pointerEventsPolyfill({
      selector: "#" + this.slider.$element.attr("id") + " .ms-overlay-layers",
      forcePolyfill: !1
    });
  }, p.getHeight = function () {
    return this.slider.api.currentSlide.getHeight();
  }, p.destroy = function () {
    this.layerController.destroy();
  }, p._onLayersLoad = function () {
    this.ready = !0, this.selected = !0, this.layersLoaded = !0, this.setSize(), this.layerController.showLayers();
  };
}(jQuery, window, document), function ($) {
  window.MSLayerEffects = {};
  var installed,
      _fade = {
    opacity: 0
  };

  MSLayerEffects.setup = function () {
    if (!installed) {
      installed = !0;
      var st = MSLayerEffects,
          transform_css = window._jcsspfx + "Transform",
          transform_orig_css = window._jcsspfx + "TransformOrigin",
          o = $.browser.opera;
      _2d = window._css2d && window._cssanim && !o, st.defaultValues = {
        left: 0,
        top: 0,
        opacity: isMSIE("<=9") ? 1 : "",
        right: 0,
        bottom: 0
      }, st.defaultValues[transform_css] = "", st.rf = 1, st.presetEffParams = {
        random: "30|300",
        "long": 300,
        "short": 30,
        "false": !1,
        "true": !0,
        tl: "top left",
        bl: "bottom left",
        tr: "top right",
        br: "bottom right",
        rt: "top right",
        lb: "bottom left",
        lt: "top left",
        rb: "bottom right",
        t: "top",
        b: "bottom",
        r: "right",
        l: "left",
        c: "center"
      }, st.fade = function () {
        return _fade;
      }, st.left = _2d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "translateX(" + -dist * st.rf + "px)", r;
      } : function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r.left = -dist * st.rf + "px", r;
      }, st.right = _2d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "translateX(" + dist * st.rf + "px)", r;
      } : function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r.left = dist * st.rf + "px", r;
      }, st.top = _2d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "translateY(" + -dist * st.rf + "px)", r;
      } : function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r.top = -dist * st.rf + "px", r;
      }, st.bottom = _2d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "translateY(" + dist * st.rf + "px)", r;
      } : function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r.top = dist * st.rf + "px", r;
      }, st.from = _2d ? function (leftdis, topdis, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "translateX(" + leftdis * st.rf + "px) translateY(" + topdis * st.rf + "px)", r;
      } : function (leftdis, topdis, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r.top = topdis * st.rf + "px", r.left = leftdis * st.rf + "px", r;
      }, st.rotate = _2d ? function (deg, orig) {
        var r = {
          opacity: 0
        };
        return r[transform_css] = " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, orig) {
        return _fade;
      }, st.rotateleft = _2d ? function (deg, dist, orig, fade) {
        var r = st.left(dist, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return st.left(dist, fade);
      }, st.rotateright = _2d ? function (deg, dist, orig, fade) {
        var r = st.right(dist, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return st.right(dist, fade);
      }, st.rotatetop = _2d ? function (deg, dist, orig, fade) {
        var r = st.top(dist, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return st.top(dist, fade);
      }, st.rotatebottom = _2d ? function (deg, dist, orig, fade) {
        var r = st.bottom(dist, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return st.bottom(dist, fade);
      }, st.rotatefrom = _2d ? function (deg, leftdis, topdis, orig, fade) {
        var r = st.from(leftdis, topdis, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, leftdis, topdis, orig, fade) {
        return st.from(leftdis, topdis, fade);
      }, st.skewleft = _2d ? function (deg, dist, fade) {
        var r = st.left(dist, fade);
        return r[transform_css] += " skewX(" + deg + "deg)", r;
      } : function (deg, dist, fade) {
        return st.left(dist, fade);
      }, st.skewright = _2d ? function (deg, dist, fade) {
        var r = st.right(dist, fade);
        return r[transform_css] += " skewX(" + -deg + "deg)", r;
      } : function (deg, dist, fade) {
        return st.right(dist, fade);
      }, st.skewtop = _2d ? function (deg, dist, fade) {
        var r = st.top(dist, fade);
        return r[transform_css] += " skewY(" + deg + "deg)", r;
      } : function (deg, dist, fade) {
        return st.top(dist, fade);
      }, st.skewbottom = _2d ? function (deg, dist, fade) {
        var r = st.bottom(dist, fade);
        return r[transform_css] += " skewY(" + -deg + "deg)", r;
      } : function (deg, dist, fade) {
        return st.bottom(dist, fade);
      }, st.scale = _2d ? function (x, y, orig, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, orig, fade) {
        return fade === !1 ? {} : {
          opacity: 0
        };
      }, st.scaleleft = _2d ? function (x, y, dist, orig, fade) {
        var r = st.left(dist, fade);
        return r[transform_css] = " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, dist, orig, fade) {
        return st.left(dist, fade);
      }, st.scaleright = _2d ? function (x, y, dist, orig, fade) {
        var r = st.right(dist, fade);
        return r[transform_css] = " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, dist, orig, fade) {
        return st.right(dist, fade);
      }, st.scaletop = _2d ? function (x, y, dist, orig, fade) {
        var r = st.top(dist, fade);
        return r[transform_css] = " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, dist, orig, fade) {
        return st.top(dist, fade);
      }, st.scalebottom = _2d ? function (x, y, dist, orig, fade) {
        var r = st.bottom(dist, fade);
        return r[transform_css] = " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, dist, orig, fade) {
        return st.bottom(dist, fade);
      }, st.scalefrom = _2d ? function (x, y, leftdis, topdis, orig, fade) {
        var r = st.from(leftdis, topdis, fade);
        return r[transform_css] += " scaleX(" + x + ") scaleY(" + y + ")", orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, leftdis, topdis, orig, fade) {
        return st.from(leftdis, topdis, fade);
      }, st.rotatescale = _2d ? function (deg, x, y, orig, fade) {
        var r = st.scale(x, y, orig, fade);
        return r[transform_css] += " rotate(" + deg + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, x, y, orig, fade) {
        return st.scale(x, y, orig, fade);
      }, st.front = window._css3d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "perspective(2000px) translate3d(0 , 0 ," + dist + "px ) rotate(0.001deg)", r;
      } : function (dist) {
        return _fade;
      }, st.back = window._css3d ? function (dist, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "perspective(2000px) translate3d(0 , 0 ," + -dist + "px ) rotate(0.001deg)", r;
      } : function (dist) {
        return _fade;
      }, st.rotatefront = window._css3d ? function (deg, dist, orig, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "perspective(2000px) translate3d(0 , 0 ," + dist + "px ) rotate(" + (deg || .001) + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return _fade;
      }, st.rotateback = window._css3d ? function (deg, dist, orig, fade) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return r[transform_css] = "perspective(2000px) translate3d(0 , 0 ," + -dist + "px ) rotate(" + (deg || .001) + "deg)", orig && (r[transform_orig_css] = orig), r;
      } : function (deg, dist, orig, fade) {
        return _fade;
      }, st.rotate3dleft = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.left(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.left(dist, fade);
      }, st.rotate3dright = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.right(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.right(dist, fade);
      }, st.rotate3dtop = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.top(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.top(dist, fade);
      }, st.rotate3dbottom = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.bottom(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.bottom(dist, fade);
      }, st.rotate3dfront = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.front(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.front(dist, fade);
      }, st.rotate3dback = window._css3d ? function (x, y, z, dist, orig, fade) {
        var r = st.back(dist, fade);
        return r[transform_css] += (x ? " rotateX(" + x + "deg)" : " ") + (y ? " rotateY(" + y + "deg)" : "") + (z ? " rotateZ(" + z + "deg)" : ""), orig && (r[transform_orig_css] = orig), r;
      } : function (x, y, z, dist, orig, fade) {
        return st.back(dist, fade);
      }, st.t = window._css3d ? function (fade, tx, ty, tz, r, rx, ry, rz, scx, scy, skx, sky, ox, oy, oz) {
        var _r = fade === !1 ? {} : {
          opacity: 0
        },
            transform = "perspective(2000px) ";

        "n" !== tx && (transform += "translateX(" + tx * st.rf + "px) "), "n" !== ty && (transform += "translateY(" + ty * st.rf + "px) "), "n" !== tz && (transform += "translateZ(" + tz * st.rf + "px) "), "n" !== r && (transform += "rotate(" + r + "deg) "), "n" !== rx && (transform += "rotateX(" + rx + "deg) "), "n" !== ry && (transform += "rotateY(" + ry + "deg) "), "n" !== rz && (transform += "rotateZ(" + rz + "deg) "), "n" !== skx && (transform += "skewX(" + skx + "deg) "), "n" !== sky && (transform += "skewY(" + sky + "deg) "), "n" !== scx && (transform += "scaleX(" + scx + ") "), "n" !== scy && (transform += "scaleY(" + scy + ")"), _r[transform_css] = transform;
        var trans_origin = "";
        return trans_origin += "n" !== ox ? ox + "% " : "50% ", trans_origin += "n" !== oy ? oy + "% " : "50% ", trans_origin += "n" !== oz ? oz + "px" : "", _r[transform_orig_css] = trans_origin, _r;
      } : function (fade, tx, ty, tz, r, rx, ry, rz, scx, scy, skx, sky, ox, oy, oz) {
        var r = fade === !1 ? {} : {
          opacity: 0
        };
        return "n" !== tx && (r.left = tx * st.rf + "px"), "n" !== ty && (r.top = ty * st.rf + "px"), r;
      };
    }
  };
}(jQuery), function ($) {
  window.MSLayerElement = function () {
    this.start_anim = {
      name: "fade",
      duration: 1e3,
      ease: "linear",
      delay: 0
    }, this.end_anim = {
      duration: 1e3,
      ease: "linear"
    }, this.type = "text", this.resizable = !0, this.minWidth = -1, this.isVisible = !0, this.__cssConfig = ["margin-top", "padding-top", "margin-bottom", "padding-left", "margin-right", "padding-right", "margin-left", "padding-bottom", "font-size", "line-height", "width", "left", "right", "top", "bottom"], this.baseStyle = {};
  };

  var p = MSLayerElement.prototype;
  p.setStartAnim = function (anim) {
    $.extend(this.start_anim, anim), $.extend(this.start_anim, this._parseEff(this.start_anim.name)), this.$element.css("visibility", "hidden");
  }, p.setEndAnim = function (anim) {
    $.extend(this.end_anim, anim);
  }, p.create = function () {
    if (this.$element.css("display", "none"), this.resizable = this.$element.data("resize") !== !1, this.fixed = this.$element.data("fixed") === !0, void 0 !== this.$element.data("widthlimit") && (this.minWidth = this.$element.data("widthlimit")), this.end_anim.name || (this.end_anim.name = this.start_anim.name), this.end_anim.time && (this.autoHide = !0), this.staticLayer = "static" === this.$element.data("position"), this.fixedLayer = "fixed" === this.$element.data("position"), this.layersCont = this.controller.$layers, this.staticLayer && this.$element.css("display", "").css("visibility", ""), void 0 !== this.$element.data("action")) {
      var slideController = this.slide.slider.slideController;
      this.$element.on(this.$element.data("action-event") || "click", function (event) {
        slideController.runAction($(this).data("action")), event.preventDefault();
      }).addClass("ms-action-layer");
    }

    $.extend(this.end_anim, this._parseEff(this.end_anim.name)), this.slider = this.slide.slider, this.masked && (this.$mask = $("<div></div>").addClass("ms-layer-mask"), this.link ? (this.link.wrap(this.$mask), this.$mask = this.link.parent()) : (this.$element.wrap(this.$mask), this.$mask = this.$element.parent()), this.maskWidth && this.$mask.width(this.maskWidth), this.maskHeight && (this.$mask.height(this.maskHeight), this.__cssConfig.indexOf("height") === -1 && this.__cssConfig.push("height")));
    var layerOrigin = this.layerOrigin = this.$element.data("origin");

    if (layerOrigin) {
      var vOrigin = layerOrigin.charAt(0),
          hOrigin = layerOrigin.charAt(1),
          offsetX = this.$element.data("offset-x"),
          offsetY = this.$element.data("offset-y"),
          layerEle = this.masked ? this.$mask[0] : this.$element[0];

      switch (void 0 === offsetY && (offsetY = 0), vOrigin) {
        case "t":
          layerEle.style.top = offsetY + "px";
          break;

        case "b":
          layerEle.style.bottom = offsetY + "px";
          break;

        case "m":
          layerEle.style.top = offsetY + "px", this.middleAlign = !0;
      }

      switch (void 0 === offsetX && (offsetX = 0), hOrigin) {
        case "l":
          layerEle.style.left = offsetX + "px";
          break;

        case "r":
          layerEle.style.right = offsetX + "px";
          break;

        case "c":
          layerEle.style.left = offsetX + "px", this.centerAlign = !0;
      }
    }

    this.parallax = this.$element.data("parallax"), null != this.parallax && (this.parallax /= 100, this.$parallaxElement = $("<div></div>").addClass("ms-parallax-layer"), this.masked ? (this.$mask.wrap(this.$parallaxElement), this.$parallaxElement = this.$mask.parent()) : this.link ? (this.link.wrap(this.$parallaxElement), this.$parallaxElement = this.link.parent()) : (this.$element.wrap(this.$parallaxElement), this.$parallaxElement = this.$element.parent()), this._lastParaX = 0, this._lastParaY = 0, this._paraX = 0, this._paraY = 0, this.alignedToBot = this.layerOrigin && this.layerOrigin.indexOf("b") !== -1, this.alignedToBot && this.$parallaxElement.css("bottom", 0), window._css3d ? this.parallaxRender = this._parallaxCSS3DRenderer : window._css2d ? this.parallaxRender = this._parallaxCSS2DRenderer : this.parallaxRender = this._parallax2DRenderer, "swipe" !== this.slider.options.parallaxMode && averta.Ticker.add(this.parallaxRender, this)), $.removeDataAttrs(this.$element, ["data-src"]);
  }, p.init = function () {
    this.initialized = !0;
    var value;
    this.$element.css("visibility", "");

    for (var i = 0, l = this.__cssConfig.length; i < l; i++) {
      var key = this.__cssConfig[i];
      if (this._isPosition(key) && this.masked) value = this.$mask.css(key);else if ("text" !== this.type || "width" !== key || this.masked || this.maskWidth) {
        value = this.$element.css(key);
        var isSize = "width" === key || "height" === key;
        isSize && this.masked && (this.maskWidth && "width" === key ? value = this.maskWidth + "px" : this.maskHeight && "height" === key && (value = this.maskHeight + "px")), isSize && "0px" === value && (value = this.$element.data(key) + "px");
      } else value = this.$element[0].style.width;
      this.layerOrigin && ("top" === key && this.layerOrigin.indexOf("t") === -1 && this.layerOrigin.indexOf("m") === -1 || "bottom" === key && this.layerOrigin.indexOf("b") === -1 || "left" === key && this.layerOrigin.indexOf("l") === -1 && this.layerOrigin.indexOf("c") === -1 || "right" === key && this.layerOrigin.indexOf("r") === -1) || "auto" != value && "" != value && "normal" != value && (this.baseStyle[key] = parseInt(value));
    }

    this.middleAlign && (this.baseHeight = this.$element.outerHeight(!1)), this.centerAlign && (this.baseWidth = this.$element.outerWidth(!1));
  }, p.locate = function () {
    if (this.slide.ready) {
      var factor,
          isPosition,
          isSize,
          width = parseFloat(this.layersCont.css("width")),
          height = parseFloat(this.layersCont.css("height"));
      !this.staticLayer && "none" === this.$element.css("display") && this.isVisible && this.$element.css("display", "").css("visibility", "hidden"), this.staticLayer && this.$element.addClass("ms-hover-active"), factor = this.resizeFactor = width / this.slide.slider.options.width;
      var $layerEle = this.masked ? this.$mask : this.$element;

      for (var key in this.baseStyle) {
        isPosition = this._isPosition(key), isSize = "width" === key || "height" === key, factor = this.fixed && isPosition ? 1 : this.resizeFactor, (this.resizable || isPosition) && ("top" === key && this.middleAlign ? ($layerEle[0].style.top = "0px", this.baseHeight = $layerEle.outerHeight(!1), $layerEle[0].style.top = this.baseStyle.top * factor + (height - this.baseHeight) / 2 + "px") : "left" === key && this.centerAlign ? ($layerEle[0].style.left = "0px", this.baseWidth = $layerEle.outerWidth(!1), $layerEle[0].style.left = this.baseStyle.left * factor + (width - this.baseWidth) / 2 + "px") : isPosition && this.masked ? $layerEle[0].style[key] = this.baseStyle[key] * factor + "px" : isSize && ("width" === key && this.maskWidth || "height" === key && this.maskHeight) ? $layerEle[0].style[key] = this.baseStyle[key] * factor + "px" : this.$element.css(key, this.baseStyle[key] * factor + "px"));
      }

      this.visible(this.minWidth < width);
    }
  }, p.start = function () {
    if (!this.isShowing && !this.staticLayer) {
      this.isShowing = !0, this.$element.removeClass("ms-hover-active");
      var key, base;
      MSLayerEffects.rf = this.resizeFactor;
      var effect_css = MSLayerEffects[this.start_anim.eff_name].apply(null, this._parseEffParams(this.start_anim.eff_params)),
          start_css_eff = {};

      for (key in effect_css) {
        this._checkPosKey(key, effect_css) || (null != MSLayerEffects.defaultValues[key] && (start_css_eff[key] = MSLayerEffects.defaultValues[key]), key in this.baseStyle && (base = this.baseStyle[key], this.middleAlign && "top" === key && (base += (parseInt(this.layersCont.height()) - this.$element.outerHeight(!1)) / 2), this.centerAlign && "left" === key && (base += (parseInt(this.layersCont.width()) - this.$element.outerWidth(!1)) / 2), effect_css[key] = base + parseFloat(effect_css[key]) + "px", start_css_eff[key] = base + "px"), this.$element.css(key, effect_css[key]));
      }

      var that = this;
      clearTimeout(this.to), clearTimeout(this.clHide), this.to = setTimeout(function () {
        that.$element.css("visibility", ""), that._playAnimation(that.start_anim, start_css_eff);
      }, that.start_anim.delay || .01), this.clTo = setTimeout(function () {
        that.show_cl = !0, that.$element.addClass("ms-hover-active");
      }, (this.start_anim.delay || .01) + this.start_anim.duration + 1), this.autoHide && (clearTimeout(this.hto), this.hto = setTimeout(function () {
        that.hide();
      }, that.end_anim.time));
    }
  }, p.hide = function () {
    if (!this.staticLayer) {
      this.$element.removeClass("ms-hover-active"), this.isShowing = !1;
      var effect_css = MSLayerEffects[this.end_anim.eff_name].apply(null, this._parseEffParams(this.end_anim.eff_params));

      for (key in effect_css) {
        this._checkPosKey(key, effect_css) || (key === window._jcsspfx + "TransformOrigin" && this.$element.css(key, effect_css[key]), key in this.baseStyle && (effect_css[key] = this.baseStyle[key] + parseFloat(effect_css[key]) + "px"));
      }

      this._playAnimation(this.end_anim, effect_css), clearTimeout(this.clHide), 0 === effect_css.opacity && (this.clHide = setTimeout(function () {
        this.$element.css("visibility", "hidden");
      }.bind(this), this.end_anim.duration + 1)), clearTimeout(this.to), clearTimeout(this.hto), clearTimeout(this.clTo);
    }
  }, p.reset = function () {
    this.staticLayer || (this.isShowing = !1, this.$element[0].style.display = "none", this.$element.css("opacity", ""), this.$element[0].style.transitionDuration = "", this.show_tween && this.show_tween.stop(!0), clearTimeout(this.to), clearTimeout(this.hto));
  }, p.destroy = function () {
    this.reset(), this.$element.remove();
  }, p.visible = function (value) {
    this.isVisible != value && (this.isVisible = value, this.$element.css("display", value ? "" : "none"));
  }, p.moveParallax = function (x, y, fast) {
    this._paraX = x, this._paraY = y, fast && (this._lastParaX = x, this._lastParaY = y, this.parallaxRender());
  }, p._playAnimation = function (animation, css) {
    var options = {};
    animation.ease && (options.ease = animation.ease), options.transProperty = window._csspfx + "transform,opacity", this.show_tween && this.show_tween.stop(!0), this.show_tween = CTween.animate(this.$element, animation.duration, css, options);
  }, p._randomParam = function (value) {
    var min = Number(value.slice(0, value.indexOf("|"))),
        max = Number(value.slice(value.indexOf("|") + 1));
    return min + Math.random() * (max - min);
  }, p._parseEff = function (eff_name) {
    var eff_params = [];

    if (eff_name.indexOf("(") !== -1) {
      var value,
          temp = eff_name.slice(0, eff_name.indexOf("(")).toLowerCase();
      eff_params = eff_name.slice(eff_name.indexOf("(") + 1, -1).replace(/\"|\'|\s/g, "").split(","), eff_name = temp;

      for (var i = 0, l = eff_params.length; i < l; ++i) {
        value = eff_params[i], value in MSLayerEffects.presetEffParams && (value = MSLayerEffects.presetEffParams[value]), eff_params[i] = value;
      }
    }

    return {
      eff_name: eff_name,
      eff_params: eff_params
    };
  }, p._parseEffParams = function (params) {
    for (var eff_params = [], i = 0, l = params.length; i < l; ++i) {
      var value = params[i];
      "string" == typeof value && value.indexOf("|") !== -1 && (value = this._randomParam(value)), eff_params[i] = value;
    }

    return eff_params;
  }, p._checkPosKey = function (key, style) {
    return "left" === key && !(key in this.baseStyle) && "right" in this.baseStyle ? (style.right = -parseInt(style.left) + "px", delete style.left, !0) : "top" === key && !(key in this.baseStyle) && "bottom" in this.baseStyle && (style.bottom = -parseInt(style.top) + "px", delete style.top, !0);
  }, p._isPosition = function (key) {
    return "top" === key || "left" === key || "bottom" === key || "right" === key;
  }, p._parallaxCalc = function () {
    var x_def = this._paraX - this._lastParaX,
        y_def = this._paraY - this._lastParaY;
    this._lastParaX += x_def / 12, this._lastParaY += y_def / 12, Math.abs(x_def) < .019 && (this._lastParaX = this._paraX), Math.abs(y_def) < .019 && (this._lastParaY = this._paraY);
  }, p._parallaxCSS3DRenderer = function () {
    this._parallaxCalc(), this.$parallaxElement[0].style[window._jcsspfx + "Transform"] = "translateX(" + this._lastParaX * this.parallax + "px) translateY(" + this._lastParaY * this.parallax + "px) translateZ(0)";
  }, p._parallaxCSS2DRenderer = function () {
    this._parallaxCalc(), this.$parallaxElement[0].style[window._jcsspfx + "Transform"] = "translateX(" + this._lastParaX * this.parallax + "px) translateY(" + this._lastParaY * this.parallax + "px)";
  }, p._parallax2DRenderer = function () {
    this._parallaxCalc(), this.alignedToBot ? this.$parallaxElement[0].style.bottom = this._lastParaY * this.parallax + "px" : this.$parallaxElement[0].style.top = this._lastParaY * this.parallax + "px", this.$parallaxElement[0].style.left = this._lastParaX * this.parallax + "px";
  };
}(jQuery), function ($) {
  window.MSImageLayerElement = function () {
    MSLayerElement.call(this), this.needPreload = !0, this.__cssConfig = ["width", "height", "margin-top", "padding-top", "margin-bottom", "padding-left", "margin-right", "padding-right", "margin-left", "padding-bottom", "left", "right", "top", "bottom"], this.type = "image";
  }, MSImageLayerElement.extend(MSLayerElement);
  var p = MSImageLayerElement.prototype,
      _super = MSLayerElement.prototype;
  p.create = function () {
    if (this.link) {
      var p = this.$element.parent();
      p.append(this.link), this.link.append(this.$element), this.link.removeClass("ms-layer"), this.$element.addClass("ms-layer"), p = null;
    }

    if (_super.create.call(this), void 0 != this.$element.data("src")) this.img_src = this.$element.data("src"), this.$element.removeAttr("data-src");else {
      var that = this;
      this.$element.on("load", function (event) {
        that.controller.preloadCount--, 0 === that.controller.preloadCount && that.controller._onlayersReady();
      }).each($.jqLoadFix);
    }
    $.browser.msie && this.$element.on("dragstart", function (event) {
      event.preventDefault();
    });
  }, p.loadImage = function () {
    var that = this;
    this.$element.preloadImg(this.img_src, function (event) {
      that.controller.preloadCount--, 0 === that.controller.preloadCount && that.controller._onlayersReady();
    });
  };
}(jQuery), function ($) {
  window.MSVideoLayerElement = function () {
    MSLayerElement.call(this), this.__cssConfig.push("height"), this.type = "video";
  }, MSVideoLayerElement.extend(MSLayerElement);
  var p = MSVideoLayerElement.prototype,
      _super = MSLayerElement.prototype;
  p.__playVideo = function () {
    this.img && CTween.fadeOut(this.img, 500, 2), CTween.fadeOut(this.video_btn, 500, 2), this.video_frame.attr("src", "about:blank").css("display", "block"), this.video_url.indexOf("?") == -1 && (this.video_url += "?"), this.video_frame.attr("src", this.video_url + "&autoplay=1");
  }, p.start = function () {
    _super.start.call(this), this.$element.data("autoplay") && this.__playVideo();
  }, p.reset = function () {
    return _super.reset.call(this), (this.needPreload || this.$element.data("btn")) && (this.video_btn.css("opacity", 1).css("display", "block"), this.video_frame.attr("src", "about:blank").css("display", "none")), this.needPreload ? void this.img.css("opacity", 1).css("display", "block") : void this.video_frame.attr("src", this.video_url);
  }, p.create = function () {
    _super.create.call(this), this.video_frame = this.$element.find("iframe").css({
      width: "100%",
      height: "100%"
    }), this.video_url = this.video_frame.attr("src");
    var has_img = 0 != this.$element.has("img").length;

    if (has_img || this.$element.data("btn")) {
      this.video_frame.attr("src", "about:blank").css("display", "none");
      var that = this;

      if (this.video_btn = $("<div></div>").appendTo(this.$element).addClass("ms-video-btn").click(function () {
        that.__playVideo();
      }), has_img) {
        if (this.needPreload = !0, this.img = this.$element.find("img:first").addClass("ms-video-img"), void 0 !== this.img.data("src")) this.img_src = this.img.data("src"), this.img.removeAttr("data-src");else {
          var that = this;
          this.img.attr("src", this.img_src).on("load", function (event) {
            that.controller.preloadCount--, 0 === that.controller.preloadCount && that.controller._onlayersReady();
          }).each($.jqLoadFix);
        }
        $.browser.msie && this.img.on("dragstart", function (event) {
          event.preventDefault();
        });
      }
    }
  }, p.loadImage = function () {
    var that = this;
    this.img.preloadImg(this.img_src, function (event) {
      that.controller.preloadCount--, 0 === that.controller.preloadCount && that.controller._onlayersReady();
    });
  };
}(jQuery), function ($) {
  "use strict";

  window.MSHotspotLayer = function () {
    MSLayerElement.call(this), this.__cssConfig = ["margin-top", "padding-top", "margin-bottom", "padding-left", "margin-right", "padding-right", "margin-left", "padding-bottom", "left", "right", "top", "bottom"], this.ease = "Expo", this.hide_start = !0, this.type = "hotspot";
  }, MSHotspotLayer.extend(MSLayerElement);
  var p = MSHotspotLayer.prototype,
      _super = MSLayerElement.prototype;
  p._showTT = function () {
    this.show_cl && (clearTimeout(this.hto), this._tween && this._tween.stop(!0), this.hide_start && (this.align = this._orgAlign, this._locateTT(), this.tt.css({
      display: "block"
    }), this._tween = CTween.animate(this.tt, 900, this.to, {
      ease: "easeOut" + this.ease
    }), this.hide_start = !1));
  }, p._hideTT = function () {
    if (this.show_cl) {
      this._tween && this._tween.stop(!0);
      var that = this;
      clearTimeout(this.hto), this.hto = setTimeout(function () {
        that.hide_start = !0, that._tween = CTween.animate(that.tt, 900, that.from, {
          ease: "easeOut" + that.ease,
          complete: function complete() {
            that.tt.css("display", "none");
          }
        });
      }, 200);
    }
  }, p._updateClassName = function (name) {
    this._lastClass && this.tt.removeClass(this._lastClass), this.tt.addClass(name), this._lastClass = name;
  }, p._alignPolicy = function () {
    var w = (this.tt.outerHeight(!1), Math.max(this.tt.outerWidth(!1), parseInt(this.tt.css("max-width")))),
        ww = window.innerWidth;
    window.innerHeight;

    switch (this.align) {
      case "top":
        if (this.base_t < 0) return "bottom";
        break;

      case "right":
        if (this.base_l + w > ww || this.base_t < 0) return "bottom";
        break;

      case "left":
        if (this.base_l < 0 || this.base_t < 0) return "bottom";
    }

    return null;
  }, p._locateTT = function () {
    var os = this.$element.offset(),
        os2 = this.slide.slider.$element.offset(),
        dist = 50,
        space = 15;
    this.pos_x = os.left - os2.left - this.slide.slider.$element.scrollLeft(), this.pos_y = os.top - os2.top - this.slide.slider.$element.scrollTop(), this.from = {
      opacity: 0
    }, this.to = {
      opacity: 1
    }, this._updateClassName("ms-tooltip-" + this.align), this.tt_arrow.css("margin-left", "");
    var arrow_w = 15,
        arrow_h = 15;

    switch (this.align) {
      case "top":
        var w = Math.min(this.tt.outerWidth(!1), parseInt(this.tt.css("max-width")));
        this.base_t = this.pos_y - this.tt.outerHeight(!1) - arrow_h - space, this.base_l = this.pos_x - w / 2, this.base_l + w > window.innerWidth && (this.tt_arrow.css("margin-left", -arrow_w / 2 + this.base_l + w - window.innerWidth + "px"), this.base_l = window.innerWidth - w), this.base_l < 0 && (this.base_l = 0, this.tt_arrow.css("margin-left", -arrow_w / 2 + this.pos_x - this.tt.outerWidth(!1) / 2 + "px")), window._css3d ? (this.from[window._jcsspfx + "Transform"] = "translateY(-" + dist + "px)", this.to[window._jcsspfx + "Transform"] = "") : (this.from.top = this.base_t - dist + "px", this.to.top = this.base_t + "px");
        break;

      case "bottom":
        var w = Math.min(this.tt.outerWidth(!1), parseInt(this.tt.css("max-width")));
        this.base_t = this.pos_y + arrow_h + space, this.base_l = this.pos_x - w / 2, this.base_l + w > window.innerWidth && (this.tt_arrow.css("margin-left", -arrow_w / 2 + this.base_l + w - window.innerWidth + "px"), this.base_l = window.innerWidth - w), this.base_l < 0 && (this.base_l = 0, this.tt_arrow.css("margin-left", -arrow_w / 2 + this.pos_x - this.tt.outerWidth(!1) / 2 + "px")), window._css3d ? (this.from[window._jcsspfx + "Transform"] = "translateY(" + dist + "px)", this.to[window._jcsspfx + "Transform"] = "") : (this.from.top = this.base_t + dist + "px", this.to.top = this.base_t + "px");
        break;

      case "right":
        this.base_l = this.pos_x + arrow_w + space, this.base_t = this.pos_y - this.tt.outerHeight(!1) / 2, window._css3d ? (this.from[window._jcsspfx + "Transform"] = "translateX(" + dist + "px)", this.to[window._jcsspfx + "Transform"] = "") : (this.from.left = this.base_l + dist + "px", this.to.left = this.base_l + "px");
        break;

      case "left":
        this.base_l = this.pos_x - arrow_w - this.tt.outerWidth(!1) - space, this.base_t = this.pos_y - this.tt.outerHeight(!1) / 2, window._css3d ? (this.from[window._jcsspfx + "Transform"] = "translateX(-" + dist + "px)", this.to[window._jcsspfx + "Transform"] = "") : (this.from.left = this.base_l - dist + "px", this.to.left = this.base_l + "px");
    }

    var policyAlign = this._alignPolicy();

    return null !== policyAlign ? (this.align = policyAlign, void this._locateTT()) : (this.tt.css("top", parseInt(this.base_t) + "px").css("left", parseInt(this.base_l) + "px"), void this.tt.css(this.from));
  }, p.start = function () {
    _super.start.call(this), this.tt.appendTo(this.slide.slider.$element), this.tt.css("display", "none");
  }, p.reset = function () {
    _super.reset.call(this), this.tt.detach();
  }, p.create = function () {
    var that = this;
    this._orgAlign = this.align = void 0 !== this.$element.data("align") ? this.$element.data("align") : "top", this.data = this.$element.html(), this.$element.html("").on("mouseenter", function () {
      that._showTT();
    }).on("mouseleave", function () {
      that._hideTT();
    }), this.point = $('<div><div class="ms-point-center"></div><div class="ms-point-border"></div></div>').addClass("ms-tooltip-point").appendTo(this.$element);
    var link = this.$element.data("link"),
        target = this.$element.data("target");
    link && this.point.on("click", function () {
      window.open(link, target || "_self");
    }), this.tt = $("<div></div>").addClass("ms-tooltip").css("display", "hidden").css("opacity", 0), void 0 !== this.$element.data("width") && this.tt.css("width", this.$element.data("width")).css("max-width", this.$element.data("width")), this.tt_arrow = $("<div></div>").addClass("ms-tooltip-arrow").appendTo(this.tt), this._updateClassName("ms-tooltip-" + this.align), this.ttcont = $("<div></div>").addClass("ms-tooltip-cont").html(this.data).appendTo(this.tt), this.$element.data("stay-hover") === !0 && this.tt.on("mouseenter", function () {
      that.hide_start || (clearTimeout(that.hto), that._tween.stop(!0), that._showTT());
    }).on("mouseleave", function () {
      that._hideTT();
    }), _super.create.call(this);
  };
}(jQuery), function ($) {
  window.MSButtonLayer = function () {
    MSLayerElement.call(this), this.type = "button";
  }, MSButtonLayer.extend(MSLayerElement);
  var p = MSButtonLayer.prototype,
      _super = MSLayerElement.prototype,
      positionKies = ["top", "left", "bottom", "right"];
  p.create = function () {
    _super.create.call(this), this.$element.wrap('<div class="ms-btn-container"></div>').css("position", "relative"), this.$container = this.$element.parent();
  }, p.locate = function () {
    _super.locate.call(this);

    for (var key, tempValue, i = 0; i < 4; i++) {
      key = positionKies[i], key in this.baseStyle && (tempValue = this.$element.css(key), this.$element.css(key, ""), this.$container.css(key, tempValue));
    }

    this.$container.width(this.$element.outerWidth(!0)).height(this.$element.outerHeight(!0));
  };
}(jQuery), window.MSSliderEvent = function (type) {
  this.type = type;
}, MSSliderEvent.CHANGE_START = "ms_changestart", MSSliderEvent.CHANGE_END = "ms_changeend", MSSliderEvent.WAITING = "ms_waiting", MSSliderEvent.AUTOPLAY_CHANGE = "ms_autoplaychange", MSSliderEvent.VIDEO_PLAY = "ms_videoPlay", MSSliderEvent.VIDEO_CLOSE = "ms_videoclose", MSSliderEvent.INIT = "ms_init", MSSliderEvent.HARD_UPDATE = "ms_hard_update", MSSliderEvent.RESIZE = "ms_resize", MSSliderEvent.RESERVED_SPACE_CHANGE = "ms_rsc", MSSliderEvent.DESTROY = "ms_destroy", function (window, document, $) {
  "use strict";

  window.MSSlide = function () {
    this.$element = null, this.$loading = $("<div></div>").addClass("ms-slide-loading"), this.view = null, this.index = -1, this.__width = 0, this.__height = 0, this.fillMode = "fill", this.selected = !1, this.pselected = !1, this.autoAppend = !0, this.isSleeping = !0, this.moz = $.browser.mozilla;
  };

  var p = MSSlide.prototype;
  p.onSwipeStart = function () {
    this.link && (this.linkdis = !0), this.video && (this.videodis = !0);
  }, p.onSwipeMove = function (e) {
    var move = Math.max(Math.abs(e.data.distanceX), Math.abs(e.data.distanceY));
    this.swipeMoved = move > 4;
  }, p.onSwipeCancel = function (e) {
    return this.swipeMoved ? void (this.swipeMoved = !1) : (this.link && (this.linkdis = !1), void (this.video && (this.videodis = !1)));
  }, p.setupLayerController = function () {
    this.hasLayers = !0, this.layerController = new MSLayerController(this);
  }, p.assetsLoaded = function () {
    this.ready = !0, this.slider.api._startTimer(), (this.selected || this.pselected && this.slider.options.instantStartLayers) && (this.hasLayers && this.layerController.showLayers(), this.vinit && (this.bgvideo.play(), this.autoPauseBgVid || (this.bgvideo.currentTime = 0))), this.isSleeping || this.setupBG(), CTween.fadeOut(this.$loading, 300, !0), (0 === this.slider.options.preload || "all" === this.slider.options.preload) && this.index < this.view.slideList.length - 1 ? this.view.slideList[this.index + 1].loadImages() : "all" === this.slider.options.preload && this.index === this.view.slideList.length - 1 && this.slider._removeLoading();
  }, p.setBG = function (img) {
    this.hasBG = !0;
    var that = this;
    this.$imgcont = $("<div></div>").addClass("ms-slide-bgcont"), this.$element.append(this.$loading).append(this.$imgcont), this.$bg_img = $(img).css("visibility", "hidden"), this.$imgcont.append(this.$bg_img), this.bgAligner = new MSAligner(that.fillMode, that.$imgcont, that.$bg_img), this.bgAligner.widthOnly = this.slider.options.autoHeight, that.slider.options.autoHeight && (that.pselected || that.selected) && that.slider.setHeight(that.slider.options.height), void 0 !== this.$bg_img.data("src") ? (this.bg_src = this.$bg_img.data("src"), this.$bg_img.removeAttr("data-src")) : this.$bg_img.one("load", function (event) {
      that._onBGLoad(event);
    }).each($.jqLoadFix);
  }, p.setupBG = function () {
    !this.initBG && this.bgLoaded && (this.initBG = !0, this.$bg_img.css("visibility", ""), this.bgWidth = this.bgNatrualWidth || this.$bg_img.width(), this.bgHeight = this.bgNatrualHeight || this.$bg_img.height(), CTween.fadeIn(this.$imgcont, 300), this.slider.options.autoHeight && this.$imgcont.height(this.bgHeight * this.ratio), this.bgAligner.init(this.bgWidth, this.bgHeight), this.setSize(this.__width, this.__height), this.slider.options.autoHeight && (this.pselected || this.selected) && this.slider.setHeight(this.getHeight()));
  }, p.loadImages = function () {
    if (!this.ls) {
      if (this.ls = !0, this.bgvideo && this.bgvideo.load(), this.hasBG && this.bg_src) {
        var that = this;
        this.$bg_img.preloadImg(this.bg_src, function (event) {
          that._onBGLoad(event);
        });
      }

      this.hasLayers && this.layerController.loadLayers(this._onLayersLoad), this.hasBG || this.hasLayers || this.assetsLoaded();
    }
  }, p._onLayersLoad = function () {
    this.layersLoaded = !0, this.hasBG && !this.bgLoaded || this.assetsLoaded();
  }, p._onBGLoad = function (event) {
    this.bgNatrualWidth = event.width, this.bgNatrualHeight = event.height, this.bgLoaded = !0, $.browser.msie && this.$bg_img.on("dragstart", function (event) {
      event.preventDefault();
    }), this.hasLayers && !this.layerController.ready || this.assetsLoaded();
  }, p.setBGVideo = function ($video) {
    if ($video[0].play) {
      if (window._mobile && !this.slider.options.mobileBGVideo) return void $video.remove();
      this.bgvideo = $video[0];
      var that = this;
      $video.addClass("ms-slide-bgvideo"), $video.data("loop") !== !1 && this.bgvideo.addEventListener("ended", function () {
        that.bgvideo.play();
      }), $video.data("mute") !== !1 && (this.bgvideo.muted = !0), $video.data("autopause") === !0 && (this.autoPauseBgVid = !0), this.bgvideo_fillmode = $video.data("fill-mode") || "fill", "none" !== this.bgvideo_fillmode && (this.bgVideoAligner = new MSAligner(this.bgvideo_fillmode, this.$element, $video), this.bgvideo.addEventListener("loadedmetadata", function () {
        that.vinit || (that.vinit = !0, that.video_aspect = that.bgVideoAligner.baseHeight / that.bgVideoAligner.baseWidth, that.bgVideoAligner.init(that.bgvideo.videoWidth, that.bgvideo.videoHeight), that._alignBGVideo(), CTween.fadeIn($(that.bgvideo), 200), that.selected && that.bgvideo.play());
      })), $video.css("opacity", 0), this.$bgvideocont = $("<div></div>").addClass("ms-slide-bgvideocont").append($video), this.hasBG ? this.$imgcont.before(this.$bgvideocont) : this.$bgvideocont.appendTo(this.$element);
    }
  }, p._alignBGVideo = function () {
    this.bgvideo_fillmode && "none" !== this.bgvideo_fillmode && this.bgVideoAligner.align();
  }, p.setSize = function (width, height, hard) {
    this.__width = width, this.slider.options.autoHeight && (this.bgLoaded ? (this.ratio = this.__width / this.bgWidth, height = Math.floor(this.ratio * this.bgHeight), this.$imgcont.height(height)) : (this.ratio = width / this.slider.options.width, height = this.slider.options.height * this.ratio)), this.__height = height, this.$element.width(width).height(height), this.hasBG && this.bgLoaded && this.bgAligner.align(), this._alignBGVideo(), this.hasLayers && this.layerController.setSize(width, height, hard);
  }, p.getHeight = function () {
    return this.hasBG && this.bgLoaded ? this.bgHeight * this.ratio : Math.max(this.$element[0].clientHeight, this.slider.options.height * this.ratio);
  }, p.__playVideo = function () {
    this.vplayed || this.videodis || (this.vplayed = !0, this.slider.api.paused || (this.slider.api.pause(), this.roc = !0), this.vcbtn.css("display", ""), CTween.fadeOut(this.vpbtn, 500, !1), CTween.fadeIn(this.vcbtn, 500), CTween.fadeIn(this.vframe, 500), this.vframe.css("display", "block").attr("src", this.video + "&autoplay=1"), this.view.$element.addClass("ms-def-cursor"), this.moz && this.view.$element.css("perspective", "none"), this.view.swipeControl && this.view.swipeControl.disable(), this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY)));
  }, p.__closeVideo = function () {
    if (this.vplayed) {
      this.vplayed = !1, this.roc && this.slider.api.resume();
      var that = this;
      CTween.fadeIn(this.vpbtn, 500), CTween.animate(this.vcbtn, 500, {
        opacity: 0
      }, {
        complete: function complete() {
          that.vcbtn.css("display", "none");
        }
      }), CTween.animate(this.vframe, 500, {
        opacity: 0
      }, {
        complete: function complete() {
          that.vframe.attr("src", "about:blank").css("display", "none");
        }
      }), this.moz && this.view.$element.css("perspective", ""), this.view.swipeControl && this.view.swipeControl.enable(), this.view.$element.removeClass("ms-def-cursor"), this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE));
    }
  }, p.create = function () {
    var that = this;
    this.hasLayers && this.layerController.create(), this.link && this.link.addClass("ms-slide-link").html("").click(function (e) {
      that.linkdis && e.preventDefault();
    }), this.video && (this.video.indexOf("?") === -1 && (this.video += "?"), this.vframe = $("<iframe></iframe>").addClass("ms-slide-video").css({
      width: "100%",
      height: "100%",
      display: "none"
    }).attr("src", "about:blank").attr("allowfullscreen", "true").appendTo(this.$element), this.vpbtn = $("<div></div>").addClass("ms-slide-vpbtn").click(function () {
      that.__playVideo();
    }).appendTo(this.$element), this.vcbtn = $("<div></div>").addClass("ms-slide-vcbtn").click(function () {
      that.__closeVideo();
    }).appendTo(this.$element).css("display", "none"), window._touch && this.vcbtn.removeClass("ms-slide-vcbtn").addClass("ms-slide-vcbtn-mobile").append('<div class="ms-vcbtn-txt">Close video</div>').appendTo(this.view.$element.parent())), !this.slider.options.autoHeight && this.hasBG && (this.$imgcont.css("height", "100%"), "center" !== this.fillMode && "stretch" !== this.fillMode || (this.fillMode = "fill")), this.slider.options.autoHeight && this.$element.addClass("ms-slide-auto-height"), this.sleep(!0);
  }, p.destroy = function () {
    this.hasLayers && (this.layerController.destroy(), this.layerController = null), this.$element.remove(), this.$element = null;
  }, p.prepareToSelect = function () {
    this.pselected || this.selected || (this.pselected = !0, (this.link || this.video) && (this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.view.addEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this), this.view.addEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this), this.linkdis = !1, this.swipeMoved = !1), this.loadImages(), this.hasLayers && this.layerController.prepareToShow(), this.ready && (this.bgvideo && this.bgvideo.play(), this.hasLayers && this.slider.options.instantStartLayers && this.layerController.showLayers()), this.moz && this.$element.css("margin-top", ""));
  }, p.select = function () {
    this.selected || (this.selected = !0, this.pselected = !1, this.$element.addClass("ms-sl-selected"), this.hasLayers && (this.slider.options.autoHeight && this.layerController.updateHeight(), this.slider.options.instantStartLayers || this.layerController.showLayers()), this.ready && this.bgvideo && this.bgvideo.play(), this.videoAutoPlay && (this.videodis = !1, this.vpbtn.trigger("click")));
  }, p.unselect = function () {
    this.pselected = !1, this.moz && this.$element.css("margin-top", "0.1px"), (this.link || this.video) && (this.view.removeEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.view.removeEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this), this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this)), this.bgvideo && (this.bgvideo.pause(), !this.autoPauseBgVid && this.vinit && (this.bgvideo.currentTime = 0)), this.hasLayers && this.layerController.hideLayers(), this.selected && (this.selected = !1, this.$element.removeClass("ms-sl-selected"), this.video && this.vplayed && (this.__closeVideo(), this.roc = !1));
  }, p.sleep = function (force) {
    this.isSleeping && !force || (this.isSleeping = !0, this.autoAppend && this.$element.detach(), this.hasLayers && this.layerController.onSlideSleep());
  }, p.wakeup = function () {
    this.isSleeping && (this.isSleeping = !1, this.autoAppend && this.view.$slideCont.append(this.$element), this.moz && this.$element.css("margin-top", "0.1px"), this.setupBG(), this.hasBG && this.bgAligner.align(), this.hasLayers && this.layerController.onSlideWakeup());
  };
}(window, document, jQuery), function ($) {
  "use strict";

  var SliderViewList = {};
  window.MSSlideController = function (slider) {
    this._delayProgress = 0, this._timer = new averta.Timer(100), this._timer.onTimer = this.onTimer, this._timer.refrence = this, this.currentSlide = null, this.slider = slider, this.so = slider.options, averta.EventDispatcher.call(this);
  }, MSSlideController.registerView = function (name, _class) {
    if (name in SliderViewList) throw new Error(name + ", is already registered.");
    SliderViewList[name] = _class;
  }, MSSlideController.SliderControlList = {}, MSSlideController.registerControl = function (name, _class) {
    if (name in MSSlideController.SliderControlList) throw new Error(name + ", is already registered.");
    MSSlideController.SliderControlList[name] = _class;
  };
  var p = MSSlideController.prototype;
  p.setupView = function () {
    var that = this;

    this.resize_listener = function () {
      that.__resize();
    };

    var viewOptions = {
      spacing: this.so.space,
      mouseSwipe: this.so.mouse,
      loop: this.so.loop,
      autoHeight: this.so.autoHeight,
      swipe: this.so.swipe,
      speed: this.so.speed,
      dir: this.so.dir,
      viewNum: this.so.inView,
      critMargin: this.so.critMargin
    };
    this.so.viewOptions && $.extend(viewOptions, this.so.viewOptions), this.so.autoHeight && (this.so.heightLimit = !1);
    var viewClass = SliderViewList[this.slider.options.view] || MSBasicView;

    if (!viewClass._3dreq || window._css3d && !$.browser.msie || (viewClass = viewClass._fallback || MSBasicView), this.view = new viewClass(viewOptions), this.so.overPause) {
      var that = this;
      this.slider.$element.mouseenter(function () {
        that.is_over = !0, that._stopTimer();
      }).mouseleave(function () {
        that.is_over = !1, that._startTimer();
      });
    }
  }, p.onChangeStart = function () {
    this.change_started = !0, this.currentSlide && this.currentSlide.unselect(), this.currentSlide = this.view.currentSlide, "undefined" != typeof this.currentSlide && (this.currentSlide.prepareToSelect(), this.so.endPause && this.currentSlide.index === this.slider.slides.length - 1 && (this.pause(), this.skipTimer()), this.so.autoHeight && this.slider.setHeight(this.currentSlide.getHeight()), this.so.deepLink && this.__updateWindowHash(), this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START)));
  }, p.onChangeEnd = function () {
    if (this.change_started = !1, "undefined" != typeof this.currentSlide) {
      if (this._startTimer(), this.currentSlide.select(), this.so.preload > 1) {
        var loc,
            i,
            slide,
            l = this.so.preload - 1;

        for (i = 1; i <= l; ++i) {
          if (loc = this.view.index + i, loc >= this.view.slideList.length) {
            if (!this.so.loop) {
              i = l;
              continue;
            }

            loc -= this.view.slideList.length;
          }

          slide = this.view.slideList[loc], slide && slide.loadImages();
        }

        for (l > this.view.slideList.length / 2 && (l = Math.floor(this.view.slideList.length / 2)), i = 1; i <= l; ++i) {
          if (loc = this.view.index - i, loc < 0) {
            if (!this.so.loop) {
              i = l;
              continue;
            }

            loc = this.view.slideList.length + loc;
          }

          slide = this.view.slideList[loc], slide && slide.loadImages();
        }
      }

      this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END));
    }
  }, p.onSwipeStart = function () {
    this.skipTimer();
  }, p.skipTimer = function () {
    this._timer.reset(), this._delayProgress = 0, this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
  }, p.onTimer = function (time) {
    if (this._timer.getTime() >= 1e3 * this.view.currentSlide.delay && (this.skipTimer(), this.view.next(), this.hideCalled = !1), this._delayProgress = this._timer.getTime() / (10 * this.view.currentSlide.delay), this.so.hideLayers && !this.hideCalled && 1e3 * this.view.currentSlide.delay - this._timer.getTime() <= 300) {
      var currentSlide = this.view.currentSlide;
      currentSlide.hasLayers && currentSlide.layerController.animHideLayers(), this.hideCalled = !0;
    }

    this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
  }, p._stopTimer = function () {
    this._timer && this._timer.stop();
  }, p._startTimer = function () {
    this.paused || this.is_over || !this.currentSlide || !this.currentSlide.ready || this.change_started || this._timer.start();
  }, p.__appendSlides = function () {
    var slide,
        loc,
        i = 0,
        l = this.view.slideList.length - 1;

    for (i; i < l; ++i) {
      slide = this.view.slideList[i], slide.detached || (slide.$element.detach(), slide.detached = !0);
    }

    for (this.view.appendSlide(this.view.slideList[this.view.index]), l = 3, i = 1; i <= l; ++i) {
      if (loc = this.view.index + i, loc >= this.view.slideList.length) {
        if (!this.so.loop) {
          i = l;
          continue;
        }

        loc -= this.view.slideList.length;
      }

      slide = this.view.slideList[loc], slide.detached = !1, this.view.appendSlide(slide);
    }

    for (l > this.view.slideList.length / 2 && (l = Math.floor(this.view.slideList.length / 2)), i = 1; i <= l; ++i) {
      if (loc = this.view.index - i, loc < 0) {
        if (!this.so.loop) {
          i = l;
          continue;
        }

        loc = this.view.slideList.length + loc;
      }

      slide = this.view.slideList[loc], slide.detached = !1, this.view.appendSlide(slide);
    }
  }, p.__resize = function (hard) {
    this.created && (this.width = this.slider.$element[0].clientWidth || this.so.width, this.so.fullwidth || (this.width = Math.min(this.width, this.so.width)), this.so.fullheight ? (this.so.heightLimit = !1, this.so.autoHeight = !1, this.height = this.slider.$element[0].clientHeight) : this.height = this.width / this.slider.aspect, this.so.autoHeight ? (this.currentSlide.setSize(this.width, null, hard), this.view.setSize(this.width, this.currentSlide.getHeight(), hard)) : this.view.setSize(this.width, Math.max(this.so.minHeight, this.so.heightLimit ? Math.min(this.height, this.so.height) : this.height), hard), this.slider.$controlsCont && this.so.centerControls && this.so.fullwidth && this.view.$element.css("left", Math.min(0, -(this.slider.$element[0].clientWidth - this.so.width) / 2) + "px"), this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE)));
  }, p.__dispatchInit = function () {
    this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT));
  }, p.__updateWindowHash = function () {
    var hash = window.location.hash,
        dl = this.so.deepLink,
        dlt = this.so.deepLinkType,
        eq = "path" === dlt ? "/" : "=",
        sep = "path" === dlt ? "/" : "&",
        sliderHash = dl + eq + (this.view.index + 1),
        regTest = new RegExp(dl + eq + "[0-9]+", "g");
    "" === hash ? window.location.hash = sep + sliderHash : regTest.test(hash) ? window.location.hash = hash.replace(regTest, sliderHash) : window.location.hash = hash + sep + sliderHash;
  }, p.__curentSlideInHash = function () {
    var hash = window.location.hash,
        dl = this.so.deepLink,
        dlt = this.so.deepLinkType,
        eq = "path" === dlt ? "/" : "=",
        regTest = new RegExp(dl + eq + "[0-9]+", "g");

    if (regTest.test(hash)) {
      var index = Number(hash.match(regTest)[0].match(/[0-9]+/g).pop());
      if (!isNaN(index)) return index - 1;
    }

    return -1;
  }, p.__onHashChanged = function () {
    var index = this.__curentSlideInHash();

    index !== -1 && this.gotoSlide(index);
  }, p.__findLayerById = function (layerId) {
    if (!this.currentSlide) return null;
    var layer;
    return this.currentSlide.layerController && (layer = this.currentSlide.layerController.getLayerById(layerId)), !layer && this.slider.overlayLayers ? this.slider.overlayLayers.layerController.getLayerById(layerId) : layer;
  }, p.setup = function () {
    this.created = !0, this.paused = !this.so.autoplay, this.view.addEventListener(MSViewEvents.CHANGE_START, this.onChangeStart, this), this.view.addEventListener(MSViewEvents.CHANGE_END, this.onChangeEnd, this), this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.currentSlide = this.view.slideList[this.so.start - 1], this.__resize();

    var slideInHash = this.__curentSlideInHash(),
        startSlide = slideInHash !== -1 ? slideInHash : this.so.start - 1;

    if (this.view.create(startSlide), 0 === this.so.preload && this.view.slideList[0].loadImages(), this.scroller = this.view.controller, this.so.wheel) {
      var that = this,
          last_time = new Date().getTime();
      this.wheellistener = function (event) {
        var e = window.event || event.orginalEvent || event;
        e.preventDefault();
        var current_time = new Date().getTime();

        if (!(current_time - last_time < 400)) {
          last_time = current_time;
          var delta = Math.abs(e.detail || e.wheelDelta);
          $.browser.mozilla && (delta *= 100);
          var scrollThreshold = 15;
          return e.detail < 0 || e.wheelDelta > 0 ? delta >= scrollThreshold && that.previous(!0) : delta >= scrollThreshold && that.next(!0), !1;
        }
      }, $.browser.mozilla ? this.slider.$element[0].addEventListener("DOMMouseScroll", this.wheellistener) : this.slider.$element.bind("mousewheel", this.wheellistener);
    }

    0 === this.slider.$element[0].clientWidth && (this.slider.init_safemode = !0), this.__resize();
    var that = this;
    this.so.deepLink && $(window).on("hashchange", function () {
      that.__onHashChanged();
    });
  }, p.index = function () {
    return this.view.index;
  }, p.count = function () {
    return this.view.slidesCount;
  }, p.next = function (checkLoop) {
    this.skipTimer(), this.view.next(checkLoop);
  }, p.previous = function (checkLoop) {
    this.skipTimer(), this.view.previous(checkLoop);
  }, p.gotoSlide = function (index) {
    index = Math.min(index, this.count() - 1), this.skipTimer(), this.view.gotoSlide(index);
  }, p.destroy = function (reset) {
    this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY)), this.slider.destroy(reset);
  }, p._destroy = function () {
    this._timer.reset(), this._timer = null, $(window).unbind("resize", this.resize_listener), this.view.destroy(), this.view = null, this.so.wheel && ($.browser.mozilla ? this.slider.$element[0].removeEventListener("DOMMouseScroll", this.wheellistener) : this.slider.$element.unbind("mousewheel", this.wheellistener), this.wheellistener = null), this.so = null;
  }, p.runAction = function (action) {
    var actionParams = [];

    if (action.indexOf("(") !== -1) {
      var temp = action.slice(0, action.indexOf("("));
      actionParams = action.slice(action.indexOf("(") + 1, -1).replace(/\"|\'|\s/g, "").split(","), action = temp;
    }

    action in this ? this[action].apply(this, actionParams) : console;
  }, p.update = function (hard) {
    this.slider.init_safemode && hard && (this.slider.init_safemode = !1), this.__resize(hard), hard && this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE));
  }, p.locate = function () {
    this.__resize();
  }, p.resume = function () {
    this.paused && (this.paused = !1, this._startTimer());
  }, p.pause = function () {
    this.paused || (this.paused = !0, this._stopTimer());
  }, p.currentTime = function () {
    return this._delayProgress;
  }, p.showLayer = function (layerId, delay) {
    var layer = this.__findLayerById(layerId);

    layer && (delay ? (clearTimeout(layer.actionTimeout), layer.actionTimeout = setTimeout(this.showLayer, delay, layerId, 0)) : layer.start());
  }, p.hideLayer = function (layerId, delay) {
    var layer = this.__findLayerById(layerId);

    layer && (delay ? (clearTimeout(layer.actionTimeout), layer.actionTimeout = setTimeout(this.hideLayer, delay, layerId, 0)) : layer.hide());
  }, p.toggleLayer = function (layerId, delay) {
    var layer = this.__findLayerById(layerId);

    layer && (delay ? (clearTimeout(layer.actionTimeout), layer.actionTimeout = setTimeout(this.toggleLayer, delay, layerId, 0)) : layer.isShowing ? layer.hide() : layer.start());
  }, p.showLayers = function (layerIds, delay) {
    var self = this;
    $.each(layerIds.replace(/\s+/g, "").split("|"), function (index, layerId) {
      self.showLayer(layerId, delay);
    });
  }, p.hideLayers = function (layerIds, delay) {
    var self = this;
    $.each(layerIds.replace(/\s+/g, "").split("|"), function (index, layerId) {
      self.hideLayer(layerId, delay);
    });
  }, p.toggleLayers = function (layerIds, delay) {
    var self = this;
    $.each(layerIds.replace(/\s+/g, "").split("|"), function (index, layerId) {
      self.toggleLayer(layerId, delay);
    });
  }, averta.EventDispatcher.extend(p);
}(jQuery), function ($) {
  "use strict";

  var LayerTypes = {
    image: MSImageLayerElement,
    text: MSLayerElement,
    video: MSVideoLayerElement,
    hotspot: MSHotspotLayer,
    button: MSButtonLayer
  };
  window.MasterSlider = function () {
    this.options = {
      forceInit: !0,
      autoplay: !1,
      loop: !1,
      mouse: !0,
      swipe: !0,
      grabCursor: !0,
      space: 0,
      fillMode: "fill",
      start: 1,
      view: "basic",
      width: 300,
      height: 150,
      inView: 15,
      critMargin: 1,
      mobileBGVideo: !1,
      heightLimit: !0,
      smoothHeight: !0,
      autoHeight: !1,
      minHeight: -1,
      fullwidth: !1,
      fullheight: !1,
      autofill: !1,
      layersMode: "center",
      hideLayers: !1,
      endPause: !1,
      centerControls: !0,
      overPause: !0,
      shuffle: !1,
      speed: 17,
      dir: "h",
      preload: 0,
      wheel: !1,
      layout: "boxed",
      autofillTarget: null,
      fullscreenMargin: 0,
      instantStartLayers: !1,
      parallaxMode: "mouse",
      rtl: !1,
      deepLink: null,
      deepLinkType: "path",
      disablePlugins: []
    }, this.slides = [], this.activePlugins = [], this.$element = null, this.lastMargin = 0, this.leftSpace = 0, this.topSpace = 0, this.rightSpace = 0, this.bottomSpace = 0, this._holdOn = 0;
    var that = this;
    this.resize_listener = function () {
      that._resize();
    }, $(window).bind("resize", this.resize_listener);
  }, MasterSlider.author = "Averta Ltd. (www.averta.net)", MasterSlider.version = "2.51.0", MasterSlider.releaseDate = "Jan 2017", MasterSlider._plugins = [];
  var MS = MasterSlider;

  MS.registerPlugin = function (plugin) {
    MS._plugins.indexOf(plugin) === -1 && MS._plugins.push(plugin);
  };

  var p = MasterSlider.prototype;
  p.__setupSlides = function () {
    var new_slide,
        that = this,
        ind = 0;
    this.$element.children(".ms-slide").each(function (index) {
      var $slide_ele = $(this);
      new_slide = new MSSlide(), new_slide.$element = $slide_ele, new_slide.slider = that, new_slide.delay = void 0 !== $slide_ele.data("delay") ? $slide_ele.data("delay") : 3, new_slide.fillMode = void 0 !== $slide_ele.data("fill-mode") ? $slide_ele.data("fill-mode") : that.options.fillMode, new_slide.index = ind++, new_slide.id = $slide_ele.data("id");
      var slide_img = $slide_ele.children("img:not(.ms-layer)");
      slide_img.length > 0 && new_slide.setBG(slide_img[0]);
      var slide_video = $slide_ele.children("video");
      if (slide_video.length > 0 && new_slide.setBGVideo(slide_video), that.controls) for (var i = 0, l = that.controls.length; i < l; ++i) {
        that.controls[i].slideAction(new_slide);
      }
      $slide_ele.children("a").each(function (index) {
        var $this = $(this);
        "video" === this.getAttribute("data-type") ? (new_slide.video = this.getAttribute("href"), new_slide.videoAutoPlay = $this.data("autoplay"), $this.remove()) : $this.hasClass("ms-layer") || (new_slide.link = $(this));
      });
      that.__createSlideLayers(new_slide, $slide_ele.find(".ms-layer")), that.slides.push(new_slide), that.slideController.view.addSlide(new_slide);
    });
  }, p._setupOverlayLayers = function () {
    var self = this,
        $ollayers = this.$element.children(".ms-overlay-layers").eq(0);

    if ($ollayers.length) {
      var overlayLayers = new MSOverlayLayers(this);
      overlayLayers.$element = $ollayers, self.__createSlideLayers(overlayLayers, $ollayers.find(".ms-layer")), this.view.$element.prepend($ollayers), this.overlayLayers = overlayLayers, overlayLayers.create();
    }
  }, p.__createSlideLayers = function (slide, layers) {
    0 != layers.length && (slide.setupLayerController(), layers.each(function (index, domEle) {
      var $parent_ele,
          $layer_element = $(this);
      "A" === domEle.nodeName && "image" === $layer_element.find(">img").data("type") && ($parent_ele = $(this), $layer_element = $parent_ele.find("img"));
      var layer = new LayerTypes[$layer_element.data("type") || "text"]();
      layer.$element = $layer_element, layer.link = $parent_ele, layer.id = layer.$element.data("id"), layer.waitForAction = layer.$element.data("wait"), layer.masked = layer.$element.data("masked"), layer.maskWidth = layer.$element.data("mask-width"), layer.maskHeight = layer.$element.data("mask-height");
      var eff_parameters = {},
          end_eff_parameters = {};
      void 0 !== $layer_element.data("effect") && (eff_parameters.name = $layer_element.data("effect")), void 0 !== $layer_element.data("ease") && (eff_parameters.ease = $layer_element.data("ease")), void 0 !== $layer_element.data("duration") && (eff_parameters.duration = $layer_element.data("duration")), void 0 !== $layer_element.data("delay") && (eff_parameters.delay = $layer_element.data("delay")), $layer_element.data("hide-effect") && (end_eff_parameters.name = $layer_element.data("hide-effect")), $layer_element.data("hide-ease") && (end_eff_parameters.ease = $layer_element.data("hide-ease")), void 0 !== $layer_element.data("hide-duration") && (end_eff_parameters.duration = $layer_element.data("hide-duration")), void 0 !== $layer_element.data("hide-time") && (end_eff_parameters.time = $layer_element.data("hide-time")), layer.setStartAnim(eff_parameters), layer.setEndAnim(end_eff_parameters), slide.layerController.addLayer(layer);
    }));
  }, p._removeLoading = function () {
    $(window).unbind("resize", this.resize_listener), this.$element.removeClass("before-init").css("visibility", "visible").css("height", "").css("opacity", 0), CTween.fadeIn(this.$element), this.$loading.remove(), this.slideController && this.slideController.__resize();
  }, p._resize = function (e) {
    if (this.$loading) {
      var h = this.$loading[0].clientWidth / this.aspect;
      h = this.options.heightLimit ? Math.min(h, this.options.height) : h, this.$loading.height(h), this.$element.height(h);
    }
  }, p._shuffleSlides = function () {
    for (var r, slides = this.$element.children(".ms-slide"), i = 0, l = slides.length; i < l; ++i) {
      r = Math.floor(Math.random() * (l - 1)), i != r && (this.$element[0].insertBefore(slides[i], slides[r]), slides = this.$element.children(".ms-slide"));
    }
  }, p._setupSliderLayout = function () {
    this._updateSideMargins(), this.lastMargin = this.leftSpace;
    var lo = this.options.layout;
    "boxed" !== lo && "partialview" !== lo && (this.options.fullwidth = !0), "fullscreen" !== lo && "autofill" !== lo || (this.options.fullheight = !0, "autofill" === lo && (this.$autofillTarget = $(this.options.autofillTarget), 0 === this.$autofillTarget.length && (this.$autofillTarget = this.$element.parent()))), "partialview" === lo && this.$element.addClass("ms-layout-partialview"), "fullscreen" !== lo && "fullwidth" !== lo && "autofill" !== lo || ($(window).bind("resize", {
      that: this
    }, this._updateLayout), this._updateLayout()), $(window).bind("resize", this.slideController.resize_listener);
  }, p._updateLayout = function (event) {
    var that = event ? event.data.that : this,
        lo = that.options.layout,
        $element = that.$element,
        $win = $(window);
    if ("fullscreen" === lo) document.body.style.overflow = "hidden", $element.height($win.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace), document.body.style.overflow = "";else if ("autofill" === lo) return void $element.height(that.$autofillTarget.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace).width(that.$autofillTarget.width() - that.leftSpace - that.rightSpace);
    $element.width($win.width() - that.leftSpace - that.rightSpace);
    var margin = -$element.offset().left + that.leftSpace + that.lastMargin;
    $element.css("margin-left", margin), that.lastMargin = margin;
  }, p._init = function () {
    if (!(this._holdOn > 0) && this._docReady) {
      if (this.initialized = !0, "all" !== this.options.preload && this._removeLoading(), this.options.shuffle && this._shuffleSlides(), MSLayerEffects.setup(), this.slideController.setupView(), this.view = this.slideController.view, this.$controlsCont = $("<div></div>").addClass("ms-inner-controls-cont"), this.options.centerControls && this.$controlsCont.css("max-width", this.options.width + "px"), this.$controlsCont.prepend(this.view.$element), this.$msContainer = $("<div></div>").addClass("ms-container").prependTo(this.$element).append(this.$controlsCont), this.controls) for (var i = 0, l = this.controls.length; i < l; ++i) {
        this.controls[i].setup();
      }
      if (this._setupSliderLayout(), this.__setupSlides(), this.slideController.setup(), this._setupOverlayLayers(), this.controls) for (i = 0, l = this.controls.length; i < l; ++i) {
        this.controls[i].create();
      }

      if (this.options.autoHeight && this.slideController.view.$element.height(this.slideController.currentSlide.getHeight()), this.options.swipe && !window._touch && this.options.grabCursor && this.options.mouse) {
        var $view = this.view.$element;
        $view.mousedown(function () {
          $view.removeClass("ms-grab-cursor"), $view.addClass("ms-grabbing-cursor"), $.browser.msie && window.ms_grabbing_curosr && ($view[0].style.cursor = "url(" + window.ms_grabbing_curosr + "), move");
        }).addClass("ms-grab-cursor"), $(document).mouseup(function () {
          $view.removeClass("ms-grabbing-cursor"), $view.addClass("ms-grab-cursor"), $.browser.msie && window.ms_grab_curosr && ($view[0].style.cursor = "url(" + window.ms_grab_curosr + "), move");
        });
      }

      this.slideController.__dispatchInit();
    }
  }, p.setHeight = function (value) {
    this.options.smoothHeight ? (this.htween && (this.htween.reset ? this.htween.reset() : this.htween.stop(!0)), this.htween = CTween.animate(this.slideController.view.$element, 500, {
      height: value
    }, {
      ease: "easeOutQuart"
    })) : this.slideController.view.$element.height(value);
  }, p.reserveSpace = function (side, space) {
    var sideSpace = side + "Space",
        pos = this[sideSpace];
    return this[sideSpace] += space, this._updateSideMargins(), pos;
  }, p._updateSideMargins = function () {
    this.$element.css("margin", this.topSpace + "px " + this.rightSpace + "px " + this.bottomSpace + "px " + this.leftSpace + "px");
  }, p._realignControls = function () {
    this.rightSpace = this.leftSpace = this.topSpace = this.bottomSpace = 0, this._updateSideMargins(), this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE));
  }, p.control = function (control, options) {
    if (control in MSSlideController.SliderControlList) {
      this.controls || (this.controls = []);
      var ins = new MSSlideController.SliderControlList[control](options);
      return ins.slider = this, this.controls.push(ins), this;
    }
  }, p.holdOn = function () {
    this._holdOn++;
  }, p.release = function () {
    this._holdOn--, this._init();
  }, p.setup = function (target, options) {
    if ("string" == typeof target ? this.$element = $("#" + target) : this.$element = target.eq(0), this.setupMarkup = this.$element.html(), 0 !== this.$element.length) {
      this.$element.addClass("master-slider").addClass("before-init"), $.browser.msie ? this.$element.addClass("ms-ie").addClass("ms-ie" + $.browser.version.slice(0, $.browser.version.indexOf("."))) : $.browser.webkit ? this.$element.addClass("ms-wk") : $.browser.mozilla && this.$element.addClass("ms-moz");
      var ua = navigator.userAgent.toLowerCase(),
          isAndroid = ua.indexOf("android") > -1;
      isAndroid && this.$element.addClass("ms-android");
      var that = this;
      $.extend(this.options, options), this.aspect = this.options.width / this.options.height, this.$loading = $("<div></div>").addClass("ms-loading-container").insertBefore(this.$element).append($("<div></div>").addClass("ms-loading")), this.$loading.parent().css("position", "relative"), this.options.autofill && (this.options.fullwidth = !0, this.options.fullheight = !0), this.options.fullheight && this.$element.addClass("ms-fullheight"), this._resize(), this.slideController = new MSSlideController(this), this.api = this.slideController;

      for (var i = 0, l = MS._plugins.length; i !== l; i++) {
        var plugin = MS._plugins[i];
        this.options.disablePlugins.indexOf(plugin.name) === -1 && this.activePlugins.push(new plugin(this));
      }

      return this.options.forceInit && MasterSlider.addJQReadyErrorCheck(this), $(document).ready(function () {
        that.initialized || (that._docReady = !0, that._init());
      }), this;
    }
  }, p.destroy = function (insertMarkup) {
    for (var i = 0, l = this.activePlugins.length; i !== l; i++) {
      this.activePlugins[i].destroy();
    }

    if (this.controls) for (i = 0, l = this.controls.length; i !== l; i++) {
      this.controls[i].destroy();
    }
    this.slideController && this.slideController._destroy(), this.$loading && this.$loading.remove(), insertMarkup ? this.$element.html(this.setupMarkup).css("visibility", "hidden") : this.$element.remove();
    var lo = this.options.layout;
    "fullscreen" !== lo && "fullwidth" !== lo || $(window).unbind("resize", this._updateLayout), this.view = null, this.slides = null, this.options = null, this.slideController = null, this.api = null, this.resize_listener = null, this.activePlugins = null;
  };
}(jQuery), function ($, window, document, undefined) {
  function MasterSliderPlugin(element, options) {
    this.element = element, this.$element = $(element), this.settings = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init();
  }

  var pluginName = "masterslider",
      defaults = {
    controls: {}
  };
  $.extend(MasterSliderPlugin.prototype, {
    init: function init() {
      var self = this;
      this._slider = new MasterSlider();

      for (var control in this.settings.controls) {
        this._slider.control(control, this.settings.controls[control]);
      }

      this._slider.setup(this.$element, this.settings);

      var _superDispatch = this._slider.api.dispatchEvent;

      this._slider.api.dispatchEvent = function (event) {
        self.$element.trigger(event.type), _superDispatch.call(this, event);
      };
    },
    api: function api() {
      return this._slider.api;
    },
    slider: function slider() {
      return this._slider;
    }
  }), $.fn[pluginName] = function (options) {
    var args = arguments,
        plugin = "plugin_" + pluginName;
    if (options === undefined || "object" == _typeof(options)) return this.each(function () {
      $.data(this, plugin) || $.data(this, plugin, new MasterSliderPlugin(this, options));
    });

    if ("string" == typeof options && "_" !== options[0] && "init" !== options) {
      var returns;
      return this.each(function () {
        var instance = $.data(this, plugin);
        instance instanceof MasterSliderPlugin && "function" == typeof instance[options] && (returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1))), instance instanceof MasterSliderPlugin && "function" == typeof instance._slider.api[options] && (returns = instance._slider.api[options].apply(instance._slider.api, Array.prototype.slice.call(args, 1))), "destroy" === options && $.data(this, plugin, null);
      }), returns !== undefined ? returns : this;
    }
  };
}(jQuery, window, document), function ($, window, document, undefined) {
  "use strict";

  var sliderInstances = [];

  MasterSlider.addJQReadyErrorCheck = function (slider) {
    sliderInstances.push(slider);
  };

  var _ready = $.fn.ready,
      _onerror = window.onerror;

  $.fn.ready = function () {
    return window.onerror = function () {
      if (0 !== sliderInstances.length) for (var i = 0, l = sliderInstances.length; i !== l; i++) {
        var slider = sliderInstances[i];
        slider.initialized || (slider._docReady = !0, slider._init());
      }
      return !!_onerror && _onerror.apply(this, arguments);
    }, _ready.apply(this, arguments);
  };
}(jQuery, window, document), window.MSViewEvents = function (type, data) {
  this.type = type, this.data = data;
}, MSViewEvents.SWIPE_START = "swipeStart", MSViewEvents.SWIPE_END = "swipeEnd", MSViewEvents.SWIPE_MOVE = "swipeMove", MSViewEvents.SWIPE_CANCEL = "swipeCancel", MSViewEvents.SCROLL = "scroll", MSViewEvents.CHANGE_START = "slideChangeStart", MSViewEvents.CHANGE_END = "slideChangeEnd", function ($) {
  "use strict";

  window.MSBasicView = function (options) {
    this.options = {
      loop: !1,
      dir: "h",
      autoHeight: !1,
      spacing: 5,
      mouseSwipe: !0,
      swipe: !0,
      speed: 17,
      minSlideSpeed: 2,
      viewNum: 20,
      critMargin: 1
    }, $.extend(this.options, options), this.dir = this.options.dir, this.loop = this.options.loop, this.spacing = this.options.spacing, this.__width = 0, this.__height = 0, this.__cssProb = "h" === this.dir ? "left" : "top", this.__offset = "h" === this.dir ? "offsetLeft" : "offsetTop", this.__dimension = "h" === this.dir ? "__width" : "__height", this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.$slideCont = $("<div></div>").addClass("ms-slide-container"), this.$element = $("<div></div>").addClass("ms-view").addClass("ms-basic-view").append(this.$slideCont), this.currentSlide = null, this.index = -1, this.slidesCount = 0, this.slides = [], this.slideList = [], this.viewSlidesList = [], this.css3 = window._cssanim, this.start_buffer = 0, this.firstslide_snap = 0, this.slideChanged = !1, this.controller = new Controller(0, 0, {
      snapping: !0,
      snapsize: 100,
      paging: !0,
      snappingMinSpeed: this.options.minSlideSpeed,
      friction: (100 - .5 * this.options.speed) / 100,
      endless: this.loop
    }), this.controller.renderCallback("h" === this.dir ? this._horizUpdate : this._vertiUpdate, this), this.controller.snappingCallback(this.__snapUpdate, this), this.controller.snapCompleteCallback(this.__snapCompelet, this), averta.EventDispatcher.call(this);
  };

  var p = MSBasicView.prototype;
  p.__snapCompelet = function (snap, type) {
    this.slideChanged && (this.slideChanged = !1, this.__locateSlides(), this.start_buffer = 0, this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)));
  }, p.__snapUpdate = function (controller, snap, change) {
    if (this.loop) {
      var target_index = this.index + change;
      this.updateLoop(target_index), target_index >= this.slidesCount && (target_index -= this.slidesCount), target_index < 0 && (target_index = this.slidesCount + target_index), this.index = target_index;
    } else {
      if (snap < 0 || snap >= this.slidesCount) return;
      this.index = snap;
    }

    this._checkCritMargins(), $.browser.mozilla && (this.slideList[this.index].$element[0].style.marginTop = "0.1px", this.currentSlide && (this.currentSlide.$element[0].style.marginTop = ""));
    var new_slide = this.slideList[this.index];
    new_slide !== this.currentSlide && (this.currentSlide = new_slide, this.autoUpdateZIndex && this.__updateSlidesZindex(), this.slideChanged = !0, this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)));
  }, p._checkCritMargins = function () {
    if (!this.normalMode) {
      var hlf = Math.floor(this.options.viewNum / 2),
          inView = this.viewSlidesList.indexOf(this.slideList[this.index]),
          size = this[this.__dimension] + this.spacing,
          cm = this.options.critMargin;
      return this.loop ? void ((inView <= cm || inView >= this.viewSlidesList.length - cm) && (size *= inView - hlf, this.__locateSlides(!1, size + this.start_buffer), this.start_buffer += size)) : void ((inView < cm && this.index >= cm || inView >= this.viewSlidesList.length - cm && this.index < this.slidesCount - cm) && this.__locateSlides(!1));
    }
  }, p._vertiUpdate = function (controller, value) {
    return this.__contPos = value, this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)), this.css3 ? void (this.$slideCont[0].style[window._jcsspfx + "Transform"] = "translateY(" + -value + "px)" + this.__translate_end) : void (this.$slideCont[0].style.top = -value + "px");
  }, p._horizUpdate = function (controller, value) {
    return this.__contPos = value, this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)), this.css3 ? void (this.$slideCont[0].style[window._jcsspfx + "Transform"] = "translateX(" + -value + "px)" + this.__translate_end) : void (this.$slideCont[0].style.left = -value + "px");
  }, p.__updateViewList = function () {
    if (this.normalMode) return void (this.viewSlidesList = this.slides);
    var temp = this.viewSlidesList.slice();
    this.viewSlidesList = [];
    var l,
        i = 0,
        hlf = Math.floor(this.options.viewNum / 2);
    if (this.loop) for (; i !== this.options.viewNum; i++) {
      this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
    } else {
      for (i = 0; i !== hlf && this.index - i !== -1; i++) {
        this.viewSlidesList.unshift(this.slideList[this.index - i]);
      }

      for (i = 1; i !== hlf && this.index + i !== this.slidesCount; i++) {
        this.viewSlidesList.push(this.slideList[this.index + i]);
      }
    }

    for (i = 0, l = temp.length; i !== l; i++) {
      this.viewSlidesList.indexOf(temp[i]) === -1 && temp[i].sleep();
    }

    temp = null, this.currentSlide && this.__updateSlidesZindex();
  }, p.__locateSlides = function (move, start) {
    this.index !== parseInt(this.index, 10) && (this.index = 0), this.__updateViewList(), start = this.loop ? start || 0 : this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing);

    for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
      var pos = start + i * (this[this.__dimension] + this.spacing);
      slide = this.viewSlidesList[i], slide.wakeup(), slide.position = pos, slide.$element[0].style[this.__cssProb] = pos + "px";
    }

    move !== !1 && this.controller.changeTo(this.slideList[this.index].position, !1, null, null, !1);
  }, p.__createLoopList = function () {
    var return_arr = [],
        i = 0,
        count = this.slidesCount / 2,
        before_count = this.slidesCount % 2 === 0 ? count - 1 : Math.floor(count),
        after_count = this.slidesCount % 2 === 0 ? count : Math.floor(count);

    for (this.currentSlideLoc = before_count, i = 1; i <= before_count; ++i) {
      return_arr.unshift(this.slideList[this.index - i < 0 ? this.slidesCount - i + this.index : this.index - i]);
    }

    for (return_arr.push(this.slideList[this.index]), i = 1; i <= after_count; ++i) {
      return_arr.push(this.slideList[this.index + i >= this.slidesCount ? this.index + i - this.slidesCount : this.index + i]);
    }

    return return_arr;
  }, p.__getSteps = function (index, target) {
    var right = target < index ? this.slidesCount - index + target : target - index,
        left = Math.abs(this.slidesCount - right);
    return right < left ? right : -left;
  }, p.__pushEnd = function () {
    var first_slide = this.slides.shift(),
        last_slide = this.slides[this.slidesCount - 2];

    if (this.slides.push(first_slide), this.normalMode) {
      var pos = last_slide.$element[0][this.__offset] + this.spacing + this[this.__dimension];
      first_slide.$element[0].style[this.__cssProb] = pos + "px", first_slide.position = pos;
    }
  }, p.__pushStart = function () {
    var last_slide = this.slides.pop(),
        first_slide = this.slides[0];

    if (this.slides.unshift(last_slide), this.normalMode) {
      var pos = first_slide.$element[0][this.__offset] - this.spacing - this[this.__dimension];
      last_slide.$element[0].style[this.__cssProb] = pos + "px", last_slide.position = pos;
    }
  }, p.__updateSlidesZindex = function () {
    var slide,
        l = this.viewSlidesList.length;
    Math.floor(l / 2);
    if (this.loop) for (var loc = this.viewSlidesList.indexOf(this.currentSlide), i = 0; i !== l; i++) {
      slide = this.viewSlidesList[i], this.viewSlidesList[i].$element.css("z-index", i <= loc ? i + 1 : l - i);
    } else {
      for (var beforeNum = this.currentSlide.index - this.viewSlidesList[0].index, i = 0; i !== l; i++) {
        this.viewSlidesList[i].$element.css("z-index", i <= beforeNum ? i + 1 : l - i);
      }

      this.currentSlide.$element.css("z-index", l);
    }
  }, p.addSlide = function (slide) {
    slide.view = this, this.slides.push(slide), this.slideList.push(slide), this.slidesCount++;
  }, p.appendSlide = function (slide) {
    this.$slideCont.append(slide.$element);
  }, p.updateLoop = function (index) {
    if (this.loop) for (var steps = this.__getSteps(this.index, index), i = 0, l = Math.abs(steps); i < l; ++i) {
      steps < 0 ? this.__pushStart() : this.__pushEnd();
    }
  }, p.gotoSlide = function (index, fast) {
    this.updateLoop(index), this.index = index;
    var target_slide = this.slideList[index];
    this._checkCritMargins(), this.controller.changeTo(target_slide.position, !fast, null, null, !1), target_slide !== this.currentSlide && (this.slideChanged = !0, this.currentSlide = target_slide, this.autoUpdateZIndex && this.__updateSlidesZindex(), this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)), fast && this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)));
  }, p.next = function (checkLoop) {
    return checkLoop && !this.loop && this.index + 1 >= this.slidesCount ? void this.controller.bounce(10) : void this.gotoSlide(this.index + 1 >= this.slidesCount ? 0 : this.index + 1);
  }, p.previous = function (checkLoop) {
    return checkLoop && !this.loop && this.index - 1 < 0 ? void this.controller.bounce(-10) : void this.gotoSlide(this.index - 1 < 0 ? this.slidesCount - 1 : this.index - 1);
  }, p.setupSwipe = function () {
    if (1 != this.slidesCount) {
      this.swipeControl = new averta.TouchSwipe(this.$element), this.swipeControl.swipeType = "h" === this.dir ? "horizontal" : "vertical";
      var that = this;
      "h" === this.dir ? this.swipeControl.onSwipe = function (status) {
        that.horizSwipeMove(status);
      } : this.swipeControl.onSwipe = function (status) {
        that.vertSwipeMove(status);
      };
    }
  }, p.vertSwipeMove = function (status) {
    var phase = status.phase;
    if ("start" === phase) this.controller.stop(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));else if ("move" === phase && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveY) < this.cont_size / 2)) this.controller.drag(status.moveY), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));else if ("end" === phase || "cancel" === phase) {
      var speed = status.distanceY / status.duration * 50 / 3,
          speedh = Math.abs(status.distanceY / status.duration * 50 / 3);
      Math.abs(speed) > .1 && Math.abs(speed) >= speedh ? (this.controller.push(-speed), speed > this.controller.options.snappingMinSpeed && this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status))) : (this.controller.cancel(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status)));
    }
  }, p.horizSwipeMove = function (status) {
    var phase = status.phase;
    if ("start" === phase) this.controller.stop(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));else if ("move" === phase && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveX) < this.cont_size / 2)) this.controller.drag(status.moveX), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));else if ("end" === phase || "cancel" === phase) {
      var speed = status.distanceX / status.duration * 50 / 3,
          speedv = Math.abs(status.distanceY / status.duration * 50 / 3);
      Math.abs(speed) > .1 && Math.abs(speed) >= speedv ? (this.controller.push(-speed), speed > this.controller.options.snappingMinSpeed && this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status))) : (this.controller.cancel(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status)));
    }
  }, p.setSize = function (width, height, hard) {
    if (this.lastWidth !== width || height !== this.lastHeight || hard) {
      this.$element.width(width).height(height);

      for (var i = 0; i < this.slidesCount; ++i) {
        this.slides[i].setSize(width, height, hard);
      }

      this.__width = width, this.__height = height, this.__created && (this.__locateSlides(), this.cont_size = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing), this.loop || (this.controller._max_value = this.cont_size), this.controller.options.snapsize = this[this.__dimension] + this.spacing, this.controller.changeTo(this.currentSlide.position, !1, null, null, !1), this.controller.cancel(), this.lastWidth = width, this.lastHeight = height);
    }
  }, p.create = function (index) {
    this.__created = !0, this.index = Math.min(index || 0, this.slidesCount - 1), this.lastSnap = this.index, this.loop && (this.slides = this.__createLoopList()), this.normalMode = this.slidesCount <= this.options.viewNum;

    for (var i = 0; i < this.slidesCount; ++i) {
      this.slides[i].create();
    }

    this.__locateSlides(), this.controller.options.snapsize = this[this.__dimension] + this.spacing, this.loop || (this.controller._max_value = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing)), this.gotoSlide(this.index, !0), this.options.swipe && (window._touch || this.options.mouseSwipe) && this.setupSwipe();
  }, p.destroy = function () {
    if (this.__created) {
      for (var i = 0; i < this.slidesCount; ++i) {
        this.slides[i].destroy();
      }

      this.slides = null, this.slideList = null, this.$element.remove(), this.controller.destroy(), this.controller = null;
    }
  }, averta.EventDispatcher.extend(p), MSSlideController.registerView("basic", MSBasicView);
}(jQuery), function ($) {
  "use strict";

  window.MSWaveView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-wave-view"), this.$slideCont.css(window._csspfx + "transform-style", "preserve-3d"), this.autoUpdateZIndex = !0;
  }, MSWaveView.extend(MSBasicView), MSWaveView._3dreq = !0, MSWaveView._fallback = MSBasicView;
  var p = MSWaveView.prototype,
      _super = MSBasicView.prototype;
  p._horizUpdate = function (controller, value) {
    _super._horizUpdate.call(this, controller, value);

    for (var slide, distance, cont_scroll = -value, i = 0; i < this.slidesCount; ++i) {
      slide = this.slideList[i], distance = -cont_scroll - slide.position, this.__updateSlidesHoriz(slide, distance);
    }
  }, p._vertiUpdate = function (controller, value) {
    _super._vertiUpdate.call(this, controller, value);

    for (var slide, distance, cont_scroll = -value, i = 0; i < this.slidesCount; ++i) {
      slide = this.slideList[i], distance = -cont_scroll - slide.position, this.__updateSlidesVertic(slide, distance);
    }
  }, p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    slide.$element[0].style[window._csspfx + "transform"] = "translateZ(" + 3 * -value + "px) rotateY(0.01deg)";
  }, p.__updateSlidesVertic = function (slide, distance) {
    this.__updateSlidesHoriz(slide, distance);
  }, MSSlideController.registerView("wave", MSWaveView);
}(jQuery), function () {
  window.MSFadeBasicView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-fade-basic-view");
  }, MSFadeBasicView.extend(MSWaveView);
  var p = MSFadeBasicView.prototype;
  MSFadeBasicView.prototype;
  p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(.6 * distance / this.__width);
    value = 1 - Math.min(value, .6), slide.$element.css("opacity", value);
  }, p.__updateSlidesVertic = function (slide, distance) {
    this.__updateSlidesHoriz(slide, distance);
  }, MSSlideController.registerView("fadeBasic", MSFadeBasicView), MSWaveView._fallback = MSFadeBasicView;
}(), function () {
  window.MSFadeWaveView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-fade-wave-view");
  }, MSFadeWaveView.extend(MSWaveView), MSFadeWaveView._3dreq = !0, MSFadeWaveView._fallback = MSFadeBasicView;
  var p = MSFadeWaveView.prototype;
  MSWaveView.prototype;
  p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    value = Math.min(value, 100), slide.$element.css("opacity", 1 - value / 300), slide.$element[0].style[window._jcsspfx + "Transform"] = "scale(" + (1 - value / 800) + ") rotateY(0.01deg) ";
  }, p.__updateSlidesVertic = function (slide, distance) {
    this.__updateSlidesHoriz(slide, distance);
  }, MSSlideController.registerView("fadeWave", MSFadeWaveView);
}(), function ($) {
  "use strict";

  window.MSFlowView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-flow-view");
  }, MSFlowView.extend(MSWaveView), MSFlowView._3dreq = !0, MSFlowView._fallback = MSFadeBasicView;
  var p = MSFlowView.prototype;
  MSWaveView.prototype;
  p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width),
        rvalue = Math.min(.3 * value, 30) * (distance < 0 ? -1 : 1),
        zvalue = 1.2 * value;
    slide.$element[0].style[window._jcsspfx + "Transform"] = "translateZ(" + 5 * -zvalue + "px) rotateY(" + rvalue + "deg) ";
  }, p.__updateSlidesVertic = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width),
        rvalue = Math.min(.3 * value, 30) * (distance < 0 ? -1 : 1),
        zvalue = 1.2 * value;
    slide.$element[0].style[window._jcsspfx + "Transform"] = "translateZ(" + 5 * -zvalue + "px) rotateX(" + -rvalue + "deg) ";
  }, MSSlideController.registerView("flow", MSFlowView);
}(jQuery), function () {
  window.MSFadeFlowView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-fade-flow-view");
  }, MSFadeFlowView.extend(MSWaveView), MSFadeFlowView._3dreq = !0;
  var p = MSFadeFlowView.prototype;
  MSWaveView.prototype;
  p.__calculate = function (distance) {
    var value = Math.min(Math.abs(100 * distance / this.__width), 100),
        rvalue = Math.min(.5 * value, 50) * (distance < 0 ? -1 : 1);
    return {
      value: value,
      rvalue: rvalue
    };
  }, p.__updateSlidesHoriz = function (slide, distance) {
    var clc = this.__calculate(distance);

    slide.$element.css("opacity", 1 - clc.value / 300), slide.$element[0].style[window._jcsspfx + "Transform"] = "translateZ(" + -clc.value + "px) rotateY(" + clc.rvalue + "deg) ";
  }, p.__updateSlidesVertic = function (slide, distance) {
    var clc = this.__calculate(distance);

    slide.$element.css("opacity", 1 - clc.value / 300), slide.$element[0].style[window._jcsspfx + "Transform"] = "translateZ(" + -clc.value + "px) rotateX(" + -clc.rvalue + "deg) ";
  }, MSSlideController.registerView("fadeFlow", MSFadeFlowView);
}(), function ($) {
  "use strict";

  window.MSMaskView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-mask-view");
  }, MSMaskView.extend(MSBasicView);
  var p = MSMaskView.prototype,
      _super = MSBasicView.prototype;
  p.addSlide = function (slide) {
    slide.view = this, slide.$frame = $("<div></div>").addClass("ms-mask-frame").append(slide.$element), slide.$element[0].style.position = "relative", slide.autoAppend = !1, this.slides.push(slide), this.slideList.push(slide), this.slidesCount++;
  }, p.setSize = function (width, height) {
    for (var slider = this.slides[0].slider, i = 0; i < this.slidesCount; ++i) {
      this.slides[i].$frame[0].style.width = width + "px", slider.options.autoHeight || (this.slides[i].$frame[0].style.height = height + "px");
    }

    _super.setSize.call(this, width, height);
  }, p._horizUpdate = function (controller, value) {
    _super._horizUpdate.call(this, controller, value);

    var i = 0;
    if (this.css3) for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style[window._jcsspfx + "Transform"] = "translateX(" + (value - this.slideList[i].position) + "px)" + this.__translate_end;
    } else for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style.left = value - this.slideList[i].position + "px";
    }
  }, p._vertiUpdate = function (controller, value) {
    _super._vertiUpdate.call(this, controller, value);

    var i = 0;
    if (this.css3) for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style[window._jcsspfx + "Transform"] = "translateY(" + (value - this.slideList[i].position) + "px)" + this.__translate_end;
    } else for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style.top = value - this.slideList[i].position + "px";
    }
  }, p.__pushEnd = function () {
    var first_slide = this.slides.shift(),
        last_slide = this.slides[this.slidesCount - 2];

    if (this.slides.push(first_slide), this.normalMode) {
      var pos = last_slide.$frame[0][this.__offset] + this.spacing + this[this.__dimension];
      first_slide.$frame[0].style[this.__cssProb] = pos + "px", first_slide.position = pos;
    }
  }, p.__pushStart = function () {
    var last_slide = this.slides.pop(),
        first_slide = this.slides[0];

    if (this.slides.unshift(last_slide), this.normalMode) {
      var pos = first_slide.$frame[0][this.__offset] - this.spacing - this[this.__dimension];
      last_slide.$frame[0].style[this.__cssProb] = pos + "px", last_slide.position = pos;
    }
  }, p.__updateViewList = function () {
    if (this.normalMode) return void (this.viewSlidesList = this.slides);
    var temp = this.viewSlidesList.slice();
    this.viewSlidesList = [];
    var l,
        i = 0,
        hlf = Math.floor(this.options.viewNum / 2);
    if (this.loop) for (; i !== this.options.viewNum; i++) {
      this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
    } else {
      for (i = 0; i !== hlf && this.index - i !== -1; i++) {
        this.viewSlidesList.unshift(this.slideList[this.index - i]);
      }

      for (i = 1; i !== hlf && this.index + i !== this.slidesCount; i++) {
        this.viewSlidesList.push(this.slideList[this.index + i]);
      }
    }

    for (i = 0, l = temp.length; i !== l; i++) {
      this.viewSlidesList.indexOf(temp[i]) === -1 && (temp[i].sleep(), temp[i].$frame.detach());
    }

    temp = null;
  }, p.__locateSlides = function (move, start) {
    this.__updateViewList(), start = this.loop ? start || 0 : this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing);

    for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
      var pos = start + i * (this[this.__dimension] + this.spacing);
      if (slide = this.viewSlidesList[i], this.$slideCont.append(slide.$frame), slide.wakeup(!1), slide.position = pos, slide.selected && slide.bgvideo) try {
        slide.bgvideo.play();
      } catch (e) {}
      slide.$frame[0].style[this.__cssProb] = pos + "px";
    }

    move !== !1 && this.controller.changeTo(this.slideList[this.index].position, !1, null, null, !1);
  }, MSSlideController.registerView("mask", MSMaskView);
}(jQuery), function ($) {
  "use strict";

  window.MSParallaxMaskView = function (options) {
    MSMaskView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-parallax-mask-view");
  }, MSParallaxMaskView.extend(MSMaskView), MSParallaxMaskView.parallaxAmount = .5;
  var p = MSParallaxMaskView.prototype,
      _super = MSBasicView.prototype;
  p._horizUpdate = function (controller, value) {
    _super._horizUpdate.call(this, controller, value);

    var i = 0;
    if (this.css3) for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style[window._jcsspfx + "Transform"] = "translateX(" + (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + "px)" + this.__translate_end;
    } else for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style.left = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + "px";
    }
  }, p._vertiUpdate = function (controller, value) {
    _super._vertiUpdate.call(this, controller, value);

    var i = 0;
    if (this.css3) for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style[window._jcsspfx + "Transform"] = "translateY(" + (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + "px)" + this.__translate_end;
    } else for (i = 0; i < this.slidesCount; ++i) {
      this.slideList[i].$element[0].style.top = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + "px";
    }
  }, MSSlideController.registerView("parallaxMask", MSParallaxMaskView);
}(jQuery), function ($) {
  "use strict";

  window.MSFadeView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-fade-view"), this.controller.renderCallback(this.__update, this);
  }, MSFadeView.extend(MSBasicView);
  var p = MSFadeView.prototype,
      _super = MSBasicView.prototype;
  p.__update = function (controller, value) {
    for (var slide, distance, cont_scroll = -value, i = 0; i < this.slidesCount; ++i) {
      slide = this.slideList[i], distance = -cont_scroll - slide.position, this.__updateSlides(slide, distance);
    }
  }, p.__updateSlides = function (slide, distance) {
    var value = Math.abs(distance / this[this.__dimension]);
    1 - value <= 0 ? slide.$element.fadeTo(0, 0).css("visibility", "hidden") : slide.$element.fadeTo(0, 1 - value).css("visibility", "");
  }, p.__locateSlides = function (move, start) {
    this.__updateViewList(), start = this.loop ? start || 0 : this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing);

    for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
      var pos = start + i * this[this.__dimension];
      slide = this.viewSlidesList[i], slide.wakeup(), slide.position = pos;
    }

    move !== !1 && this.controller.changeTo(this.slideList[this.index].position, !1, null, null, !1);
  }, p.__pushEnd = function () {
    var first_slide = this.slides.shift(),
        last_slide = this.slides[this.slidesCount - 2];
    this.slides.push(first_slide), first_slide.position = last_slide.position + this[this.__dimension];
  }, p.__pushStart = function () {
    var last_slide = this.slides.pop(),
        first_slide = this.slides[0];
    this.slides.unshift(last_slide), last_slide.position = first_slide.position - this[this.__dimension];
  }, p.create = function (index) {
    _super.create.call(this, index), this.spacing = 0, this.controller.options.minValidDist = 10;
  }, MSSlideController.registerView("fade", MSFadeView);
}(jQuery), function ($) {
  "use strict";

  window.MSScaleView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-scale-view"), this.controller.renderCallback(this.__update, this);
  }, MSScaleView.extend(MSFadeView);
  var p = MSScaleView.prototype,
      _super = MSFadeView.prototype;
  p.__updateSlides = function (slide, distance) {
    var value = Math.abs(distance / this[this.__dimension]),
        element = slide.$element[0];
    1 - value <= 0 ? (element.style.opacity = 0, element.style.visibility = "hidden", element.style[window._jcsspfx + "Transform"] = "") : (element.style.opacity = 1 - value, element.style.visibility = "", element.style[window._jcsspfx + "Transform"] = "perspective(2000px) translateZ(" + value * (distance < 0 ? -.5 : .5) * 300 + "px)");
  }, p.create = function (index) {
    _super.create.call(this, index), this.controller.options.minValidDist = .03;
  }, MSSlideController.registerView("scale", MSScaleView);
}(jQuery), function ($) {
  "use strict";

  window.MSStackView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-stack-view"), this.controller.renderCallback(this.__update, this), this.autoUpdateZIndex = !0;
  }, MSStackView.extend(MSFadeView), MSStackView._3dreq = !0, MSStackView._fallback = MSFadeView;
  var p = MSStackView.prototype,
      _super = MSFadeView.prototype;
  p.__updateSlidesZindex = function () {
    for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
      slide = this.viewSlidesList[i], this.viewSlidesList[i].$element.css("z-index", l - i);
    }
  }, p.__updateSlides = function (slide, distance) {
    var value = Math.abs(distance / this[this.__dimension]),
        element = slide.$element[0];
    1 - value <= 0 ? (element.style.opacity = 1, element.style.visibility = "hidden", element.style[window._jcsspfx + "Transform"] = "") : (element.style.visibility = "", distance < 0 ? element.style[window._jcsspfx + "Transform"] = "perspective(2000px) translateZ(" + value * -300 + "px)" : element.style[window._jcsspfx + "Transform"] = this.__translate + "(" + -value * this[this.__dimension] + "px)");
  }, p.create = function (index) {
    _super.create.call(this, index), this.controller.options.minValidDist = .03, this.__translate = "h" === this.dir ? "translateX" : "translateY";
  }, MSSlideController.registerView("stack", MSStackView);
}(jQuery), function () {
  "use strict";

  var perspective = 2e3;
  window.MSFocusView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-focus-view"), this.options.centerSpace = this.options.centerSpace || 1;
  }, MSFocusView.extend(MSWaveView), MSFocusView._3dreq = !0, MSFocusView._fallback = MSFadeBasicView;
  var p = MSFocusView.prototype;
  MSWaveView.prototype;
  p.__calcview = function (z, w) {
    var a = w / 2 * z / (z + perspective);
    return a * (z + perspective) / perspective;
  }, p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    value = 15 * -Math.min(value, 100), slide.$element.css(window._csspfx + "transform", "translateZ(" + (value + 1) + "px) rotateY(0.01deg) translateX(" + (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace) + "px)");
  }, p.__updateSlidesVertic = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    value = 15 * -Math.min(value, 100), slide.$element.css(window._csspfx + "transform", "translateZ(" + (value + 1) + "px) rotateY(0.01deg) translateY(" + (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace) + "px)");
  }, MSSlideController.registerView("focus", MSFocusView);
}(), function () {
  window.MSPartialWaveView = function (options) {
    MSWaveView.call(this, options), this.$element.removeClass("ms-wave-view").addClass("ms-partial-wave-view");
  }, MSPartialWaveView.extend(MSWaveView), MSPartialWaveView._3dreq = !0, MSPartialWaveView._fallback = MSFadeBasicView;
  var p = MSPartialWaveView.prototype;
  MSWaveView.prototype;
  p.__updateSlidesHoriz = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    slide.hasBG && slide.$bg_img.css("opacity", (100 - Math.abs(120 * distance / this.__width / 3)) / 100), slide.$element.css(window._csspfx + "transform", "translateZ(" + 3 * -value + "px) rotateY(0.01deg) translateX(" + .75 * distance + "px)");
  }, p.__updateSlidesVertic = function (slide, distance) {
    var value = Math.abs(100 * distance / this.__width);
    slide.hasBG && slide.$bg_img.css("opacity", (100 - Math.abs(120 * distance / this.__width / 3)) / 100), slide.$element.css(window._csspfx + "transform", "translateZ(" + 3 * -value + "px) rotateY(0.01deg) translateY(" + .75 * distance + "px)");
  }, MSSlideController.registerView("partialWave", MSPartialWaveView);
}(), function ($) {
  "use strict";

  window.MSBoxView = function (options) {
    MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-box-view"), this.controller.renderCallback(this.__update, this);
  }, MSBoxView.extend(MSFadeView), MSBoxView._3dreq = !0;
  var p = MSBoxView.prototype,
      _super = MSFadeView.prototype;
  p.__updateSlides = function (slide, distance) {
    var value = Math.abs(distance / this[this.__dimension]),
        element = slide.$element[0];
    1 - value <= 0 ? (element.style.visibility = "hidden", element.style[window._jcsspfx + "Transform"] = "") : (element.style.visibility = "", element.style[window._jcsspfx + "Transform"] = "rotate" + this._rotateDir + "(" + value * (distance < 0 ? 1 : -1) * 90 * this._calcFactor + "deg)", element.style[window._jcsspfx + "TransformOrigin"] = "50% 50% -" + slide[this.__dimension] / 2 + "px", element.style.zIndex = Math.ceil(2 * (1 - value)));
  }, p.create = function (index) {
    _super.create.call(this, index), this.controller.options.minValidDist = .03, this._rotateDir = "h" === this.options.dir ? "Y" : "X", this._calcFactor = "h" === this.options.dir ? 1 : -1;
  }, MSSlideController.registerView("box", MSBoxView);
}(jQuery), function ($) {
  "use strict";

  var BaseControl = function BaseControl() {
    this.options = {
      prefix: "ms-",
      autohide: !0,
      overVideo: !0,
      customClass: null
    };
  },
      p = BaseControl.prototype;

  p.slideAction = function (slide) {}, p.setup = function () {
    this.cont = this.options.insertTo ? $(this.options.insertTo) : this.slider.$controlsCont, this.options.overVideo || this._hideOnvideoStarts();
  }, p.checkHideUnder = function () {
    this.options.hideUnder && (this.needsRealign = !this.options.insetTo && ("left" === this.options.align || "right" === this.options.align) && this.options.inset === !1, $(window).bind("resize", {
      that: this
    }, this.onResize), this.onResize());
  }, p.onResize = function (event) {
    var that = event && event.data.that || this,
        w = window.innerWidth;
    w <= that.options.hideUnder && !that.detached ? (that.hide(!0), that.detached = !0, that.onDetach()) : w >= that.options.hideUnder && that.detached && (that.detached = !1, that.visible(), that.onAppend());
  }, p.create = function () {
    this.options.autohide && (this.hide(!0), this.slider.$controlsCont.mouseenter($.proxy(this._onMouseEnter, this)).mouseleave($.proxy(this._onMouseLeave, this)).mousedown($.proxy(this._onMouseDown, this)), this.$element && this.$element.mouseenter($.proxy(this._onMouseEnter, this)).mouseleave($.proxy(this._onMouseLeave, this)).mousedown($.proxy(this._onMouseDown, this)), $(document).mouseup($.proxy(this._onMouseUp, this))), this.options.align && this.$element.addClass("ms-align-" + this.options.align), this.options.customClass && this.$element && this.$element.addClass(this.options.customClass);
  }, p._onMouseEnter = function () {
    this._disableAH || this.mdown || this.visible(), this.mleave = !1;
  }, p._onMouseLeave = function () {
    this.mdown || this.hide(), this.mleave = !0;
  }, p._onMouseDown = function () {
    this.mdown = !0;
  }, p._onMouseUp = function () {
    this.mdown && this.mleave && this.hide(), this.mdown = !1;
  }, p.onAppend = function () {
    this.needsRealign && this.slider._realignControls();
  }, p.onDetach = function () {
    this.needsRealign && this.slider._realignControls();
  }, p._hideOnvideoStarts = function () {
    var that = this;
    this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY, function () {
      that._disableAH = !0, that.hide();
    }), this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE, function () {
      that._disableAH = !1, that.visible();
    });
  }, p.hide = function (fast) {
    if (fast) this.$element.css("opacity", 0), this.$element.css("display", "none");else {
      clearTimeout(this.hideTo);
      var $element = this.$element;
      this.hideTo = setTimeout(function () {
        CTween.fadeOut($element, 400, !1);
      }, 20);
    }
    this.$element.addClass("ms-ctrl-hide");
  }, p.visible = function () {
    this.detached || (clearTimeout(this.hideTo), this.$element.css("display", ""), CTween.fadeIn(this.$element, 400, !1), this.$element.removeClass("ms-ctrl-hide"));
  }, p.destroy = function () {
    this.options && this.options.hideUnder && $(window).unbind("resize", this.onResize);
  }, window.BaseControl = BaseControl;
}(jQuery), function ($) {
  "use strict";

  var MSArrows = function MSArrows(options) {
    BaseControl.call(this), $.extend(this.options, options);
  };

  MSArrows.extend(BaseControl);
  var p = MSArrows.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    var that = this;
    this.$next = $("<div></div>").addClass(this.options.prefix + "nav-next").bind("click", function () {
      that.slider.api.next(!0);
    }), this.$prev = $("<div></div>").addClass(this.options.prefix + "nav-prev").bind("click", function () {
      that.slider.api.previous(!0);
    }), _super.setup.call(this), this.cont.append(this.$next), this.cont.append(this.$prev), this.checkHideUnder();
  }, p.hide = function (fast) {
    return fast ? (this.$prev.css("opacity", 0).css("display", "none"), void this.$next.css("opacity", 0).css("display", "none")) : (CTween.fadeOut(this.$prev, 400, !1), CTween.fadeOut(this.$next, 400, !1), this.$prev.addClass("ms-ctrl-hide"), void this.$next.addClass("ms-ctrl-hide"));
  }, p.visible = function () {
    this.detached || (CTween.fadeIn(this.$prev, 400), CTween.fadeIn(this.$next, 400), this.$prev.removeClass("ms-ctrl-hide").css("display", ""), this.$next.removeClass("ms-ctrl-hide").css("display", ""));
  }, p.destroy = function () {
    _super.destroy(), this.$next.remove(), this.$prev.remove();
  }, window.MSArrows = MSArrows, MSSlideController.registerControl("arrows", MSArrows);
}(jQuery), function ($) {
  "use strict";

  var MSThumblist = function MSThumblist(options) {
    BaseControl.call(this), this.options.dir = "h", this.options.wheel = "v" === options.dir, this.options.arrows = !1, this.options.speed = 17, this.options.align = null, this.options.inset = !1, this.options.margin = 10, this.options.space = 10, this.options.width = 100, this.options.height = 100, this.options.type = "thumbs", this.options.hover = !1, $.extend(this.options, options), this.thumbs = [], this.index_count = 0, this.__dimen = "h" === this.options.dir ? "width" : "height", this.__alignsize = "h" === this.options.dir ? "height" : "width", this.__jdimen = "h" === this.options.dir ? "outerWidth" : "outerHeight", this.__pos = "h" === this.options.dir ? "left" : "top", this.click_enable = !0;
  };

  MSThumblist.extend(BaseControl);
  var p = MSThumblist.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    if (this.$element = $("<div></div>").addClass(this.options.prefix + "thumb-list"), "tabs" === this.options.type && this.$element.addClass(this.options.prefix + "tabs"), this.$element.addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.slider.$controlsCont === this.cont ? this.$element.appendTo(this.slider.$element) : this.$element.appendTo(this.cont), this.$thumbscont = $("<div></div>").addClass("ms-thumbs-cont").appendTo(this.$element), this.options.arrows) {
      var that = this;
      this.$fwd = $("<div></div>").addClass("ms-thumblist-fwd").appendTo(this.$element).click(function () {
        that.controller.push(-15);
      }), this.$bwd = $("<div></div>").addClass("ms-thumblist-bwd").appendTo(this.$element).click(function () {
        that.controller.push(15);
      });
    }

    if (!this.options.insetTo && this.options.align) {
      var align = this.options.align;
      this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.detach().prependTo(this.slider.$element).css({
        "margin-bottom": this.options.margin,
        position: "relative"
      }) : "bottom" === align ? this.$element.css({
        "margin-top": this.options.margin,
        position: "relative"
      }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align()), "v" === this.options.dir ? this.$element.width(this.options.width) : this.$element.height(this.options.height);
    }

    this.checkHideUnder();
  }, p.align = function (event) {
    if (!this.detached) {
      var align = this.options.align,
          pos = this.slider.reserveSpace(align, this.options[this.__alignsize] + 2 * this.options.margin);
      this.$element.css(align, -pos - this.options[this.__alignsize] - this.options.margin);
    }
  }, p.slideAction = function (slide) {
    var thumb_ele = slide.$element.find(".ms-thumb"),
        that = this,
        thumb_frame = $("<div></div>").addClass("ms-thumb-frame").append(thumb_ele).append($('<div class="ms-thumb-ol"></div>')).bind(this.options.hover ? "hover" : "click", function () {
      that.changeSlide(thumb_frame);
    });

    if (this.options.align && thumb_frame.width(this.options.width - ("v" === this.options.dir && "tabs" === this.options.type ? 12 : 0)).height(this.options.height).css("margin-" + ("v" === this.options.dir ? "bottom" : "right"), this.options.space), thumb_frame[0].index = this.index_count++, this.$thumbscont.append(thumb_frame), this.options.fillMode && thumb_ele.is("img")) {
      var aligner = new window.MSAligner(this.options.fillMode, thumb_frame, thumb_ele);
      thumb_ele[0].aligner = aligner, thumb_ele.one("load", function (e) {
        var $this = $(this);
        $this[0].aligner.init($this.width(), $this.height()), $this[0].aligner.align();
      }).each($.jqLoadFix);
    }

    $.browser.msie && thumb_ele.on("dragstart", function (event) {
      event.preventDefault();
    }), this.thumbs.push(thumb_frame);
  }, p.create = function () {
    _super.create.call(this), this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.controller = new Controller(0, 0, {
      snappingMinSpeed: 2,
      friction: (100 - .5 * this.options.speed) / 100
    }), this.controller.renderCallback("h" === this.options.dir ? this._hMove : this._vMove, this);
    var that = this;
    this.resize_listener = function () {
      that.__resize();
    }, $(window).bind("resize", this.resize_listener), this.thumbSize = this.thumbs[0][this.__jdimen](!0), this.setupSwipe(), this.__resize();
    var that = this;
    this.options.wheel && (this.wheellistener = function (event) {
      var e = window.event || event.orginalEvent || event,
          delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      return that.controller.push(10 * -delta), !1;
    }, $.browser.mozilla ? this.$element[0].addEventListener("DOMMouseScroll", this.wheellistener) : this.$element.bind("mousewheel", this.wheellistener)), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE, this.realignThumbs, this), this.cindex = this.slider.api.index(), this.select(this.thumbs[this.cindex]);
  }, p._hMove = function (controller, value) {
    return this.__contPos = value, window._cssanim ? void (this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "translateX(" + -value + "px)" + this.__translate_end) : void (this.$thumbscont[0].style.left = -value + "px");
  }, p._vMove = function (controller, value) {
    return this.__contPos = value, window._cssanim ? void (this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "translateY(" + -value + "px)" + this.__translate_end) : void (this.$thumbscont[0].style.top = -value + "px");
  }, p.setupSwipe = function () {
    this.swipeControl = new averta.TouchSwipe(this.$element), this.swipeControl.swipeType = "h" === this.options.dir ? "horizontal" : "vertical";
    var that = this;
    "h" === this.options.dir ? this.swipeControl.onSwipe = function (status) {
      that.horizSwipeMove(status);
    } : this.swipeControl.onSwipe = function (status) {
      that.vertSwipeMove(status);
    };
  }, p.vertSwipeMove = function (status) {
    if (!this.dTouch) {
      var phase = status.phase;
      if ("start" === phase) this.controller.stop();else if ("move" === phase) this.controller.drag(status.moveY);else if ("end" === phase || "cancel" === phase) {
        var speed = Math.abs(status.distanceY / status.duration * 50 / 3);
        speed > .1 ? this.controller.push(-status.distanceY / status.duration * 50 / 3) : (this.click_enable = !0, this.controller.cancel());
      }
    }
  }, p.horizSwipeMove = function (status) {
    if (!this.dTouch) {
      var phase = status.phase;
      if ("start" === phase) this.controller.stop(), this.click_enable = !1;else if ("move" === phase) this.controller.drag(status.moveX);else if ("end" === phase || "cancel" === phase) {
        var speed = Math.abs(status.distanceX / status.duration * 50 / 3);
        speed > .1 ? this.controller.push(-status.distanceX / status.duration * 50 / 3) : (this.click_enable = !0, this.controller.cancel());
      }
    }
  }, p.update = function () {
    var nindex = this.slider.api.index();
    this.cindex !== nindex && (null != this.cindex && this.unselect(this.thumbs[this.cindex]), this.cindex = nindex, this.select(this.thumbs[this.cindex]), this.dTouch || this.updateThumbscroll());
  }, p.realignThumbs = function () {
    this.$element.find(".ms-thumb").each(function (index, thumb) {
      thumb.aligner && thumb.aligner.align();
    });
  }, p.updateThumbscroll = function () {
    var pos = this.thumbSize * this.cindex;
    if (NaN == this.controller.value && (this.controller.value = 0), pos - this.controller.value < 0) return void this.controller.gotoSnap(this.cindex, !0);

    if (pos + this.thumbSize - this.controller.value > this.$element[this.__dimen]()) {
      var first_snap = this.cindex - Math.floor(this.$element[this.__dimen]() / this.thumbSize) + 1;
      return void this.controller.gotoSnap(first_snap, !0);
    }
  }, p.changeSlide = function (thumb) {
    this.click_enable && this.cindex !== thumb[0].index && this.slider.api.gotoSlide(thumb[0].index);
  }, p.unselect = function (ele) {
    ele.removeClass("ms-thumb-frame-selected");
  }, p.select = function (ele) {
    ele.addClass("ms-thumb-frame-selected");
  }, p.__resize = function () {
    var size = this.$element[this.__dimen]();

    if (this.ls !== size) {
      this.ls = size, this.thumbSize = this.thumbs[0][this.__jdimen](!0);
      var len = this.slider.api.count() * this.thumbSize;
      this.$thumbscont[0].style[this.__dimen] = len + "px", len <= size ? (this.dTouch = !0, this.controller.stop(), this.$thumbscont[0].style[this.__pos] = .5 * (size - len) + "px", this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "") : (this.dTouch = !1, this.click_enable = !0, this.$thumbscont[0].style[this.__pos] = "", this.controller._max_value = len - size, this.controller.options.snapsize = this.thumbSize, this.updateThumbscroll());
    }
  }, p.destroy = function () {
    _super.destroy(), this.options.wheel && ($.browser.mozilla ? this.$element[0].removeEventListener("DOMMouseScroll", this.wheellistener) : this.$element.unbind("mousewheel", this.wheellistener), this.wheellistener = null), $(window).unbind("resize", this.resize_listener), this.$element.remove(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this);
  }, window.MSThumblist = MSThumblist, MSSlideController.registerControl("thumblist", MSThumblist);
}(jQuery), function ($) {
  "use strict";

  var MSBulltes = function MSBulltes(options) {
    BaseControl.call(this), this.options.dir = "h", this.options.inset = !0, this.options.margin = 10, this.options.space = 10, $.extend(this.options, options), this.bullets = [];
  };

  MSBulltes.extend(BaseControl);
  var p = MSBulltes.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    if (_super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "bullets").addClass("ms-dir-" + this.options.dir).appendTo(this.cont), this.$bullet_cont = $("<div></div>").addClass("ms-bullets-count").appendTo(this.$element), !this.options.insetTo && this.options.align) {
      var align = this.options.align;
      this.options.inset && this.$element.css(align, this.options.margin);
    }

    this.checkHideUnder();
  }, p.create = function () {
    _super.create.call(this);

    var that = this;
    this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.cindex = this.slider.api.index();

    for (var i = 0; i < this.slider.api.count(); ++i) {
      var bullet = $("<div></div>").addClass("ms-bullet");
      bullet[0].index = i, bullet.on("click", function () {
        that.changeSlide(this.index);
      }), this.$bullet_cont.append(bullet), this.bullets.push(bullet), "h" === this.options.dir ? bullet.css("margin", this.options.space / 2) : bullet.css("margin", this.options.space);
    }

    "h" === this.options.dir ? this.$element.width(bullet.outerWidth(!0) * this.slider.api.count()) : this.$element.css("margin-top", -this.$element.outerHeight(!0) / 2), this.select(this.bullets[this.cindex]);
  }, p.update = function () {
    var nindex = this.slider.api.index();
    this.cindex !== nindex && (null != this.cindex && this.unselect(this.bullets[this.cindex]), this.cindex = nindex, this.select(this.bullets[this.cindex]));
  }, p.changeSlide = function (index) {
    this.cindex !== index && this.slider.api.gotoSlide(index);
  }, p.unselect = function (ele) {
    ele.removeClass("ms-bullet-selected");
  }, p.select = function (ele) {
    ele.addClass("ms-bullet-selected");
  }, p.destroy = function () {
    _super.destroy(), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.$element.remove();
  }, window.MSBulltes = MSBulltes, MSSlideController.registerControl("bullets", MSBulltes);
}(jQuery), function ($) {
  "use strict";

  var MSScrollbar = function MSScrollbar(options) {
    BaseControl.call(this), this.options.dir = "h", this.options.autohide = !0, this.options.width = 4, this.options.color = "#3D3D3D", this.options.margin = 10, $.extend(this.options, options), this.__dimen = "h" === this.options.dir ? "width" : "height", this.__jdimen = "h" === this.options.dir ? "outerWidth" : "outerHeight", this.__pos = "h" === this.options.dir ? "left" : "top", this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.__translate_start = "h" === this.options.dir ? " translateX(" : "translateY(";
  };

  MSScrollbar.extend(BaseControl);
  var p = MSScrollbar.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    if (this.$element = $("<div></div>").addClass(this.options.prefix + "sbar").addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.slider.$controlsCont === this.cont ? this.$element.appendTo(this.slider.$element) : this.$element.appendTo(this.cont), this.$bar = $("<div></div>").addClass(this.options.prefix + "bar").appendTo(this.$element), this.slider.options.loop && (this.disable = !0, this.$element.remove()), "v" === this.options.dir ? this.$bar.width(this.options.width) : this.$bar.height(this.options.width), this.$bar.css("background-color", this.options.color), !this.options.insetTo && this.options.align) {
      "v" === this.options.dir ? this.$element.css({
        right: "auto",
        left: "auto"
      }) : this.$element.css({
        top: "auto",
        bottom: "auto"
      });
      var align = this.options.align;
      this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
        "margin-bottom": this.options.margin,
        position: "relative"
      }) : "bottom" === align ? this.$element.css({
        "margin-top": this.options.margin,
        position: "relative"
      }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align());
    }

    this.checkHideUnder();
  }, p.align = function (event) {
    if (!this.detached) {
      var align = this.options.align,
          pos = this.slider.reserveSpace(align, 2 * this.options.margin + this.options.width);
      this.$element.css(align, -pos - this.options.margin - this.options.width);
    }
  }, p.create = function () {
    if (!this.disable) {
      this.scroller = this.slider.api.scroller, this.slider.api.view.addEventListener(MSViewEvents.SCROLL, this._update, this), this.slider.api.addEventListener(MSSliderEvent.RESIZE, this._resize, this), this._resize(), this.options.autohide && this.$bar.css("opacity", "0");
    }
  }, p._resize = function () {
    this.vdimen = this.$element[this.__dimen](), this.bar_dimen = this.slider.api.view["__" + this.__dimen] * this.vdimen / this.scroller._max_value, this.$bar[this.__dimen](this.bar_dimen);
  }, p._update = function () {
    var value = this.scroller.value * (this.vdimen - this.bar_dimen) / this.scroller._max_value;

    if (this.lvalue !== value) {
      if (this.lvalue = value, this.options.autohide) {
        clearTimeout(this.hto), this.$bar.css("opacity", "1");
        var that = this;
        this.hto = setTimeout(function () {
          that.$bar.css("opacity", "0");
        }, 150);
      }

      return value < 0 ? void (this.$bar[0].style[this.__dimen] = this.bar_dimen + value + "px") : (value > this.vdimen - this.bar_dimen && (this.$bar[0].style[this.__dimen] = this.vdimen - value + "px"), window._cssanim ? void (this.$bar[0].style[window._jcsspfx + "Transform"] = this.__translate_start + value + "px)" + this.__translate_end) : void (this.$bar[0].style[this.__pos] = value + "px"));
    }
  }, p.destroy = function () {
    _super.destroy(), this.slider.api.view.removeEventListener(MSViewEvents.SCROLL, this._update, this), this.slider.api.removeEventListener(MSSliderEvent.RESIZE, this._resize, this), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.$element.remove();
  }, window.MSScrollbar = MSScrollbar, MSSlideController.registerControl("scrollbar", MSScrollbar);
}(jQuery), function ($) {
  "use strict";

  var MSTimerbar = function MSTimerbar(options) {
    BaseControl.call(this), this.options.autohide = !1, this.options.width = 4, this.options.color = "#FFFFFF", this.options.inset = !0, this.options.margin = 0, $.extend(this.options, options);
  };

  MSTimerbar.extend(BaseControl);
  var p = MSTimerbar.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    if (_super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "timerbar"), _super.setup.call(this), this.slider.$controlsCont === this.cont ? this.$element.appendTo(this.slider.$element) : this.$element.appendTo(this.cont), this.$bar = $("<div></div>").addClass("ms-time-bar").appendTo(this.$element), "v" === this.options.dir ? (this.$bar.width(this.options.width), this.$element.width(this.options.width)) : (this.$bar.height(this.options.width), this.$element.height(this.options.width)), this.$bar.css("background-color", this.options.color), !this.options.insetTo && this.options.align) {
      this.$element.css({
        top: "auto",
        bottom: "auto"
      });
      var align = this.options.align;
      this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
        "margin-bottom": this.options.margin,
        position: "relative"
      }) : "bottom" === align ? this.$element.css({
        "margin-top": this.options.margin,
        position: "relative"
      }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align());
    }

    this.checkHideUnder();
  }, p.align = function (event) {
    if (!this.detached) {
      var align = this.options.align,
          pos = this.slider.reserveSpace(align, 2 * this.options.margin + this.options.width);
      this.$element.css(align, -pos - this.options.margin - this.options.width);
    }
  }, p.create = function () {
    _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this), this._update();
  }, p._update = function () {
    this.$bar[0].style.width = this.slider.api._delayProgress + "%";
  }, p.destroy = function () {
    _super.destroy(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this), this.$element.remove();
  }, window.MSTimerbar = MSTimerbar, MSSlideController.registerControl("timebar", MSTimerbar);
}(jQuery), function ($) {
  "use strict";

  var MSCircleTimer = function MSCircleTimer(options) {
    BaseControl.call(this), this.options.color = "#A2A2A2", this.options.stroke = 10, this.options.radius = 4, this.options.autohide = !1, $.extend(this.options, options);
  };

  MSCircleTimer.extend(BaseControl);
  var p = MSCircleTimer.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    return _super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "ctimer").appendTo(this.cont), this.$canvas = $("<canvas></canvas>").addClass("ms-ctimer-canvas").appendTo(this.$element), this.$bar = $("<div></div>").addClass("ms-ctimer-bullet").appendTo(this.$element), this.$canvas[0].getContext ? (this.ctx = this.$canvas[0].getContext("2d"), this.prog = 0, this.__w = 2 * (this.options.radius + this.options.stroke / 2), this.$canvas[0].width = this.__w, this.$canvas[0].height = this.__w, void this.checkHideUnder()) : (this.destroy(), void (this.disable = !0));
  }, p.create = function () {
    if (!this.disable) {
      _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this);
      var that = this;
      this.$element.click(function () {
        that.slider.api.paused ? that.slider.api.resume() : that.slider.api.pause();
      }), this._update();
    }
  }, p._update = function () {
    var that = this;
    $(this).stop(!0).animate({
      prog: .01 * this.slider.api._delayProgress
    }, {
      duration: 200,
      step: function step() {
        that._draw();
      }
    });
  }, p._draw = function () {
    this.ctx.clearRect(0, 0, this.__w, this.__w), this.ctx.beginPath(), this.ctx.arc(.5 * this.__w, .5 * this.__w, this.options.radius, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * this.prog, !1), this.ctx.strokeStyle = this.options.color, this.ctx.lineWidth = this.options.stroke, this.ctx.stroke();
  }, p.destroy = function () {
    _super.destroy(), this.disable || ($(this).stop(!0), this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this), this.$element.remove());
  }, window.MSCircleTimer = MSCircleTimer, MSSlideController.registerControl("circletimer", MSCircleTimer);
}(jQuery), function ($) {
  "use strict";

  window.MSLightbox = function (options) {
    BaseControl.call(this, options), this.options.autohide = !1, $.extend(this.options, options), this.data_list = [];
  }, MSLightbox.fadeDuratation = 400, MSLightbox.extend(BaseControl);
  var p = MSLightbox.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    _super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "lightbox-btn").appendTo(this.cont), this.checkHideUnder();
  }, p.slideAction = function (slide) {
    $("<div></div>").addClass(this.options.prefix + "lightbox-btn").appendTo(slide.$element).append($(slide.$element.find(".ms-lightbox")));
  }, p.create = function () {
    _super.create.call(this);
  }, MSSlideController.registerControl("lightbox", MSLightbox);
}(jQuery), function ($) {
  "use strict";

  window.MSSlideInfo = function (options) {
    BaseControl.call(this, options), this.options.autohide = !1, this.options.align = null, this.options.inset = !1, this.options.margin = 10, this.options.size = 100, this.options.dir = "h", $.extend(this.options, options), this.data_list = [];
  }, MSSlideInfo.fadeDuratation = 400, MSSlideInfo.extend(BaseControl);
  var p = MSSlideInfo.prototype,
      _super = BaseControl.prototype;
  p.setup = function () {
    if (this.$element = $("<div></div>").addClass(this.options.prefix + "slide-info").addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.slider.$controlsCont === this.cont ? this.$element.appendTo(this.slider.$element) : this.$element.appendTo(this.cont), !this.options.insetTo && this.options.align) {
      var align = this.options.align;
      this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
        "margin-bottom": this.options.margin,
        position: "relative"
      }) : "bottom" === align ? this.$element.css({
        "margin-top": this.options.margin,
        position: "relative"
      }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align()), "v" === this.options.dir ? this.$element.width(this.options.size) : this.$element.css("min-height", this.options.size);
    }

    this.checkHideUnder();
  }, p.align = function (event) {
    if (!this.detached) {
      var align = this.options.align,
          pos = this.slider.reserveSpace(align, this.options.size + 2 * this.options.margin);
      this.$element.css(align, -pos - this.options.size - this.options.margin);
    }
  }, p.slideAction = function (slide) {
    var info_ele = $(slide.$element.find(".ms-info"));
    info_ele.detach(), this.data_list[slide.index] = info_ele;
  }, p.create = function () {
    _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.cindex = this.slider.api.index(), this.switchEle(this.data_list[this.cindex]);
  }, p.update = function () {
    var nindex = this.slider.api.index();
    this.switchEle(this.data_list[nindex]), this.cindex = nindex;
  }, p.switchEle = function (ele) {
    if (this.current_ele) {
      this.current_ele[0].tween && this.current_ele[0].tween.stop(!0), this.current_ele[0].tween = CTween.animate(this.current_ele, MSSlideInfo.fadeDuratation, {
        opacity: 0
      }, {
        complete: function complete() {
          this.detach(), this[0].tween = null, ele.css("position", "relative");
        },
        target: this.current_ele
      }), ele.css("position", "absolute");
    }

    this.__show(ele);
  }, p.__show = function (ele) {
    ele.appendTo(this.$element).css("opacity", "0"), this.current_ele && ele.height(Math.max(ele.height(), this.current_ele.height())), clearTimeout(this.tou), this.tou = setTimeout(function () {
      CTween.fadeIn(ele, MSSlideInfo.fadeDuratation), ele.css("height", "");
    }, MSSlideInfo.fadeDuratation), ele[0].tween && ele[0].tween.stop(!0), this.current_ele = ele;
  }, p.destroy = function () {
    _super.destroy(), clearTimeout(this.tou), this.current_ele && this.current_ele[0].tween && this.current_ele[0].tween.stop("true"), this.$element.remove(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this);
  }, MSSlideController.registerControl("slideinfo", MSSlideInfo);
}(jQuery), function ($) {
  window.MSGallery = function (id, slider) {
    this.id = id, this.slider = slider, this.telement = $("#" + id), this.botcont = $("<div></div>").addClass("ms-gallery-botcont").appendTo(this.telement), this.thumbcont = $("<div></div>").addClass("ms-gal-thumbcont hide-thumbs").appendTo(this.botcont), this.playbtn = $("<div></div>").addClass("ms-gal-playbtn").appendTo(this.botcont), this.thumbtoggle = $("<div></div>").addClass("ms-gal-thumbtoggle").appendTo(this.botcont), slider.control("thumblist", {
      insertTo: this.thumbcont,
      autohide: !1,
      dir: "h"
    }), slider.control("slidenum", {
      insertTo: this.botcont,
      autohide: !1
    }), slider.control("slideinfo", {
      insertTo: this.botcont,
      autohide: !1
    }), slider.control("timebar", {
      insertTo: this.botcont,
      autohide: !1
    }), slider.control("bullets", {
      insertTo: this.botcont,
      autohide: !1
    });
  };

  var p = MSGallery.prototype;
  p._init = function () {
    var that = this;
    this.slider.api.paused || this.playbtn.addClass("btn-pause"), this.playbtn.click(function () {
      that.slider.api.paused ? (that.slider.api.resume(), that.playbtn.addClass("btn-pause")) : (that.slider.api.pause(), that.playbtn.removeClass("btn-pause"));
    }), this.thumbtoggle.click(function () {
      that.vthumbs ? (that.thumbtoggle.removeClass("btn-hide"), that.vthumbs = !1, that.thumbcont.addClass("hide-thumbs")) : (that.thumbtoggle.addClass("btn-hide"), that.thumbcont.removeClass("hide-thumbs"), that.vthumbs = !0);
    });
  }, p.setup = function () {
    var that = this;
    $(document).ready(function () {
      that._init();
    });
  };
}(jQuery), function ($) {
  var getPhotosetURL = function getPhotosetURL(key, id, count) {
    return "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + key + "&photoset_id=" + id + "&per_page=" + count + "&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?";
  },
      getUserPublicURL = function getUserPublicURL(key, id, count) {
    return "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=" + key + "&user_id=" + id + "&per_page=" + count + "&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?";
  },
      getImageSource = function getImageSource(fid, server, id, secret, size, data) {
    return "_o" === size && data ? data.url_o : "https://farm" + fid + ".staticflickr.com/" + server + "/" + id + "_" + secret + size + ".jpg";
  };

  window.MSFlickrV2 = function (slider, options) {
    var _options = {
      count: 10,
      type: "photoset",
      thumbSize: "q",
      imgSize: "c"
    };
    if (this.slider = slider, this.slider.holdOn(), !options.key) return void this.errMsg("Flickr API Key required. Please add it in settings.");
    $.extend(_options, options), this.options = _options;
    var that = this;
    "photoset" === this.options.type ? $.getJSON(getPhotosetURL(this.options.key, this.options.id, this.options.count), function (data) {
      that._photosData(data);
    }) : $.getJSON(getUserPublicURL(this.options.key, this.options.id, this.options.count), function (data) {
      that.options.type = "photos", that._photosData(data);
    }), "" !== this.options.imgSize && "-" !== this.options.imgSize && (this.options.imgSize = "_" + this.options.imgSize), this.options.thumbSize = "_" + this.options.thumbSize, this.slideTemplate = this.slider.$element.find(".ms-slide")[0].outerHTML, this.slider.$element.find(".ms-slide").remove();
  };

  var p = MSFlickrV2.prototype;
  p._photosData = function (data) {
    if ("fail" === data.stat) return void this.errMsg("Flickr API ERROR#" + data.code + ": " + data.message);
    var that = this;
    this.options.author || this.options.desc;
    $.each(data[this.options.type].photo, function (i, item) {
      var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function (match) {
        return match = match.replace(/{{|}}/g, ""), shortCodes[match] ? shortCodes[match](item, that) : "{{" + match + "}}";
      });
      $(slide_cont).appendTo(that.slider.$element);
    }), that._initSlider();
  }, p.errMsg = function (msg) {
    this.slider.$element.css("display", "block"), this.errEle || (this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)), this.errEle.html(msg);
  }, p._initSlider = function () {
    this.slider.release();
  };
  var shortCodes = {
    image: function image(data, that) {
      return getImageSource(data.farm, data.server, data.id, data.secret, that.options.imgSize, data);
    },
    thumb: function thumb(data, that) {
      return getImageSource(data.farm, data.server, data.id, data.secret, that.options.thumbSize);
    },
    title: function title(data, that) {
      return data.title;
    },
    "owner-name": function ownerName(data, that) {
      return data.ownername;
    },
    "date-taken": function dateTaken(data, that) {
      return data.datetaken;
    },
    views: function views(data, that) {
      return data.views;
    },
    description: function description(data, that) {
      return data.description._content;
    }
  };
}(jQuery), function ($) {
  window.MSFacebookGallery = function (slider, options) {
    var _options = {
      count: 10,
      type: "photostream",
      thumbSize: "320",
      imgSize: "orginal",
      https: !1,
      token: ""
    };
    this.slider = slider, this.slider.holdOn(), $.extend(_options, options), this.options = _options, this.graph = "https://graph.facebook.com";
    var that = this;
    "photostream" === this.options.type ? $.getJSON(this.graph + "/" + this.options.username + "/photos/uploaded/?fields=source,name,link,images,from&limit=" + this.options.count + "&access_token=" + this.options.token, function (data) {
      that._photosData(data);
    }) : $.getJSON(this.graph + "/" + this.options.albumId + "/photos?fields=source,name,link,images,from&limit=" + this.options.count + "&access_token=" + this.options.token, function (data) {
      that._photosData(data);
    }), this.slideTemplate = this.slider.$element.find(".ms-slide")[0].outerHTML, this.slider.$element.find(".ms-slide").remove();
  };

  var p = MSFacebookGallery.prototype;
  p._photosData = function (content) {
    if (content.error) return void this.errMsg("Facebook API ERROR#" + content.error.code + "(" + content.error.type + "): " + content.error.message);

    for (var that = this, i = (this.options.author || this.options.desc, 0), l = content.data.length; i !== l; i++) {
      var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function (match) {
        return match = match.replace(/{{|}}/g, ""), shortCodes[match] ? shortCodes[match](content.data[i], that) : "{{" + match + "}}";
      });
      $(slide_cont).appendTo(that.slider.$element);
    }

    that._initSlider();
  }, p.errMsg = function (msg) {
    this.slider.$element.css("display", "block"), this.errEle || (this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)), this.errEle.html(msg);
  }, p._initSlider = function () {
    this.slider.release();
  };

  var getImageSource = function getImageSource(images, size) {
    if ("orginal" === size) return images[0].source;

    for (var i = 0, l = images.length; i !== l; i++) {
      if (images[i].source.indexOf(size + "x" + size) !== -1) return images[i].source;
    }

    return images[0].source;
  },
      shortCodes = {
    image: function image(data, that) {
      return getImageSource(data.images, that.options.imgSize);
    },
    thumb: function thumb(data, that) {
      return getImageSource(data.images, that.options.thumbSize);
    },
    name: function name(data, that) {
      return data.name;
    },
    "owner-name": function ownerName(data, that) {
      return data.from.name;
    },
    link: function link(data, that) {
      return data.link;
    }
  };
}(jQuery), function ($) {
  "use strict";

  window.MSScrollParallax = function (slider, parallax, bgparallax, fade) {
    this.fade = fade, this.slider = slider, this.parallax = parallax / 100, this.bgparallax = bgparallax / 100, slider.api.addEventListener(MSSliderEvent.INIT, this.init, this), slider.api.addEventListener(MSSliderEvent.DESTROY, this.destory, this), slider.api.addEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this), slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this);
  }, window.MSScrollParallax.setup = function (slider, parallax, bgparallax, fade) {
    if (!window._mobile) return null == parallax && (parallax = 50), null == bgparallax && (bgparallax = 40), new MSScrollParallax(slider, parallax, bgparallax, fade);
  };
  var p = window.MSScrollParallax.prototype;
  p.init = function (e) {
    this.slider.$element.addClass("ms-scroll-parallax"), this.sliderOffset = this.slider.$element.offset().top, this.updateCurrentSlide();

    for (var slide, slides = this.slider.api.view.slideList, i = 0, l = slides.length; i !== l; i++) {
      slide = slides[i], slide.hasLayers && (slide.layerController.$layers.wrap('<div class="ms-scroll-parallax-cont"></div>'), slide.$scrollParallaxCont = slide.layerController.$layers.parent());
    }

    $(window).on("scroll", {
      that: this
    }, this.moveParallax).trigger("scroll");
  }, p.resetLayers = function (e) {
    if (this.lastSlide) {
      var layers = this.lastSlide.$scrollParallaxCont;
      window._css2d ? (layers && (layers[0].style[window._jcsspfx + "Transform"] = ""), this.lastSlide.hasBG && (this.lastSlide.$imgcont[0].style[window._jcsspfx + "Transform"] = "")) : (layers && (layers[0].style.top = ""), this.lastSlide.hasBG && (this.lastSlide.$imgcont[0].style.top = "0px"));
    }
  }, p.updateCurrentSlide = function (e) {
    this.lastSlide = this.currentSlide, this.currentSlide = this.slider.api.currentSlide, this.moveParallax({
      data: {
        that: this
      }
    });
  }, p.moveParallax = function (e) {
    var that = e.data.that,
        slider = that.slider,
        offset = that.sliderOffset,
        scrollTop = $(window).scrollTop(),
        layers = that.currentSlide.$scrollParallaxCont,
        out = offset - scrollTop;
    out <= 0 ? (layers && (window._css3d ? layers[0].style[window._jcsspfx + "Transform"] = "translateY(" + -out * that.parallax + "px) translateZ(0.4px)" : window._css2d ? layers[0].style[window._jcsspfx + "Transform"] = "translateY(" + -out * that.parallax + "px)" : layers[0].style.top = -out * that.parallax + "px"), that.updateSlidesBG(-out * that.bgparallax + "px", !0), layers && that.fade && layers.css("opacity", 1 - Math.min(1, -out / slider.api.height))) : (layers && (window._css2d ? layers[0].style[window._jcsspfx + "Transform"] = "" : layers[0].style.top = ""), that.updateSlidesBG("0px", !1), layers && that.fade && layers.css("opacity", 1));
  }, p.updateSlidesBG = function (pos, fixed) {
    for (var slides = this.slider.api.view.slideList, position = !fixed || $.browser.msie || $.browser.opera ? "" : "fixed", i = 0, l = slides.length; i !== l; i++) {
      slides[i].hasBG && (slides[i].$imgcont[0].style.position = position, slides[i].$imgcont[0].style.top = pos), slides[i].$bgvideocont && (slides[i].$bgvideocont[0].style.position = position, slides[i].$bgvideocont[0].style.top = pos);
    }
  }, p.destory = function () {
    slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this), slider.api.removeEventListener(MSSliderEvent.DESTROY, this.destory, this), slider.api.removeEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this), slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this), $(window).off("scroll", this.moveParallax);
  };
}(jQuery), function ($, document, window) {
  var PId = 0;

  if (window.MasterSlider) {
    var KeyboardNav = function KeyboardNav(slider) {
      this.slider = slider, this.PId = PId++, this.slider.options.keyboard && slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
    };

    KeyboardNav.name = "MSKeyboardNav";
    var p = KeyboardNav.prototype;
    p.init = function () {
      var api = this.slider.api;
      $(document).on("keydown.kbnav" + this.PId, function (event) {
        var which = event.which;
        37 === which || 40 === which ? api.previous(!0) : 38 !== which && 39 !== which || api.next(!0);
      });
    }, p.destroy = function () {
      $(document).off("keydown.kbnav" + this.PId), this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
    }, MasterSlider.registerPlugin(KeyboardNav);
  }
}(jQuery, document, window), function ($, document, window) {
  var PId = 0,
      $window = $(window),
      $doc = $(document);

  if (window.MasterSlider) {
    var StartOnAppear = function StartOnAppear(slider) {
      this.PId = PId++, this.slider = slider, this.$slider = slider.$element, this.slider.options.startOnAppear && (slider.holdOn(), $doc.ready($.proxy(this.init, this)));
    };

    StartOnAppear.name = "MSStartOnAppear";
    var p = StartOnAppear.prototype;
    p.init = function () {
      this.slider.api;
      $window.on("scroll.soa" + this.PId, $.proxy(this._onScroll, this)).trigger("scroll");
    }, p._onScroll = function () {
      var vpBottom = $window.scrollTop() + $window.height(),
          top = this.$slider.offset().top;
      top < vpBottom && ($window.off("scroll.soa" + this.PId), this.slider.release());
    }, p.destroy = function () {}, MasterSlider.registerPlugin(StartOnAppear);
  }
}(jQuery, document, window), function (document, window, jQuery) {
  var filterUnits = {
    "hue-rotate": "deg",
    blur: "px"
  },
      initialValues = {
    opacity: 1,
    contrast: 1,
    brightness: 1,
    saturate: 1,
    "hue-rotate": 0,
    invert: 0,
    sepia: 0,
    blur: 0,
    grayscale: 0
  };

  if (window.MasterSlider) {
    var Filters = function Filters(slider) {
      this.slider = slider, this.slider.options.filters && slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
    };

    Filters.name = "MSFilters";
    var p = Filters.prototype;
    p.init = function () {
      var api = this.slider.api,
          view = api.view;
      this.filters = this.slider.options.filters, this.slideList = view.slideList, this.slidesCount = view.slidesCount, this.dimension = view[view.__dimension], this.target = "slide" === this.slider.options.filterTarget ? "$element" : "$bg_img", this.filterName = $.browser.webkit ? "WebkitFilter" : "filter";
      var superFun = view.controller.__renderHook.fun,
          superRef = view.controller.__renderHook.ref;
      view.controller.renderCallback(function (controller, value) {
        superFun.call(superRef, controller, value), this.applyEffect(value);
      }, this), this.applyEffect(view.controller.value);
    }, p.applyEffect = function (value) {
      for (var factor, slide, i = 0; i < this.slidesCount; ++i) {
        slide = this.slideList[i], factor = Math.min(1, Math.abs(value - slide.position) / this.dimension), slide[this.target] && ($.browser.msie ? null != this.filters.opacity && slide[this.target].opacity(1 - this.filters.opacity * factor) : slide[this.target][0].style[this.filterName] = this.generateStyle(factor));
      }
    }, p.generateStyle = function (factor) {
      var unit,
          style = "";

      for (var filter in this.filters) {
        unit = filterUnits[filter] || "", style += filter + "(" + (initialValues[filter] + (this.filters[filter] - initialValues[filter]) * factor) + ") ";
      }

      return style;
    }, p.destroy = function () {
      this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
    }, MasterSlider.registerPlugin(Filters);
  }
}(document, window, jQuery), function ($, document, window) {
  if (window.MasterSlider) {
    var ScrollToAction = function ScrollToAction(slider) {
      this.slider = slider, slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
    };

    ScrollToAction.name = "MSScrollToAction";
    var p = ScrollToAction.prototype;
    p.init = function () {
      var api = this.slider.api;
      api.scrollToEnd = _scrollToEnd, api.scrollTo = _scrollTo;
    }, p.destroy = function () {};

    var _scrollTo = function _scrollTo(target, duration) {
      var target = (this.slider.$element, $(target).eq(0));
      0 !== target.length && (null == duration && (duration = 1.4), $("html, body").animate({
        scrollTop: target.offset().top
      }, 1e3 * duration, "easeInOutQuad"));
    },
        _scrollToEnd = function _scrollToEnd(duration) {
      var sliderEle = this.slider.$element;
      null == duration && (duration = 1.4), $("html, body").animate({
        scrollTop: sliderEle.offset().top + sliderEle.outerHeight(!1)
      }, 1e3 * duration, "easeInOutQuad");
    };

    MasterSlider.registerPlugin(ScrollToAction);
  }
}(jQuery, document, window), function ($, window, document, undefined) {
  "use strict";

  if (window.MSReady) for (var i = 0, l = MSReady.length; i !== l; i++) {
    MSReady[i].call(null, $);
  }
}(jQuery, window, document);