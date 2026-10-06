// 生成蓝图：跳到「手搓产线蓝图」页（blueprint/<版本>/，由 dsp-handcraft 打包，源码 https://github.com/zoujack018/dsp-handcraft），
// 把这里的需求、每个物品选的配方和设备、排除的物品带过去（地址里的 #plan=，字段都按游戏 ID），那边自动排布、出蓝图。
// 原来 blueprint.js 生成的蓝图里分拣器的位置和槽位对不上（issues #18、#36），按钮改成跳到这里。

// 本站的中文物品名 → 游戏物品 ID（和游戏里叫法不同的，比如「高级石墨」「卡西米尔晶片」，按 blueprint.js 的 itemMap 对上）
var HANDCRAFT_IDS = {"水":1000, "铁矿":1001, "铜矿":1002, "硅石":1003, "钛石":1004, "石矿":1005, "煤矿":1006, "原油":1007, "可燃冰":1011, "金伯利矿石":1012, "分形硅石":1013, "光栅石":1014, "刺笋结晶":1015, "单极磁石":1016, "沙子":1099, "铁块":1101, "磁铁":1102, "钢材":1103, "铜块":1104, "高纯硅块":1105, "钛块":1106, "钛合金":1107, "石材":1108, "高级石墨":1109, "玻璃":1110, "棱镜":1111, "金刚石":1112, "晶格硅":1113, "精炼油":1114, "塑料":1115, "硫酸":1116, "有机晶体":1117, "钛晶石":1118, "钛化玻璃":1119, "氢":1120, "重氢":1121, "反物质":1122, "石墨烯":1123, "碳纳米管":1124, "框架材料":1125, "卡西米尔晶片":1126, "奇异物质":1127, "燃烧单元":1128, "爆破单元":1129, "晶石爆破单元":1130, "地基":1131, "增产剂Mk.Ⅰ":1141, "增产剂Mk.Ⅱ":1142, "增产剂Mk.Ⅲ":1143, "齿轮":1201, "磁线圈":1202, "电动机":1203, "电磁涡轮":1204, "超级磁场环":1205, "粒子容器":1206, "临界光子":1208, "引力透镜":1209, "空间翘曲器":1210, "电路板":1301, "微晶元件":1302, "处理器":1303, "位面过滤器":1304, "量子芯片":1305, "电浆激发器":1401, "粒子带宽":1402, "湮灭约束球":1403, "光子合并器":1404, "推进器":1405, "加力推进器":1406, "动力引擎":1407, "太阳帆":1501, "戴森球组件":1502, "小型运载火箭":1503, "机枪弹箱":1601, "钛化弹箱":1602, "超合金弹箱":1603, "炮弹组":1604, "高爆炮弹组":1605, "晶石炮弹组":1606, "等离子胶囊":1607, "反物质胶囊":1608, "导弹组":1609, "超音速导弹组":1610, "引力导弹组":1611, "干扰胶囊":1612, "压制胶囊":1613, "液氢燃料棒":1801, "氘核燃料棒":1802, "反物质燃烧棒":1803, "奇异湮灭燃料棒":1804, "传送带":2001, "高速传送带":2002, "极速传送带":2003, "分拣器":2011, "高速分拣器":2012, "极速分拣器":2013, "集装分拣器":2014, "四向分流器":2020, "流速监测器":2030, "自动集装机":2040, "小型储物仓":2101, "大型储物仓":2102, "行星内物流运输站":2103, "星际物流运输站":2104, "轨道采集器":2105, "储液灌":2106, "物流配送器":2107, "电力感应塔":2201, "无线输电塔":2202, "风力涡轮机":2203, "火力发电机":2204, "太阳能板":2205, "蓄电池":2206, "蓄电池满":2207, "射线接收站":2208, "能量枢纽":2209, "人造恒星":2210, "微型聚变发电站":2211, "卫星配电站":2212, "地热发电站":2213, "采矿机":2301, "电弧熔炉":2302, "制作台Mk.Ⅰ":2303, "制作台Mk.Ⅱ":2304, "制作台Mk.Ⅲ":2305, "抽水机":2306, "原油萃取站":2307, "原油精炼厂":2308, "化工厂":2309, "微型粒子对撞机":2310, "电磁轨道弹射器":2311, "垂直发射井":2312, "喷涂机":2313, "分馏塔":2314, "位面熔炉":2315, "大型采矿机":2316, "量子化工厂":2317, "重组式制造台":2318, "负熵熔炉":2319, "矩阵研究站":2901, "自演化研究站":2902, "高斯机枪塔":3001, "高频激光塔":3002, "聚爆加农炮":3003, "磁化电浆炮":3004, "导弹防御塔":3005, "干扰塔":3006, "信号塔":3007, "行星护盾发生器":3008, "战场分析基站":3009, "近程电浆炮":3010, "物流运输机":5001, "星际物流运输机":5002, "配送运输机":5003, "原型机":5101, "精准无人机":5102, "攻击无人机":5103, "护卫舰":5111, "驱逐舰":5112, "黑雾矩阵":5201, "硅基神经元":5202, "物质重组器":5203, "负熵奇点":5204, "核心素":5205, "能量碎片":5206, "蓝矩阵":6001, "红矩阵":6002, "黄矩阵":6003, "紫矩阵":6004, "绿矩阵":6005, "宇宙矩阵":6006};

