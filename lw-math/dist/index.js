var lt = (t, r, e) => {
  if (!r.has(t))
    throw TypeError("Cannot " + e);
};
var p = (t, r, e) => (lt(t, r, "read from private field"), e ? e.call(t) : r.get(t)), J = (t, r, e) => {
  if (r.has(t))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(t) : r.set(t, e);
};
var F = /* @__PURE__ */ ((t) => (t.Term = "t", t.Factor = "f", t))(F || {}), c = /* @__PURE__ */ ((t) => (t.Add = "+", t.Sub = "-", t.Div = "/", t.Mul = "*", t))(c || {}), b = /* @__PURE__ */ ((t) => (t.Root = "~", t.Function = "f()", t.Brackets = "()", t.Number = "n", t.Constant = "c", t.PostfixOperator = "po", t))(b || {});
const o = (t) => t.type === "t", B = (t) => t.type === "f", A = (t) => (r) => B(r) && r.name === t, M = A(
  "~"
  /* Root */
), S = A(
  "()"
  /* Brackets */
), v = A(
  "f()"
  /* Function */
), U = A(
  "c"
  /* Constant */
), w = A(
  "n"
  /* Number */
), P = A(
  "po"
  /* PostfixOperator */
), R = (t) => M(t) || S(t) || v(t), q = (t) => v(t) || S(t), rt = (t) => Object.keys(t), et = () => ({
  type: F.Factor,
  name: b.Root,
  $$expressions: []
}), st = () => ({
  type: F.Factor,
  name: b.Brackets
}), it = (t, r, e) => ({
  type: F.Factor,
  name: b.Function,
  value: t,
  left: e == null ? void 0 : e.arg,
  right: e == null ? void 0 : e.body,
  isClosed: r && !!(e != null && e.arg) && !!(e != null && e.body),
  isArgRequired: r
}), nt = (t) => ({
  type: F.Factor,
  name: b.Constant,
  value: t
}), D = (t, r = !1) => ({
  type: F.Factor,
  name: b.Number,
  value: t,
  isConst: r
}), L = (t, r) => ({
  type: F.Factor,
  name: b.PostfixOperator,
  value: t,
  left: void 0,
  right: r
}), E = (t) => ({
  type: F.Term,
  name: t
}), j = {
  0: /^[()]$/,
  1: /^(\w+)\(([\w.]+)?(,?)\s?([\w.]+)?\)?$/,
  2: /^[.\dE]+$/,
  3: /^[a-zA-Z]+$/,
  4: /^[!%]$/,
  5: /^[-/+*]$/
}, ht = (t, r = rt(j)) => {
  let e = null, s;
  for (let i of r)
    if (e = j[i].exec(t), e) {
      s = i;
      break;
    }
  return [s, e];
}, gt = (t, r) => {
  if (t === "2")
    return D(r[0], r[0].length > 1);
  if (t === "3")
    return nt(r[0]);
  if (t === "5")
    return E(r[0]);
  if (t === "4")
    return L(r[0]);
  if (t === "0" && r[0] === "(")
    return st();
  if (t === "1") {
    const [, e, s, i, n] = r;
    let h = s ? I(s, [
      "2",
      "3"
      /* Constant */
    ]) : void 0, N = n ? I(n, [
      "2",
      "3"
      /* Constant */
    ]) : void 0;
    return it(e, !!i, {
      arg: i ? h : void 0,
      body: i ? N : h
    });
  }
  throw new Error('Unexpected value."');
}, I = (t, r = rt(j)) => {
  const [e, s] = ht(t, r);
  if (!e || !s)
    throw new Error(`Unexpected string ${t}`);
  return gt(e, s);
}, G = {
  [c.Add]: 1,
  [c.Sub]: 1,
  [c.Div]: 2,
  [c.Mul]: 2
}, _ = (t) => o(t) ? G[t.name] : 3, x = (t, r) => t.right && !R(t.right) && !P(t.right) ? x(t.right, t) : [t, r], ut = (t, r, e) => t.right && o(t.right) && G[t.right.name] === r ? [t.right, t] : t.right && o(t.right) ? ut(t.right, r, t) : [t, e], ft = (t, r) => r.name !== c.Sub || r.name === c.Sub && t.name === c.Add, pt = (t) => o(t) && (!t.left && !t.right || !!t.right && o(t.right) && !t.right.left), T = (t, r) => {
  const e = _(r), [s, i] = ut(t, e);
  if (!pt(s)) {
    if (o(s) && s.left && !s.right && i) {
      if (s.name === r.name)
        return;
      if (ft(s, r))
        return r.left = s.left, s.left = void 0, i.right = r, r;
    }
    if (!(!(i ?? s).right && r.name !== c.Sub))
      return e > 1 && _(s) < 2 || o(s) && !s.right ? (r.left = s.right, s.right = r) : (r.left = (i ?? s).right, (i ?? s).right = r), r;
  }
}, K = (t) => t.value.includes("E"), vt = (t) => t.value.includes("."), mt = (t) => !t.value.endsWith("."), dt = (t, r) => {
  if (!(r.value === "E" && (!mt(t) || K(t))) && !(r.value === "." && (vt(t) || K(t)))) {
    if (t.value === "0" && r.value !== "E" && r.value !== ".") {
      t.value = r.value;
      return;
    }
    t.value += r.value;
  }
}, yt = (t, r) => {
  let [e] = x(t);
  if (w(e) && !(r.isConst || e.isConst)) {
    dt(e, r);
    return;
  }
  B(e) && (!R(e) || e.right) && (e = T(t, E(c.Mul)) ?? e), e.right = r;
}, Ft = (t, r) => {
  let [e] = x(t);
  B(e) && (!R(e) || e.right) && (e = T(t, E(c.Mul)) ?? e), e.right = r;
}, xt = (t, r) => {
  let [e, s] = x(t);
  M(e) && !e.right || o(e) && !e.right || (o(e) ? (r.right = e.right, e.right = r) : (r.right = (s ?? e).right, (s ?? e).right = r));
}, Q = (t, r) => {
  let [e] = x(t);
  return B(e) && (e = T(t, E(c.Mul)) ?? e), e.right = r, r;
}, $t = (t, r) => {
  let [e, s] = x(t);
  if (e.right && q(e.right) && e.right.isClosed && !r.left)
    s = e, e = e.right;
  else if (o(e) && !e.right && !r.left)
    return;
  if (!M(e) && s && !r.left)
    return r.left = s.right, s.right = r, r.left && r.right && (r.isClosed = !0), r;
  if (r.left)
    return B(e) && !R(e) && (e = T(t, E(c.Mul)) ?? e), e.right = r, r;
}, z = (t) => {
  const [r, e] = x(t);
  if (r.right && P(r.right)) {
    r.right = r.right.right;
    return;
  }
  if (r.right && v(r.right) && r.right.isArgRequired) {
    if (!r.right.right) {
      r.right = r.right.left;
      return;
    }
    z(r.right);
    return;
  }
  if (r.right && q(r.right)) {
    if (r.right.isClosed) {
      r.right.isClosed = !1;
      return;
    }
    if (!r.right.right) {
      r.right = void 0;
      return;
    }
    z(r.right);
    return;
  }
  if (w(r)) {
    (r.isConst || r.value.length === 1) && e ? e.right = void 0 : r.value = r.value.slice(0, -1);
    return;
  }
  if (U(r) && e) {
    e.right = void 0;
    return;
  }
  if (o(r) && e) {
    e.right = r.left;
    return;
  }
}, at = (t, r) => {
  t.right = typeof r == "string" ? I(r) : typeof r == "number" ? D(String(r), String(r).length > 1) : void 0, t.right && R(t.right) && t.$$expressions.splice(0, t.$$expressions.length, t.right);
}, wt = (t, r) => {
  t.$$expressions[0] && !t.$$expressions[0].right && t.$$expressions.shift(), t.$$expressions[0] && v(t.$$expressions[0]) && t.$$expressions[0].isClosed && (t.$$expressions[0].isClosed = !1), z(t), t.right || at(t, r);
}, O = (t) => t.$$expressions.find(
  (r) => q(r) && !r.isClosed
) ?? t, V = (t, r) => {
  const e = O(t), i = v(e) && e.isArgRequired && e.right && (!o(e.right) || o(e.right) && !!e.right.right), n = r && e.right && w(r) && !r.isConst && w(e.right) && !e.right.isConst;
  i && !n && !(r && v(r) && r.isArgRequired) && (e.isClosed = !0, V(t, r));
}, Et = (t) => {
  let r = O(t);
  const [e] = x(r);
  v(r) && r.isArgRequired && (V(t), r = O(t)), q(r) && r.right && (!o(e) || o(e) && e.right) && (r.isClosed = !0);
}, bt = (t, r) => {
  V(t, r);
  const e = O(t);
  let s;
  o(r) ? T(e, r) : w(r) ? yt(e, r) : U(r) ? Ft(e, r) : P(r) ? xt(e, r) : S(r) ? s = Q(e, r) : v(r) && (r.isArgRequired ? s = $t(e, r) : s = Q(e, r)), s && t.$$expressions.unshift(s);
}, At = (t, r) => {
  var h;
  const e = t.left ? y(t.left, r) : "", s = t.right ? y(t.right, r) : "", i = ((h = r.operators) == null ? void 0 : h[t.name]) || t.name, n = t.left && o(t.left) && _(t.left) > 1 && _(t) < 2;
  return `${e}${e ? " " : ""}${i}${e && !n && s ? " " : ""}${s}`;
}, Mt = (t, r) => {
  const e = t.right ? y(t.right, r) : "";
  return (r.renderBrackets ?? ct.renderBrackets)({
    body: e,
    isClosed: !!t.isClosed
  });
}, Nt = (t, r) => {
  var i, n;
  const e = t.left ? y(t.left, r) : "", s = t.right ? y(t.right, r) : "";
  return (((i = r.renderFunction) == null ? void 0 : i[t.value]) ?? ((n = r.renderFunction) == null ? void 0 : n.default) ?? ct.renderFunction.default)({
    left: e,
    right: s,
    name: t.value,
    isClosed: !!t.isClosed
  });
}, ct = {
  renderBrackets: ({ body: t, isClosed: r }) => `(${t}${r ? ")" : ""}`,
  renderFunction: {
    default: ({ name: t, left: r, right: e, isClosed: s }) => `${t}(${r ? `${r}, ` : ""}${e}${s ? ")" : ""}`
  },
  constants: {},
  operators: {}
}, y = (t, r = {}) => {
  var e;
  return M(t) && t.right ? y(t.right, r) : o(t) ? At(t, r) : S(t) ? Mt(t, r) : v(t) ? Nt(t, r) : w(t) ? t.value : U(t) ? ((e = r.constants) == null ? void 0 : e[t.value]) ?? t.value : P(t) ? `${t.right ? y(t.right, r) : ""}${t.value}` : "";
}, X = (t) => t * Math.PI / 180, Y = (t) => t * 180 / Math.PI, kt = (t, r) => t + r, Ct = (t, r) => t - r, Bt = (t, r) => t / r, St = (t, r) => t * r, Pt = Math.pow, Rt = (t, r) => Math.abs(t) ** (1 / r) * (t < 0 ? -1 : 1), Tt = (t, r) => d(Math.sin(r === "deg" ? X(t) : t), 11), It = (t, r) => d(Math.cos(r === "deg" ? X(t) : t), 11), _t = (t, r) => {
  const e = Math.tan(r === "deg" ? X(t) : t);
  return e > Number.MAX_SAFE_INTEGER ? Number.POSITIVE_INFINITY : e;
}, Ot = (t, r) => {
  if (t > 1 || t < -1)
    throw new Error("Argument of arcsin expected value in range = -1 <= a <= 1");
  const e = Math.asin(t);
  return r === "deg" ? Y(e) : e;
}, Ut = (t, r) => {
  if (t > 1 || t < -1)
    throw new Error("Argument of acos expected value in range = -1 <= a <= 1");
  const e = Math.acos(t);
  return r === "deg" ? Y(e) : e;
}, qt = (t, r) => {
  const e = Math.atan(t);
  return r === "deg" ? Y(e) : e;
}, Dt = (t) => Math.sqrt(t), Wt = (t) => Math.log(t), Lt = (t) => Math.log10(t), d = (t, r = 0) => Number.parseFloat(t.toFixed(r)), ot = (t) => {
  let r = t;
  const e = 7, s = [
    0.9999999999998099,
    676.5203681218851,
    -1259.1392167224028,
    771.3234287776531,
    -176.6150291621406,
    12.507343278686905,
    -0.13857109526572012,
    9984369578019572e-21,
    15056327351493116e-23
  ];
  if (r < 0.5)
    return Math.PI / Math.sin(r * Math.PI) / ot(1 - r);
  r--;
  let i = s[0];
  for (let h = 1; h < e + 2; h++)
    i += s[h] / (r + h);
  const n = r + e + 0.5;
  return Math.sqrt(2 * Math.PI) * n ** (r + 0.5) * Math.exp(-n) * i;
}, jt = (t) => {
  if (t % 1 !== 0)
    return ot(t + 1);
  if (t === 0)
    return 1;
  let e = t;
  for (let s = Math.abs(t); --s; )
    e *= s;
  return e;
}, zt = (t) => {
  let [r, e] = t.value.split("E");
  return r === "." && (r = `${r}0`), parseFloat(r || "1") * (e ? 10 ** Number(e) : 1);
}, Z = {
  isDegree: !1,
  defineFunctions: {
    sin: (t, r, { options: e }) => d(Tt(r, e.isDegree ? "deg" : "rad"), 11),
    cos: (t, r, { options: e }) => d(It(r, e.isDegree ? "deg" : "rad"), 11),
    tan: (t, r, { options: e }) => d(_t(r, e.isDegree ? "deg" : "rad"), 11),
    arcsin: (t, r, { options: e }) => d(Ot(r, e.isDegree ? "deg" : "rad"), 11),
    arccos: (t, r, { options: e }) => d(Ut(r, e.isDegree ? "deg" : "rad"), 11),
    arctan: (t, r, { options: e }) => d(qt(r, e.isDegree ? "deg" : "rad"), 11),
    ln: (t, r) => Wt(r),
    log: (t, r) => Lt(r),
    sqrt: (t, r) => Dt(r),
    pow: (t, r) => {
      if (typeof t != "number")
        throw new Error("unknown argument");
      return Pt(t, r);
    },
    root: (t, r) => {
      if (typeof t != "number")
        throw new Error("Unknown argument");
      return Rt(t, r);
    }
  },
  postfixOperators: {
    "!": (t, r) => jt(r),
    "%": (t, r, { parent: e, options: s }) => e && o(e) && e.left && [c.Sub, c.Add].includes(e.name) ? m(e.left, s) / 100 * r : r / 100
  },
  defineConst: {
    Pi: Math.PI,
    e: Math.E
  }
}, Gt = (t, r) => {
  if (!t.left && t.name !== c.Sub || !t.right)
    throw new Error(`Operator "${t.name}" cannot be evaluated`);
  const e = t.left ? m(t.left, r, t) : 0, s = m(t.right, r, t);
  return {
    [c.Add]: kt,
    [c.Sub]: Ct,
    [c.Mul]: St,
    [c.Div]: Bt
  }[t.name](e, s);
}, Vt = (t, r, e) => {
  var h;
  if (!t.right || t.isArgRequired && !t.left)
    throw new Error(`Function ${t.value} missed an argument.`);
  const s = ((h = r.defineFunctions) == null ? void 0 : h[t.value]) ?? Z.defineFunctions[t.value];
  if (!s)
    throw new Error(`Unknown function "${t.value}"`);
  const i = t.left && m(t.left, r, t), n = t.right && m(t.right, r, t);
  return s(i, n, { node: t, parent: e, options: r });
}, Xt = (t, r, e) => {
  var n;
  const s = ((n = r.postfixOperators) == null ? void 0 : n[t.value]) ?? Z.postfixOperators[t.value];
  if (!s || !t.right)
    throw new Error(`Unknown operator "${t.value}" or operand is undefined.`);
  const i = m(t.right, r, t);
  return s(void 0, i, { node: t, parent: e, options: r });
}, m = (t, r = {}, e) => {
  var s;
  if (o(t))
    return Gt(t, r);
  if (w(t))
    return zt(t);
  if (U(t))
    return ((s = r.defineConst) == null ? void 0 : s[t.value]) ?? Z.defineConst[t.value];
  if (v(t))
    return Vt(t, r, e);
  if (P(t))
    return Xt(t, r, e);
  if (S(t)) {
    if (!t.right)
      throw new Error("Empty bracket.");
    return m(t.right, r, t);
  }
  return M(t) ? t.right ? m(t.right, r, t) : 0 : Number.NaN;
};
var f;
class Yt {
  constructor(r) {
    J(this, f, et());
    this.defaultValue = r, this.setValue(r);
  }
  get root() {
    return p(this, f);
  }
  setValue(r) {
    r && typeof r == "object" && M(r) ? (p(this, f).right = r.right, p(this, f).$$expressions = r.$$expressions) : at(p(this, f), r);
  }
  push(r) {
    if (typeof r == "number") {
      this.pushNode(D(String(r), String(r).length > 1));
      return;
    }
    if (r === ")") {
      this.closeBracket();
      return;
    }
    this.pushNode(typeof r == "string" ? I(r) : r);
  }
  pushNode(r) {
    bt(p(this, f), r);
  }
  pop() {
    wt(p(this, f), this.defaultValue);
  }
  closeBracket() {
    Et(p(this, f));
  }
  render(r) {
    return y(p(this, f), r);
  }
  evaluate(r) {
    return m(p(this, f), r);
  }
}
f = new WeakMap();
const nr = (t) => new Yt(t), Zt = /^[\d.E]+/, Ht = /^\w+/, Jt = /^\w+\(/, Kt = /^[-/*+]/, Qt = /^!/, tr = /^\s*/, rr = /^\(|^\)/, er = /^,/, tt = [
  [0, Zt],
  [6, er],
  [5, rr],
  [2, Jt],
  [1, Ht],
  [4, Qt],
  [3, Kt]
], sr = function* (t) {
  var s, i, n;
  let r = 0, e = !1;
  for (; r < t.length; ) {
    r += ((s = t.slice(r).match(tr)) == null ? void 0 : s[0].length) ?? 0;
    const h = t.slice(r);
    for (let [N, u] of tt) {
      const l = (i = h.match(u)) == null ? void 0 : i[0];
      if (l) {
        e && (r -= l.length), e = yield { type: N, value: l }, r += l.length;
        break;
      }
      if (N === ((n = tt.at(-1)) == null ? void 0 : n[0]))
        throw new Error("Unexpected token");
    }
  }
}, ur = (t) => {
  const r = sr(t), e = [], s = () => {
    var l, k, C, $;
    const u = r.next().value;
    if (!u)
      throw new Error("Invalid input");
    if (u.type === 0)
      return D(u.value);
    if (u.type === 1)
      return nt(u.value);
    if (u.value === "(") {
      const a = st();
      e.unshift(a);
      const g = n(0);
      if (((l = r.next()) == null ? void 0 : l.value.value) !== ")" || Array.isArray(g))
        throw new Error('Expected ")"');
      return a.right = g, a.isClosed = !0, a;
    }
    if (u.type === 2) {
      const a = it(u.value.slice(0, -1));
      e.unshift(a);
      const g = n(0);
      if (((k = r.next()) == null ? void 0 : k.value.value) !== ")")
        throw new Error('Expected ")"');
      return Array.isArray(g) ? (a.isArgRequired = !0, a.left = g[0], a.right = g[1]) : (a.isArgRequired = !1, a.right = g), a.isClosed = !0, a;
    }
    if (u.type === 3) {
      let a = s();
      for (; (($ = (C = r.next(!0)) == null ? void 0 : C.value) == null ? void 0 : $.type) === 4; )
        a = L(r.next().value.value, a);
      const g = E(u.value);
      return g.right = a, g;
    }
    throw new Error("unknown token");
  }, i = (u) => u.type === 3 ? G[u.value] ?? 3 : u.type === 6 ? 0.5 : 0, n = (u = 0) => {
    var k, C;
    let l = s();
    for (; ((C = (k = r.next(!0)) == null ? void 0 : k.value) == null ? void 0 : C.type) === 4; )
      l = L(r.next().value.value, l);
    for (; ; ) {
      const $ = r.next(!0).value;
      if (!$)
        return l;
      const a = i($);
      if (a <= u)
        return l;
      if ($.type === 6) {
        r.next();
        const H = n();
        if (Array.isArray(H))
          throw new Error("Unexpected comma");
        return [l, H];
      }
      r.next();
      const g = n(a);
      if (Array.isArray(g))
        throw new Error("Unexpected comma");
      const W = E($.value);
      W.left = l, W.right = g, l = W;
    }
  };
  return ((u) => {
    const l = et();
    return l.right = u, l.$$expressions = e, l;
  })((() => {
    const u = n(0);
    if (Array.isArray(u))
      throw new Error("Unexpected comma");
    return u;
  })());
}, ar = {
  renderBrackets: ({ body: t }) => `(${t})`,
  renderFunction: {
    default: ({ name: t, left: r, right: e }) => `${t}(${r ? `${r}, ` : ""}${e})`
  },
  constants: {},
  operators: {}
};
export {
  Yt as Expression,
  nr as createExpression,
  ur as parseExpression,
  ar as renderOptionsForParser
};
