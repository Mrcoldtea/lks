!function (t, i, s) { "use strict"; var e, n = t.document, o = t.Modernizr, r = function (t) { return t.charAt(0).toUpperCase() + t.slice(1) }, a = "Moz Webkit O Ms".split(" "), h = function (t) { var i, s = n.documentElement.style; if ("string" == typeof s[t]) return t; t = r(t); for (var e = 0, o = a.length; o > e; e++)if (i = a[e] + t, "string" == typeof s[i]) return i }, l = h("transform"), u = h("transitionProperty"), c = { csstransforms: function () { return !!l }, csstransforms3d: function () { var t = !!h("perspective"); if (t) { var s = " -o- -moz- -ms- -webkit- -khtml- ".split(" "), e = "@media (" + s.join("transform-3d),(") + "modernizr)", n = i("<style>" + e + "{#modernizr{height:3px}}</style>").appendTo("head"), o = i('<div id="modernizr" />').appendTo("html"); t = 3 === o.height(), o.remove(), n.remove() } return t }, csstransitions: function () { return !!u } }; if (o) for (e in c) o.hasOwnProperty(e) || o.addTest(e, c[e]); else { o = t.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" }; var d, f = " "; for (e in c) d = c[e](), o[e] = d, f += " " + (d ? "" : "no-") + e; i("html").addClass(f) } if (o.csstransforms) { var m = o.csstransforms3d ? { translate: function (t) { return "translate3d(" + t[0] + "px, " + t[1] + "px, 0) " }, scale: function (t) { return "scale3d(" + t + ", " + t + ", 1) " } } : { translate: function (t) { return "translate(" + t[0] + "px, " + t[1] + "px) " }, scale: function (t) { return "scale(" + t + ") " } }, p = function (t, s, e) { var n, o, r = i.data(t, "isoTransform") || {}, a = {}, h = {}; a[s] = e, i.extend(r, a); for (n in r) o = r[n], h[n] = m[n](o); var u = h.translate || "", c = h.scale || "", d = u + c; i.data(t, "isoTransform", r), t.style[l] = d }; i.cssNumber.scale = !0, i.cssHooks.scale = { set: function (t, i) { p(t, "scale", i) }, get: function (t, s) { var e = i.data(t, "isoTransform"); return e && e.scale ? e.scale : 1 } }, i.fx.step.scale = function (t) { i.cssHooks.scale.set(t.elem, t.now + t.unit) }, i.cssNumber.translate = !0, i.cssHooks.translate = { set: function (t, i) { p(t, "translate", i) }, get: function (t, s) { var e = i.data(t, "isoTransform"); return e && e.translate ? e.translate : [0, 0] } } } var y, g; o.csstransitions && (y = { WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd otransitionend", transitionProperty: "transitionend" }[u], g = h("transitionDuration")); var v, _ = i.event, A = i.event.handle ? "handle" : "dispatch"; _.special.smartresize = { setup: function () { i(this).bind("resize", _.special.smartresize.handler) }, teardown: function () { i(this).unbind("resize", _.special.smartresize.handler) }, handler: function (t, i) { var s = this, e = arguments; t.type = "smartresize", v && clearTimeout(v), v = setTimeout(function () { _[A].apply(s, e) }, "execAsap" === i ? 0 : 100) } }, i.fn.smartresize = function (t) { return t ? this.bind("smartresize", t) : this.trigger("smartresize", ["execAsap"]) }, i.Isotope = function (t, s, e) { this.element = i(s), this._create(t), this._init(e) }; var w = ["width", "height"], C = i(t); i.Isotope.settings = { resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: { opacity: 0, scale: .001 }, visibleStyle: { opacity: 1, scale: 1 }, containerStyle: { position: "relative", overflow: "hidden" }, animationEngine: "best-available", animationOptions: { queue: !1, duration: 800 }, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !0, itemPositionDataEnabled: !1 }, i.Isotope.prototype = { _create: function (t) { this.options = i.extend({}, i.Isotope.settings, t), this.styleQueue = [], this.elemCount = 0; var s = this.element[0].style; this.originalStyle = {}; var e = w.slice(0); for (var n in this.options.containerStyle) e.push(n); for (var o = 0, r = e.length; r > o; o++)n = e[o], this.originalStyle[n] = s[n] || ""; this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(); var a = { "original-order": function (t, i) { return i.elemCount++, i.elemCount }, random: function () { return Math.random() } }; this.options.getSortData = i.extend(this.options.getSortData, a), this.reloadItems(), this.offset = { left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10) }; var h = this; setTimeout(function () { h.element.addClass(h.options.containerClass) }, 0), this.options.resizable && C.bind("smartresize.isotope", function () { h.resize() }), this.element.delegate("." + this.options.hiddenClass, "click", function () { return !1 }) }, _getAtoms: function (t) { var i = this.options.itemSelector, s = i ? t.filter(i).add(t.find(i)) : t, e = { position: "absolute" }; return s = s.filter(function (t, i) { return 1 === i.nodeType }), this.usingTransforms && (e.left = 0, e.top = 0), s.css(e).addClass(this.options.itemClass), this.updateSortData(s, !0), s }, _init: function (t) { this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(t) }, option: function (t) { if (i.isPlainObject(t)) { this.options = i.extend(!0, this.options, t); var s; for (var e in t) s = "_update" + r(e), this[s] && this[s]() } }, _updateAnimationEngine: function () { var t, i = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""); switch (i) { case "css": case "none": t = !1; break; case "jquery": t = !0; break; default: t = !o.csstransitions }this.isUsingJQueryAnimation = t, this._updateUsingTransforms() }, _updateTransformsEnabled: function () { this._updateUsingTransforms() }, _updateUsingTransforms: function () { var t = this.usingTransforms = this.options.transformsEnabled && o.csstransforms && o.csstransitions && !this.isUsingJQueryAnimation; t || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = t ? this._translate : this._positionAbs }, _filter: function (t) { var i = "" === this.options.filter ? "*" : this.options.filter; if (!i) return t; var s = this.options.hiddenClass, e = "." + s, n = t.filter(e), o = n; if ("*" !== i) { o = n.filter(i); var r = t.not(e).not(i).addClass(s); this.styleQueue.push({ $el: r, style: this.options.hiddenStyle }) } return this.styleQueue.push({ $el: o, style: this.options.visibleStyle }), o.removeClass(s), t.filter(i) }, updateSortData: function (t, s) { var e, n, o = this, r = this.options.getSortData; t.each(function () { e = i(this), n = {}; for (var t in r) s || "original-order" !== t ? n[t] = r[t](e, o) : n[t] = i.data(this, "isotope-sort-data")[t]; i.data(this, "isotope-sort-data", n) }) }, _sort: function () { var t = this.options.sortBy, i = this._getSorter, s = this.options.sortAscending ? 1 : -1, e = function (e, n) { var o = i(e, t), r = i(n, t); return o === r && "original-order" !== t && (o = i(e, "original-order"), r = i(n, "original-order")), (o > r ? 1 : r > o ? -1 : 0) * s }; this.$filteredAtoms.sort(e) }, _getSorter: function (t, s) { return i.data(t, "isotope-sort-data")[s] }, _translate: function (t, i) { return { translate: [t, i] } }, _positionAbs: function (t, i) { return { left: t, top: i } }, _pushPosition: function (t, i, s) { i = Math.round(i + this.offset.left), s = Math.round(s + this.offset.top); var e = this.getPositionStyles(i, s); this.styleQueue.push({ $el: t, style: e }), this.options.itemPositionDataEnabled && t.data("isotope-item-position", { x: i, y: s }) }, layout: function (t, i) { var s = this.options.layoutMode; if (this["_" + s + "Layout"](t), this.options.resizesContainer) { var e = this["_" + s + "GetContainerSize"](); this.styleQueue.push({ $el: this.element, style: e }) } this._processStyleQueue(t, i), this.isLaidOut = !0 }, _processStyleQueue: function (t, s) { var e, n, r, a, h = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css", l = this.options.animationOptions, u = this.options.onLayout; if (n = function (t, i) { i.$el[h](i.style, l) }, this._isInserting && this.isUsingJQueryAnimation) n = function (t, i) { e = i.$el.hasClass("no-transition") ? "css" : h, i.$el[e](i.style, l) }; else if (s || u || l.complete) { var c = !1, d = [s, u, l.complete], f = this; if (r = !0, a = function () { if (!c) { for (var i, s = 0, e = d.length; e > s; s++)i = d[s], "function" == typeof i && i.call(f.element, t, f); c = !0 } }, this.isUsingJQueryAnimation && "animate" === h) l.complete = a, r = !1; else if (o.csstransitions) { for (var m, p = 0, v = this.styleQueue[0], _ = v && v.$el; !_ || !_.length;) { if (m = this.styleQueue[p++], !m) return; _ = m.$el } var A = parseFloat(getComputedStyle(_[0])[g]); A > 0 && (n = function (t, i) { i.$el[h](i.style, l).one(y, a) }, r = !1) } } i.each(this.styleQueue, n), r && a(), this.styleQueue = [] }, resize: function () { this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout() }, reLayout: function (t) { this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, t) }, addItems: function (t, i) { var s = this._getAtoms(t); this.$allAtoms = this.$allAtoms.add(s), i && i(s) }, insert: function (t, i) { this.element.append(t); var s = this; this.addItems(t, function (t) { var e = s._filter(t); s._addHideAppended(e), s._sort(), s.reLayout(), s._revealAppended(e, i) }) }, appended: function (t, i) { var s = this; this.addItems(t, function (t) { s._addHideAppended(t), s.layout(t), s._revealAppended(t, i) }) }, _addHideAppended: function (t) { this.$filteredAtoms = this.$filteredAtoms.add(t), t.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({ $el: t, style: this.options.hiddenStyle }) }, _revealAppended: function (t, i) { var s = this; setTimeout(function () { t.removeClass("no-transition"), s.styleQueue.push({ $el: t, style: s.options.visibleStyle }), s._isInserting = !1, s._processStyleQueue(t, i) }, 10) }, reloadItems: function () { this.$allAtoms = this._getAtoms(this.element.children()) }, remove: function (t, i) { this.$allAtoms = this.$allAtoms.not(t), this.$filteredAtoms = this.$filteredAtoms.not(t); var s = this, e = function () { t.remove(), i && i.call(s.element) }; t.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({ $el: t, style: this.options.hiddenStyle }), this._sort(), this.reLayout(e)) : e() }, shuffle: function (t) { this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(t) }, destroy: function () { var t = this.usingTransforms, i = this.options; this.$allAtoms.removeClass(i.hiddenClass + " " + i.itemClass).each(function () { var i = this.style; i.position = "", i.top = "", i.left = "", i.opacity = "", t && (i[l] = "") }); var s = this.element[0].style; for (var e in this.originalStyle) s[e] = this.originalStyle[e]; this.element.unbind(".isotope").undelegate("." + i.hiddenClass, "click").removeClass(i.containerClass).removeData("isotope"), C.unbind(".isotope") }, _getSegments: function (t) { var i, s = this.options.layoutMode, e = t ? "rowHeight" : "columnWidth", n = t ? "height" : "width", o = t ? "rows" : "cols", a = this.element[n](), h = this.options[s] && this.options[s][e] || this.$filteredAtoms["outer" + r(n)](!0) || a; i = Math.floor(a / h), i = Math.max(i, 1), this[s][o] = i, this[s][e] = h }, _checkIfSegmentsChanged: function (t) { var i = this.options.layoutMode, s = t ? "rows" : "cols", e = this[i][s]; return this._getSegments(t), this[i][s] !== e }, _masonryReset: function () { this.masonry = {}, this._getSegments(); var t = this.masonry.cols; for (this.masonry.colYs = []; t--;)this.masonry.colYs.push(0) }, _masonryLayout: function (t) { var s = this, e = s.masonry; t.each(function () { var t = i(this), n = Math.ceil(t.outerWidth(!0) / e.columnWidth); if (n = Math.min(n, e.cols), 1 === n) s._masonryPlaceBrick(t, e.colYs); else { var o, r, a = e.cols + 1 - n, h = []; for (r = 0; a > r; r++)o = e.colYs.slice(r, r + n), h[r] = Math.max.apply(Math, o); s._masonryPlaceBrick(t, h) } }) }, _masonryPlaceBrick: function (t, i) { for (var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length; o > n; n++)if (i[n] === s) { e = n; break } var r = this.masonry.columnWidth * e, a = s; this._pushPosition(t, r, a); var h = s + t.outerHeight(!0), l = this.masonry.cols + 1 - o; for (n = 0; l > n; n++)this.masonry.colYs[e + n] = h }, _masonryGetContainerSize: function () { var t = Math.max.apply(Math, this.masonry.colYs); return { height: t } }, _masonryResizeChanged: function () { return this._checkIfSegmentsChanged() }, _fitRowsReset: function () { this.fitRows = { x: 0, y: 0, height: 0 } }, _fitRowsLayout: function (t) { var s = this, e = this.element.width(), n = this.fitRows; t.each(function () { var t = i(this), o = t.outerWidth(!0), r = t.outerHeight(!0); 0 !== n.x && o + n.x > e && (n.x = 0, n.y = n.height), s._pushPosition(t, n.x, n.y), n.height = Math.max(n.y + r, n.height), n.x += o }) }, _fitRowsGetContainerSize: function () { return { height: this.fitRows.height } }, _fitRowsResizeChanged: function () { return !0 }, _cellsByRowReset: function () { this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByRowLayout: function (t) { var s = this, e = this.cellsByRow; t.each(function () { var t = i(this), n = e.index % e.cols, o = Math.floor(e.index / e.cols), r = (n + .5) * e.columnWidth - t.outerWidth(!0) / 2, a = (o + .5) * e.rowHeight - t.outerHeight(!0) / 2; s._pushPosition(t, r, a), e.index++ }) }, _cellsByRowGetContainerSize: function () { return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top } }, _cellsByRowResizeChanged: function () { return this._checkIfSegmentsChanged() }, _straightDownReset: function () { this.straightDown = { y: 0 } }, _straightDownLayout: function (t) { var s = this; t.each(function (t) { var e = i(this); s._pushPosition(e, 0, s.straightDown.y), s.straightDown.y += e.outerHeight(!0) }) }, _straightDownGetContainerSize: function () { return { height: this.straightDown.y } }, _straightDownResizeChanged: function () { return !0 }, _masonryHorizontalReset: function () { this.masonryHorizontal = {}, this._getSegments(!0); var t = this.masonryHorizontal.rows; for (this.masonryHorizontal.rowXs = []; t--;)this.masonryHorizontal.rowXs.push(0) }, _masonryHorizontalLayout: function (t) { var s = this, e = s.masonryHorizontal; t.each(function () { var t = i(this), n = Math.ceil(t.outerHeight(!0) / e.rowHeight); if (n = Math.min(n, e.rows), 1 === n) s._masonryHorizontalPlaceBrick(t, e.rowXs); else { var o, r, a = e.rows + 1 - n, h = []; for (r = 0; a > r; r++)o = e.rowXs.slice(r, r + n), h[r] = Math.max.apply(Math, o); s._masonryHorizontalPlaceBrick(t, h) } }) }, _masonryHorizontalPlaceBrick: function (t, i) { for (var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length; o > n; n++)if (i[n] === s) { e = n; break } var r = s, a = this.masonryHorizontal.rowHeight * e; this._pushPosition(t, r, a); var h = s + t.outerWidth(!0), l = this.masonryHorizontal.rows + 1 - o; for (n = 0; l > n; n++)this.masonryHorizontal.rowXs[e + n] = h }, _masonryHorizontalGetContainerSize: function () { var t = Math.max.apply(Math, this.masonryHorizontal.rowXs); return { width: t } }, _masonryHorizontalResizeChanged: function () { return this._checkIfSegmentsChanged(!0) }, _fitColumnsReset: function () { this.fitColumns = { x: 0, y: 0, width: 0 } }, _fitColumnsLayout: function (t) { var s = this, e = this.element.height(), n = this.fitColumns; t.each(function () { var t = i(this), o = t.outerWidth(!0), r = t.outerHeight(!0); 0 !== n.y && r + n.y > e && (n.x = n.width, n.y = 0), s._pushPosition(t, n.x, n.y), n.width = Math.max(n.x + o, n.width), n.y += r }) }, _fitColumnsGetContainerSize: function () { return { width: this.fitColumns.width } }, _fitColumnsResizeChanged: function () { return !0 }, _cellsByColumnReset: function () { this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByColumnLayout: function (t) { var s = this, e = this.cellsByColumn; t.each(function () { var t = i(this), n = Math.floor(e.index / e.rows), o = e.index % e.rows, r = (n + .5) * e.columnWidth - t.outerWidth(!0) / 2, a = (o + .5) * e.rowHeight - t.outerHeight(!0) / 2; s._pushPosition(t, r, a), e.index++ }) }, _cellsByColumnGetContainerSize: function () { return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth } }, _cellsByColumnResizeChanged: function () { return this._checkIfSegmentsChanged(!0) }, _straightAcrossReset: function () { this.straightAcross = { x: 0 } }, _straightAcrossLayout: function (t) { var s = this; t.each(function (t) { var e = i(this); s._pushPosition(e, s.straightAcross.x, 0), s.straightAcross.x += e.outerWidth(!0) }) }, _straightAcrossGetContainerSize: function () { return { width: this.straightAcross.x } }, _straightAcrossResizeChanged: function () { return !0 } }, i.fn.imagesLoaded = function (t) { function s() { t.call(n, o) } function e(t) { var n = t.target; n.src !== a && -1 === i.inArray(n, h) && (h.push(n), --r <= 0 && (setTimeout(s), o.unbind(".imagesLoaded", e))) } var n = this, o = n.find("img").add(n.filter("img")), r = o.length, a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", h = []; return r || s(), o.bind("load.imagesLoaded error.imagesLoaded", e).each(function () { var t = this.src; this.src = a, this.src = t }), n }; var z = function (i) { t.console && t.console.error(i) }; i.fn.isotope = function (t, s) { if ("string" == typeof t) { var e = Array.prototype.slice.call(arguments, 1); this.each(function () { var s = i.data(this, "isotope"); return s ? i.isFunction(s[t]) && "_" !== t.charAt(0) ? void s[t].apply(s, e) : void z("no such method '" + t + "' for isotope instance") : void z("cannot call methods on isotope prior to initialization; attempted to call method '" + t + "'") }) } else this.each(function () { var e = i.data(this, "isotope"); e ? (e.option(t), e._init(s)) : i.data(this, "isotope", new i.Isotope(t, this, s)) }); return this } }(window, jQuery);
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing,
  {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
      return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
      return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOutBounce: function (x, t, b, c, d) {
      if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
      return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  });
