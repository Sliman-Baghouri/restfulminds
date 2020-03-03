! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";

    function m(t) {
        return "string" == typeof t
    }
    var x = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        b = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        M = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        r = /(^[#\.][a-z]|[a-y][a-z])/i,
        D = Math.PI / 180,
        E = Math.sin,
        k = Math.cos,
        Q = Math.abs,
        J = Math.sqrt,
        h = function _isNumber(t) {
            return "number" == typeof t
        },
        s = function _round(t) {
            return ~~(1e5 * t + (t < 0 ? -.5 : .5)) / 1e5
        };

    function reverseSegment(t) {
        var e, n = 0;
        for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
        t.reversed = !t.reversed
    }
    var N = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };

    function convertToPath(t, e) {
        var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _, m, v, w, P, y, x, T, M = t.tagName.toLowerCase(),
            S = .552284749831;
        return "path" !== M && t.getBBox ? (h = function _createPath(t, e) {
            var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
                o = [].slice.call(t.attributes),
                i = o.length;
            for (e = "," + e + ","; - 1 < --i;) n = o[i].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, o[i].nodeValue);
            return r
        }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), T = function _attrToObj(t, e) {
            for (var n = e ? e.split(",") : [], r = {}, o = n.length; - 1 < --o;) r[n[o]] = +t.getAttribute(n[o]) || 0;
            return r
        }(t, N[M]), "rect" === M ? (i = T.rx, a = T.ry, r = T.x, o = T.y, c = T.width - 2 * i, p = T.height - 2 * a, n = i || a ? "M" + (m = (d = (u = r + i) + c) + i) + "," + (w = o + a) + " V" + (P = w + p) + " C" + [m, y = P + a * S, _ = d + i * S, x = P + a, d, x, d - (d - u) / 3, x, u + (d - u) / 3, x, u, x, f = r + i * (1 - S), x, r, y, r, P, r, P - (P - w) / 3, r, w + (P - w) / 3, r, w, r, v = o + a * (1 - S), f, o, u, o, u + (d - u) / 3, o, d - (d - u) / 3, o, d, o, _, o, m, v, m, w].join(",") + "z" : "M" + (r + c) + "," + o + " v" + p + " h" + -c + " v" + -p + " h" + c + "z") : "circle" === M || "ellipse" === M ? (l = "circle" === M ? (i = a = T.r) * S : (i = T.rx, (a = T.ry) * S), n = "M" + ((r = T.cx) + i) + "," + (o = T.cy) + " C" + [r + i, o + l, r + (s = i * S), o + a, r, o + a, r - s, o + a, r - i, o + l, r - i, o, r - i, o - l, r - s, o - a, r, o - a, r + s, o - a, r + i, o - l, r + i, o].join(",") + "z") : "line" === M ? n = "M" + T.x1 + "," + T.y1 + " L" + T.x2 + "," + T.y2 : "polyline" !== M && "polygon" !== M || (n = "M" + (r = (g = (t.getAttribute("points") + "").match(b) || []).shift()) + "," + (o = g.shift()) + " L" + g.join(","), "polygon" === M && (n += "," + r + "," + o + "z")), h.setAttribute("d", rawPathToString(h._gsRawPath = stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(h, t), t.parentNode.removeChild(t)), h) : t
    }

    function arcToSegment(t, e, n, r, o, i, a, h, s) {
        if (t !== h || e !== s) {
            n = Q(n), r = Q(r);
            var l = o % 360 * D,
                g = k(l),
                c = E(l),
                p = Math.PI,
                f = 2 * p,
                u = (t - h) / 2,
                d = (e - s) / 2,
                _ = g * u + c * d,
                m = -c * u + g * d,
                v = _ * _,
                w = m * m,
                P = v / (n * n) + w / (r * r);
            1 < P && (n = J(P) * n, r = J(P) * r);
            var y = n * n,
                x = r * r,
                T = (y * x - y * w - x * v) / (y * w + x * v);
            T < 0 && (T = 0);
            var M = (i === a ? -1 : 1) * J(T),
                S = n * m / r * M,
                O = -r * _ / n * M,
                b = g * S - c * O + (t + h) / 2,
                N = c * S + g * O + (e + s) / 2,
                R = (_ - S) / n,
                z = (m - O) / r,
                A = (-_ - S) / n,
                L = (-m - O) / r,
                C = R * R + z * z,
                V = (z < 0 ? -1 : 1) * Math.acos(R / J(C)),
                F = (R * L - z * A < 0 ? -1 : 1) * Math.acos((R * A + z * L) / J(C * (A * A + L * L)));
            isNaN(F) && (F = p), !a && 0 < F ? F -= f : a && F < 0 && (F += f), V %= f, F %= f;
            var X, Y = Math.ceil(Q(F) / (f / 4)),
                I = [],
                j = F / Y,
                G = 4 / 3 * E(j / 2) / (1 + k(j / 2)),
                U = g * n,
                q = c * n,
                H = c * -r,
                B = g * r;
            for (X = 0; X < Y; X++) _ = k(o = V + X * j), m = E(o), R = k(o += j), z = E(o), I.push(_ - G * m, m + G * _, R + G * z, z - G * R, R, z);
            for (X = 0; X < I.length; X += 2) _ = I[X], m = I[X + 1], I[X] = _ * U + m * H + b, I[X + 1] = _ * q + m * B + N;
            return I[X - 2] = h, I[X - 1] = s, I
        }
    }

    function stringToRawPath(t) {
        function vc(t, e, n, r) {
            g = (n - t) / 3, c = (r - e) / 3, h.push(t + g, e + c, n - g, r - c, n, r)
        }
        var e, n, r, o, i, a, h, s, l, g, c, p, f, u = (t + "").replace(M, function(t) {
                var e = +t;
                return e < 1e-4 && -1e-4 < e ? 0 : e
            }).match(x) || [],
            d = [],
            _ = 0,
            m = 0,
            v = u.length,
            w = 0,
            P = "ERROR: malformed path: " + t;
        if (!t || !isNaN(u[0]) || isNaN(u[1])) return console.log(P), d;
        for (e = 0; e < v; e++)
            if (f = i, isNaN(u[e]) ? a = (i = u[e].toUpperCase()) !== u[e] : e--, r = +u[e + 1], o = +u[e + 2], a && (r += _, o += m), e || (s = r, l = o), "M" === i) h && (h.length < 8 ? d.length -= 1 : w += h.length), _ = s = r, m = l = o, h = [r, o], d.push(h), e += 2, i = "L";
            else if ("C" === i) a || (_ = m = 0), (h = h || [0, 0]).push(r, o, _ + 1 * u[e + 3], m + 1 * u[e + 4], _ += 1 * u[e + 5], m += 1 * u[e + 6]), e += 6;
        else if ("S" === i) g = _, c = m, "C" !== f && "S" !== f || (g += _ - h[h.length - 4], c += m - h[h.length - 3]), a || (_ = m = 0), h.push(g, c, r, o, _ += 1 * u[e + 3], m += 1 * u[e + 4]), e += 4;
        else if ("Q" === i) g = _ + 2 / 3 * (r - _), c = m + 2 / 3 * (o - m), a || (_ = m = 0), _ += 1 * u[e + 3], m += 1 * u[e + 4], h.push(g, c, _ + 2 / 3 * (r - _), m + 2 / 3 * (o - m), _, m), e += 4;
        else if ("T" === i) g = _ - h[h.length - 4], c = m - h[h.length - 3], h.push(_ + g, m + c, r + 2 / 3 * (_ + 1.5 * g - r), o + 2 / 3 * (m + 1.5 * c - o), _ = r, m = o), e += 2;
        else if ("H" === i) vc(_, m, _ = r, m), e += 1;
        else if ("V" === i) vc(_, m, _, m = r + (a ? m - _ : 0)), e += 1;
        else if ("L" === i || "Z" === i) "Z" === i && (r = s, o = l, h.closed = !0), ("L" === i || .5 < Q(_ - r) || .5 < Q(m - o)) && (vc(_, m, r, o), "L" === i && (e += 2)), _ = r, m = o;
        else if ("A" === i) {
            if (p = arcToSegment(_, m, +u[e + 1], +u[e + 2], +u[e + 3], +u[e + 4], +u[e + 5], (a ? _ : 0) + 1 * u[e + 6], (a ? m : 0) + 1 * u[e + 7]))
                for (n = 0; n < p.length; n++) h.push(p[n]);
            _ = h[h.length - 2], m = h[h.length - 1], e += 7
        } else console.log(P);
        return (e = h.length) < 6 ? (d.pop(), e = 0) : h[0] === h[e - 2] && h[1] === h[e - 1] && (h.closed = !0), d.totalPoints = w + e, d
    }

    function rawPathToString(t) {
        h(t[0]) && (t = [t]);
        var e, n, r, o, i = "",
            a = t.length;
        for (n = 0; n < a; n++) {
            for (o = t[n], i += "M" + s(o[0]) + "," + s(o[1]) + " C", e = o.length, r = 2; r < e; r++) i += s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r]) + " ";
            o.closed && (i += "z")
        }
        return i
    }
    /*!
     * MorphSVGPlugin 3.0.2
     * https://greensock.com
     *
     * @license Copyright 2008-2019, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    function y() {
        return n || "undefined" != typeof window && (n = window.gsap) && n.registerPlugin && n
    }

    function L(t) {
        return console && console.warn(t)
    }

    function O() {
        return String.fromCharCode.apply(null, arguments)
    }

    function R(t) {
        var e, n = t.length,
            r = 0,
            o = 0;
        for (e = 0; e < n; e++) r += t[e++], o += t[e];
        return [r / (n / 2), o / (n / 2)]
    }

    function S(t) {
        var e, n, r, o = t.length,
            i = t[0],
            a = i,
            h = t[1],
            s = h;
        for (r = 6; r < o; r += 6) i < (e = t[r]) ? i = e : e < a && (a = e), h < (n = t[r + 1]) ? h = n : n < s && (s = n);
        return t.centerX = (i + a) / 2, t.centerY = (h + s) / 2, t.size = (i - a) * (h - s)
    }

    function T(t, e) {
        void 0 === e && (e = 3);
        for (var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _, m, v = t.length, w = t[0][0], P = w, y = t[0][1], x = y, T = 1 / e; - 1 < --v;)
            for (n = (a = t[v]).length, i = 6; i < n; i += 6)
                for (g = a[i], c = a[i + 1], p = a[i + 2] - g, d = a[i + 3] - c, f = a[i + 4] - g, _ = a[i + 5] - c, u = a[i + 6] - g, m = a[i + 7] - c, h = e; - 1 < --h;) w < (r = ((s = T * h) * s * u + 3 * (l = 1 - s) * (s * f + l * p)) * s + g) ? w = r : r < P && (P = r), y < (o = (s * s * m + 3 * l * (s * _ + l * d)) * s + c) ? y = o : o < x && (x = o);
        return t.centerX = (w + P) / 2, t.centerY = (y + x) / 2, t.left = P, t.width = w - P, t.top = x, t.height = y - x, t.size = (w - P) * (y - x)
    }

    function U(t, e) {
        return e.length - t.length
    }

    function V(t, e) {
        var n = t.size || S(t),
            r = e.size || S(e);
        return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n
    }

    function W(t, e) {
        var n, r, o = t.slice(0),
            i = t.length,
            a = i - 2;
        for (e |= 0, n = 0; n < i; n++) r = (n + e) % a, t[n++] = o[r], t[n] = o[1 + r]
    }

    function X(t, e, n, r, o) {
        var i, a, h, s, l = t.length,
            g = 0,
            c = l - 2;
        for (n *= 6, a = 0; a < l; a += 6) s = t[i = (a + n) % c] - (e[a] - r), h = t[1 + i] - (e[a + 1] - o), g += v(h * h + s * s);
        return g
    }

    function Y(t, e, n) {
        var r, o, i, a = t.length,
            h = R(t),
            s = R(e),
            l = s[0] - h[0],
            g = s[1] - h[1],
            c = X(t, e, 0, l, g),
            p = 0;
        for (i = 6; i < a; i += 6)(o = X(t, e, i / 6, l, g)) < c && (c = o, p = i);
        if (n)
            for (reverseSegment(r = t.slice(0)), i = 6; i < a; i += 6)(o = X(r, e, i / 6, l, g)) < c && (c = o, p = -i);
        return p / 6
    }

    function Z(t, e, n) {
        for (var r, o, i, a, h, s, l = t.length, g = 1e20, c = 0, p = 0; - 1 < --l;)
            for (s = (r = t[l]).length, h = 0; h < s; h += 6) o = r[h] - e, i = r[h + 1] - n, (a = v(o * o + i * i)) < g && (g = a, c = r[h], p = r[h + 1]);
        return [c, p]
    }

    function $(t, e, n, r, o, i) {
        var a, h, s, l, g = e.length,
            c = 0,
            p = Math.min(t.size || S(t), e[n].size || S(e[n])) * r,
            f = 1e20,
            u = t.centerX + o,
            d = t.centerY + i;
        for (a = n; a < g && !((e[a].size || S(e[a])) < p); a++) h = e[a].centerX - u, s = e[a].centerY - d, (l = v(h * h + s * s)) < f && (c = a, f = l);
        return l = e[c], e.splice(c, 1), l
    }

    function _(t, e) {
        var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _ = 0,
            m = t.length,
            v = e / ((m - 2) / 6);
        for (u = 2; u < m; u += 6)
            for (_ += v;.999999 < _;) n = t[u - 2], r = t[u - 1], o = t[u], i = t[u + 1], a = t[u + 2], h = t[u + 3], s = t[u + 4], l = t[u + 5], g = n + (o - n) * (d = 1 / ((Math.floor(_) || 1) + 1)), g += ((p = o + (a - o) * d) - g) * d, p += (a + (s - a) * d - p) * d, c = r + (i - r) * d, c += ((f = i + (h - i) * d) - c) * d, f += (h + (l - h) * d - f) * d, t.splice(u, 4, n + (o - n) * d, r + (i - r) * d, g, c, g + (p - g) * d, c + (f - c) * d, p, f, a + (s - a) * d, h + (l - h) * d), u += 6, m += 6, _--;
        return t
    }

    function aa(t, e, n, r, o) {
        var i, a, h, s, l, g, c, p = e.length - t.length,
            f = 0 < p ? e : t,
            u = 0 < p ? t : e,
            d = 0,
            m = "complexity" === r ? U : V,
            v = "position" === r ? 0 : "number" == typeof r ? r : .8,
            w = u.length,
            P = "object" == typeof n && n.push ? n.slice(0) : [n],
            y = "reverse" === P[0] || P[0] < 0,
            x = "log" === n;
        if (u[0]) {
            if (1 < f.length && (t.sort(m), e.sort(m), f.size || T(f), u.size || T(u), g = f.centerX - u.centerX, c = f.centerY - u.centerY, m === V))
                for (w = 0; w < u.length; w++) f.splice(w, 0, $(u[w], f, w, v, g, c));
            if (p)
                for (p < 0 && (p = -p), f[0].length > u[0].length && _(u[0], (f[0].length - u[0].length) / 6 | 0), w = u.length; d < p;) f[w].size || S(f[w]), s = (h = Z(u, f[w].centerX, f[w].centerY))[0], l = h[1], u[w++] = [s, l, s, l, s, l, s, l], u.totalPoints += 8, d++;
            for (w = 0; w < t.length; w++) i = e[w], a = t[w], (p = i.length - a.length) < 0 ? _(i, -p / 6 | 0) : 0 < p && _(a, p / 6 | 0), y && !1 !== o && !a.reversed && reverseSegment(a), (n = P[w] || 0 === P[w] ? P[w] : "auto") && (a.closed || Math.abs(a[0] - a[a.length - 2]) < .5 && Math.abs(a[1] - a[a.length - 1]) < .5 ? "auto" === n || "log" === n ? (P[w] = n = Y(a, i, !w || !1 === o), n < 0 && (y = !0, reverseSegment(a), n = -n), W(a, 6 * n)) : "reverse" !== n && (w && n < 0 && reverseSegment(a), W(a, 6 * (n < 0 ? -n : n))) : !y && ("auto" === n && Math.abs(i[0] - a[0]) + Math.abs(i[1] - a[1]) + Math.abs(i[i.length - 2] - a[a.length - 2]) + Math.abs(i[i.length - 1] - a[a.length - 1]) > Math.abs(i[0] - a[a.length - 2]) + Math.abs(i[1] - a[a.length - 1]) + Math.abs(i[i.length - 2] - a[0]) + Math.abs(i[i.length - 1] - a[1]) || n % 2) ? (reverseSegment(a), P[w] = -1, y = !0) : "auto" === n ? P[w] = 0 : "reverse" === n && (P[w] = -1), a.closed !== i.closed && (a.closed = i.closed = !1));
            return x && L("shapeIndex:[" + P.join(",") + "]"), t.shapeIndex = P
        }
    }

    function da(t, e) {
        var n, r, o, i, a, h, s, l = 0,
            g = parseFloat(t[0]),
            c = parseFloat(t[1]),
            p = g + "," + c + " ";
        for (n = .5 * e / (.5 * (o = t.length) - 1), r = 0; r < o - 2; r += 2) {
            if (l += n, h = parseFloat(t[r + 2]), s = parseFloat(t[r + 3]), .999999 < l)
                for (a = 1 / (Math.floor(l) + 1), i = 1;.999999 < l;) p += (g + (h - g) * a * i).toFixed(2) + "," + (c + (s - c) * a * i).toFixed(2) + " ", l--, i++;
            p += h + "," + s + " ", g = h, c = s
        }
        return p
    }

    function ea(t) {
        var e = t[0].match(j) || [],
            n = t[1].match(j) || [],
            r = n.length - e.length;
        0 < r ? t[0] = da(e, r) : t[1] = da(n, -r)
    }

    function fa(e) {
        return isNaN(e) ? ea : function(t) {
            ea(t), t[1] = function _offsetPoints(t, e) {
                if (!e) return t;
                var n, r, o, i = t.match(j) || [],
                    a = i.length,
                    h = "";
                for (n = "reverse" === e ? (r = a - 1, -2) : (r = (2 * (parseInt(e, 10) || 0) + 1 + 100 * a) % a, 2), o = 0; o < a; o += 2) h += i[r - 1] + "," + i[r] + " ", r = (r + n) % a;
                return h
            }(t[1], parseInt(e, 10))
        }
    }

    function ha(t, e) {
        for (var n, r, o, i, a, h, s, l, g, c, p, f, u = t.length, d = .2 * (e || 1); - 1 < --u;) {
            for (p = (r = t[u]).isSmooth = r.isSmooth || [0, 0, 0, 0], f = r.smoothData = r.smoothData || [0, 0, 0, 0], p.length = 4, l = r.length - 2, s = 6; s < l; s += 6) o = r[s] - r[s - 2], i = r[s + 1] - r[s - 1], a = r[s + 2] - r[s], h = r[s + 3] - r[s + 1], g = P(i, o), c = P(h, a), (n = Math.abs(g - c) < d) && (f[s - 2] = g, f[s + 2] = c, f[s - 1] = v(o * o + i * i), f[s + 3] = v(a * a + h * h)), p.push(n, n, 0, 0, n, n);
            r[l] === r[0] && r[1 + l] === r[1] && (o = r[0] - r[l - 2], i = r[1] - r[l - 1], a = r[2] - r[0], h = r[3] - r[1], g = P(i, o), c = P(h, a), Math.abs(g - c) < d && (f[l - 2] = g, f[2] = c, f[l - 1] = v(o * o + i * i), f[3] = v(a * a + h * h), p[l - 2] = p[l - 1] = !0))
        }
        return t
    }

    function ia(t) {
        var e = t.trim().split(" ");
        return {
            x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
            y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100
        }
    }

    function la(t, e, n, r) {
        var o, i, a = this._origin,
            h = this._eOrigin,
            s = t[n] - a.x,
            l = t[n + 1] - a.y,
            g = v(s * s + l * l),
            c = P(l, s);
        return s = e[n] - h.x, l = e[n + 1] - h.y, i = function _shortAngle(t) {
            return t !== t % p ? t + (t < 0 ? f : -f) : t
        }(o = P(l, s) - c), !r && F && Math.abs(i + F.ca) < u && (r = F), this._anchorPT = F = {
            _next: this._anchorPT,
            t: t,
            sa: c,
            ca: r && i * r.ca < 0 && Math.abs(i) > d ? o : i,
            sl: g,
            cl: v(s * s + l * l) - g,
            i: n
        }
    }

    function ma(t) {
        n = y(), o = o || n && n.plugins.morphSVG, n && o ? (C = n.utils.toArray, o.prototype._tweenRotation = la, I = 1) : t && L("Please gsap.registerPlugin(MorphSVGPlugin)")
    }
    var n, C, F, I, o, P = Math.atan2,
        z = Math.cos,
        A = Math.sin,
        v = Math.sqrt,
        p = Math.PI,
        f = 2 * p,
        u = .3 * p,
        d = .7 * p,
        j = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        G = /(^[#\.][a-z]|[a-y][a-z])/gi,
        q = /[achlmqstvz]/gi,
        i = "MorphSVGPlugin",
        a = O(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        H = function(t) {
            for (var e = -1 !== (window ? window.location.href : "").indexOf(O(103, 114, 101, 101, 110, 115, 111, 99, 107)) && -1 !== t.indexOf(O(108, 111, 99, 97, 108, 104, 111, 115, 116)), n = [a, O(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), O(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), O(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), O(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), O(99, 100, 112, 110, 46, 105, 111), O(103, 97, 110, 110, 111, 110, 46, 116, 118), O(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), O(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), O(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), O(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), O(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), O(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), O(112, 108, 110, 107, 114, 46, 99, 111), O(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), O(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), O(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), O(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), O(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), O(99, 111, 100, 105, 101, 114, 46, 105, 111), O(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), O(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)], r = n.length; - 1 < --r;)
                if (-1 !== t.indexOf(n[r])) return !0;
            return e && window && window.console 
        }(window ? window.location.host : ""),
        B = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
        K = {
            version: "3.0.0",
            name: "morphSVG",
            register: function register(t, e) {
                n = t, o = e, ma()
            },
            init: function init(t, e, n, r, o) {
                var i, a, h, s, l, g, c, p, f, u, d, _, m, v, w, P, y, x, M, S, O, b, N = t.nodeType ? window.getComputedStyle(t) : {},
                    R = N.fill + "",
                    z = !("none" === R || "0" === (R.match(j) || [])[3] || "evenodd" === N.fillRule),
                    A = (e.origin || "50 50").split(",");
                if (I || ma(1), l = "POLYLINE" === (i = (t.nodeName + "").toUpperCase()) || "POLYGON" === i, "PATH" !== i && !l && !e.prop) return L("Cannot morph a <" + i + "> element. " + B), !1;
                if (a = "PATH" === i ? "d" : "points", ("string" == typeof e || e.getBBox || e[0]) && (e = {
                        shape: e
                    }), !e.prop && "function" != typeof t.setAttribute) return !1;
                if (s = function _parseShape(t, e, n) {
                        var r, o;
                        return (!("string" == typeof t) || G.test(t) || (t.match(j) || []).length < 3) && ((r = C(t)[0]) ? (o = (r.nodeName + "").toUpperCase(), e && "PATH" !== o && (r = convertToPath(r, !1), o = "PATH"), t = r.getAttribute("PATH" === o ? "d" : "points") || "", r === n && (t = r.getAttributeNS(null, "data-original") || t)) : (L("WARNING: invalid morph to: " + t), t = !1)), t
                    }(e.shape || e.d || e.points || "", "d" == a, t), l && q.test(s)) return L("A <" + i + "> cannot accept path data. " + B), !1;
                if (g = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto", c = e.map || K.defaultMap, this._prop = e.prop, this._render = e.render || K.defaultRender, this._apply = "updateTarget" in e ? e.updateTarget : K.defaultUpdateTarget, this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision), this._tween = n, s) {
                    if (this._target = t, y = "object" == typeof e.precompile, u = this._prop ? t[this._prop] : t.getAttribute(a), this._prop || t.getAttributeNS(null, "data-original") || t.setAttributeNS(null, "data-original", u), "d" == a || this._prop) {
                        if (u = stringToRawPath(y ? e.precompile[0] : u), d = stringToRawPath(y ? e.precompile[1] : s), !y && !aa(u, d, g, c, z)) return !1;
                        for ("log" !== e.precompile && !0 !== e.precompile || L('precompile:["' + rawPathToString(u) + '","' + rawPathToString(d) + '"]'), (O = "linear" !== (e.type || K.defaultType)) && (u = ha(u, e.smoothTolerance), d = ha(d, e.smoothTolerance), u.size || T(u), d.size || T(d), S = ia(A[0]), this._origin = u.origin = {
                                x: u.left + S.x * u.width,
                                y: u.top + S.y * u.height
                            }, A[1] && (S = ia(A[1])), this._eOrigin = {
                                x: d.left + S.x * d.width,
                                y: d.top + S.y * d.height
                            }), this._rawPath = t._gsRawPath = u, m = u.length; - 1 < --m;)
                            for (w = u[m], P = d[m], p = w.isSmooth || [], f = P.isSmooth || [], v = w.length, _ = F = 0; _ < v; _ += 2) P[_] === w[_] && P[_ + 1] === w[_ + 1] || (O ? p[_] && f[_] ? (x = w.smoothData, M = P.smoothData, b = _ + (_ === v - 4 ? 7 - v : 5), this._controlPT = {
                                _next: this._controlPT,
                                i: _,
                                j: m,
                                l1s: x[_ + 1],
                                l1c: M[_ + 1] - x[_ + 1],
                                l2s: x[b],
                                l2c: M[b] - x[b]
                            }, h = this._tweenRotation(w, P, _ + 2), this._tweenRotation(w, P, _, h), this._tweenRotation(w, P, b - 1, h), _ += 4) : this._tweenRotation(w, P, _) : (h = this.add(w, _, w[_], P[_]), h = this.add(w, _ + 1, w[_ + 1], P[_ + 1]) || h))
                    } else h = this.add(t, "setAttribute", t.getAttribute(a) + "", s + "", r, o, 0, fa(g), a);
                    O && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x), h = this.add(this._origin, "y", this._origin.y, this._eOrigin.y)), h && (this._props.push("morphSVG"), h.end = s, h.endProp = a)
                }
                return H
            },
            render: function render(t, e) {
                for (var n, r, o, i, a, h, s, l, g, c, p, f, u = e._rawPath, d = e._controlPT, _ = e._anchorPT, m = e._rnd, v = e._target, w = e._pt; w;) w.r(t, w.d), w = w._next;
                if (1 === t && e._apply)
                    for (w = e._pt; w;) w.end && (e._prop ? v[e._prop] = w.end : v.setAttribute(w.endProp, w.end)), w = w._next;
                else if (u) {
                    for (; _;) a = _.sa + t * _.ca, i = _.sl + t * _.cl, _.t[_.i] = e._origin.x + z(a) * i, _.t[_.i + 1] = e._origin.y + A(a) * i, _ = _._next;
                    for (r = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1; d;) f = (h = d.i) + (h === (o = u[d.j]).length - 4 ? 7 - o.length : 5), a = P(o[f] - o[h + 1], o[f - 1] - o[h]), c = A(a), p = z(a), l = o[h + 2], g = o[h + 3], i = d.l1s + r * d.l1c, o[h] = l - p * i, o[h + 1] = g - c * i, i = d.l2s + r * d.l2c, o[f - 1] = l + p * i, o[f] = g + c * i, d = d._next;
                    if (v._gsRawPath = u, e._apply) {
                        for (n = "", " ", s = 0; s < u.length; s++)
                            for (i = (o = u[s]).length, n += "M" + (o[0] * m | 0) / m + " " + (o[1] * m | 0) / m + " C", h = 2; h < i; h++) n += (o[h] * m | 0) / m + " ";
                        e._prop ? v[e._prop] = n : v.setAttribute("d", n)
                    }
                }
                e._render && u && e._render.call(e._tween, u, v)
            },
            kill: function kill() {
                this._pt = this._rawPath = 0
            },
            getRawPath: function getRawPath(t) {
                var e, n = (t = m(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
                return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? m(t) ? stringToRawPath(t) : h(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string")
            },
            stringToRawPath: stringToRawPath,
            rawPathToString: rawPathToString,
            pathFilter: function _pathFilter(t, e, n, r, o) {
                var i = stringToRawPath(t[0]),
                    a = stringToRawPath(t[1]);
                aa(i, a, e || 0 === e ? e : "auto", n, o) && (t[0] = rawPathToString(i), t[1] = rawPathToString(a), "log" !== r && !0 !== r || L('precompile:["' + t[0] + '","' + t[1] + '"]'))
            },
            pointsFilter: ea,
            getTotalSize: T,
            equalizeSegmentQuantity: aa,
            convertToPath: function convertToPath$1(t, e) {
                return C(t).map(function(t) {
                    return convertToPath(t, !1 !== e)
                })
            },
            defaultType: "linear",
            defaultUpdateTarget: !0,
            defaultMap: "size"
        };
    y() && n.registerPlugin(K), t.MorphSVGPlugin = K, t.default = K, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});