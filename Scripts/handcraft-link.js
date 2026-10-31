// 生成蓝图：在本页的弹层里打开「手搓产线蓝图」页（blueprint/<版本>/，由 dsp-handcraft 打包，源码 https://github.com/zoujack018/dsp-handcraft），
// 把这里的需求、每个物品选的配方和设备、排除的物品带过去（地址里的 #plan=，字段都按游戏 ID），那边自动排布、出蓝图。
// 原来 blueprint.js 生成的蓝图里分拣器的位置和槽位对不上（issues #18、#36），按钮改成跳到这里。

// 手搓产线蓝图页的地址：每个版本一个子目录，换新版本时改这里
var HANDCRAFT_PAGE = 'blueprint/v3/';

var HANDCRAFT_KIND = { 2303: 'assembler', 2304: 'assembler', 2305: 'assembler', 2318: 'assembler', 2302: 'smelter', 2315: 'smelter', 2319: 'smelter', 2309: 'chemical', 2317: 'chemical', 2901: 'lab', 2902: 'lab' };

// 生产设备 → 游戏配方类型、建筑
var HANDCRAFT_MAKERS = {
  制作台: { type: 4, factories: [2303, 2304, 2305, 2318] },
  冶炼设备: { type: 1, factories: [2302, 2315, 2319] },
  化工设备: { type: 2, factories: [2309, 2317] },
  原油精炼机: { type: 3, factories: [2308] },
  粒子对撞机: { type: 5, factories: [2310] },
  研究站: { type: 15, factories: [2901, 2902] },
};

/** 本站当前的方案 → 带给手搓产线蓝图页的方案 */
function handcraftPlan() {
  var ids = GAME_ITEM_IDS;
  var plan = { from: '量产量化计算器', targets: [], ext: [], recipes: {} };
  var unknown = [];
  for (var i = 0; i < xqs.length; i++) {
    var id = ids[xqs[i].item.name];
    if (id && xqs[i].number > 0) plan.targets.push({ id: id, rate: +xqs[i].number.toFixed(3) });
    else if (!id) unknown.push(xqs[i].item.name);
  }
  for (var e = 0; e < ig_names.length; e++) if (ids[ig_names[e]]) plan.ext.push(ids[ig_names[e]]);
  // 配方：每个物品当前选的配方（find），换成游戏配方 ID；配方本身也带过去（defs），蓝图页以这份为准
  var defs = { items: [], recipes: [] };
  var named = {};
  var sent = {};
  var noId = [];
  var nameOf = function (list) {
    for (var j = 0; j < list.length; j++) {
      var x = ids[list[j].name];
      if (x && !named[x]) {
        named[x] = true;
        defs.items.push({ ID: x, Name: list[j].name });
      }
    }
  };
  // 设备：每类取方案里用得最多的那种（手搓产线蓝图页每类只选一种）；没有就用顶上的下拉框
  var votes = {};
  for (var x = 0; x < xh_list.length; x++) {
    var name = xh_list[x].name;
    if (ig_names.indexOf(name) >= 0) continue;
    var item;
    try {
      item = find(name);
    } catch (err) {
      continue;
    }
    if (!item || !item.q || !item.q.length) continue;
    var maker = HANDCRAFT_MAKERS[item.mName];
    var rid = item.gameId || 0; // data.js 里配方的游戏 ID
    if (rid > 0 && ids[name]) plan.recipes[ids[name]] = rid;
    if (maker) {
      var all = item.q.concat(item.s);
      var missing = [];
      for (var a = 0; a < all.length; a++) if (!ids[all[a].name]) missing.push(all[a].name);
      if (rid <= 0) missing.push('配方 ' + item.q.map(function (o) { return o.name; }).join('+') + '->' + item.s.map(function (o) { return o.name; }).join('+'));
      for (var mi = 0; mi < missing.length; mi++) if (noId.indexOf(missing[mi]) < 0) noId.push(missing[mi]);
      if (!missing.length && !sent[rid]) {
        sent[rid] = true;
        nameOf(all);
        var def = { ID: rid, Type: maker.type, Factories: maker.factories, Items: [], ItemCounts: [], Results: [], ResultCounts: [], TimeSpend: Math.round(item.t * 60), Proliferator: item.noExtra === null ? 0 : item.noExtra ? 1 : 3 };
        for (var qi = 0; qi < item.q.length; qi++) {
          def.Items.push(ids[item.q[qi].name]);
          def.ItemCounts.push(item.q[qi].n || 1);
        }
        for (var si = 0; si < item.s.length; si++) {
          def.Results.push(ids[item.s[si].name]);
          def.ResultCounts.push(item.s[si].n || 1);
        }
        defs.recipes.push(def);
      }
    }
    var b = ids[getMachine(item)];
    var kind = HANDCRAFT_KIND[b];
    if (kind) {
      votes[kind] = votes[kind] || {};
      votes[kind][b] = (votes[kind][b] || 0) + 1;
    }
  }
  if (defs.recipes.length) plan.defs = defs;
  var fallback = { assembler: $('#selmodein').val(), smelter: $('#furnace').val(), chemical: $('#chemical').val(), lab: $('#research').val() };
  for (var kd in fallback) {
    var best = null;
    for (var bid in votes[kd] || {}) if (best === null || votes[kd][bid] > votes[kd][best]) best = bid;
    var pick = best || ids[fallback[kd]];
    if (pick) plan[kd] = String(pick);
  }
  plan.belt = { 传送带: '1', 高速传送带: '2', 极速传送带: '3' }[$('#csd').val()] || '3';
  plan.labstack = parseInt($('#maxLabLayers').val()) || 15;
  // 参数配置里的「运输站集装物流：传送带堆叠层数」→ 物流站出货叠几层
  var pile = parseInt($('#speed1_5').val());
  if (pile >= 1 && pile <= 4) plan.pile = String(pile);
  return { plan: plan, unknown: unknown, noId: noId };
}