let $scroll_to_top = $("#scroll-to-top");
// 导航栏自动隐藏
let previousTop = 0;
$(window).scroll(function () {
  let currentTop = $(window).scrollTop();
  if (currentTop - previousTop < -10) {
    // 下划
    $scroll_to_top.addClass('show');
    previousTop = currentTop;
  } else if (currentTop - previousTop > 10) {
    // 上划
    $scroll_to_top.removeClass('show');
    previousTop = currentTop;
  }
  if (currentTop < 60) {
    // 顶部隐藏
    $scroll_to_top.removeClass('show');
  }
});
// 底部滚动
if ($scroll_to_top.length) {
  $scroll_to_top.on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  });
}
// 控制台
console.log(`
GitHub: https://github.com/xiangjianan

Email: xiang9872@gmail.com

Page: www.helloxjn.com

`);
// 推荐分类
$('.container').imagesLoaded(function () {
  let portfolio = $('.hot-menu');
  portfolio.on('click', 'button', function () {
    $(this).addClass('active').siblings().removeClass('active');
    let filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });
  let $grid = $('.hot-list').isotope({
    itemSelector: '.hot-grid'
  });
});
// 视频链接
let video_list = [
  ['B站博主', ' -LKs- 《良心到难以置信的网站推荐》', 'https://space.bilibili.com/125526'],
  ['第一期 av3743771', 'https://www.bilibili.com/video/av3743771/'],
  ['第二期 av9856372', 'https://www.bilibili.com/video/av9856372/'],
  ['第三期 av27234784', 'https://www.bilibili.com/video/av27234784/'],
  ['第四期 av66209341', 'https://www.bilibili.com/video/av66209341/'],
  ['第五期 BV1a741137NS', 'https://www.bilibili.com/video/BV1a741137NS/'],
  ['第六期 BV1wv411y7L6', 'https://www.bilibili.com/video/BV1wv411y7L6/'],
  ['第七期 BV1bU4y1x7A1', 'https://www.bilibili.com/video/BV1bU4y1x7A1/'],
]
$('button').click(function (event) {
  let num = $(this).attr('num');
  if (num === '0') {
    $('.group-video').html(`B站博主<a href="https://space.bilibili.com/125526?spm_id_from=333.788.b_765f7570696e666f.1" target="_blank"> -LKs- </a>《良心到难以置信的网站推荐》`);
  } else {
    $('.group-video').html(`视频传送门：<a href="${video_list[Number(num)][1]}" rel="nofollow noreferrer" target="_blank">${video_list[Number(num)][0]}</a>`);
  }
})