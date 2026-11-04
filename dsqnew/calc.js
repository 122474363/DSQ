// 量产计算器：照 DSQ（戴森球计划量产量化计算器，github.com/122474363/DSQ，GPL-3.0）重做的。
// 配方读同目录的 dsq-data.js（DSQ 的 Scripts/data.js 原样抄来），图标读同目录的图集 calc-icons.*
// （make-icons.py 从 DSQ 的 Scripts/data.json 拼的），生成蓝图开同目录的 generator.html（本仓库的蓝图生成器，tools/build-web.js 打包）。
// 摆法照「手搓产线蓝图」页：左栏是目标和外部供应，上面一排下拉选工厂型号和增产剂，右边是生产清单。
// 采矿、抽水、原油萃取、轨道采集、黑雾掉落这些没有原料的配方一律当原料，只给每分钟要多少，不算采矿机。
// 普通脚本、不用模块和 fetch：网页直接双击打开（file://）也能用。index.html 按顺序载入 dsq-data.js、calc-icons.js、本文件；
// 整个文件包在一个函数里，免得和 dsq-data.js 留下的一堆全局变量（老页面的代码）撞名字。
(() => {
'use strict';

const { cols: ICON_COLS, list: ICONS } = window.CALC_ICONS;
const $ = (sel) => document.querySelector(sel);

// ---------- 游戏数据 ----------

/** 每类生产设备的型号和速度（同老页面 data.js 的 f_initData；分馏塔按一座每分钟出 18 个重氢，即极速带满带，同老页面的默认） */
const MACHINES = {
  冶炼设备: [['电弧熔炉', 1], ['位面熔炉', 2], ['负熵熔炉', 3]],
  原油精炼机: [['原油精炼机', 1]],
  化工设备: [['化工厂', 1], ['量子化工厂', 2]],
  分馏塔: [['分馏塔', 30]],
  粒子对撞机: [['粒子对撞机', 1]],
  制作台: [['制作台Mk.Ⅰ', 0.75], ['制作台Mk.Ⅱ', 1], ['制作台Mk.Ⅲ', 1.5], ['重组式制造台', 3]],
  研究站: [['矩阵研究站', 1], ['自演化研究站', 3]],
  射线接收塔: [['射线接收塔', 1]],
  能量枢纽: [['能量枢纽', 1]],
};
const KIND_ORDER = Object.keys(MACHINES); // 工厂合计按这个顺序：从冶炼到研究站
/** 顶栏能换型号的四类 */
const PICKABLE = ['冶炼设备', '制作台', '化工设备', '研究站'];
const KIND_LABEL = { 冶炼设备: '熔炉', 原油精炼机: '原油精炼厂', 化工设备: '化工厂', 分馏塔: '分馏塔', 粒子对撞机: '粒子对撞机', 制作台: '制造台', 研究站: '研究站', 射线接收塔: '射线接收站', 能量枢纽: '能量枢纽' };
/** 工作功率，MW（游戏数据）；喷了增产剂再乘 SPRAY 的 power */
const POWER = { 电弧熔炉: 0.36, 位面熔炉: 1.44, 负熵熔炉: 2.88, 原油精炼机: 0.96, 化工厂: 0.72, 量子化工厂: 2.16, 分馏塔: 0.72, 粒子对撞机: 12, '制作台Mk.Ⅰ': 0.27, '制作台Mk.Ⅱ': 0.54, '制作台Mk.Ⅲ': 1.08, 重组式制造台: 2.7, 矩阵研究站: 0.48, 自演化研究站: 1.92, 射线接收塔: 0, 能量枢纽: 0 };
/** 老页面数据里和游戏叫法不同的名字：页面上写游戏里的叫法，图标按图集里的名字找 */
const SHOWN = { '制作台Mk.Ⅰ': '制造台 Mk.Ⅰ', '制作台Mk.Ⅱ': '制造台 Mk.Ⅱ', '制作台Mk.Ⅲ': '制造台 Mk.Ⅲ', 原油精炼机: '原油精炼厂', 粒子对撞机: '微型粒子对撞机', 射线接收塔: '射线接收站' };
const ICON_NAME = { 原油精炼机: '原油精炼厂', 粒子对撞机: '微型粒子对撞机', 射线接收塔: '射线接收站', 火力发电厂: '火力发电机' };
/** 没有原料的配方是从哪来的（原料卡片上的小字） */
const SOURCE = { 采矿机: '采矿', 原油萃取站: '原油萃取站', 抽水机: '抽水站', 轨道采集器: '轨道采集器', 轨道采集器2: '轨道采集器', 射线接收塔: '射线接收站', 黑雾掉落: '黑雾掉落' };
/** 增产剂（下标 = 等级）：增产多出几成、加速快几成、一个能喷几次、用电倍数（同老页面） */
const SPRAY = [
  null,
  { name: '增产剂Mk.Ⅰ', short: 'Mk.Ⅰ', extra: 0.125, speed: 0.25, sprays: 12, power: 1.3 },
  { name: '增产剂Mk.Ⅱ', short: 'Mk.Ⅱ', extra: 0.2, speed: 0.5, sprays: 24, power: 1.7 },
  { name: '增产剂Mk.Ⅲ', short: 'Mk.Ⅲ', extra: 0.25, speed: 1, sprays: 60, power: 2.5 },
];
const BELTS = [['传送带', 360, '传送带'], ['高速传送带', 720, '高速带'], ['极速传送带', 1800, '极速带']];
/** 珍奇矿：星球上有的话，能用它的配方都换过去（左栏点）；有机晶体自己也能做，有矿就直接开采 */
const RARE = ['可燃冰', '金伯利矿石', '分形硅石', '有机晶体', '光栅石', '刺笋结晶', '单极磁石'];
/** 清单空着时给的几个常用目标 */
const QUICK = ['蓝矩阵', '红矩阵', '黄矩阵', '紫矩阵', '绿矩阵', '宇宙矩阵'];
const EPS = 1e-9;

let RECIPES = [];
const PRODUCERS = new Map(); // 物品 → 能做它的配方（抵消后产物里还有它的，按 data.js 的顺序，第一个是默认，同老页面的 find）
const BY_KEY = new Map();
const RARE_ALT = new Map(); // 物品 → [[珍奇, 配方]]：用珍奇做它的配方（它得是配方里出得最多的产物：可燃冰做石墨烯时顺带的氢不算）
let GAME_IDS = {}; // 物品名 → 游戏物品 ID（生成蓝图用，data.js 的 GAME_ITEM_IDS）
const ICON_AT = new Map(ICONS.map((x, i) => [x[0], i]));

/** data.js 的一条配方：原料、产物里同一种物品先抵消（同老页面的 find(name, true)）；key 存设置用（配方在 data.js 里的位置会变） */
function prepare(d) {
  const s = (d.s || []).map((x) => ({ name: x.name, n: Number(x.n) || 1 }));
  const q = (d.q || []).map((x) => ({ name: x.name, n: Number(x.n) || 1 }));
  const out = s.map((x) => ({ ...x }));
  const inp = q.map((x) => ({ ...x }));
  for (const o of out) {
    for (const i of inp) {
      if (o.name !== i.name) continue;
      const c = Math.min(o.n, i.n);
      o.n -= c;
      i.n -= c;
    }
  }
  return {
    s,
    q,
    out: out.filter((x) => x.n > EPS),
    in: inp.filter((x) => x.n > EPS),
    kind: d.m,
    t: Number(d.t) || 1,
    noExtra: d.noExtra, // 没写：能加速能增产；true：只能加速；null：都不行
    gameId: d.gameId || 0,
    source: !q.length, // 没有原料：采矿、抽水、轨道采集、黑雾掉落……当原料
    key: d.gameId ? `g${d.gameId}` : `${d.m}:${q.map((x) => x.name).join('+')}>${s.map((x) => x.name).join('+')}`,
  };
}

/** 配方和游戏 ID：data.js 先载入，留下全局的 data、GAME_ITEM_IDS（它后半老页面的 jQuery 代码只有一个 $(function…)，index.html 把 $ 换成了空函数，不跑） */
function loadData() {
  /* global data, GAME_ITEM_IDS */
  const got = { data: typeof data === 'undefined' ? null : data, GAME_ITEM_IDS: typeof GAME_ITEM_IDS === 'undefined' ? null : GAME_ITEM_IDS };
  if (!Array.isArray(got.data)) throw new Error('dsq-data.js 没载入');
  RECIPES = got.data.map(prepare);
  for (const r of RECIPES) {
    BY_KEY.set(r.key, r);
    for (const o of r.out) {
      if (!PRODUCERS.has(o.name)) PRODUCERS.set(o.name, []);
      PRODUCERS.get(o.name).push(r);
    }
  }
  GAME_IDS = got.GAME_ITEM_IDS || {};
  for (const [name, list] of PRODUCERS) {
    for (const r of list) {
      const rare = r.q.find((x) => RARE.includes(x.name));
      if (!rare || r.s.reduce((a, b) => (b.n > a.n ? b : a)).name !== name) continue;
      if (!RARE_ALT.has(name)) RARE_ALT.set(name, []);
      RARE_ALT.get(name).push([rare.name, r]);
    }
  }
}

// ---------- 设置（存在浏览器里，下次打开还在）：一页一份，一进来总是第一页「总页面」 ----------

const STORE = 'dsq-calc-tabs';
const OLD_STORE = 'dsq-calc-next'; // 没分页时的旧存档：第一次打开时搬进「总页面」
// recipe：{ 物品: 配方 key | 'raw' 当原料 | 'ext' 外部供应 }；machineOf、sprayOf：{ 配方 key: 型号 / 'none' | 'speed' | 'extra' }，只记和顶栏不同的
const BASE = {
  goals: [{ name: '蓝矩阵', rate: 60 }],
  recipe: {},
  // 生成过的蓝图，一张一条：out 这张的目标（这一页自己做的哪几样、每分钟多少）；takes 从外面接了这一页生成过的哪几样、每分钟多少；
  // parts 这张里每组工厂：[{ name, rate 每分钟, machine 型号, count 台数（一组做几样的只记在第一样）, recipe 配方 key, mode 增产剂, group }]，
  // 清单里每样东西下面缩进一行「已完成」照它写。算的时候目标做出的量先抵掉要的（够了的像外部供应一样不再往下算），接的量照样要有人做；
  // 归档时跟着目标并进总页面
  built: [],
  kind: { 冶炼设备: '电弧熔炉', 制作台: '制作台Mk.Ⅰ', 化工设备: '化工厂', 研究站: '矩阵研究站' },
  machineOf: {},
  spray: { level: 0, mode: 'extra' },
  sprayOf: {},
  belt: 2,
  rare: {}, // 左栏点过的珍奇矿：{ 珍奇: true 这个星球有 / false 没有 }，没点过的照默认配方
  pick: [], // 清单里点选、要做进蓝图的物品（它用到的跟着一起做）。一开始一样都没选，两个生成按钮点不了
};
let tabs = []; // [{ id, name, state }]，第一个是「总页面」（别的页面归档时目标并进这里），不能删
let active = 0;
let state; // 当前这一档的设置，就是 tabs[active].state（改坏了撤回时会换成新对象，save() 再放回去）
restore();

/** 存着的一份设置补齐成现在的样子（以后加了字段，旧设置照样能用） */
function filled(s) {
  const base = structuredClone(BASE);
  const rare = s.rare && typeof s.rare === 'object' && !Array.isArray(s.rare) ? { ...s.rare } : {};
  const pick = Array.isArray(s.pick) ? s.pick.filter((n) => typeof n === 'string') : [];
  const built = (Array.isArray(s.built) ? s.built : []).map((b) => cleanBuilt(b)).filter((b) => Object.keys(b.out).length);
  return { ...base, ...s, kind: { ...base.kind, ...s.kind }, spray: { ...base.spray, ...s.spray }, rare, pick, built };
}
/** 存着的一条生成过的蓝图：只留写法对的；known 给了就只留认识的物品、配方 */
function cleanBuilt(b, known = null) {
  const name = (n) => typeof n === 'string' && (!known || PRODUCERS.has(n));
  const rates = (o) => Object.fromEntries(Object.entries(o && typeof o === 'object' ? o : {}).filter(([n, v]) => name(n) && Number.isFinite(v) && v > 0));
  const parts = (Array.isArray(b?.parts) ? b.parts : [])
    .filter((p) => p && name(p.name) && Number.isFinite(p.rate) && p.rate > 0)
    .map((p) => ({
      name: p.name,
      rate: p.rate,
      machine: typeof p.machine === 'string' ? p.machine : null,
      count: Number.isFinite(p.count) && p.count > 0 ? Math.round(p.count) : 0,
      recipe: typeof p.recipe === 'string' && (!known || BY_KEY.has(p.recipe)) ? p.recipe : null,
      mode: p.mode === 'speed' || p.mode === 'extra' ? p.mode : null,
      group: Number.isInteger(p.group) ? p.group : 0,
    }));
  return { out: rates(b?.out), takes: rates(b?.takes), parts };
}
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE));
    const old = saved ? null : JSON.parse(localStorage.getItem(OLD_STORE));
    if (saved && Array.isArray(saved.tabs)) tabs = saved.tabs.filter((t) => t && t.state && Array.isArray(t.state.goals)).map((t) => ({ id: String(t.id), name: String(t.name || '总页面').replace(/^档 (\d+)$/, '页面 $1'), state: filled(t.state) }));
    else if (old && Array.isArray(old.goals)) tabs = [{ id: 'default', name: '总页面', state: filled(old) }];
    if (tabs[0]?.name === '默认') tabs[0].name = '总页面'; // 旧存档里第一页叫「默认」
  } catch {
    /* 隐私窗口、存储被禁用：照默认 */
  }
  if (!tabs.length) tabs = [{ id: 'default', name: '总页面', state: structuredClone(BASE) }];
  active = 0;
  state = tabs[0].state;
}
function save() {
  tabs[active].state = state;
  try {
    localStorage.setItem(STORE, JSON.stringify({ tabs }));
  } catch {
    /* 存不了就算了，页面照常用 */
  }
}

