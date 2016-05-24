function startDBBone(a) {
    DBRouter = "undefined" != typeof a && "undefined" != typeof a.site && "static" == a.site ? new DB.StaticRouter(a) : new DB.Router(a), Backbone.history.start({
        pushState: !0
    })
}

function roundNumber(a, b) {
    return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
}

function objectIsset(a, b) {
    return b.split(".").reduce(function(a, b) {
        return "undefined" == typeof a || null === a ? a : a[b]
    }, a)
}

function loadFont(a, b) {
    function c() {
        clearTimeout(d), -1 === g ? ("function" == typeof b && b(!1, i), DB.loadedFont[a] = !1) : g ? ("function" == typeof b && b(!0, i), DB.loadedFont[a] = !0) : Date.now() - f > e ? ("function" == typeof b && b(!1, i), DB.loadedFont[a] = !1) : d = setTimeout(c, 100)
    }
    var d, e = 5e3,
        f = Date.now(),
        g = !1;
    DB.loadedFont[a] && (g = !0);
    for (var h, i = {
        bold: !0,
        italic: !0,
        both: !0
    }, j = DB.listFont.length - 1; j >= 0; j--) {
        var k = DB.listFont[j];
        if (a === k.family) {
            k.urlFontName && (h = k.urlFontName), i = k.config;
            break
        }
    }
    var l = $(".text-context").find("#choose-font a"),
        m = $(".text-context").find("#choose-font .caret"),
        n = $(".text-context").find(".loading_small");
    g ? ("function" == typeof b && b(!0, i), l.addClass("disabled"), m.addClass("hidden"), n.removeClass("hidden"), window.setTimeout(function() {
        l.removeClass("disabled"), m.removeClass("hidden"), n.addClass("hidden")
    }, 400)) : h && (WebFont.load({
        custom: {
            families: [a],
            urls: [h]
        },
        loading: function() {
            l.addClass("disabled"), m.addClass("hidden"), n.removeClass("hidden")
        },
        fontactive: function() {
            g = !0, l.removeClass("disabled"), m.removeClass("hidden"), n.addClass("hidden")
        },
        fontinactive: function() {
            g = -1, l.removeClass("disabled"), m.removeClass("hidden"), n.addClass("hidden"), console.log("load font failed: " + h)
        },
        timeout: 5e3
    }), c())
}

function filterImage(a, b, c, d) {
    function e(a) {
        return [Math.min(255, Math.round(255 * a[0])), Math.min(255, Math.round(255 * a[1]))]
    }

    function f(a) {
        function b(b) {
            return parseFloat((b * a / -100).toFixed(2))
        }

        function c(b) {
            return parseFloat((b * a / 100).toFixed(2))
        }
        if (a > 0) {
            var d = [0, .2, 0, -.1, 0].map(c),
                e = [0, .1, 0, -.1, 0].map(c),
                f = [.2, 0, .2].map(c);
            return {
                red: [
                    [0, 0],
                    [.3, .3 - d[1]],
                    [.7, .7 - d[3]],
                    [1, 1]
                ],
                green: [
                    [0, 0],
                    [.25, .25 - e[1]],
                    [.75, .75 - e[3]],
                    [1, 1]
                ],
                blue: [
                    [0, f[0]],
                    [0 + 2 / 3 * .5, f[0] + 2 / 3 * (.5 - f[0])],
                    [1 + 2 / 3 * -.5, 1 - f[2] + 2 / 3 * (.5 - (1 - f[2]))],
                    [1, 1 - f[2]]
                ]
            }
        }
        var d = [0, .2, .5, -.05].map(b),
            e = [0, -.15, 0, 0].map(b),
            f = [0, -.01, 0, .3].map(b);
        return {
            red: [
                [0, 0],
                [.3, .3 - d[1]],
                [.7, .7 - d[2]],
                [.95, .95 - d[3]]
            ],
            green: [
                [0, 0],
                [.25, .25 - e[1]],
                [.6, .6],
                [1, 1]
            ],
            blue: [
                [0, 0],
                [.3, .3 - f[1]],
                [.5, .5],
                [1, 1 - f[3]]
            ]
        }
    }

    function g(a) {
        return a -= 200 / 7, 0 > a && (a = 200 + a), a = h(360 * a / 200, 100, 50), {
            color: {
                r: a[0],
                g: a[1],
                b: a[2]
            },
            strength: 7
        }
    }

    function h(a, b, c) {
        if (a /= 360, b /= 100, c /= 100, 0 == b) c = b = a = c;
        else {
            var d = .5 > c ? c * (1 + b) : c + b - c * b,
                e = 2 * c - d;
            c = i(e, d, a + 1 / 3), b = i(e, d, a), a = i(e, d, a - 1 / 3)
        }
        return [Math.round(255 * c), Math.round(255 * b), Math.round(255 * a)]
    }

    function i(a, b, c) {
        return 0 > c && (c += 1), c > 1 && --c, 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a
    }
    var j = c.blur ? .5 * c.blur : 0,
        k = c.brightness ? .5 * c.brightness : 0,
        l = c.contrast ? .6 * c.contrast : 0,
        m = c.saturation ? c.saturation : 0;
    c.vignette ? .7 * c.vignette : 0;
    if ($("#" + b).length) n = document.getElementById(b);
    else {
        var n = document.createElement("canvas"),
            o = n.getContext("2d");
        n.setAttribute("data-caman-hidpi-disabled", !0), n.id = b, n.width = a.width, n.height = a.height, o.drawImage(a, 0, 0, n.width, n.height), $("#chaos-zone").append(n)
    }
    return DB.filterLocked ? void(DB.filterQueue[b] = {
        filter: c,
        img: a
    }) : void Caman(n, function() {
        if (this.revert(!1), k && 0 != k && this.brightness(k), l && 0 != l && this.contrast(l), m && 0 != m && (-100 == m ? this.greyscale() : this.saturation(m)), c.tint) {
            var a = g(c.tint + 100);
            this.colorize(a.color.r, a.color.g, a.color.b, 2.5 * a.strength)
        }
        if (j && 0 != j && (j > 0 ? this.stackBlur(j) : this.sharpen(-1 * j || 0)), c.xpro) {
            curvesFilter = f(c.xpro);
            var b = curvesFilter.red.map(e),
                h = curvesFilter.green.map(e),
                i = curvesFilter.blue.map(e);
            this.curves("r", b[0], b[1], b[2], b[3]), this.curves("g", h[0], h[1], h[2], h[3]), this.curves("b", i[0], i[1], i[2], i[3])
        }
        this.render(function() {
            d(n), setTimeout(function() {
                DB.filterLocked = !1, $(".page.selected .loading-elements").addClass("hidden")
            }, 400)
        })
    })
}

