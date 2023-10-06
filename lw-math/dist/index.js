var Z = (t, r, e) => {
  if (!r.has(t))
    throw TypeError("Cannot " + e);
};
var h = (t, r, e) => (Z(t, r, "read from private field"), e ? e.call(t) : r.get(t)), L = (t, r, e) => {
  if (r.has(t))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(t) : r.set(t, e);
};
var $ = /* @__PURE__ */ ((t) => (t.Term = "t", t.Factor = "f", t))($ || {}), n = /* @__PURE__ */ ((t) => (t.Add = "+", t.Sub = "-", t.Div = "/", t.Mul = "*", t))(n || {}), p = /* @__PURE__ */ ((t) => (t.Root = "~", t.Function = "f()", t.Brackets = "()", t.Number = "n", t.Constant = "c", t.PostfixOperator = "po", t))(p || {});
const u = (t) => t.type === "t", M = (t) => t.type === "f", m = (t) => (r) => M(r) && r.name === t, b = m(
  "~"
  /* Root */
), N = m(
  "()"
  /* Brackets */
), g = m(
  "f()"
  /* Function */
), S = m(
  "c"
  /* Constant */
), d = m(
  "n"
  /* Number */
), w = m(
  "po"
  /* PostfixOperator */
), x = (t) => b(t) || N(t) || g(t), k = (t) => g(t) || N(t), U = (t) => Object.keys(t), H = () => ({
  type: $.Factor,
  name: p.Root,
  $$expressions: []
}), J = () => ({
  type: $.Factor,
  name: p.Brackets
}), K = (t, r, e) => ({
  type: $.Factor,
  name: p.Function,
  value: t,
  left: e == null ? void 0 : e.arg,
  right: e == null ? void 0 : e.body,
  isClosed: r && !!(e != null && e.arg) && !!(e != null && e.body),
  isArgRequired: r
}), Q = (t) => ({
  type: $.Factor,
  name: p.Constant,
  value: t
}), I = (t, r = !1) => ({
  type: $.Factor,
  name: p.Number,
  value: t,
  isConst: r
}), tt = (t, r) => ({
  type: $.Factor,
  name: p.PostfixOperator,
  value: t,
  left: void 0,
  right: r
}), y = (t) => ({
  type: $.Term,
  name: t
}), P = {
  0: /^[()]$/,
  1: /^(\w+)\(([\w.]+)?(,?)\s?([\w.]+)?\)?$/,
  2: /^[.\dE]+$/,
  3: /^[a-zA-Z]+$/,
  4: /^[!%]$/,
  5: /^[-/+*]$/
}, rt = (t, r = U(P)) => {
  let e = null, i;
  for (let s of r)
    if (e = P[s].exec(t), e) {
      i = s;
      break;
    }
  return [i, e];
}, et = (t, r) => {
  if (t === "2")
    return I(r[0], r[0].length > 1);
  if (t === "3")
    return Q(r[0]);
  if (t === "5")
    return y(r[0]);
  if (t === "4")
    return tt(r[0]);
  if (t === "0" && r[0] === "(")
    return J();
  if (t === "1") {
    const [, e, i, s, c] = r;
    let a = i ? A(i, [
      "2",
      "3"
      /* Constant */
    ]) : void 0, Y = c ? A(c, [
      "2",
      "3"
      /* Constant */
    ]) : void 0;
    return K(e, !!s, {
      arg: s ? a : void 0,
      body: s ? Y : a
    });
  }
  throw new Error('Unexpected value."');
}, A = (t, r = U(P)) => {
  const [e, i] = rt(t, r);
  if (!e || !i)
    throw new Error(`Unexpected string ${t}`);
  return et(e, i);
}, j = {
  [n.Add]: 1,
  [n.Sub]: 1,
  [n.Div]: 2,
  [n.Mul]: 2
}, B = (t) => u(t) ? j[t.name] : 3, v = (t, r) => t.right && !x(t.right) && !w(t.right) ? v(t.right, t) : [t, r], z = (t, r, e) => t.right && u(t.right) && j[t.right.name] === r ? [t.right, t] : t.right && u(t.right) ? z(t.right, r, t) : [t, e], it = (t, r) => r.name !== n.Sub || r.name === n.Sub && t.name === n.Add, E = (t, r) => {
  const e = B(r), [i, s] = z(t, e);
  if (!(u(i) && !i.left && !i.right)) {
    if (u(i) && i.left && !i.right && s) {
      if (i.name === r.name)
        return;
      if (it(i, r))
        return r.left = i.left, i.left = void 0, s.right = r, r;
    }
    if (!(!(s ?? i).right && r.name !== n.Sub))
      return e > 1 && B(i) < 2 || u(i) && !i.right ? (r.left = i.right, i.right = r) : (r.left = (s ?? i).right, (s ?? i).right = r), r;
  }
}, O = (t) => t.value.includes("E"), st = (t) => t.value.includes("."), nt = (t) => !t.value.endsWith("."), ut = (t, r) => {
  if (!(r.value === "E" && (!nt(t) || O(t))) && !(r.value === "." && (st(t) || O(t)))) {
    if (t.value === "0" && r.value !== "E" && r.value !== ".") {
      t.value = r.value;
      return;
    }
    t.value += r.value;
  }
}, ct = (t, r) => {
  let [e] = v(t);
  if (d(e) && !(r.isConst || e.isConst)) {
    ut(e, r);
    return;
  }
  M(e) && (!x(e) || e.right) && (e = E(t, y(n.Mul)) ?? e), e.right = r;
}, at = (t, r) => {
  let [e] = v(t);
  M(e) && (!x(e) || e.right) && (e = E(t, y(n.Mul)) ?? e), e.right = r;
}, lt = (t, r) => {
  let [e, i] = v(t);
  b(e) && !e.right || u(e) && !e.right || (u(e) ? (r.right = e.right, e.right = r) : (r.right = (i ?? e).right, (i ?? e).right = r));
}, W = (t, r) => {
  let [e] = v(t);
  return M(e) && (e = E(t, y(n.Mul)) ?? e), e.right = r, r;
}, ht = (t, r) => {
  let [e, i] = v(t);
  if (u(e) && e.right && k(e.right) && !r.left)
    i = e, e = e.right;
  else if (u(e) && !e.right && !r.left)
    return;
  if (!b(e) && i && !r.left)
    return r.left = i.right, i.right = r, r.left && r.right && (r.isClosed = !0), r;
  if (r.left)
    return M(e) && !x(e) && (e = E(t, y(n.Mul)) ?? e), e.right = r, r;
}, _ = (t) => {
  const [r, e] = v(t);
  if (r.right && w(r.right)) {
    r.right = r.right.right;
    return;
  }
  if (r.right && g(r.right) && r.right.isArgRequired) {
    if (!r.right.right) {
      r.right = r.right.left;
      return;
    }
    _(r.right);
    return;
  }
  if (r.right && k(r.right)) {
    if (r.right.isClosed) {
      r.right.isClosed = !1;
      return;
    }
    if (!r.right.right) {
      r.right = void 0;
      return;
    }
    _(r.right);
    return;
  }
  if (d(r)) {
    (r.isConst || r.value.length === 1) && e ? e.right = void 0 : r.value = r.value.slice(0, -1);
    return;
  }
  if (S(r) && e) {
    e.right = void 0;
    return;
  }
  if (u(r) && e) {
    e.right = r.left;
    return;
  }
}, G = (t, r) => {
  t.right = typeof r == "string" ? A(r) : typeof r == "number" ? I(String(r), String(r).length > 1) : void 0, t.right && x(t.right) && t.$$expressions.splice(0, t.$$expressions.length, t.right);
}, gt = (t, r) => {
  t.$$expressions[0] && !t.$$expressions[0].right && t.$$expressions.shift(), t.$$expressions[0] && g(t.$$expressions[0]) && t.$$expressions[0].isClosed && (t.$$expressions[0].isClosed = !1), _(t), t.right || G(t, r);
}, C = (t) => t.$$expressions.find(
  (r) => k(r) && !r.isClosed
) ?? t, R = (t, r) => {
  const e = C(t), s = g(e) && e.isArgRequired && e.right && (!u(e.right) || u(e.right) && !!e.right.right), c = r && e.right && d(r) && !r.isConst && d(e.right) && !e.right.isConst;
  s && !c && !(r && g(r) && r.isArgRequired) && (e.isClosed = !0, R(t, r));
}, ft = (t) => {
  let r = C(t);
  const [e] = v(r);
  g(r) && r.isArgRequired && (R(t), r = C(t)), k(r) && r.right && (!u(e) || u(e) && e.right) && (r.isClosed = !0);
}, ot = (t, r) => {
  R(t, r);
  const e = C(t);
  let i;
  u(r) ? E(e, r) : d(r) ? ct(e, r) : S(r) ? at(e, r) : w(r) ? lt(e, r) : N(r) ? i = W(e, r) : g(r) && (r.isArgRequired ? i = ht(e, r) : i = W(e, r)), i && t.$$expressions.unshift(i);
}, Ft = (t, r) => {
  var a;
  const e = t.left ? F(t.left, r) : "", i = t.right ? F(t.right, r) : "", s = ((a = r.operators) == null ? void 0 : a[t.name]) || t.name, c = t.left && u(t.left) && B(t.left) > 1 && B(t) < 2;
  return `${e}${e ? " " : ""}${s}${e && !c && i ? " " : ""}${i}`;
}, $t = (t, r) => {
  const e = t.right ? F(t.right, r) : "";
  return (r.renderBrackets ?? V.renderBrackets)({
    body: e,
    isClosed: !!t.isClosed
  });
}, vt = (t, r) => {
  var s, c;
  const e = t.left ? F(t.left, r) : "", i = t.right ? F(t.right, r) : "";
  return (((s = r.renderFunction) == null ? void 0 : s[t.value]) ?? ((c = r.renderFunction) == null ? void 0 : c.default) ?? V.renderFunction.default)({
    left: e,
    right: i,
    name: t.value,
    isClosed: !!t.isClosed
  });
}, V = {
  renderBrackets: ({ body: t, isClosed: r }) => `(${t}${r ? ")" : ""}`,
  renderFunction: {
    default: ({ name: t, left: r, right: e, isClosed: i }) => `${t}(${r ? `${r}, ` : ""}${e}${i ? ")" : ""}`
  },
  constants: {},
  operators: {}
}, F = (t, r = {}) => {
  var e;
  return b(t) && t.right ? F(t.right, r) : u(t) ? Ft(t, r) : N(t) ? $t(t, r) : g(t) ? vt(t, r) : d(t) ? t.value : S(t) ? ((e = r.constants) == null ? void 0 : e[t.value]) ?? t.value : w(t) ? `${t.right ? F(t.right, r) : ""}${t.value}` : "";
}, T = (t) => t * Math.PI / 180, D = (t) => t * 180 / Math.PI, dt = (t, r) => t + r, pt = (t, r) => t - r, mt = (t, r) => t / r, bt = (t, r) => t * r, Mt = Math.pow, Nt = (t, r) => Math.abs(t) ** (1 / r) * (t < 0 ? -1 : 1), wt = (t, r) => o(Math.sin(r === "deg" ? T(t) : t), 11), xt = (t, r) => o(Math.cos(r === "deg" ? T(t) : t), 11), yt = (t, r) => {
  const e = Math.tan(r === "deg" ? T(t) : t);
  return e > Number.MAX_SAFE_INTEGER ? Number.POSITIVE_INFINITY : e;
}, Et = (t, r) => {
  if (t > 1 || t < -1)
    throw new Error("Argument of arcsin expected value in range = -1 <= a <= 1");
  const e = Math.asin(t);
  return r === "deg" ? D(e) : e;
}, At = (t, r) => {
  if (t > 1 || t < -1)
    throw new Error("Argument of acos expected value in range = -1 <= a <= 1");
  const e = Math.acos(t);
  return r === "deg" ? D(e) : e;
}, Bt = (t, r) => {
  const e = Math.atan(t);
  return r === "deg" ? D(e) : e;
}, Ct = (t) => Math.sqrt(t), St = (t) => Math.log(t), kt = (t) => Math.log10(t), o = (t, r = 0) => Number.parseFloat(t.toFixed(r)), X = (t) => {
  let r = t;
  const e = 7, i = [
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
    return Math.PI / Math.sin(r * Math.PI) / X(1 - r);
  r--;
  let s = i[0];
  for (let a = 1; a < e + 2; a++)
    s += i[a] / (r + a);
  const c = r + e + 0.5;
  return Math.sqrt(2 * Math.PI) * c ** (r + 0.5) * Math.exp(-c) * s;
}, Pt = (t) => {
  if (t % 1 !== 0)
    return X(t + 1);
  if (t === 0)
    return 1;
  let e = t;
  for (let i = Math.abs(t); --i; )
    e *= i;
  return e;
}, _t = (t) => {
  let [r, e] = t.value.split("E");
  return r === "." && (r = `${r}0`), parseFloat(r || "1") * (e ? 10 ** Number(e) : 1);
}, q = {
  isDegree: !1,
  defineFunctions: {
    sin: (t, r, { options: e }) => o(wt(r, e.isDegree ? "deg" : "rad"), 11),
    cos: (t, r, { options: e }) => o(xt(r, e.isDegree ? "deg" : "rad"), 11),
    tan: (t, r, { options: e }) => o(yt(r, e.isDegree ? "deg" : "rad"), 11),
    arcsin: (t, r, { options: e }) => o(Et(r, e.isDegree ? "deg" : "rad"), 11),
    arccos: (t, r, { options: e }) => o(At(r, e.isDegree ? "deg" : "rad"), 11),
    arctan: (t, r, { options: e }) => o(Bt(r, e.isDegree ? "deg" : "rad"), 11),
    ln: (t, r) => St(r),
    log: (t, r) => kt(r),
    sqrt: (t, r) => Ct(r),
    pow: (t, r) => {
      if (typeof t != "number")
        throw new Error("unknown argument");
      return Mt(t, r);
    },
    root: (t, r) => {
      if (typeof t != "number")
        throw new Error("Unknown argument");
      return Nt(t, r);
    }
  },
  postfixOperators: {
    "!": (t, r) => Pt(r),
    "%": (t, r, { parent: e, options: i }) => e && u(e) && e.left && [n.Sub, n.Add].includes(e.name) ? f(e.left, i) / 100 * r : r / 100
  },
  defineConst: {
    Pi: Math.PI,
    e: Math.E
  }
}, It = (t, r) => {
  if (!t.left && t.name !== n.Sub || !t.right)
    throw new Error(`Operator "${t.name}" cannot be evaluated`);
  const e = t.left ? f(t.left, r, t) : 0, i = f(t.right, r, t);
  return {
    [n.Add]: dt,
    [n.Sub]: pt,
    [n.Mul]: bt,
    [n.Div]: mt
  }[t.name](e, i);
}, Rt = (t, r, e) => {
  var a;
  if (!t.right || t.isArgRequired && !t.left)
    throw new Error(`Function ${t.value} missed an argument.`);
  const i = ((a = r.defineFunctions) == null ? void 0 : a[t.value]) ?? q.defineFunctions[t.value];
  if (!i)
    throw new Error(`Unknown function "${t.value}"`);
  const s = t.left && f(t.left, r, t), c = t.right && f(t.right, r, t);
  return i(s, c, { node: t, parent: e, options: r });
}, Tt = (t, r, e) => {
  var c;
  const i = ((c = r.postfixOperators) == null ? void 0 : c[t.value]) ?? q.postfixOperators[t.value];
  if (!i || !t.right)
    throw new Error(`Unknown operator "${t.value}" or operand is undefined.`);
  const s = f(t.right, r, t);
  return i(void 0, s, { node: t, parent: e, options: r });
}, f = (t, r = {}, e) => {
  var i;
  if (u(t))
    return It(t, r);
  if (d(t))
    return _t(t);
  if (S(t))
    return ((i = r.defineConst) == null ? void 0 : i[t.value]) ?? q.defineConst[t.value];
  if (g(t))
    return Rt(t, r, e);
  if (w(t))
    return Tt(t, r, e);
  if (N(t)) {
    if (!t.right)
      throw new Error("Empty bracket.");
    return f(t.right, r, t);
  }
  return b(t) ? t.right ? f(t.right, r, t) : 0 : Number.NaN;
};
var l;
class Dt {
  constructor(r) {
    L(this, l, H());
    this.defaultValue = r, this.setValue(r);
  }
  get root() {
    return h(this, l);
  }
  setValue(r) {
    r && typeof r == "object" && b(r) ? (h(this, l).right = r.right, h(this, l).$$expressions = r.$$expressions) : G(h(this, l), r);
  }
  push(r) {
    if (typeof r == "number") {
      this.pushNode(I(String(r), String(r).length > 1));
      return;
    }
    if (r === ")") {
      this.closeBracket();
      return;
    }
    this.pushNode(typeof r == "string" ? A(r) : r);
  }
  pushNode(r) {
    ot(h(this, l), r);
  }
  pop() {
    gt(h(this, l), this.defaultValue);
  }
  closeBracket() {
    ft(h(this, l));
  }
  render(r) {
    return F(h(this, l), r);
  }
  evaluate(r) {
    return f(h(this, l), r);
  }
}
l = new WeakMap();
const Lt = (t) => new Dt(t);
export {
  Dt as Expression,
  Lt as createExpression
};
