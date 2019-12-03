! function() {
    function e(t) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(t)
    }

    function t(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function n(e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e
    }

    function r(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function a() {
        return (a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }).apply(this, arguments)
    }

    function o(e) {
        return function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
        }(e) || function(e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var s, d = "googima",
        l = "TYPE_API",
        u = "TYPE_SCHEDULE",
        c = "viewable",
        g = "-1",
        p = "adCompanions",
        h = "adError",
        f = "adStarted",
        m = 4096,
        v = 1e3,
        y = "instream",
        b = "article",
        w = (r(s = {}, [y], 1), r(s, ["banner"], 2), r(s, [b], 3), r(s, ["feed"], 4), r(s, ["floating"], 5), r(s, ["interstitial"], 5), r(s, ["slider"], 5), s),
        A = function(e) {
            var t = C("".concat(e, "Locator"));
            return null !== t && function(i, n, a, o) {
                var s = j();
                window.addEventListener("message", (function t(i) {
                    var n = i ? i.data : {};
                    if ("string" == typeof n) try {
                        n = JSON.parse(n)
                    } catch (e) {
                        n = {}
                    }
                    var r = "".concat(e, "Return");
                    n[r] && n[r].callId === s && (removeEventListener("message", t), a(n[r].returnValue, n[r].success))
                }), !1);
                var d = void 0 !== o ? "version" : "parameter",
                    l = r({}, ["".concat(e, "Call")], r({
                        command: i,
                        callId: s,
                        parameter: o
                    }, [d], n));
                t.postMessage(JSON.stringify(l), "*")
            }
        },
        P = new RegExp(/^[^/]*:\/\/\/?([^\/]*)/);

    function k(e) {
        var t = e.match(P);
        return t && t.length > 1 ? t[1] : ""
    }
    var C = function(e) {
            for (var t = window; t;) {
                try {
                    if (t.frames[e]) break
                } catch (e) {}
                t = t === window.top ? null : t.parent
            }
            return t
        },
        _ = new RegExp(/^[^:\/?#]+:?\/\/[^\/?#]+/);
    var I = /^(https?:\/\/).*.(?:ampproject.org|bing-amp.com)\/(?:.\/)*(.*)\/amp.*$/;
    var E = null,
        M = {
            gdprApplies: !0,
            consentData: ""
        },
        T = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
            return null === E && (E = new Promise((function(e) {
                var t = window.__tcfapi || A("__tcfapi");
                if (t) return t("getTCData", 2, (function(t, i) {
                    e(!1 !== i ? {
                        gdprApplies: t.gdprApplies,
                        consentData: t.tcString
                    } : null)
                }), null);
                var i = window.__cmp || A("__cmp");
                return i ? i("getConsentData", "1.1", e) : e({
                    gdprApplies: !1,
                    consentData: ""
                })
            })).then((function(e) {
                return e && (M = e), M
            }))), Promise.race([E, new Promise((function(t) {
                setTimeout(t, e, M)
            }))])
        },
        j = Date.now || function() {
            return (new Date).getTime()
        };

    function L(e) {
        var t = e.advertising;
        if (t && t.placement) {
            var i = t.placement.toLowerCase();
            if (w[i]) return w[i]
        }
        return w[t && t.outstream ? b : y]
    }

    function S() {
        var e, t, i = null !== document.referrer.match(_) ? (e = document.referrer, (t = e.match(I)) && t.length > 1 ? "".concat(t[1]).concat(t[2]) : e) : "";
        if (window.top !== window.self) {
            try {
                return {
                    url: window.top.location.href,
                    domain: window.top.document.domain,
                    referrer: i
                }
            } catch (e) {}
            return {
                url: i,
                domain: k(i),
                referrer: ""
            }
        }
        return {
            url: document.location.href,
            domain: document.domain,
            referrer: i
        }
    }

    function R(e, t) {
        if ("start" === e || "0%" === e) return "pre";
        if ("end" === e || "100%" === e) return "post";
        if ("string" == typeof e && ("pre" === e || "post" === e || e.indexOf("%") >= 0)) return e;
        var i = t.seconds(e);
        return "number" == typeof i && !isNaN(i) && i
    }

    function x(e, t) {
        var i = R(e, t);
        return "pre" === i ? 0 : "post" === i ? -1 : i
    }

    function D(e, t, i) {
        if (!e) return Promise.resolve(e);
        for (var n, r, a, o = t.getPlaylistItem() || {}, s = t.getConfig(), d = S(), l = e.replace("__random-number__", Math.random() * Math.pow(10, 18)).replace("__timestamp__", (new Date).getTime()).replace("__page-url__", encodeURIComponent(d.url)).replace("__referrer__", encodeURIComponent(d.referrer)).replace("__player-height__", t.getHeight() || s.height).replace("__player-width__", t.getWidth() || s.width).replace("__item-duration__", (n = t.getDuration(), r = 3, a = Math.pow(10, r), Math.round(n * a) / a)).replace("__jwpseg__", Array.isArray(o.jwpseg) ? o.jwpseg.join(",") : "").replace("__domain__", encodeURIComponent(d.domain)).replace("__placement__", L(s)).replace("__device-ua__", encodeURIComponent(navigator.userAgent)), u = (l = i.companiondiv && i.companiondiv.id ? l.replace("__companion-div__", i.companiondiv.id) : l.replace("__companion-div__", "")).match(new RegExp(/__item-[a-z 0-9 A-Z]*__/g)), c = 0; u && c < u.length; c++) {
            var g = u[c],
                p = g.substring(7, g.length - 2);
            if (o.hasOwnProperty(p) && t._.isString(o[p])) {
                var h = o[p],
                    f = i.truncateMacros ? v : m;
                h.length > f && (h = h.substring(0, f)), l = l.replace(g, encodeURIComponent(h))
            } else l = l.replace(g, "")
        }
        if (o.title && -1 === l.indexOf("vid_t=")) {
            var y = o.title.substring(0, 100).replace(/[^\x00-\x7F]/g, "");
            l += function(e) {
                return -1 !== e.indexOf("?") ? "&" : "?"
            }(l) + "vid_t=" + encodeURIComponent(y)
        }
        return -1 !== l.indexOf("__gdpr__") || -1 !== l.indexOf("__gdpr_consent__") ? T().then((function(e) {
            var t = e.gdprApplies,
                i = e.consentData;
            return l.replace("__gdpr__", t ? 1 : 0).replace("__gdpr_consent__", i)
        })).catch((function() {
            return l
        })) : Promise.resolve(l)
    }

    function O(e, t, i, n) {
        var r = B(e, i, n),
            o = t.getVastErrorCode ? t.getVastErrorCode() : t.code,
            s = t.getErrorCode ? t.getErrorCode() : t.adErrorCode;
        return s = s < 1e4 ? s + 2e4 : s || 60900, a(r, {
            message: "Ad Error: " + (t.getMessage ? t.getMessage() : t.message),
            code: o >= 100 && o <= 1008 ? o : 900,
            adErrorCode: s
        }), e && (20402 === s ? r.timeout = e.options.loadVideoTimeout : 21009 === s ? r.timeout = e.options.vastLoadTimeout : 60004 === s && (r.timeout = e.options.requestTimeout)), void 0 !== t.id && (r.id = t.id), void 0 !== t.placement && (r.placement = t.placement), t.getInnerError && (r.sourceError = t.getInnerError()), void 0 !== t.tag && (r.tag = t.tag), r
    }

    function B(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = {
                client: d
            },
            r = e && !e.destroyed();
        if (r) {
            var o = e.player;
            a(n, {
                placement: L(o.getConfig()),
                viewable: o.getViewable()
            }), t && (n.adposition = q(o))
        }
        var s = t ? t.getAdPodInfo() : null;
        if (s) {
            var l = s.getTotalAds();
            l > 1 && a(n, {
                sequence: s.getAdPosition(),
                podcount: l
            });
            var u = s.getTimeOffset();
            0 === u ? n.adposition = "pre" : -1 === u && (n.adposition = "post")
        }
        var c = r ? e.adsLoaderManager : i.loader;
        if (c) {
            var g = s ? s.getTimeOffset() : void 0 !== i.offset && i.offset || c.getTimeoffsetFromPosition_();
            a(n, {
                adBreakId: c.getAdBreakId(g),
                adPlayId: c.getAdPlayId(g, s ? s.getAdPosition() : void 0),
                id: c.getAdBreakId(g)
            });
            var p = c.getBid(g);
            if (p && a(n, p.getEventObject()), t) {
                var h = n.mediationLayerAdServer;
                if ("dfp" === h || "jwpdfp" === h) - 1 !== t.getWrapperAdSystems().concat(t.getAdSystem()).indexOf("SpotXJW") && n.bidders.forEach((function(e) {
                    e.winner = "SpotX" === e.name
                }));
                var f = c.userRequestContext;
                a(n, {
                    adposition: f && f.adPosition || n.adposition,
                    tag: c.getTag(t),
                    ima: {
                        ad: t,
                        userRequestContext: f
                    }
                })
            }
        }
        if (t) {
            a(n, {
                adtitle: t.getTitle(),
                adsystem: t.getAdSystem(),
                creativetype: t.getContentType(),
                duration: t.getDuration(),
                linear: t.isLinear() ? "linear" : "nonlinear",
                description: t.getDescription(),
                creativeAdId: t.getCreativeAdId(),
                adId: t.getAdId(),
                universalAdId: t.getUniversalAdIds().map((function(e) {
                    return {
                        universalAdIdRegistry: e.g,
                        universalAdIdValue: e.h
                    }
                }))
            });
            var m = t.getMediaUrl();
            m && (n.mediaFile = {
                file: m
            })
        }
        return void 0 !== i.offset && a(n, {
            adposition: n.adposition || i.offset,
            offset: i.offset
        }), n
    }

    function q(e) {
        return e.isBeforePlay() || 0 === e.getPosition() ? "pre" : e.isBeforeComplete() || e.getPosition() === e.getDuration() ? "post" : "mid"
    }

    function U(e, t) {
        var i, n, r, a, o, s = R(e, t);
        return s ? "number" != typeof s || isNaN(s) ? s : (i = parseInt(1e3 * s, 10), n = Math.floor(i) % 1e3, r = Math.floor(i / 1e3) % 60, a = Math.floor(i / 6e4) % 60, (o = (o = Math.floor(i / 36e5) % 24) < 10 ? "0" + o : o) + ":" + (a = a < 10 ? "0" + a : a) + ":" + (r = r < 10 ? "0" + r : r) + "." + (n = ("000" + n).slice(-3))) : "pre"
    }

    function N(e, t, i) {
        if (!i) return e;
        var n = e.indexOf("?") >= 0 ? "&" : "?",
            r = e.indexOf("cust_params="),
            a = "cust_params=".length,
            o = "",
            s = "";
        if (t.foreach(i, (function(e, t) {
            o = "".concat(o).concat(s).concat(e, "=").concat(t), s = "&"
        })), o = encodeURIComponent(o), r >= 0) {
            var d = e.substr(0, r + a),
                l = e.substr(r + a);
            return "".concat(d).concat(o, "%26").concat(l)
        }
        return "".concat(e).concat(n, "cust_params=").concat(o)
    }
    var V = function() {
            function e(i, n, r) {
                t(this, e), this.player = i, this.loader = n, this.options = r
            }
            return n(e, [{
                key: "getAdsResponse",
                value: function(e) {
                    var t = this,
                        i = document.implementation.createDocument("http://www.iab.net/videosuite/vmap", "vmap:VMAP", null),
                        n = i.documentElement;
                    return n.setAttribute("version", "1.0"), Object.keys(e).forEach((function(r) {
                        var a, o = e[r];
                        if (o.adm) {
                            if (null === function(e, t, i) {
                                var n = i.parseXML(t);
                                return n ? e.appendChild(n.documentElement) : null
                            }(a = i.createElement("vmap:VASTAdData"), o.adm, t.player.utils)) return void t.player.trigger(h, t._getParserErrorObject(o))
                        } else(a = i.createElement("vmap:AdTagURI")).appendChild(i.createCDATASection(o.tag));
                        var s = n.appendChild(i.createElement("vmap:AdBreak"));
                        s.setAttribute("breakId", r), s.setAttribute("breakType", o.type);
                        var d = o.offset.replace("pre", "start").replace("post", "end");
                        s.setAttribute("timeOffset", d);
                        var l = s.appendChild(i.createElement("vmap:AdSource"));
                        l.setAttribute("allowMultipleAds", "true"), l.setAttribute("followRedirects", "true"), l.setAttribute("id", "".concat(r, "-ad-1")), l.appendChild(a)
                    })), n.outerHTML || (new XMLSerializer).serializeToString(n)
                }
            }, {
                key: "normalize",
                value: function(e) {
                    var t = this,
                        i = this.player.utils;
                    "string" == typeof e && (e = {
                        0: {
                            tag: e
                        }
                    });
                    var n = Object.keys(e),
                        r = n.map((function(n) {
                            var r = e[n],
                                a = r.ad || r;
                            if (a.tag) return D(N(a.tag, i, a.custParams), t.player, t.options, a.custParams)
                        }));
                    return Promise.all(r).then((function(t) {
                        return n.reduce((function(n, r, a) {
                            var o = e[r],
                                s = o.ad || o,
                                d = t[a];
                            return n[r] = {
                                offset: U(s.offset || s.position || o.offset || "", i),
                                adm: s.adm,
                                tag: d,
                                type: s.type || o.type || "linear,nonlinear"
                            }, n
                        }), {})
                    }))
                }
            }, {
                key: "getTagMap",
                value: function(e) {
                    var t = this.player,
                        i = t.utils;
                    return Object.keys(e).reduce((function(n, r) {
                        var a = e[r],
                            o = R(a.offset, i);
                        return t._.isString(o) && (o = parseFloat(o.replace("pre", "0").replace("post", "-1"))), n[o] = {
                            offset: o,
                            adm: a.adm,
                            tag: a.tag
                        }, n
                    }), {})
                }
            }, {
                key: "_getParserErrorObject",
                value: function(e) {
                    return O(null, {
                        message: "XML parsing error",
                        code: 100,
                        adErrorCode: 20100,
                        placement: L(this.player.getConfig()),
                        tag: e.adm
                    }, null, {
                        loader: this.loader,
                        offset: e.offset
                    })
                }
            }]), e
        }(),
        z = {
            adPosition: "",
            autoplayadsmuted: !1,
            companiondiv: null,
            companionResourceType: "",
            debug: !1,
            enablePreloading: !1,
            loadVideoTimeout: 15e3,
            locale: "",
            maxRedirects: -1,
            preloadAds: !1,
            requestTimeout: 1e4,
            truncateMacros: !0,
            vastLoadTimeout: 1e4,
            vpaidcontrols: !1,
            vpaidmode: "insecure"
        };

    function H(e) {
        if ("true" === e) return !0;
        if ("false" === e) return !1;
        var t = parseFloat(e);
        return isNaN(t) ? e : t
    }
    var W = function() {
            function i(n, r) {
                for (var a in t(this, i), this.config = n, this.utils = r, this.bidsResponse = {}, z)
                    if (z.hasOwnProperty(a)) {
                        var o = n[a],
                            s = z[a],
                            d = e(s);
                        if (void 0 !== o) {
                            if ("boolean" !== d && "number" !== d || (o = H(o)), e(o) !== d) throw new Error("invalid parameter: " + a + " should be a " + d);
                            this[a] = o
                        } else this[a] = s
                    }
            }
            return n(i, [{
                key: "getSingleTagPrerollBlock",
                value: function() {
                    var e = this.getConfigSchedule(),
                        t = this.singleTagBidsResponse;
                    if ("string" == typeof e) {
                        if (!t) return e;
                        if (t.adm) return [{
                            adm: t.adm
                        }];
                        var i = t.custParams;
                        return N(t.tag, this.utils, i)
                    }
                    return null
                }
            }, {
                key: "addBidsResponse",
                value: function(e, t) {
                    var i;
                    i = e && !e.error && (e.adm || e.tag) ? e : null, t ? this.bidsResponse[t] = i : this.singleTagBidsResponse = i
                }
            }, {
                key: "resetBidsResponse",
                value: function() {
                    this.bidsResponse = {}, this.singleTagBidsResponse = null
                }
            }, {
                key: "getSchedule",
                value: function() {
                    var e = this,
                        t = this.getConfigSchedule();
                    if (!t) return t;
                    var i = this.utils.extend({}, t),
                        n = this.getSingleTagPrerollBlock();
                    return n || Object.keys(this.bidsResponse).reduce((function(t, i) {
                        var n = t[i],
                            r = e.bidsResponse[i];
                        return n && r && (t[i] = a({}, n, {
                            adm: r.adm,
                            tag: r.tag,
                            custParams: a({}, n.custParams, r.custParams)
                        })), t
                    }), i)
                }
            }, {
                key: "getConfigSchedule",
                value: function() {
                    var e = this.config;
                    return e.tag || this.adschedule || e.schedule || e.ad
                }
            }, {
                key: "getAdRules",
                value: function() {
                    var e = this.config.rules || {},
                        t = parseInt(e.frequency, 10);
                    return {
                        startOn: e.startOn || 1,
                        frequency: isNaN(t) ? 1 : t
                    }
                }
            }, {
                key: "setLocalizationOptions",
                value: function(e) {
                    var t = e.admessage,
                        i = e.cuetext,
                        n = e.podmessage,
                        r = e.loadingAd;
                    this.admessage = t, this.cuetext = i, this.podmessage = n, this.loadingAd = r
                }
            }]), i
        }(),
        F = function() {
            function e(i, n, r) {
                t(this, e), r.addClass(i, "jw-plugin-googima");
                var a = document.createElement("div");
                a.id = n + "_ad", a.className = "jw-ads-view", this.visible = !1, this.utils = r, this.div = i, this.adDiv = a, i.appendChild(a)
            }
            return n(e, [{
                key: "resizeNonLinear",
                value: function(e) {
                    this.resize(!1, e)
                }
            }, {
                key: "resizeLinear",
                value: function() {
                    this.resize(!0)
                }
            }, {
                key: "resize",
                value: function(e, t) {
                    var i = this.utils;
                    i.toggleClass(this.div, "jw-ad-non-linear", !e), i.toggleClass(this.div, "jw-ad-linear", e), i.style(this.div, {
                        height: t ? t + "px" : ""
                    })
                }
            }, {
                key: "getAdDiv",
                value: function() {
                    return this.adDiv
                }
            }, {
                key: "adSetup",
                value: function() {
                    this.visible = !0, this.utils.addClass(this.div, "jw-ad-instream"), this.resize(!0)
                }
            }, {
                key: "adTakeDown",
                value: function() {
                    this.visible = !1, this.utils.removeClass(this.div, "jw-ad-instream"), this.resize(!0)
                }
            }]), e
        }(),
        G = null;

    function J(e) {
        if (G) return G;
        if (window.google && google.ima && google.ima.AdDisplayContainer) return G = Promise.resolve();
        var t = ["//", "imasdk.googleapis.com/js/sdkloader/ima3.js"];
        "file:" === document.location.protocol && t.unshift("https:");
        var i = new(0, e.scriptloader)(t.join(""));
        return G = i.load()
    }
    var X = {};
    var K, $, Q, Y = function() {
            function e(i, n, r) {
                t(this, e), i.extend(this, n), this.vol = 0, this.imaProxy = null, this.view = r
            }
            return n(e, [{
                key: "setProxy",
                value: function(e) {
                    this.imaProxy = e, "boolean" == typeof this.muted && this.mute(this.muted)
                }
            }, {
                key: "attachMedia",
                value: function() {}
            }, {
                key: "detachMedia",
                value: function() {}
            }, {
                key: "mute",
                value: function(e) {
                    this.muted = e, this.imaProxy && (e ? this.imaProxy.setVolume(0) : this.vol && this.imaProxy.setVolume(this.vol)), this.muteAllAdContainerVideo(e)
                }
            }, {
                key: "muteAllAdContainerVideo",
                value: function(e) {
                    for (var t = this.view.getAdDiv().getElementsByTagName("video"), i = 0; i < t.length; i++) t[i].muted = e
                }
            }, {
                key: "volume",
                value: function(e) {
                    this.vol = e / 100, this.imaProxy && this.imaProxy.setVolume(this.vol)
                }
            }]), e
        }(),
        Z = 2e3,
        ee = 3500,
        te = "USD",
        ie = 1,
        ne = "//c.amazon-adsystem.com/aax2/apstag.js",
        re = "video",
        ae = "3.0.0",
        oe = "//js-sec.indexww.com/htv/htv-jwplayer.min.js",
        se = "//js.spotx.tv/directsdk/v1/",
        de = "//search.spotxchange.com/ad/vast.html?key=",
        le = "dfp",
        ue = "jwp",
        ce = "jwpspotx",
        ge = "jwpdfp",
        pe = ue,
        he = "APS",
        fe = "Index",
        me = "OpenRTB",
        ve = "SpotX",
        ye = (r(K = {}, [le], [he, "FAN", fe, me, ve]), r(K, [ue], ["FAN", me, ve]), r(K, [ge], ["FAN", me, ve]), r(K, [ce], [ve]), K),
        be = "Error loading script",
        we = (r($ = {}, ["EMX"], {
            endpoint: "https://hbint.emxdgt.com"
        }), r($, ["PubMatic"], {
            endpoint: "https://openbid.pubmatic.com/translator"
        }), r($, ["Telaria"], {
            endpoint: "https://jwplayer.eb.tremorhub.com/ad/rtb/jwp",
            preflight: !0
        }), $),
        Ae = 1,
        Pe = 2,
        ke = 1,
        Ce = 2,
        _e = 3,
        Ie = 4,
        Ee = 5,
        Me = 6,
        Te = 7,
        je = 8,
        Le = 1,
        Se = 2,
        Re = 3,
        xe = 4,
        De = 5,
        Oe = 6,
        Be = {
            BID_WON: 0,
            BID_BELOW_AUCTION_FLOOR: 100,
            LOST_TO_HIGHER_BID: 102
        },
        qe = "bid",
        Ue = "error",
        Ne = "invalid",
        Ve = "noBid",
        ze = (r(Q = {}, [Ve], 0), r(Q, [qe], 1), r(Q, ["timeout"], 2), r(Q, [Ne], 3), r(Q, ["abort"], 4), r(Q, [Ue], 5), Q),
        He = 550,
        We = 590,
        Fe = 599,
        Ge = {
            0: 500,
            400: 501,
            500: 503,
            597: 502
        },
        Je = [{
            message: "SpotX :: Unable to find ad",
            result: Ve,
            code: ze[Ve]
        }, {
            message: be,
            result: Ue,
            code: 6
        }, {
            message: "Invalid options: 'slot' is required",
            code: 300
        }, {
            message: "Invalid options: 'slot' must be part of DOM",
            code: 301
        }, {
            message: "Invalid options: 'channel_id' is required.",
            code: 302
        }, {
            message: "Invalid options: 'content_width' and 'content_height' are required when no 'video_slot' is provided.",
            code: 303
        }, {
            message: "Invalid options: 'content_width' provided but 'content_height' is not.",
            code: 304
        }, {
            message: "Invalid options: 'content_height' provided but 'content_width' is not.",
            code: 305
        }, {
            message: "Invalid options: 'custom' must be an object.",
            code: 306
        }, {
            message: "Invalid options: 'token' must be an object.",
            code: 307
        }, {
            message: "Invalid options: 'ados' must be an object.",
            code: 308
        }, {
            message: "Invalid options: 'contentPageUrl' must be a string.",
            code: 309
        }, {
            message: "Invalid options: 'demand_source_timeout' must be a number.",
            code: 310
        }, {
            message: "Invalid options: 'total_bid_timeout' must be a number.",
            code: 311
        }],
        Xe = 320,
        Ke = [{
            message: "Incorrect domain",
            code: 321
        }, {
            message: "unsupported_platform",
            code: 322
        }, {
            message: "Request_URL_noncompliant",
            code: 323
        }, {
            message: "Application not authorised for header bidding",
            code: 324
        }, {
            message: "pageurl is required",
            code: 325
        }, {
            message: "adformats",
            code: 326
        }],
        $e = Date.now || function() {
            return (new Date).getTime()
        };

    function Qe(e, t) {
        var i = (e || []).filter((function(e) {
            var i = e.min,
                n = e.max;
            return t >= (i || 0) && t <= (n || 1 / 0)
        }))[0];
        if (i) {
            var n = i.min ? Math.floor(100 * i.min) : 0,
                r = Math.floor(100 * t),
                a = i.increment >= .01 ? Math.floor(100 * i.increment) : 1;
            return (n + Math.floor((r - n) / a) * a) / 100
        }
        return parseFloat(t)
    }

    function Ye(e, t, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            r = e.createElement(t);
        return r.appendChild(e.createCDATASection(i)), Object.keys(n).forEach((function(e) {
            r.setAttribute(e, n[e])
        })), r
    }

    function Ze(e) {
        if ("start" === e || "0%" === e || !e || "pre" === e || "00:00:00" === e) return 0;
        if ("end" === e || "100%" === e || "post" === e) return -2;
        if ("string" == typeof e && e.indexOf("%") >= 0) return -1;
        var t = parseInt(e);
        return t >= 0 ? t : -1
    }

    function et(e, t) {
        return new t.scriptloader(e, !1, ee).load().catch((function() {
            return Promise.reject({
                message: be
            })
        }))
    }

    function tt(e) {
        return e.outerHTML || (new XMLSerializer).serializeToString(e)
    }
    var it = function(e) {
            var t = e.autoplay,
                i = e.mute,
                n = e.autoplayAdsMuted;
            if (t) {
                var r = i || n;
                return "viewable" === t ? r ? Oe : De : r ? Se : Le
            }
            return i ? xe : Re
        },
        nt = function(e, t) {
            return e.replace(/\$\{AUCTION_ID\}/g, t.id).replace(/\$\{AUCTION_BID_ID\}/g, t.bid || "").replace(/\$\{AUCTION_IMP_ID\}/g, t.imp).replace(/\$\{AUCTION_SEAT_ID\}/g, t.seat || "").replace(/\$\{AUCTION_AD_ID\}/g, t.ad || "").replace(/\$\{AUCTION_CURRENCY\}/g, t.cur)
        },
        rt = function(e, t, i) {
            var n = i ? i.priceInCents : "",
                r = t.priceInCents ? n / t.priceInCents : "",
                a = Be[i ? "LOST_TO_HIGHER_BID" : "BID_BELOW_AUCTION_FLOOR"];
            return e.replace(/\$\{AUCTION_PRICE\}/g, n / 100).replace(/\$\{AUCTION_MBR\}/g, r).replace(/\$\{AUCTION_LOSS\}/g, t.winner ? Be.BID_WON : a)
        },
        at = {
            postAuctionHandler: function(e, t) {
                if ((!t || t.winner) && e.result === qe) {
                    e.adm && (e.adm = rt(e.adm, e, t));
                    var i = e.winner ? e.custom.nurl : e.custom.lurl;
                    if (i)
                        if (e.winner && !e.adm) e.tag = rt(i, e, t);
                        else {
                            var n = new XMLHttpRequest;
                            n.open("POST", rt(i, e, t));
                            var r = we[e.name];
                            r && r.preflight && n.setRequestHeader("x-openrtb-version", "2.5"), n.withCredentials = !0, n.send(null)
                        }
                }
                return delete e.custom, e
            },
            requestBids: function(e, t, i, n) {
                var a = we[e.name];
                if (!a || !e.id || !e.pubid) return Promise.resolve({
                    result: Ne
                });
                var o, s, d = n.getURLParts(),
                    l = {
                        id: t.adPlayId,
                        imp: [{
                            id: "1",
                            displaymanager: "jwplayer",
                            tagid: e.id,
                            video: {
                                mimes: (o = ["video/mp4", "video/ogg", "video/webm", "video/aac", "application/vnd.apple.mpegurl"], s = document.createElement("video"), o.filter((function(e) {
                                    return s.canPlayType(e)
                                }))).concat("application/javascript"),
                                minduration: 3,
                                maxduration: 300,
                                protocols: [ke, Ce, _e, Te, Ie, Ee, Me, je],
                                w: t.playerWidth,
                                h: t.playerHeight,
                                startdelay: Ze(t.offset),
                                placement: t.placement,
                                linearity: 1,
                                playbackmethod: [it(t)],
                                api: [Ae, Pe]
                            },
                            bidfloorcur: t.floorPriceCurrency,
                            secure: "https:" === window.location.protocol ? 1 : 0
                        }],
                        site: {
                            domain: d.domain,
                            page: d.url,
                            ref: d.referrer,
                            publisher: {
                                id: e.pubid
                            }
                        },
                        device: {
                            ua: window.navigator.userAgent,
                            language: t.language.substring(0, 2)
                        },
                        at: 1
                    };
                if (void 0 !== t.skipoffset) {
                    var u = l.imp[0].video;
                    t.skipoffset >= 0 ? (u.skip = 1, u.skipmin = t.skipoffset + 2, u.skipafter = t.skipoffset) : u.skip = 0
                }
                return void 0 !== t.floorPriceCents && (l.imp[0].bidfloor = t.floorPriceCents / 100), (!0 === t.autoplay || "viewable" === t.autoplay && t.viewable) && (l.tmax = t.bidTimeout), t.jwpseg && (l.imp[0].video.ext = {
                    jwpseg: t.jwpseg
                }), n.getGDPRConsentData().then((function(e) {
                    var t = e.gdprApplies,
                        i = e.consentData;
                    l.regs = {
                        ext: {
                            gdpr: t ? 1 : 0
                        }
                    }, t && (l.user = {
                        ext: {
                            consent: i
                        }
                    })
                })).then((function() {
                    return new Promise((function(e) {
                        var t = new XMLHttpRequest;
                        t.onreadystatechange = function() {
                            4 === this.readyState && (e(this), t = null)
                        }, t.open("POST", a.endpoint), a.preflight && (t.setRequestHeader("content-type", "application/json"), t.setRequestHeader("x-openrtb-version", "2.5")), t.withCredentials = !0, t.send(JSON.stringify(l)), i.then((function() {
                            t && (t.abort(), t = null)
                        }))
                    }))
                })).then((function(i) {
                    if (200 === i.status) {
                        var a = JSON.parse(i.responseText),
                            o = t.floorPriceCurrency || te,
                            s = a.cur ? a.cur.toUpperCase() : o;
                        if (o !== s) return {
                            result: Ue,
                            code: 551
                        };
                        if (a.id === l.id && a.seatbid && a.seatbid.length) {
                            var d, u = a.seatbid.reduce((function(e, t) {
                                if (null === e && t && t.bid && t.bid.length) {
                                    var i = t.bid.filter((function(e) {
                                        return e.impid === l.imp[0].id
                                    }));
                                    if (i.length) return d = t.seat, i[0]
                                }
                                return e
                            }), null);
                            if (u) {
                                if (u.adm) {
                                    var c = n.parseXML(u.adm);
                                    if (null === c) return {
                                        result: Ne,
                                        code: 331
                                    };
                                    u.adm = tt(c.documentElement)
                                } else if (!u.nurl) return {
                                    result: Ne,
                                    code: 330
                                };
                                var g = {
                                        id: l.id,
                                        bid: a.bidid,
                                        imp: u.impid,
                                        seat: d,
                                        ad: u.adid,
                                        cur: s
                                    },
                                    p = {
                                        result: qe,
                                        priceInCents: 100 * u.price,
                                        priceCurrency: s,
                                        adm: u.adm ? nt(u.adm, g) : null,
                                        custom: {
                                            exp: u.exp,
                                            nurl: u.nurl ? nt(u.nurl, g) : null,
                                            lurl: u.lurl ? nt(u.lurl, g) : null
                                        }
                                    };
                                if (t.mediationLayerAdServer === le || t.mediationLayerAdServer === ge) {
                                    var h, f = n.genId(12),
                                        m = e.name.toLowerCase();
                                    p.adm || (p.adm = function(e, t) {
                                        return '\n<VAST version="4.0">\n    <Ad id="'.concat(e, '">\n        <Wrapper>\n            <AdSystem version="').concat("0.2.20", '">JWP</AdSystem>\n            <VASTAdTagURI><![CDATA[').concat(t, "]]></VASTAdTagURI>\n        </Wrapper>\n    </Ad>\n</VAST>\n")
                                    }(f, p.custom.nurl)), p.cacheKey = f, p.custParams = (r(h = {}, ["vpb_".concat(m, "_key")], f), r(h, ["vpb_".concat(m, "_bid")], Qe(t.buckets, u.price).toFixed(2)), h)
                                }
                                return p
                            }
                        }
                        return {
                            result: Ve,
                            code: void 0 !== a.nbr ? a.nbr + 400 : ze[Ve]
                        }
                    }
                    return 204 === i.status ? {
                        result: Ve
                    } : 400 === i.status ? {
                        result: Ne
                    } : {
                        result: Ue
                    }
                }))
            }
        };
    var ot = {
            requestBids: function(e, t, i, n) {
                var r = e.id,
                    a = n.getURLParts(),
                    o = function(e, t, i, n) {
                        return ["https://an.facebook.com/v2/placementbid.json?&placementids[]=".concat(e), "&playerwidth=".concat(t), "&playerheight=".concat(i), "&adformats[]=".concat(re), "&SDK[]=".concat(ae), "&pageurl=".concat(encodeURIComponent(n.url)), "$random=".concat(Math.random() * Math.pow(10, 18))].join("")
                    }(r, t.playerWidth, t.playerHeight, a);
                return function(e, t, i, n) {
                    return !!n && (e === le || t && i === te)
                }(t.mediationLayerAdServer, t.floorPriceCents, t.floorPriceCurrency || te, o) ? new Promise((function(e) {
                    var t = new XMLHttpRequest;
                    t.onreadystatechange = function() {
                        4 === this.readyState && (e(this), t = null)
                    }, t.open("GET", o), t.withCredentials = !0, t.send(null), i.then((function() {
                        t && (t.abort(), t = null)
                    }))
                })).then((function(e) {
                    if (200 !== e.status) return {
                        result: Ue,
                        message: "Invalid response (status ".concat(e.status, ")")
                    };
                    var i, n, o = JSON.parse(e.responseText),
                        s = o.errors,
                        d = o.request_id;
                    if (s && s.length) return {
                        result: Ne,
                        code: (i = s[0], n = Ke.filter((function(e) {
                            return i.indexOf(e.message) >= 0
                        }))[0], n ? n.code : Xe),
                        requestId: d
                    };
                    var l = o.bids;
                    if (!l || !l[r] || !l[r][0]) return {
                        result: Ve,
                        requestId: d
                    };
                    var u = l[r][0],
                        c = u.bid_price_cents,
                        g = u.bid_id;
                    if (t.mediationLayerAdServer === le || t.mediationLayerAdServer === ge) return {
                        result: qe,
                        tag: t.tag,
                        custParams: {
                            jwFANBidPrice: Qe(t.buckets, c / 100).toFixed(2),
                            jwFANBidID: g
                        },
                        requestId: d
                    };
                    var p = {
                        result: qe,
                        priceInCents: c,
                        priceCurrency: u.bid_price_currency,
                        requestId: d
                    };
                    return c >= t.floorPriceCents && (p.tag = function(e, t, i, n, r) {
                        return ["https://an.facebook.com/v1/instream/vast.xml?placementid=".concat(e), "&playerwidth=".concat(i), "&playerheight=".concat(n), "&SDK[]=".concat(ae), "&bidid=".concat(t), "&pageurl=".concat(encodeURIComponent(r.url))].join("")
                    }(r, g, t.playerWidth, t.playerHeight, a)), p
                })).catch((function(e) {
                    return {
                        result: Ue,
                        message: "FAN header bidding failed: ".concat(e)
                    }
                })) : Promise.resolve({
                    result: Ne
                })
            }
        },
        st = null;

    function dt(e) {
        return null === st && (st = Promise.resolve(window.apstag).then((function(t) {
            return t && t.init && t.fetchBids ? t : et(["file" === document.location.protocol ? "https:" : "", ne].join(""), e).then((function() {
                return window.apstag
            }))
        })).catch((function(e) {
            throw st = null, e
        }))), st
    }
    var lt, ut = null,
        ct = null;

    function gt(e, t) {
        if (null === ct) {
            var i = $e(),
                n = ut || window.SpotX;
            if (n && n.DirectAdOS) return ct = Promise.resolve({
                SpotX: n,
                loadingTime: 0
            });
            var r = ["file" === document.location.protocol ? "https:" : "", se, e, ".js"].join("");
            (ct = "function" == typeof require ? (a = r, new Promise((function(e, t) {
                setTimeout(t, ee), require([a], e, t)
            })).catch((function() {
                return Promise.reject({
                    message: be
                })
            }))).then((function(e) {
                return {
                    SpotX: ut = e,
                    loadingTime: $e() - i
                }
            })).catch((function() {
                return pt(r, i, t)
            })) : pt(r, i, t)).catch((function() {
                ct = null
            }))
        }
        var a;
        return ct
    }

    function pt(e, t, i) {
        return et(e, i).then((function() {
            return {
                SpotX: window.SpotX,
                loadingTime: $e() - t
            }
        }))
    }
    var ht = {
            postAuctionHandler: function(e) {
                return e.scriptLoadingTime = lt, e
            },
            requestBids: function(e, t, i, n) {
                if (!e.id) return Promise.resolve({
                    result: Ne,
                    code: 302
                });
                var r = {
                        placement: t.placement,
                        hide_skin: !0,
                        no_vpaid_ads: !1
                    },
                    o = {
                        channel_id: e.id,
                        slot: t.playerContainer,
                        content_width: t.playerWidth,
                        content_height: t.playerHeight,
                        player_vendor: "SpotXJW",
                        player_vendor_id: t.playerId,
                        ad_volume: t.adVolume,
                        ad_mute: t.mute ? 1 : 0,
                        autoplay: t.autoplay,
                        blocked_autoplay_override_mode: t.autoplayAdsMuted,
                        start_delay: Ze(t.offset)
                    },
                    s = a(r, e.optionalParams, o);
                return e.passFloorPrice && t.floorPriceCents && (s.price_floor = t.floorPriceCents / 100), t.jwpseg && (s.custom = s.custom || {}, s.custom.jwpseg = t.jwpseg), gt(e.id, n).then((function(e) {
                    var t = e.SpotX,
                        i = e.loadingTime;
                    lt = i;
                    var n = new t.DirectAdOS(s),
                        r = $e();
                    return n.getAdServerKVPs().then((function(e) {
                        return {
                            response: e,
                            bidNetworkStartTime: r
                        }
                    }))
                })).then((function(e) {
                    var i = e.response,
                        n = e.bidNetworkStartTime,
                        r = $e() - n,
                        o = i.spotx_ad_key,
                        s = {
                            spotx_bid: Qe(t.buckets, i.spotx_bid).toFixed(2),
                            spotx_ad_key: o
                        },
                        d = 100 * parseFloat(i.spotx_bid),
                        l = {
                            result: qe,
                            priceInCents: d,
                            custParams: s,
                            scriptLoadingTime: lt,
                            bidNetworkResponseTime: r
                        };
                    return t.mediationLayerAdServer === le ? l : a(l, {
                        tag: ["file:" === document.location.protocol ? "https:" : "", de, o].join(""),
                        tagKey: o
                    })
                })).catch((function(e) {
                    var t = Je.filter((function(t) {
                        return t.message === e.message
                    }))[0];
                    return t ? {
                        result: t.result || Ne,
                        code: t.code,
                        scriptLoadingTime: lt
                    } : {
                        result: Ue,
                        message: "SpotX header bidding failed: ".concat(e),
                        scriptLoadingTime: lt
                    }
                }))
            }
        },
        ft = null;

    function mt(e, t) {
        return null === ft && (ft = Promise.resolve(window.indexapi).then((function(i) {
            return i || et(["file" === document.location.protocol ? "https:" : "", e || oe].join(""), t).then((function() {
                return window.indexapi
            }))
        })).catch((function(e) {
            throw ft = null, e
        }))), ft
    }
    var vt, yt = {
            requestBids: function(e, t, i, n) {
                if (!e.id && !e.script) return Promise.resolve({
                    result: Ne
                });
                var r = a({
                    videoCommonArgs: {
                        protocols: [2, 3, 5, 6],
                        mimes: ["video/mp4", "video/webm", "application/javascript"],
                        apiList: [1, 2]
                    },
                    siteID: e.id
                }, e);
                return mt(e.script, n).then((function(e) {
                    return new Promise((function(i) {
                        e.deferQueue = e.deferQueue || [], e.deferQueue.push((function() {
                            e.solicitIndexVideoAds(t.tag, (function(e, t) {
                                i({
                                    updatedTag: e,
                                    indexTargeting: t
                                })
                            }), r)
                        }))
                    }))
                })).then((function(e) {
                    var i = e.indexTargeting;
                    return void 0 !== i ? {
                        result: qe,
                        tag: t.tag,
                        custParams: i
                    } : {
                        result: Ve
                    }
                })).catch((function(e) {
                    return {
                        result: Ue,
                        message: "Index Exchange header bidding failed: ".concat(e)
                    }
                }))
            }
        },
        bt = (r(vt = {}, [he], {
            requestBids: function(e, t, i, n) {
                return e.id && e.slotID ? dt(n).then((function(i) {
                    return i.init({
                        id: e.pubId,
                        adServer: e.adServer
                    }), new Promise((function(n) {
                        i.fetchBids({
                            slots: [{
                                slotID: e.slotID
                            }],
                            timeout: t.bidTimeout
                        }, n)
                    }))
                })).then((function(i) {
                    return i && i[0] && i[0].slotID === e.slotID ? {
                        result: qe,
                        tag: t.tag,
                        custParams: {
                            amznbid: i[0].amznbid,
                            amzniid: i[0].amzniid
                        }
                    } : {
                        result: Ve
                    }
                })).catch((function(e) {
                    return {
                        result: Ue,
                        message: "Amazon header bidding failed: ".concat(e)
                    }
                })) : Promise.resolve({
                    result: Ne
                })
            }
        }), r(vt, ["FAN"], ot), r(vt, [fe], yt), r(vt, [me], at), r(vt, [ve], ht), vt),
        wt = function(e, t) {
            var i = t.parseXML(e.adm);
            if (null === i) return e.adm;
            for (var n = t.getTrackingPixelURLs(e.name, e.cacheKey), r = n.impression, a = n.error, o = i.querySelectorAll("InLine,Wrapper"), s = 0; s < o.length; s += 1) o[s].appendChild(Ye(i, "Impression", r, {
                id: e.cacheKey
            })), o[s].appendChild(Ye(i, "Error", a));
            return tt(i)
        },
        At = function(e, t, i) {
            var n = e.filter((function(e) {
                return e && e.result === qe && e.adm && e.cacheKey
            }));
            return 0 === n.length ? Promise.resolve({
                bids: e
            }) : new Promise((function(e) {
                var r = n.map((function(e) {
                        return {
                            type: "xml",
                            ttlseconds: (e.custom || {}).exp || 86400,
                            value: i.getTrackingPixelURLs ? wt(e, i) : e.adm,
                            key: e.cacheKey
                        }
                    })),
                    a = $e(),
                    o = function(t) {
                        return function() {
                            e({
                                result: t,
                                code: this.status,
                                time: $e() - a | 0
                            }), s = null
                        }
                    },
                    s = new XMLHttpRequest;
                s.onreadystatechange = function() {
                    if (4 === this.readyState) {
                        var e = 200 === this.status ? qe : Ue;
                        o(e)()
                    }
                }, s.onabort = o("abort"), s.onerror = o(Ue), s.ontimeout = o("timeout"), s.open("POST", "https://vpb-cache.jwplayer.com/cache"), s.send(JSON.stringify({
                    puts: r
                })), t.then((function(e) {
                    var t = e.result;
                    s && (s.onabort = o(t), s.abort(), s = null)
                }))
            })).then((function(t) {
                var i = t.result,
                    r = t.code,
                    a = t.time;
                return n.forEach((function(e) {
                    var t, n;
                    e.result = i, e.result === Ue && (e.code = (t = r, n = 100 * parseInt(t / 100, 10), Ge[t] || Ge[n] || Fe))
                })), {
                    bids: e,
                    time: a
                }
            }))
        };
    var Pt = function() {
            function e() {
                var i = this,
                    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    r = n.settings,
                    o = void 0 === r ? {} : r,
                    s = n.bidders,
                    d = void 0 === s ? [] : s,
                    l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    u = arguments.length > 2 ? arguments[2] : void 0;
                t(this, e), this.settings = function(e, t) {
                    var i = a({
                        bidTimeout: Z,
                        buckets: [],
                        offset: "",
                        playerContainer: t.container,
                        playerHeight: t.height || 0,
                        playerWidth: t.width || 0,
                        tag: "",
                        placement: 1
                    }, t, e);
                    return ye[i.mediationLayerAdServer] || (i.mediationLayerAdServer = pe), i.mediationLayerAdServer === ce && (i.floorPriceCents = ie), i.floorPriceCurrency ? i.floorPriceCurrency = i.floorPriceCurrency.toUpperCase() : void 0 !== i.floorPriceCents && (i.floorPriceCurrency = te), i
                }(o, l), this.utils = u, this.eventProps = {};
                var c = 0 === Ze(this.settings.offset),
                    g = this.settings.mediationLayerAdServer === ue || this.settings.mediationLayerAdServer === ge,
                    p = ye[this.settings.mediationLayerAdServer];
                this.bidders = d.filter((function(e) {
                    return (!isNaN(parseFloat(i.settings.floorPriceCents)) || !g) && (-1 !== p.indexOf(e.type || e.name) && (c || e.type === me || e.name === ve))
                })).map((function(e) {
                    return e.name === he && e.id && e.slotID ? dt(u) : e.name === fe && (e.script || e.id) ? mt(e.script, u) : e.name === ve && e.id && gt(e.id, u), a(e, e.custom_params)
                })), this._bidRequest = null, this._currentTimeout = null, this._onCancelTrigger = null, this.onCancel = new Promise((function(e) {
                    i._onCancelTrigger = e
                }))
            }
            return n(e, [{
                key: "start",
                value: function() {
                    var e, t, i, n, r, o, s, d, l, u, c, g;
                    return this._bidRequest || (this._bidRequest = (e = {
                        bidders: this.bidders,
                        eventProps: this.eventProps,
                        settings: this.settings,
                        onCancel: this.onCancel,
                        utils: this.utils
                    }, t = e.bidders, i = e.eventProps, n = e.settings, r = e.onCancel, o = e.utils, s = n.mediationLayerAdServer === le || n.mediationLayerAdServer === ge, d = n.mediationLayerAdServer === ue || n.mediationLayerAdServer === ge || n.mediationLayerAdServer === ce, l = [], u = null, c = null, g = t.map((function(e, t) {
                        var g = $e(),
                            p = Promise.race([bt[e.type || e.name].requestBids(e, n, r, o), r]).then((function(t) {
                                var i = a({}, e, t, {
                                    timeForBidResponse: $e() - g | 0
                                }, d && {
                                    winner: !1
                                });
                                return d && i.result === qe && i.priceInCents >= n.floorPriceCents && (null === c || i.priceInCents > c.priceInCents) && (c = i), i
                            })).catch((function(t) {
                                return a({}, e, {
                                    result: Ue,
                                    code: He,
                                    message: t,
                                    timeForBidResponse: $e() - g | 0
                                })
                            }));
                        return s && e.type === me ? (l[t] = p, p.then((function(e) {
                            return null === u && (u = Promise.all(l).then((function(e) {
                                return null !== c ? e : At(e, r, o).then((function(e) {
                                    var t = e.bids,
                                        n = e.time;
                                    return i.timeForVPBCache = n, t
                                }))
                            }))), u.then((function(e) {
                                return e[t]
                            })).catch((function(t) {
                                return a(e, {
                                    result: Ue,
                                    code: We,
                                    message: t
                                })
                            }))
                        }))) : p
                    })), Promise.all(g).then((function(e) {
                        if (d && c) return c.winner = !0, {
                            bidders: e,
                            result: c
                        };
                        if (s) {
                            var t = e.reduce((function(e, t) {
                                    return t.result === qe ? a(e || {}, t.custParams) : e
                                }), null),
                                i = {
                                    bidders: e
                                };
                            return null !== t && (i.result = {
                                tag: n.tag,
                                custParams: t
                            }), i
                        }
                        return {
                            bidders: e
                        }
                    })).then((function(e) {
                        return e.bidders = e.bidders.map((function(t) {
                            t.code = t.code || ze[t.result];
                            var i = bt[t.type || t.name];
                            return "function" == typeof i.postAuctionHandler ? i.postAuctionHandler(t, e.result) : t
                        })), a(t, e.bidders), e
                    })))), this._bidRequest
                }
            }, {
                key: "stop",
                value: function() {
                    var e = this;
                    clearTimeout(this._currentTimeout), this._onCancelTrigger({
                        result: "abort"
                    }), this._bidRequest = null, this._currentTimeout = null, this._onCancelTrigger = null, this.onCancel = new Promise((function(t) {
                        e._onCancelTrigger = t
                    }))
                }
            }, {
                key: "getEventObject",
                value: function() {
                    var e = this.settings.mediationLayerAdServer,
                        t = {
                            bidsVersion: "0.2.20",
                            mediationLayerAdServer: e,
                            bidders: o(this.bidders),
                            bidTimeout: this.settings.bidTimeout
                        };
                    e !== ue && e !== ge || (t.floorPriceCents = +this.settings.floorPriceCents || 0);
                    var i = this.settings.floorPriceCurrency;
                    return i && (t.floorPriceCurrency = i), void 0 !== this.eventProps.timeForVPBCache && (t.timeForVPBCache = this.eventProps.timeForVPBCache), t
                }
            }, {
                key: "then",
                value: function(e) {
                    return this._bidRequest ? this._bidRequest.then(e, e) : null
                }
            }, {
                key: "timeout",
                value: function() {
                    clearTimeout(this._currentTimeout), this._currentTimeout = setTimeout(this._onCancelTrigger, this.settings.bidTimeout, {
                        result: "timeout"
                    })
                }
            }]), e
        }(),
        kt = function() {
            return null
        },
        Ct = function() {
            function e(i, n, r, a, o, s, d) {
                t(this, e), r.utils.extend(this, r.Events), this.item = i, this.options = n, this.player = r, this.env = r.getEnvironment(), this.utils = r.utils, this.instreamProvider = a, this.view = o, this.initAdsManagerPromise = null, this.blockingInstreamPlayer = null, this.currentAd = null, this.bids = [], this.timeoutAdStart = -1, this.progressIntervalId = -1, this.viewablePlayedTime = 0, this.lastPosition = null, this.adViewableImpressionHandler = kt, this.fullscreenIcon = r.getContainer().querySelector(".jw-icon-fullscreen"), this.adsLoaderManager = s, this.playbackProxy = {
                    currentTime: 0,
                    duration: 0
                }, this.video = d, this.paused = !1, this.hasPreroll = !0, this.reason = null, this._qoe = new r.utils.Timer, this.debugConsoleLog = kt, n.debug && (this.debugConsoleLog = function() {
                    var e;
                    (e = console).log.apply(e, arguments)
                })
            }
            return n(e, [{
                key: "startBid",
                value: function(e, t, i) {
                    var n = this,
                        r = this.player,
                        a = r.getPlugin("jwpsrv"),
                        o = this.utils.extend({}, e.config.bids),
                        s = t.offset,
                        d = r.getConfig(),
                        l = new Pt(o, {
                            adPlayId: this.adsLoaderManager.getAdPlayId(s),
                            tag: t.tag,
                            offset: s,
                            width: r.getWidth(),
                            height: r.getHeight(),
                            container: r.getContainer(),
                            playerId: r.id,
                            autoplay: d.autostart,
                            autoplayAdsMuted: e.autoplayadsmuted,
                            adVolume: r.getVolume(),
                            mute: r.getMute(),
                            outstream: !!d.advertising && d.advertising.outstream,
                            placement: L(d),
                            language: e.locale || d.language,
                            viewable: 1 === r.getViewable(),
                            jwpseg: this.item.jwpseg
                        }, {
                            genId: this.utils.genId,
                            getGDPRConsentData: T,
                            getTrackingPixelURLs: a ? a.getTrackingPixelURLs : null,
                            getURLParts: S,
                            parseXML: this.utils.parseXML,
                            scriptloader: this.utils.scriptloader
                        });
                    return this.bids.push(l), l.start(), Promise.resolve().then((function() {
                        return n.adsLoaderManager.setBid(s, l), n.trigger("adBidRequest", B(n, null, {
                            offset: s
                        })), l.then((function(t) {
                            var r = t.result;
                            if (n.destroyed()) return null;
                            e.addBidsResponse(r, i), n.trigger("adBidResponse", B(n, null, {
                                offset: s
                            }))
                        }))
                    }))
                }
            }, {
                key: "init",
                value: function(e, t) {
                    var i = this,
                        n = t.config.bids;
                    if (n) {
                        var r = t.getSchedule();
                        if ("string" == typeof r) this.startBid(t, {
                            tag: r,
                            offset: "pre"
                        });
                        else {
                            var a = parseInt(n.bidOnBreaks);
                            a = a > 0 ? a : 1 / 0, Object.keys(r).slice(0, a).forEach((function(e) {
                                i.startBid(t, r[e], e)
                            }))
                        }
                    }
                    var o = this.adsLoaderManager;
                    return this.initAdsManagerPromise = J().then((function() {
                        return i.destroyed() ? null : (i.debugConsoleLog("[JW DEBUG] Open adsLoaderManager"), o.open(e, t, i.video))
                    })).then((function(e) {
                        if (i.destroyed()) return null;
                        var n = o.getAdsManager(e, i.playbackProxy, i.options);
                        i.instreamProvider.setProxy(n), o.bindEvents({
                            LOADED: i.adLoaded.bind(i),
                            AD_ERROR: i.adError.bind(i),
                            CONTENT_PAUSE_REQUESTED: i.pauseRequested.bind(i),
                            CONTENT_RESUME_REQUESTED: i.resumeRequested.bind(i),
                            LOG: i.adLog.bind(i),
                            STARTED: i.adStarted.bind(i),
                            IMPRESSION: i.adImpression.bind(i),
                            LINEAR_CHANGED: i.resize.bind(i),
                            CLICK: i.adClick.bind(i),
                            PAUSED: i.adPaused.bind(i),
                            RESUMED: i.adResumed.bind(i),
                            SKIPPED: i.adSkipped.bind(i),
                            USER_CLOSE: i.adUserClose.bind(i),
                            ALL_ADS_COMPLETED: i.allAdsCompleted.bind(i)
                        });
                        var r = n.getCuePoints(),
                            a = -1 !== r.indexOf(0);
                        if (!t.preloadAds || !a) {
                            var s = i.player.getSafeRegion(!1),
                                d = s.width,
                                l = s.height,
                                u = i.getViewMode();
                            i.debugConsoleLog("[JW DEBUG] adsManager init with", d, l, u), o.init(d, l, u)
                        }
                        if (r.length) {
                            var c = r.filter((function(e) {
                                return e > 0
                            })).map((function(e) {
                                return {
                                    begin: e,
                                    text: i.options.cuetext
                                }
                            }));
                            i.player.addCues(c)
                        }
                        var g = "string" == typeof o.schedule;
                        return i.hasPreroll = g && 0 === r.length || a, n
                    })).catch((function(e) {
                        throw i.asyncError && i.asyncError(e), e
                    })), this.initAdsManagerPromise
                }
            }, {
                key: "getViewMode",
                value: function() {
                    var e = google.ima.ViewMode;
                    return this.player.getFullscreen() ? e.FULLSCREEN : e.NORMAL
                }
            }, {
                key: "prepareToPlayAd",
                value: function(e) {
                    if (!this.destroyed())
                        if (this.blockingInstreamPlayer) {
                            var t = e ? "" : this.options.loadingAd;
                            this.blockingInstreamPlayer.setText(t)
                        } else clearTimeout(this.timeoutAdStart), this.startBlocking(e), this.muteInstreamProvider()
                }
            }, {
                key: "requestAds",
                value: function(e, t) {
                    var i = this,
                        n = this.bids.concat(J());
                    Promise.all(n).then((function() {
                        if (!i.destroyed()) return null === i.adsLoaderManager.adsRequest ? (i.debugConsoleLog("[JW DEBUG] Request ads to IMA SDK"), i.adsLoaderManager.requestAds(e, t, i.options)) : void 0
                    })).catch((function(e) {
                        i.asyncError && i.asyncError(e)
                    }))
                }
            }, {
                key: "muteInstreamProvider",
                value: function() {
                    var e = this.video.muted || this.player.getMute();
                    this.debugConsoleLog("[JW DEBUG] Setting mute on instreamProvider", e), this.instreamProvider.mute(e)
                }
            }, {
                key: "exitFullscreenOnInlineIOS",
                value: function() {
                    if (this.env.OS.iOS && !(this.env.Browser.version.major < 10)) {
                        var e = this.player.getContainer();
                        e.requestFullscreen || e.webkitRequestFullscreen || (this.debugConsoleLog("[JW DEBUG] Exiting fullscreen mode on iOS 10 or 11"), this.player.setFullscreen(!1), this.utils.style(this.fullscreenIcon, {
                            display: "none"
                        }))
                    }
                }
            }, {
                key: "startBlocking",
                value: function(e) {
                    var t = this;
                    if (!this.blockingInstreamPlayer && !this.destroyed()) {
                        this.debugConsoleLog("[JW DEBUG] JW Player startBlocking"), this.exitFullscreenOnInlineIOS(), this._qoe.tick("adLoading"), this.utils.addClass(this.player.getContainer(), "jw-flag-ads-googleima"), this.blockingInstreamPlayer = this.player.createInstream().init();
                        var i = e ? "" : this.options.loadingAd;
                        this.blockingInstreamPlayer.setText(i), this.blockingInstreamPlayer.applyProviderListeners(this.instreamProvider), this.view.adSetup(), clearTimeout(this.timeoutAdStart), this.timeoutAdStart = setTimeout((function() {
                            t.bids.forEach((function(e) {
                                return e.stop()
                            })), t.debugConsoleLog("[JW DEBUG] Ad request timeout"), t.destroyed() || (t.asyncError = null, t.handleAdError({
                                message: "Ad Request timeout after ".concat(t.options.requestTimeout, " milliseconds"),
                                getErrorCode: function() {
                                    return 60004
                                }
                            }), t.asyncDiscardAdBreak())
                        }), this.options.requestTimeout)
                    }
                }
            }, {
                key: "stopBlocking",
                value: function() {
                    this.destroyed() || (this.debugConsoleLog("[JW DEBUG] JW Player stopBlocking"), this.player.off("viewable", null, this), clearTimeout(this.timeoutAdStart), this.utils.style(this.fullscreenIcon, {
                        display: ""
                    }), this.utils.removeClass(this.player.getContainer(), ["jw-flag-ads-vpaid", "jw-flag-ads-vpaid-controls", "jw-flag-ads-googleima"]), this.blockingInstreamPlayer && (this.instreamProvider.off(), this.blockingInstreamPlayer.destroy(), this.blockingInstreamPlayer = null))
                }
            }, {
                key: "pauseRequested",
                value: function(e) {
                    var t = this;
                    this.prepareToPlayAd();
                    var i = e && e.getAd();
                    this.blockingInstreamPlayer.on("destroyed", (function() {
                        t.player.trigger("adBreakEnd", B(t, i))
                    }));
                    var n = B(this, i);
                    this.player.trigger("adBreakStart", n), this.player.trigger("adItem", n)
                }
            }, {
                key: "resumeRequested",
                value: function() {
                    this.debugConsoleLog("[JW DEBUG] ResumeRequest from IMA SDK"), this.currentAd && this.currentAd.isLinear() && this.finishAd(), this.blockingInstreamPlayer && this.view.adTakeDown(), this.stopBlocking()
                }
            }, {
                key: "finishAd",
                value: function() {
                    this.currentAd && (clearInterval(this.progressIntervalId), this.viewablePlayedTime = 0, this.currentAd = null)
                }
            }, {
                key: "discardAdBreak",
                value: function(e) {
                    !e && this.adsLoaderManager && (e = this.adsLoaderManager.adsManager), !this.destroyed() && e && (0 === e.getCuePoints().length ? this.destroy() : (e.discardAdBreak(), e.stop()))
                }
            }, {
                key: "asyncDiscardAdBreak",
                value: function() {
                    var e = this;
                    this.initAdsManagerPromise && this.initAdsManagerPromise.then((function(t) {
                        return e.discardAdBreak(t)
                    })).catch(kt)
                }
            }, {
                key: "pause",
                value: function(e) {
                    var t = e.reason;
                    if (!this.destroyed()) {
                        var i = this.adsLoaderManager.adsManager;
                        i && (this.viewablePlayedTime = 0, this.debugConsoleLog("[JW DEBUG] JW Player pause ad"), this.reason = t || "external", i.pause())
                    }
                }
            }, {
                key: "resume",
                value: function(e) {
                    var t = e.reason;
                    if (!this.destroyed()) {
                        var i = this.adsLoaderManager.adsManager;
                        i && (this.debugConsoleLog("[JW DEBUG] JW Player resume ad"), this.reason = t || "external", i.resume())
                    }
                }
            }, {
                key: "beforePlay",
                value: function(e) {
                    var t = this;
                    if (this.initAdsManagerPromise) {
                        this.reason = e && e.playReason ? e.playReason : "external", this.bids.forEach((function(e) {
                            return e.timeout()
                        })), this.player.off("beforePlay", null, this);
                        var i = !!e;
                        this.hasPreroll && this.prepareToPlayAd(i), this.adsLoaderManager.initializeDisplay({
                            restrict: !0
                        }), this._qoe.tick("adBeforePlay"), this.initAdsManagerPromise.then((function() {
                            if (!t.destroyed()) {
                                var e = t.adsLoaderManager;
                                if (!e.initialized) {
                                    var i = t.player.getSafeRegion(!1),
                                        n = i.width,
                                        r = i.height,
                                        a = t.getViewMode();
                                    t.debugConsoleLog("[JW DEBUG] adsManager init with", n, r, a), e.init(n, r, a)
                                }
                                t.debugConsoleLog("[JW DEBUG] Start adsManager"), e.start(), !t.hasPreroll && t.blockingInstreamPlayer && (t.debugConsoleLog("[JW DEBUG] Stop blocking since there is no preroll"), t.view.adTakeDown(), t.stopBlocking())
                            }
                        })).catch(kt)
                    }
                }
            }, {
                key: "beforeComplete",
                value: function() {
                    var e = this.adsLoaderManager.adsManager;
                    e && e.getCuePoints().indexOf(-1) > -1 && this.prepareToPlayAd(), this.adsLoaderManager.unbindEvents(["CONTENT_RESUME_REQUESTED"]), this.playbackProxy.currentTime = this.playbackProxy.duration, this.debugConsoleLog("[JW DEBUG] Call contentComplete on IMA SDK"), this.adsLoaderManager.contentComplete()
                }
            }, {
                key: "time",
                value: function(e) {
                    this.playbackProxy.currentTime = e.position, e.duration >= e.position ? this.playbackProxy.duration = e.duration : this.playbackProxy.duration = 1 / 0
                }
            }, {
                key: "resize",
                value: function() {
                    var e = this.currentAd,
                        t = this.adsLoaderManager.adsManager;
                    if (t) {
                        var i = e && !e.isLinear(),
                            n = this.player.getSafeRegion(i);
                        if (i) {
                            var r = e.getHeight();
                            r = this.player.getFullscreen() ? n.height / 2 : Math.max(100, r + 10), this.debugConsoleLog("[JW DEBUG] Resize adsManager", n.width, r, this.getViewMode()), t.resize(n.width, r, this.getViewMode()), this.view.resizeNonLinear(r)
                        } else this.debugConsoleLog("[JW DEBUG] Resize adsManager", n.width, n.height, this.getViewMode()), t.resize(n.width, n.height, this.getViewMode()), this.view.resizeLinear()
                    }
                }
            }, {
                key: "setState",
                value: function(e, t, i) {
                    if (e.isLinear()) {
                        var n = B(this, e);
                        if (n.newstate = t, n.oldstate = i, null !== this.reason) n["playing" === t ? "playReason" : "pauseReason"] = this.reason, this.reason = null;
                        this.instreamProvider.trigger("state", n)
                    }
                }
            }, {
                key: "progressInterval",
                value: function(e, t) {
                    var i = this;
                    if (clearInterval(this.progressIntervalId), t) {
                        var n = e.getAdId(),
                            r = -1,
                            a = this.options.admessage || "",
                            o = this.options.podmessage || "",
                            s = new RegExp("__AD_POD_CURRENT__", "g"),
                            d = new RegExp("__AD_POD_LENGTH__", "g");
                        this.progressIntervalId = setInterval((function() {
                            if (i.currentAd && i.currentAd.getAdId() === n) {
                                var e = t.getRemainingTime();
                                if (!(isNaN(e) || e <= 0) && r !== e) {
                                    r = e;
                                    var l = i.currentAd.getDuration(),
                                        u = l - e,
                                        c = Math.round(l - u);
                                    if (i.blockingInstreamPlayer) {
                                        var g = a.replace(/(\b)xx(s?\b)/g, "$1".concat(c, "$2")),
                                            p = i.currentAd.getAdPodInfo(),
                                            h = p.getTotalAds();
                                        if (h > 1) {
                                            var f = p.getAdPosition();
                                            g = o.replace(s, f).replace(d, h) + "  " + g
                                        }
                                        i.blockingInstreamPlayer.setText(g), i.instreamProvider.trigger("time", {
                                            duration: l,
                                            position: u
                                        })
                                    }
                                    if (l > 0) {
                                        var m = B(i, i.currentAd);
                                        m.position = u, m.duration = l, i.adViewableImpressionHandler(m), i.trigger("adTime", m)
                                    }
                                }
                            } else clearInterval(i.progressIntervalId)
                        }), 250)
                    }
                }
            }, {
                key: "adLoaded",
                value: function(e) {
                    this.trigger("adRequest", B(this, e.getAd()))
                }
            }, {
                key: "adStarted",
                value: function(e) {
                    this.paused = !1, this.currentAd = e.getAd(), this.trigger(f, B(this, this.currentAd))
                }
            }, {
                key: "adImpression",
                value: function(e) {
                    var t = this;
                    this.view.adSetup();
                    var i = e.getAd(),
                        n = i.isLinear(),
                        r = n && (i.getContentType().indexOf("image") >= 0 || -1 === i.getDuration()),
                        a = this.isVpaidAd(i),
                        o = n && a && this.options.vpaidcontrols;
                    this.currentAd = i, this.blockingInstreamPlayer && this.blockingInstreamPlayer.setSkipOffset(i.getSkipTimeOffset()), this.adsLoaderManager.bindEvents({
                        COMPLETE: this.adComplete.bind(this)
                    }), a && this.env.OS.mobile && this.options.autoplayadsmuted && this.adsLoaderManager.bindEvents({
                        VOLUME_CHANGED: function() {
                            t.adsLoaderManager.unbindEvents(["VOLUME_CHANGED"]), t.player.setMute(0 === t.adsLoaderManager.adsManager.getVolume())
                        }
                    }), r ? this.startBlocking() : n || this.stopBlocking(), this.utils.toggleClass(this.player.getContainer(), "jw-flag-ads-vpaid", n && (r || a)), this.utils.toggleClass(this.player.getContainer(), "jw-flag-ads-vpaid-controls", o), this.resize(), this.muteInstreamProvider(), clearTimeout(this.timeoutAdStart);
                    var s = this.adsLoaderManager.adsManager;
                    this.progressInterval(i, s);
                    var d = B(this, i),
                        l = void 0 === d.podcount || 1 === d.sequence;
                    "pre" === d.adposition && l && (this._qoe.tick("adImpression"), d.timeLoading = this._qoe.between("adBeforePlay", "adImpression")), n && !l && this.trigger("adItem", d), this.trigger("adImpression", d), this.setupViewableListener(), this.setState(i, "playing", "buffering")
                }
            }, {
                key: "setupViewableListener",
                value: function() {
                    this.player.off("viewable", this.viewableHandler, this), this.player.on("viewable", this.viewableHandler, this), this.viewableHandler({
                        viewable: this.player.getViewable()
                    })
                }
            }, {
                key: "adViewableHandler",
                value: function(e) {
                    var t = e.position;
                    null === this.lastPosition && (this.lastPosition = t);
                    var i = t - this.lastPosition;
                    this.lastPosition = t, i = Math.min(Math.max(0, i), 4), this.viewablePlayedTime += i, this.viewablePlayedTime >= 2 && (this.player.off("viewable", this.viewableHandler, this), this.adViewableImpressionHandler = kt, this.trigger("adViewableImpression", B(this, this.currentAd)))
                }
            }, {
                key: "viewableHandler",
                value: function(e) {
                    e.viewable ? (this.viewablePlayedTime = 0, this.lastPosition = null, this.adViewableImpressionHandler = this.adViewableHandler) : this.adViewableImpressionHandler = kt
                }
            }, {
                key: "adComplete",
                value: function(e) {
                    this.finishAd(), this.trigger("adComplete", B(this, e.getAd())), this.adsLoaderManager.unbindEvents(["VOLUME_CHANGED"])
                }
            }, {
                key: "adClick",
                value: function(e) {
                    var t = this.adsLoaderManager.adsManager,
                        i = e.getAd();
                    this.reason = "clickthrough", this.isVpaidAd(i) || (this.debugConsoleLog("[JW DEBUG] Ad paused due to ad click"), t.pause()), this.trigger("adClick", B(this, i))
                }
            }, {
                key: "adPaused",
                value: function(e) {
                    if (!this.paused) {
                        this.paused = !0;
                        var t = e.getAd();
                        null === this.reason && this.isVpaidAd(t) && (this.reason = "external"), this.setState(t, "paused")
                    }
                }
            }, {
                key: "adResumed",
                value: function(e) {
                    if (this.paused) {
                        this.paused = !1;
                        var t = e.getAd();
                        null === this.reason && this.isVpaidAd(t) && (this.reason = "external"), this.setState(t, "playing")
                    }
                }
            }, {
                key: "adSkipped",
                value: function(e) {
                    this.debugConsoleLog("[JW DEBUG] AdSkipped"), this.adsLoaderManager.unbindEvents(["COMPLETE", "VOLUME_CHANGED"]), this.finishAd(), this.trigger("adSkipped", B(this, e.getAd()))
                }
            }, {
                key: "adUserClose",
                value: function(e) {
                    this.debugConsoleLog("[JW DEBUG] AdUserClose"), this.currentAd && this.currentAd.isLinear() && -1 === this.currentAd.getDuration() ? this.adSkipped(e) : (this.adsLoaderManager.unbindEvents(["COMPLETE", "VOLUME_CHANGED"]), this.finishAd())
                }
            }, {
                key: "allAdsCompleted",
                value: function() {
                    this.resumeRequested(), this.view.adTakeDown(), this.stopAdsManager()
                }
            }, {
                key: "stopAdsManager",
                value: function() {
                    var e = this;
                    this.initAdsManagerPromise.then((function(t) {
                        e.destroyed() || (e.debugConsoleLog("[JW DEBUG] Stop IMA SDK adsManager"), t.stop(), t.destroy(), e.initAdsManagerPromise = null, e.bids = [])
                    })).catch(kt)
                }
            }, {
                key: "adLog",
                value: function(e) {
                    this.debugConsoleLog("[JW DEBUG]", e.type, e);
                    var t = e.getAdData(),
                        i = t && t.adError;
                    i && 402 === i.getVastErrorCode() ? this.handleAdError(i, e) : i && this.trigger(h, O(this, i, e.getAd()))
                }
            }, {
                key: "adError",
                value: function(e) {
                    this.handleAdError(e.getError(), e)
                }
            }, {
                key: "asyncError",
                value: function(e) {
                    var t = this;
                    if (!this.destroyed())
                        if (clearTimeout(this.timeoutAdStart), this.timeoutAdStart = setTimeout((function() {
                            return t.destroy()
                        }), 0), e && e.getError) {
                            var i = e.getError();
                            this.handleAdError(i, e, !0)
                        } else e.target && e.target.src ? console.error("Failed to load " + e.target.src) : console.error(e)
                }
            }, {
                key: "handleAdError",
                value: function(e, t, i) {
                    var n = this;
                    this.options.debug && console.error(e);
                    var r = O(this, e);
                    this.player && 0 === this.player.getPosition() && (this._qoe.tick("adError"), r.timeLoading = this._qoe.between("adBeforePlay", "adError")), this.trigger(h, r), this.destroyed() || (900 === e.getErrorCode() || i ? (clearTimeout(this.timeoutAdStart), this.timeoutAdStart = setTimeout((function() {
                        return n.destroy()
                    }), 0)) : (this.stopBlocking(), this.view.adTakeDown()))
                }
            }, {
                key: "isVpaidAd",
                value: function(e) {
                    var t = e.getContentType();
                    return "application/javascript" === t || "application/x-shockwave-flash" === t
                }
            }, {
                key: "destroy",
                value: function() {
                    if (this.debugConsoleLog("[JW DEBUG] JW Player destroy PlaylistItemManager"), this.off(), !this.destroyed()) {
                        this.player.off(null, null, this), this.bids.map((function(e) {
                            e.stop()
                        })), this.bids = [], clearTimeout(this.timeoutAdStart), clearInterval(this.progressIntervalId), this.currentAd = null, this.options = null, this.video = null, this.initAdsManagerPromise = null;
                        var e = this.adsLoaderManager;
                        e && (e.reset(), this.adsLoaderManager = null), this.blockingInstreamPlayer && this.stopBlocking(), this.instreamProvider.off(), this.instreamProvider.setProxy(null), this.instreamProvider = null, this.view.adTakeDown(), this.view = null, this.player = null, this.item = null
                    }
                }
            }, {
                key: "destroyed",
                value: function() {
                    return !this.item
                }
            }]), e
        }(),
        _t = function() {
            function e(i, n) {
                t(this, e), this.adsLoader = null, this.adDisplayContainer = null, this.displayInitialized = !1, this.initialized = !1, this.started = !1, this.adsRequest = null, this.userRequestContext = null, this.adsManager = null, this.adsManagerEvents = {}, this.container = n, this.schedule = null, this.breakMap = {}, this.player = i
            }
            return n(e, [{
                key: "getVpaidMode",
                value: function(e) {
                    var t = google.ima.ImaSdkSettings.VpaidMode;
                    return "disabled" === e || "none" === e ? t.DISABLED : "enabled" === e ? t.ENABLED : t.INSECURE
                }
            }, {
                key: "initializeDisplay",
                value: function(e) {
                    this.adDisplayContainer && !this.displayInitialized && (this.adDisplayContainer.initialize(), e && e.restrict && (this.displayInitialized = !0))
                }
            }, {
                key: "contentComplete",
                value: function() {
                    if (null !== this.adsRequest) {
                        var e = this.adsLoader;
                        e && e.contentComplete(), this.adsRequest = null
                    }
                }
            }, {
                key: "reset",
                value: function() {
                    this.userRequestContext = null;
                    var e = this.adsManager;
                    e && (e.destroy(), this.adsManager = null), this.contentComplete(!0), this.schedule = null, this.breakMap = {}, this.adsManagerEvents = {}, this.initialized = this.started = !1
                }
            }, {
                key: "prepare",
                value: function(e) {
                    return null === this.adsLoader && (this.adDisplayContainer = new google.ima.AdDisplayContainer(this.container, e), this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer)), this.adsLoader
                }
            }, {
                key: "open",
                value: function(e, t, i) {
                    var n = google.ima.settings;
                    n.setDisableCustomPlaybackForIOS10Plus(!0);
                    var r = t.locale || this.player.getConfig().language;
                    n.setLocale(r), t.maxRedirects >= 0 && n.setNumRedirects(t.maxRedirects);
                    var a = this.prepare(i);
                    return new Promise((function(e, t) {
                        a.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, t, !1), a.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e, !1)
                    }))
                }
            }, {
                key: "requestAds",
                value: function(e, t, i) {
                    var n = this;
                    if (null === this.adsRequest) {
                        var r = t.getSchedule();
                        if (r) {
                            var o = this.player,
                                s = this.adsRequest = new google.ima.AdsRequest,
                                d = this.userRequestContext = {
                                    requestType: e,
                                    vpaidMode: t.vpaidmode,
                                    playerVersion: o.version.split("+")[0],
                                    adPosition: t.adPosition
                                };
                            s.setAdWillAutoPlay(!1 !== o.getConfig().autostart), s.setAdWillPlayMuted(o.getMute());
                            var l = o.getSafeRegion(!1);
                            s.linearAdSlotWidth = l.width, s.linearAdSlotHeight = l.height;
                            var u = o.getSafeRegion(!0);
                            s.nonLinearAdSlotWidth = u.width, s.nonLinearAdSlotHeight = u.height, s.forceNonLinearFullSlot = i.forceNonLinearFullSlot, s.vastLoadTimeout = i.vastLoadTimeout;
                            var c = this.adsLoader.getSettings(),
                                g = this.getVpaidMode(d.vpaidMode);
                            c.setPlayerType("jwplayer"), c.setPlayerVersion(d.playerVersion), c.setVpaidMode(g);
                            var p = new V(o, this, i);
                            return p.normalize(r).then((function(e) {
                                var t = Object.keys(e);
                                if (1 === t.length) {
                                    var i = e[t[0]];
                                    "pre" === i.offset && i.tag && (r = s.adTagUrl = d.adTagUrl = i.tag)
                                }
                                d.adTagUrl || (s.adsResponse = d.adsResponse = p.getAdsResponse(e)), n.schedule = r, n.breakMap = a(p.getTagMap(e), n.breakMap), n.adsLoader.requestAds(s, d)
                            }))
                        }
                    }
                }
            }, {
                key: "getAdsManager",
                value: function(e, t, i) {
                    var n = new google.ima.AdsRenderingSettings;
                    return n.enablePreloading = i.enablePreloading || i.preloadAds, n.loadVideoTimeout = i.loadVideoTimeout, n.uiElements = null, n.useStyledNonLinearAds = !0, this.adsManager = e.getAdsManager(t, n), this.userRequestContext = e.getUserRequestContext(), this.adsManager
                }
            }, {
                key: "init",
                value: function(e, t, i) {
                    null !== this.adsManager && !1 === this.initialized && (this.adsManager.init(e, t, i), this.initialized = !0)
                }
            }, {
                key: "start",
                value: function() {
                    null !== this.adsManager && !1 === this.started && (this.initializeDisplay({
                        restrict: !0
                    }), this.adsManager.start(), this.started = !0)
                }
            }, {
                key: "bindEvents",
                value: function(e) {
                    var t = this,
                        i = google.ima.AdEvent.Type,
                        n = google.ima.AdErrorEvent.Type;
                    Object.keys(e).forEach((function(r) {
                        var a = i[r] || n[r],
                            o = t.adsManagerEvents[a];
                        o && t.adsManager.removeEventListener(a, o), t.adsManager.addEventListener(a, e[r], !1), t.adsManagerEvents[a] = e[r]
                    }))
                }
            }, {
                key: "unbindEvents",
                value: function(e) {
                    var t = this,
                        i = google.ima.AdEvent.Type,
                        n = google.ima.AdErrorEvent.Type;
                    e.forEach((function(e) {
                        var r = i[e] || n[e],
                            a = t.adsManagerEvents[r];
                        a && (t.adsManager.removeEventListener(r, a), delete t.adsManagerEvents[r])
                    }))
                }
            }, {
                key: "getTag",
                value: function(e) {
                    if ("string" == typeof this.schedule) return this.schedule;
                    var t = e && e.getAdPodInfo && e.getAdPodInfo();
                    if (t) {
                        var i = this.breakMap[t.getTimeOffset()] || {};
                        if (i.tag) return i.tag
                    }
                    return this.userRequestContext ? this.userRequestContext.adTagUrl || this.userRequestContext.adsResponse || "" : (console.error("invalid request context", this.userRequestContext), "")
                }
            }, {
                key: "getAdBreakId",
                value: function(e) {
                    var t = this.player.utils,
                        i = x(e, t);
                    return this.breakMap[i] = this.breakMap[i] || {}, this.breakMap[i].adBreakId = this.breakMap[i].adBreakId || t.genId(12), this.breakMap[i].adBreakId
                }
            }, {
                key: "getAdPlayId",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                        i = this.player.utils,
                        n = x(e, i);
                    return this.breakMap[n] = this.breakMap[n] || {}, this.breakMap[n].adPlayId = this.breakMap[n].adPlayId || {
                        1: i.genId(12)
                    }, this.breakMap[n].adPlayId[t] = this.breakMap[n].adPlayId[t] || i.genId(12), this.breakMap[n].adPlayId[t]
                }
            }, {
                key: "getTimeoffsetFromPosition_",
                value: function() {
                    var e, t = this.player.getPosition(),
                        i = 1 / 0;
                    return Object.keys(this.breakMap).forEach((function(n) {
                        var r = t - n;
                        r >= 0 && r < i && (e = n, i = r)
                    })), i === 1 / 0 ? -1 : e
                }
            }, {
                key: "skipAd",
                value: function() {
                    this.adsManager && this.adsManager.skip()
                }
            }, {
                key: "getBid",
                value: function(e) {
                    var t = x(e, this.player.utils);
                    return this.breakMap[t] ? this.breakMap[t].bid : null
                }
            }, {
                key: "setBid",
                value: function(e, t) {
                    var i = x(e, this.player.utils);
                    this.breakMap[i] = this.breakMap[i] || {}, this.breakMap[i].bid = t
                }
            }]), e
        }();
    ! function(e) {
        if (e && "undefined" != typeof window) {
            var t = document.createElement("style");
            t.setAttribute("media", "screen"), t.innerHTML = e, document.head.appendChild(t)
        }
    }(".jw-plugin-googima,.jw-plugin-googima.jw-ad-instream .jw-ads-view>:not(div),.jw-plugin-googima.jw-ad-instream .jw-ads-view>div:not(:empty){height:100%;width:100%}.jw-plugin-googima{overflow:hidden;display:block;visibility:hidden;pointer-events:none;opacity:0}.jw-plugin-googima.jw-ad-instream{visibility:visible;display:block;pointer-events:all;opacity:1}.jw-plugin-googima.jw-ad-linear{top:0;left:0;bottom:0}.jw-plugin-googima.jw-ad-non-linear{top:auto}.jw-plugin-googima .jw-ads-view{position:absolute;width:100%;height:100%}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-controlbar{font-size:1em}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-display-icon-display,.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-display-icon-display .jw-icon-display{pointer-events:none}.jwplayer.jw-flag-ads-googleima .jw-controlbar{background:0 0!important;pointer-events:none}.jwplayer.jw-flag-ads-googleima .jw-controlbar .jw-icon{pointer-events:all}.jwplayer.jw-flag-ads-googleima .jw-controls-backdrop{display:none}.jwplayer.jw-flag-ads-googleima.jw-ie .jw-slider-volume,.jwplayer.jw-flag-ads-googleima.jw-ie .jw-svg-icon{background:rgba(0,0,0,.25);border-radius:3px}.jwplayer.jw-flag-ads-googleima.jw-ie .jw-slider-volume{margin:0 10px}@supports (filter:drop-shadow(0 0 3px #000)){.jwplayer.jw-flag-ads-googleima.jw-ie .jw-slider-volume,.jwplayer.jw-flag-ads-googleima.jw-ie .jw-svg-icon{background:0 0;border-radius:0}.jwplayer.jw-flag-ads-googleima.jw-ie .jw-slider-volume{margin:0}}.jwplayer.jw-flag-ads-googleima .jw-controlbar .jw-svg-icon{fill:#fff;filter:drop-shadow(0 0 3px #000)}.jwplayer.jw-flag-ads-googleima .jw-spacer,.jwplayer.jw-flag-ads-googleima .jw-text{order:1}.jwplayer.jw-flag-ads-googleima .jw-controlbar .jw-text{text-shadow:0 0 3px #000}.jwplayer.jw-flag-ads-googleima.jw-flag-small-player.jw-flag-ads.jw-state-playing.jw-flag-touch:not(.jw-flag-ads-vpaid) .jw-controls .jw-controlbar{pointer-events:none}.jwplayer.jw-flag-ads-googleima.jw-flag-small-player .jw-controlbar{flex-flow:column-reverse nowrap;height:100%;max-height:none}.jwplayer.jw-flag-ads-googleima.jw-flag-small-player .jw-button-container{align-items:flex-end;flex-wrap:wrap;margin-bottom:7px}.jwplayer.jw-flag-ads-googleima.jw-flag-small-player .jw-controlbar .jw-icon{height:30px}.jwplayer.jw-flag-ads-googleima.jw-flag-small-player .jw-text{align-self:flex-start;margin:16px 0 0 16px;order:-1;width:100%}"), (window.jwplayerPluginJsonp || window.jwplayer().registerPlugin)(d, "8.1", (function(e, t, i) {
        var n = this,
            r = e.utils,
            a = e.getConfig(),
            o = new W(t || {}, r),
            s = null,
            d = 0;
        J(r).catch(r.noop);
        var m = e._,
            v = a.key,
            y = new F(i, e.id, r),
            b = new Y(r, e.Events, y),
            w = new _t(e, y.getAdDiv()),
            A = null;

        function P(e, t, i, n) {
            try {
                return e.getCompanionAds(t, i, n)
            } catch (e) {
                return []
            }
        }

        function k(t) {
            var i = new google.ima.CompanionAdSelectionSettings;
            i.sizeCriteria = google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE;
            var n = o.companiondiv || {
                    width: 300,
                    height: 250
                },
                r = function(e) {
                    for (var t = [], i = 0; i < e.length; i++) {
                        var n = e[i];
                        t.push({
                            width: n.getWidth(),
                            height: n.getHeight(),
                            type: "html",
                            resource: n.getContent(),
                            click: null
                        })
                    }
                    return t
                }(P(t, n.width, n.height, i)),
                a = r.length;
            if (a) {
                var s = B(A, t);
                s.companions = r, e.trigger(p, s)
            }
            if (o.companiondiv) {
                i = new google.ima.CompanionAdSelectionSettings, o.companionResourceType && (i.resourceType = google.ima.CompanionAdSelectionSettings.ResourceType[o.companionResourceType]);
                var d = P(t, o.companiondiv.width, o.companiondiv.height, i);
                a = Math.max(a, d.length),
                    function(e) {
                        if (e && e.length) {
                            var t = document.getElementById(o.companiondiv.id);
                            if (t) {
                                var i = e[0];
                                i && (m.isFunction(i.getContent) ? t.innerHTML = i.getContent() : t.innerHTML = i.resource || i.content)
                            }
                        }
                    }(d)
            }
            return a > 0
        }

        function C() {
            _(), w && w.adDisplayContainer && w.adDisplayContainer.destroy(), e.off(null, null, this), e.playAd = r.noop
        }

        function _() {
            A && (A.destroy(), A = null)
        }

        function I(t) {
            A && A.discardAdBreak(), w.contentComplete(), _(), t && t.adschedule ? o.adschedule = t.adschedule : o.adschedule = null, e.setCues([])
        }

        function E(t, i, n) {
            var a = t.item || {};
            I(a);
            var l, g, p, h = n.getSchedule();
            if (i === u && (l = o.getAdRules(), g = 0 === l.frequency && 1 === d, p = d >= l.startOn && (d - l.startOn) % l.frequency == 0, !(g || p)) || !h || "string" != typeof h && !Object.keys(h).length) return o.adschedule = null, void J(r).then((function() {
                w.prepare(s)
            })).catch(r.noop);
            if (w.reset(), (A = new Ct(a, o, e, b, y, w, s)).on("all", (function(t, i) {
                return e.trigger(t, i)
            })), A.init(i, n).then((function(t) {
                e.trigger("adsManager", {
                    adsManager: t,
                    videoElement: s
                })
            })).catch(r.noop), A.on(f, (function() {
                return k(A.currentAd)
            })), n.preloadAds) {
                var m = e.getConfig().autostart;
                !1 === m || m === c && 0 === e.getViewable() ? A.requestAds(i, n) : e.once("autostartNotAllowed", (function() {
                    A.requestAds(i, n)
                }), A)
            }
            e.once("beforePlay", (function(e) {
                A.beforePlay(e), A.requestAds(i, n)
            }), A).on("beforeComplete", (function() {
                return A.beforeComplete()
            }), A).on("time", (function(e) {
                return A.time(e)
            }), A).on("resize", (function() {
                return A.resize()
            }), A).on("fullscreen", (function() {
                return A.resize()
            }), A)
        }
        this.version = "8.7.6", this.bidsVersion = "0.2.20", e.utils.extend(this, e.Events), e.pauseAd = function(e, t) {
            A && (e ? A.pause(t || {}) : A.resume(t || {}))
        }, e.playAd = function(i) {
            var n = r.extend({}, t);
            delete n.ad, delete n.tag, delete n.schedule, delete n.adschedule, e._.isArray(i) ? n.tag = i[0] : n.tag = i, n.adPosition = q(e);
            var o = new W(n, r);
            o.setLocalizationOptions(a.localization.advertising);
            var s = A ? A.blockingInstreamPlayer : null;
            s && (s.noResume = !0), E({}, l, o), A && (A.beforePlay(null), A.requestAds(l, o))
        }, e.skipAd = function() {
            w && w.skipAd()
        }, e.on("ready", (function() {
            a.localization = e.getConfig().localization, o.setLocalizationOptions(a.localization.advertising), s || (s = e.createInstream().getMediaElement()), J().catch((function(e) {
                e.message.match(/Failed to load/) && T("Ad playback blocked by an ad blocker", 2e4)
            })), M.catch((function(e) {
                T(e.message, 60002)
            }));
            var t = document.body,
                i = function e() {
                    t.removeEventListener("mouseup", e), t.removeEventListener("touchend", e), w.initializeDisplay()
                };
            t.addEventListener("mouseup", i, !1), t.addEventListener("touchend", i, !1)
        }), this).on("playlistItem", (function(e) {
            d++, o.resetBidsResponse(), E(e, u, o)
        }), this).on("playlistComplete", (function() {
            I()
        }), this).on("cast", (function(e) {
            e.active && I()
        }), this).on("mute", (function(e) {
            var t = e.mute;
            b.mute(t)
        }), this).on("destroyPlugin", (function() {
            n.destroy()
        }), this).on("remove", C, this);
        var M = function(e, t, i) {
            var n = X[t];
            return n || (X[t] = new Promise((function(n, r) {
                ! function(i) {
                    var n = new e.key(t);
                    if ("unlimited" === n.edition()) return i();
                    // crack
                    //var r = ["//", "entitlements.jwplayer.com", "/", n.token(), ".json"];

                    var r = ["/", "test", "/", n.token(), ".json"];
                    "file:" === window.location.protocol && r.unshift("https:"), e.ajax(r.join(""), (function(e) {
                        i(e && e.response)
                    }), (function() {
                        i()
                    }), {
                        timeout: 1e4,
                        responseType: "json"
                    })
                }((function(e) {
                    var t, a, o = e || {};
                    !0 === i.outstream ? (t = !1 !== o.canPlayOutstreamAds, a = "Outstream Ad Limit Reached") : (t = !1 !== o.canPlayAds, a = "Ad Limit Reached"), !1 !== t ? n({
                        message: "Can Play Ads"
                    }) : r({
                        message: a
                    })
                }))
            })))
        }(r, v, t);
        M.catch(r.noop);
        var T = function(t, i) {
            C(), e.trigger(h, O(null, {
                message: t,
                adErrorCode: i,
                id: g,
                placement: L(a),
                tag: ""
            }))
        };
        this.destroy = _, this.adsDebugMode = function() {
            o.debug = !0, A && (A.debugConsoleLog = function() {
                var e;
                (e = console).log.apply(e, arguments)
            })
        }
    }))
}();
