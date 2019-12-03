! function() {
    var e = "freewheel",
        t = "TYPE_SCHEDULE",
        i = "-1",
        r = 15e3,
        n = 15e3,
        s = 4e3,
        a = "time",
        o = "adError",
        l = "interaction";

    function d(e) {
        return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function u(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function h(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function c(e, t, i) {
        return t && h(e.prototype, t), i && h(e, i), e
    }

    function f(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }
    var p = function() {
            function e(t, i) {
                u(this, e), this.config = i;
                var a = t.localization.advertising,
                    o = {
                        admessage: a.admessage,
                        podmessage: a.podmessage,
                        cuetext: a.cuetext,
                        loadingAd: a.loadingAd,
                        skipMessage: a.skipmessage,
                        skipText: a.skiptext,
                        debug: !1,
                        admessagedynamickey: /(\b)xx(s?\b)/g,
                        loadVideoTimeout: n,
                        requestTimeout: r,
                        adBlockTimeout: s
                    };
                this.setOptions(o), this.fwassetid = t.fwassetid, this.duration = t.duration || 0, this.freewheel = this.config.freewheel || {}, this.adManagerURL = this.freewheel.adManagerURL, this.profileid = this.freewheel.profileid, this.sectionid = this.freewheel.sectionid, this.networkid = this.freewheel.networkid, this.serverid = this.freewheel.serverid, this.custom = this.freewheel.custom || {}
            }
            return c(e, [{
                key: "getSchedule",
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
                key: "setOptions",
                value: function(e) {
                    var t = this;
                    Object.keys(e).forEach((function(i) {
                        var r = t.config[i] || t.config[i.toLowerCase()],
                            n = e[i],
                            s = d(n);
                        if (void 0 !== r) {
                            if ("boolean" !== s && "number" !== s || (r = function(e) {
                                if ("true" === e) return !0;
                                if ("false" === e) return !1;
                                var t = parseFloat(e);
                                return isNaN(t) ? e : t
                            }(r)), d(r) !== s) throw new Error("invalid parameter: " + i + " should be a " + s);
                            t[i] = r
                        } else t[i] = n
                    })), this.admessagedynamic = e.admessage
                }
            }]), e
        }(),
        v = null;

    function m(e, t) {
        if (v) return v;
        if (window.tv && tv.freewheel) return v = Promise.resolve();
        var i = document.location.protocol,
            r = "file:" === i || "https:" === i ? "https://mssl.fwmrm.net/libs/adm/6.24.0/AdManager.js" : "http://adm.fwmrm.net/libs/adm/6.24.0/AdManager.js",
            n = new e.scriptloader(t || r);
        return v = n.load().then((function() {}))
    }
    var g = {};
    var y = function() {
        function e(t, i) {
            u(this, e), t.extend(this, i), this.isMuted = !1, this.vol = 0, this.freewheelProxy = null
        }
        return c(e, [{
            key: "setProxy",
            value: function(e) {
                this.freewheelProxy = e, this.mute(this.isMuted)
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
                this.isMuted = e, this.freewheelProxy && this.freewheelProxy.setAdVolume(this.isMuted ? 0 : this.vol)
            }
        }, {
            key: "volume",
            value: function(e) {
                this.vol = e / 100, this.freewheelProxy && this.freewheelProxy.setAdVolume(this.vol)
            }
        }, {
            key: "setFullscreen",
            value: function(e) {
                if (this.video) {
                    if (e) try {
                        var t = this.video.webkitEnterFullscreen;
                        t && t.apply(this.video)
                    } catch (e) {
                        return !1
                    } else {
                        var i = this.video.webkitExitFullscreen;
                        i && i.apply(this.video)
                    }
                    return !!e
                }
            }
        }]), e
    }();

    function E(e, t, i) {
        if (!e) return e;
        for (var r, n, s, a, o = t.getPlaylistItem(), l = e.replace("__random-number__", Math.random() * Math.pow(10, 18)).replace("__timestamp__", (new Date).getTime()).replace("__page-url__", encodeURIComponent(window.location.href)).replace("__referrer__", encodeURIComponent(document.referrer)).replace("__player-height__", t.getHeight()).replace("__player-width__", t.getWidth()).replace("__item-duration__", (n = t.getDuration(), s = 3, a = Math.pow(10, s), Math.round(n * a) / a)).replace("__domain__", encodeURIComponent((r = window.location.href.match(new RegExp(/^[^/]*:\/\/\/?([^/]*)/))) && r.length > 1 ? r[1] : "")), d = (l = i.companiondiv && i.companiondiv.id ? l.replace("__companion-div__", i.companiondiv.id) : l.replace("__companion-div__", "")).match(new RegExp(/__item-[a-z 0-9 A-Z]*__/g)), u = 0; d && u < d.length; u++) {
            var h = d[u],
                c = h.substring(7, h.length - 2);
            if (o.hasOwnProperty(c) && t._.isString(o[c])) {
                var f = o[c];
                f.length > 1e3 && (f = f.substring(0, 1e3)), l = l.replace(h, encodeURIComponent(f))
            } else l = l.replace(h, "")
        }
        return o.title && -1 === l.indexOf("vid_t=") && (l += function(e) {
            return -1 !== e.indexOf("?") ? "&" : "?"
        }(l) + "vid_t=" + encodeURIComponent(o.title.substring(0, 100))), l
    }

    function w(e, t, i) {
        if ("start" === e || "0%" === e) return "pre";
        if ("end" === e || "100%" === e) return "post";
        if ("pre" === e || "post" === e || i.indexOf(e, "%") > -1) return e;
        var r = t.seconds(e);
        return !!i.isNumber(r) && r
    }

    function _(e, t, i) {
        var r, n, s, a, o, l = w(e, t, i);
        return l || (l = "pre"), i.isNumber(l) && (r = parseInt(1e3 * l, 10), n = Math.floor(r) % 1e3, s = Math.floor(r / 1e3) % 60, a = Math.floor(r / 6e4) % 60, l = (o = (o = Math.floor(r / 36e5) % 24) < 10 ? "0" + o : o) + ":" + (a = a < 10 ? "0" + a : a) + ":" + (s = s < 10 ? "0" + s : s) + "." + (n = ("000" + n).slice(-3))), l
    }
    var A = function() {
            function e(t, i) {
                u(this, e), this.player = t, this.options = i
            }
            return c(e, [{
                key: "getTagMap",
                value: function(e) {
                    var t = this,
                        i = this.player,
                        r = i.utils,
                        n = {};
                    return r.foreach(function(e, t, i) {
                        var r = {};
                        return t.foreach(e, (function(e, n) {
                            var s = {},
                                a = n;
                            n.ad && (a = n.ad), s.offset = _(a.offset || a.position || n.offset || "", t, i), s.tag = a.tag, a.customadunitname && (s.customadunitname = a.customadunitname), s.type = a.type || n.type || "linear,nonlinear", void 0 !== a.skipoffset && (s.skipoffset = a.skipoffset), r[e] = s
                        })), r
                    }(e, r, i._), (function(e, s) {
                        var a = w(s.offset, r, i._);
                        if (i._.isString(a) && (a = parseFloat(a.replace("pre", "0").replace("post", "-1"))), i._.isNumber(a)) {
                            var o = {
                                tagName: E(s.tag, i, t.options),
                                type: s.type
                            };
                            void 0 !== s.skipoffset && (o.skipoffset = s.skipoffset), s.customadunitname && (o.customAdUnitName = s.customadunitname), n[a] = o
                        }
                    })), n
                }
            }]), e
        }(),
        S = {},
        k = function() {
            function e(t, i, r) {
                u(this, e), this.responsePromise = null, this.streamType = r, this.adsManager = new tv.freewheel.SDK.AdManager, this.adsManager.setNetwork(i.networkid), this.adsManager.setServer(i.serverid), this.options = i || {}, this.version = t, this.schedule = null, this.tagMap = {}, this._fwassetid = null, this._fwduration = 0
            }
            return c(e, [{
                key: "open",
                value: function(e, t, i, r) {
                    var n = this;
                    if (this.currentAdContext) throw new Error("Request already made");
                    var s = t.getSchedule();
                    if (!s) return this.responsePromise = Promise.reject(), this.responsePromise;
                    S[t.sectionid] || (S[t.sectionid] = Math.floor(2147483648 * Math.random()));
                    var a = S[t.sectionid];
                    this.currentAdContext = this.adsManager.newContext(), this.currentAdContext.setProfile(t.profileid);
                    var o = t.freewheel ? t.freewheel.sfid : null;
                    if (this.currentAdContext.setSiteSection(t.sectionid, null, a, null, o), this.currentAdContext.addKeyValue("customTargetingKey", "JSAMDemoPlayer"), this._fwassetid = t.fwassetid, this._fwduration = t.duration, this.schedule = s, this.responsePromise = new Promise((function(e, t) {
                        n.currentAdContext.addEventListener(tv.freewheel.SDK.EVENT_REQUEST_COMPLETE, e), n.currentAdContext.addEventListener(tv.freewheel.SDK.EVENT_ERROR, t)
                    })), "string" == typeof s) this.currentAdContext.addTemporalSlot(s, tv.freewheel.SDK.ADUNIT_PREROLL, 0);
                    else
                        for (var l = new A(i, r), d = this.tagMap = l.getTagMap(s), u = Object.keys(d), h = 0; h < u.length; h++) {
                            var c = parseInt(u[h]),
                                f = d[c].tagName,
                                p = d[c].customAdUnitName,
                                v = null;
                            if ("overlay" === d[c].type) {
                                if (-1 === c) continue;
                                v = tv.freewheel.SDK.ADUNIT_OVERLAY
                            }
                            if (!v) switch (c) {
                                case 0:
                                    v = p || tv.freewheel.SDK.ADUNIT_PREROLL;
                                    break;
                                case -1:
                                    v = p || tv.freewheel.SDK.ADUNIT_POSTROLL, c = this.options.duration || 1;
                                    break;
                                default:
                                    v = p || tv.freewheel.SDK.ADUNIT_MIDROLL
                            }
                            this.currentAdContext.addTemporalSlot(f, v, c)
                        }
                    var m = this.options.custom;
                    for (var g in m) Object.prototype.hasOwnProperty.call(m, g) && this.currentAdContext.addKeyValue(g, m[g]);
                    return this.responsePromise
                }
            }, {
                key: "requestAds",
                value: function(e) {
                    var t = e.getConfig(),
                        i = tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_NONE;
                    t.autostart && (i = t.playOnViewable ? tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_ATTENDED : tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_UNATTENDED);
                    var r = Math.floor(2147483648 * Math.random()),
                        n = this.options.freewheel ? this.options.freewheel.afid : null;
                    "LIVE" === t.streamType || this.streamType && "LIVE" === this.streamType.toUpperCase() ? (this.currentAdContext.setVideoAsset(this._fwassetid, this._fwduration, null, null, i, r, null, n, tv.freewheel.SDK.VIDEO_ASSET_DURATION_TYPE_VARIABLE), this.currentAdContext.setRequestMode(tv.freewheel.SDK.REQUEST_MODE_LIVE)) : this.currentAdContext.setVideoAsset(this._fwassetid, this._fwduration, null, null, i, r, null, n);
                    var s = Math.floor(t.bandwidthEstimate / 1e3);
                    this.currentAdContext.setParameter(tv.freewheel.SDK.PARAMETER_DESIRED_BITRATE, s, tv.freewheel.SDK.PARAMETER_LEVEL_OVERRIDE), this.currentAdContext.setParameter(tv.freewheel.SDK.PARAMETER_EXTENSION_CONTENT_VIDEO_ENABLED, !1, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
                    var a = e.getContainer(),
                        o = a.querySelector(".jw-wrapper");
                    o.id = "".concat(a.id, "-jw-wrapper"), this.currentAdContext.registerVideoDisplayBase(o.id), this.currentAdContext.submitRequest()
                }
            }, {
                key: "destroy",
                value: function() {}
            }]), e
        }();

    function T(t, i) {
        var r, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            s = (f(r = {}, tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL, "pre"), f(r, tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL, "mid"), f(r, tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL, "post"), f(r, tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY, "overlay"), f(r, tv.freewheel.SDK.TIME_POSITION_CLASS_DISPLAY, "display"), r);
        return {
            type: t,
            client: e,
            adposition: s[n] || I(i),
            viewable: i.getViewable()
        }
    }

    function I(e) {
        return e.isBeforePlay() || 0 === e.getPosition() ? "pre" : e.isBeforeComplete() || e.getPosition() === e.getDuration() ? "post" : "mid"
    }
    var P = function() {
        function t(e, i, r, n, s) {
            var a = this;
            u(this, t), r.utils.extend(this, r.Events), this.item = e, this.options = i, this.streamType = s, this.player = r, this.utils = r.utils, this.style = r.utils.style, this.environment = r.getEnvironment(), this.instreamProvider = n, this.initAdsManagerPromise = null, this.adsLoadedPromise = null, this.blockingInstreamPlayer = null, this.video = null, this.timeoutAdStart = -1, this.timeoutAdLoad = -1, this.adBlockTimeout = -1, this.progressIntervalId = -1, this.nonlinearContainerId = null, this.slots = {
                prerolls: [],
                midrolls: [],
                postrolls: []
            }, this.playedMidrollIndex = [], this.mobileEventListeners = {
                play: function() {
                    return a.adResume({
                        reason: a.reason || l
                    })
                },
                beginFullscreen: function(e) {
                    return a.startFullscreen(e)
                },
                endFullscreen: function(e) {
                    return a.endFullscreen(e)
                }
            }, this.reason = null, this.playerEventListeners = {
                "idle play pause beforeComplete": this.setVideoState
            }, this.addPlayerListeners(), this._qoe = new r.utils.Timer
        }
        return c(t, [{
            key: "init",
            value: function(t, i) {
                var r = this;
                this.initAdsManagerPromise = m().then((function() {
                    return r.destroyed() ? null : (r.adsLoaderManager = new k(r.player.version, r.options, r.streamType), r.player.trigger("adManager", {
                        adManager: r.adsLoaderManager.adsManager
                    }), r.player.trigger("adsManager", {
                        adsManager: r.adsLoaderManager.adsManager
                    }), r.adsLoaderManager)
                })).catch((function(e) {
                    return r.asyncError(e)
                })), this.adsLoadedPromise = this.initAdsManagerPromise.then((function() {
                    return r.adsLoaderManager.open(t, i, r.player, r.options)
                })).then((function(t) {
                    if (r.destroyed()) return null;
                    if (t.success) {
                        r.trigger("adRequest", {
                            client: e,
                            networkid: t.response.networkId
                        });
                        var i = r.adsLoaderManager.currentAdContext;
                        r.instreamProvider.setProxy(i);
                        for (var n = i.getTemporalSlots(), s = [], a = 0; a < n.length; a++) {
                            var o = n[a];
                            switch (o.getTimePositionClass()) {
                                case tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL:
                                    r.slots.prerolls.push(o);
                                    break;
                                case tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY:
                                    r.slots.midrolls.push(o);
                                    break;
                                case tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL:
                                    r.slots.midrolls.push(o), s.push({
                                        begin: o.getTimePosition(),
                                        text: r.options.cuetext
                                    });
                                    break;
                                case tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL:
                                    r.slots.postrolls.push(o)
                            }
                        }
                        r.player.addCues(s), r.registerEvents(i), i.setParameter(tv.freewheel.SDK.PARAMETER_RENDERER_VIDEO_DISPLAY_CONTROLS_WHEN_PAUSE, !1, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL)
                    } else r.asyncError(t);
                    return r.slots.prerolls.length && r.utils.addClass(r.player.getContainer(), "jw-flag-ads-freewheel"), t
                })).catch((function(e) {
                    return r.asyncError(e)
                }))
            }
        }, {
            key: "registerEvents",
            value: function(e) {
                var t = this;
                e.addEventListener(tv.freewheel.SDK.EVENT_SLOT_STARTED, (function(e) {
                    return t.adStarted(e)
                })), e.addEventListener(tv.freewheel.SDK.EVENT_SLOT_ENDED, (function(e) {
                    return t.adSlotComplete(e)
                })), e.addEventListener(tv.freewheel.SDK.EVENT_AD, (function(e) {
                    return t.allAdEvent(e)
                }))
            }
        }, {
            key: "startFullscreen",
            value: function(e) {
                this.sendFullscreenEvent(e, !0)
            }
        }, {
            key: "endFullscreen",
            value: function(e) {
                this.sendFullscreenEvent(e, !1)
            }
        }, {
            key: "sendFullscreenEvent",
            value: function(e, t) {
                this.blockingInstreamPlayer && this.blockingInstreamPlayer.trigger("fullscreenchange", {
                    target: e.target,
                    jwstate: t
                })
            }
        }, {
            key: "adErrorEventObject",
            value: function(t) {
                if (60003 === t.adErrorCode) return t;
                var i = t.adInstance,
                    r = tv ? t[tv.freewheel.SDK.INFO_KEY_ERROR_INFO] : "FreeWheel SDK unavailable";
                return {
                    id: i ? i.getAdId() : void 0,
                    client: e,
                    message: "Ad Error: " + r,
                    code: t[tv.freewheel.SDK.INFO_KEY_ERROR_CODE],
                    module: t[tv.freewheel.SDK.INFO_KEY_ERROR_MODULE]
                }
            }
        }, {
            key: "adEventObject",
            value: function(t) {
                var i = this.currentSlot,
                    r = {
                        client: e
                    };
                if (i && (r.tag = i.getCustomId()), !t && i && (t = i.getCurrentAdInstance()), !t) return r;
                var n = i.getTimePositionClass(),
                    s = "OVERLAY" === n,
                    a = t.getActiveCreativeRendition();
                r.freewheel = {
                    ad: {
                        adId: t.getAdId()
                    }
                }, r.adposition = n.toLowerCase().replace("roll", ""), r.id = t.getAdId(), r.linear = s ? "nonlinear" : "linear", r.creativetype = "static", r.viewable = this.player.getViewable(), s || (r.creativetype = "VPAID" === a.getCreativeApi() ? "vpaid-js" : a.getContentType());
                var o = i.getAdCount();
                return o > 1 && (r.sequence = i.getAdInstances().indexOf(t), r.podcount = o), t.skipoffset && (r.skipoffset = t.skipoffset), r
            }
        }, {
            key: "allAdEvent",
            value: function(e) {
                var t = e.subType;
                switch (t) {
                    case tv.freewheel.SDK.EVENT_AD_IMPRESSION:
                        this.adImpression.call(this, e);
                        break;
                    case tv.freewheel.SDK.EVENT_AD_IMPRESSION_END:
                        this.setTimeoutAdStart.call(this, e);
                        break;
                    case tv.freewheel.SDK.EVENT_AD_PAUSE:
                    case tv.freewheel.SDK.EVENT_AD_RESUME:
                        var i = e.adInstance;
                        null === this.reason && "VPAID" === i.getActiveCreativeRendition().getCreativeApi() && (this.reason = "external");
                        var r = t === tv.freewheel.SDK.EVENT_AD_PAUSE ? "paused" : "playing";
                        this.setState(i, r);
                        break;
                    case tv.freewheel.SDK.EVENT_AD_COMPLETE:
                        this.adComplete.call(this, e);
                        break;
                    case tv.freewheel.SDK.EVENT_AD_CLICK:
                        this.adClick.call(this, e);
                        break;
                    case tv.freewheel.SDK.EVENT_ERROR:
                        this.adError.call(this, e);
                        break;
                    case tv.freewheel.SDK.EVENT_AD_AUTO_PLAY_BLOCKED:
                        this.pause.call(this, {
                            reason: "autostart"
                        }), this.currentSlot && this.instreamProvider.trigger("playAttemptFailed")
                }
            }
        }, {
            key: "setupSkipButton",
            value: function(e) {
                var t = this.options.config.skipoffset,
                    i = "POSTROLL" === e.slot.getTimePositionClass() ? -1 : e.slot.getTimePosition(),
                    r = this.adsLoaderManager.tagMap;
                if (r) {
                    var n = r[i];
                    n && void 0 !== n.skipoffset && (t = n.skipoffset)
                }
                void 0 !== t && this.blockingInstreamPlayer && (this.blockingInstreamPlayer.off("adSkipped", this.adSkip, this), e.adInstance.skipoffset = t, this.blockingInstreamPlayer.setupSkipButton(t, this.options, this.utils.noop), this.blockingInstreamPlayer.on("adSkipped", this.adSkip, this))
            }
        }, {
            key: "adStarted",
            value: function(e) {
                var t = this,
                    i = e.slot.getTimePositionClass();
                i !== tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY && (this.player.trigger("adBreakStart", T("adBreakStart", this.player, i)), this.blockingInstreamPlayer.on("destroyed", (function() {
                    t.player.trigger("adBreakEnd", T("adBreakEnd", t.player, i))
                })))
            }
        }, {
            key: "adImpression",
            value: function(e) {
                clearTimeout(this.timeoutAdLoad), clearTimeout(this.timeoutAdStart), clearTimeout(this.adBlockTimeout);
                var t = e.adInstance,
                    i = this.adEventObject(t),
                    r = "VPAID" === t.getActiveCreativeRendition().getCreativeApi();
                if (this.utils.removeClass(this.player.getContainer(), "jw-freewheel-before-impression"), this.utils.toggleClass(this.player.getContainer(), "jw-flag-ads-vpaid", r), this.isPreroll(i) && (this._qoe.tick("adImpression"), i.timeLoading = this._qoe.between("adLoading", "adImpression")), this.updateAdPosition(t), this.progressInterval(this.currentSlot), this.setupSkipButton(e), this.setupNonlinearContainer(), this.resize(), this.trigger("adImpression", i), r && this.trigger("adStarted", i), t.getCompanionAdInstances().length) {
                    var n = this.utils.extend({}, i);
                    n.companions = t.getCompanionAdInstances(), this.trigger("adCompanions", n)
                }
                this.setState(e.adInstance, "playing")
            }
        }, {
            key: "setTimeoutAdStart",
            value: function() {
                var e = this;
                clearTimeout(this.timeoutAdLoad), clearTimeout(this.timeoutAdStart), this.timeoutAdStart = setTimeout((function() {
                    if (!e.destroyed()) {
                        var t = e.adEventObject();
                        t.message = "Ad Error: Creative timeout", e.trigger(o, t), e.currentSlot.skipCurrentAd()
                    }
                }), this.options.loadVideoTimeout)
            }
        }, {
            key: "setAdBlockTimeout",
            value: function() {
                var t = this;
                this.player.getAdBlock() && (clearTimeout(this.adBlockTimeout), this.adBlockTimeout = setTimeout((function() {
                    t.destroyed() || t.adError({
                        id: void 0,
                        client: e,
                        message: "Ad playback blocked by an ad blocker",
                        code: 900,
                        adErrorCode: 60003
                    })
                }), this.options.adBlockTimeout))
            }
        }, {
            key: "setVideoState",
            value: function(e) {
                var t = e.type;
                if (this.adsLoaderManager && this.adsLoaderManager.currentAdContext) {
                    var i = {
                        idle: tv.freewheel.SDK.VIDEO_STATE_STOPPED,
                        play: tv.freewheel.SDK.VIDEO_STATE_PLAYING,
                        pause: tv.freewheel.SDK.VIDEO_STATE_PAUSED,
                        beforeComplete: tv.freewheel.SDK.VIDEO_STATE_COMPLETED
                    };
                    this.adsLoaderManager.currentAdContext.setVideoState(i[t])
                }
            }
        }, {
            key: "adResume",
            value: function(e) {
                var t = e.reason;
                this.hasResumed || (this.reason = t, this.currentSlot.resume()), this.hasResumed = !1
            }
        }, {
            key: "adSkip",
            value: function() {
                var e = this.currentSlot,
                    t = e.getCurrentAdInstance();
                if (t) {
                    var i = t.getPlayheadTime(),
                        r = t.skipoffset;
                    (void 0 === r || i - r >= 0) && (clearInterval(this.progressIntervalId), this.trigger("adSkipped", this.adEventObject()), e.skipCurrentAd())
                }
            }
        }, {
            key: "adComplete",
            value: function(e) {
                clearInterval(this.progressIntervalId), this.trigger("adComplete", this.adEventObject(e.adInstance))
            }
        }, {
            key: "adSlotComplete",
            value: function(e) {
                var t = this,
                    i = e.slot;
                i && "POSTROLL" === i.getTimePositionClass() ? setTimeout((function() {
                    t.stopBlocking(), t.nonlinearContainerId = null, t.destroy()
                }), 0) : (this.stopBlocking(), this.nonlinearContainerId = null)
            }
        }, {
            key: "adClick",
            value: function(e) {
                this.trigger("adClick", this.adEventObject(e.adInstance)), this.pause({
                    reason: "clickthrough"
                })
            }
        }, {
            key: "adError",
            value: function(e) {
                var t = this;
                this.options.debug && console.error(e);
                var i = this.adErrorEventObject(e);
                900 === i.code && (this.timeoutAdStart = setTimeout((function() {
                    return t.destroy()
                }), 0));
                var r = e ? e.adInstance : null;
                r && this.isPreroll(this.adEventObject(r)) && (this._qoe.tick("adError"), i.timeLoading = this._qoe.between("adLoading", "adError")), this.trigger(o, i)
            }
        }, {
            key: "updateAdPosition",
            value: function(e) {
                this.instreamProvider && this.instreamProvider.trigger(a, {
                    position: Math.max(e.getPlayheadTime(), 0),
                    duration: e.getDuration()
                })
            }
        }, {
            key: "prepareToPlayAd",
            value: function(e) {
                if (!this.destroyed())
                    if (this.blockingInstreamPlayer) {
                        var t = e ? "" : this.options.loadingAd;
                        this.blockingInstreamPlayer.setText(t)
                    } else this.startBlocking(e)
            }
        }, {
            key: "addMobileListeners",
            value: function() {
                var e = this;
                Object.keys(this.mobileEventListeners).forEach((function(t) {
                    e.video.addEventListener(t, e.mobileEventListeners[t])
                }))
            }
        }, {
            key: "removeMobileListeners",
            value: function() {
                var e = this;
                Object.keys(this.mobileEventListeners).forEach((function(t) {
                    e.video.removeEventListener(t, e.mobileEventListeners[t])
                }))
            }
        }, {
            key: "addPlayerListeners",
            value: function() {
                this.player.on(this.playerEventListeners, this)
            }
        }, {
            key: "removePlayerListeners",
            value: function() {
                this.player.off(this.playerEventListeners, this)
            }
        }, {
            key: "startBlocking",
            value: function(e) {
                var t = this;
                if (!this.blockingInstreamPlayer) {
                    this._qoe.tick("adLoading"), clearTimeout(this.timeoutAdLoad), clearTimeout(this.timeoutAdStart), clearTimeout(this.adBlockTimeout), this.timeoutAdLoad = setTimeout((function() {
                        if (!t.destroyed()) {
                            t.currentSlot && t.currentSlot.stop();
                            var e = t.adEventObject();
                            e.message = "Ad Error: Request timeout", t.trigger(o, e), t.stopBlocking()
                        }
                    }), this.options.requestTimeout), this.utils.addClass(this.player.getContainer(), "jw-flag-ads-freewheel"), this.blockingInstreamPlayer = this.player.createInstream().init(), this.video = this.instreamProvider.video = this.blockingInstreamPlayer.getMediaElement(), this.video.addEventListener("mousedown", L), this.video.addEventListener("pointerdown", L);
                    var i = e ? "" : this.options.loadingAd;
                    this.blockingInstreamPlayer.setText(i), this.blockingInstreamPlayer.applyProviderListeners(this.instreamProvider), this.environment.OS.mobile && (this.removeMobileListeners(), this.addMobileListeners())
                }
            }
        }, {
            key: "stopBlocking",
            value: function() {
                this.destroyed() || (clearTimeout(this.timeoutAdLoad), clearTimeout(this.timeoutAdStart), clearTimeout(this.adBlockTimeout), this.utils.removeClass(this.player.getContainer(), ["jw-flag-ads-vpaid", "jw-flag-ads-freewheel", "jw-freewheel-before-impression"]), this.environment.OS.mobile && this.removeMobileListeners(), this.blockingInstreamPlayer && (this.instreamProvider.off(), this.blockingInstreamPlayer.destroy(), this.blockingInstreamPlayer = null, this.video.removeEventListener("mousedown", L), this.video.removeEventListener("pointerdown", L), this.video = this.instreamProvider.video = null))
            }
        }, {
            key: "setupNonlinearContainer",
            value: function() {
                if (this.nonlinearContainerId) {
                    var e = document.getElementById(this.nonlinearContainerId);
                    this.utils.addClass(e, "jw-freewheel-nonlinear-container"), this.style(e, {
                        top: "auto",
                        height: "100%",
                        width: "100%"
                    })
                }
            }
        }, {
            key: "beforePlay",
            value: function(e) {
                var t = this;
                this.reason = e && e.playReason ? e.playReason : "external";
                var i = !this.slots.prerolls.length;
                this.startBlocking(i), this.utils.addClass(this.player.getContainer(), "jw-freewheel-before-impression"), this.initAdsManagerPromise.then((function() {
                    t.setAdBlockTimeout(), t.adsLoaderManager.requestAds(t.player)
                })), this.adsLoadedPromise.then((function(e) {
                    !t.destroyed() && e.success && t.playNextAd(t.slots.prerolls)
                })).catch((function(e) {
                    return t.asyncError(e)
                }))
            }
        }, {
            key: "playNextAd",
            value: function(e) {
                if (e.length) {
                    var t = this.currentSlot = e.shift();
                    if ("OVERLAY" !== t.getTimePositionClass()) {
                        var i = !t.getAdCount();
                        this.prepareToPlayAd(i), this.nonlinearContainerId = null
                    } else this.utils.addClass(this.player.getContainer(), "jw-flag-ads-freewheel"), this.nonlinearContainerId = "_fw_ad_container_html_" + this.currentSlot.getCustomId() + "_";
                    this.setTimeoutAdStart(), t.play(), "MIDROLL" === t.getTimePositionClass() && this.setVideoState({
                        type: "pause"
                    })
                } else this.stopBlocking()
            }
        }, {
            key: "beforeComplete",
            value: function() {
                this.slots.postrolls.length && this.playNextAd(this.slots.postrolls)
            }
        }, {
            key: "time",
            value: function(e) {
                if (this.slots.midrolls.length) {
                    var t = this.getNextMidRollIndex(e.position);
                    if (t >= 0) {
                        var i = [this.slots.midrolls[t]];
                        this.playNextAd(i)
                    }
                }
            }
        }, {
            key: "progressInterval",
            value: function(e) {
                var t = this;
                if (clearInterval(this.progressIntervalId), e) {
                    var i = e.getCurrentAdInstance(),
                        r = e.getAdInstances().indexOf(i) + 1,
                        n = i.getDuration(),
                        s = e.getAdCount(),
                        a = -1,
                        o = this.options.admessage || "",
                        l = this.options.admessagedynamickey,
                        d = this.options.podmessage || "",
                        u = new RegExp("__AD_POD_CURRENT__", "g"),
                        h = new RegExp("__AD_POD_LENGTH__", "g");
                    this.progressIntervalId = setInterval((function() {
                        var e = i.getPlayheadTime(),
                            c = n - e;
                        if (a !== c) {
                            if (a = c, t.blockingInstreamPlayer) {
                                var f = o.replace(l, "$1".concat(Math.round(c), "$2"));
                                s > 1 && (f = d.replace(u, r).replace(h, s) + "  " + f), t.blockingInstreamPlayer.setText(f)
                            }
                            if (n > 0) {
                                var p = t.adEventObject(i);
                                p.position = e, p.duration = n, t.trigger("adTime", p), t.updateAdPosition(i)
                            }
                        }
                    }), 250)
                }
            }
        }, {
            key: "getNextMidRollIndex",
            value: function(e) {
                var t = -1;
                if (this.playedMidrollIndex.length >= this.slots.midrolls.length) return t;
                for (var i = 0; i < this.slots.midrolls.length; i++) {
                    if (!(this.slots.midrolls[i].getTimePosition() <= e)) break;
                    t = i
                }
                return this.playedMidrollIndex.indexOf(t) < 0 && t >= 0 ? (this.playedMidrollIndex.push(t), t) : -1
            }
        }, {
            key: "setState",
            value: function(e, t) {
                if (this.currentSlot.getTimePositionClass() !== tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY) {
                    var i = this.adEventObject(e);
                    if (i.newstate = t, null !== this.reason) i["playing" === t ? "playReason" : "pauseReason"] = this.reason, this.reason = null;
                    this.instreamProvider.trigger("state", i)
                }
            }
        }, {
            key: "asyncError",
            value: function(e) {
                var t = this;
                this.destroyed() || (e && this.adError(e), this.timeoutAdStart = setTimeout((function() {
                    return t.destroy()
                }), 0))
            }
        }, {
            key: "pause",
            value: function(e) {
                var t = e.reason;
                this.currentSlot && !this.video.paused && (this.reason = t || "external", this.currentSlot.pause())
            }
        }, {
            key: "resume",
            value: function(e) {
                var t = e.reason;
                this.currentSlot && this.video.paused && (this.reason = t || "external", this.currentSlot.resume(), this.hasResumed = !0)
            }
        }, {
            key: "resize",
            value: function(e, t) {
                var i = document.getElementById(this.nonlinearContainerId);
                if (i) {
                    var r = i.querySelector("iframe"),
                        n = this.player.getSafeRegion(!0);
                    this.style(r, {
                        left: (n.width - r.offsetWidth) / 2
                    })
                }
                this.adsLoaderManager && this.adsLoaderManager.currentAdContext && e && t && this.adsLoaderManager.currentAdContext.resize(e, t)
            }
        }, {
            key: "destroy",
            value: function() {
                clearInterval(this.progressIntervalId), this.off(), this.destroyed() || (this.removePlayerListeners(), this.currentSlot && this.currentSlot.stop(), this.blockingInstreamPlayer && (this.blockingInstreamPlayer.off(null, null, this), this.stopBlocking()), this.adsLoaderManager && this.adsLoaderManager.destroy(), clearTimeout(this.timeoutAdLoad), clearTimeout(this.timeoutAdStart), clearTimeout(this.adBlockTimeout), this.nonlinearContainerId = null, this.item = null, this.options = null, this.player.off(null, null, this), this.player = null, this.instreamProvider.off(), this.instreamProvider.setProxy(null), this.instreamProvider = null, this.video = null, this.initAdsManagerPromise = null, this.adsLoadedPromise = null)
            }
        }, {
            key: "destroyed",
            value: function() {
                return !this.item
            }
        }, {
            key: "isPreroll",
            value: function(e) {
                return "pre" === e.adposition && (void 0 === e.podcount || 0 === e.sequence)
            }
        }]), t
    }();

    function L(e) {
        e.stopPropagation()
    }! function(e) {
        if (e && "undefined" != typeof window) {
            var t = document.createElement("style");
            t.setAttribute("media", "screen"), t.innerHTML = e, document.head.appendChild(t)
        }
    }(".jwplayer.jw-flag-ads-freewheel.jw-flag-floating .jw-wrapper,.jwplayer.jw-flag-ads-freewheel.jw-freewheel-before-impression .jw-media video{pointer-events:none}.jwplayer.jw-flag-ads-freewheel.jw-flag-touch.jwplayer.jw-flag-ads-freewheel.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-flag-ads-freewheel.jw-flag-user-inactive.jw-state-playing .jw-freewheel-nonlinear-container{bottom:.5em}.jwplayer.jw-flag-ads-freewheel .jw-freewheel-nonlinear-container{bottom:3.5em;pointer-events:none}.jwplayer.jw-flag-ads-freewheel .jw-freewheel-nonlinear-container iframe{pointer-events:all}.jwplayer.jw-flag-ads-freewheel.jw-flag-time-slider-above .jw-freewheel-nonlinear-container{bottom:66px}"), (window.jwplayerPluginJsonp || window.jwplayer().registerPlugin)(e, "8.1", (function(r, n) {
        var s = this,
            l = r.utils,
            d = r.getConfig(),
            u = d.key,
            h = new p(d, n || {}),
            c = new y(l, r.Events),
            f = 0;
        m(l, h.adManagerURL).then((function() {
            h.debug ? tv.freewheel.SDK.setLogLevel(tv.freewheel.SDK.LOG_LEVEL_DEBUG) : tv.freewheel.SDK.setLogLevel(tv.freewheel.SDK.LOG_LEVEL_QUIET)
        })).catch(l.noop);
        var v = null;

        function E() {
            v && !v.destroyed() && (v.destroy(), v = null)
        }

        function w(e) {
            E(), e && e.adschedule ? h.adschedule = e.adschedule : h.adschedule = null, r.setCues([])
        }

        function _(e, t, i, n) {
            var s, a, o, l = e.item;
            (w(l), s = h.getAdRules(), a = 0 === s.frequency && 1 === f, o = f >= s.startOn && (f - s.startOn) % s.frequency == 0, a || o) ? i.getSchedule() && (i.fwassetid = l.fwassetid || i.fwassetid, i.duration = l.duration || 0, (v = new P(l, h, r, c, n)).init(t, i), v.on("all", (function(e, t) {
                return r.trigger(e, t)
            })), r.once("beforePlay", (function(e) {
                return v.beforePlay(e)
            }), v).on("resize", (function(e) {
                var t = e.width,
                    i = e.height;
                return v.resize(t, i)
            }), v).on("fullscreen", (function() {
                return v.resize()
            }), v).on("all", A, v)): h.adschedule = null
        }

        function A(e, t) {
            e === a ? v.time(t) : "beforeComplete" === e && v.beforeComplete()
        }
        l.extend(this, r.Events), this.version = "2.2.7", r.pauseAd = function(e, t) {
            v && (e ? v.pause(t || {}) : v.resume(t || {}))
        }, r.skipAd = function() {
            v && v.adSkip()
        }, r.on("ready", (function() {
            d.localization = r.getConfig().localization;
            var e = d.localization.advertising,
                t = e.admessage,
                i = e.podmessage,
                n = e.cuetext,
                s = e.loadingAd,
                a = e.skipmessage,
                o = e.skiptext;
            h.setOptions({
                admessage: t,
                podmessage: i,
                cuetext: n,
                loadingAd: s,
                skipMessage: a,
                skipText: o
            }), m().catch((function() {
                S("Ad playback blocked by an ad blocker", 2e4)
            })), k.catch((function(e) {
                S("Ad Error: " + e.message, 60002)
            }))
        }), this).on("playlistItem", (function(e) {
            f++;
            var i = e.item.streamtype || d.streamtype;
            _(e, t, h, i)
        }), this).on("playlistComplete", (function() {
            w()
        }), this).on("cast", (function(e) {
            e.active && w()
        }), this).on("destroyPlugin", (function() {
            s.destroy()
        }), this);
        var S = function(t, n) {
                E(), r.off(null, null, s), r.playAd = l.noop, r.trigger(o, {
                    id: i,
                    client: e,
                    message: t,
                    code: 900,
                    adErrorCode: n,
                    tag: ""
                })
            },
            k = function(e, t, i) {
                var r = g[t];
                return r || (g[t] = new Promise((function(r, n) {
                    ! function(i) {
                        var r = new e.key(t);
                        if ("unlimited" === r.edition()) return i();
                        var n = ["//", "entitlements.jwplayer.com", "/", r.token(), ".json"];
                        "file:" === window.location.protocol && n.unshift("https:"), e.ajax(n.join(""), (function(e) {
                            i(e && e.response)
                        }), (function() {
                            i()
                        }), {
                            timeout: 1e4,
                            responseType: "json"
                        })
                    }((function(e) {
                        var t, s, a = e || {};
                        !0 === i.outstream ? (t = !1 !== a.canPlayOutstreamAds, s = "Outstream Ad Limit Reached") : (t = !1 !== a.canPlayAds, s = "Ad Limit Reached"), !1 !== t ? r({
                            message: "Can Play Ads"
                        }) : n({
                            message: s
                        })
                    }))
                })))
            }(l, u, n);
        k.catch(l.noop), this.destroy = E
    }))
}();