// 手搓产线蓝图页的地址：每个版本一个子目录，换新版本时改这里
var HANDCRAFT_PAGE = 'blueprint/v2.2/';

var HANDCRAFT_KIND = { 2303: 'assembler', 2304: 'assembler', 2305: 'assembler', 2318: 'assembler', 2302: 'smelter', 2315: 'smelter', 2319: 'smelter', 2309: 'chemical', 2317: 'chemical', 2901: 'lab', 2902: 'lab' };

/** 本站当前的方案 → 带给手搓产线蓝图页的方案 */
function handcraftPlan() {
  var plan = { from: '量产量化计算器', targets: [], ext: [], recipes: {} };
  var unknown = [];
  for (var i = 0; i < xqs.length; i++) {
    var id = HANDCRAFT_IDS[xqs[i].item.name];
    if (id && xqs[i].number > 0) plan.targets.push({ id: id, rate: +xqs[i].number.toFixed(3) });
    else if (!id) unknown.push(xqs[i].item.name);
  }
  for (var e = 0; e < ig_names.length; e++) if (HANDCRAFT_IDS[ig_names[e]]) plan.ext.push(HANDCRAFT_IDS[ig_names[e]]);
  // 配方：每个物品当前选的配方（find），按 blueprint.js 的 recipeMap 换成游戏配方 ID（写法同 Blueprint.mapRecipeID）
  var camel = {};
  for (var k in itemMap) if (itemMap[k].remark) camel[itemMap[k].remark] = itemMap[k].name;
  var key = function (list) {
    var names = [];
    for (var j = 0; j < list.length; j++) names.push(camel[list[j].name]);
    return names.join('+');
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
    var rid = recipeMap[key(item.q) + '=' + key(item.s)];
    if (rid > 0 && HANDCRAFT_IDS[name]) plan.recipes[HANDCRAFT_IDS[name]] = rid;
    var b = HANDCRAFT_IDS[getMachine(item)];
    var kind = HANDCRAFT_KIND[b];
    if (kind) {
      votes[kind] = votes[kind] || {};
      votes[kind][b] = (votes[kind][b] || 0) + 1;
    }
  }
  var fallback = { assembler: $('#selmodein').val(), smelter: $('#furnace').val(), chemical: $('#chemical').val(), lab: $('#research').val() };
  for (var kd in fallback) {
    var best = null;
    for (var bid in votes[kd] || {}) if (best === null || votes[kd][bid] > votes[kd][best]) best = bid;
    var pick = best || HANDCRAFT_IDS[fallback[kd]];
    if (pick) plan[kd] = String(pick);
  }
  plan.belt = { 传送带: '1', 高速传送带: '2', 极速传送带: '3' }[$('#csd').val()] || '3';
  plan.labstack = parseInt($('#maxLabLayers').val()) || 15;
  // 参数配置里的「运输站集装物流：传送带堆叠层数」→ 物流站出货叠几层
  var pile = parseInt($('#speed1_5').val());
  if (pile >= 1 && pile <= 4) plan.pile = String(pile);
  return { plan: plan, unknown: unknown };
}

/** 「生成蓝图」按钮：新标签页打开手搓产线蓝图页 */
function openHandcraft() {
  if (!xqs || !xqs.length) {
    cocoMessage.warning('先添加需求，再生成蓝图', 3000);
    return;
  }
  var r = handcraftPlan();
  if (r.unknown.length) cocoMessage.warning('这些需求在蓝图页里找不到对应物品，已跳过：' + r.unknown.join('、'), 4000);
  if (!r.plan.targets.length) return;
  window.open(HANDCRAFT_PAGE + '#plan=' + encodeURIComponent(JSON.stringify(r.plan)), '_blank');
}