// ---------- 计算 ----------

/** 这个物品用哪个配方做；null 是原料或外部供应 */
function sourceOf(name) {
  const pick = state.recipe[name];
  if (pick === 'raw' || pick === 'ext') return null;
  const list = PRODUCERS.get(name) || [];
  const chosen = list.find((x) => x.key === pick && !x.source);
  if (chosen) return chosen;
  // 左栏的珍奇矿（这一行没单独选配方时才管）：有的，珍奇自己能开采的直接开采、能用它做的物品换成那个配方；
  // 没有的，默认配方要用它的（如石墨烯默认用可燃冰）换成不用它的第一个配方
  const has = state.rare;
  if (has[name] === true && list.some((x) => x.source)) return null;
  const alt = (RARE_ALT.get(name) || []).find(([rare]) => has[rare] === true);
  if (alt) return alt[1];
  const r = list[0];
  if (r && !r.source && r.q.some((x) => has[x.name] === false)) {
    const other = list.find((x) => !x.source && !x.q.some((q) => has[q.name] === false));
    if (other) return other;
  }
  return r && !r.source ? r : null;
}
const isRawByNature = (name) => (PRODUCERS.get(name) || []).some((r) => r.source);
/** [型号, 速度] */
function machineOf(r) {
  const list = MACHINES[r.kind];
  if (!list) return null;
  const want = state.machineOf[r.key] || state.kind[r.kind];
  return list.find((m) => m[0] === want) || list[0];
}
/** 'speed' | 'extra' | null */
function sprayOf(r) {
  if (!state.spray.level || r.noExtra === null || !r.q.length) return null;
  let m = state.sprayOf[r.key] || state.spray.mode;
  if (m === 'extra' && r.noExtra) m = 'speed'; // 只能加速的配方按加速：游戏里这种工厂「额外产出」那档点不了
  return m === 'none' ? null : m;
}

/** 生成过的蓝图合起来：每种物品做出了多少（done）、从外面接了多少（takes），每分钟 */
function ledgerOf(built) {
  const done = new Map();
  const takes = new Map();
  for (const b of built) {
    for (const [n, v] of Object.entries(b.out)) done.set(n, (done.get(n) || 0) + v);
    for (const [n, v] of Object.entries(b.takes)) takes.set(n, (takes.get(n) || 0) + v);
  }
  return { done, takes };
}

/**
 * 从目标沿选中的配方往下展开，算每组工厂每分钟做几次（x）。和老页面一样：原料、产物里同一种物品先抵消，增产剂自己也喷过；
 * 不一样的是副产物：别的配方顺带产出的先抵掉这种物品的需要，剩下的才由它自己的配方做，用不完的列进「多余的副产物」。
 * 清单、合计照整条线算，生成过的蓝图（state.built）缩在各行下面（recs）。还要做多少另算一遍（rem，选了生成蓝图照它的量）：
 * 生成过的蓝图做出的量先抵掉要的，从外面接的量算进要的；做出的够用了的（full）当外部供应再算一遍，不再往下展开
 */
function solve() {
  const led = ledgerOf(state.built);
  let rem;
  for (let full = new Set(); ; full = rem.full) {
    rem = solveWith(led, full);
    if (rem.full.size === full.size) break;
  }
  if (!state.built.length) return rem;
  const res = solveWith({ done: new Map(), takes: new Map() }, new Set(), true);
  res.rem = rem;
  return res;
}
function solveWith({ done, takes }, full, show = false) {
  const goals = state.goals.filter((g) => g.name && g.rate > 0);
  const sp = SPRAY[state.spray.level];
  const add = (map, k, v) => map.set(k, (map.get(k) || 0) + v);

  // 每种物品从哪来；每个配方一组工厂（几种物品选了同一个配方就共用一组，比如精炼油和氢都用原油精炼）
  const src = new Map();
  const runs = new Map();
  const todo = [...goals.map((g) => g.name), ...takes.keys()].reverse();
  while (todo.length) {
    const name = todo.pop();
    if (src.has(name)) continue;
    const r = full.has(name) ? null : sourceOf(name);
    src.set(name, r);
    if (!r) continue;
    let u = runs.get(r);
    if (!u) {
      const mode = sp ? sprayOf(r) : null;
      u = { r, by: [], mode, v: mode === 'extra' ? 1 + sp.extra : 1, a: mode === 'speed' ? 1 + sp.speed : 1, x: 0 };
      runs.set(r, u);
      for (let i = r.in.length - 1; i >= 0; i--) todo.push(r.in[i].name);
      if (mode) todo.unshift(sp.name); // 喷涂用的增产剂放到最后展开
    }
    u.by.push(name);
  }

  // 层次：目标是 0，原料比用它的那组工厂深一层；喷涂用的增产剂接在最深一层后面。有环（两个配方互相要）时最多走 40 遍
  const depth = new Map(goals.map((g) => [g.name, 0]));
  const relax = () => {
    for (let pass = 0, moved = true; moved && pass < 40; pass++) {
      moved = false;
      for (const [name, r] of src) {
        if (!r || !depth.has(name)) continue;
        const d = depth.get(name) + 1;
        for (const q of r.in) {
          if (depth.get(q.name) >= d) continue;
          depth.set(q.name, d);
          moved = true;
        }
      }
      // 生成过的蓝图从外面接的，比它做出的东西深一层；这张里自己做的几样（清单上原来没有的）照那张的配方从目标往下排
      for (const b of state.built) {
        const d = Math.min(...Object.keys(b.out).map((n) => depth.get(n) ?? Infinity)) + 1;
        if (d === Infinity) continue;
        for (const n of Object.keys(b.takes)) {
          if (depth.get(n) >= d) continue;
          depth.set(n, d);
          moved = true;
        }
        const part = new Map(b.parts.map((p) => [p.name, p]));
        const seen = new Set();
        for (const queue = Object.keys(b.out).filter((n) => depth.has(n)); queue.length; ) {
          const n = queue.shift();
          if (seen.has(n)) continue;
          seen.add(n);
          for (const q of BY_KEY.get(part.get(n)?.recipe)?.in || []) {
            if (!part.has(q.name)) continue;
            if (!depth.has(q.name)) {
              depth.set(q.name, depth.get(n) + 1);
              moved = true;
            }
            queue.push(q.name);
          }
        }
      }
    }
  };
  relax();
  if (sp && src.has(sp.name) && !depth.has(sp.name)) {
    depth.set(sp.name, Math.max(0, ...depth.values()) + 1);
    relax();
  }
  const depthOf = (name) => depth.get(name) ?? 1e6;
  const order = [...runs.values()].sort((a, b) => Math.min(...a.by.map(depthOf)) - Math.min(...b.by.map(depthOf)));

  // 要的量 = 目标 + 下游工厂的原料 + 喷涂用的增产剂；每组工厂按「要的减去别的配方顺带产出的」最缺的那种产物定 x。
  // 一层一层往下传，几遍就稳了；增产剂喷自己这种环每圈小一截，也收得住。两个配方互相当原料、越算越大的（如重整精炼配 X 射线裂解）算不出来
  const charges = sp ? sp.sprays * (1 + sp.extra) - 1 : 1;
  const flows = () => {
    const need = new Map();
    const made = new Map();
    let sprayUse = 0;
    for (const g of goals) add(need, g.name, g.rate);
    for (const [n, v] of takes) if (src.has(n)) add(need, n, v);
    for (const [n, v] of done) if (src.get(n)) add(made, n, v);
    for (const u of runs.values()) {
      const k = u.r.kind === '射线接收塔' ? 1 / u.a : 1; // 射线接收站加速的是光子，透镜照样一个用 10 分钟（同老页面的 fixGzSpeed）
      let fed = 0;
      for (const q of u.r.in) {
        add(need, q.name, q.n * u.x * k);
        fed += q.n * u.x * k;
      }
      u.sprayUse = u.mode ? fed / charges : 0; // 这组工厂每分钟喷掉多少增产剂（合计「增产剂」那栏分设备列）
      sprayUse += u.sprayUse;
      for (const o of u.r.out) add(made, o.name, o.n * u.v * u.x);
    }
    if (sprayUse) add(need, sp.name, sprayUse);
    return { need, made, sprayUse };
  };
  let bad = false;
  for (let it = 0; ; it++) {
    const { need, made } = flows();
    let moved = 0;
    for (const u of order) {
      let x = 0;
      for (const name of u.by) {
        const o = u.r.out.find((y) => y.name === name);
        const others = (made.get(name) || 0) - o.n * u.v * u.x;
        x = Math.max(x, ((need.get(name) || 0) - others) / (o.n * u.v));
      }
      moved = Math.max(moved, Math.abs(x - u.x) / (1 + Math.abs(x)));
      u.x = x;
    }
    if (moved < 1e-12) break;
    if (it > 400 || order.some((u) => !(u.x < 1e12))) {
      bad = true;
      break;
    }
  }
  const { need, made, sprayUse } = flows();

  for (const u of runs.values()) {
    u.machine = machineOf(u.r);
    u.count = u.machine ? (u.x * u.r.t) / 60 / (u.machine[1] * u.a) : 0;
  }
  // 清单的行：自己生产的物品，按层次排，同一层按游戏物品面板的顺序；自己改成外部供应的（本来能做）也留一行，好改回来
  const rows = [];
  for (const [name, r] of src) {
    if (!r) {
      const pick = state.recipe[name];
      if ((pick === 'ext' || pick === 'raw') && (PRODUCERS.get(name) || []).some((x) => !x.source)) {
        const n = need.get(name) || 0;
        rows.push({ name, r: null, u: null, need: n, other: Math.min(n, made.get(name) || 0), goal: goals.some((g) => g.name === name), ext: true });
      }
      continue;
    }
    const u = runs.get(r);
    const own = u.r.out.find((y) => y.name === name).n * u.v * u.x;
    const part = done.get(name) || 0; // 生成过的蓝图做了的，剩下的才由这组工厂做
    rows.push({ name, r, u, need: need.get(name) || 0, other: Math.max(0, (made.get(name) || 0) - own - part), part, goal: goals.some((g) => g.name === name) });
  }
  // 生成过的够用了的，下一遍当外部供应（solve 再算一遍）
  const covered = rows.filter((row) => row.part > 0 && row.need - row.part - row.other <= 1e-3 + 1e-6 * row.need).map((row) => row.name);
  // 做了一部分、还没被别的生成过的蓝图接走的：选别的东西生成蓝图时它从外面接（不然这部分白做），剩下的单独选
  const cut = new Set(rows.filter((row) => row.part - (takes.get(row.name) || 0) > 1e-3 && !covered.includes(row.name)).map((row) => row.name));
  // 生成过的蓝图：每样东西下面几行「已完成」（recs；目标那几行能删，这张里别的几样跟着删）。
  // 清单上原来没有的（那张蓝图里做了、这一页当原料或用不到的）也列一行（orphan）
  if (show) {
    const recsOf = new Map();
    state.built.forEach((b, i) => {
      const lead = new Map();
      for (const p of b.parts) if (!lead.has(p.group)) lead.set(p.group, p.name);
      const rec = (name, rate, parent, p) => recsOf.set(name, [...(recsOf.get(name) || []), { i, rate, parent, part: p ?? null, from: Object.keys(b.out), sameAs: p && lead.get(p.group) !== name ? lead.get(p.group) : null }]);
      for (const [name, rate] of Object.entries(b.out)) rec(name, rate, true, b.parts.find((p) => p.name === name));
      for (const p of b.parts) if (!(p.name in b.out)) rec(p.name, p.rate, false, p);
    });
    for (const [name, recs] of recsOf) {
      let row = rows.find((x) => x.name === name);
      if (!row) rows.push((row = { name, r: null, u: null, need: need.get(name) || 0, other: 0, goal: false, ext: true, orphan: true }));
      row.recs = recs;
    }
  }
  const grid = (name) => ICON_AT.get(name) ?? 1e6;
  rows.sort((a, b) => depthOf(a.name) - depthOf(b.name) || grid(a.name) - grid(b.name));
  for (const row of rows) {
    if (!row.u) continue;
    row.first = !row.u.leader;
    row.u.leader ||= row.name; // 一组工厂只在第一行写台数
  }
  // 用在哪（悬停物品名时的提示）
  const usedBy = new Map();
  for (const u of runs.values()) for (const q of u.r.in) usedBy.set(q.name, [...(usedBy.get(q.name) || []), u.leader]);
  if (sprayUse) usedBy.set(sp.name, [...(usedBy.get(sp.name) || []), '喷涂']);
  // 原料与外部供应、多余的副产物
  const raw = [];
  for (const [name, r] of src) {
    if (r) continue;
    const n = need.get(name) || 0;
    const m = made.get(name) || 0;
    raw.push({ name, need: n, other: Math.min(n, m), bring: Math.max(0, n - m), ext: state.recipe[name] === 'ext' || !isRawByNature(name) });
  }
  raw.sort((a, b) => b.bring - a.bring);
  const surplus = [];
  for (const [name, m] of made) {
    const n = need.get(name) || 0;
    if (m - n <= 1e-6 * Math.max(1, m)) continue;
    // 哪几组工厂顺带出来的：写那组工厂做的别的东西（精炼油和氢共用一组时，多出来的氢写「做精炼油时」）
    const from = [...runs.values()].filter((u) => u.x > EPS && u.r.out.some((o) => o.name === name)).flatMap((u) => u.by.filter((b) => b !== name));
    surplus.push({ name, amount: m - n, from: [...new Set(from)] });
  }
  // 工厂合计、用电（按台数向上取整、满负荷算，喷了增产剂乘用电倍数）
  const fleet = new Map();
  const powerBy = new Map(); // 每种设备用多少电（合计「用电」那栏分设备列）
  const sprayBy = new Map(); // 每种设备每分钟喷掉多少增产剂（「增产剂」那栏）
  let power = 0;
  const units = [...runs.values()].filter((u) => u.machine && u.count > 1e-6);
  units.sort((a, b) => KIND_ORDER.indexOf(a.r.kind) - KIND_ORDER.indexOf(b.r.kind) || MACHINES[a.r.kind].findIndex((m) => m === a.machine) - MACHINES[b.r.kind].findIndex((m) => m === b.machine));
  for (const u of units) {
    const n = Math.ceil(u.count - 1e-6);
    const w = n * (POWER[u.machine[0]] || 0) * (u.mode ? sp.power : 1);
    add(fleet, u.machine[0], n);
    add(powerBy, u.machine[0], w);
    if (u.sprayUse > EPS) add(sprayBy, u.machine[0], u.sprayUse);
    power += w;
  }
  // src：每种物品从哪来（配方或 null），生成无带蓝图用；done、takes：生成过的蓝图合起来（ledgerOf）；full：生成过的够用了的物品
  return { goals, sp, rows, raw, surplus, fleet, powerBy, sprayBy, power, sprayUse, usedBy, runs, bad, src, done, takes, full: new Set([...full, ...covered]), cut };
}