function rgb2hex(a) {
    function b(a) {
        var b = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
        return isNaN(a) ? "00" : b[(a - a % 16) / 16] + b[a % 16]
    }
    return a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/), "#" + b(a[1]) + b(a[2]) + b(a[3])
}

function rgb2object(a) {
    return a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/), {
        r: parseInt(a[1], 10),
        g: parseInt(a[2], 10),
        b: parseInt(a[3], 10)
    }
}

function element(a, b, c) {
    a && (this.elementIndex = a.elementIndex || -1, this.width = a.width || 0, this.height = a.height || 0, this.left = a.left || 0, this.top = a.top || 0, this.transparency = a.transparency || 0, this.rotation = a.rotation || 0, this.type = a.type || null, this.element = null, this.layoutId = a.mediaLayout || null), b && (this.pageWrap = b || null), c && (this.layoutId = c)
}

function imageElement(a, b, c) {
    element.call(this, a, b, c), this.backgroundColor = a.backgroundColor || null, this.isRecolorable = a.isRecolorable || !1, this.isBackground = a.isBackground || !1, this.isDark = a.isDark || !1, this.mediaId = a.mediaId || null, this.mediaVersion = a.mediaVersion || 0, this.flipOrientation = a.flipOrientation || 0, this.filter = a.filter || null, this.imageBox = a.imageBox || null, this.isCut = a.isCut || !1, this.onChange = !1
}

function gridElement(a, b, c) {
    element.call(this, a, b, c), this.items = a.items || null, this.contents = a.contents || null, this.spacing = a.spacing || 10, this.flipOrientation = a.flipOrientation || 0
}

function textElement(a, b, c) {
    element.call(this, a, b, c), this.style = a.style || "body", this.textTransform = a.textTransform || null, this.fontSize = a.fontSize || 16, this.fontFamily = a.fontFamily || "Open Sans", this.html = a.html || "body text", this.letterSpacing = a.letterSpacing || 0, this.lineHeight = a.lineHeight || 140, this.lineLengths = a.lineLengths || [], this.color = a.color || "#ffffff", this.bold = a.bold || null, this.italic = a.italic || null, this.justification = a.justification || "left"
}

function svgElement(a, b, c) {
    element.call(this, a, b, c), this.mediaId = a.mediaId || null, this.mediaVersion = a.mediaVersion || 0, this.fillColors = a.fillColors || null, this.scale = a.scale || null, this.contents = a.contents || [], c && _.each(this.contents, function(a, b) {
        a.mediaLayout = c
    })
}