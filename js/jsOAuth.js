var exports = exports || this;
exports.OAuth = function (a) {
    function b(a) {
        var b = arguments,
            c = b.callee,
            d = b.length,
            e, f = this;
        if (this instanceof c) {
            for (e in a) a.hasOwnProperty(e) && (f[e] = a[e]);
            return f
        }
        return new c(a)
    }
    function c() {}
    function d(a) {
        var b = arguments,
            c = b.callee,
            d, f, g, h, i, j, k, l = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/,
            m = this;
        if (!(this instanceof c)) return new c(a);
        m.scheme = "", m.host = "", m.port = "", m.path = "", m.query = new e, m.anchor = "";
        if (a !== null) {
            d = a.match(l), f = d[1], g = d[2], h = d[3], i = d[4], j = d[5], k = d[6], f = f !== undefined ? f.replace("://", "").toLowerCase() : "http", h = h ? h.replace(":", "") : f === "https" ? "443" : "80", f = f == "http" && h === "443" ? "https" : f, j = j ? j.replace("?", "") : "", k = k ? k.replace("#", "") : "";
            if (f === "https" && h !== "443" || f === "http" && h !== "80") g = g + ":" + h;
            m.scheme = f, m.host = g, m.port = h, m.path = i || "/", m.query.setQueryParams(j), m.anchor = k || ""
        }
    }
    function e(a) {
        var b = arguments,
            c = b.callee,
            d = b.length,
            e, f = this;
        if (this instanceof c) {
            if (a != undefined) for (e in a) a.hasOwnProperty(e) && (f[e] = a[e]);
            return f
        }
        return new c(a)
    }
    function g(a) {
        return this instanceof g ? this.init(a) : new g(a)
    }
    function h(a) {
        var b = [],
            c, d;
        for (c in a) a[c] && a[c] !== undefined && a[c] !== "" && (c === "realm" ? d = c + '="' + a[c] + '"' : b.push(c + '="' + g.urlEncode(a[c] + "") + '"'));
        return b.sort(), d && b.unshift(d), b.join(", ")
    }
    function i(a, b, c, d) {
        var e = [],
            f, h = g.urlEncode;
        for (f in c) c[f] !== undefined && c[f] !== "" && e.push([g.urlEncode(f), g.urlEncode(c[f] + "")]);
        for (f in d) d[f] !== undefined && d[f] !== "" && (c[f] || e.push([h(f), h(d[f] + "")]));
        return e = e.sort(function (a, b) {
            return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0
        }).map(function (a) {
            return a.join("=")
        }), [a, h(b), h(e.join("&"))].join("&")
    }
    function j() {
        return parseInt(+(new Date) / 1e3, 10)
    }
    function k(a) {
        function b() {
            return Math.floor(Math.random() * h.length)
        }
        a = a || 64;
        var c = a / 8,
            d = "",
            e = c / 4,
            f = c % 4,
            g, h = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C", "4D", "4E", "4F", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D", "5E", "5F", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D", "6E", "6F", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E"];
        for (g = 0; g < e; g++) d += h[b()] + h[b()] + h[b()] + h[b()];
        for (g = 0; g < f; g++) d += h[b()];
        return d
    }
    function l() {
        var b;
        return typeof a.Titanium != "undefined" && typeof a.Titanium.Network.createHTTPClient != "undefined" ? b = a.Titanium.Network.createHTTPClient() : typeof require != "undefined" ? b = (new require("xhr")).XMLHttpRequest() : b = new a.XMLHttpRequest, b
    }
    function m(a) {
        var b = new Array(++a);
        return b.join(0).split("")
    }
    function n(a) {
        var b = [],
            c, d;
        for (d = 0; d < a.length; d++) c = a.charCodeAt(d), c < 128 ? b.push(c) : c < 2048 ? b.push(192 + (c >> 6), 128 + (c & 63)) : c < 65536 ? b.push(224 + (c >> 12), 128 + (c >> 6 & 63), 128 + (c & 63)) : c < 2097152 && b.push(240 + (c >> 18), 128 + (c >> 12 & 63), 128 + (c >> 6 & 63), 128 + (c & 63));
        return b
    }
    function o(a) {
        var b = [],
            c;
        for (c = 0; c < a.length * 32; c += 8) b.push(a[c >>> 5] >>> 24 - c % 32 & 255);
        return b
    }
    function p(a) {
        var b = [],
            c = a.length,
            d;
        for (d = 0; d < c; d++) b.push((a[d] >>> 4).toString(16)), b.push((a[d] & 15).toString(16));
        return b.join("")
    }
    function q(a) {
        var b = "",
            c = a.length,
            d;
        for (d = 0; d < c; d++) b += String.fromCharCode(a[d]);
        return b
    }
    function r(a, b) {
        return a << b | a >>> 32 - b
    }
    function s(a) {
        if (a !== undefined) {
            var b = a,
                c, d;
            return b.constructor === String && (b = n(b)), this instanceof s ? c = this : c = new s(a), d = c.hash(b), p(d)
        }
        return this instanceof s ? this : new s
    }
    function t(a, b, c, d) {
        var e = n(b),
            f = n(c),
            g = e.length,
            h, i, j, k;
        g > a.blocksize && (e = a.hash(e), g = e.length), e = e.concat(m(a.blocksize - g)), i = e.slice(0), j = e.slice(0);
        for (k = 0; k < a.blocksize; k++) i[k] ^= 92, j[k] ^= 54;
        return h = a.hash(i.concat(a.hash(j.concat(f)))), d ? p(h) : q(h)
    }
    c.prototype = {
        join: function (a) {
            return a = a || "", this.values().join(a)
        },
        keys: function () {
            var a, b = [],
                c = this;
            for (a in c) c.hasOwnProperty(a) && b.push(a);
            return b
        },
        values: function () {
            var a, b = [],
                c = this;
            for (a in c) c.hasOwnProperty(a) && b.push(c[a]);
            return b
        },
        shift: function () {
            throw "not implimented"
        },
        unshift: function () {
            throw "not implimented"
        },
        push: function () {
            throw "not implimented"
        },
        pop: function () {
            throw "not implimented"
        },
        sort: function () {
            throw "not implimented"
        },
        ksort: function (a) {
            var b = this,
                c = b.keys(),
                d, e, f;
            a == undefined ? c.sort() : c.sort(a);
            for (d = 0; d < c.length; d++) f = c[d], e = b[f], delete b[f], b[f] = e;
            return b
        },
        toObject: function () {
            var a = {},
                b, c = this;
            for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
            return a
        }
    }, b.prototype = new c, d.prototype = {
        scheme: "",
        host: "",
        port: "",
        path: "",
        query: "",
        anchor: "",
        toString: function () {
            var a = this,
                b = a.query + "";
            return a.scheme + "://" + a.host + a.path + (b != "" ? "?" + b : "") + (a.anchor !== "" ? "#" + a.anchor : "")
        }
    }, e.prototype = new b, e.prototype.toString = function () {
        var a, b = this,
            c = [],
            d = "",
            e = "",
            f = g.urlEncode;
        b.ksort();
        for (a in b) b.hasOwnProperty(a) && a != undefined && b[a] != undefined && (e = f(a) + "=" + f(b[a]), c.push(e));
        return c.length > 0 && (d = c.join("&")), d
    }, e.prototype.setQueryParams = function (a) {
        var b = arguments,
            c = b.length,
            d, e, f, g = this,
            h;
        if (c == 1) {
            if (typeof a == "object") for (d in a) a.hasOwnProperty(d) && (g[d] = a[d]);
            else if (typeof a == "string") {
                e = a.split("&");
                for (d = 0, f = e.length; d < f; d++) h = e[d].split("="), g[h[0]] = h[1]
            }
        } else for (d = 0; d < arg_length; d += 2) g[b[d]] = b[d + 1]
    };
    var f = "1.0";
    return g.prototype = {
        realm: "",
        requestTokenUrl: "",
        authorizationUrl: "",
        accessTokenUrl: "",
        init: function (a) {
            var b = "",
                c = {
                    enablePrivilege: a.enablePrivilege || !1,
                    callbackUrl: a.callbackUrl || "oob",
                    consumerKey: a.consumerKey,
                    consumerSecret: a.consumerSecret,
                    accessTokenKey: a.accessTokenKey || b,
                    accessTokenSecret: a.accessTokenSecret || b,
                    verifier: b,
                    signatureMethod: a.signatureMethod || "HMAC-SHA1"
                };
            return this.realm = a.realm || b, this.requestTokenUrl = a.requestTokenUrl || b, this.authorizationUrl = a.authorizationUrl || b, this.accessTokenUrl = a.accessTokenUrl || b, this.getAccessToken = function () {
                return [c.accessTokenKey, c.accessTokenSecret]
            }, this.getAccessTokenKey = function () {
                return c.accessTokenKey
            }, this.getAccessTokenSecret = function () {
                return c.accessTokenSecret
            }, this.setAccessToken = function (a, b) {
                b && (a = [a, b]), c.accessTokenKey = a[0], c.accessTokenSecret = a[1]
            }, this.getVerifier = function () {
                return c.verifier
            }, this.setVerifier = function (a) {
                c.verifier = a
            }, this.setCallbackUrl = function (a) {
                c.callbackUrl = a
            }, this.request = function (a) {
                var b, e, m, n, o, p, q, r, s, t, u, v, w = [],
                    x, y = {},
                    z, A;
                b = a.method || "GET", e = d(a.url), m = a.data || {}, n = a.headers || {}, o = a.success ||
                function () {}, p = a.failure ||
                function () {}, A = function () {
                    var a = !1;
                    for (var b in m) typeof m[b].fileName != "undefined" && (a = !0);
                    return a
                }(), x = a.appendQueryString ? a.appendQueryString : !1, c.enablePrivilege && netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite"), q = l(), q.onreadystatechange = function () {
                    if (q.readyState === 4) {
                        var a = /^(.*?):\s*(.*?)\r?$/mg,
                            b = n,
                            c = {},
                            d = "",
                            e;
                        if (!q.getAllResponseHeaders) {
                            if ( !! q.getResponseHeaders) {
                                d = q.getResponseHeaders();
                                for (var f = 0, g = d.length; f < g; ++f) c[d[f][0]] = d[f][1]
                            }
                        } else {
                            d = q.getAllResponseHeaders();
                            while (e = a.exec(d)) c[e[1]] = e[2]
                        }
                        var h = !1;
                        "Content-Type" in c && c["Content-Type"] == "text/xml" && (h = !0);
                        var i = {
                            text: q.responseText,
                            xml: h ? q.responseXML : "",
                            requestHeaders: b,
                            responseHeaders: c
                        };
                        q.status >= 200 && q.status <= 226 || q.status == 304 || q.status === 0 ? o(i) : q.status >= 400 && q.status !== 0 && p(i)
                    }
                }, s = {
                    oauth_callback: c.callbackUrl,
                    oauth_consumer_key: c.consumerKey,
                    oauth_token: c.accessTokenKey,
                    oauth_signature_method: c.signatureMethod,
                    oauth_timestamp: j(),
                    oauth_nonce: k(),
                    oauth_verifier: c.verifier,
                    oauth_version: f
                }, t = c.signatureMethod;
                if ((!("Content-Type" in n) || n["Content-Type"] == "application/x-www-form-urlencoded") && !A) {
                    z = e.query.toObject();
                    for (r in z) y[r] = z[r];
                    for (r in m) y[r] = m[r]
                }
                urlString = e.scheme + "://" + e.host + e.path, u = i(b, urlString, s, y), v = g.signatureMethod[t](c.consumerSecret, c.accessTokenSecret, u), s.oauth_signature = v, this.realm && (s.realm = this.realm);
                if (x || b == "GET") e.query.setQueryParams(m), w = null;
                else if (!A) if (typeof m == "string") w = m, "Content-Type" in n || (n["Content-Type"] = "text/plain");
                else {
                    for (r in m) w.push(g.urlEncode(r) + "=" + g.urlEncode(m[r] + ""));
                    w = w.sort().join("&"), "Content-Type" in n || (n["Content-Type"] = "application/x-www-form-urlencoded")
                } else if (A) {
                    w = new FormData;
                    for (r in m) w.append(r, m[r])
                }
                q.open(b, e + "", !0), q.setRequestHeader("Authorization", "OAuth " + h(s)), q.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                for (r in n) q.setRequestHeader(r, n[r]);
                q.send(w)
            }, this
        },
        get: function (a, b, c) {
            this.request({
                url: a,
                success: b,
                failure: c
            })
        },
        post: function (a, b, c, d) {
            this.request({
                method: "POST",
                url: a,
                data: b,
                success: c,
                failure: d
            })
        },
        getJSON: function (a, b, c) {
            this.get(a, function (a) {
                b(JSON.parse(a.text))
            }, c)
        },
        postJSON: function (a, b, c, d) {
            this.request({
                method: "POST",
                url: a,
                data: JSON.stringify(b),
                success: function (a) {
                    c(JSON.parse(a.text))
                },
                failure: d,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        },
        parseTokenRequest: function (a, b) {
            switch (b) {
            case "text/xml":
                var c = a.xml.getElementsByTagName("token"),
                    d = a.xml.getElementsByTagName("secret");
                i[g.urlDecode(c[0])] = g.urlDecode(d[0]);
                break;
            default:
                var e = 0,
                    f = a.text.split("&"),
                    h = f.length,
                    i = {};
                for (; e < h; ++e) {
                    var j = f[e].split("=");
                    i[g.urlDecode(j[0])] = g.urlDecode(j[1])
                }
            }
            return i
        },
        fetchRequestToken: function (a, b) {
            var c = this;
            c.setAccessToken("", "");
            var d = c.authorizationUrl;
            this.get(this.requestTokenUrl, function (b) {
                var e = c.parseTokenRequest(b, b.responseHeaders["Content-Type"] || undefined);
                c.setAccessToken([e.oauth_token, e.oauth_token_secret]), a(d + "?" + b.text)
            }, b)
        },
        fetchAccessToken: function (a, b) {
            var c = this;
            this.get(this.accessTokenUrl, function (b) {
                var d = c.parseTokenRequest(b, b.responseHeaders["Content-Type"] || undefined);
                c.setAccessToken([d.oauth_token, d.oauth_token_secret]), c.setVerifier(""), a(b)
            }, b)
        }
    }, g.signatureMethod = {
        "HMAC-SHA1": function (b, c, d) {
            var e, f, h = g.urlEncode;
            return b = h(b), c = h(c || ""), e = b + "&" + c, f = t(s.prototype, e, d), a.btoa(f)
        }
    }, g.urlEncode = function (a) {
        function b(a) {
            var b = a.toString(16).toUpperCase();
            return b.length < 2 && (b = 0 + b), "%" + b
        }
        if (!a) return "";
        a = a + "";
        var c = /[ \r\n!*"'();:@&=+$,\/?%#\[\]<>{}|`^\\\u0080-\uffff]/,
            d = a.length,
            e, f = a.split(""),
            g;
        for (e = 0; e < d; e++) if (g = f[e].match(c)) g = g[0].charCodeAt(0), g < 128 ? f[e] = b(g) : g < 2048 ? f[e] = b(192 + (g >> 6)) + b(128 + (g & 63)) : g < 65536 ? f[e] = b(224 + (g >> 12)) + b(128 + (g >> 6 & 63)) + b(128 + (g & 63)) : g < 2097152 && (f[e] = b(240 + (g >> 18)) + b(128 + (g >> 12 & 63)) + b(128 + (g >> 6 & 63)) + b(128 + (g & 63)));
        return f.join("")
    }, g.urlDecode = function (a) {
        return a ? a.replace(/%[a-fA-F0-9]{2}/ig, function (a) {
            return String.fromCharCode(parseInt(a.replace("%", ""), 16))
        }) : ""
    }, s.prototype = new s, s.prototype.blocksize = 64, s.prototype.hash = function (a) {
        function A(a, b, c, d) {
            switch (a) {
            case 0:
                return b & c | ~b & d;
            case 1:
            case 3:
                return b ^ c ^ d;
            case 2:
                return b & c | b & d | c & d
            }
            return -1
        }
        var b = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            c = [1518500249, 1859775393, 2400959708, 3395469782],
            d, e, f, g, h, i, j, k, l, p, q, s, t, u, v, w, x, y, z;
        a.constructor === String && (a = n(a.encodeUTF8())), f = a.length, g = Math.ceil((f + 9) / this.blocksize) * this.blocksize - (f + 9), e = Math.floor(f / 4294967296), d = Math.floor(f % 4294967296), h = [e * 8 >> 24 & 255, e * 8 >> 16 & 255, e * 8 >> 8 & 255, e * 8 & 255, d * 8 >> 24 & 255, d * 8 >> 16 & 255, d * 8 >> 8 & 255, d * 8 & 255], a = a.concat([128], m(g), h), i = Math.ceil(a.length / this.blocksize);
        for (j = 0; j < i; j++) {
            k = a.slice(j * this.blocksize, (j + 1) * this.blocksize), l = k.length, p = [];
            for (q = 0; q < l; q++) p[q >>> 2] |= k[q] << 24 - (q - (q >> 2) * 4) * 8;
            s = b[0], t = b[1], u = b[2], v = b[3], w = b[4];
            for (x = 0; x < 80; x++) x >= 16 && (p[x] = r(p[x - 3] ^ p[x - 8] ^ p[x - 14] ^ p[x - 16], 1)), y = Math.floor(x / 20), z = r(s, 5) + A(y, t, u, v) + w + c[y] + p[x], w = v, v = u, u = r(t, 30), t = s, s = z;
            b[0] += s, b[1] += t, b[2] += u, b[3] += v, b[4] += w
        }
        return o(b)
    }, g
}(exports), function (a) {
    var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    a.btoa = a.btoa ||
    function (a) {
        var c = 0,
            d = a.length,
            e, f, g = "";
        for (; c < d; c += 3) e = [a.charCodeAt(c), a.charCodeAt(c + 1), a.charCodeAt(c + 2)], f = [e[0] >> 2, (e[0] & 3) << 4 | e[1] >> 4, (e[1] & 15) << 2 | e[2] >> 6, e[2] & 63], isNaN(e[1]) && (f[2] = 64), isNaN(e[2]) && (f[3] = 64), g += b.charAt(f[0]) + b.charAt(f[1]) + b.charAt(f[2]) + b.charAt(f[3]);
        return g
    }
}(this)