// ---------- 画页面 ----------

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const shown = (name) => SHOWN[name] || name;
/** 数字：100 以上留一位小数，1 以上两位，再小三位，末尾的 0 去掉 */
function num(v) {
  const a = Math.abs(v);
  const d = a >= 100 ? 1 : a >= 1 ? 2 : 3;
  return Number(v.toFixed(d)).toLocaleString('zh-CN', { maximumFractionDigits: d });
}
/** 图标：图集里的一格；图集里没有的写名字的头一个字 */
function ic(name, cls = '', tip = false) {
  const i = ICON_AT.get(ICON_NAME[name] || name);
  const t = tip ? ` title="${esc(shown(name))}"` : ' aria-hidden="true"';
  if (i == null) return `<i class="ic none ${cls}"${t}>${esc(shown(name).slice(0, 1))}</i>`;
  return `<i class="ic ${cls}" style="--x:${i % ICON_COLS};--y:${Math.floor(i / ICON_COLS)}"${t}></i>`;
}
/** 物品格：图标放在小方格里（sm 小一号；ext 外部供应，虚线格） */
const ibox = (name, cls = '') => `<span class="ibox${cls ? ` ${cls}` : ''}">${ic(name, cls.includes('sm') ? 's24' : 's28')}</span>`;
const X_ICON = '<i class="ico i-x" aria-hidden="true"></i>';

function renderGoals() {
  $('#goals').innerHTML = state.goals
    .map(
      (g, i) => `<li class="goal">
  <button class="target-btn" type="button" data-act="pick" data-i="${i}" title="${esc(g.name)}（点击换一种）">${ibox(g.name)}<span class="pick-name">${esc(g.name)}</span></button>
  <label class="rate"><input type="number" min="0" step="any" inputmode="decimal" value="${g.rate || ''}" data-i="${i}" aria-label="${esc(g.name)}每分钟产量"><span aria-hidden="true">/分</span></label>
  <button class="rm" type="button" data-act="rm-goal" data-i="${i}" aria-label="移除${esc(g.name)}">${X_ICON}</button>
</li>`,
    )
    .join('');
}

function renderExt() {
  const list = Object.keys(state.recipe).filter((n) => state.recipe[n] === 'ext' || state.recipe[n] === 'raw');
  $('#ext').innerHTML = list
    .map((n) => `<li class="chip">${ic(n, 's18')}${esc(n)}<button type="button" data-act="ext-rm" data-item="${esc(n)}" title="改回自己生产" aria-label="${esc(n)}改回自己生产">${X_ICON}</button></li>`)
    .join('');
}

/** 这条线现在用着这种珍奇矿（当原料运进来、开采） */
const rareInUse = (res, rare) => res.src.has(rare) && !res.src.get(rare);

/** 左栏的珍奇矿：这条线用着的（实线）、用得上还没用的（虚线）才列出来 */
function renderRare(res) {
  const list = RARE.filter((rare) => {
    if (rareInUse(res, rare)) return true;
    for (const [name, r] of res.src) {
      if (name === rare && r) return true; // 有机晶体这条线在自己做：有矿就能直接开采
      if (r && state.recipe[name] === undefined && (RARE_ALT.get(name) || []).some(([x, alt]) => x === rare && alt !== r)) return true;
    }
    return false;
  });
  $('#rare').innerHTML = list
    .map((n) => {
      const on = rareInUse(res, n);
      return `<li><button class="rare${on ? ' on' : ''}" type="button" data-act="rare" data-item="${esc(n)}" aria-pressed="${on}" title="${on ? '这个星球没有：用它的配方换成别的' : '这个星球有：用得上它的配方都换过去'}">${ic(n, 's18')}${esc(n)}</button></li>`;
    })
    .join('');
  $('#rare-box').hidden = !list.length;
}

const menuItem = (act, v, on, face, note = '', off = false) =>
  `<button class="menu-item" type="button" role="menuitemradio" aria-checked="${on}" data-act="${act}" data-v="${esc(v)}"${off ? ' disabled' : ''}>${face}${note ? `<span class="menu-note">${note}</span>` : ''}</button>`;
const pill = (face, items) => `<div class="pill-wrap"><button class="pill" type="button" aria-haspopup="menu">${face}</button><div class="pill-menu" role="menu">${items.join('')}</div></div>`;

function renderToolbar() {
  const pills = [];
  const b = BELTS[state.belt];
  pills.push(pill(`${ic(b[0], 's18')}${b[0]}`, BELTS.map(([n, rate], i) => menuItem('belt', i, i === state.belt, `${ic(n, 's18')}${n}`, `${rate}/分`))));
  for (const kind of PICKABLE) {
    const cur = state.kind[kind];
    pills.push(pill(`${ic(cur, 's18')}${shown(cur)}`, MACHINES[kind].map(([n, s]) => menuItem('kind', `${kind}|${n}`, n === cur, `${ic(n, 's18')}${shown(n)}`, `速度 ×${s}`))));
  }
  const sp = SPRAY[state.spray.level];
  const items = [menuItem('spray-all', '0', !sp, '不喷增产剂')];
  items.push('<div class="menu-head">加速：设备做得更快，原料不变</div>');
  for (let l = 1; l <= 3; l++) items.push(menuItem('spray-all', `${l}|speed`, state.spray.level === l && state.spray.mode === 'speed', `${ic(SPRAY[l].name, 's18')}${SPRAY[l].short} 加速`, `快 ${SPRAY[l].speed * 100}%`));
  items.push('<div class="menu-head">增产：同样的原料多出产物（只能加速的配方照样加速）</div>');
  for (let l = 1; l <= 3; l++) items.push(menuItem('spray-all', `${l}|extra`, state.spray.level === l && state.spray.mode === 'extra', `${ic(SPRAY[l].name, 's18')}${SPRAY[l].short} 增产`, `多 ${SPRAY[l].extra * 100}%`));
  const face = sp ? `${ic(sp.name, 's18')}${sp.short} ${state.spray.mode === 'extra' ? '增产' : '加速'}` : `${ic('增产剂Mk.Ⅰ', 's18 off')}<span class="pill-key">不喷增产剂</span>`;
  pills.push(pill(face, items));
  $('#toolbar').innerHTML = pills.join('');
  fitPills();
}
/** 顶栏下拉往右展开放不下（靠右的几个、窄屏换行后）就改成往左展开 */
function fitPills() {
  const max = document.documentElement.clientWidth - 8;
  for (const w of document.querySelectorAll('.pill-wrap')) {
    const m = w.querySelector('.pill-menu');
    w.classList.remove('flip');
    m.style.cssText = 'display: block; visibility: hidden';
    if (m.getBoundingClientRect().right > max) w.classList.add('flip');
    m.style.cssText = '';
  }
}

