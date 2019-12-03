! function() {
    var v = "dai",
        m = "-1",
        u = "adBreakEnd",
        g = "adError",
        s = "time",
        n = "meta",
        h = "jw-flag-ads",
        w = Object.assign || function(s) {
            return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
                if (t)
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (s[i] = t[i])
            }), s
        },
        o = function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
        },
        a = {
            apiKey: "",
            assetKey: "",
            cmsID: "",
            debug: !1,
            liveAdMessage: "Playing Ad",
            videoID: ""
        },
        b = function() {
            function r(t, i) {
                for (var s in o(this, r), a)
                    if (a.hasOwnProperty(s)) {
                        var n = t[s],
                            h = a[s],
                            e = typeof h;
                        if (void 0 !== n) {
                            if ("boolean" !== e && "number" !== e || (n = l(n)), typeof n !== e) throw new Error("invalid parameter: " + s + " should be a " + e);
                            this[s] = n
                        } else this[s] = h
                    }
                this.setLocalizationOptions(i)
            }
            return r.prototype.setLocalizationOptions = function(t) {
                var i = t.loadingAd,
                    s = t.admessage,
                    n = t.podmessage,
                    h = t.cuetext;
                this.loadingMessage = i, this.admessage = s, this.adcounterdynamic = n, this.cuetext = h
            }, r
        }();

    function l(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        var i = parseFloat(t);
        return isNaN(i) ? t : i
    }
    var e = null;

    function p(t) {
        if (e) return e;
        if (window.google && google.ima && google.ima.dai) return e = Promise.resolve();
        var i = ["//", "imasdk.googleapis.com/js/sdkloader/ima3_dai.js"];
        "file:" === document.location.protocol && i.unshift("https:");
        var s = new t.scriptloader(i.join(""));
        return e = s.load().then(function() {})
    }
    var y = {};
    var r = function() {
        function i(t) {
            o(this, i), this.t = t, this.i = {}, this.s = {}, this.n = null
        }
        return i.prototype.h = function(t) {
            return f("b" + (c(t) || t.getAdId()), this.i)
        }, i.prototype.e = function(t) {
            return f("b" + c(t) + "a" + t.getAdId(), this.s)
        }, i.prototype.adEventObject = function(t) {
            var i = t || this.n,
                s = {
                    client: v,
                    viewable: this.t.getViewable()
                };
            if (!i) return s;
            this.n = i, s.id = this.h(i), s.adPlayId = this.e(i), s.adtitle = i.getTitle(), s.adsystem = i.getAdSystem(), s.creativetype = "application/x-mpegURL", s.linear = "linear";
            var n = i.getAdPodInfo();
            if (n) {
                var h = n.getTotalAds();
                1 < h && (s.sequence = n.getAdPosition(), s.podcount = h), s.adposition = function(t) {
                    var i = t.getTimeOffset(); {
                        if (0 === i) return "pre";
                        if (-1 === i) return "post"
                    }
                    return "mid"
                }(n)
            }
            return s
        }, i.prototype.clearAd = function() {
            this.n = null
        }, i
    }();

    function f(t, i) {
        if (t) {
            var s = i[t];
            return s || (i[t] = (n = 12, s = new Array(n + 1).join((Math.random().toString(36) + "00000000000000000").slice(2, 18)).slice(0, n))), s
        }
        var n;
        return m
    }

    function c(t) {
        var i = t.getAdPodInfo();
        return i ? ("" + i.getTimeOffset()).replace(/[-.]/g, "N") : null
    }
    var k = function() {
        function e(t, i, s, n) {
            var h = this;
            o(this, e), this.r = t, this.o = i, this.t = s, this.a = new r(s), this.u = [], this.l = s.utils, this.f = s.getContainer(), this.c = null, this.d = null, this.v = -1, this.m = i.cmsID && i.videoID, this.g = !this.m && i.assetKey, this.w = null, this.b = null, this.p = null, this.y = function(t) {
                h.k(t)
            }, this._ = n
        }
        return e.prototype.beforePlay = function() {
            var t = this;
            this.d || this.A() || (clearTimeout(this.v), this.v = setTimeout(function() {
                t.A() || t.T()
            }, "3000"), this.w = this.t.getConfig().mediaElement, this.d = this.t.createInstream().init().setText(this.o.loadingMessage), this.j().catch(function() {
                t.T()
            }))
        }, e.prototype.pause = function() {
            this.w && this.w.pause()
        }, e.prototype.resume = function() {
            this.w && this.w.play()
        }, e.prototype.T = function() {
            this.A() || (clearTimeout(this.v), this.P())
        }, e.prototype.j = function() {
            var s = this;
            return p().then(function() {
                if (s.A()) return null;
                var t = google.ima.dai.api.StreamEvent.Type;
                s.b = new google.ima.dai.api.StreamManager(s.w), s.b.setClickElement(s._), s.p = [t.CUEPOINTS_CHANGED, t.LOADED, t.AD_BREAK_STARTED, t.AD_BREAK_ENDED, t.STARTED, t.AD_PROGRESS, t.CLICK, t.COMPLETE, t.ERROR], s.b.addEventListener(s.p, s.y, !1);
                var i = void 0;
                if (s.m)(i = new google.ima.dai.api.VODStreamRequest).contentSourceId = s.o.cmsID, i.videoId = s.o.videoID;
                else {
                    if (!s.g) throw new Error("Invalid options");
                    (i = new google.ima.dai.api.LiveStreamRequest).assetKey = s.o.assetKey, s.t.off(n, s.C, s), s.t.on(n, s.C, s)
                }
                i.apiKey = s.o.apiKey, s.b.requestStream(i)
            })
        }, e.prototype.D = function(t) {
            var i = this.t.getPlaylistItem(this.t.getPlaylistIndex()),
                s = t.url;
            i.sources = [w(i.sources[0], {
                file: s
            })], this.d && (this.d.replacePlaylistItem(i), this.T())
        }, e.prototype.k = function(t) {
            var i = this,
                s = google.ima.dai.api.StreamEvent.Type,
                n = this.a.adEventObject(t.getAd());
            switch (t.type) {
                case s.CUEPOINTS_CHANGED:
                    var h = this.u = t.getStreamData().cuepoints;
                    if (h && h.length) {
                        var e = h.filter(function(t) {
                            return 0 < t.start
                        }).map(function(t) {
                            return {
                                begin: t.start,
                                text: i.o.cuetext
                            }
                        });
                        this.t.setCues(e)
                    }
                    break;
                case s.LOADED:
                    clearTimeout(this.v), this.D(t.getStreamData());
                    break;
                case s.AD_BREAK_STARTED:
                    this.t.trigger("adBreakStart", n), this.I(!0), this.d.once("destroyed", function() {
                        i.t.trigger(u, n), i.a.clearAd()
                    });
                    break;
                case s.AD_BREAK_ENDED:
                    this.d.off().once("destroyed", function() {
                        i.t.trigger(u, n), i.a.clearAd()
                    }), this.I(!1);
                    break;
                case s.STARTED:
                    this.t.trigger("adImpression", n);
                    var r = this.a.adEventObject(null);
                    r.newstate = "playing", this.d.setState(r);
                    break;
                case s.AD_PROGRESS:
                    if (!this.d) return;
                    this.N(t.getStreamData().adProgressData, n);
                    break;
                case s.CLICK:
                    this.t.trigger("adClick", n), this.t.pause();
                    break;
                case s.COMPLETE:
                    this.t.trigger("adComplete", n), this.a.clearAd();
                    break;
                case s.ERROR:
                    var o = t.getStreamData().errorMessage,
                        a = w({
                            id: m,
                            message: "Ad Error: " + o
                        }, n);
                    this.t.trigger(g, a), this.a.clearAd()
            }
        }, e.prototype.O = function(t) {
            if (this.u.length) {
                for (var i = t.position, s = -1, n = 0; n < this.u.length && !(this.u[n].start > i); n++) s = n; - 1 < s && !this.u[s].played && i !== this.u[s].start && (this.c = i, this.t.seek(this.u[s].start))
            }
        }, e.prototype.C = function(t) {
            var i = t.metadata;
            this.b && i && this.b.onTimedMetadata(i)
        }, e.prototype.I = function(t) {
            var i = this;
            this.t.off(s, this.O, this), t ? (this.l.addClass(this.f, h), this.d || (this.d = this.t.createInstream()), this.d.enableAdsMode(), this.g && this.d.setText(this.o.liveAdMessage), this.d.off(null, null, this).on("instreamClick", function() {
                i._.click()
            }, this).on("state", function(t) {
                i.d.setState(t)
            }, this), this.g && (this.d.on(n, this.C, this), this.C({
                metadata: this.t.getItemMeta()
            }))) : (this.l.removeClass(this.f, h), this.m && this.t.on(s, this.O, this), this.P(), this.c && (this.w.currentTime = this.c, this.c = null))
        }, e.prototype.N = function(t, i) {
            var s = t.currentTime,
                n = t.duration;
            if (i.position = s, i.duration = n, this.d.setTime(i), this.m) {
                var h = t.adPosition,
                    e = t.totalAds,
                    r = this.o.admessage || "",
                    o = this.o.adcounterdynamic || "";
                r = r.replace(/xx/gi, "" + Math.ceil(n - s)), 1 < e && (r = (o = (o = o.replace(/__AD_POD_CURRENT__/g, "" + h)).replace(/__AD_POD_LENGTH__/g, "" + e)) + " " + r), this.d.setText(r)
            }
        }, e.prototype.P = function() {
            this.d && (this.d.destroy(), this.d = null)
        }, e.prototype.destroy = function() {
            clearTimeout(this.v), this.A() || (this.t.off(null, null, this), this.b && this.b.removeEventListener(this.p, this.y, !1), this.T(), this.o = null, this.w = null, this.t = null, this.r = null)
        }, e.prototype.A = function() {
            return !this.r
        }, e
    }();
    (window.jwplayerPluginJsonp || window.jwplayer().registerPlugin)(v, "8.0", function(n, t, h) {
        var i = n.utils,
            s = n.getConfig(),
            e = new b(t || {}, s.localization.advertising),
            r = void 0;
        p(i).catch(i.noop);
        var o = s.key;

        function a() {
            r && (r.destroy(), r = null)
        }
        this.version = "0.4.9", w(this, n.Events), n.pauseAd = function(t) {
            t = "boolean" != typeof t || t, r && (t ? r.pause() : r.resume())
        }, n.on("ready", function() {
            s.localization = n.getConfig().localization, e.setLocalizationOptions(s.localization.advertising), p(i).catch(function() {
                n.getAdBlock() && d("Ad playback blocked by an ad blocker", 2e4)
            }), c.catch(function(t) {
                d("Ad Error: " + t.message, 60002)
            })
        }, this).on("playlistItem", function(t) {
            a();
            var i = t.item,
                s = w({}, e, i.daiSetting);
            (s.cmsID && s.videoID || s.assetKey) && (i.preload = "none", r = new k(i, s, n, h), n.once("beforePlay", r.beforePlay, r))
        }, this).on("destroyPlugin", a, this);
        var u, l, f, c = (u = i, f = t, y[l = o] || (y[l] = new Promise(function(h, e) {
            ! function(i) {
                var t = new u.key(l);
                if ("unlimited" === t.edition()) return i();
                var s = ["//", "entitlements.jwplayer.com", "/", t.token(), ".json"];
                "file:" === window.location.protocol && s.unshift("https:"), u.ajax(s.join(""), function(t) {
                    i(t && t.response)
                }, function() {
                    i()
                }, {
                    timeout: 1e4,
                    responseType: "json"
                })
            }(function(t) {
                var i = t || {},
                    s = void 0,
                    n = void 0;
                !0 === f.outstream ? (s = !1 !== i.canPlayOutstreamAds, n = "Outstream Ad Limit Reached") : (s = !1 !== i.canPlayAds, n = "Ad Limit Reached"), !1 !== s ? h({
                    message: "Can Play Ads"
                }) : e({
                    message: n
                })
            })
        })));

        function d(t, i) {
            a(), n.off(null, null, this), n.trigger(g, {
                id: m,
                client: v,
                message: t,
                code: 900,
                adErrorCode: i,
                tag: ""
            })
        }
        c.catch(i.noop), this.destroy = a
    })
}();
