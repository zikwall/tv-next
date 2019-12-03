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
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function r(e, t, r) {
        return t && i(e.prototype, t), r && i(e, r), e
    }

    function n(e, t, i) {
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
                for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
            }
            return e
        }).apply(this, arguments)
    }

    function s(e) {
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
    var o, l = "vast",
        d = "-1",
        u = "time",
        c = "[ERRORCODE]",
        h = "beforeComplete",
        p = "vmap",
        v = 5e3,
        m = 15e3,
        f = "jwp",
        g = "jwpspotx",
        y = "autostartNotAllowed",
        k = "viewable",
        A = 5,
        w = "playing",
        P = "adBidRequest",
        b = "adBidResponse",
        _ = "adBreakEnd",
        T = "adBreakIgnored",
        I = "adBreakStart",
        E = "adError",
        C = "adImpression",
        S = "adItem",
        R = "adLoaded",
        x = "adPlayComplete",
        j = "adPodError",
        M = "adRequest",
        L = "adSchedule",
        O = "external",
        V = O,
        B = "click",
        H = "play",
        D = "error",
        q = "complete",
        N = [C, E, j],
        F = ["adStarted", "adComplete", C, "adClick", "adSkipped", E, "adPlay", "adPause", "adMeta"],
        U = "instream",
        X = "article",
        Q = (n(o = {}, [U], 1), n(o, ["banner"], 2), n(o, [X], 3), n(o, ["feed"], 4), n(o, ["floating"], 5), n(o, ["interstitial"], 5), n(o, ["slider"], 5), o),
        W = function() {
            function e(i, r, n, s, o) {
                var l = this;
                t(this, e), this.player = i, this.state = i.state, this.vpaidURL = n, this.adTag = s, this.adParams = o.adParams, this.vpaidControls = o.vpaidControls, this.remainingTimeInterval = null, this.type = "vpaid", this.instream = r || i.createInstream(), this.vpaidState = {
                    linear: !1,
                    expanded: !1,
                    remainingTime: -1
                }, this.paused = !1, a(this, i.Events), this.setMuteCallback = function() {
                    l.handleMute ? l.setMute() : l.handleMute = !0
                }, this.playerContainer = this.player.getContainer(), o.adOptOut ? setTimeout((function() {
                    l.sendEvent("error", {
                        message: "Conditional ad rejected",
                        code: 408
                    })
                }), 0) : this.iframe = function(e, t, i, r) {
                    var n = document.createElement("iframe");
                    n.setAttribute("allow", "autoplay"), n.src = "javascript:false", n.classList.add("jw-vpaid-iframe"), n.scrolling = "no", i.querySelector(".jw-media").appendChild(n);
                    var a = n.contentWindow.document;
                    return a.open().write("\n    <body onload=\"\n        var js = document.createElement('script');\n        js.src = '".concat(t, "';\n        js.addEventListener('load', function() { window.myCallback(); });\n        document.body.appendChild(js);\"\n    style=\"margin: 0\">")), n.contentWindow.myCallback = r, a.close(), n
                }(i.utils, this.vpaidURL, this.playerContainer, this.callback.bind(this))
            }
            return r(e, [{
                key: "sendEvent",
                value: function(e, t) {
                    (t = t || {}).tag || (t.tag = this.adTag), this.trigger(e, t)
                }
            }, {
                key: "sendTimeEvent",
                value: function(e, t, i) {
                    var r = t.getAdDuration(),
                        n = t.getAdRemainingTime(),
                        s = a({
                            duration: r
                        }, i);
                    this.sendEvent(e, s), n > 0 && (s.position = r - n, this.trigger("time", s))
                }
            }, {
                key: "handleQuartile",
                value: function(e, t) {
                    this.sendTimeEvent("quartile", e, {
                        quartile: t
                    })
                }
            }, {
                key: "genEvent",
                value: function(e) {
                    var t = this;
                    return function(i) {
                        t.on(e, i)
                    }
                }
            }, {
                key: "setMute",
                value: function() {
                    var e = 0 === this.vpaidAd.getAdVolume();
                    this.player.getMute() !== e && this.player.setMute(e)
                }
            }, {
                key: "prepareNonlinearAd",
                value: function() {
                    if (this.player.utils.style(this.iframe, {
                        height: 150
                    }), this.iframe.classList.add("jw-vpaid-non-linear"), this.resize(null, 150), this.instream) {
                        this.instream.noResume = !0, this.instream.applyProviderListeners(null), this.instream.destroy(), this.instream = null;
                        var e = this.playerContainer.querySelector(".jw-media"),
                            t = e.querySelector("video,audio");
                        e.insertBefore(t, this.iframe), t.play()
                    }
                }
            }, {
                key: "progressInterval",
                value: function(e) {
                    var t = this;
                    if (clearInterval(this.remainingTimeInterval), e && e.getAdRemainingTime) {
                        var i = -1;
                        this.remainingTimeInterval = setInterval((function() {
                            if (!t.paused) {
                                var r = e.getAdRemainingTime();
                                isNaN(r) || r <= 0 || i === r || (i = r, t.sendTimeEvent("remainingTimeChange", e, {
                                    remainingTime: r
                                }))
                            }
                        }), 250)
                    }
                }
            }, {
                key: "genListeners",
                value: function(e) {
                    var t = this;
                    return {
                        AdLoaded: function() {
                            e.setAdVolume(t.getPlayerVolume()), e.startAd()
                        },
                        AdStarted: function() {
                            var i = e.getAdDuration ? e.getAdDuration() : 0,
                                r = !e.getAdLinear || e.getAdLinear(),
                                n = r ? "linear" : "nonlinear";
                            r ? (t.vpaidControls || (t.instream = t.instream || t.player.createInstream(), t.instream.hide()), t.progressInterval(e)) : t.prepareNonlinearAd(), t.sendEvent("impression", {
                                linear: n,
                                duration: i
                            }), t.sendEvent("play", {
                                oldstate: "buffering",
                                newstate: w,
                                linear: n
                            }), t.handleMute = !0, e.subscribe(t.setMuteCallback, "AdVolumeChange", e)
                        },
                        AdVideoStart: function() {
                            t.sendEvent("started")
                        },
                        AdStopped: function() {
                            t.sendEvent("stopped")
                        },
                        AdPaused: function() {
                            t.paused || (t.paused = !0, t.sendEvent("pause", {
                                newstate: "paused",
                                oldstate: w
                            }))
                        },
                        AdPlaying: function() {
                            if (t.paused) {
                                var i = !e.getAdLinear || e.getAdLinear() ? "linear" : "nonlinear";
                                t.paused = !1, t.sendEvent("play", {
                                    newstate: w,
                                    oldstate: "paused",
                                    linear: i
                                })
                            }
                        },
                        AdLinearChange: function() {
                            !e.getAdLinear || e.getAdLinear() ? (t.player.utils.style(t.iframe, {
                                height: "100%"
                            }), t.player.off(null, null, t), t.instream = t.instream || t.player.createInstream(), t.instream.init(), t.vpaidControls || t.instream.hide()) : t.prepareNonlinearAd()
                        },
                        AdDurationChange: function() {
                            t.sendTimeEvent("remainingTimeChange", e, {
                                isDurationChange: !0,
                                remainingTime: e.getAdRemainingTime()
                            })
                        },
                        AdRemainingTimeChange: function() {
                            t.paused || t.sendTimeEvent("remainingTimeChange", e, {
                                remainingTime: e.getAdRemainingTime()
                            })
                        },
                        AdExpandedChange: function() {
                            t.sendEvent("expandedChange", {
                                expanded: e.getAdExpanded()
                            })
                        },
                        AdSkippableStateChange: function() {
                            t.sendEvent("skippableStateChange", {
                                skippable: e.getAdSkippableState()
                            })
                        },
                        AdSkipped: function() {
                            t.sendEvent("skipped")
                        },
                        AdVideoFirstQuartile: function() {
                            t.handleQuartile(e, 1)
                        },
                        AdVideoMidpoint: function() {
                            t.handleQuartile(e, 2)
                        },
                        AdVideoThirdQuartile: function() {
                            t.handleQuartile(e, 3)
                        },
                        AdVideoComplete: function() {
                            t.sendEvent("complete")
                        },
                        AdUserClose: function() {
                            t.sendEvent("close")
                        },
                        AdClickThru: function(e, i, r) {
                            t.sendEvent("click", {
                                id: i,
                                url: e,
                                playerHandles: r
                            })
                        },
                        AdError: function(e) {
                            var i = function(e) {
                                if (e) {
                                    var t = e.match(/\b(?:[34])[0-9]{2}\b/);
                                    if (t) return parseInt(t[0], 10);
                                    if (e.match(/timeout/i)) return e.match(/vpaid|vast/i) ? 301 : 402;
                                    if (e.match(/found/i)) return 401;
                                    if (e.match(/supported/i)) return 403;
                                    if (e.match(/(?:displaying|media file)/i)) return 405
                                }
                                return 901
                            }(e);
                            t.sendEvent("error", {
                                message: e,
                                code: i,
                                adErrorCode: 5e4 + i
                            })
                        }
                    }
                }
            }, {
                key: "callback",
                value: function() {
                    try {
                        this.vpaidAd = this.iframe.contentWindow.getVPAIDAd();
                        var e = this.vpaidAd.handshakeVersion("2.0");
                        if (parseFloat(e) < 1) throw new Error("Invalid vpaid version in handshake")
                    } catch (e) {
                        return void this.sendEvent("error", {
                            message: e.message || "VPAID general error",
                            code: 901,
                            adErrorCode: 51901
                        })
                    }
                    var t = this.vpaidAd,
                        i = this.genListeners(t);
                    Object.keys(i).forEach((function(e) {
                        t.subscribe(i[e], e, t)
                    })), this.listeners = i;
                    var r = {
                            AdParameters: this.adParams
                        },
                        n = this.iframe.contentWindow.document.createElement("div");
                    n.className = "jw-vpaid-wrapper", n.style.height = "100%", this.iframe.contentWindow.document.body.appendChild(n), this.vpaidURL.indexOf("//imasdk.googleapis.com/js/sdkloader/vpaid_adapter.js") >= 0 && (this.iframe.contentWindow.HTMLVideoElement = HTMLVideoElement);
                    var a = {
                        videoSlot: this.instream.getMediaElement(),
                        slot: n
                    };
                    t.initAd(this.player.getWidth(), this.player.getHeight(), "normal", 1e3, r, a), t.setAdVolume(this.getPlayerVolume())
                }
            }, {
                key: "play",
                value: function() {
                    this.vpaidAd.resumeAd()
                }
            }, {
                key: "pause",
                value: function() {
                    this.vpaidAd.pauseAd()
                }
            }, {
                key: "skip",
                value: function() {
                    return !(!this.vpaidAd.skipAd || !this.vpaidAd.getAdSkippableState()) && (this.vpaidAd.skipAd(), !0)
                }
            }, {
                key: "stop",
                value: function() {
                    if (this.vpaidAd) try {
                        this.vpaidAd.stopAd()
                    } catch (e) {}
                }
            }, {
                key: "getPlayerVolume",
                value: function() {
                    return this.player.getMute() ? 0 : this.player.getVolume() / 100
                }
            }, {
                key: "setVolume",
                value: function(e) {
                    this.handleMute = !1, this.vpaidAd.setAdVolume(e / 100)
                }
            }, {
                key: "resize",
                value: function(e, t) {
                    if (this.vpaidAd && this.vpaidAd.resizeAd) {
                        var i = this.player.getFullscreen() || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen ? "fullscreen" : "normal";
                        this.vpaidAd.resizeAd(e || this.player.getWidth(), t || this.player.getHeight(), i)
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    if (this.removeEvents(), clearInterval(this.remainingTimeInterval), this.vpaidAd) try {
                        var e = this.listeners,
                            t = this.vpaidAd;
                        Object.keys(e).forEach((function(i) {
                            t.unsubscribe(e[i], i, t)
                        })), t.unsubscribe(this.setMuteCallback, "AdVolumeChange", t)
                    } catch (e) {}
                    this.iframe && this.iframe.parentNode && this.iframe.parentNode.removeChild(this.iframe), this.vpaidAd = null, this.player = null, this.instream = null
                }
            }, {
                key: "removeEvents",
                value: function() {
                    this.player && this.player.off(null, null, this), this.off()
                }
            }, {
                key: "attachMedia",
                value: function() {}
            }, {
                key: "detachMedia",
                value: function() {}
            }, {
                key: "volume",
                value: function() {}
            }, {
                key: "mute",
                value: function() {}
            }, {
                key: "getState",
                value: function() {
                    return this.vpaidState.linear ? this.paused ? "paused" : w : "idle"
                }
            }]), e
        }();
    var z = function(e) {
            var t = K("".concat(e, "Locator"));
            return null !== t && function(i, r, a, s) {
                var o = ie();
                window.addEventListener("message", (function t(i) {
                    var r = i ? i.data : {};
                    if ("string" == typeof r) try {
                        r = JSON.parse(r)
                    } catch (e) {
                        r = {}
                    }
                    var n = "".concat(e, "Return");
                    r[n] && r[n].callId === o && (removeEventListener("message", t), a(r[n].returnValue, r[n].success))
                }), !1);
                var l = void 0 !== s ? "version" : "parameter",
                    d = n({}, ["".concat(e, "Call")], n({
                        command: i,
                        callId: o,
                        parameter: s
                    }, [l], r));
                t.postMessage(JSON.stringify(d), "*")
            }
        },
        $ = /^(https?:\/\/).*.(?:ampproject.org|bing-amp.com)\/(?:.\/)*(.*)\/amp.*$/;
    var G = new RegExp(/^[^/]*:\/\/\/?([^\/]*)/);

    function J(e) {
        var t = e.match(G);
        return t && t.length > 1 ? t[1] : ""
    }
    var K = function(e) {
            for (var t = window; t;) {
                try {
                    if (t.frames[e]) break
                } catch (e) {}
                t = t === window.top ? null : t.parent
            }
            return t
        },
        Y = new RegExp(/^[^:\/?#]+:?\/\/[^\/?#]+/);
    var Z = null,
        ee = {
            gdprApplies: !0,
            consentData: ""
        },
        te = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
            return null === Z && (Z = new Promise((function(e) {
                var t = window.__tcfapi || z("__tcfapi");
                if (t) return t("getTCData", 2, (function(t, i) {
                    e(!1 !== i ? {
                        gdprApplies: t.gdprApplies,
                        consentData: t.tcString
                    } : null)
                }), null);
                var i = window.__cmp || z("__cmp");
                return i ? i("getConsentData", "1.1", e) : e({
                    gdprApplies: !1,
                    consentData: ""
                })
            })).then((function(e) {
                return e && (ee = e), ee
            }))), Promise.race([Z, new Promise((function(t) {
                setTimeout(t, e, ee)
            }))])
        },
        ie = Date.now || function() {
            return (new Date).getTime()
        };

    function re() {
        var e, t, i = null !== document.referrer.match(Y) ? (e = document.referrer, (t = e.match($)) && t.length > 1 ? "".concat(t[1]).concat(t[2]) : e) : "";
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
                domain: J(i),
                referrer: ""
            }
        }
        return {
            url: document.location.href,
            domain: document.domain,
            referrer: i
        }
    }

    function ne(e) {
        var t = e.advertising;
        if (t && t.placement) {
            var i = t.placement.toLowerCase();
            if (Q[i]) return Q[i]
        }
        return Q[t && t.outstream ? X : U]
    }
    var ae = function(e) {
            return e.replace(/^\s+|\s+$/g, "")
        },
        se = [];
    var oe = function() {
        function e(i, r, n, a, s) {
            var o = this;
            t(this, e);
            var l = r || {};
            this.ad = i, this.map = l, this.debugTrackFn = n, this.trackerPlayerUtils = function(e) {
                return {
                    getPosition: function() {
                        return e.getPosition()
                    },
                    getFile: function() {
                        return e.getPlaylistItem().file
                    },
                    getPlacement: function() {
                        return ne(e.getConfig())
                    },
                    getUserAgent: function() {
                        return navigator.userAgent
                    }
                }
            }(a), this.trackingFilter = s, this.lastQuartile = 0, this.progressEvents = [], this.breakStarted = !1, this.started = !1, this.firedError = !1, this.hasComp = !1, Object.keys(l).forEach((function(e) {
                if (l.hasOwnProperty(e) && 0 === e.indexOf("progress")) {
                    var t = "".concat(e.split("_")[1]),
                        i = {
                            key: e,
                            offset: t,
                            tracked: !1,
                            percentage: !1
                        };
                    /^\d+%$/.test(t) ? (i.percentage = !0, i.offset = parseFloat(t)) : i.offset = a.utils.seconds(t), o.progressEvents.push(i)
                }
            })), this.setFactories()
        }
        return r(e, [{
            key: "getUrls",
            value: function(e) {
                return this.map.hasOwnProperty(e) ? this.map[e] : []
            }
        }, {
            key: "addUrl",
            value: function(e, t) {
                this.map.hasOwnProperty(e) ? this.map[e].push(t) : (this.map[e] = [], this.map[e].push(t))
            }
        }, {
            key: "trackPings",
            value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = this.getUrls(e),
                    r = this.trackingFilter,
                    n = [],
                    a = [],
                    s = [];
                if (i.length) {
                    t = this.replaceMacros(t), i.forEach((function(e) {
                        if (e) {
                            if (Object.keys(t).forEach((function(i) {
                                e = e.replace(i, t[i])
                            })), r && !1 === r(e)) return void a.push(e);
                            var i = new Image;
                            i.src = e, n.push(e), s.push(i)
                        }
                    })), Array.prototype.push.apply(se, s);
                    for (var o = se.length; o-- && (se[o].width || se[o].complete);) se.length = o
                }
                "function" == typeof this.debugTrackFn && this.debugTrackFn({
                    type: "ping",
                    data: {
                        pingType: e,
                        urls: n,
                        filteredUrls: a,
                        images: s
                    }
                })
            }
        }, {
            key: "replaceMacros",
            value: function(e) {
                var t, i, r, n, a, s, o, l = ee,
                    d = l.gdprApplies,
                    u = l.consentData;
                return e["[ADSERVINGID]"] = encodeURIComponent(this.ad.adServingId || ""), e["[ASSETURI]"] = encodeURIComponent(this.trackerPlayerUtils.getFile()), e["[CACHEBUSTING]"] = Math.random().toString().slice(2, 10), e["[CONTENTPLAYHEAD]"] = encodeURIComponent((t = this.trackerPlayerUtils.getPosition(), i = ("0" + Math.floor(t / 3600)).slice(-2), r = ("0" + Math.floor((t - 3600 * i) / 60)).slice(-2), i + ":" + r + ":" + ("0" + Math.floor(t - 3600 * i - 60 * r)).slice(-2) + "." + (t % 1).toFixed(3).toString().slice(2, 5))), e["[DEVICEUA]"] = encodeURIComponent(this.trackerPlayerUtils.getUserAgent()), e["[GDPRCONSENT]"] = u, e["[PAGEURL]"] = encodeURIComponent(re().url), e["[PLACEMENTTYPE]"] = this.trackerPlayerUtils.getPlacement(), e["[REGULATIONS]"] = d ? "gdpr" : "", e["[TIMESTAMP]"] = encodeURIComponent((n = new Date, a = n.getTime(), s = n.getTimezoneOffset() / 60, o = 6e4 * n.getTimezoneOffset(), new Date(a - o).toISOString().slice(0, -1) + (s > 0 ? "-" : "+") + ("0" + s).slice(-2))), e
            }
        }, {
            key: "start",
            value: function() {
                this.started = !0, this.trackPings("start")
            }
        }, {
            key: "breakStart",
            value: function() {
                this.breakStarted = !0, this.trackPings("breakStart")
            }
        }, {
            key: "time",
            value: function(e, t) {
                if (!(t <= 1)) {
                    for (var i = (4 * e + .05) / t | 0; i > this.lastQuartile && this.lastQuartile < 3;) this.lastQuartile++, 1 === this.lastQuartile ? this.trackPings("firstQuartile") : 2 === this.lastQuartile ? this.trackPings("midpoint") : 3 === this.lastQuartile && this.trackPings("thirdQuartile");
                    this.trackProgress(e, t)
                }
            }
        }, {
            key: "trackProgress",
            value: function(e, t) {
                for (var i = this.progressEvents.length; i--;) {
                    var r = this.progressEvents[i];
                    if (!r.tracked) {
                        var n = r.offset;
                        r.percentage && (n = t * n / 100), e >= n && (r.tracked = !0, this.trackPings(r.key))
                    }
                }
            }
        }, {
            key: "error",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 900;
                this.firedError = !0;
                var t = {};
                t[c] = e, this.trackPings("error", t)
            }
        }, {
            key: "factory",
            value: function(e) {
                var t = this;
                return function() {
                    t.trackPings(e)
                }
            }
        }, {
            key: "setFactories",
            value: function() {
                this.creativeView = this.factory("creativeView"), this.click = this.factory("click"), this.skip = this.factory("skip"), this.complete = this.factory("complete"), this.pause = this.factory("pause"), this.resume = this.factory("resume"), this.mute = this.factory("mute"), this.unmute = this.factory("unmute"), this.fullscreen = this.factory("fullscreen"), this.expand = this.factory("expand"), this.collapse = this.factory("collapse"), this.acceptInvitation = this.factory("acceptInvitation"), this.close = this.factory("close"), this.rewind = this.factory("rewind"), this.impression = this.factory("impression"), this.breakEnd = this.factory("breakEnd")
            }
        }]), e
    }();

    function le(e, t, i, r) {
        var n = de(e, i, r),
            s = t.adErrorCode || 60900;
        return a(n, {
            message: t.message,
            code: t.code >= 100 && t.code <= 1008 ? t.code : 900,
            adErrorCode: s
        }), 10402 === s || 50004 === s || 50400 === s ? n.timeout = i ? i.creativeTimeout : r.creativeTimeout : 11007 !== s && 10301 !== s && 60006 !== s || (n.timeout = i ? i.requestTimeout : r.requestTimeout), void 0 !== t.id && (n.id = t.id), void 0 !== t.sourceError && (n.sourceError = t.sourceError), void 0 !== t.tag && (n.tag = t.tag), void 0 !== t.vmap && (n.vmap = t.vmap), n
    }

    function de(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = {
                client: l
            };
        if (null === e) return r;
        e.isDestroyed() || (r.placement = ne(e.player.getConfig()));
        var n = i.schedule;
        if (n) return a(r, {
            item: e.item,
            tag: n.getVMAP(),
            adbreaks: n.getAllAds().map((function(t) {
                var i = {
                    type: t._type,
                    offset: t._offSet
                };
                t._vmap ? i.vmap = t._vmap : i.adbreak = a({}, t._adbreak);
                var r = e.bidsResult[t.adBreakId];
                return r && a(i, r.getEventObject()), i
            }))
        });
        if (e.config.preloadAds && (r.preloadAds = i.preload || t && t._preload || !1), t) {
            var s = e.getAdIds(t, i),
                o = s.adBreakId;
            a(r, {
                adBreakId: o,
                adPlayId: s.adPlayId,
                offset: t._offSet
            });
            var d = e.bidsResult[o];
            d && a(r, d.getEventObject())
        }
        var u = t && (i.tag || t._currentTag);
        return u && (a(r, {
            id: t._id,
            tag: u,
            adposition: t._position,
            sequence: t._adPodIndex + 1,
            witem: t._waterfallIndex + 1,
            wcount: t._adQueue ? t._adQueue.length : 1,
            adsystem: t.adsystem || ""
        }), t.adServingId && (r.adServingId = t.adServingId), void 0 !== t.skipoffset && (r.skipoffset = t.skipoffset), t.wrappedTags && a(r, {
            wrapperAdSystem: t.wrapper || "",
            wrappedTags: t.wrappedTags.slice(1)
        }), t._adbreak && (r.adschedule = t._adbreak, r.adschedule.offset = t._offSet)), t && t.companions && i.companions ? (r.companions = i.companions, r) : (t && t.response ? (a(r, {
            adtitle: t.adTitle || "",
            description: t.description || "",
            adId: t.adId || "",
            creativeId: t.creativeId || "",
            creativeAdId: t.creativeAdId || "",
            request: t.request,
            response: t.response,
            conditionalAd: t.conditionalAd,
            conditionalAdOptOut: e.params.conditionaladoptout,
            vastversion: t.vastversion,
            clickThroughUrl: t.clickthrough,
            duration: i.duration,
            linear: i.linear
        }), "boolean" == typeof t.mediaFileCompliance && (r.mediaFileCompliance = t.mediaFileCompliance, t.nonComplianceReasons && (r.nonComplianceReasons = t.nonComplianceReasons)), t.selectedMedia && (r.mediafile = {
            file: t.selectedMedia.file
        }), i.metadata && (r.adMessage = e.params.dynamicMessage || "", t.companions && (r.companions = t.companions), t.sequence && (r.podMessage = e.params.podMessage || ""), void 0 !== t.skipoffset && a(r, {
            skipMessage: e.params.skipMessage,
            skipText: e.params.skipText
        }))) : r.item = e.item, r)
    }

    function ue(e) {
        return e.isBeforePlay() || 0 === e.getPosition() && "idle" === e.getState() ? "pre" : e.isBeforeComplete() || e.getPosition() === e.getDuration() ? "post" : "mid"
    }
    var ce = function() {
        function e(i, r, n) {
            t(this, e), this.player = i, this.icon = r, this.div = n;
            var a = this.utils = i.utils;
            this.images = [], this.iconContainer = function(e, t) {
                var i = document.createElement("div");
                return i.className = "jw-ad-icon-container", t.style(i, e), i
            }(r.style, a);
            var s = function(e, t) {
                var i, r = e.resourceSource,
                    n = e.resourceType;
                switch (n) {
                    case "iframe":
                        (i = document.createElement("iframe")).src = r, i.scrolling = "no";
                        break;
                    case "html":
                        i = document.createElement("div"), t.replaceInnerHtml(i, r);
                        break;
                    default:
                        (i = document.createElement("img")).src = r, i.setAttribute("type", n)
                }
                return t.addClass(i, "jw-ad-icon"), i
            }(r.resource, a);
            this.iconContainer.appendChild(s), n.appendChild(this.iconContainer);
            var o = 1e3 * a.seconds(r.offset);
            o > 0 ? this.showTimeout = setTimeout(this.show.bind(this), o) : this.show(), this.ui = new a.UI(this.iconContainer).on("click tap", this.clickHandler, this)
        }
        return r(e, [{
            key: "clickHandler",
            value: function() {
                this.player.pause({
                    reason: "clickthrough"
                }), this.sendPing(this.icon.trackers.iconClick), this.utils.openLink(this.icon.clickThrough, "_blank", {
                    rel: "noreferrer"
                })
            }
        }, {
            key: "show",
            value: function() {
                clearTimeout(this.showTimeout), this.utils.addClass(this.iconContainer, "jw-ad-icon-active"), this.sendPing(this.icon.trackers.iconView), this.icon.duration && (this.duration = this.utils.seconds(this.icon.duration), this.beginningPosition = this.utils.seconds(this.icon.offset))
            }
        }, {
            key: "updateTime",
            value: function(e) {
                e - this.beginningPosition >= this.duration && this.remove()
            }
        }, {
            key: "sendPing",
            value: function(e) {
                if (e) {
                    var t = this.images,
                        i = new Image;
                    i.src = e;
                    for (var r = t.length; r-- && (t[r].width || t[r].complete);) t.length = r;
                    t.push(i)
                }
            }
        }, {
            key: "remove",
            value: function() {
                clearTimeout(this.showTimeout), this.div.contains(this.iconContainer) && this.div.removeChild(this.iconContainer), this.ui && (this.ui.destroy(), this.ui = null)
            }
        }]), e
    }();
    var he = function() {
        function e(i, r, n, s, o, l, d) {
            t(this, e), this.player = r, this.staticPlayer = n, this.companion = s, this.playlistItemManager = o, this.div = l, this.optionalParams = d, this.debugTrackFn = d.debugTrackFn, this.scheduledAd = i.scheduledAd(), this.vastBuffet = i.adBuffet(), this.vastAdPod = i.adPod(), this.vastAd = this.vastBuffet.length ? this.vastBuffet[0] : null, this.adType = null, this.vpaidPlayer = null, this.instreamPlayer = null, this.blockingInstreamPlayer = null, this.mediaType = null, this.adPodItems = null, this.creativeTimeout = null, this.vastOptions = null, this.duration = 0, this.position = 0, this.initialIndex = 0, this.viewablePlayedTime = 0, this.adViewableImpressionHandler = r.utils.noop, this.lastPosition = null, this.reason = null, a(this, r.Events)
        }
        return r(e, [{
            key: "init",
            value: function(e, t) {
                return this.init = function() {
                    throw new Error("Adplayer can only be initialized once")
                }, this.blockingInstreamPlayer = e, this.reason = t, this.prepareAdPod() ? (this.player.on("fullscreen", this.playerFullscreenHandler, this), this.player.on("volume", this.playerVolumeHandler, this), this.player.on("mute", this.muteHandler, this), this.player.on("resize", this.playerResizeHandler, this), this.playAd()) : Promise.reject()
            }
        }, {
            key: "prepareAdPod",
            value: function() {
                var e, t = this,
                    i = null,
                    r = 0,
                    n = [];
                if (this.vastAd && (me(this.vastAd, this.debugTrackFn, this.player, this.optionalParams.trackingFilter), (i = this.prepareAdPodItem(this.vastAd)) && "vpaid" === i.adType && !ve(this.vastAd) && (i = null)), this.vastAdPod)
                    for (var a = null, s = 0; s < this.vastAdPod.length; s++) {
                        var o = this.vastAdPod[s];
                        me(o, this.debugTrackFn, this.player, this.optionalParams.trackingFilter);
                        var l = this.prepareAdPodItem(o);
                        if (l) {
                            if (a !== l.adType && "instream" === a) break;
                            if (a = l.adType, "vpaid" !== l.adType || ve(o)) {
                                var d = n.length + r === s;
                                l && d && n.push(l)
                            } else r++
                        } else r++
                    }
                return n.length || i ? (n.length ? (e = n, this.vastOptions = [], e.forEach((function(e) {
                    t.vastOptions.push(t.getInstreamOptions(e.vastAd))
                }))) : (e = i, this.vastOptions = this.getInstreamOptions(this.vastAd)), this.adPodItems = e, !0) : (this.scheduledAd._pod && this.scheduledAd._pod.length || this.adError("No Compatible Creatives", 403), !1)
            }
        }, {
            key: "prepareAdPodItem",
            value: function(e) {
                e.tracker.linear = "linear";
                var t = "".concat(e.media[0].adType).toLowerCase() || "instream";
                "vpaid" !== t || ve(e) || (t = "instream");
                var i = {
                    vastAd: e,
                    sources: [],
                    adType: t
                };
                void 0 !== this.scheduledAd.skipoffset && (i.skipoffset = this.scheduledAd.skipoffset);
                var r = e.media,
                    n = {};
                if (r.forEach((function(e) {
                    i.sources.push({
                        file: e.file,
                        mimeType: e.type,
                        type: ("" + e.type).replace(/^(?:video|audio)\/(?:x-)?/, "")
                    }), n[e.file] = {
                        width: e.width || 0,
                        height: e.height || 0
                    }
                })), "instream" === t && (i.sources = function(e) {
                    var t;
                    t = jwplayer.api.availableProviders.filter((function(e) {
                        return "flash" !== e.name
                    }));
                    var i = e.filter((function(e) {
                            return t.some((function(t) {
                                return t.supports(e)
                            }))
                        })),
                        r = i.filter((function(e) {
                            return "3gpp" !== e.type
                        }));
                    return r.length ? r : i
                }(i.sources)), 0 === i.sources.length) return null;
                i.vastAd.selectedMedia = i.sources[0];
                var a = this.player.getSafeRegion(!0),
                    s = null,
                    o = null;
                return i.sources.forEach((function(e) {
                    var t = n[e.file];
                    t.width <= a.width && (!s || t.width > n[s.file].width) && (s = e), t.width >= a.width && (!o || t.width < n[o.file].width) && (o = e)
                })), s ? (i.vastAd.selectedMedia = s, s.default = !0) : o && (i.vastAd.selectedMedia = o, o.default = !0), this.mediaType = i.vastAd.selectedMedia.mimeType.toLowerCase(), i.sources = [i.vastAd.selectedMedia], i
            }
        }, {
            key: "getInstreamOptions",
            value: function(e) {
                return {
                    skipoffset: this.getSkipOffset(e),
                    skipMessage: this.optionalParams.skipMessage,
                    skipText: this.optionalParams.skipText
                }
            }
        }, {
            key: "getSkipOffset",
            value: function(e) {
                var t = [this.scheduledAd.skipoffset, this.optionalParams.skipoffset, e.skipoffset].filter((function(e) {
                    return null != e
                }));
                return e.skipoffset = t.length ? this.player.utils.seconds(t[0]) : void 0, e.skipoffset
            }
        }, {
            key: "getVastAd",
            value: function() {
                var e, t = this.scheduledAd._adPodIndex;
                if (this.adPodItems) {
                    if ((e = this.adPodItems.length ? this.adPodItems[t] : this.adPodItems).vastAd) return e.vastAd
                } else if (this.vastAdPod && this.vastAdPod.length) return this.vastAdPod[t];
                return this.vastAd
            }
        }, {
            key: "adError",
            value: function(e, t, i) {
                clearTimeout(this.creativeTimeout), this.creativeTimeout = null;
                var r = this.getVastAd();
                fe(r), t = t || 900;
                var n = "vpaid" === this.adType ? 5e4 : 1e4;
                i = i || n + t;
                var s = a({}, this.scheduledAd, r),
                    o = le(this.playlistItemManager, {
                        message: e,
                        code: t,
                        adErrorCode: i
                    }, s);
                this.vastAdPod && this.scheduledAd._adPodIndex < this.vastAdPod.length - 1 ? this.triggerEvent(j, o) : (r.tracker.error(o.code), this.triggerEvent(E, o), this.removePlayerListeners())
            }
        }, {
            key: "playAd",
            value: function() {
                var e = this.scheduledAd._adPodIndex,
                    t = this.adPodItems[e] || this.adPodItems;
                if (this.adType = t.adType, this.blockingInstreamPlayer) {
                    var i = this.optionalParams.loadingAd;
                    this.blockingInstreamPlayer.setText(i)
                }
                if ("vpaid" === this.adType) return this.playVpaid(t.vastAd);
                if ("static" === this.adType) return this.playStatic(), Promise.resolve();
                var r = Array.isArray(this.adPodItems) ? this.adPodItems.slice(e) : this.adPodItems,
                    n = Array.isArray(this.vastOptions) ? this.vastOptions.slice(e) : this.vastOptions;
                return this.initialIndex = e, this.playInstream(r, n)
            }
        }, {
            key: "clearVpaidBlocking",
            value: function() {
                var e = this.vpaidPlayer.instream;
                e && e !== this.blockingInstreamPlayer && (this.vpaidPlayer.instream = null, this.clearBlocking(e))
            }
        }, {
            key: "clearBlocking",
            value: function(e) {
                (e = e || this.blockingInstreamPlayer) && e !== this.instreamPlayer && e.destroy()
            }
        }, {
            key: "getState",
            value: function() {
                return this.instreamPlayer ? this.instreamPlayer.getState() : this.vpaidPlayer ? this.vpaidPlayer.getState() : ""
            }
        }, {
            key: "clearNonlinear",
            value: function() {
                this.staticPlayer.stop(), this.vpaidPlayer && (this.clearVpaidBlocking(), this.vpaidPlayer && (this.vpaidPlayer.stop(), this.vpaidPlayer.destroy(), this.vpaidPlayer = null))
            }
        }, {
            key: "destroy",
            value: function() {
                if (this.off(), this.removePlayerListeners(), clearTimeout(this.creativeTimeout), this.creativeTimeout = null, this.instreamPlayer) {
                    var e = this.instreamPlayer;
                    this.instreamPlayer = null, this.clearBlocking(e)
                }
                this.vpaidPlayer && (this.clearVpaidBlocking(), this.vpaidPlayer && (this.vpaidPlayer.destroy(), this.vpaidPlayer = null)), this.clearNonlinear(), fe(this.vastAd), this.player = null, this.instreamPlayer = null, this.scheduledAd = null, this.vastBuffet = null, this.vastAd = null, this.vastAdPod = null
            }
        }, {
            key: "pause",
            value: function(e) {
                var t = e.reason;
                this.reason = t || O, this.instreamPlayer ? this.instreamPlayer.pause() : this.vpaidPlayer && this.vpaidPlayer.pause()
            }
        }, {
            key: "play",
            value: function(e) {
                var t = e.reason;
                this.reason = t || O, this.instreamPlayer ? this.instreamPlayer.play() : this.vpaidPlayer && this.vpaidPlayer.play()
            }
        }, {
            key: "skip",
            value: function() {
                if (this.instreamPlayer) {
                    var e = this.getSkipOffset(this.getVastAd());
                    if (e > 0 && this.position < e) return;
                    this.instreamPlayer.skipAd()
                } else this.vpaidPlayer && this.vpaidPlayer.skip()
            }
        }, {
            key: "removePlayerListeners",
            value: function() {
                this.player && (this.player.off("fullscreen", this.playerFullscreenHandler, this), this.player.off("volume", this.playerVolumeHandler, this), this.player.off("mute", this.muteHandler, this), this.player.off("viewable", this.viewableHandler, this)), this.instreamPlayer && this.instreamPlayer.off(null, null, this), this.vpaidPlayer && (this.vpaidPlayer.removeEvents(), this.clearVpaidBlocking(), this.vpaidPlayer && (this.vpaidPlayer.destroy(), this.vpaidPlayer = null)), this.staticPlayer.stop(), this.staticPlayer.removeEvents()
            }
        }, {
            key: "adEventObject",
            value: function(e) {
                var t = this.getVastAd(),
                    i = a({}, this.scheduledAd, t),
                    r = de(this.playlistItemManager, i);
                return r.viewable = this.player.getViewable(), this.adPodItems && this.adPodItems.length && (r.sequence = this.scheduledAd._adPodIndex + 1, r.podcount = this.adPodItems.length), this.mediaType && (r.creativetype = this.mediaType), this.scheduledAd._vmap && (r.vmap = this.scheduledAd._vmap), -1 !== F.indexOf(e) && (r.universalAdId = t.universalAdId, r.categories = t.categories), r
            }
        }, {
            key: "playStatic",
            value: function() {
                this.vastAd.tracker.linear = "nonlinear";
                var e = this.vastAd.media[0];
                this.vastAd.selectedMedia = e;
                var t = this.vastAd.clickthrough || "",
                    i = this.staticPlayer;
                i.removeEvents(), i.on("play", this.impressionHandler, this), i.on("play", this.playHandler, this), i.on("complete", this.combinedCompleteHandler, this), i.on("click", this.clickStaticHandler, this), i.on("error", this.staticErrorHandler, this), this.playlistItemManager.addStaticOffset(this.scheduledAd._offSet), i.playAd(e.file, t, e.minDuration, this.scheduledAd._currentTag, this.scheduledAd.requestTimeout), this.clearBlocking()
            }
        }, {
            key: "creativeAdError",
            value: function(e, t, i) {
                this.adError(e, t, i), this.adPodItems && this.adPodItems.length - 1 > this.scheduledAd._adPodIndex && (this.vpaidPlayer && (this.vpaidPlayer.destroy(), this.vpaidPlayer = null), this.scheduledAd._adPodIndex++, this.playAd())
            }
        }, {
            key: "playVpaid",
            value: function(e) {
                var t = this;
                clearTimeout(this.creativeTimeout), this.creativeTimeout = setTimeout((function() {
                    t.creativeAdError("VPAID tag communication timeout", 900, 50004)
                }), this.scheduledAd.creativeTimeout), this.vastAd = e;
                var i = ve(e),
                    r = this.optionalParams.conditionaladoptout && e.conditionalAd;
                if (this.vastAd.selectedMedia = i, this.mediaType = i.type, "flash" === pe(i)) return this.creativeAdError("Flash creatives are not supported", 403, 10403), Promise.reject();
                var n = {
                    adParams: this.vastAd.adParams,
                    vpaidControls: this.optionalParams.vpaidcontrols,
                    adOptOut: r
                };
                return this.vpaidPlayer = new W(this.player, this.blockingInstreamPlayer, i.file, this.scheduledAd._currentTag, n), this.blockingInstreamPlayer && this.blockingInstreamPlayer.applyProviderListeners(this.vpaidPlayer), this.vpaidPlayer.on("play", this.playHandler, this), this.vpaidPlayer.on("pause", this.pauseHandler, this), this.vpaidPlayer.on("quartile", this.quartileHandler, this), this.vpaidPlayer.on("remainingTimeChange", this.remainingTimeHandler, this), this.vpaidPlayer.on("click", this.clickVpaidHandler, this), this.vpaidPlayer.on("error", this.playbackErrorHandler, this), this.vpaidPlayer.on("impression", this.impressionHandler, this), this.vpaidPlayer.on("expandedChange", this.vpaidExpandedHandler, this), this.vpaidPlayer.on("close", this.adCloseHandler, this), this.vpaidPlayer.on("skipped", this.vpaidAdSkipped, this), this.vpaidPlayer.on("stopped", this.endOfVpaidAdHandler, this), this.vpaidPlayer.on("complete", this.adCompleteHandler, this), this.vpaidPlayer.on("started", this.adStartedHandler, this), this.vpaidPlayer.on("skippableStateChange", this.skippableStateChangeHandler, this), Promise.resolve()
            }
        }, {
            key: "skippableStateChangeHandler",
            value: function(e) {
                e.skippable && this.blockingInstreamPlayer && (this.blockingInstreamPlayer.off("adSkipped", this.skipVpaidAd, this), this.blockingInstreamPlayer.setupSkipButton(0, this.optionalParams, this.player.utils.noop), this.blockingInstreamPlayer.on("adSkipped", this.skipVpaidAd, this))
            }
        }, {
            key: "playInstream",
            value: function(e, t) {
                var i = this,
                    r = this.player.getEnvironment().OS;
                if (r.android && 2 === r.version.major && 3 === r.version.minor) return this.adError("Android 2.3 not supported", 900, 60007), Promise.reject();
                clearTimeout(this.creativeTimeout), this.creativeTimeout = setTimeout((function() {
                    i.creativeAdError("Video creative timeout", 402, 10402)
                }), this.scheduledAd.creativeTimeout), this.blockingInstreamPlayer ? this.instreamPlayer = this.blockingInstreamPlayer : this.instreamPlayer = this.player.createInstream().init(), this.instreamPlayer.on("play", this.playHandler, this), this.instreamPlayer.on("pause", this.pauseHandler, this), this.instreamPlayer.on("time", this.timeHandler, this), this.instreamPlayer.on("playlistItem", this.playlistItemHandler, this), this.instreamPlayer.on("complete", this.adCompleteHandler, this), this.instreamPlayer.on("playlistComplete", this.endOfAdBreakHandler, this), this.instreamPlayer.on("mute", this.muteHandler, this), this.instreamPlayer.on("instreamClick", this.clickInstreamHandler, this), this.instreamPlayer.on("adSkipped", this.adSkipped, this), this.instreamPlayer.on("error", this.playbackErrorHandler, this), this.instreamPlayer.on("mediaError", this.playbackErrorHandler, this), this.instreamPlayer.on("destroyed", (function() {
                    i.instreamPlayer = null
                }), this);
                var n = this.instreamPlayer.loadItem(e, t);
                return this.clearBlocking(), n
            }
        }, {
            key: "playerFullscreenHandler",
            value: function(e) {
                var t = this.getVastAd().tracker;
                e.fullscreen && t.started && t.fullscreen()
            }
        }, {
            key: "playerResizeHandler",
            value: function(e) {
                this.vpaidPlayer && this.vpaidPlayer.resize(e.width, e.height)
            }
        }, {
            key: "playerVolumeHandler",
            value: function(e) {
                this.vpaidPlayer && this.vpaidPlayer.setVolume(e.volume)
            }
        }, {
            key: "playlistItemHandler",
            value: function(e) {
                this.instreamPlayer && (this.scheduledAd._adPodIndex = e.index + this.initialIndex, this.scheduledAd._adPodIndex > 0 && this.triggerEvent(S))
            }
        }, {
            key: "impressionHandler",
            value: function(e) {
                var t = this.getVastAd(),
                    i = t.tracker;
                i.impression();
                var r = a({}, this.scheduledAd, t);
                this.triggerEvent(C, de(this.playlistItemManager, r, {
                    duration: e.duration || t.duration || this.getDurationFromVideoTag(),
                    linear: e.linear || i.linear
                })), this.setupViewableListener()
            }
        }, {
            key: "getDurationFromVideoTag",
            value: function() {
                var e = this.blockingInstreamPlayer ? this.blockingInstreamPlayer.getMediaElement() : null;
                return e ? e.duration : 0
            }
        }, {
            key: "setupViewableListener",
            value: function() {
                this.player.off("viewable", this.viewableHandler, this), this.player.on("viewable", this.viewableHandler, this), this.viewableHandler({
                    viewable: this.player.getViewable()
                })
            }
        }, {
            key: "viewableHandler",
            value: function(e) {
                e.viewable ? (this.viewablePlayedTime = 0, this.lastPosition = null, this.adViewableImpressionHandler = this.adViewableHandler) : this.adViewableImpressionHandler = this.player.utils.noop
            }
        }, {
            key: "playHandler",
            value: function(e) {
                var t = this;
                clearTimeout(this.creativeTimeout), this.creativeTimeout = null;
                var i, r = this.getVastAd(),
                    n = r.tracker;
                if (n.started) "paused" === e.oldstate && (n.resume(), this.dispatchPlay(e));
                else {
                    this.vpaidPlayer && (n.linear = e.linear), this.instreamPlayer && this.impressionHandler({
                        linear: n.linear
                    });
                    var s = a({}, this.scheduledAd, r),
                        o = de(this.playlistItemManager, s, {
                            linear: n.linear,
                            metadata: !0
                        });
                    if (this.triggerEvent("adMeta", o), r.companions) {
                        var l = de(this.playlistItemManager, s, {
                            companions: (i = r.companions, i.map((function(e) {
                                var t, i = "iframe" === e.type || "html" === e.type ? e.type : "static";
                                return e.trackers && e.trackers.creativeView && e.trackers.creativeView.length && (t = e.trackers.creativeView), {
                                    width: e.width,
                                    height: e.height,
                                    type: i,
                                    resource: e.source,
                                    creativeview: t,
                                    click: e.clickthrough
                                }
                            })))
                        });
                        this.triggerEvent("adCompanions", l)
                    }
                    r.icons && (r.iconInstances = r.icons.map((function(e) {
                        return new ce(t.player, e, t.div)
                    })));
                    var d, u = this.companion;
                    d = this.player.utils.flashVersion() > 9 ? r.companions : function(e) {
                        if (e) return e.filter((function(e) {
                            return e.type.indexOf("flash") < 0
                        }));
                        return []
                    }(r.companions), this.optionalParams.companion && d && d.length && (n.hasComp = u.addCompanion(this.optionalParams.companion, d)), n.start(), n.creativeView(), this.dispatchPlay(e)
                }
            }
        }, {
            key: "dispatchPlay",
            value: function(e) {
                "static" === this.adType || "vpaid" === this.adType && "linear" !== e.linear || (null === this.reason && "vpaid" === this.adType && (this.reason = V), this.setState(e))
            }
        }, {
            key: "pauseHandler",
            value: function(e) {
                clearTimeout(this.creativeTimeout), this.creativeTimeout = null, this.getVastAd().tracker.pause(), null === this.reason && "vpaid" === this.adType && (this.reason = V), this.setState(e)
            }
        }, {
            key: "setState",
            value: function(e) {
                var t = e.newstate,
                    i = e.oldstate,
                    r = t === w,
                    n = this.adEventObject(r ? "adPlay" : "adPause");
                (n.newstate = t, null !== this.reason) && (n[r ? "playReason" : "pauseReason"] = this.reason, this.reason = null);
                this.vpaidPlayer ? (n.oldstate = i, this.vpaidPlayer.trigger("state", n)) : this.instreamPlayer.setEventData(n)
            }
        }, {
            key: "remainingTimeHandler",
            value: function(e) {
                var t = this;
                e.duration ? this.duration = e.duration : this.duration = Math.max(1, this.duration, e.remainingTime);
                var i = e.remainingTime >= 0 ? this.duration - e.remainingTime : 0;
                this.position === i ? this.creativeTimeout = this.creativeTimeout || setTimeout((function() {
                    t.creativeAdError("Video stall", 400)
                }), this.scheduledAd.creativeTimeout) : this.creativeTimeout && (clearTimeout(this.creativeTimeout), this.creativeTimeout = null), this.timeHandler({
                    position: i,
                    duration: this.duration,
                    isDurationChange: e.isDurationChange
                })
            }
        }, {
            key: "quartileHandler",
            value: function(e) {
                if (e.duration) this.duration = e.duration;
                else {
                    var t = 4 * e.remainingTime / (4 - e.quartile);
                    this.duration = Math.max(this.duration, 1, t)
                }
                this.timeHandler({
                    position: this.duration * e.quartile * .25,
                    duration: this.duration
                })
            }
        }, {
            key: "adViewableHandler",
            value: function(e) {
                var t = e.position;
                null === this.lastPosition && (this.lastPosition = t);
                var i = t - this.lastPosition;
                this.lastPosition = t, i = Math.min(Math.max(0, i), 4), this.viewablePlayedTime += i, this.viewablePlayedTime >= 2 && (this.player.off("viewable", this.viewableHandler, this), this.adViewableImpressionHandler = this.player.utils.noop, this.triggerEvent("adViewableImpression", {}))
            }
        }, {
            key: "timeHandler",
            value: function(e) {
                var t = this.getVastAd(),
                    i = e.position,
                    r = e.duration;
                this.adViewableImpressionHandler(e);
                var n = r - i,
                    a = t.tracker,
                    s = this.optionalParams.dynamicMessage || "",
                    o = this.optionalParams.podMessage || "";
                if (s && n > 0) {
                    if (s = s.replace(/(\b)xx(s?\b)/gi, "$1".concat(Math.ceil(n), "$2")), this.adPodItems && this.adPodItems.length > 1 && o) {
                        var l = this.scheduledAd._adPodIndex + 1;
                        s = (o = (o = o.replace(/__AD_POD_CURRENT__/g, "".concat(l))).replace(/__AD_POD_LENGTH__/g, "".concat(this.adPodItems.length))) + " " + s
                    }
                    this.instreamPlayer ? this.instreamPlayer.setText(s) : this.vpaidPlayer && this.vpaidPlayer.instream && this.vpaidPlayer.instream.setText(s)
                }
                if (!e.isDurationChange) {
                    a && a.time(i, r), t.iconInstances && t.iconInstances.forEach((function(e) {
                        e.updateTime(i)
                    }));
                    var d = {};
                    d.position = this.position = i, d.duration = r, this.triggerEvent("adTime", d)
                }
            }
        }, {
            key: "combinedCompleteHandler",
            value: function() {
                this.adCompleteHandler(), this.endOfAdBreakHandler()
            }
        }, {
            key: "adCompleteHandler",
            value: function() {
                clearTimeout(this.viewableTimeout);
                var e = this.getVastAd();
                fe(e);
                var t = e.tracker;
                t.firedError || (t.complete(), this.triggerEvent("adComplete"))
            }
        }, {
            key: "adCloseHandler",
            value: function() {
                clearTimeout(this.viewableTimeout);
                var e = this.getVastAd().tracker;
                e.firedError || e.close()
            }
        }, {
            key: "adStartedHandler",
            value: function() {
                this.triggerEvent("adStarted")
            }
        }, {
            key: "endOfVpaidAdHandler",
            value: function() {
                if (clearTimeout(this.viewableTimeout), this.adPodItems && this.adPodItems.length - 1 > this.scheduledAd._adPodIndex) return this.vpaidPlayer && (this.vpaidPlayer.destroy(), this.vpaidPlayer = null), this.scheduledAd._adPodIndex++, void this.playAd();
                this.endOfAdBreakHandler()
            }
        }, {
            key: "endOfAdBreakHandler",
            value: function() {
                this.removePlayerListeners(), this.trigger(x)
            }
        }, {
            key: "muteHandler",
            value: function(e) {
                var t = this.getVastAd().tracker;
                t && (e.mute ? t.mute() : t.unmute(), this.vpaidPlayer && this.vpaidPlayer.setVolume(e.mute ? 0 : this.player.getVolume()))
            }
        }, {
            key: "clickStaticHandler",
            value: function() {
                var e = this.getVastAd();
                this.player.pause({
                    reason: "clickthrough"
                }), this.clickThrough(e)
            }
        }, {
            key: "clickVpaidHandler",
            value: function(e) {
                var t = this.getVastAd(),
                    i = !0;
                e && void 0 !== e.url && (!1 === e.playerHandles && (i = !1), t.clickthrough = e.url), this.clickThrough(t, i)
            }
        }, {
            key: "clickInstreamHandler",
            value: function() {
                "paused" !== this.instreamPlayer.getState() && this.clickThrough(this.getVastAd())
            }
        }, {
            key: "clickThrough",
            value: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                e.tracker.click();
                var i = {};
                e.clickthrough && (i.clickThroughUrl = e.clickthrough), this.reason = "clickthrough", this.triggerEvent("adClick", i), window.jwcast && window.jwcast.player.id || e.clickthrough && t && window.open(e.clickthrough)
            }
        }, {
            key: "skipVpaidAd",
            value: function() {
                this.vpaidPlayer && this.vpaidPlayer.skip() && this.vpaidAdSkipped()
            }
        }, {
            key: "vpaidAdSkipped",
            value: function() {
                this.adSkipped(), this.endOfVpaidAdHandler()
            }
        }, {
            key: "adSkipped",
            value: function() {
                clearTimeout(this.viewableTimeout);
                var e = this.getVastAd();
                e.tracker.skip(), fe(e);
                var t = "vpaid" === this.adType ? void 0 : this.getSkipOffset(e);
                this.triggerEvent("adSkipped", {
                    duration: e.duration,
                    skipoffset: t,
                    position: this.position,
                    watchedPastSkipPoint: this.position - t
                })
            }
        }, {
            key: "playbackErrorHandler",
            value: function(e) {
                var t = e.message || "Error Playing Ad Tag",
                    i = e.code;
                i && 232404 === i ? i = 403 : (!i || i <= 4 || i > 901) && (i = 405), this.vpaidPlayer && "function" == typeof this.vpaidPlayer.off ? (this.vpaidPlayer.off(), this.creativeAdError(t, i, e.adErrorCode)) : this.adError(t, i, e.adErrorCode)
            }
        }, {
            key: "staticErrorHandler",
            value: function() {
                this.adError("Unable to fetch NonLinear resource", 502)
            }
        }, {
            key: "vpaidExpandedHandler",
            value: function(e) {
                var t = this.getVastAd().tracker;
                e.expanded ? t.expand() : t.collapse()
            }
        }, {
            key: "triggerEvent",
            value: function(e, t) {
                var i = this.adEventObject(e);
                t && a(i, t), this.trigger(e, i), -1 === N.indexOf(e) && this.player.trigger(e, i)
            }
        }]), e
    }();

    function pe(e) {
        return function(e) {
            return "application/javascript" === e.type || "application/x-javascript" === e.type
        }(e) ? "html5" : "flash"
    }

    function ve(e) {
        for (var t, i = 0; i < e.media.length; i++) {
            var r = e.media[i];
            if ("html5" === pe(r)) {
                t = r;
                break
            }
        }
        return t
    }

    function me(e, t, i, r) {
        e.tracker = new oe(e, e.trackers, t, i, r)
    }

    function fe(e) {
        e && e.iconInstances && (e.iconInstances.forEach((function(e) {
            e.remove()
        })), e.iconInstances = null)
    }
    var ge = function() {
        function e(i, r, n) {
            t(this, e), this.debugTrackFn = i, this.div = null, this.elem = null, this.environment = r, this.utils = n
        }
        return r(e, [{
            key: "addCompanion",
            value: function(e, t) {
                if (this.div = e, this.elem = document.getElementById(this.div.id), !this.elem) return !1;
                for (var i = 0; i < t.length; i++)
                    if (this.fitsDiv(t[i])) return this.placeCompanion(t[i]), !0;
                return !1
            }
        }, {
            key: "removeCompanion",
            value: function() {
                this.elem.innerHTML = ""
            }
        }, {
            key: "sendPings",
            value: function(e) {
                (e = e.creativeView) && (e.forEach((function(e) {
                    (new Image).src = e
                })), "function" == typeof this.debugTrackFn && this.debugTrackFn({
                    type: "companion",
                    data: {
                        trackers: e
                    }
                }))
            }
        }, {
            key: "placeCompanion",
            value: function(e) {
                var t = this;
                if (this.removeCompanion(), "html" === e.type) {
                    var i = document.createElement("div");
                    i.innerHTML = e.source;
                    var r = i.getElementsByTagName("script");
                    return r.length && r.forEach((function(e) {
                        new t.utils.scriptloader(e.src).load(), e.parentElement.removeChild(e)
                    })), this.elem.appendChild(i), void this.sendPings(e.trackers)
                }
                if ("iframe" === e.type) {
                    var n = document.createElement("iframe");
                    return n.height = this.div.height, n.width = this.div.width, n.src = e.source, n.scrolling = "no", n.style.border = "none", n.marginWidth = 0, n.marginHeight = 0, this.sendPings(e.trackers), this.elem.innerHTML = "", void this.elem.appendChild(n)
                }
                if ("application/x-shockwave-flash" === e.type) {
                    var a = document.createElement("object");
                    return a.setAttribute("type", "application/x-shockwave-flash"), a.setAttribute("data", e.source), a.setAttribute("width", "100%"), a.setAttribute("height", "100%"), a.setAttribute("tabindex", 0), ye(a, "allowfullscreen", "true"), ye(a, "allowscriptaccess", "always"), ye(a, "seamlesstabbing", "true"), ye(a, "wmode", "opaque"), this.elem.appendChild(a), void this.sendPings(e.trackers)
                }
                var s = new Image;
                s.src = e.source, e.clickthrough && (s.onclick = function() {
                    t.utils.openLink(e.clickthrough, "_blank", {
                        rel: "noreferrer"
                    })
                }), this.elem.innerHTML = "", this.elem.appendChild(s), this.sendPings(e.trackers)
            }
        }, {
            key: "fitsDiv",
            value: function(e) {
                return e.width === this.div.width && e.height === this.div.height
            }
        }]), e
    }();

    function ye(e, t, i) {
        var r = document.createElement("param");
        r.setAttribute("name", t), r.setAttribute("value", i), e.appendChild(r)
    }
    var ke = /^((https?:)?\/\/)?(secure)?pubads\.g\.doubleclick\.net\/gampad\/ads\?[\S]*$/;

    function Ae(e, t, i) {
        if (!e) return Promise.resolve(e);
        var r = function(e) {
                var t = e.getConfig(),
                    i = e.getPlaylistItem() || {};
                return {
                    playerHeight: e.getHeight() || t.height || "",
                    playerWidth: e.getWidth() || t.width || "",
                    itemDuration: (r = e.getDuration(), n = 3, a = Math.pow(10, n), Math.round(r * a) / a || ""),
                    item: i,
                    jwpseg: Array.isArray(i.jwpseg) ? i.jwpseg.join(",") : "",
                    placement: ne(t),
                    userAgent: navigator.userAgent
                };
                var r, n, a
            }(t),
            n = r.item,
            a = re();
        e = we(e, "__random-number__", Math.random() * Math.pow(10, 18)), e = we(e, "__timestamp__", (new Date).getTime()), e = we(e, "__page-url__", encodeURIComponent(a.url)), e = we(e, "__referrer__", encodeURIComponent(a.referrer)), e = we(e, "__player-height__", r.playerHeight), e = we(e, "__player-width__", r.playerWidth), e = we(e, "__item-duration__", r.itemDuration), e = we(e, "__jwpseg__", r.jwpseg), e = we(e, "__domain__", encodeURIComponent(a.domain)), e = we(e, "__placement__", r.placement), e = we(e, "__device-ua__", encodeURIComponent(r.userAgent));
        for (var s = (e = i.companion ? we(e, "__companion-div__", i.companion.id) : we(e, "__companion-div__", "")).match(new RegExp(/__item-[a-z 0-9 A-Z]*__/g)), o = 0; s && o < s.length; o++) {
            var l = s[o],
                d = l.substring(7, l.length - 2);
            if (n.hasOwnProperty(d) && "string" == typeof n[d]) {
                var u = n[d];
                u.length > 1e3 && (u = u.substring(0, 1e3)), e = we(e, l, encodeURIComponent(u))
            } else e = we(e, l, "")
        }
        var c = t.getConfig().autostart ? 1 : 0,
            h = t.getMute() ? 1 : 0;
        return -1 !== (e = function(e, t, i) {
            ke.test(e) && (e = "".concat(e, "&vpa=").concat(t, "&vpmute=").concat(i));
            return e
        }(e, c, h)).indexOf("__gdpr__") || -1 !== e.indexOf("__gdpr_consent__") ? te().then((function(t) {
            var i = t.gdprApplies,
                r = t.consentData;
            return e = we(e, "__gdpr__", i ? 1 : 0), we(e, "__gdpr_consent__", r)
        })).catch((function() {
            return e
        })) : Promise.resolve(e)
    }

    function we(e, t, i) {
        return e.replace(t, i)
    }
    var Pe = Array.prototype,
        be = Pe.forEach,
        _e = Pe.map,
        Te = function() {};

    function Ie(e, t, i) {
        e.push({
            message: t,
            code: 1002,
            adErrorCode: 11002,
            id: i
        })
    }

    function Ee() {
        var e = new Error("No AdBreaks in VMAP");
        throw e.adErrorCode = 60005, e
    }
    var Ce = function() {
        function i(e, r) {
            t(this, i), this.utils = r, this._error = null, this._version = null, e && this.parse(e)
        }
        return r(i, [{
            key: "error",
            value: function() {
                return this._error
            }
        }, {
            key: "version",
            value: function() {
                return this._version
            }
        }, {
            key: "parse",
            value: function(e, t) {
                var i, r = this;
                "VAST" === e.nodeName ? i = e : (i = Re(e, "VAST")) || (i = Re(e, "VideoAdServingTemplate")), i || this.throwError(101, "Invalid VAST response");
                var n = "VideoAdServingTemplate" === i.tagName ? 1 : parseFloat(je(i, "version") || 0);
                this._version = n;
                var a, s = Se(i, "Ad"),
                    o = _e.call(s, (function(i) {
                        var a = r.parseAd(n, i);
                        return a.vastversion = n, a.response = e, a.request = t || null, a
                    }));
                return o.length || (a = Se(i, "Error"), be.call(a, (function(e) {
                    var t = Le(e).replace(c, 303);
                    (new Image).src = t
                }))), o
            }
        }, {
            key: "parseAd",
            value: function(t, i, r) {
                r = r || {};
                var n, s, o, l = Re(i, "InLine"),
                    d = Re(i, "Wrapper"),
                    u = l || d,
                    c = u ? Le(Re(u, "AdTitle")) : "";
                return r.sequence = je(i, "sequence"), r.adId = je(i, "id"), r.adTitle = c, r.description = Le(Re(u, "Description")), (!t || t > 4.2 || t < 2) && this.throwError(102, "Vast version not supported"), t >= 4 && (r.conditionalAd = !!je(i, "conditionalAd")), u ? (Ve(u, "Impression", (n = function(e, t, i) {
                    var r = Se(Re(e, "Creatives"), "Creative"),
                        n = {},
                        a = {
                            trackers: n
                        };
                    a.adServingId = Le(Re(e, "AdServingId")), a.adsystem = Le(Re(e, "AdSystem"));
                    var s = Se(e, "Category");
                    return a.categories = _e.call(s, (function(e) {
                        return Le(e)
                    })), be.call(r, (function(e) {
                        var r = Re(e, "Linear"),
                            s = Re(e, "NonLinear"),
                            o = Se(Re(e, "TrackingEvents"), "Tracking");
                        if (t >= 4) {
                            var l = Se(e, "UniversalAdId");
                            a.universalAdId = _e.call(l, (function(e) {
                                return {
                                    universalAdIdRegistry: je(e, "idRegistry") || "unknown",
                                    universalAdIdValue: Le(e) || je(e, "idValue") || "unknown"
                                }
                            }))
                        }
                        a.creativeId = je(e, "id"), a.creativeAdId = je(e, "adId"), (r || s) && be.call(o, (function(e) {
                            Me(n, e)
                        }));
                        var d = Le(Re(e, "AdParameters"));
                        if (d && (a.adParams = d), r) {
                            var u = Re(r, "VideoClicks"),
                                c = Le(Re(u, "ClickThrough")),
                                h = Se(u, "ClickTracking"),
                                p = je(r, "skipoffset"),
                                v = Le(Re(r, "Duration"));
                            be.call(h, (function(e) {
                                Oe(n, "click", Le(e))
                            })), v && (a.duration = i.seconds(v)), c && (a.clickthrough = c), void 0 !== p && (a.skipoffset = p),
                                function(e, t) {
                                    var i = Se(Re(e, "MediaFiles"), "MediaFile"),
                                        r = t.media ? t.media : [];
                                    t.media = r.concat(_e.call(i, (function(e) {
                                        return {
                                            type: je(e, "type"),
                                            file: Le(e),
                                            adType: je(e, "apiFramework") || "",
                                            width: parseInt(je(e, "width"), 10) || 0,
                                            height: parseInt(je(e, "height"), 10) || 0
                                        }
                                    })).filter((function(e) {
                                        return e.file
                                    })))
                                }(r, a),
                                function(e, t) {
                                    var i = Se(e, "Icon");
                                    t.icons = Array.prototype.reduce.call(i, (function(e, t) {
                                        var i, r;
                                        if (i = Re(t, "StaticResource")) r = je(i, "creativeType");
                                        else if (i = Re(t, "IFrameResource")) r = "iframe";
                                        else {
                                            if (!(i = Re(t, "HTMLResource"))) return e;
                                            r = "html"
                                        }
                                        var n = Le(i),
                                            a = {};
                                        a.iconClick = Le(Re(t, "IconClickTracking")) || null, a.iconView = Le(Re(t, "IconViewTracking")) || null;
                                        var s = je(t, "xPosition"),
                                            o = je(t, "yPosition"),
                                            l = {};
                                        return "left" === s || "right" === s ? l[s] = 0 : l.left = parseInt(s, 10) || 0, "top" === o || "bottom" === o ? l[o] = 0 : l.top = parseInt(o, 10) || 0, l.width = parseInt(je(t, "height"), 10) || 0, l.height = parseInt(je(t, "height"), 10) || 0, e.push({
                                            program: je(t, "program"),
                                            style: l,
                                            apiFramework: je(t, "apiFramework"),
                                            offset: je(t, "offset") || "00:00:00",
                                            duration: je(t, "duration") || null,
                                            clickThrough: Le(Re(t, "IconClickThrough")),
                                            trackers: a,
                                            resource: {
                                                resourceType: r,
                                                resourceSource: n
                                            }
                                        }), e
                                    }), t.icons || [])
                                }(r, a)
                        } else if (s) {
                            var m = Le(Re(s, "NonLinearClickThrough"));
                            m && (a.clickthrough = m),
                                function(e, t) {
                                    var i = [],
                                        r = Re(e, "StaticResource");
                                    r && (i.push({
                                        type: je(r, "creativeType"),
                                        file: Le(r),
                                        adType: je(Re(e, "NonLinear"), "apiFramework") || "static",
                                        minDuration: je(Re(e, "NonLinear"), "minSuggestedDuration") || "00:00:00"
                                    }), t.media = i)
                                }(e, a)
                        } else ! function(e, t) {
                            var i = Se(Re(e, "CompanionAds"), "Companion"),
                                r = t.companions ? t.companions : [];
                            be.call(i, (function(e) {
                                var t, i, n = Re(e, "StaticResource"),
                                    a = Re(e, "IFrameResource"),
                                    s = Re(e, "HTMLResource"),
                                    o = {};
                                if (n) t = je(n, "creativeType"), i = Le(n);
                                else if (a) t = "iframe", i = Le(a);
                                else {
                                    if (!s) return;
                                    t = "html", i = Le(s)
                                }
                                var l = Se(Re(e, "TrackingEvents"), "Tracking");
                                be.call(l, (function(e) {
                                    var t = je(e, "event");
                                    Oe(o, t, Le(e))
                                }));
                                var d = Le(Re(e, "CompanionClickThrough"));
                                r.push({
                                    width: parseInt(je(e, "width"), 10),
                                    height: parseInt(je(e, "height"), 10),
                                    type: t,
                                    source: i,
                                    trackers: o,
                                    clickthrough: d
                                })
                            })), t.companions = r
                        }(e, a)
                    })), a
                }(u, t, this.utils)).trackers), Ve(u, "Error", n.trackers), function(e) {
                    var t = {};
                    e.media && e.media.forEach((function(e) {
                        var i = e.type,
                            r = "application/x-mpegURL" === i || "vnd.apple.mpegURL" === i;
                        "vpaid" === e.adType.toLowerCase() || r || (t[i] = t[i] || 0, t[i]++)
                    }));
                    e.mediaFileCompliance = !0, Object.keys(t).forEach((function(i) {
                        var r = t[i];
                        r < 3 && (e.mediaFileCompliance = !1, e.nonComplianceReasons = e.nonComplianceReasons || [], e.nonComplianceReasons.push("".concat(i, " has only ").concat(r, " qualities")))
                    }))
                }(n), d && (n.wrappedURI = Le(Re(d, "VASTAdTagURI")) || Le(Re(d, "VASTAdTagURL")), n.followAdditionalWrappers = JSON.parse(je(d, "followAdditionalWrappers")), n.allowMultipleAds = JSON.parse(je(d, "allowMultipleAds")), n.fallbackOnNoAd = JSON.parse(je(d, "fallbackOnNoAd"))), s = n, o = a({}, r), Object.keys(s).forEach((function(t) {
                    var i = s[t];
                    Array.isArray(o[t]) ? o[t] = o[t].concat(i) : "object" === e(o[t]) && null !== o[t] ? o[t] = a(o[t], i) : o[t] = i
                })), n = o) : this.throwError(303, "No ads", 10303), n
            }
        }, {
            key: "throwError",
            value: function(e, t, i) {
                throw this._error = new Error(t), this._error.code = e, this._error.adErrorCode = i || 1e4 + e, this._error
            }
        }]), i
    }();

    function Se(e, t, i) {
        var r = [];
        return e && (r = e.getElementsByTagName(t), i && r && 0 === r.length && (r = e.getElementsByTagName("".concat(i, ":").concat(t)))), r
    }

    function Re(e, t) {
        if (e) {
            var i = e.getElementsByTagName(t);
            if (i) return i[0]
        }
        return null
    }

    function xe(e, t, i, r) {
        var n = [];
        return e || t ? n = t.getElementsByTagNameNS ? t.getElementsByTagNameNS(e, i) : t.getElementsByTagName("".concat(r, ":").concat(i)) : n
    }

    function je(e, t) {
        return e ? e.getAttribute(t) : null
    }

    function Me(e, t) {
        var i = je(t, "event");
        if ("progress" === i) {
            var r = je(t, "offset");
            i = "".concat(i, "_").concat(r)
        }
        Oe(e, i, Le(t))
    }

    function Le(e) {
        if (e) {
            var t = e.textContent || e.text;
            if (t) return ae(t)
        }
        return ""
    }

    function Oe(e, t, i) {
        e[t] || (e[t] = []), i && (e[t].push(i), Be(i))
    }

    function Ve(e, t, i) {
        var r = Se(e, t);
        _e.call(r, (function(e) {
            Oe(i, t.toLowerCase(), Le(e))
        }))
    }
    var Be = function(e) {
        (e.indexOf("[REGULATIONS]") >= 0 || e.indexOf("[GDPRCONSENT]") >= 0) && (te().catch(Te), Be = Te)
    };

    function He(e) {
        e.onload = e.onreadystatechange = e.onerror = null, "abort" in e && e.abort()
    }
    var De = function() {
        function e(i, r) {
            t(this, e), this.adRules = i, this.utils = r, this.preRoll = null, this.vmap = null, this.postRoll = null, this.midRolls = [], this.playedMidRolls = [], this.duration = 0, this._vmapPromise = null, this._vmapXHR = null
        }
        return r(e, [{
            key: "load",
            value: function(e, t) {
                var i = this;
                if (this._vmapPromise) return this._vmapPromise;
                null !== this._vmapXHR && (He(this._vmapXHR), this._vmapXHR = null);
                var r = Ae(this.getVMAP(), e, t);
                return this._vmapPromise = r.then((function(t) {
                    return new Promise((function(r, n) {
                        i._vmapXHR = e.utils.ajax({
                            url: t,
                            withCredentials: !0,
                            retryWithoutCredentials: !0,
                            requireValidXML: !0,
                            timeout: i.requestTimeout
                        }, r, (function(e, t, i, r) {
                            return n(r)
                        }))
                    })).then((function(r) {
                        return i._vmapXHR = null,
                            function(e, t, i) {
                                var r = [],
                                    n = Se(e, "VMAP", p);
                                if (!n.length) throw new Error("No VMAP tag in response");
                                je(n[0], "version") || Ie(r, "VMAP Schema Error: version missing from VMAP tag", d);
                                var a = Se(e, "AdBreak", p);
                                a.length || Ee();
                                for (var s = e.lookupNamespaceURI(p), o = 0; o < a.length; o++) {
                                    var l = {},
                                        u = {},
                                        c = a[o],
                                        h = je(c, "timeOffset"),
                                        v = je(c, "breakId"),
                                        m = je(c, "breakType"),
                                        f = je(Se(c, "AdSource", p)[0], "id"),
                                        g = Se(c, "AdTagURI", p)[0],
                                        y = Se(c, "VASTData", p)[0] || Se(c, "VASTAdData", p)[0],
                                        k = je(g, "templateType"),
                                        A = Le(g),
                                        w = xe(s, c, "Tracking", p);
                                    if (m || Ie(r, "VMAP Schema Error: missing breakType on AdBreak", v), y || k || Ie(r, "VMAP Schema Error: missing templateType on AdBreak", v), h || Ie(r, "VMAP Schema Error: missing timeOffset on AdBreak", v), l._type = m, l._vmap = {
                                        id: f,
                                        breakid: v,
                                        timeoffset: h
                                    }, y) l._adXML = Re(y, "VAST");
                                    else {
                                        if ("vast2" !== k && "vast3" !== k && "vast4" !== k) continue;
                                        l._adQueue = [A], l._waterfallIndex = 0
                                    }
                                    var P = [];
                                    if (w)
                                        for (var b = 0; b < w.length; b++) {
                                            Me(u, w[b]);
                                            var _ = je(w[b], "event");
                                            P.push(_)
                                        }
                                    switch ((P.indexOf("breakStart") < 0 || P.indexOf("breakEnd") < 0 || P.indexOf("error") < 0) && Ie(r, "Tracking events are missing breakStart, breakEnd, or error for AdBreak", v), l._trackers = u, l._type = m, h) {
                                        case "start":
                                            l._offSet = "pre", t.setPreRoll(l);
                                            break;
                                        case "100%":
                                        case "end":
                                            l._offSet = "post", t.setPostRoll(l);
                                            break;
                                        default:
                                            if (/^#/.test(h)) break;
                                            /^\d\d?(?:\.\d+)?%$/.test(h) ? l._offSet = h : l._offSet = i.seconds(h), t.addMidRoll(l)
                                    }
                                }
                                return t.preRoll || t.midRolls.length || t.postRoll || Ee(), t.sort(null, !0), r
                            }(r.responseXML, i, e.utils).map((function(e) {
                                return a(e, {
                                    vmap: t
                                })
                            }))
                    })).catch((function(r) {
                        i._vmapXHR = null;
                        var n = {
                            id: d,
                            vmap: t
                        };
                        if (r.message) a(n, {
                            message: "VMAP Schema Error: ".concat(r.message),
                            code: 1002,
                            adErrorCode: r.adErrorCode || 11002
                        });
                        else {
                            var s = {
                                    1: {
                                        code: 1007,
                                        message: "Timeout"
                                    },
                                    602: {
                                        code: 1e3,
                                        message: "Invalid XML"
                                    },
                                    default: {
                                        code: 1008,
                                        message: e.getConfig().localization.errors[r.key]
                                    }
                                },
                                o = s[r.code] || s.default;
                            e.utils.log(o.message), a(n, {
                                message: "Error Loading VMAP Schedule",
                                code: o.code,
                                adErrorCode: o.code + 1e4
                            })
                        }
                        throw n
                    }))
                })), this._vmapPromise
            }
        }, {
            key: "canWaterfall",
            value: function(e) {
                return e._adQueue && e._waterfallIndex + 1 < e._adQueue.length
            }
        }, {
            key: "getPreRoll",
            value: function(e) {
                return e && "none" === this.adRules.startOnSeek ? null : qe(this.preRoll, this.requestTimeout, this.creativeTimeout)
            }
        }, {
            key: "getPostRoll",
            value: function(e) {
                var t = qe(this.postRoll, this.requestTimeout, this.creativeTimeout);
                return this.adRules.timeBetweenAdsAllowsAdPlayback(t, e) ? t : null
            }
        }, {
            key: "getMidRollAtIndex",
            value: function(e) {
                return qe(this.midRolls[e], this.requestTimeout, this.creativeTimeout)
            }
        }, {
            key: "getLastMidRollIndexBetweenTime",
            value: function(e, t, i) {
                if (e > t) return null;
                this.sort(i);
                for (var r = this.midRolls.length; r--;) {
                    var n = this.midRolls[r],
                        a = Ne(this.midRolls[r]._offSet, i);
                    if (e >= a) return null;
                    if (t >= a) {
                        var s = qe(n, this.requestTimeout, this.creativeTimeout);
                        if (!this.adRules.timeBetweenAdsAllowsAdPlayback(s)) return null;
                        if (!this.adRules.timeBetweenAds) {
                            if (this.playedMidRolls.indexOf(r) >= 0) return null;
                            this.playedMidRolls.push(r)
                        }
                        return r
                    }
                }
                return null
            }
        }, {
            key: "peek",
            value: function(e, t, i) {
                if (this.midRolls.length > this.playedMidRolls.length) {
                    this.sort(i);
                    for (var r = 0; this.midRolls[r];) {
                        var n = Ne(this.midRolls[r]._offSet, i);
                        if (n >= e && -1 === this.playedMidRolls.indexOf(r)) {
                            var a = ie() + 1e3 * (n - e);
                            return n <= t && this.adRules.timeBetweenAdsAllowsAdPlayback(null, a) ? r : null
                        }
                        r += 1
                    }
                }
                var s = ie() + 1e3 * (i - e);
                return this.postRoll && t >= i && this.adRules.timeBetweenAdsAllowsAdPlayback(null, s) ? -1 : null
            }
        }, {
            key: "getNextMidrollIndex",
            value: function(e, t, i) {
                if (this.adRules.timeBetweenAds || this.adRules.startOnSeek) return this.getLastMidRollIndexBetweenTime(e, t, i);
                if (this.midRolls.length > this.playedMidRolls.length) {
                    var r = this.getClosestIndex(t, i);
                    if (r >= 0 && this.playedMidRolls.indexOf(r) < 0) return this.playedMidRolls.push(r), r
                }
                return null
            }
        }, {
            key: "getMidRolls",
            value: function() {
                var e = this;
                return this.midRolls.map((function(t) {
                    return qe(t, e.requestTimeout, e.creativeTimeout)
                }))
            }
        }, {
            key: "reset",
            value: function() {
                null !== this._vmapXHR && (He(this._vmapXHR), this._vmapXHR = null), this.playedMidRolls = [], this.duration = 0
            }
        }, {
            key: "resetBreakIdByOffset",
            value: function(e) {
                var t;
                e && (t = "pre" === e ? this.preRoll : "post" === e ? this.postRoll : this.midRolls[e], this.resetBreakId(t))
            }
        }, {
            key: "setPreRoll",
            value: function(e) {
                this.resetBreakId(e), this.preRoll = e
            }
        }, {
            key: "addMidRoll",
            value: function(e) {
                this.resetBreakId(e), this.midRolls.push(e), this.duration = 0
            }
        }, {
            key: "setPostRoll",
            value: function(e) {
                this.resetBreakId(e), this.postRoll = e
            }
        }, {
            key: "sort",
            value: function(e, t) {
                (!e || e < 1) && (e = 1), (this.duration !== e || t) && (this.duration = e, this.midRolls.sort((function(t, i) {
                    return Ne(t._offSet, e) - Ne(i._offSet, e)
                })), function(e, t) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        t ? r._vmap.item = i + 1 : (r._adbreak = {
                            item: i + 1,
                            breakid: r._breakId
                        }, r._pod ? r._adbreak.pod = r._pod : r._adbreak.tags = r._adQueue)
                    }
                }(this.getAllAds(), t))
            }
        }, {
            key: "getAllAds",
            value: function() {
                var e = this.preRoll ? [this.preRoll] : [],
                    t = this.postRoll ? [this.postRoll] : [];
                return e.concat(this.midRolls, t)
            }
        }, {
            key: "setVMAP",
            value: function(e) {
                this.vmap = e
            }
        }, {
            key: "isVMAP",
            value: function() {
                return !!this.vmap
            }
        }, {
            key: "getVMAP",
            value: function() {
                return this.vmap
            }
        }, {
            key: "getClosestIndex",
            value: function(e, t) {
                this.sort(t);
                for (var i = this.midRolls.length; i--;)
                    if (e >= Ne(this.midRolls[i]._offSet, t)) return i;
                return -1
            }
        }, {
            key: "resetBreakId",
            value: function(e) {
                e.adBreakId = this.utils.genId(12)
            }
        }]), e
    }();

    function qe(e, t, i) {
        var r;
        if (null !== e) return Object.keys(e).forEach((function(t) {
            var i = e[t];
            (r = r || {})[t] = "_adQueue" === t || "_pod" === t ? i.slice() : i
        })), r ? (r.requestTimeout = t, r.creativeTimeout = i, r._errors = [], r._waterfallIndex = 0, r._adPodIndex = 0, r) : void 0
    }

    function Ne(e, t) {
        return "%" === e.toString().slice(-1) ? t * parseFloat(e.slice(0, -1)) / 100 : parseFloat(e)
    }
    var Fe = function() {
        function e(i) {
            t(this, e), this.utils = i
        }
        return r(e, [{
            key: "getSchedule",
            value: function(e, t) {
                var i = new De(t, this.utils);
                if (i.requestTimeout = Xe(e.requestTimeout, v), i.creativeTimeout = Xe(e.creativeTimeout, m), e.tag) i.setPreRoll({
                    _offSet: "pre",
                    _adQueue: Ue(e.tag),
                    _waterfallIndex: 0
                });
                else if ("string" == typeof e.vastxml) i.setPreRoll({
                    _offSet: "pre",
                    _adXML: e.vastxml
                });
                else {
                    if ("string" == typeof e.schedule) return i.setVMAP(e.schedule), i;
                    if ("string" == typeof e.adschedule) return i.setVMAP(e.adschedule), i;
                    ! function(e, t, i) {
                        var r = t.schedule || t.adschedule;
                        if (!r) return;
                        var n = {};
                        Object.keys(r).forEach((function(e) {
                            var t = r[e];
                            t.ad && (a(t, t.ad), delete t.ad);
                            var s = function(e, t) {
                                    if ("start" === e || "0%" === e || !e && 0 !== e) return "pre";
                                    if ("end" === e || "100%" === e) return "post";
                                    if ("pre" === e || "post" === e || (e + "").indexOf("%") >= 0) return e;
                                    var i = t.seconds(e);
                                    if ("number" == typeof i) return i;
                                    return !1
                                }(t.offset, i),
                                o = Xe(t.requestTimeout, v),
                                l = Xe(t.creativeTimeout, m),
                                d = n[s];
                            if (d) {
                                if ("nonlinear" === t.type) return;
                                "nonlinear" === d._type && (d = null)
                            }
                            var u = n[s] = d || {
                                _offSet: s,
                                _type: t.type,
                                _breakId: e,
                                requestTimeout: o,
                                creativeTimeout: l
                            };
                            !1 === s && i.log("Error: ad offset format not supported", s);
                            var c = t.skipoffset;
                            if (void 0 !== c && void 0 === u.skipoffset && (u.skipoffset = c), t.pod) {
                                var h = u._pod || [];
                                u._pod = h.concat(t.pod)
                            } else if (t.tag) {
                                var p = function(e, t) {
                                    if (!t) return e;
                                    var i = e.indexOf("?") >= 0 ? "&" : "?",
                                        r = e.indexOf("cust_params="),
                                        n = "cust_params=".length,
                                        a = "",
                                        s = "";
                                    if (Object.keys(t).forEach((function(e) {
                                        var i = t[e];
                                        a = "".concat(a).concat(s).concat(e, "=").concat(i), s = "&"
                                    })), a = encodeURIComponent(a), r >= 0) {
                                        var o = e.substr(0, r + n),
                                            l = e.substr(r + n);
                                        return "".concat(o).concat(a, "%26").concat(l)
                                    }
                                    return "".concat(e).concat(i, "cust_params=").concat(a)
                                }(t.tag, t.custParams);
                                u._adQueue && (u._pod = [u._adQueue[0]], delete u._adQueue), u._pod ? u._pod.push(Ue(p)[0]) : u._adQueue = Ue(p)
                            } else {
                                if ("string" != typeof t.vastxml) return void i.log("Error: no ad tag provided");
                                u._adXML = t.vastxml
                            }
                        })), Object.keys(n).forEach((function(i) {
                            var r = n[i];
                            switch (r.skipoffset = void 0 !== r.skipoffset ? r.skipoffset : t.skipoffset, i) {
                                case "pre":
                                    e.setPreRoll(r);
                                    break;
                                case "post":
                                    e.setPostRoll(r);
                                    break;
                                default:
                                    e.addMidRoll(r)
                            }
                        }))
                    }(i, e, this.utils)
                }
                return i.sort(), i
            }
        }, {
            key: "getOptParams",
            value: function(e, t) {
                var i = {
                        cuetext: t.cuetext,
                        dynamicMessage: t.admessage,
                        loadingAd: t.loadingAd,
                        podMessage: t.podmessage,
                        skipoffset: e.skipoffset,
                        skipMessage: t.skipmessage,
                        skipText: t.skiptext,
                        vpaidcontrols: e.vpaidcontrols || !1,
                        conditionaladoptout: e.conditionaladoptout || !1,
                        requestFilter: e.requestFilter,
                        trackingFilter: e.trackingFilter
                    },
                    r = e.companiondiv;
                return r && (i.companion = {
                    id: r.id,
                    height: r.height,
                    width: r.width
                }), i
            }
        }, {
            key: "getAdRules",
            value: function(e) {
                var t = e.rules || {},
                    i = parseInt(t.frequency, 10);
                return {
                    startOn: t.startOn || 1,
                    frequency: isNaN(i) ? 1 : i,
                    timeBetweenAds: t.timeBetweenAds || 0,
                    startOnSeek: t.startOnSeek || null
                }
            }
        }]), e
    }();

    function Ue(e) {
        return Array.isArray(e) ? e.slice(0) : [e]
    }

    function Xe(e, t) {
        return 0 === e ? 1 / 0 : e || t
    }
    var Qe, We, ze, $e = function() {
        function i(e, r, n, s, o) {
            t(this, i), this._scheduledAd = e, this.player = r, this.options = n || {}, this.wrapperOptions = s || {
                followAdditionalAds: !0,
                allowMultipleAds: !0
            }, this.debugTrackFn = o, a(this, r.Events), this._history = [], this.loadedAds = [], this.parser = null, this.promise = null, this.xmlhttp = null, this.wrappedTags = null, this.options.isPodItemLoader || (e.adPlayIds = {})
        }
        return r(i, [{
            key: "load",
            value: function(e) {
                var t = this;
                if (null === this.promise) {
                    this._history.push(e);
                    var i = this.options.requestFilter;
                    this.promise = new Promise((function(r, n) {
                        t.xmlhttp = t.player.utils.ajax({
                            url: e,
                            withCredentials: !0,
                            retryWithoutCredentials: !0,
                            requireValidXML: !0,
                            timeout: t._scheduledAd.requestTimeout,
                            requestFilter: i
                        }, r, (function(e, t, i, r) {
                            return n(r)
                        }))
                    })).catch((function(i) {
                        if (null !== t.player) throw t.ajaxError(i, e)
                    })).then((function(i) {
                        if (null !== t.player) return t.parseXMLString(i.responseXML || i.responseText, e)
                    }))
                }
                return this.promise
            }
        }, {
            key: "destroy",
            value: function() {
                var e;
                (e = this.xmlhttp) && (e.onload = null, e.onreadystatechange = null, e.onerror = null, e.abort && e.abort()), this.player = null, this.xmlhttp = null
            }
        }, {
            key: "scheduledAd",
            value: function() {
                return this._scheduledAd
            }
        }, {
            key: "allAds",
            value: function() {
                return this.loadedAds
            }
        }, {
            key: "podMultipleVastLoaders",
            value: function(e) {
                var t = this,
                    i = e.map((function(e) {
                        return e.then((function(e) {
                            var i = e.adPod();
                            if (i.length) return i;
                            var r = e.adBuffet();
                            return r.length ? [r[0]] : Promise.reject({
                                vloader: t,
                                message: "No compatible ad"
                            })
                        })).catch((function(e) {
                            return {
                                error: e
                            }
                        }))
                    }));
                return Promise.all(i).then((function(e) {
                    var i = 0,
                        r = e.reduce((function(e, r, n) {
                            if (r.error) return r.error.tagIndex = n, t.trigger(j, r.error), e;
                            if (r.length && 0 !== n) {
                                var a = "p".concat(i, "w").concat(t._scheduledAd._waterfallIndex);
                                t._scheduledAd.adPlayIds[a] = t._scheduledAd.adRequestIds[n]
                            }
                            return r.forEach((function(t) {
                                t.sequence = ++i, e.push(t)
                            })), e
                        }), []);
                    return r.length ? (t.loadedAds = r, t) : null
                }))
            }
        }, {
            key: "adPod",
            value: function() {
                var e = [];
                return this.loadedAds.forEach((function(t) {
                    t.sequence && e.push(t)
                })), e.sort((function(e, t) {
                    return e.sequence - t.sequence
                })), e
            }
        }, {
            key: "adBuffet",
            value: function() {
                var e = [];
                return this.loadedAds.forEach((function(t) {
                    t.sequence || e.push(t)
                })), e
            }
        }, {
            key: "parseXMLString",
            value: function(t, r) {
                var n = this;
                return null === this.parser && (this.parser = new Ce(null, this.player.utils)), new Promise((function(i) {
                    var r, a = (r = t, ("object" === ("undefined" == typeof Node ? "undefined" : e(Node)) ? r instanceof Node : r && "object" === e(r) && "number" == typeof r.nodeType && "string" == typeof r.nodeName) ? t : n.player.utils.parseXML(t));
                    if (null === a) {
                        throw {
                            message: "Invalid XML",
                            code: 100
                        }
                    }
                    return i(n.parser.parse(a, n.xmlhttp))
                })).catch((function(e) {
                    if (null !== n.player) {
                        var t = e.code || 900,
                            i = e.adErrorCode || 1e4 + t;
                        throw n.sendErrorEvent(e.message, t, i, r)
                    }
                })).then((function(e) {
                    if (null === n.player) return null;
                    if (0 === e.length) throw n.sendErrorEvent("No ads", 303, 10303, r);
                    var t = e.filter((function(e) {
                        return !e.sequence
                    })).map((function(e) {
                        return e._currentTag = r, e
                    }));
                    n.wrapperOptions.allowMultipleAds ? n.loadedAds = e : n.loadedAds = t, n.options.wrapper = n.options.wrapper || [], n.options.adsystem && n.options.wrapper.push(n.options.adsystem), n.options.adsystem = n.loadedAds[0].adsystem;
                    var a = [];
                    return e.forEach((function(e, r) {
                        if (e.wrappedURI) {
                            if (!1 === n.wrapperOptions.followAdditionalWrappers) return;
                            n.options.wrappedTags = n.options.wrappedTags || [n._scheduledAd._currentTag], n.options.wrappedTags.push(e.wrappedURI);
                            var s = new i(n._scheduledAd, n.player, n.options, {
                                fallbackOnNoAd: e.fallbackOnNoAd,
                                allowMultipleAds: e.allowMultipleAds,
                                followAdditionalWrappers: e.followAdditionalWrappers
                            }, n.debugTrackFn).load(e.wrappedURI).then((function(t) {
                                var i, r, a, s = (i = e, r = t.allAds(), a = [], r.forEach((function(e) {
                                        var t, r;
                                        i.companions && (e.companions = (e.companions ? e.companions : []).concat(i.companions)), i.trackers && (e.trackers = (t = e.trackers, r = i.trackers, t = t || {}, Object.keys(r).forEach((function(e) {
                                            var i = r[e];
                                            t[e] ? t[e] = t[e].concat(i) : t[e] = i
                                        })), t)), i.sequence && (e.sequence = i.sequence), i._currentTag && (e._currentTag = i._currentTag), a.push(e)
                                    })), a),
                                    o = n.loadedAds.indexOf(e);
                                Array.prototype.splice.apply(n.loadedAds, [o, 1].concat(s))
                            })).catch((function(i) {
                                var a = n.sendAdpodErrorEvent(i, e, r),
                                    s = e.fallbackOnNoAd && e.sequence && t.length,
                                    o = n.loadedAds.indexOf(e);
                                if (s) return e.loadError = a, void i.vloader.destroy();
                                if (n.loadedAds.splice(o, 1), i.vloader.destroy(), a.type !== j) throw a;
                                n.trigger(j, a)
                            }));
                            a.push(s)
                        } else n.options.wrapper.length && (e.wrapper = n.options.wrapper, e.wrappedTags = n.options.wrappedTags)
                    })), Promise.all(a)
                })).then((function() {
                    if (null === n.player) return null;
                    var e = n.loadedAds.filter((function(e) {
                        return !e.sequence
                    }));
                    n.loadedAds.forEach((function(t, i) {
                        if (t.loadError)
                            if (e.length) {
                                var r = n.loadedAds[i + 1],
                                    s = r && !r.sequence ? r : e[0];
                                n.loadedAds[i] = a({}, s, {
                                    sequence: t.sequence
                                })
                            } else n.trigger(j, t.loadError)
                    }));
                    var t = n.loadedAds.slice(0),
                        i = t.length;
                    t.forEach((function(e) {
                        e.media && e.media.length || t.length--
                    }));
                    var r = 0 === i,
                        s = t.length !== i;
                    if (r || s) throw n.sendErrorEvent("Ad Tag Empty", 101, 10101, n._history[n._history.length - 1]);
                    return n
                }))
            }
        }, {
            key: "ajaxError",
            value: function(e, t) {
                if (this.player.getAdBlock()) return this.sendErrorEvent("Ad playback blocked by an ad blocker", 900, 60003, t);
                var i = e.code;
                if (601 === i || 602 === i) return this.sendErrorEvent("Invalid XML", 100, 10100, t);
                var r = this.options.wrappedTags && this.options.wrappedTags.length,
                    n = r ? 301 : 900,
                    a = r ? 10301 : 60006;
                return this.sendErrorEvent(e.message || "Error loading file", n, a, t)
            }
        }, {
            key: "firstUrl",
            value: function() {
                return this._history && this._history.length ? this._history[0] : ""
            }
        }, {
            key: "sendAdpodErrorEvent",
            value: function(e, t, i) {
                var r = e.message,
                    n = e.code,
                    a = e.adErrorCode,
                    s = e.url;
                if (1 === this.loadedAds.length) return this.sendErrorEvent(r, n, a, s, i);
                var o = {
                    message: r,
                    code: n,
                    adErrorCode: a,
                    podIndex: i,
                    vloader: this,
                    tag: this.firstUrl() || s,
                    type: j
                };
                return this.trackError(o, t), this.wrappedTags = s, o
            }
        }, {
            key: "sendErrorEvent",
            value: function(e, t, i, r, n) {
                var a = {
                    message: e,
                    code: t,
                    adErrorCode: i,
                    podIndex: n,
                    vloader: this,
                    tag: this.firstUrl() || r,
                    adsystem: this.options.adsystem || ""
                };
                return this.options.wrappedTags && (a.wrapperAdSystem = this.options.wrapper || "", a.wrappedTags = this.options.wrappedTags), this.trackError(a), a
            }
        }, {
            key: "trackError",
            value: function(e, t) {
                var i = e.vloader.allAds();
                if (i && i.length) {
                    var r = t || i[0];
                    if (r) {
                        var n = r.trackers;
                        if (n && n.error) new oe(r, n, this.debugTrackFn, this.player, this.options.trackingFilter).error(e.code)
                    }
                }
            }
        }]), i
    }();
    var Ge = 2e3,
        Je = 3500,
        Ke = "USD",
        Ye = 1,
        Ze = "//c.amazon-adsystem.com/aax2/apstag.js",
        et = "video",
        tt = "3.0.0",
        it = "//js-sec.indexww.com/htv/htv-jwplayer.min.js",
        rt = "//js.spotx.tv/directsdk/v1/",
        nt = "//search.spotxchange.com/ad/vast.html?key=",
        at = "dfp",
        st = "jwp",
        ot = "jwpspotx",
        lt = "jwpdfp",
        dt = st,
        ut = "APS",
        ct = "Index",
        ht = "OpenRTB",
        pt = "SpotX",
        vt = (n(Qe = {}, [at], [ut, "FAN", ct, ht, pt]), n(Qe, [st], ["FAN", ht, pt]), n(Qe, [lt], ["FAN", ht, pt]), n(Qe, [ot], [pt]), Qe),
        mt = "Error loading script",
        ft = (n(We = {}, ["EMX"], {
            endpoint: "https://hbint.emxdgt.com"
        }), n(We, ["PubMatic"], {
            endpoint: "https://openbid.pubmatic.com/translator"
        }), n(We, ["Telaria"], {
            endpoint: "https://jwplayer.eb.tremorhub.com/ad/rtb/jwp",
            preflight: !0
        }), We),
        gt = 1,
        yt = 2,
        kt = 1,
        At = 2,
        wt = 3,
        Pt = 4,
        bt = 5,
        _t = 6,
        Tt = 7,
        It = 8,
        Et = 1,
        Ct = 2,
        St = 3,
        Rt = 4,
        xt = 5,
        jt = 6,
        Mt = {
            BID_WON: 0,
            BID_BELOW_AUCTION_FLOOR: 100,
            LOST_TO_HIGHER_BID: 102
        },
        Lt = "bid",
        Ot = "error",
        Vt = "invalid",
        Bt = "noBid",
        Ht = (n(ze = {}, [Bt], 0), n(ze, [Lt], 1), n(ze, ["timeout"], 2), n(ze, [Vt], 3), n(ze, ["abort"], 4), n(ze, [Ot], 5), ze),
        Dt = 550,
        qt = 590,
        Nt = 599,
        Ft = {
            0: 500,
            400: 501,
            500: 503,
            597: 502
        },
        Ut = [{
            message: "SpotX :: Unable to find ad",
            result: Bt,
            code: Ht[Bt]
        }, {
            message: mt,
            result: Ot,
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
        Xt = 320,
        Qt = [{
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
        Wt = Date.now || function() {
            return (new Date).getTime()
        };

    function zt(e, t) {
        var i = (e || []).filter((function(e) {
            var i = e.min,
                r = e.max;
            return t >= (i || 0) && t <= (r || 1 / 0)
        }))[0];
        if (i) {
            var r = i.min ? Math.floor(100 * i.min) : 0,
                n = Math.floor(100 * t),
                a = i.increment >= .01 ? Math.floor(100 * i.increment) : 1;
            return (r + Math.floor((n - r) / a) * a) / 100
        }
        return parseFloat(t)
    }

    function $t(e, t, i) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            n = e.createElement(t);
        return n.appendChild(e.createCDATASection(i)), Object.keys(r).forEach((function(e) {
            n.setAttribute(e, r[e])
        })), n
    }

    function Gt(e) {
        if ("start" === e || "0%" === e || !e || "pre" === e || "00:00:00" === e) return 0;
        if ("end" === e || "100%" === e || "post" === e) return -2;
        if ("string" == typeof e && e.indexOf("%") >= 0) return -1;
        var t = parseInt(e);
        return t >= 0 ? t : -1
    }

    function Jt(e, t) {
        return new t.scriptloader(e, !1, Je).load().catch((function() {
            return Promise.reject({
                message: mt
            })
        }))
    }

    function Kt(e) {
        return e.outerHTML || (new XMLSerializer).serializeToString(e)
    }
    var Yt = function(e) {
            var t = e.autoplay,
                i = e.mute,
                r = e.autoplayAdsMuted;
            if (t) {
                var n = i || r;
                return "viewable" === t ? n ? jt : xt : n ? Ct : Et
            }
            return i ? Rt : St
        },
        Zt = function(e, t) {
            return e.replace(/\$\{AUCTION_ID\}/g, t.id).replace(/\$\{AUCTION_BID_ID\}/g, t.bid || "").replace(/\$\{AUCTION_IMP_ID\}/g, t.imp).replace(/\$\{AUCTION_SEAT_ID\}/g, t.seat || "").replace(/\$\{AUCTION_AD_ID\}/g, t.ad || "").replace(/\$\{AUCTION_CURRENCY\}/g, t.cur)
        },
        ei = function(e, t, i) {
            var r = i ? i.priceInCents : "",
                n = t.priceInCents ? r / t.priceInCents : "",
                a = Mt[i ? "LOST_TO_HIGHER_BID" : "BID_BELOW_AUCTION_FLOOR"];
            return e.replace(/\$\{AUCTION_PRICE\}/g, r / 100).replace(/\$\{AUCTION_MBR\}/g, n).replace(/\$\{AUCTION_LOSS\}/g, t.winner ? Mt.BID_WON : a)
        },
        ti = {
            postAuctionHandler: function(e, t) {
                if ((!t || t.winner) && e.result === Lt) {
                    e.adm && (e.adm = ei(e.adm, e, t));
                    var i = e.winner ? e.custom.nurl : e.custom.lurl;
                    if (i)
                        if (e.winner && !e.adm) e.tag = ei(i, e, t);
                        else {
                            var r = new XMLHttpRequest;
                            r.open("POST", ei(i, e, t));
                            var n = ft[e.name];
                            n && n.preflight && r.setRequestHeader("x-openrtb-version", "2.5"), r.withCredentials = !0, r.send(null)
                        }
                }
                return delete e.custom, e
            },
            requestBids: function(e, t, i, r) {
                var a = ft[e.name];
                if (!a || !e.id || !e.pubid) return Promise.resolve({
                    result: Vt
                });
                var s, o, l = r.getURLParts(),
                    d = {
                        id: t.adPlayId,
                        imp: [{
                            id: "1",
                            displaymanager: "jwplayer",
                            tagid: e.id,
                            video: {
                                mimes: (s = ["video/mp4", "video/ogg", "video/webm", "video/aac", "application/vnd.apple.mpegurl"], o = document.createElement("video"), s.filter((function(e) {
                                    return o.canPlayType(e)
                                }))).concat("application/javascript"),
                                minduration: 3,
                                maxduration: 300,
                                protocols: [kt, At, wt, Tt, Pt, bt, _t, It],
                                w: t.playerWidth,
                                h: t.playerHeight,
                                startdelay: Gt(t.offset),
                                placement: t.placement,
                                linearity: 1,
                                playbackmethod: [Yt(t)],
                                api: [gt, yt]
                            },
                            bidfloorcur: t.floorPriceCurrency,
                            secure: "https:" === window.location.protocol ? 1 : 0
                        }],
                        site: {
                            domain: l.domain,
                            page: l.url,
                            ref: l.referrer,
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
                    var u = d.imp[0].video;
                    t.skipoffset >= 0 ? (u.skip = 1, u.skipmin = t.skipoffset + 2, u.skipafter = t.skipoffset) : u.skip = 0
                }
                return void 0 !== t.floorPriceCents && (d.imp[0].bidfloor = t.floorPriceCents / 100), (!0 === t.autoplay || "viewable" === t.autoplay && t.viewable) && (d.tmax = t.bidTimeout), t.jwpseg && (d.imp[0].video.ext = {
                    jwpseg: t.jwpseg
                }), r.getGDPRConsentData().then((function(e) {
                    var t = e.gdprApplies,
                        i = e.consentData;
                    d.regs = {
                        ext: {
                            gdpr: t ? 1 : 0
                        }
                    }, t && (d.user = {
                        ext: {
                            consent: i
                        }
                    })
                })).then((function() {
                    return new Promise((function(e) {
                        var t = new XMLHttpRequest;
                        t.onreadystatechange = function() {
                            4 === this.readyState && (e(this), t = null)
                        }, t.open("POST", a.endpoint), a.preflight && (t.setRequestHeader("content-type", "application/json"), t.setRequestHeader("x-openrtb-version", "2.5")), t.withCredentials = !0, t.send(JSON.stringify(d)), i.then((function() {
                            t && (t.abort(), t = null)
                        }))
                    }))
                })).then((function(i) {
                    if (200 === i.status) {
                        var a = JSON.parse(i.responseText),
                            s = t.floorPriceCurrency || Ke,
                            o = a.cur ? a.cur.toUpperCase() : s;
                        if (s !== o) return {
                            result: Ot,
                            code: 551
                        };
                        if (a.id === d.id && a.seatbid && a.seatbid.length) {
                            var l, u = a.seatbid.reduce((function(e, t) {
                                if (null === e && t && t.bid && t.bid.length) {
                                    var i = t.bid.filter((function(e) {
                                        return e.impid === d.imp[0].id
                                    }));
                                    if (i.length) return l = t.seat, i[0]
                                }
                                return e
                            }), null);
                            if (u) {
                                if (u.adm) {
                                    var c = r.parseXML(u.adm);
                                    if (null === c) return {
                                        result: Vt,
                                        code: 331
                                    };
                                    u.adm = Kt(c.documentElement)
                                } else if (!u.nurl) return {
                                    result: Vt,
                                    code: 330
                                };
                                var h = {
                                        id: d.id,
                                        bid: a.bidid,
                                        imp: u.impid,
                                        seat: l,
                                        ad: u.adid,
                                        cur: o
                                    },
                                    p = {
                                        result: Lt,
                                        priceInCents: 100 * u.price,
                                        priceCurrency: o,
                                        adm: u.adm ? Zt(u.adm, h) : null,
                                        custom: {
                                            exp: u.exp,
                                            nurl: u.nurl ? Zt(u.nurl, h) : null,
                                            lurl: u.lurl ? Zt(u.lurl, h) : null
                                        }
                                    };
                                if (t.mediationLayerAdServer === at || t.mediationLayerAdServer === lt) {
                                    var v, m = r.genId(12),
                                        f = e.name.toLowerCase();
                                    p.adm || (p.adm = function(e, t) {
                                        return '\n<VAST version="4.0">\n    <Ad id="'.concat(e, '">\n        <Wrapper>\n            <AdSystem version="').concat("0.2.20", '">JWP</AdSystem>\n            <VASTAdTagURI><![CDATA[').concat(t, "]]></VASTAdTagURI>\n        </Wrapper>\n    </Ad>\n</VAST>\n")
                                    }(m, p.custom.nurl)), p.cacheKey = m, p.custParams = (n(v = {}, ["vpb_".concat(f, "_key")], m), n(v, ["vpb_".concat(f, "_bid")], zt(t.buckets, u.price).toFixed(2)), v)
                                }
                                return p
                            }
                        }
                        return {
                            result: Bt,
                            code: void 0 !== a.nbr ? a.nbr + 400 : Ht[Bt]
                        }
                    }
                    return 204 === i.status ? {
                        result: Bt
                    } : 400 === i.status ? {
                        result: Vt
                    } : {
                        result: Ot
                    }
                }))
            }
        };
    var ii = {
            requestBids: function(e, t, i, r) {
                var n = e.id,
                    a = r.getURLParts(),
                    s = function(e, t, i, r) {
                        return ["https://an.facebook.com/v2/placementbid.json?&placementids[]=".concat(e), "&playerwidth=".concat(t), "&playerheight=".concat(i), "&adformats[]=".concat(et), "&SDK[]=".concat(tt), "&pageurl=".concat(encodeURIComponent(r.url)), "$random=".concat(Math.random() * Math.pow(10, 18))].join("")
                    }(n, t.playerWidth, t.playerHeight, a);
                return function(e, t, i, r) {
                    return !!r && (e === at || t && i === Ke)
                }(t.mediationLayerAdServer, t.floorPriceCents, t.floorPriceCurrency || Ke, s) ? new Promise((function(e) {
                    var t = new XMLHttpRequest;
                    t.onreadystatechange = function() {
                        4 === this.readyState && (e(this), t = null)
                    }, t.open("GET", s), t.withCredentials = !0, t.send(null), i.then((function() {
                        t && (t.abort(), t = null)
                    }))
                })).then((function(e) {
                    if (200 !== e.status) return {
                        result: Ot,
                        message: "Invalid response (status ".concat(e.status, ")")
                    };
                    var i, r, s = JSON.parse(e.responseText),
                        o = s.errors,
                        l = s.request_id;
                    if (o && o.length) return {
                        result: Vt,
                        code: (i = o[0], r = Qt.filter((function(e) {
                            return i.indexOf(e.message) >= 0
                        }))[0], r ? r.code : Xt),
                        requestId: l
                    };
                    var d = s.bids;
                    if (!d || !d[n] || !d[n][0]) return {
                        result: Bt,
                        requestId: l
                    };
                    var u = d[n][0],
                        c = u.bid_price_cents,
                        h = u.bid_id;
                    if (t.mediationLayerAdServer === at || t.mediationLayerAdServer === lt) return {
                        result: Lt,
                        tag: t.tag,
                        custParams: {
                            jwFANBidPrice: zt(t.buckets, c / 100).toFixed(2),
                            jwFANBidID: h
                        },
                        requestId: l
                    };
                    var p = {
                        result: Lt,
                        priceInCents: c,
                        priceCurrency: u.bid_price_currency,
                        requestId: l
                    };
                    return c >= t.floorPriceCents && (p.tag = function(e, t, i, r, n) {
                        return ["https://an.facebook.com/v1/instream/vast.xml?placementid=".concat(e), "&playerwidth=".concat(i), "&playerheight=".concat(r), "&SDK[]=".concat(tt), "&bidid=".concat(t), "&pageurl=".concat(encodeURIComponent(n.url))].join("")
                    }(n, h, t.playerWidth, t.playerHeight, a)), p
                })).catch((function(e) {
                    return {
                        result: Ot,
                        message: "FAN header bidding failed: ".concat(e)
                    }
                })) : Promise.resolve({
                    result: Vt
                })
            }
        },
        ri = null;

    function ni(e) {
        return null === ri && (ri = Promise.resolve(window.apstag).then((function(t) {
            return t && t.init && t.fetchBids ? t : Jt(["file" === document.location.protocol ? "https:" : "", Ze].join(""), e).then((function() {
                return window.apstag
            }))
        })).catch((function(e) {
            throw ri = null, e
        }))), ri
    }
    var ai, si = null,
        oi = null;

    function li(e, t) {
        if (null === oi) {
            var i = Wt(),
                r = si || window.SpotX;
            if (r && r.DirectAdOS) return oi = Promise.resolve({
                SpotX: r,
                loadingTime: 0
            });
            var n = ["file" === document.location.protocol ? "https:" : "", rt, e, ".js"].join("");
            (oi = "function" == typeof require ? (a = n, new Promise((function(e, t) {
                setTimeout(t, Je), require([a], e, t)
            })).catch((function() {
                return Promise.reject({
                    message: mt
                })
            }))).then((function(e) {
                return {
                    SpotX: si = e,
                    loadingTime: Wt() - i
                }
            })).catch((function() {
                return di(n, i, t)
            })) : di(n, i, t)).catch((function() {
                oi = null
            }))
        }
        var a;
        return oi
    }

    function di(e, t, i) {
        return Jt(e, i).then((function() {
            return {
                SpotX: window.SpotX,
                loadingTime: Wt() - t
            }
        }))
    }
    var ui = {
            postAuctionHandler: function(e) {
                return e.scriptLoadingTime = ai, e
            },
            requestBids: function(e, t, i, r) {
                if (!e.id) return Promise.resolve({
                    result: Vt,
                    code: 302
                });
                var n = {
                        placement: t.placement,
                        hide_skin: !0,
                        no_vpaid_ads: !1
                    },
                    s = {
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
                        start_delay: Gt(t.offset)
                    },
                    o = a(n, e.optionalParams, s);
                return e.passFloorPrice && t.floorPriceCents && (o.price_floor = t.floorPriceCents / 100), t.jwpseg && (o.custom = o.custom || {}, o.custom.jwpseg = t.jwpseg), li(e.id, r).then((function(e) {
                    var t = e.SpotX,
                        i = e.loadingTime;
                    ai = i;
                    var r = new t.DirectAdOS(o),
                        n = Wt();
                    return r.getAdServerKVPs().then((function(e) {
                        return {
                            response: e,
                            bidNetworkStartTime: n
                        }
                    }))
                })).then((function(e) {
                    var i = e.response,
                        r = e.bidNetworkStartTime,
                        n = Wt() - r,
                        s = i.spotx_ad_key,
                        o = {
                            spotx_bid: zt(t.buckets, i.spotx_bid).toFixed(2),
                            spotx_ad_key: s
                        },
                        l = 100 * parseFloat(i.spotx_bid),
                        d = {
                            result: Lt,
                            priceInCents: l,
                            custParams: o,
                            scriptLoadingTime: ai,
                            bidNetworkResponseTime: n
                        };
                    return t.mediationLayerAdServer === at ? d : a(d, {
                        tag: ["file:" === document.location.protocol ? "https:" : "", nt, s].join(""),
                        tagKey: s
                    })
                })).catch((function(e) {
                    var t = Ut.filter((function(t) {
                        return t.message === e.message
                    }))[0];
                    return t ? {
                        result: t.result || Vt,
                        code: t.code,
                        scriptLoadingTime: ai
                    } : {
                        result: Ot,
                        message: "SpotX header bidding failed: ".concat(e),
                        scriptLoadingTime: ai
                    }
                }))
            }
        },
        ci = null;

    function hi(e, t) {
        return null === ci && (ci = Promise.resolve(window.indexapi).then((function(i) {
            return i || Jt(["file" === document.location.protocol ? "https:" : "", e || it].join(""), t).then((function() {
                return window.indexapi
            }))
        })).catch((function(e) {
            throw ci = null, e
        }))), ci
    }
    var pi, vi = {
            requestBids: function(e, t, i, r) {
                if (!e.id && !e.script) return Promise.resolve({
                    result: Vt
                });
                var n = a({
                    videoCommonArgs: {
                        protocols: [2, 3, 5, 6],
                        mimes: ["video/mp4", "video/webm", "application/javascript"],
                        apiList: [1, 2]
                    },
                    siteID: e.id
                }, e);
                return hi(e.script, r).then((function(e) {
                    return new Promise((function(i) {
                        e.deferQueue = e.deferQueue || [], e.deferQueue.push((function() {
                            e.solicitIndexVideoAds(t.tag, (function(e, t) {
                                i({
                                    updatedTag: e,
                                    indexTargeting: t
                                })
                            }), n)
                        }))
                    }))
                })).then((function(e) {
                    var i = e.indexTargeting;
                    return void 0 !== i ? {
                        result: Lt,
                        tag: t.tag,
                        custParams: i
                    } : {
                        result: Bt
                    }
                })).catch((function(e) {
                    return {
                        result: Ot,
                        message: "Index Exchange header bidding failed: ".concat(e)
                    }
                }))
            }
        },
        mi = (n(pi = {}, [ut], {
            requestBids: function(e, t, i, r) {
                return e.id && e.slotID ? ni(r).then((function(i) {
                    return i.init({
                        id: e.pubId,
                        adServer: e.adServer
                    }), new Promise((function(r) {
                        i.fetchBids({
                            slots: [{
                                slotID: e.slotID
                            }],
                            timeout: t.bidTimeout
                        }, r)
                    }))
                })).then((function(i) {
                    return i && i[0] && i[0].slotID === e.slotID ? {
                        result: Lt,
                        tag: t.tag,
                        custParams: {
                            amznbid: i[0].amznbid,
                            amzniid: i[0].amzniid
                        }
                    } : {
                        result: Bt
                    }
                })).catch((function(e) {
                    return {
                        result: Ot,
                        message: "Amazon header bidding failed: ".concat(e)
                    }
                })) : Promise.resolve({
                    result: Vt
                })
            }
        }), n(pi, ["FAN"], ii), n(pi, [ct], vi), n(pi, [ht], ti), n(pi, [pt], ui), pi),
        fi = function(e, t) {
            var i = t.parseXML(e.adm);
            if (null === i) return e.adm;
            for (var r = t.getTrackingPixelURLs(e.name, e.cacheKey), n = r.impression, a = r.error, s = i.querySelectorAll("InLine,Wrapper"), o = 0; o < s.length; o += 1) s[o].appendChild($t(i, "Impression", n, {
                id: e.cacheKey
            })), s[o].appendChild($t(i, "Error", a));
            return Kt(i)
        },
        gi = function(e, t, i) {
            var r = e.filter((function(e) {
                return e && e.result === Lt && e.adm && e.cacheKey
            }));
            return 0 === r.length ? Promise.resolve({
                bids: e
            }) : new Promise((function(e) {
                var n = r.map((function(e) {
                        return {
                            type: "xml",
                            ttlseconds: (e.custom || {}).exp || 86400,
                            value: i.getTrackingPixelURLs ? fi(e, i) : e.adm,
                            key: e.cacheKey
                        }
                    })),
                    a = Wt(),
                    s = function(t) {
                        return function() {
                            e({
                                result: t,
                                code: this.status,
                                time: Wt() - a | 0
                            }), o = null
                        }
                    },
                    o = new XMLHttpRequest;
                o.onreadystatechange = function() {
                    if (4 === this.readyState) {
                        var e = 200 === this.status ? Lt : Ot;
                        s(e)()
                    }
                }, o.onabort = s("abort"), o.onerror = s(Ot), o.ontimeout = s("timeout"), o.open("POST", "https://vpb-cache.jwplayer.com/cache"), o.send(JSON.stringify({
                    puts: n
                })), t.then((function(e) {
                    var t = e.result;
                    o && (o.onabort = s(t), o.abort(), o = null)
                }))
            })).then((function(t) {
                var i = t.result,
                    n = t.code,
                    a = t.time;
                return r.forEach((function(e) {
                    var t, r;
                    e.result = i, e.result === Ot && (e.code = (t = n, r = 100 * parseInt(t / 100, 10), Ft[t] || Ft[r] || Nt))
                })), {
                    bids: e,
                    time: a
                }
            }))
        };
    var yi = function() {
            function e() {
                var i = this,
                    r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = r.settings,
                    s = void 0 === n ? {} : n,
                    o = r.bidders,
                    l = void 0 === o ? [] : o,
                    d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    u = arguments.length > 2 ? arguments[2] : void 0;
                t(this, e), this.settings = function(e, t) {
                    var i = a({
                        bidTimeout: Ge,
                        buckets: [],
                        offset: "",
                        playerContainer: t.container,
                        playerHeight: t.height || 0,
                        playerWidth: t.width || 0,
                        tag: "",
                        placement: 1
                    }, t, e);
                    return vt[i.mediationLayerAdServer] || (i.mediationLayerAdServer = dt), i.mediationLayerAdServer === ot && (i.floorPriceCents = Ye), i.floorPriceCurrency ? i.floorPriceCurrency = i.floorPriceCurrency.toUpperCase() : void 0 !== i.floorPriceCents && (i.floorPriceCurrency = Ke), i
                }(s, d), this.utils = u, this.eventProps = {};
                var c = 0 === Gt(this.settings.offset),
                    h = this.settings.mediationLayerAdServer === st || this.settings.mediationLayerAdServer === lt,
                    p = vt[this.settings.mediationLayerAdServer];
                this.bidders = l.filter((function(e) {
                    return (!isNaN(parseFloat(i.settings.floorPriceCents)) || !h) && (-1 !== p.indexOf(e.type || e.name) && (c || e.type === ht || e.name === pt))
                })).map((function(e) {
                    return e.name === ut && e.id && e.slotID ? ni(u) : e.name === ct && (e.script || e.id) ? hi(e.script, u) : e.name === pt && e.id && li(e.id, u), a(e, e.custom_params)
                })), this._bidRequest = null, this._currentTimeout = null, this._onCancelTrigger = null, this.onCancel = new Promise((function(e) {
                    i._onCancelTrigger = e
                }))
            }
            return r(e, [{
                key: "start",
                value: function() {
                    var e, t, i, r, n, s, o, l, d, u, c, h;
                    return this._bidRequest || (this._bidRequest = (e = {
                        bidders: this.bidders,
                        eventProps: this.eventProps,
                        settings: this.settings,
                        onCancel: this.onCancel,
                        utils: this.utils
                    }, t = e.bidders, i = e.eventProps, r = e.settings, n = e.onCancel, s = e.utils, o = r.mediationLayerAdServer === at || r.mediationLayerAdServer === lt, l = r.mediationLayerAdServer === st || r.mediationLayerAdServer === lt || r.mediationLayerAdServer === ot, d = [], u = null, c = null, h = t.map((function(e, t) {
                        var h = Wt(),
                            p = Promise.race([mi[e.type || e.name].requestBids(e, r, n, s), n]).then((function(t) {
                                var i = a({}, e, t, {
                                    timeForBidResponse: Wt() - h | 0
                                }, l && {
                                    winner: !1
                                });
                                return l && i.result === Lt && i.priceInCents >= r.floorPriceCents && (null === c || i.priceInCents > c.priceInCents) && (c = i), i
                            })).catch((function(t) {
                                return a({}, e, {
                                    result: Ot,
                                    code: Dt,
                                    message: t,
                                    timeForBidResponse: Wt() - h | 0
                                })
                            }));
                        return o && e.type === ht ? (d[t] = p, p.then((function(e) {
                            return null === u && (u = Promise.all(d).then((function(e) {
                                return null !== c ? e : gi(e, n, s).then((function(e) {
                                    var t = e.bids,
                                        r = e.time;
                                    return i.timeForVPBCache = r, t
                                }))
                            }))), u.then((function(e) {
                                return e[t]
                            })).catch((function(t) {
                                return a(e, {
                                    result: Ot,
                                    code: qt,
                                    message: t
                                })
                            }))
                        }))) : p
                    })), Promise.all(h).then((function(e) {
                        if (l && c) return c.winner = !0, {
                            bidders: e,
                            result: c
                        };
                        if (o) {
                            var t = e.reduce((function(e, t) {
                                    return t.result === Lt ? a(e || {}, t.custParams) : e
                                }), null),
                                i = {
                                    bidders: e
                                };
                            return null !== t && (i.result = {
                                tag: r.tag,
                                custParams: t
                            }), i
                        }
                        return {
                            bidders: e
                        }
                    })).then((function(e) {
                        return e.bidders = e.bidders.map((function(t) {
                            t.code = t.code || Ht[t.result];
                            var i = mi[t.type || t.name];
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
                            bidders: s(this.bidders),
                            bidTimeout: this.settings.bidTimeout
                        };
                    e !== st && e !== lt || (t.floorPriceCents = +this.settings.floorPriceCents || 0);
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
        ki = function() {},
        Ai = function() {
            function e(i, r, n, s, o) {
                t(this, e), this.config = s, this.item = n, this.params = o, this.player = i, this.schedule = r, this.vmapPromise = null, this._preRollPromise = null, this._midRollPromise = {}, this._postRollPromise = null, this.vmapTracker = null, this._events = [], this._vloaderQueue = [], this._staticAdsOffset = [], this.bids = [], this.bidsPromise = null, this.bidsResult = {}, this._debugTrackFn = s.debug && s.trackFn ? s.trackFn : null, a(this, i.Events)
            }
            return r(e, [{
                key: "init",
                value: function(e, t) {
                    var i = this,
                        r = this.schedule;
                    return r.isVMAP() && (this.vmapPromise = r._vmapPromise.catch(ki)), this.bidsPromise = this.vmapPromise || Promise.resolve(), null !== e && (this.bidsPromise = this.bidsPromise.then((function() {
                        return i.isDestroyed() ? null : i._createBidsPromise(e, t)
                    }))), this.bidsPromise
                }
            }, {
                key: "_createBidsPromise",
                value: function(e, t) {
                    var i = this,
                        r = this.player,
                        n = parseInt(e.bidOnBreaks, 10);
                    return n = n > 0 ? n : 1 / 0, this.bids = this.schedule.getAllAds().slice(0, n).map((function(n) {
                        var a = i.getAdIds(n),
                            s = a.adBreakId,
                            o = a.adPlayId,
                            l = r.getConfig(),
                            d = i.config.skipoffset,
                            u = null != d && d >= 0,
                            c = i.bidsResult[s] = new yi(e, {
                                adPlayId: o,
                                offset: n._offSet,
                                width: r.getWidth(),
                                height: r.getHeight(),
                                container: r.getContainer(),
                                playerId: r.id,
                                autoplay: l.autostart,
                                autoplayAdsMuted: i.config.autoplayadsmuted,
                                adVolume: r.getVolume(),
                                mute: r.getMute(),
                                placement: ne(l),
                                skipoffset: u ? d : -1,
                                language: i.config.locale || r.getConfig().language,
                                viewable: 1 === r.getViewable(),
                                jwpseg: i.item.jwpseg
                            }, {
                                genId: r.utils.genId,
                                getGDPRConsentData: te,
                                getURLParts: re,
                                parseXML: r.utils.parseXML,
                                scriptloader: r.utils.scriptloader
                            });
                        return c.start(), i.trigger(P, de(i, n, t)), c.then((function(e) {
                            var r = e.result;
                            i.isDestroyed() || (r && !r.error && (r.adm ? (n._adXML = r.adm, n._adQueue && n._adQueue.length && n._adQueue.unshift(r.adm)) : r.tag && (n._adQueue = n._adQueue || [], n._adQueue.unshift(r.tag))), i.trigger(b, de(i, n, t)))
                        })), c
                    })), Promise.all(this.bids)
                }
            }, {
                key: "getAdIds",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = t.tagIndex,
                        r = t.podIndex,
                        n = e.adRequestIds && void 0 !== i ? e.adRequestIds[i] : null;
                    if (!n) {
                        var a = r || e._adPodIndex || 0,
                            s = "p".concat(a, "w").concat(e._waterfallIndex || 0);
                        n = "p0w0" === s ? e.adBreakId : e.adPlayIds[s] = e.adPlayIds[s] || this.player.utils.genId(12)
                    }
                    return {
                        adBreakId: e.adBreakId,
                        adPlayId: n
                    }
                }
            }, {
                key: "loadPreRoll",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return null === this._preRollPromise && (this._preRollPromise = this.bidsPromise.then((function() {
                        if (!e.isDestroyed()) {
                            var i = e.schedule.getPreRoll(t.startTime);
                            return i ? (i._position = "pre", e.loadAd(i, t)) : void 0
                        }
                    }))), this._preRollPromise
                }
            }, {
                key: "loadMidRollAtIndex",
                value: function(e, t) {
                    var i = this;
                    return this._midRollPromise[e] || (this._midRollPromise[e] = this.bidsPromise.then((function() {
                        if (!i.isDestroyed()) {
                            var r = i.schedule.getMidRollAtIndex(e);
                            return r ? (r._position = "mid", i.loadAd(r, t)) : void 0
                        }
                    }))), this._midRollPromise[e]
                }
            }, {
                key: "loadPostRoll",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return null === this._postRollPromise && (this._postRollPromise = this.bidsPromise.then((function() {
                        if (!e.isDestroyed()) {
                            var i = e.schedule.getPostRoll(t.startTime);
                            return i ? (i._position = "post", e.loadAd(i, t)) : void 0
                        }
                    }))), this._postRollPromise
                }
            }, {
                key: "loadAd",
                value: function(e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = this.player.utils;
                    if (e._id = e._id || r.genId(12), this.config.preloadAds && (e._preload = i.preload || !1), e._vmapTracker = this.getVMAPTracker(e), e._adQueue || e._adXML || e._pod) {
                        if (i.adBlock) throw le(this, {
                            message: "Ad playback blocked by an ad blocker",
                            adErrorCode: 600003
                        }, e, i);
                        var n;
                        if (e._pod) return this._loadPods(e, i);
                        var a = function() {
                            return t.isDestroyed() ? null : t._dispatchAdLoaded(e, i)
                        };
                        return (n = e._adXML ? this._loadXML(e, i) : this._loadTag(e, i)).then(a).catch(ki), n.catch(a).catch(ki), n.catch((function(e) {
                            return t.isDestroyed() ? null : t._vloaderWaterfall(e, i)
                        }))
                    }
                    r.log("scheduled ad has no url or xml", e)
                }
            }, {
                key: "getVMAPTracker",
                value: function(e) {
                    if (!e._vmapTracker) {
                        var t = new oe(e, e._trackers, this._debugTrackFn, this.player, this.config.trackingFilter);
                        e._vmapTracker = this.vmapTracker = t
                    }
                    return e._vmapTracker
                }
            }, {
                key: "_loadTagUrl",
                value: function(e, t, i) {
                    var r = this;
                    return Ae(t, this.player, this.params).then((function(n) {
                        "function" == typeof r._debugTrackFn && r._debugTrackFn({
                            type: "tagReplacement",
                            data: {
                                actualTag: n,
                                originalTag: t
                            }
                        });
                        var s = r._createVastLoader(e, i),
                            o = s.load(n);
                        return i.isPodItemLoader ? i.tagIndex && (s.scheduledAd().adRequestIds[i.tagIndex] = r.player.utils.genId(12)) : e._currentTag = n, r._dispatchAdRequest(e, a({
                            tag: n
                        }, i)), o
                    }))
                }
            }, {
                key: "_loadTag",
                value: function(e, t) {
                    var i = e._adQueue[e._waterfallIndex];
                    return this._loadTagUrl(e, i, t)
                }
            }, {
                key: "_loadPods",
                value: function(e, t) {
                    var i = this;
                    e.adRequestIds = [];
                    var r = this._createVastLoader(e, t),
                        n = e._pod.map((function(r, n) {
                            var s = a({
                                    tag: r,
                                    isPodItemLoader: !0,
                                    tagIndex: n
                                }, t),
                                o = i._loadTagUrl(e, r, s).catch((function(e) {
                                    return e.tagIndex = n, Promise.reject(e)
                                })),
                                l = function() {
                                    return i.isDestroyed() ? null : i._dispatchAdLoaded(e, s)
                                };
                            return o.then(l).catch(ki), o.catch(l).catch(ki), o
                        }));
                    return r.podMultipleVastLoaders(n)
                }
            }, {
                key: "_loadXML",
                value: function(e, t) {
                    var i;
                    e._currentTag = e._currentTag || ((i = e._adXML).ownerDocument instanceof Document ? i.outerHTML || (new XMLSerializer).serializeToString(i) : null) || e._adXML.toString();
                    var r = this._createVastLoader(e, t).parseXMLString(e._adXML, e._currentTag);
                    return this._dispatchAdRequest(e, t), r
                }
            }, {
                key: "_dispatchAdRequest",
                value: function(e, t) {
                    this.trigger(M, de(this, e, t))
                }
            }, {
                key: "_dispatchAdLoaded",
                value: function(e, t) {
                    this.trigger(R, de(this, e, t))
                }
            }, {
                key: "_handleVastLoadError",
                value: function(e, t, i) {
                    var r = e.vloader;
                    return this.removeVastLoader(r), this._getVloaderErrorObject(e, t, i)
                }
            }, {
                key: "_vloaderWaterfall",
                value: function(e, t) {
                    var i = this._handleVastLoadError(e, null, t),
                        r = e.vloader;
                    return this.adWaterfall(r, i, t)
                }
            }, {
                key: "adWaterfall",
                value: function(e, t, i) {
                    var r = e.scheduledAd();
                    if (this.schedule.canWaterfall(r)) return r._adXML = null, r._waterfallIndex += 1, this._enqueueAdEvent(E, t, i), this.loadAd(r, i);
                    throw t
                }
            }, {
                key: "addStaticOffset",
                value: function(e) {
                    this._staticAdsOffset.push(e)
                }
            }, {
                key: "_createVastLoader",
                value: function(e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = this.config,
                        n = new $e(e, this.player, a({
                            requestFilter: r.requestFilter,
                            trackingFilter: r.trackingFilter
                        }, i));
                    this._vloaderQueue.push(n);
                    var s = 0;
                    return n.on(j, (function(r) {
                        s += 1;
                        var a = t._getVloaderErrorObject(r, null, i);
                        if (t._enqueueAdEvent(E, a, i), !(n._scheduledAd._pod && n._scheduledAd._pod.length === s)) {
                            var o = de(t, e, {
                                podIndex: n._scheduledAd._adPodIndex,
                                tagIndex: s
                            }, i);
                            t._enqueueAdEvent(S, o, i)
                        }
                    })), n
                }
            }, {
                key: "_getVloaderErrorObject",
                value: function(e, t, i) {
                    e.wrapperAdSystem && e.wrapperAdSystem.length !== e.wrappedTags.length && (e.wrapperAdSystem.push(e.adsystem), e.adsystem = "");
                    var r = a({
                        adsystem: e.adsystem,
                        wrapper: e.wrapperAdSystem,
                        wrappedTags: e.wrappedTags
                    }, e.vloader.scheduledAd());
                    return le(this, e, r, a({
                        tag: e.tag,
                        tagIndex: e.tagIndex || t,
                        podIndex: e.podIndex
                    }, i))
                }
            }, {
                key: "_enqueueAdEvent",
                value: function(e, t, i) {
                    this._events.push({
                        type: e,
                        event: t
                    }), i.preload || this.dequeueAdEvents()
                }
            }, {
                key: "dequeueAdEvents",
                value: function() {
                    var e = this;
                    this._events.forEach((function(t) {
                        var i = t.type,
                            r = t.event;
                        return e.trigger(i, r)
                    })), this._events.splice(0)
                }
            }, {
                key: "removeVastLoader",
                value: function(e) {
                    var t = this._vloaderQueue.indexOf(e); - 1 !== t && (e.destroy(), this._vloaderQueue.splice(t, 1))
                }
            }, {
                key: "isDestroyed",
                value: function() {
                    return null === this.player
                }
            }, {
                key: "destroy",
                value: function() {
                    this.bids.forEach((function(e) {
                        return e.stop()
                    })), this._vloaderQueue.forEach((function(e) {
                        return e.destroy()
                    })), this.player = null
                }
            }]), e
        }(),
        wi = document.createElement("img"),
        Pi = document.createElement("img");
    wi.src = Pi.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23191919"/><line stroke="%23CCC" stroke-width="6" x1="32" y1="20" x2="32" y2="44"/><line stroke="%23CCC" stroke-width="6" x1="20" y1="32" x2="44" y2="32"/></svg>', wi.className = "jw-vast-nonlinear-open-button", Pi.className = "jw-vast-nonlinear-close-button";
    var bi = function() {
            function e(i, r, n, s, o) {
                t(this, e), this.player = i, this.environment = i.getEnvironment(), this.div = s, this.staticURL = r, this.clickURL = n, this.loadTimer = -1, this.animationTimer = -1, this.banner = null, a(this, i.Events), this.banner = document.createElement("img"), this.banner.className = "jw-banner", this.banner.id = this.player.id + "_vast_static", this.div.appendChild(wi), this.div.appendChild(this.banner), this.div.appendChild(Pi), this.loadTimer = setTimeout(this.imageLoadError.bind(this), o), this.banner.onerror = this.imageLoadError.bind(this), this.banner.onload = this.onLoaded.bind(this), this.banner.src = this.staticURL
            }
            return r(e, [{
                key: "onLoaded",
                value: function() {
                    if (clearTimeout(this.loadTimer), 0 !== this.banner.naturalWidth) {
                        this.removeBannerEventListeners();
                        var e = this.player.utils;
                        e.addClass(this.div, "jw-vast-nonlinear-active"), e.style(Pi, {
                            bottom: this.banner.height - 8,
                            left: this.banner.width
                        }, !0), new e.UI(this.banner).on("click tap", this.sendClick.bind(this)), Pi.onclick = Pi.ontouchstart = this.collapse.bind(this), wi.onclick = wi.ontouchstart = this.expand.bind(this), this.trigger(H)
                    } else this.imageLoadError()
                }
            }, {
                key: "imageLoadError",
                value: function() {
                    clearTimeout(this.loadTimer), this.trigger(D), this.removeBanner()
                }
            }, {
                key: "sendClick",
                value: function() {
                    this.trigger(B)
                }
            }, {
                key: "collapse",
                value: function(e) {
                    var t = this;
                    e.preventDefault(), this.player.utils.addClass(this.div, "jw-vast-nonlinear-collapsed"), this.animationTimer = setTimeout((function() {
                        t.remove(t.banner), t.remove(Pi), t.animationTimer = -1
                    }), 250)
                }
            }, {
                key: "expand",
                value: function(e) {
                    -1 === this.animationTimer && (e.preventDefault(), this.player.utils.removeClass(this.div, "jw-vast-nonlinear-collapsed"), this.div.appendChild(this.banner), this.div.appendChild(Pi))
                }
            }, {
                key: "remove",
                value: function(e) {
                    this.div.contains(e) && this.div.removeChild(e)
                }
            }, {
                key: "removeBannerEventListeners",
                value: function() {
                    this.banner.onload = this.banner.onerror = null
                }
            }, {
                key: "removeBanner",
                value: function() {
                    this.removeBannerEventListeners(), this.remove(this.banner)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    clearTimeout(this.loadTimer), clearTimeout(this.animationTimer), Pi.onclick = Pi.ontouchstart = wi.onclick = wi.ontouchstart = null, this.off(), this.removeBannerEventListeners()
                }
            }, {
                key: "stop",
                value: function() {
                    this.player.utils.removeClass(this.div, "jw-vast-nonlinear-active jw-vast-nonlinear-collapsed"), this.removeBanner(), this.remove(Pi), this.remove(wi)
                }
            }]), e
        }(),
        _i = function() {
            function e(i, r) {
                t(this, e), this.player = i, this.div = r, this.startTime = 0, this.minDur = 0, this.environment = i.getEnvironment(), a(this, i.Events), this.type = "static", i.on("time", this.dispatchTime, this)
            }
            return r(e, [{
                key: "playAd",
                value: function(e, t, i, r, n) {
                    this.minDur = this.player.utils.seconds(i), this.adTag = r, this.static && (this.static.removeListeners(), this.static.stop()), this.player.utils.addClass(this.div, "jw-vast-nonlinear"), this.static = new bi(this.player, e, t, this.div, n), this.static.on(H, this.startAd, this), this.static.on(B, this.clickHandler, this), this.static.on(D, this.errorHandler, this)
                }
            }, {
                key: "dispatchTime",
                value: function(e) {
                    this.trigger(u, e)
                }
            }, {
                key: "startAd",
                value: function() {
                    this.startTime = this.player.getPosition(), this.minDur > 0 && (0 === this.startTime ? this.on(u, this.startTimingAd, this) : this.on(u, this.timeAd, this)), this.sendEvent(H)
                }
            }, {
                key: "startTimingAd",
                value: function(e) {
                    this.startTime = e.position, this.off(u, this.startTimingAd, this), this.on(u, this.timeAd, this)
                }
            }, {
                key: "timeAd",
                value: function(e) {
                    e.position - this.startTime > this.minDur && (this.off(u, this.timeAd, this), this.stop())
                }
            }, {
                key: "clickHandler",
                value: function() {
                    this.sendEvent(B)
                }
            }, {
                key: "errorHandler",
                value: function() {
                    this.sendEvent(D)
                }
            }, {
                key: "sendEvent",
                value: function(e, t) {
                    (t = t || {}).tag = t.tag || this.adTag, this.trigger(e, t)
                }
            }, {
                key: "removeEvents",
                value: function() {
                    this.off()
                }
            }, {
                key: "getState",
                value: function() {
                    return w
                }
            }, {
                key: "stop",
                value: function() {
                    this.startTime && this.static && (this.startTime = 0, this.minDur = 0, this.off(u, this.startTimingAd, this), this.off(u, this.timeAd, this), this.static.removeListeners(), this.static.stop(), this.sendEvent(q))
                }
            }, {
                key: "pause",
                value: function() {}
            }]), e
        }(),
        Ti = function() {
            function e(i, r) {
                t(this, e), this.player = i, this.options = r, this.ignoreStartOnSeek = !1, this.reset(), r.timeBetweenAds && i.on({
                    adBreakStart: this.handleAdBreakStart,
                    adSkipped: this.handleAdSkipped,
                    adComplete: this.handleAdComplete,
                    adBreakEnd: this.handleAdBreakEnd,
                    destroyPlugin: this.destroy
                }, this)
            }
            return r(e, [{
                key: "clearStartOnSeek",
                value: function() {
                    this.ignoreStartOnSeek = !0
                }
            }, {
                key: "sendAdBreakIgnored",
                value: function(e, t) {
                    e && this.player.trigger(T, function(e, t) {
                        return {
                            id: e._breakId,
                            tag: e._adQueue && e._adQueue.length > 0 ? e._adQueue[0] : e._adXML,
                            client: l,
                            offset: e._offSet,
                            timeSinceLastAd: t,
                            type: T
                        }
                    }(e, t))
                }
            }, {
                key: "rulesAllowAdPlayback",
                value: function(e) {
                    var t = this.options,
                        i = 0 === t.frequency && 1 === e,
                        r = e >= t.startOn && (e - t.startOn) % t.frequency == 0;
                    return i || r
                }
            }, {
                key: "handleAdBreakStart",
                value: function() {
                    this.adSkipped = !1, this.adComplete = !1
                }
            }, {
                key: "handleAdComplete",
                value: function() {
                    this.adComplete = !0
                }
            }, {
                key: "handleAdSkipped",
                value: function() {
                    this.adSkipped = !0
                }
            }, {
                key: "handleAdBreakEnd",
                value: function() {
                    !this.adSkipped && this.adComplete && (this.recentCompletedAdTime = ie())
                }
            }, {
                key: "timeBetweenAdsAllowsAdPlayback",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ie();
                    if (this.options.timeBetweenAds) {
                        var i = (t - this.recentCompletedAdTime) / 1e3;
                        if (i < this.options.timeBetweenAds) return this.sendAdBreakIgnored(e, i), !1
                    }
                    return !0
                }
            }, {
                key: "reset",
                value: function() {
                    this.ignoreStartOnSeek = !1, this.recentCompletedAdTime = 0
                }
            }, {
                key: "destroy",
                value: function() {
                    this.player.off(null, null, this)
                }
            }, {
                key: "timeBetweenAds",
                get: function() {
                    return this.options.timeBetweenAds
                }
            }, {
                key: "startOnSeek",
                get: function() {
                    return this.ignoreStartOnSeek ? null : this.options.startOnSeek
                }
            }]), e
        }(),
        Ii = {};
    var Ei = function() {};
    ! function(e) {
        if (e && "undefined" != typeof window) {
            var t = document.createElement("style");
            t.setAttribute("media", "screen"), t.innerHTML = e, document.head.appendChild(t)
        }
    }(".jwplayer.jw-flag-time-slider-above .jw-vpaid-non-linear{bottom:66px}.jwplayer.jw-breakpoint-7 .jw-vpaid-non-linear{bottom:132px}.jwplayer.jw-flag-user-inactive:not(.jw-state-paused) .jw-vpaid-non-linear{bottom:.5em}.jwplayer .jw-vpaid-non-linear{bottom:60px}.jwplayer .jw-vpaid-iframe{border:0;width:100%;height:100%;position:absolute;overflow:hidden}.jwplayer .jw-plugin-vast.jw-plugin{top:0;width:100%;pointer-events:none}.jwplayer .jw-plugin-vast.jw-plugin *{pointer-events:all}.jwplayer .jw-plugin-vast .jw-ad-icon-container{position:absolute;display:none;pointer-events:all;cursor:pointer}.jwplayer .jw-plugin-vast .jw-ad-icon-container.jw-ad-icon-active{display:block}.jwplayer .jw-plugin-vast .jw-ad-icon-container iframe{pointer-events:none;border:none;height:100%;width:100%;margin:0}.jw-plugin-vast.jw-vast-nonlinear-active .jw-banner{opacity:1}.jw-plugin-vast.jw-vast-nonlinear-active .jw-vast-nonlinear-close-button{margin:0 auto;opacity:.75}.jw-plugin-vast.jw-vast-nonlinear-active:hover .jw-vast-nonlinear-close-button{opacity:1}.jw-plugin-vast.jw-vast-nonlinear-collapsed .jw-vast-nonlinear-open-button{margin:0 auto;opacity:.5}.jw-plugin-vast.jw-vast-nonlinear-collapsed .jw-banner,.jw-plugin-vast.jw-vast-nonlinear-collapsed .jw-vast-nonlinear-close-button{opacity:0}.jw-plugin-vast.jw-vast-nonlinear-collapsed:hover .jw-vast-nonlinear-open-button{opacity:1}.jw-plugin-vast.jw-vast-nonlinear-collapsed:hover .jw-vast-nonlinear-close-button{opacity:0}.jw-plugin-vast .jw-vast-nonlinear-close-button,.jw-plugin-vast .jw-vast-nonlinear-open-button{position:absolute;right:0;bottom:0;left:0;display:block;margin:auto;width:18px;height:18px;cursor:pointer;opacity:0;transition:opacity .2s ease}.jw-plugin-vast .jw-vast-nonlinear-close-button{transform:rotate(45deg)}"), (window.jwplayerPluginJsonp || window.jwplayer().registerPlugin)(l, "8.1", (function(e, t, i) {
        var r = e.getConfig(),
            s = r.key,
            o = e.getEnvironment(),
            l = t.debug && t.trackFn ? t.trackFn : null,
            c = this,
            p = null,
            T = t.bids && t.bids.settings ? t.bids.settings.mediationLayerAdServer || f : null;
        if ((T === f || T === g) && t.bids.bidders) {
            var V = t.bids.bidders;
            V.length && (p = a({}, t.bids, {
                bidders: V
            }))
        }
        var B, H, D, q, N, F, U = {},
            X = !1,
            Q = [],
            W = !1,
            z = 0,
            $ = 0,
            G = !1,
            J = null,
            K = !1,
            Y = new Fe(e.utils),
            Z = new Ti(e, Y.getAdRules(t)),
            ee = new e.utils.Timer;
        this.version = "8.7.6", this.bidsVersion = "0.2.20";
        var te = new De(Z, e.utils),
            re = Y.getSchedule(t, Z);

        function ne(e) {
            se();
            var t = B;
            Promise.resolve(e).then((function() {
                if (!t.isDestroyed()) return ae(e), t.loadAd(e, {
                    adBlock: G
                })
            })).then((function(e) {
                return t.isDestroyed() ? null : pe(e, O)
            })).catch((function(e) {
                return t.isDestroyed() ? null : we(e)
            }))
        }

        function ae(t, i) {
            var r = B,
                n = r.getVMAPTracker(t);
            N.once("destroyed", (function() {
                ee.clear("adBreakStart"), n.breakEnd(), e.trigger(_, de(r, t)), B === r && B.schedule.resetBreakIdByOffset(i)
            })), ee.tick("adBreakStart"), n.breakStart();
            var a = de(r, t);
            e.trigger(I, a), e.trigger(S, a)
        }

        function se() {
            N || (N = e.createInstream().init()).setText(null)
        }

        function oe(i, r) {
            var a, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = function(e, t) {
                    return Z.rulesAllowAdPlayback(t) ? e && e.adschedule ? Y.getSchedule(e, Z) : re : te
                }(i, r),
                l = new Ai(e, o, i, t, U);
            return l.on((n(a = {}, [P], (function(t) {
                return e.trigger(P, t)
            })), n(a, [b], (function(t) {
                return e.trigger(b, t)
            })), n(a, [S], (function(t) {
                return e.trigger(S, t)
            })), n(a, [M], Ae), n(a, [R], ke), n(a, [E], Pe), a), c), o.isVMAP() && (s.requestTimeout = o.requestTimeout, s.creativeTimeout = o.creativeTimeout, o.load(e, U).then((function(e) {
                l.isDestroyed() || e.forEach((function(e) {
                    Pe(le(l, e, null, s))
                }))
            })).catch((function(e) {
                l.isDestroyed() || we(le(l, e, null, s))
            }))), l.init(p, s).then((function() {
                l.isDestroyed() || e.trigger(L, de(l, null, {
                    schedule: o
                }))
            })), l
        }

        function ce() {
            B && (B.schedule.reset(), B.off(null, null, c), B.destroy(), B = null), ve(), ye(), fe(), Z.reset(), e.setCues([]), $ = 0, X = !1
        }

        function pe(t, r) {
            if (B.dequeueAdEvents(), t) return "nonlinear" === t.scheduledAd()._type && ye(),
                function(t, r) {
                    var n = t.scheduledAd();
                    0 === n._waterfallIndex && fe();
                    B.removeVastLoader(t);
                    var a = new Promise((function(n, a) {
                            var s = new he(t, e, D, q, B, i, U);
                            s.on(x, n), s.on(E, a), s.on(C, me), s.on(j, Pe), s.init(N, r).catch(Ei), H = N, N = null, Q.push(s)
                        })),
                        s = B;
                    return a.then((function() {
                        s.isDestroyed() || "nonlinear" === n._type || ye()
                    })).catch((function(e) {
                        if (!s.isDestroyed()) return N = N || H, s.adWaterfall(t, e, {
                            adBlock: G
                        }).then((function(e) {
                            return s.isDestroyed() ? null : pe(e, r)
                        }))
                    }))
                }(t, r);
            ye()
        }

        function ve() {
            Q.forEach((function(e) {
                return e.destroy()
            })), Q.splice(0)
        }

        function me(t) {
            be(t) && (ee.tick("adImpression".concat(t.id)), t.timeLoading = ee.between("adBreakStart", "adImpression".concat(t.id))), e.trigger(C, t)
        }

        function fe() {
            Q.length && Q[Q.length - 1].clearNonlinear()
        }

        function ye() {
            if (N || H) {
                var e = N || H;
                N = null, e.destroy()
            }
            H = null
        }

        function ke(t) {
            var i = t.id;
            ee.tick("adLoaded".concat(i)), t.timeLoading = ee.between("adLoading".concat(i), "adLoaded".concat(i)), e.trigger(R, t)
        }

        function Ae(t) {
            e.trigger(M, t), ee.tick("adLoading".concat(t.id))
        }

        function we(e) {
            e && e.adErrorCode || (e = le(B, {
                message: "An unexpected ad error has occurred",
                sourceError: e
            })), B.dequeueAdEvents(), Pe(e), ve(), ye()
        }

        function Pe(t) {
            be(t) && (ee.tick("adError".concat(t.id)), t.timeLoading = ee.between("adBreakStart", "adError".concat(t.id))), B && B.vmapTracker && B.vmapTracker.error(t.code), 50004 !== t.adErrorCode && 50901 !== t.adErrorCode || !e.getAdBlock() || (G = !0), e.trigger(E, t)
        }

        function be(e) {
            return e.tag && (void 0 === e.podcount || 1 === e.sequence)
        }

        function _e(t) {
            var i = t.getMidRolls(),
                r = [];
            i.length && i.forEach((function(e) {
                "nonlinear" !== e._type && r.push({
                    begin: e._offSet,
                    text: U.cuetext
                })
            })), e.addCues(r)
        }
        re.isVMAP() && re.load(e, U).catch(Ei), a(this, e.Events), e.utils.addClass(i, "jw-plugin-vast"), e.on({
            all: function(i, r) {
                i === u ? function(i) {
                    if (W || 0 === i.duration) return;
                    var r = B.schedule.getNextMidrollIndex($, i.position, i.duration);
                    if ($ = i.position, null !== r) {
                        var n = B.schedule.getMidRollAtIndex(r);
                        "nonlinear" !== n._type && (se(), ae(n, r));
                        var a = B;
                        a.loadMidRollAtIndex(r, {
                            adBlock: G
                        }).then((function(e) {
                            return a.isDestroyed() ? null : pe(e)
                        })).catch((function(e) {
                            return a.isDestroyed() ? null : we(e)
                        }))
                    } else if (t.preloadAds) {
                        var s = i.position + A,
                            o = B.schedule.peek(i.position, s, i.duration);
                        if (null !== o && o >= 0) B.loadMidRollAtIndex(o, {
                            adBlock: G,
                            preload: !0
                        }).catch(Ei);
                        else if (-1 === o) {
                            var l = ie() + 1e3 * (i.duration - i.position);
                            B.loadPostRoll({
                                adBlock: G,
                                preload: !0,
                                startTime: l
                            }).catch(Ei)
                        } else if (null === J && s > i.duration) {
                            var d = e.getPlaylistItem(e.getPlaylistIndex() + 1);
                            K = !d, (d || F) && ((J = oe(d || F, z + 1, {
                                preload: !0
                            })).loadPreRoll({
                                adBlock: G,
                                preload: !0
                            }).catch(Ei), F = null)
                        }
                    }
                }(r) : i === h && function() {
                    if (W) return;
                    var e = B.schedule.getPostRoll();
                    if (e) {
                        "nonlinear" !== e._type && (se(), ae(e, "post"));
                        var t = B;
                        t.loadPostRoll({
                            adBlock: G
                        }).then((function(e) {
                            return t.isDestroyed() ? null : pe(e)
                        })).catch((function(e) {
                            return t.isDestroyed() ? null : we(e)
                        }))
                    }
                }()
            },
            ready: function() {
                var n = this;
                D = new _i(e, i), q = new ge(l, o, {
                    openLink: e.utils.openLink
                }), r.localization = e.getConfig().localization, (U = Y.getOptParams(t, r.localization.advertising)).debugTrackFn = l, Te.catch((function(t) {
                    ce(), e.off(null, null, n), e.playAd = Ei, Pe(le(null, {
                        message: "Ad Error: ".concat(t.message),
                        adErrorCode: 60002,
                        id: d,
                        tag: ""
                    }))
                }))
            },
            relatedReady: function() {
                if (t.preloadAds) {
                    var i = e.getPlugin("related");
                    i && i.on("nextUp", (function(e) {
                        e && "discovery" === e.mode && (F = e)
                    }))
                }
            },
            beforePlay: function(t) {
                if (W || X) return;
                X = !0, B.bids.forEach((function(e) {
                    return e.timeout()
                }));
                var i = (t || {}).startTime || e.getPosition();
                $ = i || $;
                var r = B.schedule.getPreRoll(i);
                if (!r && !B.vmapPromise) return;
                (null !== B.vmapPromise || r && "nonlinear" !== r._type) && se();
                var n = B;
                n.bidsPromise.then((function() {
                    if (!n.isDestroyed()) {
                        var e = n.schedule.getPreRoll(i);
                        e && "nonlinear" !== e._type && ae(e, "pre")
                    }
                })), i ? "none" === Z.startOnSeek && (B._preRollPromise = null) : Z.clearStartOnSeek();
                n.loadPreRoll({
                    adBlock: G,
                    startTime: i
                }).then((function(e) {
                    var i = t && t.playReason ? t.playReason : O;
                    return n.isDestroyed() ? null : pe(e, i)
                })).catch((function(e) {
                    return n.isDestroyed() ? null : we(e)
                }))
            },
            cast: function(e) {
                W = !!e.active
            },
            play: function(e) {
                c.trigger(w, e)
            },
            playlistItem: function(i) {
                z += 1, ce();
                var n = e.getPlaylistItem(i.index);
                J && n !== J.item && !1 === K && (J.off(null, null, c), J.destroy(), J = null);
                B = J || oe(n, z), J = null, B.schedule.isVMAP() ? B.vmapPromise.then((function() {
                    B.isDestroyed() || _e(B.schedule)
                })).catch(Ei) : _e(B.schedule);
                if (t.preloadAds && 1 === z) {
                    var a = r.autostart;
                    !1 === a || a === k && 0 === e.getViewable() ? B.loadPreRoll({
                        adBlock: G,
                        preload: !0
                    }).catch(Ei) : e.once(y, (function() {
                        B.loadPreRoll({
                            adBlock: G,
                            preload: !0
                        }).catch(Ei)
                    }))
                }
            },
            playlistComplete: ce,
            complete: function() {
                fe(), X = !1
            },
            destroyPlugin: ce
        }, this), e.pauseAd = function(e, t) {
            if (e = "boolean" != typeof e || e, Q.length) {
                var i = Q[Q.length - 1];
                e ? i.pause(t || {}) : i.play(t || {})
            }
        }, e.playAd = function(t) {
            var i;
            fe();
            var r = 0 === U.requestTimeout ? 1 / 0 : U.requestTimeout,
                n = 0 === U.creativeTimeout ? 1 / 0 : U.creativeTimeout;
            i = Array.isArray(t) ? t.slice(0) : [t];
            var a = e.utils.genId,
                s = {
                    _id: a(12),
                    _adQueue: i,
                    _waterfallIndex: 0,
                    _adPodIndex: 0,
                    adBreakId: a(12),
                    _offset: 0,
                    _position: ue(e),
                    requestTimeout: r || v,
                    creativeTimeout: n || m
                };
            B ? ne(s) : e.once("playlistItem", (function() {
                return ne(s)
            }))
        }, e.skipAd = function() {
            Q.length && Q[Q.length - 1].skip()
        };
        var Te = function(e, t, i) {
            var r = Ii[t];
            return r || (Ii[t] = new Promise((function(r, n) {
                ! function(i) {
                    var r = new e.key(t);
                    if ("unlimited" === r.edition()) return i();
                    // crack
                    //var n = ["//", "entitlements.jwplayer.com", "/", r.token(), ".json"];

                    var n = ["/", "test", "/", r.token(), ".json"];
                    "file:" === window.location.protocol && n.unshift("https:"), e.ajax(n.join(""), (function(e) {
                        i(e && e.response)
                    }), (function() {
                        i()
                    }), {
                        timeout: 1e4,
                        responseType: "json"
                    })
                }((function(e) {
                    var t, a, s = e || {};
                    !0 === i.outstream ? (t = !1 !== s.canPlayOutstreamAds, a = "Outstream Ad Limit Reached") : (t = !1 !== s.canPlayAds, a = "Ad Limit Reached"), !1 !== t ? r({
                        message: "Can Play Ads"
                    }) : n({
                        message: a
                    })
                }))
            })))
        }(e.utils, s, t);
        Te.catch(Ei), this.destroy = ce
    }))
}();