/** 原料 → 产物 · 时间（照 data.js 原样，不抵消，和游戏里写的一样） */
function recipeHtml(r) {
  const io = (x) => `<span class="io">${ic(x.name, 's22', true)}<sub>${num(x.n)}</sub></span>`;
  return `${r.q.map(io).join('')}<i class="ico to" aria-hidden="true"></i>${r.s.map(io).join('')}<span class="sec">${num(r.t)} 秒</span>`;
}

function fabHtml(u) {
  if (u.count < 1e-6) return '<span class="same">不用建，副产的已经够了</span>';
  const m = u.machine[0];
  const n = Math.ceil(u.count - 1e-6);
  const exact = Math.abs(u.count - Math.round(u.count)) > 1e-6 ? `<small>${num(u.count)}</small>` : '';
  const many = MACHINES[u.r.kind].length > 1;
  return `<div class="fab"><span class="count" title="精确 ${u.count.toFixed(3)} 台"><b>${n}</b>${exact}</span><button class="cell${state.machineOf[u.r.key] ? ' changed' : ''}" type="button" data-act="machine" data-key="${esc(u.r.key)}"${many ? ' title="这一行换一种型号"' : ' disabled'}>${ic(m, 's24')}<span class="lbl">${shown(m)}</span></button></div>`;
}

function sprayHtml(u) {
  if (u.r.noExtra === null || !u.r.q.length) return '<span class="same">—</span>';
  const label = u.mode === 'extra' ? '增产' : u.mode === 'speed' ? '加速' : '不喷';
  return `<button class="cell${state.sprayOf[u.r.key] ? ' changed' : ''}" type="button" data-act="spray" data-key="${esc(u.r.key)}"><span class="lbl ${u.mode ? 'spray-on' : 'muted'}">${label}</span></button>`;
}

/** 每行最右边的「外部」：虚线是这条线自己做，点了变实线，改成从别处运来；再点改回来 */
const xtag = (name, on) =>
  `<button class="xtag${on ? ' on' : ''}" type="button" data-act="ext-tag" data-item="${esc(name)}" aria-pressed="${on}" title="${on ? '改回这条线自己做' : '改成外部供应：从别处运来，这条线不做'}">外部</button>`;

function rowHtml(row, res) {
  const list = PRODUCERS.get(row.name) || [];
  const alts = list.filter((r) => !r.source).length + (list.some((r) => r.source) ? 1 : 0); // 能换的来源：几种配方，能开采的再加「原料」
  const used = res.usedBy.get(row.name);
  const tipText = used ? `用在：${[...new Set(used)].join('、')}` : '';
  const tip = tipText ? ` title="${esc(tipText)}"` : '';
  const rate = `<td class="c-rate"><span class="n">${num(row.need)}</span>${row.other > EPS ? `<small title="别的配方顺带产出的，先用上">其中副产 ${num(row.other)}</small>` : ''}</td>`;
  const recs = (row.recs || []).map((x, k) => recHtml(x, row, res, k === row.recs.length - 1)).join('');
  // 外部供应的；只因为生成过的蓝图里做了才列出来的（orphan：这一页当原料，或者用不到了）不能改成自己做
  if (row.ext) {
    return `<tr class="is-ext${recs ? ' has-rec' : ''}">
<td class="c-item"><div class="it"${tip}>${ibox(row.name, 'ext')}<span class="nm">${esc(row.name)}</span></div></td>
${rate}
<td class="c-fab"><span class="same">${row.need > EPS ? '从别处运来，这条线不做' : ''}</span></td>
${res.sp ? '<td class="c-spray"></td>' : ''}
<td class="c-recipe"></td>
<td class="c-ext">${row.orphan ? '' : xtag(row.name, true)}</td></tr>${recs}`;
  }
  // 只有一种做法的配方就是字，不用下拉；有几种（含能开采的）才能点开换
  const recipe = alts > 1
    ? `<button class="cell recipe${state.recipe[row.name] ? ' changed' : ''}" type="button" data-act="recipe" data-item="${esc(row.name)}" title="换配方">${recipeHtml(row.r)}<span class="alt">${alts} 种</span></button>`
    : `<span class="cell recipe static">${recipeHtml(row.r)}</span>`;
  const cls = [row.goal && 'is-goal', recs && 'has-rec'].filter(Boolean).join(' ');
  return `<tr data-item="${esc(row.name)}"${cls ? ` class="${cls}"` : ''}>
<td class="c-item"><button class="it" type="button" data-act="pick-row" data-item="${esc(row.name)}" aria-pressed="false" data-tip="${esc(tipText)}"${tip}>${ibox(row.name)}<span class="nm">${esc(row.name)}</span>${row.goal ? '<span class="tag">目标</span>' : ''}</button></td>
${rate}
<td class="c-fab">${row.first ? fabHtml(row.u) : `<span class="same">和「${esc(row.u.leader)}」同一组设备</span>`}</td>
${res.sp ? `<td class="c-spray">${sprayHtml(row.u)}</td>` : ''}
<td class="c-recipe">${recipe}</td>
<td class="c-ext">${row.goal ? '' : xtag(row.name, false)}</td></tr>${recs}`;
}

/**
 * 那一行下面缩进的一条「已完成」：减掉的量，设备、配方照那张蓝图写，不能改。
 * 这张蓝图的目标那条右边有 ×，删掉整张的记录（这张里别的几样跟着删）；别的几样只写已完成
 */
function recHtml(x, row, res, last) {
  const p = x.part;
  const r = p?.recipe ? BY_KEY.get(p.recipe) : null;
  const fab = !p ? '' : p.count ? `<div class="fab"><span class="count"><b>${p.count}</b></span><span class="cell static">${p.machine ? `${ic(p.machine, 's24')}<span class="lbl">${shown(p.machine)}</span>` : ''}</span></div>` : x.sameAs ? `<span class="same">和「${esc(x.sameAs)}」同一组设备</span>` : '';
  const spray = res.sp ? `<td class="c-spray"><span class="lbl muted">${!p ? '' : p.mode === 'extra' ? '增产' : p.mode === 'speed' ? '加速' : '不喷'}</span></td>` : '';
  const tag = x.parent
    ? `<span class="xtag done rec-tag"><i class="ico i-check" aria-hidden="true"></i>已完成<button class="rec-x" type="button" data-act="rec-rm" data-i="${x.i}" title="删掉这条记录，这张蓝图里的别的几样一起删" aria-label="删掉${esc(row.name)}的这条已完成记录">${X_ICON}</button></span>`
    : `<span class="xtag done rec-tag" title="在${esc(quoteAll(x.from))}的蓝图里，删那条记录时一起删"><i class="ico i-check" aria-hidden="true"></i>已完成</span>`;
  return `<tr class="is-rec${last ? ' rec-last' : ''}">
<td class="c-item"><div class="it">${ibox(row.name, 'done sm')}<span class="nm">${esc(row.name)}</span></div></td>
<td class="c-rate"><span class="n">−${num(x.rate)}</span></td>
<td class="c-fab">${fab}</td>
${spray}
<td class="c-recipe">${r ? `<span class="cell recipe static">${recipeHtml(r)}</span>` : ''}</td>
<td class="c-ext">${tag}</td></tr>`;
}

// ---------- 合计：能点的方块（喷了增产剂四个，不喷三个），下面那块跟着换 ----------

let view = 'fleet'; // 下面那块现在是哪一栏：fleet 设备数量 / power 用电 / raw 原料 / spray 增产剂（换档、重算都不变，刷新回到设备数量）
/** 参考发电设施的额定功率，MW（同蓝图页 src/metrics/energy.js：火力发电厂烧什么燃料都是 2.16） */
const GENERATORS = [['火力发电厂', 2.16, '台'], ['微型聚变发电站', 15, '台'], ['人造恒星', 72, '座']];

function renderSummary(res) {
  const units = [...res.fleet.values()].reduce((a, b) => a + b, 0);
  const bring = res.raw.filter((x) => x.bring > EPS).length;
  const sprayOn = res.sp && res.sprayUse > EPS; // 不喷增产剂就不放这一块，停在这栏的回到设备数量
  if (view === 'spray' && !sprayOn) view = 'fleet';
  const tile = (v, k, value, unit) =>
    `<button class="stat" type="button" role="tab" id="tab-${v}" aria-selected="${view === v}" aria-controls="tile-panel" data-act="view" data-v="${v}"><span class="k">${k}</span><span class="v"><b>${value}</b>${unit}</span></button>`;
  $('#stats').innerHTML =
    tile('fleet', '设备数量', units, '台') + tile('power', '用电约', num(res.power), 'MW') + tile('raw', '原料', bring, '种') + (sprayOn ? tile('spray', shown(res.sp.name), num(res.sprayUse), '个/分') : '');
  const panel = $('#tile-panel');
  panel.innerHTML = { fleet: fleetHtml, power: powerHtml, raw: rawHtml, spray: sprayUseHtml }[view](res);
  panel.setAttribute('aria-labelledby', `tab-${view}`);
}

/** 设备数量：每种设备几台 */
const fleetHtml = (res) => (res.fleet.size ? `<div class="units">${[...res.fleet].map(([m, n]) => `<span class="unit">${ibox(m, 'sm')}${shown(m)}<b>${n}</b></span>`).join('')}</div>` : '<p class="cap">没有要建的设备</p>');

/** 用电：满负荷折成几座发电设施（同蓝图页「用电」那页按额定功率算），再分设备列 */
function powerHtml(res) {
  const gens = GENERATORS.map(([name, mw, unit]) => {
    const n = res.power / mw;
    return `<span class="gen">${ibox(name)}<span class="gen-t"><span class="k">${name}</span><span class="v"><b>${Math.ceil(n - 1e-9)}</b>${unit}<small>${n.toFixed(2)}</small></span></span></span>`;
  }).join('');
  const by = [...res.powerBy].map(([m, w]) => `<span class="unit">${ibox(m, 'sm')}${shown(m)}<b>${num(w)}</b><small>MW</small></span>`).join('');
  return `<p class="cap">满负荷用电约 ${num(res.power)} MW，按额定功率大约要</p><div class="gens">${gens}</div><p class="cap">各种设备</p><div class="units">${by}</div>`;
}

/** 增产剂：每种设备每分钟喷掉多少 */
function sprayUseHtml(res) {
  const by = [...res.sprayBy].map(([m, n]) => `<span class="unit">${ibox(m, 'sm')}${shown(m)}<b>${num(n)}</b><small>个/分</small></span>`).join('');
  return `<p class="cap">${shown(res.sp.name)}，每种设备每分钟用多少（增产剂自己那条线也算在里面）</p><div class="units">${by}</div>`;
}

/** 原料：每分钟要运进来多少 */
function rawHtml(res) {
  if (!res.raw.length) return '<p class="cap">不用运原料进来</p>';
  const belt = BELTS[state.belt];
  const cards = res.raw.map((x) => {
    const from = x.ext ? '外部供应' : SOURCE[(PRODUCERS.get(x.name) || []).find((r) => r.source).kind] || '原料';
    const sub = `${from}${x.other > EPS ? `，副产抵掉 ${num(x.other)}` : ''}`;
    const belts = x.bring / belt[1];
    const can = (PRODUCERS.get(x.name) || []).some((r) => !r.source);
    const body = `${ibox(x.name, x.ext ? 'ext' : '')}<span class="nm">${esc(x.name)}</span><span class="sub">${sub}</span><span class="v"><span class="n">${num(x.bring)}</span>${belts >= 0.005 ? `<small>${num(belts)} 条${belt[2]}</small>` : ''}</span>`;
    return can
      ? `<button class="row" type="button" data-act="recipe" data-item="${esc(x.name)}" title="也可以自己生产：点开换配方">${body}</button>`
      : `<div class="row">${body}</div>`;
  });
  return `<p class="cap">每分钟要运进来多少（原料和外部供应）</p><div class="rows">${cards.join('')}</div>`;
}

