! function() {
    var h = 4,
        k = {
            pro: 1,
            premium: 2,
            ads: 3,
            invalid: h,
            enterprise: 6,
            trial: 7,
            platinum: 8,
            starter: 9,
            business: 10,
            developer: 11
        },
        D = {
            viewable: 2
        },
        e = "DATA_EVENT_PLAY",
        a = "DATA_EVENT_META",
        t = "DATA_EVENT_LEVELS",
        n = "DATA_EVENT_FIRST_FRAME",
        s = 128,
        r = ["auto", "initial choice"],
        i = ["playlistItem", "playAttempt", "time", "adBreakEnd"],
        I = 0,
        p = 20;
    var w = Object.assign || function(e) {
        for (var a = arguments.length, t = Array(1 < a ? a - 1 : 0), n = 1; n < a; n++) t[n - 1] = arguments[n];
        return t.reduce(function(e, a) {
            return function(a, t) {
                return t && Object.keys(t).forEach(function(e) {
                    a[e] = t[e]
                }), a
            }(e, a)
        }, e)
    };

    function o() {
        try {
            var e = window.crypto || window.msCrypto;
            if (e && e.getRandomValues) return e.getRandomValues(new Uint32Array(1))[0].toString(36)
        } catch (e) {}
        return Math.random().toString(36).slice(2, 9)
    }

    function S(e) {
        for (var a = ""; a.length < e;) a += o();
        return a.slice(0, e)
    }

    function T(e) {
        if (e) {
            if (/vast/.test(e)) return 0;
            if (/googima/.test(e)) return 1;
            if (/freewheel/.test(e)) return 2;
            if (/dai/.test(e)) return 3
        }
        return -1
    }

    function d(e) {
        return /^[a-zA-Z0-9]{8}$/.test(e)
    }

    function l(e, a) {
        if ("number" != typeof e) return null;
        var t = e / 1e3;
        return !(1 < arguments.length && void 0 !== a) || a ? Math.round(t) : t
    }

    function u(e, a) {
        return e + "-" + a
    }

    function c(e, a) {
        return a.split(".").reduce(function(e, a) {
            return e ? e[a] : void 0
        }, e)
    }

    function f(e) {
        return !(!e.width || !e.naturalWidth)
    }
    var m = a;

    function g(e) {
        var a = e.getContainer().querySelector("video");
        return a && a.currentTime ? a.currentTime : e.getPosition()
    }

    function v(a) {
        try {
            return a.getPlaylistItem()
        } catch (e) {
            var t = a.getPlaylistIndex();
            return a.getConfig().playlist[t] || null
        }
    }

    function y(e) {
        if ("function" != typeof e.getProvider) return "";
        var a = e.getProvider();
        return a ? a.name : ""
    }
    var b = void 0;

    function P(e, a) {
        var t = 1 < arguments.length && void 0 !== a && a,
            n = e.getVisualQuality(),
            r = void 0;
        if (n && n.level) {
            var i = "string" == typeof n.mode ? "auto" === n.mode : null;
            r = {
                width: n.level.width,
                height: n.level.height,
                bitrate: l(n.level.bitrate),
                reason: n.reason,
                adaptiveBitrateMode: i
            }
        } else r = {
            width: null,
            height: null,
            bitrate: null,
            reason: null,
            adaptiveBitrateMode: null
        };
        return b && !t || (b = r), r
    }

    function E(e) {
        var a = e.external.playerAPI,
            t = e.meta.playbackEvents,
            n = a.getDuration();
        if (n <= 0) {
            var r = t[m];
            r && (n = r.duration)
        }
        return 0 | n
    }

    function A(e, a) {
        var t = e.playerData.startup;
        null === t.startupTime && null !== t.initialTime && (t.startupTime = 10 * Math.round((Date.now() - t.initialTime) / 10), t.dispatchEvent = a)
    }

    function C(e) {
        var a = e.getConfig().setupConfig;
        if (a) {
            var t = window.jwplayer.defaults,
                n = w({}, t, a);
            return delete n.advertising, JSON.stringify(n, function(i) {
                var o = [],
                    d = [],
                    l = 0;
                return function(e, a) {
                    if ("object" != typeof a) return "function" == typeof a ? "__FUNCTION__" : a;
                    if (null === a || a instanceof Date || a instanceof RegExp) return a;
                    if (Uint8Array && a instanceof Uint8Array) {
                        var t = "" + a;
                        return t = 40 < t.length ? t.substr(0, 40) : t, "Uint8Array(" + a.length + ") [" + t + "]"
                    }
                    if (Array.isArray(a) && 100 < a.length) return "Array(" + a.length + ")";
                    if (a === i && 0 < l) return "<parent object>";
                    var n = o.indexOf(a);
                    if (-1 !== n) {
                        var r = d[n];
                        if (r) return r;
                        try {
                            JSON.stringify(a)
                        } catch (e) {
                            return d[n] = "__CIRCULAR__"
                        }
                        d[n] = a
                    }
                    return 1e4 < l++ ? "<complexity exceeded>" : (o.push(a), a)
                }
            }(n))
        }
    }
    var x = {
            UNKNOWN: 999,
            IAB: 0
        },
        R = {
            noBid: 0,
            bid: 1,
            timeout: 2,
            invalid: 3,
            abort: 4,
            error: 5
        },
        B = {
            numCompanions: -1,
            podCount: 0,
            podIndex: 0,
            linear: -1,
            vastVersion: -1,
            adSystem: null,
            adCreativeType: null,
            adposition: -1,
            tagdomain: null,
            position: void 0,
            previousQuartile: 0,
            duration: void 0,
            witem: 1,
            wcount: 1,
            preload: void 0,
            adMediaFileURL: void 0,
            description: null,
            creativeAdId: null,
            creativeId: null,
            adTitle: null,
            adVastId: null,
            placement: void 0,
            timeForVPBCache: null
        },
        j = /^IAB(\d+(?:-\d+)?)$/,
        M = {
            adRequest: "ar",
            adImpression: "i",
            adSkipped: "s",
            adError: "ae",
            adBidResponse: "abr",
            adClick: "c",
            adLoaded: "al",
            adViewableImpression: "vi",
            adBidRequest: "abq"
        },
        O = ["adStarted", "adMeta"],
        V = ["adTime", "adClick"],
        G = ["adBreakStart", "adMeta", "adImpression", "adViewableImpression", "adPlay", "adPause", "adTime", "adCompanions", "adClick", "adSkipped", "adComplete", "adError"],
        L = {
            dfp: 0,
            jwp: 1,
            jwpdfp: 2,
            jwpspotx: 3
        },
        _ = ["id", "type", "pubid", "result", "code", "winner", "priceInCents", "timeForBidResponse", "requestId", "cacheKey"],
        N = "error",
        F = "s",
        q = "ana",
        U = "t",
        Q = "prp",
        K = "vsh",
        z = "paf",
        W = "bs",
        H = "fs",
        X = "fc",
        Y = "aa",
        $ = "gab",
        J = "xapi",
        Z = "cg",
        ee = "cpt",
        ae = "ph",
        te = "n",
        ne = "e",
        re = "sa",
        ie = "i",
        oe = "as",
        de = "ar",
        le = "ers",
        ue = "err",
        ce = {
            events: {
                "aa-jwplayer6": {
                    code: "aa",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["fct", "fed", "fid", "fin", "fns", "fsid", "fsr", "ft", "mu", "os", "ovta", "psd"],
                    filters: ["missingFeedID"],
                    pingDestination: "main"
                },
                "abr-clienta": {
                    code: "abr",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal", "headerBidding"],
                    pingSpecificParameters: ["apr", "tfvc"],
                    pingDestination: "main"
                },
                "abq-clienta": {
                    code: "abq",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal", "headerBidding"],
                    pingSpecificParameters: ["apr"],
                    pingDestination: "main"
                },
                "ae-clienta": {
                    code: "ae",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal", "headerBidding"],
                    pingSpecificParameters: ["ad", "add", "adid", "adt", "aec", "aem", "amu", "apr", "apt", "ato", "atu", "caid", "cid", "ct", "du", "ec", "mfc", "tal", "uav"],
                    filters: ["missingAdScheduleID"],
                    pingDestination: "main"
                },
                "al-clienta": {
                    code: "al",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingSpecificParameters: ["apr", "tal"],
                    filters: ["missingAdScheduleID"],
                    pingDestination: "main"
                },
                "ana-jwplayer6": {
                    code: "ana",
                    bucket: "jwplayer6",
                    parameterGroups: ["sessionParamsOnly"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "ar-clienta": {
                    code: "ar",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingSpecificParameters: ["apr", "apt"],
                    filters: ["missingAdScheduleID"],
                    pingDestination: "main"
                },
                "bs-jwplayer6": {
                    code: "bs",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["fed", "fid", "ft", "mu", "os"],
                    filters: ["missingFeedID"],
                    pingDestination: "main"
                },
                "c-clienta": {
                    code: "c",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingSpecificParameters: ["ad", "adc", "al", "ct", "du", "qt", "srf", "tw", "vv", "uav"],
                    pingDestination: "main"
                },
                "cg-jwplayer6": {
                    code: "cg",
                    bucket: "jwplayer6",
                    parameterGroups: [],
                    pingSpecificParameters: ["aid", "cdid", "ed", "pu", "pcfg"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "meta"
                },
                "cpe-jwplayer6": {
                    code: "cpe",
                    bucket: "jwplayer6",
                    parameterGroups: [],
                    pingSpecificParameters: ["aid", "id", "fed", "mu", "pss"],
                    pingDestination: "external"
                },
                "cpt-jwplayer6": {
                    code: "cpt",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingDestination: "main"
                },
                "e-jwplayer6": {
                    code: "e",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["ab", "cae", "cb", "cdid", "cme", "dd", "dnt", "dpl", "flc", "fv", "ga", "lng", "mk", "mu", "pad", "pbc", "pd", "pdr", "plng", "plt", "pni", "pnl", "po", "pogt", "ptid", "rf", "sn", "sp", "srf", "ss", "st", "vrt"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "err-error": {
                    code: "err",
                    bucket: "error",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["cme", "erc", "pogt", "strt"],
                    pingDestination: "main"
                },
                "ers-error": {
                    code: "ers",
                    bucket: "error",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["cme", "erc", "flc", "pogt"],
                    pingDestination: "main"
                },
                "fc-jwplayer6": {
                    code: "fc",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["fct", "fed", "fid", "fin", "fns", "fpg", "fsid", "fsr", "ft", "mu", "oc", "os", "ovta", "psd", "srf", "stid"],
                    filters: ["missingFeedID"],
                    pingDestination: "main"
                },
                "fs-jwplayer6": {
                    code: "fs",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["fed", "fid", "fin", "fis", "fns", "fpc", "fpg", "fsid", "fsr", "ft", "mu", "os", "rat", "srf", "tis", "vfi"],
                    filters: ["missingFeedID"],
                    pingDestination: "main"
                },
                "gab-jwplayer6": {
                    code: "gab",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abid", "abpr", "apid", "ati", "erc", "fls", "lae", "ovta", "pbs", "pcp", "prs", "prsd", "pvta", "srf", "strt", "ti", "tps", "ubc", "vti"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "i-clienta": {
                    code: "i",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal", "headerBidding"],
                    pingSpecificParameters: ["ad", "adc", "add", "adid", "apr", "apt", "adt", "al", "amu", "atu", "caid", "cid", "ct", "du", "fed", "fid", "fsm", "mfc", "psd", "strt", "tal", "vv", "uav"],
                    pingDestination: "main"
                },
                "idt-g": {
                    code: "idt",
                    bucket: "g",
                    parameterGroups: ["sessionParamsOnly"],
                    pingSpecificParameters: ["gid"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "pa-jwplayer6": {
                    code: "pa",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["ab", "abid", "abm", "apid", "bwe", "cme", "dnt", "dpl", "fed", "fid", "flc", "lng", "mu", "pd", "pdr", "plng", "pni", "pnl", "pogt", "pr", "psd", "pvta", "sbr", "ss", "tb", "vd", "vh", "vw"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "paf-error": {
                    code: "paf",
                    bucket: "error",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abm", "bwe", "erc", "fed", "fid", "mu", "pd", "pr", "psd", "sbr", "tb", "vd", "vh", "vw"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "prp-jwplayer6": {
                    code: "prp",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["tc"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "pru-jwplayer6": {
                    code: "pru",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["ppr"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "ret-jwplayer6": {
                    code: "ret",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abm", "ati", "avc", "bwe", "etw", "fed", "fid", "fls", "fsm", "mu", "pbs", "pr", "q", "sbr", "srf", "ubc", "vh", "vr", "vti", "vw"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "s-jwplayer6": {
                    code: "s",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abid", "abm", "apid", "bwe", "cae", "cct", "cdid", "dnt", "dpl", "drm", "fed", "ff", "fid", "fsm", "l", "lng", "mk", "mu", "pd", "pdr", "plng", "pni", "pnl", "pr", "psd", "q", "qcr", "sbr", "sp", "srf", "ss", "strt", "tb", "tt", "vd", "vh", "vs", "vrt", "vr", "vw"],
                    pingDestination: "main"
                },
                "s-clienta": {
                    code: "s",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingSpecificParameters: ["ad", "adc", "al", "atps", "ct", "du", "qt", "tw", "vv", "uav"],
                    pingDestination: "main"
                },
                "t-jwplayer6": {
                    code: "t",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abm", "ati", "avc", "bwe", "dle", "fed", "fid", "fls", "fsm", "ltc", "mu", "pbs", "pcp", "pw", "q", "sbr", "ti", "ubi", "vh", "vr", "vti", "vw"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "v-clienta": {
                    code: "v",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingSpecificParameters: ["ad", "adc", "adti", "adati", "advti", "al", "ct", "du", "fsm", "qt", "vv", "uav"],
                    pingDestination: "main"
                },
                "vcae-clienta": {
                    code: "vcae",
                    bucket: "clienta",
                    parameterGroups: ["adSessionParamsOnly", "sessionParamsOnly"],
                    pingSpecificParameters: ["abt", "aml", "ask", "c", "ed", "flpc", "ph", "pu", "sdk", "vcb", "vck", "vpb"],
                    pingDestination: "main"
                },
                "vci-clienta": {
                    code: "vci",
                    bucket: "clienta",
                    parameterGroups: ["adSessionParamsOnly", "sessionParamsOnly"],
                    pingSpecificParameters: ["abt", "aml", "ask", "c", "ed", "flpc", "ph", "pu", "sdk", "vcb", "vck", "vpb"],
                    pingDestination: "main"
                },
                "vi-clienta": {
                    code: "vi",
                    bucket: "clienta",
                    parameterGroups: ["global", "adGlobal"],
                    pingDestination: "main"
                },
                "vqc-jwplayer6": {
                    code: "vqc",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["abm", "avc", "bwe", "qcr", "sbr", "tb", "vw", "vh"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "vs-jwplayer6": {
                    code: "vs",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["cvl", "sdt", "tvl", "vso"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "vsh-jwplayer6": {
                    code: "vsh",
                    bucket: "jwplayer6",
                    parameterGroups: ["global"],
                    pingSpecificParameters: ["pcp", "srf", "stg"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "main"
                },
                "xapi-jwplayer6": {
                    code: "xapi",
                    bucket: "jwplayer6",
                    parameterGroups: ["sessionParamsOnly"],
                    pingSpecificParameters: ["ed", "prs", "pid", "ph", "sdk", "sv", "xam", "xfmp"],
                    filters: ["missingMediaOrExternalID"],
                    pingDestination: "meta"
                }
            },
            paramGroups: {
                global: {
                    members: ["abc", "abt", "aid", "amp", "ask", "at", "bun", "c", "ccp", "cp", "d", "eb", "ed", "emi", "gerr", "gfb", "gifr", "gios", "i", "id", "ifa", "lid", "lsa", "mt", "pbd", "pbr", "pgi", "ph", "pid", "pii", "pl", "plc", "pli", "pp", "ppm", "prc", "ps", "pss", "pt", "pu", "pv", "pyc", "s", "sdk", "stc", "stpe", "sv", "t", "tul", "tv", "vb", "vi", "vl", "wd", "xav", "xid"],
                    groupName: "global"
                },
                adGlobal: {
                    members: ["ab", "abid", "abo", "adi", "apid", "awi", "awc", "p", "pc", "pi", "pr", "sko", "tmid", "vu"],
                    groupName: "adGlobal"
                },
                adSessionParamsOnly: {
                    members: ["abid", "apid"],
                    groupName: "adSessionParamsOnly"
                },
                sessionParamsOnly: {
                    members: ["aid", "emi", "id", "pli", "pv", "tv", "xav", "xid"],
                    groupName: "sessionParamsOnly"
                },
                headerBidding: {
                    members: ["afbb", "afbi", "afbp", "afbt", "afbw", "aml", "asxb", "asxi", "asxp", "asxt", "asxw", "flpc", "flpy", "frid", "hbec", "vpb", "vto"],
                    groupName: "headerBidding"
                }
            }
        },
        se = {
            sgB1CN8sEeW9HgpVuA4vVw: !1,
            "QHh6WglVEeWjwQp+lcGdIw": !0,
            "4lTGrhE9EeWepAp+lcGdIw": !0,
            "98DmWsGzEeSdAQ4AfQhyIQ": !0,
            "xNaEVFs+Eea6EAY3v_uBow": !0,
            KvvTdq_lEeSqTw4AfQhyIQ: !1
        },
        pe = 1;

    function fe(e, a) {
        var t, n, r, i, o, d, l, u;
        for (t = 3 & e.length, n = e.length - t, r = a, o = 3432918353, d = 461845907, u = 0; u < n;) l = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8 | (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u)) << 24, ++u, r = 27492 + (65535 & (i = 5 * (65535 & (r = (r ^= l = (65535 & (l = (l = (65535 & l) * o + (((l >>> 16) * o & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * d + (((l >>> 16) * d & 65535) << 16) & 4294967295) << 13 | r >>> 19)) + ((5 * (r >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (i >>> 16) & 65535) << 16);
        switch (l = 0, t) {
            case 3:
                l ^= (255 & e.charCodeAt(u + 2)) << 16;
            case 2:
                l ^= (255 & e.charCodeAt(u + 1)) << 8;
            case 1:
                r ^= l = (65535 & (l = (l = (65535 & (l ^= 255 & e.charCodeAt(u))) * o + (((l >>> 16) * o & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * d + (((l >>> 16) * d & 65535) << 16) & 4294967295
        }
        return r ^= e.length, r = 2246822507 * (65535 & (r ^= r >>> 16)) + ((2246822507 * (r >>> 16) & 65535) << 16) & 4294967295, r = 3266489909 * (65535 & (r ^= r >>> 13)) + ((3266489909 * (r >>> 16) & 65535) << 16) & 4294967295, (r ^= r >>> 16) >>> 0
    }

    function me(e) {
        return ye(e, "feedid")
    }

    function ge(e) {
        return ye(e, "feed_instance_id")
    }

    function ve(e) {
        return e ? e.pin_set_id : null
    }

    function ye(e, a) {
        return e ? (e.feedData || {})[a] || e[a] : null
    }

    function be(e) {
        if (!e) return null;
        var a = e.mediaid;
        return d(a) ? a : d(a = function(e) {
            var a = /.*\/(?:manifests|videos)\/([a-zA-Z0-9]{8})[\.-].*/.exec(e);
            return a && 2 === a.length ? a[1] : null
        }(e.file)) ? a : null
    }

    function he(e) {
        return e ? e.title : null
    }

    function ke(e, a) {
        var t = void 0;
        ! function(e) {
            return se[e.accountData.analyticsID]
        }(e) || (t = function(e, a) {
            var t = he(a);
            if (t) return function(e, a) {
                e.meta.xidAlgorithmVersion = 1;
                var t = fe(a, pe),
                    n = fe(a + a, pe);
                return "01_" + t + n
            }(e, t)
        }(e, a));
        var n = t || a.externalId;
        (e.playlistItemData.externalId = n) && !e.meta.xidAlgorithmVersion && (e.meta.xidAlgorithmVersion = 0)
    }
    var De = "hidden" in document ? function() {
        return !document.hidden
    } : "webkitHidden" in document ? function() {
        return !document.webkitHidden
    } : function() {
        return !0
    };

    function Ie(e, a) {
        var t = " " + a + " ";
        return 1 === e.nodeType && 0 <= (" " + e.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(t)
    }
    var we = 1,
        Se = 2,
        Te = 3,
        Pe = 4,
        Ee = 5,
        Ae = 0;
    var Ce = [W, $];

    function xe(e, a, t) {
        var n = e.external.playerAPI,
            r = n.getConfig();
        e.playerData.playerConfig = {
            visibility: r.visibility,
            bandwidthEstimate: r.bandwidthEstimate,
            floatingState: !!r.isFloating
        };
        var i = v(n) || {};
        e.playlistItemData.item = i, e.playlistItemData.mediaId = be(i), e.playerData.playerSize = function(e) {
            var a = e.getConfig(),
                t = a.containerWidth || e.getWidth(),
                n = a.containerHeight || e.getHeight();
            if (/\d+%/.test(t)) {
                var r = e.utils.bounds(e.getContainer());
                t = r.width, n = r.height
            }
            return t = 0 | Math.round(t), n = 0 | Math.round(n), /\d+%/.test(a.width || t) && a.aspectratio ? {
                bucket: Pe,
                width: t,
                height: n
            } : Ie(e.getContainer(), "jw-flag-audio-player") ? {
                bucket: Ee,
                width: t,
                height: n
            } : 0 === t ? {
                bucket: Ae,
                width: t,
                height: n
            } : t <= 320 ? {
                bucket: we,
                width: t,
                height: n
            } : t <= 640 ? {
                bucket: Se,
                width: t,
                height: n
            } : {
                bucket: Te,
                width: t,
                height: n
            }
        }(n), e.playlistItemData.duration = E(e), e.meta.lastEvent = a, e.meta.lastBucket = t, e.playerData.visualQuality = P(n, "s" === a && "jwplayer6" === t), e.playerData.defaultPlaybackRate = r.defaultPlaybackRate, e.playerData.playbackMode = r.streamType, ke(e, i),
            function(e, a, t) {
                -1 === Ce.indexOf(a) && (e.meta.eventPreAbandonment = u(a, t))
            }(e, a, t)
    }
    var Re = !1,
        Be = {
            prs: function(e) {
                return e.meta.playerState
            },
            lae: function(e) {
                return e.meta.eventPreAbandonment
            },
            abpr: function(e) {
                return e.meta.playerRemoved
            },
            prsd: function(e) {
                var a = Date.now() - e.meta.playerStateDuration;
                return a <= 216e5 ? a : -1
            }
        },
        je = {
            ab: function(e) {
                return e.configData.advertisingBlockType
            },
            abo: function(e) {
                return e.ads.adEventData.offset
            },
            adi: function(e) {
                return e.ads.adEventData.adId
            },
            apid: function(e) {
                return e.ads.adEventData.adPlayId
            },
            abid: function(e) {
                return e.ads.adEventData.adBreakId
            },
            awi: function(e) {
                return e.ads.adEventData.witem
            },
            awc: function(e) {
                return e.ads.adEventData.wcount
            },
            p: function(e) {
                return e.ads.adEventData.adposition
            },
            sko: function(e) {
                return e.ads.adEventData.skipoffset
            },
            vu: function(e) {
                return e.ads.adEventData.tagdomain
            },
            tmid: function(e) {
                return e.ads.adEventData.targetMediaId
            }
        },
        Me = {
            cae: function(e) {
                return !!e.ads.advertisingConfig.companiondiv
            },
            ad: function(e) {
                return e.ads.adEventData.adSystem
            },
            adc: function(e) {
                var a = e.ads.adEventData,
                    t = null;
                return Array.isArray(a.categories) && (t = a.categories.map(function(e) {
                    var a = e.match(j);
                    return a ? [x.IAB, a[1]].join("-") : x.UNKNOWN
                }).filter(function(e, a, t) {
                    return t.indexOf(e) === a
                }).slice(0, 10).join(",") || null), t
            },
            al: function(e) {
                return e.ads.adEventData.linear
            },
            ct: function(e) {
                return e.ads.adEventData.adCreativeType
            },
            mfc: function(e) {
                return e.ads.adEventData.mediaFileCompliance
            },
            pc: function(e) {
                return e.ads.adEventData.podCount
            },
            pi: function(e) {
                return e.ads.adEventData.podIndex
            },
            tal: function(e) {
                return e.ads.adEventData.timeAdLoading
            },
            vv: function(e) {
                return e.ads.adEventData.vastVersion
            },
            uav: function(e) {
                return e.ads.adEventData.universalAdId
            },
            advti: function(e) {
                return e.ads.adPlaybackTracking.viewablePlayedSeconds
            },
            adati: function(e) {
                return e.ads.adPlaybackTracking.audiblePlayedSeconds
            },
            adti: function(e) {
                return e.ads.adPlaybackTracking.playedSeconds
            },
            atps: function(e) {
                return e.ads.watchedPastSkipPoint
            },
            du: function(e) {
                return e.ads.adEventData.duration
            },
            qt: function(e) {
                var a = e.meta.lastEvent;
                return "s" === a || "c" === a ? e.ads.adEventData.previousQuartile : e.ads.currentQuartile
            },
            tw: function(e) {
                return e.ads.adEventData.position
            },
            aec: function(e) {
                return e.ads.jwAdErrorCode
            },
            aem: function(e) {
                return e.ads.errorMessage
            },
            ato: function(e) {
                return e.ads.timeout
            },
            ec: function(e) {
                return e.playerData.lastErrorCode[e.meta.lastEvent]
            },
            atu: function(e) {
                var a = e.ads.adEventData.tagURL;
                return "string" == typeof a ? a.substr(0, 100) : void 0
            },
            cid: function(e) {
                return e.ads.adEventData.creativeId
            },
            adt: function(e) {
                return e.ads.adEventData.adTitle
            },
            apr: function(e) {
                return e.ads.adEventData.preload
            },
            amu: function(e) {
                return e.ads.adEventData.adMediaFileURL
            },
            add: function(e) {
                return e.ads.adEventData.description
            },
            adid: function(e) {
                return e.ads.adEventData.adVastId
            },
            caid: function(e) {
                return e.ads.adEventData.creativeAdId
            },
            apt: function(e) {
                return e.ads.adEventData.placement
            },
            tfvc: function(e) {
                return e.ads.adEventData.timeForVPBCache
            },
            afbb: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.result")
            },
            afbi: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.id")
            },
            afbp: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.priceInCents")
            },
            afbt: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.timeForBidResponse")
            },
            afbw: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.winner")
            },
            frid: function(e) {
                return c(e.ads.headerBiddingData.bidders, "fan.requestId")
            },
            asxb: function(e) {
                return c(e.ads.headerBiddingData.bidders, "spotx.result")
            },
            asxi: function(e) {
                return c(e.ads.headerBiddingData.bidders, "spotx.id")
            },
            asxp: function(e) {
                return c(e.ads.headerBiddingData.bidders, "spotx.priceInCents")
            },
            asxt: function(e) {
                return c(e.ads.headerBiddingData.bidders, "spotx.timeForBidResponse")
            },
            asxw: function(e) {
                return c(e.ads.headerBiddingData.bidders, "spotx.winner")
            },
            aml: function(e) {
                return e.ads.headerBiddingData.mediationLayer
            },
            flpc: function(e) {
                return e.ads.headerBiddingData.floorPriceCents
            },
            flpy: function(e) {
                return e.ads.headerBiddingData.floorPriceCurrency
            },
            hbec: function(e) {
                return e.ads.headerBiddingData.errorCode
            },
            vto: function(e) {
                return e.ads.headerBiddingData.bidTimeout
            }
        };
    Me.vpb = function(e) {
        if ("object" == typeof e.ads.headerBiddingData.bidders) return JSON.stringify(function e(a) {
            var t = {};
            for (var n in a)
                if ("object" == typeof a[n]) {
                    var r = e(a[n]);
                    for (var i in r) r.hasOwnProperty(i) && (t[n + "." + i] = r[i])
                } else t[n] = a[n];
            return t
        }(e.ads.headerBiddingData.bidders))
    }, Me.vcb = function(e) {
        return e.ads.headerBiddingCacheData.bidder
    }, Me.vck = function(e) {
        return e.ads.headerBiddingCacheData.cacheKey
    };
    var Oe = {
        dnt: function(e) {
            return e.browser.storage.doNotTrackProperty
        },
        fv: function(e) {
            return e.browser.pageData.flashVersion
        },
        lng: function(e) {
            return e.browser.langAttr
        },
        pdr: function(e) {
            return e.browser.docReferrer
        }
    };
    Oe.plt = function(e) {
        return function() {
            var e = (window.performance || {}).timing;
            if (e) {
                var a = (e.loadEventEnd || (new Date).getTime()) - e.navigationStart;
                if (0 < a) return 50 * Math.round(a / 50) | 0
            }
            return null
        }()
    }, Oe.sp = function(e) {
        return e.browser.isPageStandalone
    };
    var Ve = {
            cb: function(e) {
                return e.configData.castingBlockPresent
            },
            dd: function(e) {
                return e.configData.displayDescription
            },
            ga: function(e) {
                return e.configData.gaBlockPresent
            },
            pad: function(e) {
                return e.configData.abTestConfig
            },
            pbc: function(e) {
                return e.configData.playbackRateControlsSet
            },
            po: function(e) {
                return e.configData.posterImagePresent
            },
            rf: function(e) {
                return e.configData.relatedPluginFeedFile
            },
            sn: function(e) {
                return e.configData.skinName
            }
        },
        Ge = [Y, W, X, H],
        Le = {
            fed: function(e) {
                return -1 !== Ge.indexOf(e.meta.lastEvent) ? e.related.feedId : me(e.playlistItemData.item)
            },
            fid: function(e) {
                return -1 !== Ge.indexOf(e.meta.lastEvent) ? e.related.feedInstanceId : ge(e.playlistItemData.item)
            },
            ft: function(e) {
                return e.related.feedType
            },
            os: function(e) {
                return e.related.onClickSetting
            },
            fin: function(e) {
                return e.related.feedInterface
            },
            fis: function(e) {
                return e.related.idsShown.join(",")
            },
            fns: function(e) {
                return e.related.idsShown.length
            },
            fpc: function(e) {
                return e.related.pinnedCount
            },
            fpg: function(e) {
                return e.related.page
            },
            fsr: function(e) {
                return e.related.shownReason
            },
            rat: function(e) {
                return e.related.autotimerLength
            },
            fct: function(e) {
                return e.related.advanceTarget
            },
            oc: function(e) {
                return e.related.ordinalClicked
            },
            stid: function(e) {
                return e.related.targetThumbID
            },
            tis: function(e) {
                return e.related.thumbnailIdsShown.join(",") || void 0
            },
            fsid: function(e) {
                return e.related.feedShownId
            },
            vfi: function(e) {
                return e.related.feedWasViewable
            },
            cme: function(e) {
                return e.playerData.contextualEmbed
            },
            pogt: function(e) {
                return e.browser.pageData.pageOGTitle
            }
        },
        _e = {};
    _e.abc = function(e) {
        var a = e.ads.adBreakTracking;
        if (a) return a.adBreakCount
    }, _e.abt = function(e) {
        var a = e.external.playerAPI.getConfig(),
            t = a.ab;
        if (t && t.tests) return Object.keys(t.tests).map(function(e) {
            return t.getSelected(e, a).join(",")
        }).filter(function(e) {
            return e
        }).join(",")
    }, _e.aid = function(e) {
        return e.accountData.analyticsID
    }, _e.ask = function(e) {
        return e.ads.adScheduleId
    }, _e.at = function(e) {
        return De()
    }, _e.c = function(e) {
        return e.ads.adClient
    }, _e.ccp = function(e) {
        return e.casting
    }, _e.cp = function(e) {
        return !e.external.playerAPI.getControls()
    }, _e.d = function(e) {
        return e.configData.autostartConfig
    }, _e.eb = function(e) {
        return function(e) {
            return e.getAdBlock ? e.getAdBlock() : -1
        }(e.external.playerAPI)
    }, _e.ed = function(e) {
        return e.accountData.edition
    }, _e.emi = function(e) {
        return e.staticPlayerData.embedID
    }, _e.i = function(e) {
        return e.browser.pageData.inIframe
    }, _e.id = function(e) {
        return e.playlistItemData.mediaId
    }, _e.lid = function(e) {
        return e.meta.doNotPingBackIDs ? void 0 : e.browser.storage.localID
    }, _e.lsa = function(e) {
        return e.browser.storage.storageAvailable
    }, _e.mt = function(e) {
        return e.external.playerAPI.getMute()
    }, _e.mu = function(e) {
        return function(e, a) {
            var t = void 0;
            if (!e) return null;
            var n = e.sources;
            if (n) {
                for (var r = [], i = n.length; i--;) n[i].file && r.push(n[i].file);
                r.sort(), t = r[0]
            } else t = e.file;
            return a.getAbsolutePath(t)
        }(e.playlistItemData.item, e.external.utils)
    }, _e.pbd = function(e) {
        return e.playerData.defaultPlaybackRate
    }, _e.pbr = function(e) {
        return function(e) {
            return e.getPlaybackRate ? Math.round(100 * e.getPlaybackRate()) / 100 : 1
        }(e.external.playerAPI)
    }, _e.pgi = function(e) {
        return e.browser.pageData.pageViewId
    }, _e[ae] = function(e) {
        return e.configData.playerHosting
    }, _e.pid = function(e) {
        return e.configData.playerConfigKey
    }, _e.pii = function(e) {
        return e.playlistItemData.index
    }, _e.pl = function(e) {
        return e.playerData.playerSize.height
    }, _e.plc = function(e) {
        return e.external.playerAPI.getPlaylist().length
    }, _e.pli = function(e) {
        return e.playlistItemData.itemId
    }, _e.pp = function(e) {
        return y(e.external.playerAPI)
    }, _e.prc = function(e) {
        return function() {
            var e = window.jwplayer,
                a = 0;
            if ("function" == typeof e)
                for (a = 0; a < 1e3; a++)
                    if (!e(a).uniqueId) return a;
            return a
        }()
    }, _e.ps = function(e) {
        return e.playerData.playerSize.bucket
    }, _e.pss = function(e) {
        return e.meta.playbackTracking.playSessionSequence
    }, _e.pt = function(e) {
        return e.browser.pageData.pageTitle
    }, _e.pu = function(e) {
        return e.browser.pageData.pageURL
    }, _e.pv = function(e) {
        return e.staticPlayerData.playerVersion
    }, _e.pyc = function(e) {
        return e.meta.playbackTracking.playItemCount
    }, _e.s = function(e) {
        return e.configData.sharingEnabled
    }, _e.sdk = function(e) {
        return e.staticPlayerData.sdkPlatform
    }, _e.stc = function(e) {
        return e.meta.setupCount
    }, _e.sv = function(e) {
        return e.staticPlayerData.sdkVersion
    }, _e.bun = function(e) {
        return e.staticPlayerData.bundleId
    }, _e.ifa = function(e) {
        return e.meta.doNotPingBackIDs ? void 0 : e.staticPlayerData.advertisingId
    }, _e.t = function(e) {
        return he(e.playlistItemData.item)
    }, _e.tul = function(e) {
        return e.playlistItemData.item.thumbnailUrl
    }, _e.tv = function(e) {
        return "3.24.0"
    }, _e.vb = function(e) {
        return e.playerData.viewable
    }, _e.vi = function(e) {
        var a = e.playerData.playerConfig.visibility;
        return void 0 === a ? a : Math.round(100 * a) / 100
    }, _e.vl = function(e) {
        return e.external.playerAPI.getVolume()
    }, _e.wd = function(e) {
        return e.playerData.playerSize.width
    }, _e.xid = function(e) {
        return e.playlistItemData.externalId
    }, _e.xav = function(e) {
        return e.meta.xidAlgorithmVersion
    }, _e.stpe = function(e) {
        return !!e.meta.playbackTracking.sendSetTimeEvents
    }, _e.ppm = function(e) {
        return e.playerData.playbackMode
    }, _e.gerr = function(e) {
        return e.temporaryGCID.gcidError
    }, _e.gifr = function(e) {
        return e.temporaryGCID.gcidIframeShouldBeRequested
    }, _e.gfb = function(e) {
        return e.temporaryGCID.gcidIsOnFacebook
    }, _e.gios = function(e) {
        return e.temporaryGCID.gcidIsOnIOS
    }, _e.strt = function(e) {
        var a = e.playerData.startup;
        return e.meta.lastEvent === a.dispatchEvent ? a.startupTime : void 0
    }, _e.tstc = function(e) {
        return e.browser.pageData.testCaseId
    }, _e.fsm = function(e) {
        return e.external.playerAPI.getFullscreen()
    }, _e.dpl = function(e) {}, _e.ss = function(e) {
        return e.meta.sessionSampled || void 0
    }, _e.amp = function(e) {
        return e.browser.pageData.amp
    };
    var Ne = {
        aes: 1,
        widevine: 2,
        playready: 3,
        fairplay: 4
    };
    var Fe = {
        interaction: 1,
        autostart: 2,
        repeat: 3,
        external: 4,
        "related-interaction": 1,
        "related-auto": 5,
        playlist: 6,
        viewable: 7
    };
    var qe = {
        none: 1,
        metadata: 2,
        auto: 3
    };

    function Ue(e) {
        return e === 1 / 0 ? 1 / 0 : (e |= 0) <= 0 ? 0 : e < 30 ? 1 : e < 60 ? 4 : e < 180 ? 8 : e < 300 ? 16 : 32
    }

    function Qe(e) {
        try {
            return e.external.playerAPI.qoe().item.sums.stalled || 0
        } catch (e) {
            return 0
        }
    }
    var Ke = Math.round,
        ze = {};
    ze.st = function(e) {
        return e.playerData.setupTime
    }, ze.bwe = function(e) {
        return function(e) {
            return l(e.playerData.playerConfig.bandwidthEstimate)
        }(e)
    }, ze.cct = function(e) {
        return function(e, a) {
            return Array.prototype.some.call(e.tracks || 0, function(e) {
                var a = e.kind;
                return "captions" === a || "subtitles" === a
            }) ? 1 : 1 < a.getCaptionsList().length ? 2 : 0
        }(e.playlistItemData.item, e.external.playerAPI)
    }, ze.drm = function(e) {
        return function(e) {
            return e ? Ne[e] || 999 : 0
        }(e.playlistItemData.drm) || e.meta.playbackTracking.segmentsEncrypted
    }, ze.ff = function(e) {
        return function(e) {
            return "function" == typeof e.qoe ? 10 * Math.round(e.qoe().firstFrame / 10) | 0 : -1
        }(e.external.playerAPI)
    }, ze.l = function(e) {
        return function(e) {
            return (e |= 0) <= 0 || e === 1 / 0 ? 0 : e < 15 ? 1 : e <= 300 ? 2 : e <= 1200 ? 3 : 4
        }(e.playlistItemData.duration)
    }, ze.vr = function(e) {
        return function(e) {
            if (e.getPlugin) {
                var a = e.getPlugin("vr");
                if (a) switch (a.getMode()) {
                    case "magic-window":
                        return 0;
                    case "cardboard":
                        return 1;
                    case "gear-vr":
                        return 2;
                    default:
                        return null
                }
            }
            return null
        }(e.external.playerAPI)
    }, ze.etw = function(e) {
        return e.meta.playbackTracking.retTimeWatched
    }, ze.ubc = function(e) {
        return Ke(Qe(e))
    }, ze.ltc = function(e) {
        return Ke(function(e) {
            try {
                return e.external.playerAPI.qoe().item.sums.loading || 0
            } catch (e) {
                return 0
            }
        }(e))
    }, ze.ubi = function(e) {
        return Ke(function(e, a) {
            void 0 === a && (a = e.meta.lastEvent);
            var t = Qe(e),
                n = e.meta.previousBufferTimes[a];
            void 0 === e.meta.previousBufferTimes[a] && (n = e.meta.previousBufferTimes[a] = t);
            var r = Math.round(t - n);
            return e.meta.previousBufferTimes[a] = t, r
        }(e))
    }, ze.pw = function(e) {
        return 0 | e.meta.playbackTracking.normalizedTime
    }, ze.ti = function(e) {
        return e.meta.playbackTracking.elapsedSeconds
    }, ze.vti = function(e) {
        return e.meta.playbackTracking.viewableElapsedSeconds
    }, ze.ati = function(e) {
        return e.meta.playbackTracking.audibleElapsedSeconds
    }, ze.cvl = function(e) {
        return Math.floor(e.meta.seekTracking.videoStartDragTime)
    }, ze.tvl = function(e) {
        return Math.floor(e.meta.seekTracking.lastTargetTime)
    }, ze.sdt = function(e) {
        return 1 === e.meta.seekTracking.numTrackedSeeks ? 0 : Date.now() - e.meta.seekTracking.dragStartTime
    }, ze.vso = function(e) {
        return Math.floor(e.meta.seekTracking.lastTargetTime) - Math.floor(e.meta.seekTracking.videoStartDragTime)
    }, ze.qcr = function(e) {
        return e.playerData.visualQuality.reason
    }, ze.abm = function(e) {
        return e.playerData.visualQuality.adaptiveBitrateMode
    }, ze.avc = function(e) {
        return e.playerData.numAutoVisualQualityChange
    }, ze.ppr = function(e) {
        return e.meta.playbackTracking.prevPlaybackRate
    }, ze.erc = function(e) {
        return e.playerData.lastErrorCode[e.meta.lastEvent]
    }, ze.pcp = function(e) {
        return Ke(e.meta.playbackTracking.currentPosition)
    }, ze.stg = function(e) {
        return e.sharing.shareMethod
    }, ze.tps = function(e) {
        return Ke(e.meta.playbackTracking.playedSecondsTotal)
    }, ze.srf = function(e) {
        return e.sharing.shareReferrer
    }, ze.plng = function(e) {
        return e.playerData.localization.language
    }, ze.pni = function(e) {
        return e.playerData.localization.numIntlKeys
    }, ze.pnl = function(e) {
        return e.playerData.localization.numLocalKeys
    }, ze.pbs = function(e) {
        try {
            return e.external.playerAPI.qoe().item.counts.stalled || 0
        } catch (e) {
            return null
        }
    }, ze.tc = function(e) {
        return e.meta.playbackTracking.thresholdCrossed
    }, ze.flc = function(e) {
        return e.playerData.floatingConfigured
    }, ze.fls = function(e) {
        return e.playerData.playerConfig.floatingState
    }, ze.xam = function(e) {
        return e.playerData.apiTracking.methodCalled
    }, ze.xfmp = function(e) {
        return e.playerData.apiTracking.firstMeaningfulParam
    }, ze.dle = function(e) {
        return e.meta.playbackTracking.latency
    }, ze.cdid = function(e) {
        return e.external.playerAPI.id
    }, ze.pcfg = function(e) {
        return e.playerData.stringifiedSetupConfig
    }, ze.pvta = function(e) {
        return e.meta.playbackTracking.posterVideoThumbAnimated
    }, ze.ovta = function(e) {
        return e.meta.playbackTracking.overlayVideoThumbAnimated
    };
    var We = t,
        He = a,
        Xe = {
            mk: function(e) {
                return function(e, a) {
                    if (!e) return null;
                    var t = e.sources[0],
                        n = t.type;
                    if (!n) {
                        var r = t.file;
                        n = a.extension(r)
                    }
                    return n
                }(e.playlistItemData.item, e.external.utils)
            }
        };
    Xe.pd = function(e) {
        return function(e) {
            var a = e.preload;
            return qe[a] || 0
        }(e.playlistItemData.item)
    }, Xe.vrt = function(e) {
        return function(e) {
            if (!e || !e.stereomode) return null;
            switch (e.stereomode) {
                case "monoscopic":
                    return 0;
                case "stereoscopicTopBottom":
                    return 1;
                case "stereoscopicLeftRight":
                    return 2;
                default:
                    return null
            }
        }(e.playlistItemData.item)
    }, Xe.pr = function(e) {
        return function(e) {
            return Fe[e] || 0
        }(e.playlistItemData.playReason)
    }, Xe.psd = function(e) {
        return -1 !== Ge.indexOf(e.meta.lastEvent) ? e.related.pinSetId : ve(e.playlistItemData.item)
    }, Xe.vh = function(e) {
        return e.playerData.visualQuality.height
    }, Xe.vw = function(e) {
        return e.playerData.visualQuality.width
    }, Xe.sbr = function(e) {
        return e.playerData.visualQuality.bitrate
    }, Xe.tb = function(e) {
        return function(e) {
            var a = e.getContainer().querySelector("video"),
                t = 0;
            if (a && (t = a.duration, a.buffered && a.buffered.length)) {
                var n = a.buffered.end(a.buffered.length - 1) || 0;
                return Math.round(10 * n) / 10
            }
            return t = t || Math.abs(e.getDuration()), Math.round(t * e.getBuffer() / 10) / 10
        }(e.external.playerAPI)
    }, Xe.vd = function(e) {
        return e.playlistItemData.duration
    }, Xe.q = function(e) {
        return Ue(e.playlistItemData.duration)
    }, Xe.tt = function(e) {
        return function(e) {
            var a = e.tracks;
            return Array.prototype.some.call(a || 0, function(e) {
                return "thumbnails" === e.kind
            })
        }(e.playlistItemData.item)
    }, Xe.vs = function(e) {
        var a = e.meta.playbackEvents;
        return function(e, a, t, n) {
            var r = 3 < arguments.length && void 0 !== n ? n : {};
            if (!a) return null;
            if (t && t.levels && t.levels.length) {
                var i = t.levels[0];
                if (i && "auto" === ("" + i.label).toLowerCase()) return 5
            }
            if (Ie(e.getContainer(), "jw-flag-audio-player")) return 6;
            var o = 0 | r.width,
                d = 0 | r.height;
            return 0 != o || 0 != d ? o <= 320 ? 1 : o <= 640 ? 2 : o <= 1280 ? 3 : 4 : "rtmp" === a.sources[0].type ? 6 : 0
        }(e.external.playerAPI, e.playlistItemData.item, a[We], a[He])
    }, Xe.ptid = function(e) {
        return c(e.playlistItemData.item, "variations.selected.images.id")
    };
    var Ye = w({}, _e, Ve, Oe, Xe, ze, Le, je, Me, Be);

    function $e(e, a) {
        var t = ce.events[e],
            n = t.parameterGroups.reduce(function(e, a) {
                return e.concat(ce.paramGroups[a].members)
            }, []).concat(t.pingSpecificParameters ? t.pingSpecificParameters : []).map(function(e) {
                return function(e, a) {
                    var t = Ye[e] ? Ye[e] : function() {
                        a.meta.debug && console.log("No parameter generation function for param " + e)
                    };
                    return {
                        code: e,
                        value: t(a)
                    }
                }(e, a)
            });
        return {
            event: t.code,
            bucket: t.bucket,
            parameters: n,
            pingDestination: t.pingDestination
        }
    }
    var Je = {
        missingMediaOrExternalID: function(e) {
            return !e.meta.sessionSampled && (!e.playlistItemData.mediaId && !e.playlistItemData.externalId)
        },
        missingAdScheduleID: function(e) {
            return !e.meta.sessionSampled && !e.ads.adScheduleId
        },
        missingFeedID: function(e) {
            return !e.related.feedId
        }
    };
    var Ze = {
            main: "prd.jwpltx.com/v1",
            meta: "ping-meta-prd.jwpltx.com/v1"
        },
        ea = function(e, a, t, n) {
            var r = [{
                    code: ne,
                    value: e
                }, {
                    code: te,
                    value: Math.random().toFixed(16).substr(2, 16)
                }].concat(t),
                i = [];
            r.forEach(function(e) {
                var a = e.value;
                !0 !== a && !1 !== a || (a = a ? 1 : 0), null != a && i.push(e.code + "=" + encodeURIComponent(a))
            });
            var o = "file:" === window.location.protocol ? "https:" : "",
                d = i.join("&"),
                l = "h=" + function(e) {
                    var a = 0;
                    if (!(e = decodeURIComponent(e)).length) return a;
                    for (var t = 0; t < e.length; t++) {
                        a = (a << 5) - a + e.charCodeAt(t), a &= a
                    }
                    return a
                }(d) + "&" + d;
            return o + "//" + Ze[n] + "/" + a + "/ping.gif?" + l
        },
        aa = function(e) {
            e.trackingState.pageLoaded = !0;
            for (var a = e.trackingState.queue.length; a--;) ra(e, e.trackingState.queue.shift());
            window.removeEventListener("load", e.trackingState.boundFlushQueue)
        };

    function ta(e) {
        var a = function(e) {
            return "complete" === (e.getContainer().ownerDocument || window.document).readyState
        }(e.external.playerAPI);
        (e.trackingState.pageLoaded = a) || (e.trackingState.boundFlushQueue = aa.bind(null, e), window.addEventListener && window.addEventListener("load", e.trackingState.boundFlushQueue), setTimeout(e.trackingState.boundFlushQueue, 5e3))
    }

    function na(e, a) {
        var t = a.event,
            n = a.bucket,
            r = a.parameters,
            i = a.pingDestination,
            o = ea(t, n, r, i),
            d = !e.trackingState.pageLoaded;
        if (d && (t === ie || t === de || t === oe)) aa(e);
        else if (d) return void e.trackingState.queue.push(o);
        ra(e, o)
    }

    function ra(e, a) {
        var t = new Image,
            n = void 0;
        try {
            n = Date.now()
        } catch (e) {}
        t.src = a + "&" + re + "=" + n;
        for (var r = e.trackingState.images, i = r.length; i-- && (r[i].width || r[i].complete);) r.length = i;
        if (r.push(t), e.meta.debug && e.trackingState.onping) try {
            e.trackingState.onping.call(null, a)
        } catch (e) {}
    }
    var ia = {
        delaySend: !1,
        returnURL: !1
    };

    function oa(a, e, t, n) {
        var r = 2 < arguments.length && void 0 !== t ? t : "jwplayer6",
            i = 3 < arguments.length && void 0 !== n ? n : {};
        i = w({}, ia, i), xe(a, e, r);
        var o = u(e, r);
        if (!(ce.events[o].filters || []).map(function(e) {
            return function(e, a) {
                return Je[e](a)
            }(e, a)
        }).some(function(e) {
            return !!e
        })) {
            var d = $e(o, a);
            return i.delaySend ? na.bind(null, a, d) : i.returnURL ? ea(d.event, d.bucket, d.parameters, d.pingDestination) : void na(a, d)
        }
    }

    function da(e) {
        if (!e.bidders) return {};
        var t = {},
            n = void 0;
        e.bidders.forEach(function(e) {
            var a = e.name;
            t[a.toLowerCase()] = function(t) {
                var n = {};
                return _.forEach(function(e) {
                    var a;
                    "result" === e ? n.result = R[t[e]] : w(n, void 0 !== t[e] ? ((a = {})[e] = t[e], a) : void 0);
                    t.code && -1 !== ["error", "invalid"].indexOf(t.result) && (n.errorCode = t.code)
                }), n
            }(e), e.errorCode && !n && (n = e.errorCode)
        });
        var a = e.floorPriceCurrency;
        return w({
            mediationLayer: L[e.mediationLayerAdServer],
            floorPriceCents: e.floorPriceCents,
            bidders: t,
            bidTimeout: e.bidTimeout
        }, void 0 !== n ? {
            errorCode: n
        } : void 0, a ? {
            floorPriceCurrency: a
        } : void 0)
    }

    function la(t, e) {
        var n = t.ads.adEventData; - 1 === t.ads.adClient && e && (t.ads.adClient = T(e.client)), e.sequence !== n.podIndex && (delete n.timeAdLoading, delete n.adCreativeType), ua(n, e, "offset"), ua(n, e, "witem"), ua(n, e, "wcount"), ua(n, e, "skipoffset"), ua(n, e, "linear", function(e, a) {
            return a === e
        }), ua(n, e, "adposition", function(e, a) {
            return {
                pre: 0,
                mid: 1,
                post: 2,
                api: 3
            }[a]
        }), ua(n, e, "creativetype", function(e, a) {
            var t = "";
            switch (a) {
                case "static":
                    t = "image/unknown";
                    break;
                case "video":
                    t = "video/unknown";
                    break;
                case "vpaid":
                case "vpaid-swf":
                    t = "application/x-shockwave-flash";
                    break;
                case "vpaid-js":
                    t = "application/javascript";
                    break;
                default:
                    t = a || t
            }
            return n.adCreativeType = t
        }), ua(n, e, "tag", function(e, a) {
            return n.tagdomain = function(e) {
                if (e) {
                    var a = e.match(new RegExp(/^[^/]*:\/\/\/?([^\/]*)/));
                    if (a && 1 < a.length) return a[1]
                }
                return ""
            }(t.external.playerAPI.utils.getAbsolutePath(a)), a
        }), ua(n, e, "description"), ua(n, e, "creativeAdId"), ua(n, e, "placement"), e.timeLoading && (n.timeAdLoading = 10 * Math.round(e.timeLoading / 10)), e.universalAdId ? n.universalAdId = e.universalAdId.map(function(e) {
            if ("unknown" !== e.universalAdIdRegistry) return e.universalAdIdRegistry + "." + e.universalAdIdValue
        }).filter(function(e) {
            return !!e
        }).join(",") : delete n.universalAdId, n.mediaFileCompliance = e.mediaFileCompliance, n.categories = e.categories, n.adSystem = e.adsystem || n.adSystem, n.vastVersion = e.vastversion || n.vastVersion, n.podIndex = e.sequence || n.podIndex, n.podCount = e.podcount || n.podCount, n.tagURL = e.tag || n.tagURL || e.vmap, n.preload = "boolean" == typeof e.preloadAds ? e.preloadAds : n.preload, n.adPlayId = e.adPlayId || n.adPlayId, n.adBreakId = e.adBreakId || n.adBreakId, n.adVastId = e.adId || n.adVastId, n.duration = e.duration || n.duration, n.adTitle = e.adtitle || n.adTitle, n.timeForVPBCache = e.timeForVPBCache || n.timeForVPBCache;
        var a = void 0;
        if (a = "googima" === e.client ? (n.creativeId = c(e, "ima.ad.g.creativeId"), c(e, "ima.ad.g.mediaUrl")) : (n.creativeId = c(e, "creativeId"), c(e, "mediafile.file")), n.adMediaFileURL = "string" == typeof a ? a.substring(0, 2500) : a, e.item) {
            var r = be(e.item);
            n.targetMediaId = r !== t.playlistItemData.mediaId ? r : null
        }
        t.ads.headerBiddingData = da(e)
    }

    function ua(e, a, t, n) {
        var r = 3 < arguments.length && void 0 !== n ? n : ca;
        if (a.hasOwnProperty(t)) {
            var i = r;
            e[t] = i(t, a[t])
        }
    }

    function ca(e, a) {
        return a
    }

    function sa(e, a) {
        e.meta.playerState !== a && (e.meta.playerStateDuration = Date.now()), e.meta.playerState = a
    }

    function pa(e, a, t) {
        null === a.previousTime && (a.previousTime = t);
        var n = t - a.previousTime;
        return a.previousTime = t, n = Math.min(Math.max(0, n), 4), a.playedSeconds = a.playedSeconds + n, e.playerData.viewable && (a.viewablePlayedSeconds = a.viewablePlayedSeconds + n), !e.playerData.muted && 0 < e.playerData.volume && (a.audiblePlayedSeconds = a.audiblePlayedSeconds + n), n
    }

    function fa(e, a) {
        var t = e.ads.adEventData,
            n = e.ads.currentQuartile;
        n > t.previousQuartile && (la(e, a), oa(e, "v", "clienta"), t.previousQuartile = n)
    }
    var ma = {
        adComplete: function(e, a) {
            e.ads.currentQuartile = 4, fa(e, a)
        },
        adError: function(e, a) {
            "object" == typeof a && a && (e.playerData.lastErrorCode.ae = a.code || 1, e.ads.jwAdErrorCode = a.adErrorCode, 51901 === a.adErrorCode ? e.ads.errorMessage = "string" == typeof a.message ? a.message.substring(0, 100) : void 0 : e.ads.errorMessage = void 0, e.ads.timeout = a.timeout), oa(e, "ae", "clienta")
        },
        adTime: function(e, a) {
            var t = e.ads.adEventData,
                n = t.position = a.position;
            t.duration = t.duration || a.duration;
            var r = e.ads.adPlaybackTracking;
            !n || t.position > t.duration || (pa(e, r, n), e.ads.currentQuartile = Math.min(3, Math.floor((4 * t.position + .05) / t.duration)), fa(e, a))
        },
        adSkipped: function(e, a) {
            e.ads.watchedPastSkipPoint = a.watchedPastSkipPoint, oa(e, "s", "clienta")
        },
        adImpression: function(e, a) {
            A(e, ie);
            var t = e.ads.adPlaybackTracking;
            t.audiblePlayedSeconds = 0, t.viewablePlayedSeconds = 0, t.playedSeconds = 0, t.previousTime = null, oa(e, ie, "clienta")
        },
        adBreakEnd: function(e, a) {
            e.ads.adEventData = w({}, B)
        }
    };

    function ga(a) {
        var e = a.external.playerAPI;
        e.on(G.join(" "), function() {
            sa(a, "ad-break"), a.ads.adBreakTracking && a.ads.adBreakTracking.shouldTrack && (a.ads.adBreakTracking.shouldTrack = !1, a.ads.adBreakTracking.adBreakCount++)
        }), e.on("adClick adRequest adMeta adImpression adComplete adSkipped adError adTime adBidRequest adBidResponse adStarted adLoaded adViewableImpression adBreakEnd", function(e) {
            ! function(e, a) {
                return "adClick" !== a.type && (!e || e.adId !== a.id || -1 === a.id)
            }(a.ads.adEventData, e) || (a.ads.adEventData = w({
                adId: e.id
            }, B)),
            function(e) {
                return -1 === V.indexOf(e.type)
            }(e) && la(a, e), e.type in ma ? ma[e.type](a, e) : -1 === O.indexOf(e.type) && oa(a, M[e.type], "clienta")
        })
    }

    function va(e) {
        "function" == typeof navigator.sendBeacon && function(a) {
            function e() {
                A(a, $);
                var e = oa(a, $, "jwplayer6", {
                    returnURL: !0
                });
                void 0 !== e && navigator.sendBeacon(e)
            }
            window.addEventListener("unload", e), a.external.playerAPI.on("remove", function() {
                A(a, $), window.removeEventListener("unload", e), a.meta.playerRemoved = !0, oa(a, $, "jwplayer6")
            })
        }(e)
    }
    var ya = "jwp-global-frame",
        ba = "i.jwpsrv.com",
        ha = {
            PARAM_ANALYTICS_TOKEN: "aid",
            PARAM_MEDIA_ID: "id",
            EMBED_ID: "emi",
            ITEM_ID: "pli",
            PARAM_EXTERNAL_ID: "xid",
            PARAM_XID_ALGORITHM_VERSION: "xav",
            PARAM_PLAYER_VERSION: "pv",
            PARAM_TRACKER_VERSION: "tv"
        };

    function ka(e, a, t) {
        a.parentNode && a.parentNode.removeChild(a), a.src = t, e.appendChild(a)
    }

    function Da() {
        var e = document.getElementById(ya);
        return e || ((e = document.createElement("iframe")).setAttribute("id", ya), e.style.display = "none"), e
    }

    function Ia(e, a, t) {
        var n = {
                PARAM_ANALYTICS_TOKEN: a.analyticsID,
                PARAM_MEDIA_ID: a.mediaID,
                EMBED_ID: a.embedID,
                ITEM_ID: a.playID,
                PARAM_EXTERNAL_ID: a.externalID,
                PARAM_XID_ALGORITHM_VERSION: a.xidAlgorithmVersion,
                PARAM_PLAYER_VERSION: a.playerVersion,
                PARAM_TRACKER_VERSION: a.trackerVersion
            },
            r = Object.keys(n).reduce(function(e, a) {
                var t = n[a];
                return null == t ? e : e + (e.length ? "&" : "") + ha[a] + "=" + encodeURIComponent(t)
            }, "");
        ka(e, Da(), t + "?" + r)
    }

    function wa(e) {
        if (e.temporaryGCID.gcidIframeShouldBeRequested = !1, function(a) {
            if (a.temporaryGCID.gcidError = null, a.meta.doNotPingBackIDs || !a.browser.allowUserTracking || a.staticPlayerData.sdkPlatform !== I) return !1;
            var e = a.external.playerAPI;
            try {
                var t = void 0,
                    n = void 0;
                if (e.getEnvironment) {
                    var r = e.getEnvironment();
                    t = r.Browser.facebook, n = r.OS.iOS
                } else t = e.utils.isFacebook(), n = e.utils.isIOS();
                return a.temporaryGCID.gcidIsOnFacebook = t, a.temporaryGCID.gcidIsOnIOS = n, !(t && n)
            } catch (e) {
                return !(a.temporaryGCID.gcidError = !0)
            }
        }(e) && (e.playlistItemData.mediaId || e.playlistItemData.externalId)) {
            var a = e.external.div,
                t = {
                    analyticsID: e.accountData.analyticsID,
                    mediaID: e.playlistItemData.mediaId,
                    embedID: e.staticPlayerData.embedID,
                    playID: e.playlistItemData.itemId,
                    externalID: e.playlistItemData.externalId,
                    xidAlgorithmVersion: e.meta.xidAlgorithmVersion,
                    playerVersion: e.staticPlayerData.playerVersion,
                    trackerVersion: "3.24.0"
                },
                n = document.querySelector('[src*="' + ba + '"]'),
                r = e.trackingState.gcidURL;
            e.temporaryGCID.gcidIframeShouldBeRequested = !0, !n || n.complete || f(n) ? setTimeout(function() {
                return Ia(a, t, r)
            }) : function(e, a, t, n) {
                var r = void 0,
                    i = setInterval(function() {
                        (f(e) || e.complete) && (clearInterval(i), clearTimeout(r), Ia(a, t, n))
                    }, 250);
                r = setTimeout(function() {
                    clearInterval(i), Ia(a, t, n)
                }, 1e3)
            }(n, a, t, r)
        }
    }
    var Sa = 1e3;

    function Ta(e) {
        return 0 < e.numTrackedSeeks
    }
    var Pa = a,
        Ea = e,
        Aa = n;

    function Ca(e) {
        e.meta.playbackTracking.playItemCount++, oa(e, "s")
    }

    function xa(d, l) {
        return function(e) {
            var a = d.meta.playbackEvents,
                t = d.playlistItemData,
                n = d.meta.playbackTracking,
                r = d.external.playerAPI,
                i = a[l];
            if (l === Pa) {
                var o = e.segment;
                o && (n.segmentReceived = !0, n.segmentsEncrypted = o.encryption), t.drm = e.drm || ""
            }
            a[l] = e, l === Ea && (i || (n.playedSeconds = 0, n.viewablePlayedSeconds = 0, n.audiblePlayedSeconds = 0, n.playedSecondsTotal = 0), n.previousTime = g(r)), l === Aa && (A(d, F), "flash_adaptive" === y(r) ? !d.meta.playbackSent && n.segmentReceived && (d.meta.playbackSent = !0, n.segmentReceived = !1, Ca(d)) : d.meta.playbackSent || (d.meta.playbackSent = !0, Ca(d)))
        }
    }

    function Ra(e) {
        var a = e.meta.playbackTracking,
            t = a.playedSeconds,
            n = a.viewablePlayedSeconds,
            r = a.audiblePlayedSeconds;
        a.playedSeconds = 0, a.viewablePlayedSeconds = 0;
        var i = t + .5 | (a.audiblePlayedSeconds = 0);
        a.elapsedSeconds = i;
        var o = n + .5 | 0;
        a.viewableElapsedSeconds = o;
        var d = r + .5 | 0;
        a.audibleElapsedSeconds = d, 0 < i && oa(e, U)
    }

    function Ba(e, a, t, n) {
        a < n && n <= a + t && (e.meta.playbackTracking.retTimeWatched = n, oa(e, "ret"))
    }

    function ja(e, a, t) {
        var n = Q + "-" + t;
        ! function(e, a, t, n) {
            return e.meta.pingLimiters.playlistItem.canSendPing(n) && Math.floor(a) === t
        }(e, a, t, n) || (e.meta.playbackTracking.thresholdCrossed = t, oa(e, Q), e.meta.pingLimiters.playlistItem.setPingSent(n))
    }

    function Ma(e, a, t) {
        2 < arguments.length && void 0 !== t && t ? function(e) {
            var a = e.meta.seekTracking;
            if (Ta(a)) {
                clearTimeout(a.seekDebounceTimeout);
                var t = oa(e, "vs", "jwplayer6", {
                    delaySend: !0
                });
                a.seekDebounceTimeout = setTimeout(function() {
                    t && t(),
                        function(e) {
                            e.videoStartDragTime = 0, e.dragStartTime = 0, e.seekDebounceTimeout = null, e.lastTargetTime = 0, e.numTrackedSeeks = 0
                        }(a)
                }, Sa)
            }
        }(e) : function(e, a) {
            Ta(e) || (e.videoStartDragTime = a.position, e.dragStartTime = Date.now()), e.numTrackedSeeks++, e.lastTargetTime = a.offset
        }(e.meta.seekTracking, a)
    }

    function Oa(e, a, t) {
        e.playerData.lastErrorCode[a] = t.code, A(e, ue), e.meta.eventPreAbandonment = u(a, "error"), e.errors.numberEventsSent < e.errors.NUM_ERRORS_PER_SESSION && function(e, a) {
            return "number" == typeof e.playerData.lastErrorCode[a] || Math.random() < e.errors.SAMPLE_RATE
        }(e, a) && (e.errors.numberEventsSent += 1, oa(e, a, N))
    }
    var Va = n,
        Ga = t,
        La = a,
        _a = e;

    function Na(e) {
        var a = e.meta;
        a.playbackEvents = {}, a.playbackSent = !1, a.playbackTracking.trackingSegment = 0, a.pingLimiters.playlistItem.resetAll(), a.playbackTracking.posterVideoThumbAnimated = void 0, a.playbackTracking.overlayVideoThumbAnimated = void 0, e.playerData.numAutoVisualQualityChange = 0;
        var t = e.playerData.startup;
        t.initialTime = null, t.startupTime = null, t.dispatchEvent = null
    }

    function Fa(u) {
        var c = u.external.playerAPI,
            n = function(e, a) {
                e.playlistItemData.playReason = a.playReason || "", e.playerData.startup.initialTime = Date.now(), oa(e, "pa")
            }.bind(null, u),
            e = function(e, a) {
                var t = e.playlistItemData.mediaId;
                t && t === be(a.item) && (e.playerData.lastErrorCode[z] = a.code, oa(e, "paf", "error"))
            }.bind(null, u);
        c.on("idle buffer play pause complete error", function(e) {
            sa(u, e.type)
        }), c.on("idle", Na.bind(null, u)), c.on("ready", function(e) {
            u.playlistItemData.ready = w({}, e), u.playerData.viewable = c.getViewable(), u.playerData.muted = c.getMute(), u.playerData.volume = c.getVolume()
        }), c.on("playlistItem", function(e) {
            var a = u.playlistItemData;
            a.drm = "", 0 !== u.meta.playbackTracking.playSessionSequence && (a.itemId = S(12)), u.meta.playbackTracking.playSessionSequence++, a.index = e.index;
            var t = e.item || v(c);
            t && (a.mediaId = be(t), ke(u, t)), a.ready && (function(e, a) {
                e.playerData.setupTime = -1, a && a.setupTime && (e.playerData.setupTime = 10 * Math.round(a.setupTime / 10) | 0), oa(e, "e")
            }(u, a.ready), oa(u, Z), a.item = null, a.ready = null), c.off("beforePlay", n), c.once("beforePlay", n), Na(u), u.meta.playbackTracking.segmentReceived = u.meta.playbackTracking.segmentsEncrypted = !1, wa(u)
        }), c.on("playAttemptFailed", e), c.on("meta", xa(u, La)), c.on("levels", xa(u, Ga)), c.on("play", xa(u, _a)), c.on("firstFrame", xa(u, Va)), c.on("time", function(e) {
            var a = u.meta.playbackEvents,
                t = u.meta.playbackTracking,
                n = g(c);
            t.currentPosition = n;
            var r = e.duration;
            if (n)
                if (u.meta.seekTracking.dragStartTime) t.previousTime = n;
                else {
                    1 < n && (a[Ga] || xa(u, Ga)({}));
                    var i = Ue(r),
                        o = function(e, a, t) {
                            return a === 1 / 0 ? null : e / (a / t) + 1 | 0
                        }(n, r, i);
                    0 === t.trackingSegment && (t.trackingSegment = o);
                    var d = pa(u, t, n);
                    if (Ba(u, t.playedSecondsTotal, d, 10), Ba(u, t.playedSecondsTotal, d, 30), Ba(u, t.playedSecondsTotal, d, 60), t.playedSecondsTotal = t.playedSecondsTotal + d, !0 === t.sendSetTimeEvents && (ja(u, n, 3), ja(u, n, 10), ja(u, n, 30)), r <= 0 || r === 1 / 0) t.playedSeconds >= p && (t.latency = e.latency, Ra(u));
                    else if (o === t.trackingSegment + 1) {
                        var l = s * t.trackingSegment / i;
                        if (i < o) return;
                        t.normalizedTime = l, Ra(u), t.trackingSegment = 0
                    }
                }
        }), c.on("seek", function(e) {
            u.meta.playbackTracking.previousTime = g(c), u.meta.playbackTracking.trackingSegment = 0, Ma(u, e)
        }), c.on("seeked", function(e) {
            Ma(u, e, !0)
        }), c.on("complete", function() {
            var e = u.meta.playbackTracking,
                a = E(u);
            if (!(a <= 0 || a === 1 / 0)) {
                Ue(a);
                e.normalizedTime = s, Ra(u), e.playedSecondsTotal = 0
            }
        }), c.on("cast", function(e) {
            u.casting = !!e.active
        }), c.on("playbackRateChanged", function(e) {
            oa(u, "pru"), u.meta.playbackTracking.prevPlaybackRate = e.playbackRate
        }), c.on("visualQuality", function(e) {
            "auto" === e.reason && (u.playerData.numAutoVisualQualityChange += 1);
            var a = P(c);
            ! function(e) {
                var a = !1;
                return b.width === e.width && b.height === e.height || (a = !0), b = e, a
            }(a) || -1 !== r.indexOf(a.reason) || oa(u, "vqc")
        }), c.on(i.join(" "), function() {
            u.ads.adBreakTracking && (u.ads.adBreakTracking.shouldTrack = !0)
        }), c.on("error", Oa.bind(null, u, ue)), c.on("setupError", Oa.bind(null, u, le)), c.on("autostartNotAllowed", function() {
            oa(u, q)
        }), c.on("viewable", function(e) {
            u.playerData.viewable = e.viewable
        }), c.on("mute", function(e) {
            u.playerData.muted = e.mute
        }), c.on("volume", function(e) {
            u.playerData.volume = e.volume
        }), c.on("captionsChanged", function(e) {
            0 !== e.track && 0 === u.playerData.captionsIndex && oa(u, ee), u.playerData.captionsIndex = e.track
        }), c.on("videoThumbFirstFrame", function(e) {
            u.meta.playbackTracking.posterVideoThumbAnimated = !0
        }), Na(u),
            function(e, a) {
                e.meta.previousBufferTimes[a] = Qe(e)
            }(u, U)
    }

    function qa(e, a) {
        e.related.feedId = me(a), e.related.feedInstanceId = ge(a), e.related.feedType = function(e) {
            return ye(e, "kind")
        }(a), e.related.feedShownId = a.feedShownId, e.related.onClickSetting = "onclick" in a ? "play" === a.onclick ? 1 : 0 : void 0, e.related.feedInterface = a.ui;
        var t = a.itemsShown || [],
            n = 0,
            r = [],
            i = [],
            o = !0;
        t.forEach(function(e) {
            ve(e) && n++, r.push(be(e));
            var a = c(e, "variations.selected.images.id");
            a && (o = !1), i.push(a || "null")
        }), e.related.thumbnailIdsShown = o ? [] : i, e.related.idsShown = r, e.related.pinnedCount = n, e.related.page = a.page, e.related.autotimerLength = a.autoTimer, e.related.pinSetId = ve(a.target), e.related.advanceTarget = be(a.target), e.related.targetThumbID = c(a.target, "variations.selected.images.id"), e.related.ordinalClicked = "position" in a ? a.position + 1 : a.index
    }

    function Ua(e, a, t) {
        qa(e, a), oa(e, t)
    }

    function Qa(a) {
        var e = a.external.playerAPI.getPlugin("related");
        e && (e.on("playlist", function(e) {
            null !== e.playlist && Ua(a, e, W)
        }), e.on("feedShown", function(e) {
            sa(a, "recs-overlay"), a.related.shownReason = e.reason, a.related.feedWasViewable = e.viewable, Ua(a, e, H)
        }), e.on("feedClick", function(e) {
            Ua(a, e, X)
        }), e.on("feedAutoAdvance", function(e) {
            Ua(a, e, Y)
        }), e.on("videoThumbFirstFrame", function(e) {
            a.meta.playbackTracking.overlayVideoThumbAnimated = !0
        }), a.related.relatedSetUp = !0)
    }

    function Ka(e) {
        e.external.playerAPI.getPlugin && (e.external.playerAPI.on("ready", function() {
            Qa(e),
                function(a) {
                    var e = a.external.playerAPI;
                    e.on("playlistItem", function() {
                        a.related.sendHoverPing = !0, a.related.nextShownReason = null, a.related.shownReason = null
                    }), e.on("nextShown", function(e) {
                        a.related.nextShownReason = e.reason, a.related.shownReason = e.reason, sa(a, "recs-overlay"), "hover" === e.reason && !a.related.sendHoverPing || (a.related.sendHoverPing = !1, Ua(a, e, H))
                    }), e.on("nextClick", function(e) {
                        a.related.nextShownReason && Ua(a, e, X)
                    }), e.on("nextAutoAdvance", function(e) {
                        Ua(a, e, Y)
                    })
                }(e)
        }), e.external.playerAPI.on("relatedReady", function() {
            e.related.relatedSetUp || Qa(e)
        }))
    }
    var za = {
        facebook: "fb",
        twitter: "twi",
        email: "em",
        link: "cl",
        embed: "ceb",
        pinterest: "pin",
        tumblr: "tbr",
        googleplus: "gps",
        reddit: "rdt",
        linkedin: "lkn",
        custom: "cus"
    };

    function Wa(e) {
        e.external.playerAPI.on("ready", function() {
            ! function(a) {
                var e = a.external.playerAPI;
                if (e.getPlugin) {
                    var t = e.getPlugin("sharing");
                    t && t.on("click", function(e) {
                        a.sharing.shareMethod = za[e.method] || za.custom, oa(a, K)
                    })
                }
            }(e)
        })
    }
    var Ha = .01;
    var Xa, Ya = (Xa = function() {
            var e = navigator.plugins;
            if (e && "object" == typeof e["Shockwave Flash"]) {
                var a = e["Shockwave Flash"].description;
                if (a) return a
            }
            if (void 0 !== window.ActiveXObject) try {
                var t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (t) {
                    var n = t.GetVariable("$version");
                    if (n) return n
                }
            } catch (e) {}
            return ""
        }().replace(/\D+(\d+\.?\d*).*/, "$1"), function() {
            return Xa
        }),
        $a = S(12);
    var Ja = void 0;
    try {
        Ja = window.localStorage
    } catch (e) {}
    var Za = (et.prototype.canSendPing = function(e) {
        return !this.pingTracker[e]
    }, et.prototype.setPingSent = function(e) {
        this.pingTracker[e] = !0
    }, et.prototype.resetAll = function() {
        this.pingTracker = {}
    }, et.prototype.resetKey = function(e) {
        delete this.pingTracker[e]
    }, et);

    function et() {
        ! function(e, a) {
            if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function")
        }(this, et), this.pingTracker = {}
    }
    var at = ["1", "yes", "true"];
    var tt = 0;

    function nt(e, a, t) {
        var n = a.sdkplatform ? parseInt(a.sdkplatform, 10) : I,
            r = e.getConfig(),
            i = (r || {}).advertising || {},
            o = tt += 1,
            d = "doNotTrack" in navigator || "doNotTrack" in window || "msDoNotTrack" in navigator ? navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack : "unsupported",
            l = function(e) {
                return null == e || -1 === at.indexOf(e.toString())
            }(d),
            u = (e.utils.isFileProtocol && e.utils.isFileProtocol() ? "https:" : "") + "//g.jwpsrv.com/g/gcid-0.1.2.html",
            c = void 0,
            s = void 0;
        if (l) {
            var p = function() {
                if (!Ja) return {
                    localID: null,
                    storageAvailable: "fail"
                };
                var e = Ja.jwplayerLocalId;
                if (e) return {
                    localID: e,
                    storageAvailable: "read"
                };
                try {
                    return Ja.jwplayerLocalId = S(12), {
                        localID: Ja.jwplayerLocalId,
                        storageAvailable: "set"
                    }
                } catch (e) {
                    return {
                        localID: null,
                        storageAvailable: "fail"
                    }
                }
            }();
            c = p.localID, s = p.storageAvailable
        } else Ja && Ja.removeItem("jwplayerLocalId"), n === I && function(e, a) {
            ka(e, Da(), a + "?notrack")
        }(t, u);
        var f = function() {
                var e = document.querySelector("html");
                return e ? e.getAttribute("lang") : null
            }(),
            m = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches || !0 === window.navigator.standalone,
            g = function() {
                try {
                    if (window.top !== window.self) return window.top.document.referrer
                } catch (e) {
                    return null
                }
                return document.referrer
            }(),
            v = r.defaultPlaybackRate || 1,
            y = T(i.client);
        e.getPlugin && e.getPlugin("related");
        var b = Math.random() <= Ha;
        return {
            external: {
                playerAPI: e,
                div: t,
                utils: e.utils
            },
            playerData: {
                setupTime: -1,
                startup: {
                    initialTime: null,
                    startupTime: null,
                    dispatchEvent: null
                },
                visualQuality: P(e),
                numAutoVisualQualityChange: 0,
                lastErrorCode: {},
                defaultPlaybackRate: v,
                playerConfig: {
                    visibility: -1,
                    bandwidthEstimate: -1,
                    floatingState: !1
                },
                floatingConfigured: !(!r.floating || r.floating.disabled),
                playerSize: {
                    width: 0,
                    height: 0,
                    bucket: 0
                },
                localization: {
                    language: r.language,
                    numIntlKeys: "object" == typeof r.intl ? Object.keys(r.intl).length : null,
                    numLocalKeys: "object" == typeof r.localization ? Object.keys(r.localization).length : null
                },
                contextualEmbed: !!r.contextual,
                playbackMode: null,
                stringifiedSetupConfig: C(e),
                captionsIndex: 0
            },
            staticPlayerData: function(e, a, t) {
                var n = {
                    playerVersion: function(e) {
                        return e.split("+")[0]
                    }(e.version),
                    sdkPlatform: a.sdkplatform || I,
                    embedID: S(12)
                };
                return t && (n.sdkVersion = a.iossdkversion, n.bundleId = a.bundleId, n.advertisingId = a.advertisingId), n
            }(e, a, n),
            casting: !1,
            accountData: function(e, a) {
                var t = 0,
                    n = void 0;
                if (e) {
                    var r = new a(e),
                        i = r.edition();
                    (t = k[i] || 0) !== h && (n = r.token())
                }
                return {
                    analyticsID: n = n || "_",
                    edition: t
                }
            }(r.key, e.utils.key),
            configData: function(e) {
                var a = window.jwplayer && window.jwplayer.defaults || {},
                    t = e.related,
                    n = {
                        playerHosting: e[ae] || a[ae] || 0,
                        playerConfigKey: e.pid,
                        abTestConfig: e.pad,
                        skinName: e.skin,
                        advertisingBlockType: function(e) {
                            return e.advertising ? e.advertising.outstream ? 2 : 1 : 0
                        }(e),
                        sharingEnabled: !!e.sharing,
                        castingBlockPresent: !!e.cast,
                        gaBlockPresent: !!e.ga,
                        autostartConfig: !!e.autostart,
                        displayDescription: !1 !== e.displaydescription,
                        posterImagePresent: !!e.image,
                        playbackRateControlsSet: !!e.playbackRateControls
                    };
                return e.autostart in D && (n.autostartConfig = D[e.autostart]), t && (n.relatedPluginFeedFile = t.recommendations || t.file), n
            }(r),
            browser: {
                langAttr: f,
                isPageStandalone: m,
                docReferrer: g,
                storage: {
                    localID: c,
                    storageAvailable: s,
                    doNotTrackProperty: d
                },
                pageData: function(e) {
                    if (e) return {
                        pageViewId: $a
                    };
                    var a = "",
                        t = "",
                        n = !1,
                        r = window.top !== window.self;
                    if (r) {
                        n = (a = function(e) {
                            var a = e.match(/^(https?:\/\/).*.(?:ampproject.org|bing-amp.com)\/(?:.\/)*(.*)\/amp.*$/);
                            if (a && 1 < a.length) return "" + a[1] + a[2];
                            return e
                        }(document.referrer)) !== document.referrer;
                        try {
                            a = a || window.top.location.href, t = window.top.document.title
                        } catch (e) {}
                    }
                    var i = document.querySelector('meta[property="og:title"]'),
                        o = void 0;
                    return i && (o = i.getAttribute("content")), {
                        pageURL: a || window.location.href,
                        pageTitle: t || document.title,
                        inIframe: r,
                        flashVersion: Ya(),
                        pageViewId: $a,
                        pageOGTitle: o,
                        testCaseId: void 0,
                        amp: n
                    }
                }(n),
                allowUserTracking: l
            },
            meta: {
                debug: !0 === a.debug,
                doNotPingBackIDs: Re && !0 === r.doNotTrack || !0 === a.dnt,
                setupCount: tt,
                nthPlayer: o,
                playbackEvents: {},
                playbackSent: void 0,
                playbackTracking: {
                    trackingSegment: void 0,
                    playedSeconds: 0,
                    viewablePlayedSeconds: 0,
                    audiblePlayedSeconds: 0,
                    playedSecondsTotal: 0,
                    previousTime: null,
                    segmentReceived: !1,
                    segmentsEncrypted: !1,
                    playItemCount: 0,
                    playSessionSequence: 0,
                    prevPlaybackRate: v,
                    retTimeWatched: 0,
                    normalizedTime: -1,
                    elapsedSeconds: 0,
                    viewableElapsedSeconds: 0,
                    audibleElapsedSeconds: 0,
                    currentPosition: 0,
                    thresholdCrossed: 0,
                    sendSetTimeEvents: r.setTimeEvents || !1
                },
                bufferedPings: [],
                seekTracking: {
                    numTrackedSeeks: 0,
                    videoStartDragTime: 0,
                    dragStartTime: 0,
                    seekDebounceTimeout: null,
                    lastTargetTime: 0
                },
                previousBufferTimes: {},
                lastEvent: "",
                lastBucket: "",
                eventPreAbandonment: void 0,
                playerState: "idle",
                playerStateDuration: 0,
                playerRemoved: !1,
                pingLimiters: {
                    playlistItem: new Za
                },
                sessionSampled: b
            },
            playlistItemData: {
                ready: void 0,
                item: {},
                drm: "",
                index: 0,
                itemId: S(12),
                mediaId: "",
                playReason: "",
                duration: 0
            },
            related: {
                shownReason: null,
                nextShownReason: null,
                sendHoverPing: null,
                feedId: null,
                feedInstanceId: null,
                feedType: null,
                onClickSetting: -1,
                feedInterface: null,
                idsShown: [],
                thumbnailIdsShown: [],
                pinnedCount: -1,
                page: -1,
                autotimerLength: -1,
                pinSetId: -1,
                advanceTarget: null,
                ordinalClicked: -1,
                relatedSetUp: !1
            },
            sharing: {
                shareMethod: null,
                shareReferrer: function(e) {
                    if (!e) return null;
                    var a = e.match(/[?&]jwsource=([^&]+)/);
                    return a ? decodeURIComponent(a[1]) : null
                }(window.location.search)
            },
            ads: {
                adEventData: w({}, B),
                advertisingConfig: i,
                adClient: y,
                adScheduleId: i.adscheduleid,
                adBreakTracking: -1 !== y ? {
                    shouldTrack: !1,
                    adBreakCount: 0
                } : null,
                adPlaybackTracking: {},
                headerBiddingData: {},
                headerBiddingCacheData: {
                    bidder: null,
                    cacheKey: null
                },
                watchedPastSkipPoint: null,
                jwAdErrorCode: null,
                currentQuartile: null
            },
            errors: {
                SAMPLE_RATE: .02,
                NUM_ERRORS_PER_SESSION: 1,
                numberEventsSent: 0
            },
            trackingState: {
                pageLoaded: null,
                queue: [],
                onping: "function" == typeof a.onping ? a.onping : null,
                images: [],
                boundFlushQueue: null,
                gcidURL: u
            },
            temporaryGCID: {
                gcidError: null,
                gcidIsOnFacebook: null,
                gcidIsOnIOS: null,
                gcidIframeShouldBeRequested: null
            }
        }
    }
    var rt = 0;
    (window.jwplayerPluginJsonp || window.jwplayer().registerPlugin)("jwpsrv", "7.0", function(e, a, t) {
        var n = nt(e, a, t);
        ! function(e) {
            va(e), Fa(e), ga(e), Ka(e), Wa(e)
        }(n), ta(n), this.getTrackingPixelURLs = function(r) {
            return function(e, a) {
                if (e && a) {
                    r.ads.headerBiddingCacheData.bidder = e, r.ads.headerBiddingCacheData.cacheKey = a;
                    var t = oa(r, "vci", "clienta", {
                            returnURL: !0
                        }),
                        n = oa(r, "vcae", "clienta", {
                            returnURL: !0
                        });
                    return r.ads.headerBiddingCacheData.bidder = void 0, r.ads.headerBiddingCacheData.cacheKey = void 0, {
                        impression: t,
                        error: n
                    }
                }
            }
        }(n), this.doNotTrackUser = function(e) {
            return e.meta.doNotPingBackIDs
        }.bind(null, n), this.trackExternalAPIUsage = function(e, a) {
            if (!(25 <= rt || .005 < Math.random())) return rt++,
                function(e, a, t) {
                    e.playerData.apiTracking = {
                        methodCalled: a,
                        firstMeaningfulParam: t
                    }, oa(e, J, "jwplayer6"), delete e.playerData.apiTracking
                }(n, e, a)
        }
    })
}();