/** 「生成蓝图」按钮：在本页的弹层里打开手搓产线蓝图页（那边点「返回」关掉弹层，计算器原样还在） */
function openHandcraft() {
  if (!xqs || !xqs.length) {
    cocoMessage.warning('先添加需求，再生成蓝图', 3000);
    return;
  }
  var r = handcraftPlan();
  var noId = r.noId.filter(function (n) { return r.unknown.indexOf(n) < 0; });
  if (noId.length) cocoMessage.warning('这些还没有游戏 ID，蓝图页会少了它们：' + noId.join('、') + '<br/>（data.js 里配方写 gameId、产物写 itemId）', 5000);
  if (r.unknown.length) cocoMessage.warning('这些需求在蓝图页里找不到对应物品，已跳过：' + r.unknown.join('、'), 4000);
  if (!r.plan.targets.length) return;
  var url = HANDCRAFT_PAGE + '#plan=' + encodeURIComponent(JSON.stringify(r.plan));
  var box = document.getElementById('handcraft-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'handcraft-box';
    box.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2000;background:#0f1a2b';
    document.body.appendChild(box);
    window.addEventListener('message', function (e) {
      if (e.data === 'dsphc-close') closeHandcraft();
    });
  }
  box.innerHTML = '';
  var frame = document.createElement('iframe');
  frame.style.cssText = 'display:block;width:100%;height:100%;border:0';
  frame.setAttribute('allow', 'clipboard-write');
  frame.src = url;
  box.appendChild(frame);
  box.style.display = 'block';
  document.body.style.overflow = 'hidden';
  toggleStatusBar(false);
}

/** 关掉蓝图弹层（蓝图页点「返回」时发 dsphc-close 过来） */
function closeHandcraft() {
  var box = document.getElementById('handcraft-box');
  if (box) box.style.display = 'none';
  document.body.style.overflow = '';
  toggleStatusBar(true);
}

// 站顶上的提示条（#statusBar，z-index 10000）会压住弹层，弹层开着时先藏起来
function toggleStatusBar(show) {
  var bar = document.getElementById('statusBar');
  if (bar) bar.style.visibility = show ? '' : 'hidden';
}