function surplusHtml(res) {
  if (!res.surplus.length) return '';
  const rows = res.surplus.map(
    (x) => `<div class="row">${ibox(x.name)}<span class="nm">${esc(x.name)}</span><span class="sub">${x.from.length ? `做${esc(x.from.join('、'))}时顺带的` : ''}</span><span class="v"><span class="n">${num(x.amount)}</span><small>每分钟</small></span></div>`,
  );
  return `<section class="panel block"><h3><i class="ico i-alert" aria-hidden="true"></i>多余的副产物</h3><p>这些用不完，要运走、存进箱子或烧掉，不然会堵住产线</p><div class="rows">${rows.join('')}</div></section>`;
}

function renderSheet(res) {
  const done = res.goals.length > 0 && res.goals.every((g) => (res.rem || res).full.has(g.name));
  $('#sheet-done').hidden = !done;
  $('#sheet-done .archive-btn').hidden = !active;
  $('#summary').hidden = !res.goals.length;
  if (res.goals.length) renderSummary(res);
  if (!res.goals.length) {
    $('#body').innerHTML = `<div class="panel empty"><p>先选一个想做的东西，再填每分钟要多少个</p><div class="quick">${QUICK.map((n) => `<button type="button" data-act="quick" data-item="${n}">${ibox(n, 'sm')}${n}</button>`).join('')}</div></div>`;
    return;
  }
  const head = `<thead><tr><th class="c-item">物品</th><th class="c-rate">每分钟</th><th class="c-fab">设备数量</th>${res.sp ? '<th class="c-spray">增产剂</th>' : ''}<th class="c-recipe">配方</th><th class="c-ext"><span class="sr">外部供应</span></th></tr></thead>`;
  const table = res.rows.length ? `<section class="panel"><table class="list">${head}<tbody>${res.rows.map((row) => rowHtml(row, res)).join('')}</tbody></table></section>` : '';
  $('#body').innerHTML = table + surplusHtml(res); // 原料挪到上面合计的「原料」那栏
  fitSheet();
}
/**
 * 表格放不下就改成一块一块（cards）：清单窄了（660 像素以下，看清单的宽度，不看窗口：左栏在不在差 280 像素），
 * 或者表格比清单宽（喷了增产剂、设备名字长时，窗口 1000 像素上下会这样）。画清单、窗口变大小时量一次，画之前就定，不闪
 */
function fitSheet() {
  const list = $('.list');
  if (!list) return;
  list.classList.remove('cards');
  if ($('#body').clientWidth <= 660 || list.scrollWidth > list.parentElement.clientWidth) list.classList.add('cards');
}

let last = null;
/** 重算、重画；goals：左栏的目标也重画（只改产量时不重画，免得输入框丢焦点） */
function update({ goals = false, toolbar = false } = {}) {
  if (goals) renderGoals();
  if (toolbar) renderToolbar();
  renderExt();
  save();
  renderTabs();
  if (!RECIPES.length) return;
  last = solve();
  renderSheet(last);
  renderPick(last);
  renderRare(last);
}
/** 改设置：改完算不出来（两个配方互相当原料、越算越大）就撤回 */
function commit(change, parts) {
  const before = JSON.stringify(state);
  change();
  if (RECIPES.length && solve().bad) {
    state = JSON.parse(before);
    toast('这样选，两种物品会互相当原料、越算越多，算不出来，已经改回去了');
    return;
  }
  update(parts);
}

// ---------- 分档：最上面一行，像浏览器的标签页 ----------

const newId = () => `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
let tabsDrawn = '';

/** 每档：第一个目标的图标（像网页的小图标）、名字、删除；名字和图标没变就不重画 */
function renderTabs(force = false) {
  const sig = `${active}|${tabs.map((t) => `${t.id}:${t.name}:${t.state.goals.find((g) => g.name)?.name || ''}`).join('|')}`;
  if (sig === tabsDrawn && !force) return;
  tabsDrawn = sig;
  $('#plans').innerHTML = tabs
    .map((t, i) => {
      const g = t.state.goals.find((x) => x.name);
      const close = i ? `<button class="x" type="button" data-act="tab-archive" data-i="${i}" tabindex="-1" aria-label="归档${esc(t.name)}" title="归档：目标并进总页面">${X_ICON}</button>` : '';
      return `<div class="plan" role="tab" tabindex="0" aria-selected="${i === active}" data-act="tab" data-i="${i}" draggable="${i > 0}" title="${esc(t.name)}（双击改名，右键更多${i ? '，拖到总页面上归档' : ''}）">${g ? ic(g.name, 's18') : ''}<span class="nm">${esc(t.name)}</span>${close}</div>`;
    })
    .join('');
  hintPlans();
}
/** 档多到一行放不下、右边还有没露出来的：右端淡出一截，提示能往左滑 */
function hintPlans() {
  const p = $('#plans');
  p.classList.toggle('more', p.scrollLeft + p.clientWidth < p.scrollWidth - 1);
}

function goTab(i) {
  if (!tabs[i]) return;
  const hadFocus = !!document.activeElement?.closest?.('#plans');
  save();
  active = i;
  state = tabs[i].state;
  closeMenu();
  closePills();
  update({ goals: true, toolbar: true });
  const el = $('#plans .plan[aria-selected="true"]');
  el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  if (hadFocus) el?.focus();
}
/** 新的一档：目标空着，顶栏的设备和增产剂沿用当前这一档 */
function addTab() {
  save();
  const n = 1 + Math.max(0, ...tabs.map((t) => Number(/^页面 (\d+)$/.exec(t.name)?.[1] || 0)));
  const s = structuredClone(BASE);
  s.goals = [];
  s.kind = { ...state.kind };
  s.spray = { ...state.spray };
  s.belt = state.belt;
  tabs.push({ id: newId(), name: `页面 ${n}`, state: s });
  goTab(tabs.length - 1);
}
function copyTab(i) {
  save();
  tabs.splice(i + 1, 0, { id: newId(), name: `${tabs[i].name} 副本`, state: structuredClone(tabs[i].state) });
  if (i + 1 <= active) active++;
  goTab(i + 1);
}
/** 删掉一页、不并进总页面（右键菜单里的「删除」；总页面不能删）；几秒内能撤销 */
function closeTab(i) {
  if (i < 1 || !tabs[i]) return;
  save();
  const [gone] = tabs.splice(i, 1);
  if (active > i || active === i) active--;
  state = tabs[active].state;
  update({ goals: true, toolbar: true });
  toast(`已删除「${gone.name}」`, {
    label: '撤销',
    run: () => {
      save();
      const at = Math.min(i, tabs.length);
      tabs.splice(at, 0, gone);
      if (at <= active) active++;
      goTab(at);
    },
  });
}
/**
 * 归档（页面上的 ×、右键菜单、拖到总页面上、做完时生产清单右边的按钮）：这一页的目标并进总页面，同种物品量加起来，
 * 生成过的蓝图也记进总页面（做好的那部分在总页面里是已完成，不会再生成一遍）；
 * 传送带、设备、增产剂这些都用总页面的，这一页自己的设置不要了。换到总页面看并进来的；几秒内能撤销
 */
function archiveTab(i) {
  if (i < 1 || !tabs[i]) return;
  save();
  const total = tabs[0].state;
  const before = structuredClone(total.goals);
  const builtBefore = total.built.slice();
  const [gone] = tabs.splice(i, 1);
  for (const g of gone.state.goals) {
    if (!g.name || !(g.rate > 0)) continue;
    const same = total.goals.find((x) => x.name === g.name);
    if (same) same.rate += g.rate;
    else total.goals.push({ name: g.name, rate: g.rate });
  }
  total.built.push(...structuredClone(gone.state.built));
  active = 0;
  state = total;
  closeMenu();
  update({ goals: true, toolbar: true });
  toast(`「${gone.name}」已归档，目标并进总页面`, {
    label: '撤销',
    run: () => {
      save();
      tabs[0].state.goals = before;
      tabs[0].state.built = builtBefore;
      const at = Math.min(i, tabs.length);
      tabs.splice(at, 0, gone);
      if (at <= active) active++;
      goTab(at);
    },
  });
}
/** 改名：名字换成输入框，回车或点别处就存，Esc 不改；空着就不改 */
function renameTab(i) {
  const label = $(`#plans .plan[data-i="${i}"] .nm`);
  if (!label) return;
  const input = document.createElement('input');
  input.value = tabs[i].name;
  input.maxLength = 24;
  input.setAttribute('aria-label', '这个页面的名字');
  label.replaceWith(input);
  input.focus();
  input.select();
  let done = false;
  const finish = (keep) => {
    if (done) return;
    done = true;
    const v = input.value.trim();
    if (keep && v) tabs[i].name = v;
    save();
    renderTabs(true);
  };
  input.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') finish(true);
    else if (e.key === 'Escape') finish(false);
  });
  input.addEventListener('blur', () => finish(true));
}

// ---------- 表里点开的菜单 ----------

let menuFor = null; // { kind: 'recipe' | 'machine' | 'spray', id, anchor }

function openMenu(kind, id, anchor) {
  const box = $('#menu');
  if (menuFor && menuFor.anchor === anchor && !box.hidden) return closeMenu();
  let html = '';
  if (kind === 'tab') {
    const act = (a, face, note = '') => `<button class="menu-item" type="button" role="menuitem" data-act="${a}" data-i="${id}">${face}${note ? `<span class="menu-note">${note}</span>` : ''}</button>`;
    html = `<div class="menu-head">${esc(tabs[id].name)}</div>${act('tab-rename', '重命名', '双击名字也行')}${act('tab-copy', '复制这个页面')}${id ? act('tab-archive', '归档', '目标并进总页面') + act('tab-close', '删除这个页面', '不并进总页面') : ''}`;
  } else if (kind === 'recipe') {
    const list = PRODUCERS.get(id) || [];
    const cur = sourceOf(id);
    const crafted = list.filter((r) => !r.source);
    const mined = list.find((r) => r.source);
    html = `<div class="menu-head">${esc(id)}从哪来</div>`;
    html += crafted.map((r) => menuItem('pick-recipe', r.key, cur === r, `<span class="recipe-line">${recipeHtml(r)}</span>`, KIND_LABEL[r.kind] || '')).join('');
    // 改成外部供应用清单每行右边的「外部」；这里只列做法（能开采的多一个「原料」）
    if (mined) html += menuItem('pick-recipe', 'raw', !cur, `${ic(id, 's22')}原料`, `${SOURCE[mined.kind]}，只算每分钟要多少`);
  } else if (kind === 'machine') {
    const r = BY_KEY.get(id);
    const cur = machineOf(r)[0];
    html = `<div class="menu-head">这一行用哪种${KIND_LABEL[r.kind]}</div>`;
    html += MACHINES[r.kind].map(([n, s]) => menuItem('pick-machine', n, n === cur, `${ic(n, 's22')}${shown(n)}`, `速度 ×${s}${n === state.kind[r.kind] ? '（顶栏）' : ''}`)).join('');
  } else {
    const r = BY_KEY.get(id);
    const sp = SPRAY[state.spray.level];
    const cur = state.sprayOf[id] || '';
    const def = state.spray.mode === 'extra' && !r.noExtra ? '增产' : '加速';
    html = `<div class="menu-head">这一行的增产剂（${sp.short}）</div>`;
    html += menuItem('pick-spray', '', !cur, `跟顶栏（${def}）`);
    html += menuItem('pick-spray', 'none', cur === 'none', '不喷');
    html += menuItem('pick-spray', 'speed', cur === 'speed', '加速', `快 ${sp.speed * 100}%`);
    html += menuItem('pick-spray', 'extra', cur === 'extra', '增产', r.noExtra ? '这个配方不能增产' : `多 ${sp.extra * 100}%`, !!r.noExtra);
  }
  box.innerHTML = html;
  box.hidden = false;
  const a = anchor.getBoundingClientRect();
  const left = Math.max(8, Math.min(a.left, innerWidth - box.offsetWidth - 8));
  let top = a.bottom + 4;
  if (top + box.offsetHeight > innerHeight - 8) top = Math.max(8, a.top - box.offsetHeight - 4);
  box.style.left = `${left}px`;
  box.style.top = `${top}px`;
  menuFor = { kind, id, anchor };
  (box.querySelector('[aria-checked="true"]') || box.querySelector('button'))?.focus({ preventScroll: true });
}
function closeMenu() {
  $('#menu').hidden = true;
  menuFor = null;
}

function pickFromMenu(act, v) {
  const { id } = menuFor;
  closeMenu();
  if (act === 'pick-recipe') {
    commit(() => {
      const first = (PRODUCERS.get(id) || [])[0];
      const isDefault = v === 'raw' ? first?.source : first && !first.source && first.key === v;
      if (isDefault) delete state.recipe[id];
      else state.recipe[id] = v;
    });
  } else if (act === 'pick-machine') {
    const r = BY_KEY.get(id);
    commit(() => {
      if (v === state.kind[r.kind]) delete state.machineOf[id];
      else state.machineOf[id] = v;
    });
  } else {
    commit(() => {
      if (v) state.sprayOf[id] = v;
      else delete state.sprayOf[id];
    });
  }
}

// ---------- 挑目标物品的弹窗 ----------

let pickAt = 0; // 换第几个目标（等于目标数就是新加一个）
let pickTab = 1;

function openPicker(i) {
  pickAt = i;
  const cur = state.goals[i]?.name;
  pickTab = cur && ICONS[ICON_AT.get(cur)]?.[1] === 2 ? 2 : 1;
  $('#picker-title').textContent = i < state.goals.length ? '更换目标产物' : '添加目标产物';
  $('#find').value = '';
  renderSlots();
  $('#picker').showModal();
}

function renderSlots() {
  const q = $('#find').value.trim().toLowerCase();
  const cur = state.goals[pickAt]?.name;
  for (const b of document.querySelectorAll('#tabs button')) b.setAttribute('aria-pressed', String(Number(b.dataset.tab) === pickTab));
  const tile = (name) => {
    const raw = RECIPES.length && !(PRODUCERS.get(name) || []).some((r) => !r.source);
    return `<button class="tile${name === cur ? ' is-goal' : ''}${raw ? ' is-raw' : ''}" type="button" data-pick="${esc(name)}"${raw ? ' title="原料，直接开采"' : ''}>${ic(name, 's36')}<span class="nm">${esc(name)}</span></button>`;
  };
  const slots = $('#slots');
  if (q) {
    const hits = ICONS.filter(([name]) => name.toLowerCase().includes(q) && (!RECIPES.length || PRODUCERS.has(name)));
    slots.innerHTML = hits.length ? hits.map(([name]) => tile(name)).join('') : '<p class="pick-none">没找到</p>';
    return;
  }
  // 照游戏物品面板的格子摆：一行 14 格
  const at = new Map(ICONS.filter((x) => x[1] === pickTab && x[2] > 0).map((x) => [`${x[2]}-${x[3]}`, x[0]]));
  const rows = Math.max(...[...at.keys()].map((k) => Number(k.split('-')[0])));
  let html = '';
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= 14; c++) html += at.has(`${r}-${c}`) ? tile(at.get(`${r}-${c}`)) : '<span class="slot"></span>';
  slots.innerHTML = html;
}

function pickGoal(name) {
  $('#picker').close();
  commit(() => {
    if (pickAt < state.goals.length) state.goals[pickAt].name = name;
    else state.goals.push({ name, rate: 60 });
    autoPick();
  }, { goals: true });
}
/** 加了 / 换了目标、这一页一样都没选时，选上第一个目标，好直接点「生成蓝图」；已经选了的不动 */
function autoPick() {
  const first = state.goals.find((g) => PRODUCERS.has(g.name));
  if (!state.pick.length && first) state.pick = [first.name];
}

// ---------- 选要做进蓝图的物品：点清单里的一行选上（可多选），它用到的跟着一起做；一样都没选时两个生成按钮是灰的 ----------

let picks = null; // 最近画的那次选择（指着一行时找和它相关的几行）

/**
 * 选了哪几组设备（同一组设备的几行一起选），哪几组含在里面：选上的往下用到的（自己做的原料、喷涂用的增产剂），记着被哪几组带进来、离最近的隔几层。
 * 选了上游的，原来单选的下游就算含在里面（选了芯片，处理器不能再单选）
 */
function pickOf(res) {
  const rows = res ? res.rows.filter((row) => row.u) : [];
  const runOf = new Map(rows.map((row) => [row.name, row.u]));
  // 生成过的（做好了的、做了一部分还没被接走的）不跟着用它的一起做：那张蓝图从外面接，要再做就单独选
  const rem = res?.rem;
  const stop = rem ? new Set([...rem.full, ...rem.cut]) : new Set();
  const below = (u) => [...u.r.in.map((q) => q.name), ...(u.mode && res.sp ? [res.sp.name] : [])].filter((n) => !stop.has(n)).map((n) => runOf.get(n)).filter((v) => v && v !== u);
  const reach = (u) => {
    const d = new Map();
    for (let level = [u], k = 1; level.length; k++) {
      const next = [];
      for (const v of level) {
        for (const w of below(v)) {
          if (w === u || d.has(w)) continue;
          d.set(w, k);
          next.push(w);
        }
      }
      level = next;
    }
    return d;
  };
  const chosen = [...new Set(state.pick.map((n) => runOf.get(n)).filter(Boolean))];
  const reaches = new Map(chosen.map((u) => [u, reach(u)]));
  const tops = new Set(chosen.filter((u) => !chosen.some((v) => v !== u && reaches.get(v).has(u) && !reaches.get(u).has(v))));
  const inside = new Map(); // 含在里面的那组 → { from: [把它带进来的几组], d }
  for (const u of tops) {
    for (const [w, d] of reaches.get(u)) {
      if (tops.has(w)) continue;
      const x = inside.get(w);
      if (x) {
        x.from.push(u);
        x.d = Math.min(x.d, d);
      } else inside.set(w, { from: [u], d });
    }
  }
  return { rows, tops, inside };
}
const rowEl = (name) => [...document.querySelectorAll('.list tbody tr[data-item]')].find((tr) => tr.dataset.item === name);
const quoteAll = (list) => list.map((n) => `「${n}」`).join('');

/** 选上的、含在里面的几行铺色，两个生成按钮和下面那句说明跟着变（选的时候不重画清单：铺色的过渡、键盘焦点都留着） */
function renderPick(res) {
  picks = pickOf(res);
  const { rows, tops, inside } = picks;
  const byName = new Map(rows.map((row) => [row.name, row]));
  for (const tr of document.querySelectorAll('.list tbody tr[data-item]')) {
    const row = byName.get(tr.dataset.item);
    if (!row) continue;
    const inc = inside.get(row.u);
    tr.style.setProperty('--d', inc && !tr.classList.contains('inc') ? inc.d : 0); // 新含进来的按隔几层晚一点亮：从选上的那行往下一层层亮起来
    tr.classList.toggle('sel', tops.has(row.u));
    tr.classList.toggle('inc', !!inc);
    const b = tr.querySelector('.it');
    b.setAttribute('aria-pressed', String(tops.has(row.u)));
    b.title = [inc ? `含在${quoteAll(inc.from.map((u) => u.leader))}里，跟着一起做` : '', b.dataset.tip].filter(Boolean).join('\n');
  }
  for (const b of document.querySelectorAll('[data-act="blueprint"], [data-act="beltless"]')) b.setAttribute('aria-disabled', String(!tops.size));
  const names = rows.filter((row) => tops.has(row.u)).map((row) => row.name);
  const goals = rows.filter((row) => row.goal);
  const what = names.length > 3 ? `${quoteAll(names.slice(0, 3))}等 ${names.length} 样` : quoteAll(names);
  $('#pick-hint').textContent = !rows.length
    ? ''
    : !tops.size
      ? '点清单里的物品选进蓝图，可多选，它要用的东西一起做'
      : goals.length && goals.every((row) => tops.has(row.u))
        ? '蓝图做整条线'
        : `蓝图做${what}，连同${names.length > 1 ? '它们' : '它'}要用的`;
}

/** 几行闪一下（点了含在里面的一行：闪把它带进来的那几行） */
function flashRows(names) {
  for (const name of names) {
    const tr = rowEl(name);
    if (!tr) continue;
    tr.classList.remove('flash');
    void tr.offsetWidth; // 连着点：动画从头再来
    tr.classList.add('flash');
  }
}

/** 点了一行：选上 / 取消（同一组设备的几行一起）；含在别的里面的不能单选，提示一下、把带它进来的那几行闪一下 */
function togglePick(name) {
  const { rows, tops, inside } = pickOf(last);
  const row = rows.find((x) => x.name === name);
  if (!row) return;
  const inc = inside.get(row.u);
  if (inc) {
    const from = inc.from.map((u) => u.leader);
    flashRows(rows.filter((x) => inc.from.includes(x.u)).map((x) => x.name));
    return toast(`${name}已经含在${quoteAll(from)}里，跟着一起做`);
  }
  const names = new Set(rows.filter((x) => tops.has(x.u)).map((x) => x.name));
  const on = !tops.has(row.u);
  for (const x of rows) if (x.u === row.u) on ? names.add(x.name) : names.delete(x.name);
  state.pick = [...names];
  // 选了上游的：原来单选的下游并进去，不再记着（取消上游时它们不会自己回来）
  const after = pickOf(last);
  state.pick = rows.filter((x) => after.tops.has(x.u)).map((x) => x.name);
  save();
  renderPick(last);
  const h = hoverRow;
  hoverRow = null;
  lightRows(h);
}

/** 指着选上的一行：含在它里面的几行亮一点；指着含在里面的一行：把它带进来的那几行亮一点 */
let hoverRow = null;
function lightRows(tr) {
  if (tr === hoverRow) return;
  hoverRow = tr;
  for (const x of document.querySelectorAll('.list tr.hl')) x.classList.remove('hl');
  const row = tr && picks?.rows.find((x) => x.name === tr.dataset.item);
  if (!row) return;
  const inc = picks.inside.get(row.u);
  const mates = picks.tops.has(row.u) ? picks.rows.filter((x) => picks.inside.get(x.u)?.from.includes(row.u)) : inc ? picks.rows.filter((x) => inc.from.includes(x.u)) : [];
  for (const x of mates) rowEl(x.name)?.classList.add('hl');
}

/** 一样都没选就点了生成：清单不在眼前就滚过去，各行的物品格闪两下，按钮下面的说明也闪一下 */
function nudgePick() {
  const list = $('.list');
  if (!last?.goals.length) return toast('先选一个目标，再生成蓝图');
  if (!list || !pickOf(last).rows.length) return toast(!$('#sheet-done').hidden && active ? '这一页都做完了，点生产清单右边的「归档」并进总页面' : '这一页没有要自己做的东西了');
  for (const el of [list, $('#pick-hint')]) {
    el.classList.remove('nudge');
    void el.offsetWidth;
    el.classList.add('nudge');
  }
  const r = list.getBoundingClientRect();
  if (r.top > innerHeight - 160 || r.bottom < 160) list.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

/**
 * 选上的那几样连同它们用到的，交给 fn 生成蓝图。选的正好是全部目标、这一页又没生成过就是整条线（和全选时一样）；
 * 不然每样选的照还要做的量（rem：减去没选进来的配方顺带产出的、生成过的）当目标，都做好了的照清单上的量重新生成一张；
 * 照这一页的设置重算一遍，台数和清单上一样。生成过的（做好了的、做了一部分还没被接走的）这张蓝图里从外面接
 */
function picked(res, fn) {
  const { rows, tops, inside } = pickOf(res);
  const goalRows = rows.filter((row) => row.goal);
  if (!state.built.length && goalRows.length && goalRows.every((row) => tops.has(row.u))) return fn(res);
  const rem = res.rem || res;
  const own = new Set(rows.filter((row) => tops.has(row.u) || inside.has(row.u)).map((row) => row.name));
  // 在算出的 r 里还要这组工厂做多少：减去没选进来的配方顺带产出的、生成过的
  const left = (r, name) => {
    const row = r.rows.find((x) => x.name === name && x.u);
    if (!row) return 0;
    let other = 0;
    for (const u of r.runs.values()) if (!u.by.some((n) => own.has(n))) for (const o of u.r.out) if (o.name === name) other += o.n * u.v * u.x;
    return row.need - other - (row.part || 0);
  };
  let goals = [];
  // 顺序：原来的目标在前，再按清单
  for (const name of new Set([...res.goals.map((g) => g.name), ...rows.map((row) => row.name)])) {
    const row = rows.find((x) => x.name === name);
    if (!row || !tops.has(row.u)) continue;
    let rate = left(rem, name);
    if (rate <= 1e-6 && rem !== res) rate = left(res, name);
    if (rate > 1e-6) goals.push({ name, rate });
  }
  if (!goals.length) {
    toast('选的这几样，别的配方顺带产出的就够用了，蓝图里没有要做的东西');
    return null;
  }
  const ext = {};
  for (const n of [...rem.full, ...rem.cut]) if (!goals.some((g) => g.name === n)) ext[n] = 'ext';
  const keep = state;
  const sub = (list) => {
    state = { ...keep, goals: list, recipe: { ...keep.recipe, ...ext }, built: [] };
    return solve();
  };
  try {
    // 做了一部分的也选上了、这次别的选上的又要用它：在这张里一起做，它自己的目标只要还差的
    if (goals.some((g) => rem.cut.has(g.name))) {
      const used = sub(goals.filter((g) => !rem.cut.has(g.name)));
      goals = goals.map((g) => (rem.cut.has(g.name) ? { ...g, rate: g.rate - needIn(used, g.name) } : g)).filter((g) => g.rate > 1e-6);
    }
    return fn(sub(goals));
  } finally {
    state = keep;
  }
}
const needIn = (res, name) => res.rows.find((row) => row.name === name)?.need ?? res.raw.find((x) => x.name === name)?.need ?? 0;

// ---------- 生成蓝图：带到同目录的蓝图生成器 generator.html（#plan= 的写法见 web/src/handoff.js，同 DSQ 的 Scripts/handcraft-link.js） ----------

const MAKERS = {
  制作台: { type: 4, factories: [2303, 2304, 2305, 2318] },
  冶炼设备: { type: 1, factories: [2302, 2315, 2319] },
  化工设备: { type: 2, factories: [2309, 2317] },
  原油精炼机: { type: 3, factories: [2308] },
  粒子对撞机: { type: 5, factories: [2310] },
  研究站: { type: 15, factories: [2901, 2902] },
};
const BP_KIND = { 制作台: 'assembler', 冶炼设备: 'smelter', 化工设备: 'chemical', 研究站: 'lab' };

function blueprintPlan(res) {
  const ids = GAME_IDS;
  const plan = { from: '量产量化计算器', targets: [], ext: [], recipes: {} };
  for (const g of res.goals) if (ids[g.name]) plan.targets.push({ id: ids[g.name], rate: Number(g.rate.toFixed(3)) });
  // 外部供应：自己改成外部供应、原料的（同老页面的「排除」）；默认就当原料的（如轨道采集的氢）照旧由蓝图页自己定
  // 生成过的也从外面来（picked 算的时候改成了外部供应）；左栏珍奇矿点成「有」、直接开采的（有机晶体这种本来能做的），蓝图页那边也得当原矿
  const minedByChoice = (name) => state.rare[name] === true && (PRODUCERS.get(name) || []).some((r) => !r.source);
  for (const x of res.raw) if (ids[x.name] && (['ext', 'raw'].includes(state.recipe[x.name]) || minedByChoice(x.name))) plan.ext.push(ids[x.name]);
  const defs = { items: [], recipes: [] };
  const named = new Set();
  const votes = {};
  for (const u of res.runs.values()) {
    const r = u.r;
    if (r.gameId) for (const name of u.by) if (ids[name]) plan.recipes[ids[name]] = r.gameId;
    const maker = MAKERS[r.kind];
    const all = [...r.q, ...r.s];
    if (maker && r.gameId && all.every((x) => ids[x.name])) {
      for (const x of all) {
        if (named.has(x.name)) continue;
        named.add(x.name);
        defs.items.push({ ID: ids[x.name], Name: x.name });
      }
      defs.recipes.push({ ID: r.gameId, Type: maker.type, Factories: maker.factories, Items: r.q.map((x) => ids[x.name]), ItemCounts: r.q.map((x) => x.n), Results: r.s.map((x) => ids[x.name]), ResultCounts: r.s.map((x) => x.n), TimeSpend: Math.round(r.t * 60), Proliferator: r.noExtra === null ? 0 : r.noExtra ? 1 : 3 });
    }
    // 设备：每类取用得最多的那种（蓝图页每类只选一种）
    const bk = BP_KIND[r.kind];
    const id = u.machine && ids[u.machine[0]];
    if (bk && id) {
      votes[bk] ||= {};
      votes[bk][id] = (votes[bk][id] || 0) + 1;
    }
  }
  if (defs.recipes.length) plan.defs = defs;
  for (const [kind, bk] of Object.entries(BP_KIND)) {
    const v = votes[bk] || {};
    const best = Object.keys(v).sort((a, b) => v[b] - v[a])[0] || ids[state.kind[kind]];
    if (best) plan[bk] = String(best);
  }
  plan.belt = String(state.belt + 1);
  // 研究站叠层、物流站出货叠几层：新页面不再单独设，照老页面参数设置里的默认带过去
  plan.labstack = 15;
  plan.pile = '1';
  return plan;
}

let bpFrom = null; // 开蓝图页的那一页
let bpExt = {}; // 那张蓝图从外面接的、这一页生成过的物品：{ 物品: 'ext' }（记 takes 用）
let bpDone = null; // 蓝图页做好的那张：{ targets: [{ id, rate }] 做的是哪几样, kind: 无带蓝图是 'beltless' }，关弹层回来时标成已完成
function openBlueprint() {
  if (!pickOf(last).tops.size) return nudgePick();
  const plan = picked(last, blueprintPlan);
  if (!plan) return;
  plan.auto = false; // 蓝图页先只填好，等用户改好数量自己点「生成蓝图」
  openGenerator(plan);
}
/** 在本页的弹层里开蓝图生成器，带上方案（#plan=）；生成无带蓝图时方案里标上 beltless */
function openGenerator(plan) {
  bpFrom = tabs[active];
  bpDone = null;
  const nameOf = itemNames();
  const done = (last?.rem || last)?.done;
  bpExt = Object.fromEntries(plan.ext.map((id) => nameOf.get(id)).filter((n) => done?.has(n)).map((n) => [n, 'ext']));
  let box = $('#bp-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'bp-box';
    document.body.append(box);
  }
  const frame = document.createElement('iframe');
  frame.title = '手搓产线蓝图';
  frame.allow = 'clipboard-write';
  frame.src = `../blueprint/v3/index.html#plan=${encodeURIComponent(JSON.stringify(plan))}`;
  box.replaceChildren(frame);
  box.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeBlueprint() {
  const box = $('#bp-box');
  if (!box) return;
  box.hidden = true;
  box.replaceChildren(); // 连页面一起关掉：还在排布的话，后台的线程也停下（再点「生成蓝图」本来就是重开一页）
  document.body.style.overflow = '';
  if (bpDone && bpFrom === tabs[active]) markDone(builtOf(bpDone), bpDone.kind === 'beltless' ? '无带蓝图已复制' : '蓝图生成好了');
  bpDone = null;
}
// 蓝图页最上面「返回计算器」在弹层里点时发 dsphc-close 过来；每排好一张（无带蓝图是复制了）发 dsphc-done，带着那张的目标（bridge.js，generator.html 开头引入）
addEventListener('message', (e) => {
  // 只认弹层里的蓝图页（双击文件打开时来源一律是 null，按是不是那个框架认）和本页自己
  if (e.source !== $('#bp-box iframe')?.contentWindow && e.origin !== location.origin) return;
  if (e.data === 'dsphc-close') closeBlueprint();
  else if (e.data?.type === 'dsphc-done' && Array.isArray(e.data.targets)) bpDone = { targets: e.data.targets, kind: e.data.kind, made: e.data.made };
});

const itemNames = () => new Map(Object.entries(GAME_IDS).map(([name, id]) => [id, name]));
/**
 * 蓝图页报来的那张（目标：游戏物品 ID、每分钟）记成一张生成过的蓝图：目标里这一页自己做的哪几样、每分钟多少；
 * 每组工厂、从外面接的照那边报的（made，worker.js 的 madeOf）。那边没报的（无带蓝图）照开蓝图页时的外部供应、按目标的量在这边算
 */
function builtOf({ targets, made }) {
  const own = new Set(last ? last.rows.filter((row) => row.u).map((row) => row.name) : []);
  const nameOf = itemNames();
  const out = {};
  for (const t of targets) {
    const n = nameOf.get(Number(t.id));
    if (own.has(n) && Number(t.rate) > 0) out[n] = (out[n] || 0) + Number(t.rate);
  }
  if (!Object.keys(out).length) return null;
  if (!Array.isArray(made?.parts)) return entryFor(out, bpExt);
  const takes = {};
  for (const s of made.supplied || []) {
    const n = nameOf.get(Number(s.id));
    if (bpExt[n] && s.rate > EPS) takes[n] = (takes[n] || 0) + Number(s.rate);
  }
  const parts = made.parts.map((p) => ({ name: nameOf.get(Number(p.id)), rate: Number(p.rate), machine: nameOf.get(Number(p.factory)) ?? null, count: Number(p.count), recipe: `g${p.recipe}`, mode: p.spray, group: Number(p.group) }));
  return cleanBuilt({ out, takes, parts }, true);
}
/** 照这一页的设置算一张生成过的蓝图：目标 out，ext 里的从外面接（记进 takes） */
function entryFor(out, ext) {
  const keep = state;
  state = { ...keep, goals: Object.entries(out).map(([name, rate]) => ({ name, rate })), recipe: { ...keep.recipe, ...ext }, built: [] };
  try {
    const res = solve();
    const takes = {};
    for (const x of res.raw) if (ext[x.name] && x.bring > EPS) takes[x.name] = x.bring;
    const parts = [];
    [...res.runs.values()].forEach((u, group) => {
      if (!(u.count > 1e-6)) return;
      let count = Math.ceil(u.count - 1e-6);
      for (const name of u.by) {
        const rate = u.r.out.find((o) => o.name === name).n * u.v * u.x;
        if (rate <= EPS) continue;
        parts.push({ name, rate, machine: u.machine?.[0] ?? null, count, recipe: u.r.key, mode: u.mode, group });
        count = 0;
      }
    });
    return { out, takes, parts };
  } finally {
    state = keep;
  }
}
/** 底部提示带「撤销」：撤回到 before（哪怕已经换到别的页面） */
function toastUndo(msg, before, tab) {
  toast(msg, {
    label: '撤销',
    run: () => {
      tab.state = filled(JSON.parse(before));
      if (tabs[active] === tab) state = tab.state;
      update({ goals: true });
    },
  });
}
/**
 * 生成好的那张记进这一页：做出的够用了的就是已完成（这一页不再算它们，像外部供应，用到它们的从做好的那条线来），选的清掉；
 * 目标都已完成时生产清单右边出「归档」
 */
function markDone(entry, msg) {
  if (!entry) return;
  const before = JSON.stringify(state);
  state.built.push(entry);
  state.pick = [];
  update();
  toastUndo(`${msg}；${quoteAll(Object.keys(entry.out))}标成已完成`, before, tabs[active]);
}
/** 删掉一张生成过的蓝图的记录（目标那条右边的 ×）：它的目标和里面的几样都改回这条线自己做 */
function removeBuilt(i) {
  const b = state.built[i];
  if (!b) return;
  const before = JSON.stringify(state);
  state.built.splice(i, 1);
  update();
  toastUndo(`删掉了${quoteAll(Object.keys(b.out))}的已完成记录`, before, tabs[active]);
}
/** 旧存档的「已完成」（recipe 里写 'done'，没记量）：照现在要的量，每样记成一张生成过的蓝图 */
function migrateDone(s) {
  const names = Object.keys(s.recipe).filter((n) => s.recipe[n] === 'done');
  if (!names.length) return;
  const keep = state;
  for (const n of names) s.recipe[n] = 'ext';
  state = s;
  try {
    const needs = solve().raw.filter((x) => names.includes(x.name) && x.need > EPS);
    for (const n of names) delete s.recipe[n];
    for (const x of needs) s.built.push(entryFor({ [x.name]: x.need }, {}));
  } finally {
    state = keep;
  }
}

// ---------- 生成无带蓝图：开蓝图生成器、标成无带的（beltless），到了那边点「生成蓝图」才照那边的设置出 ----------
function makeBeltless() {
  if (!pickOf(last).tops.size) return nudgePick();
  // 和「生成蓝图」一样开蓝图生成器：那边出图、看数、复制，复制了回来标成已完成
  const plan = picked(last, blueprintPlan);
  if (!plan) return;
  plan.auto = false;
  plan.beltless = true;
  openGenerator(plan);
}

/** 底部提示；action：{ label, run } 时右边多一个按钮（如「撤销」），多留几秒 */
function toast(msg, action) {
  let t = $('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    document.body.append(t);
  }
  t.replaceChildren(msg);
  if (action) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = action.label;
    b.addEventListener('click', () => {
      t.hidden = true;
      action.run();
    });
    t.append(b);
  }
  t.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (t.hidden = true), action ? 6000 : 3600);
}

// ---------- 事件 ----------

const closePills = (except) => {
  for (const w of document.querySelectorAll('.pill-wrap.open')) if (w !== except) w.classList.remove('open');
};

document.addEventListener('click', (e) => {
  if (e.target.closest('#plans input')) return; // 正在改名
  const menuOpen = !$('#menu').hidden || !!document.querySelector('.pill-wrap.open'); // 这一下要是只为关掉开着的菜单，不算点清单的行
  const pick = e.target.closest('[data-pick]');
  if (pick) return pickGoal(pick.dataset.pick);
  const pillBtn = e.target.closest('.pill');
  if (pillBtn) {
    const w = pillBtn.parentElement;
    closePills(w);
    w.classList.remove('shut');
    w.classList.toggle('open');
    return;
  }
  if (!e.target.closest('.pill-wrap')) closePills();
  if (!e.target.closest('.help-btn')) closeHelp();
  if (!e.target.closest('#menu') && !e.target.closest('[data-act="recipe"],[data-act="machine"],[data-act="spray"]')) closeMenu();
  if (e.target === $('#picker')) return $('#picker').close(); // 点弹窗外面的暗处
  const t = e.target.closest('[data-act]');
  if (!t) {
    // 清单里一行的空白处（不是按钮）：和点物品名一样，选上 / 取消；正在拖着选字的不算
    const tr = e.target.closest('.list tbody tr[data-item]');
    if (tr && !menuOpen && !String(getSelection())) togglePick(tr.dataset.item);
    return;
  }
  if (t.disabled) return;
  const v = t.dataset.v;
  const i = Number(t.dataset.i);
  switch (t.dataset.act) {
    case 'tab':
      return i === active ? undefined : goTab(i);
    case 'tab-add':
      return addTab();
    case 'tab-archive':
      return archiveTab(i);
    case 'archive':
      return archiveTab(active);
    case 'tab-close':
      closeMenu();
      return closeTab(i);
    case 'tab-rename':
      closeMenu();
      return renameTab(i);
    case 'tab-copy':
      closeMenu();
      return copyTab(i);
    case 'pick':
      return openPicker(Number(t.dataset.i));
    case 'add-goal':
      return openPicker(state.goals.length);
    case 'rm-goal':
      return commit(() => state.goals.splice(Number(t.dataset.i), 1), { goals: true });
    case 'quick':
      return commit(() => {
        state.goals = [{ name: t.dataset.item, rate: 60 }];
        autoPick();
      }, { goals: true });
    case 'ext-rm':
      return commit(() => delete state.recipe[t.dataset.item]);
    case 'rec-rm':
      return removeBuilt(i);
    case 'ext-tag':
      return commit(() => {
        const item = t.dataset.item;
        if (state.recipe[item] === 'ext' || state.recipe[item] === 'raw') delete state.recipe[item];
        else state.recipe[item] = 'ext';
      });
    case 'rare':
      // 实线（用着）点了是「这个星球没有」，虚线点了是「有」
      return commit(() => (state.rare[t.dataset.item] = t.getAttribute('aria-pressed') !== 'true'));
    case 'close-picker':
      return $('#picker').close();
    case 'view': {
      // 合计的方块：换下面那块；用键盘按的，焦点留在新选中的方块上
      const kept = !!document.activeElement?.closest?.('#stats');
      view = t.dataset.v;
      renderSummary(last);
      if (kept) $(`#tab-${view}`)?.focus();
      return;
    }
    case 'pick-row':
      return menuOpen ? undefined : togglePick(t.dataset.item);
    case 'blueprint':
      return openBlueprint();
    case 'beltless':
      return makeBeltless();
    case 'help': {
      placeTip();
      const open = $('#beltless-help').classList.toggle('open');
      t.setAttribute('aria-expanded', String(open));
      return;
    }
    case 'recipe':
    case 'machine':
    case 'spray':
      return openMenu(t.dataset.act, t.dataset.item ?? t.dataset.key, t);
    case 'pick-recipe':
    case 'pick-machine':
    case 'pick-spray':
      return pickFromMenu(t.dataset.act, v);
  }
  // 顶栏下拉里选了一项：关掉菜单，鼠标移开之前悬停也不再弹出
  const wrap = t.closest('.pill-wrap');
  if (wrap) {
    wrap.classList.remove('open');
    wrap.classList.add('shut');
    wrap.addEventListener('mouseleave', () => wrap.classList.remove('shut'), { once: true });
  }
  if (t.dataset.act === 'belt') commit(() => (state.belt = Number(v)), { toolbar: true });
  else if (t.dataset.act === 'kind') {
    const [kind, name] = v.split('|');
    commit(() => {
      state.kind[kind] = name;
      // 和顶栏一样了的单独设置就不用记了
      for (const k of Object.keys(state.machineOf)) if (state.machineOf[k] === name && BY_KEY.get(k)?.kind === kind) delete state.machineOf[k];
    }, { toolbar: true });
  } else if (t.dataset.act === 'spray-all') {
    const [level, mode] = v.split('|');
    commit(() => (state.spray = { level: Number(level), mode: mode || state.spray.mode }), { toolbar: true });
  }
});

$('#body').addEventListener('pointerover', (e) => lightRows(e.target.closest?.('.list tbody tr[data-item]') || null));
$('#body').addEventListener('pointerleave', () => lightRows(null));

$('#goals').addEventListener('input', (e) => {
  const i = Number(e.target.dataset.i);
  if (!state.goals[i]) return;
  const v = parseFloat(e.target.value);
  state.goals[i].rate = Number.isFinite(v) && v > 0 ? v : 0;
  update();
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!$('#menu').hidden) {
    const a = menuFor?.anchor;
    closeMenu();
    a?.focus();
  }
  closePills();
  closeHelp();
});
function closeHelp() {
  const h = $('#beltless-help');
  if (!h.classList.contains('open')) return;
  h.classList.remove('open');
  h.querySelector('.help-btn').setAttribute('aria-expanded', 'false');
}
/** 问号的说明默认往下弹；下面（窗口或左栏）放不下、上面放得下时改往上 */
function placeTip() {
  const row = $('#beltless-help');
  const tip = $('#beltless-tip');
  row.classList.remove('up');
  tip.style.cssText = 'display: block; visibility: hidden';
  const t = tip.getBoundingClientRect();
  const sideEl = row.closest('.side');
  // 宽屏左栏自己滚动、会把超出的部分裁掉，按左栏算；手机上左栏不裁，按窗口算
  const box = getComputedStyle(sideEl).overflowY === 'visible' ? { top: 0, bottom: innerHeight } : sideEl.getBoundingClientRect();
  const top = Math.max(0, box.top);
  const bottom = Math.min(innerHeight, box.bottom);
  const r = row.getBoundingClientRect();
  if (t.bottom > bottom - 8 && r.top - t.height - 8 >= top + 8) row.classList.add('up');
  tip.style.cssText = '';
}
document.addEventListener('pointerover', (e) => {
  if (e.target.closest?.('.help-btn') && !e.target.closest('.help-btn').contains(e.relatedTarget)) placeTip();
});
document.addEventListener('focusin', (e) => {
  if (e.target.closest?.('.help-btn')) placeTip();
});

// 把一页拖到「总页面」上：归档（拖着时总页面描一圈虚线，到了上面铺金橙）
let dragTab = 0;
const totalTab = () => $('#plans .plan[data-i="0"]');
document.addEventListener('dragstart', (e) => {
  const i = Number(e.target.closest?.('#plans .plan')?.dataset.i);
  if (!(i > 0)) return;
  dragTab = i;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', tabs[i].name);
  totalTab()?.classList.add('drop-ready');
});
document.addEventListener('dragend', () => {
  dragTab = 0;
  totalTab()?.classList.remove('drop-ready', 'drop-on');
});
$('#plans').addEventListener('dragover', (e) => {
  const on = dragTab > 0 && e.target.closest('.plan') === totalTab();
  totalTab()?.classList.toggle('drop-on', on);
  if (!on) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});
$('#plans').addEventListener('drop', (e) => {
  if (!(dragTab > 0) || e.target.closest('.plan') !== totalTab()) return;
  e.preventDefault();
  const i = dragTab;
  dragTab = 0;
  archiveTab(i);
});

// 页面：双击改名，右键出菜单（重命名、复制、归档、删除），键盘回车切换、F2 改名
document.addEventListener('dblclick', (e) => {
  const p = e.target.closest('#plans .plan');
  if (p && !e.target.closest('input, .x')) renameTab(Number(p.dataset.i));
});
document.addEventListener('contextmenu', (e) => {
  const p = e.target.closest('#plans .plan');
  if (!p || e.target.closest('input')) return;
  e.preventDefault();
  openMenu('tab', Number(p.dataset.i), p);
});
$('#plans').addEventListener('keydown', (e) => {
  const p = e.target.closest('.plan');
  if (!p || e.target !== p) return;
  const i = Number(p.dataset.i);
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (i !== active) goTab(i);
  } else if (e.key === 'F2') {
    e.preventDefault();
    renameTab(i);
  }
});
addEventListener('resize', () => {
  closeMenu();
  fitPills();
  fitSheet();
  hintPlans();
});
$('#plans').addEventListener('scroll', hintPlans, { passive: true });
addEventListener('scroll', closeMenu, { passive: true });

$('#find').addEventListener('input', renderSlots);
$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  pickTab = Number(b.dataset.tab);
  $('#find').value = '';
  renderSlots();
});

// ---------- 开始 ----------

document.documentElement.style.setProperty('--cols', ICON_COLS);
renderTabs();
renderGoals();
renderToolbar();
renderExt();
try {
  loadData();
  // 存着的设置里有这份 data.js 不认识的物品、配方：每一档都去掉
  for (const { state: s } of tabs) {
    s.goals = s.goals.filter((g) => PRODUCERS.has(g.name) || ICON_AT.has(g.name));
    for (const [k, v] of Object.entries(s.recipe)) if (!PRODUCERS.has(k) || (v !== 'raw' && v !== 'ext' && v !== 'done' && !BY_KEY.has(v))) delete s.recipe[k];
    if (Array.isArray(s.pick)) s.pick = s.pick.filter((n) => PRODUCERS.has(n));
    s.built = s.built.map((b) => cleanBuilt(b, true)).filter((b) => Object.keys(b.out).length);
    migrateDone(s);
  }
  update({ goals: true });
} catch (err) {
  $('#body').innerHTML = `<p class="loading">配方没载入成功（${esc(err.message)}），刷新一下试试。</p>`;
}
requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('boot')));
})();
