const itemMap = {
  water: { name: "water", iconId: 1000, remark: "水" },
  ironOre: { name: "ironOre", iconId: 1001, remark: "铁矿" },
  copperOre: { name: "copperOre", iconId: 1002, remark: "铜矿" },
  siliconOre: { name: "siliconOre", iconId: 1003, remark: "硅石" },
  titaniumOre: { name: "titaniumOre", iconId: 1004, remark: "钛石" },
  coal: { name: "coal", iconId: 1006, remark: "煤矿" },
  ironIngot: { name: "ironIngot", iconId: 1101, remark: "铁块" },
  titaniumIngot: { name: "titaniumIngot", iconId: 1106, remark: "钛块" },
  energeticGraphite: {
    name: "energeticGraphite",
    iconId: 1109,
    remark: "高级石墨",
  },
  diamond: { name: "diamond", iconId: 1112, remark: "金刚石" },
  proliferatorMk1: {
    name: "proliferatorMk1",
    iconId: 1141,
    extra_rate: 0.125,
    accelerate: 0.25,
    remark: "增产剂Mk.Ⅰ",
  },
  proliferatorMk2: {
    name: "proliferatorMk2",
    iconId: 1142,
    extra_rate: 0.2,
    accelerate: 0.5,
    remark: "增产剂Mk.Ⅱ",
  },
  proliferatorMk3: {
    name: "proliferatorMk3",
    iconId: 1143,
    extra_rate: 0.25,
    accelerate: 1,
    remark: "增产剂Mk.Ⅲ",
  },
  gear: { name: "gear", iconId: 1201, remark: "齿轮" },
  stone: { name: "stone", iconId: 1005, remark: "石矿" },
  oil: { name: "oil", iconId: 1007, remark: "原油" },
  refinedOil: { name: "refinedOil", iconId: 1114, remark: "精炼油" },
  sulfuricAcid: { name: "sulfuricAcid", iconId: 1116, remark: "硫酸" },
  hydrogen: { name: "hydrogen", iconId: 1120, remark: "氢" },
  hydrogenOutput: { name: "hydrogenOutput", iconId: 1120, remark: "氢" }, // 用于解决输入和输出同时存在氢的问题，输出氢用此替代
  fireIce: { name: "fireIce", iconId: 1011, remark: "可燃冰" },
  // wood: { name: 'wood', iconId: 1030, remark: '木材' },
  // plant_fuel: { name: 'plant_fuel', iconId: 1031, remark: '植物燃料' },
  kimberliteOre: { name: "kimberliteOre", iconId: 1012, remark: "金伯利矿石" },
  fractalSilicon: { name: "fractalSilicon", iconId: 1013, remark: "分形硅石" },
  opticalGratingCrystal: {
    name: "opticalGratingCrystal",
    iconId: 1014,
    remark: "光栅石",
  },
  spiniformStalagmiteCrystal: {
    name: "spiniformStalagmiteCrystal",
    iconId: 1015,
    remark: "刺笋结晶",
  },
  unipolarMagnet: { name: "unipolarMagnet", iconId: 1016, remark: "单极磁石" },
  copperIngot: { name: "copperIngot", iconId: 1104, remark: "铜块" },
  highPuritySilicon: {
    name: "highPuritySilicon",
    iconId: 1105,
    remark: "高纯硅块",
  },
  stoneBrick: { name: "stoneBrick", iconId: 1108, remark: "石材" },
  steel: { name: "steel", iconId: 1103, remark: "钢材" },
  titaniumAlloy: { name: "titaniumAlloy", iconId: 1107, remark: "钛合金" },
  glass: { name: "glass", iconId: 1110, remark: "玻璃" },
  titaniumGlass: { name: "titaniumGlass", iconId: 1119, remark: "钛化玻璃" },
  prism: { name: "prism", iconId: 1111, remark: "棱镜" },
  crystalSilicon: { name: "crystalSilicon", iconId: 1113, remark: "晶格硅" },
  magnet: { name: "magnet", iconId: 1102, remark: "磁铁" },
  magneticCoil: { name: "magneticCoil", iconId: 1202, remark: "磁线圈" },
  electricMotor: { name: "electricMotor", iconId: 1203, remark: "电动机" },
  electromagneticTurbine: {
    name: "electromagneticTurbine",
    iconId: 1204,
    remark: "电磁涡轮",
  },
  superMagneticRing: {
    name: "superMagneticRing",
    iconId: 1205,
    remark: "超级磁场环",
  },
  particleContainer: {
    name: "particleContainer",
    iconId: 1206,
    remark: "粒子容器",
  },
  strangeMatter: { name: "strangeMatter", iconId: 1127, remark: "奇异物质" },
  circuitBoard: { name: "circuitBoard", iconId: 1301, remark: "电路板" },
  processor: { name: "processor", iconId: 1303, remark: "处理器" },
  quantumChip: { name: "quantumChip", iconId: 1305, remark: "量子芯片" },
  microcrystallineComponent: {
    name: "microcrystallineComponent",
    iconId: 1302,
    remark: "微晶元件",
  },
  planeFilter: { name: "planeFilter", iconId: 1304, remark: "位面过滤器" },
  particleBroadband: {
    name: "particleBroadband",
    iconId: 1402,
    remark: "粒子带宽",
  },
  plasmaExciter: { name: "plasmaExciter", iconId: 1401, remark: "电浆激发器" },
  photonCombiner: {
    name: "photonCombiner",
    iconId: 1404,
    remark: "光子合并器",
  },
  solarSail: { name: "solarSail", iconId: 1501, remark: "太阳帆" },
  deuterium: { name: "deuterium", iconId: 1121, remark: "重氢" },
  antimatter: { name: "antimatter", iconId: 1122, remark: "反物质" },
  criticalPhoton: { name: "criticalPhoton", iconId: 1208, remark: "临界光子" },
  hydrogenFuelRod: {
    name: "hydrogenFuelRod",
    iconId: 1801,
    remark: "液氢燃料棒",
  },
  deuteriumFuelRod: {
    name: "deuteriumFuelRod",
    iconId: 1802,
    remark: "氘核燃料棒",
  },
  antimatterFuelRod: {
    name: "antimatterFuelRod",
    iconId: 1803,
    remark: "反物质燃烧棒",
  },
  plastic: { name: "plastic", iconId: 1115, remark: "塑料" },
  graphene: { name: "graphene", iconId: 1123, remark: "石墨烯" },
  carbonNanotube: { name: "carbonNanotube", iconId: 1124, remark: "碳纳米管" },
  organicCrystal: { name: "organicCrystal", iconId: 1117, remark: "有机晶体" },
  titaniumCrystal: { name: "titaniumCrystal", iconId: 1118, remark: "钛晶石" },
  casimirCrystal: {
    name: "casimirCrystal",
    iconId: 1126,
    remark: "卡西米尔晶片",
  },
  gravitonLens: { name: "gravitonLens", iconId: 1209, remark: "引力透镜" },
  spaceWarper: { name: "spaceWarper", iconId: 1210, remark: "空间翘曲器" },
  annihilationConstraintSphere: {
    name: "annihilationConstraintSphere",
    iconId: 1403,
    remark: "湮灭约束球",
  },
  thruster: { name: "thruster", iconId: 1405, remark: "推进器" },
  reinforcedThruster: {
    name: "reinforcedThruster",
    iconId: 1406,
    remark: "加力推进器",
  },
  logisticDrone: { name: "logisticDrone", iconId: 5001, remark: "物流运输机" },
  logisticVessel: {
    name: "logisticVessel",
    iconId: 5002,
    remark: "星际物流运输机",
  },
  frameMaterial: { name: "frameMaterial", iconId: 1125, remark: "框架材料" },
  dysonSphereComponent: {
    name: "dysonSphereComponent",
    iconId: 1502,
    remark: "戴森球组件",
  },
  smallCarrierRocket: {
    name: "smallCarrierRocket",
    iconId: 1503,
    remark: "小型运载火箭",
  },
  foundation: { name: "foundation", iconId: 1131, remark: "地基" },
  conveyorBeltMk1: { name: "conveyorBeltMk1", iconId: 2001, remark: "传送带" },
  conveyorBeltMk2: {
    name: "conveyorBeltMk2",
    iconId: 2002,
    remark: "高速传送带",
  },
  conveyorBeltMk3: {
    name: "conveyorBeltMk3",
    iconId: 2003,
    remark: "极速传送带",
  },
  sorterMk1: { name: "sorterMk1", iconId: 2011, remark: "分拣器" },
  sorterMk2: { name: "sorterMk2", iconId: 2012, remark: "高速分拣器" },
  sorterMk3: { name: "sorterMk3", iconId: 2013, remark: "极速分拣器" },
  splitter: { name: "splitter", iconId: 2020, remark: "四向分流器" },
  autoPiler: { name: "autoPiler", iconId: 2040, remark: "自动集装机" },
  trafficMonitor: {
    name: "trafficMonitor",
    iconId: 2030,
    remark: "流速监测器",
  },
  sprayCoater: { name: "sprayCoater", iconId: 2313, remark: "喷涂机" },
  storageMk1: { name: "storageMk1", iconId: 2101, remark: "小型储物仓" },
  storageMk2: { name: "storageMk2", iconId: 2102, remark: "大型储物仓" },
  storageTank: { name: "storageTank", iconId: 2106, remark: "储液灌" },
  assemblingMachineMk1: {
    name: "assemblingMachineMk1",
    iconId: 2303,
    remark: "制作台Mk.Ⅰ",
  },
  assemblingMachineMk2: {
    name: "assemblingMachineMk2",
    iconId: 2304,
    remark: "制作台Mk.Ⅱ",
  },
  assemblingMachineMk3: {
    name: "assemblingMachineMk3",
    iconId: 2305,
    remark: "制作台Mk.Ⅲ",
  },
  teslaTower: { name: "teslaTower", iconId: 2201, remark: "电力感应塔" },
  wirelessPowerTower: {
    name: "wirelessPowerTower",
    iconId: 2202,
    remark: "无线输电塔",
  },
  satelliteSubstation: {
    name: "satelliteSubstation",
    iconId: 2212,
    remark: "卫星配电站",
  },
  windTurbine: { name: "windTurbine", iconId: 2203, remark: "风力涡轮机" },
  thermalPowerPlant: {
    name: "thermalPowerPlant",
    iconId: 2204,
    remark: "火力发电机",
  },
  miniFusionPowerPlant: {
    name: "miniFusionPowerPlant",
    iconId: 2211,
    remark: "微型聚变发电站",
  },
  geothermalPowerStation: {
    name: "geothermalPowerStation",
    iconId: 2213,
    remark: "地热发电站",
  },
  miningMachine: { name: "miningMachine", iconId: 2301, remark: "采矿机" },
  advancedMiningMachine: {
    name: "advancedMiningMachine",
    iconId: 2316,
    remark: "大型采矿机",
  },
  waterPump: { name: "waterPump", iconId: 2306, remark: "抽水机" },
  arcSmelter: { name: "arcSmelter", iconId: 2302, remark: "电弧熔炉" },
  planeSmelter: { name: "planeSmelter", iconId: 2315, remark: "位面熔炉" },
  oilExtractor: { name: "oilExtractor", iconId: 2307, remark: "原油萃取站" },
  oilRefinery: { name: "oilRefinery", iconId: 2308, remark: "原油精炼厂" },
  chemicalPlant: { name: "chemicalPlant", iconId: 2309, remark: "化工厂" },
  fractionator: { name: "fractionator", iconId: 2314, remark: "分馏塔" },
  quantumChemicalPlant: {
    name: "quantumChemicalPlant",
    iconId: 2317,
    remark: "量子化工厂",
  },
  solarPanel: { name: "solarPanel", iconId: 2205, remark: "太阳能板" },
  accumulator: { name: "accumulator", iconId: 2206, remark: "蓄电池" },
  accumulatorFull: {
    name: "accumulatorFull",
    iconId: 2207,
    remark: "蓄电池满",
  },
  emRailEjector: {
    name: "emRailEjector",
    iconId: 2311,
    remark: "电磁轨道弹射器",
  },
  rayReceiver: { name: "rayReceiver", iconId: 2208, remark: "射线接收站" },
  verticalLaunchingSilo: {
    name: "verticalLaunchingSilo",
    iconId: 2312,
    remark: "垂直发射井",
  },
  energyExchanger: {
    name: "energyExchanger",
    iconId: 2209,
    remark: "能量枢纽",
  },
  miniatureParticleCollider: {
    name: "miniatureParticleCollider",
    iconId: 2310,
    remark: "微型粒子对撞机",
  },
  artificialStar: { name: "artificialStar", iconId: 2210, remark: "人造恒星" },
  logisticsDistributor: {
    name: "logisticsDistributor",
    iconId: 2107,
    remark: "物流配送器",
  },
  planetaryLogisticStation: {
    name: "planetaryLogisticStation",
    iconId: 2103,
    remark: "行星内物流运输站",
  },
  interstellarLogisticStation: {
    name: "interstellarLogisticStation",
    iconId: 2104,
    remark: "星际物流运输站",
  },
  orbitalCollector: {
    name: "orbitalCollector",
    iconId: 2105,
    remark: "轨道采集器",
  },
  lab: { name: "lab", iconId: 2901, remark: "矩阵研究站" },
  electromagneticMatrix: {
    name: "electromagneticMatrix",
    iconId: 6001,
    remark: "蓝矩阵",
  },
  energyMatrix: { name: "energyMatrix", iconId: 6002, remark: "红矩阵" },
  structureMatrix: { name: "structureMatrix", iconId: 6003, remark: "黄矩阵" },
  informationMatrix: {
    name: "informationMatrix",
    iconId: 6004,
    remark: "紫矩阵",
  },
  gravityMatrix: { name: "gravityMatrix", iconId: 6005, remark: "绿矩阵" },
  universeMatrix: { name: "universeMatrix", iconId: 6006, remark: "宇宙矩阵" },
  logisticsBot: { name: "logisticsBot", iconId: 5003, remark: "配送运输机" },
  燃烧单元: { name: "燃烧单元", iconId: 1128, remark: "燃烧单元" },
  爆破单元: { name: "爆破单元", iconId: 1129, remark: "爆破单元" },
  晶石爆破单元: { name: "晶石爆破单元", iconId: 1130, remark: "晶石爆破单元" },
  机枪弹箱: { name: "机枪弹箱", iconId: 1601, remark: "机枪弹箱" },
  钛化弹箱: { name: "钛化弹箱", iconId: 1602, remark: "钛化弹箱" },
  超合金弹箱: { name: "超合金弹箱", iconId: 1603, remark: "超合金弹箱" },
  导弹组: { name: "导弹组", iconId: 1609, remark: "导弹组" },
  超音速导弹组: { name: "超音速导弹组", iconId: 1610, remark: "超音速导弹组" },
  引力导弹组: { name: "引力导弹组", iconId: 1611, remark: "引力导弹组" },
  炮弹组: { name: "炮弹组", iconId: 1604, remark: "炮弹组" },
  高爆炮弹组: { name: "高爆炮弹组", iconId: 1605, remark: "高爆炮弹组" },
  晶石炮弹组: { name: "晶石炮弹组", iconId: 1606, remark: "晶石炮弹组" },
  原型机: { name: "原型机", iconId: 5101, remark: "原型机" },
  精准无人机: { name: "精准无人机", iconId: 5102, remark: "精准无人机" },
  攻击无人机: { name: "攻击无人机", iconId: 5103, remark: "攻击无人机" },
  护卫舰: { name: "护卫舰", iconId: 5111, remark: "护卫舰" },
  驱逐舰: { name: "驱逐舰", iconId: 5112, remark: "驱逐舰" },
  等离子胶囊: { name: "等离子胶囊", iconId: 1607, remark: "等离子胶囊" },
  反物质胶囊: { name: "反物质胶囊", iconId: 1608, remark: "反物质胶囊" },
  重组式制造台: { name: "重组式制造台", iconId: 2318, remark: "重组式制造台" },
  自演化研究站: { name: "自演化研究站", iconId: 2902, remark: "自演化研究站" },
  负熵熔炉: { name: "负熵熔炉", iconId: 2319, remark: "负熵熔炉" },
  高斯机枪塔: { name: "高斯机枪塔", iconId: 3001, remark: "高斯机枪塔" },
  导弹防御塔: { name: "导弹防御塔", iconId: 3005, remark: "导弹防御塔" },
  聚爆加农炮: { name: "聚爆加农炮", iconId: 3003, remark: "聚爆加农炮" },
  高频激光塔: { name: "高频激光塔", iconId: 3002, remark: "高频激光塔" },
  磁化电浆炮: { name: "磁化电浆炮", iconId: 3004, remark: "磁化电浆炮" },
  战场分析基站: { name: "战场分析基站", iconId: 3009, remark: "战场分析基站" },
  信号塔: { name: "信号塔", iconId: 3007, remark: "信号塔" },
  行星护盾发生器: { name: "行星护盾发生器", iconId: 3008, remark: "行星护盾发生器" },
  动力引擎: { name: "动力引擎", iconId: 1407, remark: "动力引擎" },
  奇异湮灭燃料棒: { name: "奇异湮灭燃料棒", iconId: 1804, remark: "奇异湮灭燃料棒" },
  负熵奇点: { name: "负熵奇点", iconId: 5204, remark: "负熵奇点" },
  能量碎片: { name: "能量碎片", iconId: 5206, remark: "能量碎片" },
  硅基神经元: { name: "硅基神经元", iconId: 5202, remark: "硅基神经元" },
  物质重组器: { name: "物质重组器", iconId: 5203, remark: "物质重组器" },
  核心素: { name: "核心素", iconId: 5205, remark: "核心素" },

  templateItem: { name: "templateItem", iconId: 0, remark: "模板" },
};
const productionCategory = {
  smelter: 0,
  assembling: 1,
  plant: 2,
  refinery: 3,
  collider: 4,
  lab: 5,
};
const buildingType = {
  production: 0,
  sorter: 1,
  conveyor: 2,
};
const buildingMap = {
  arcSmelter: {
    remark: "电弧熔炉",
    name: "arcSmelter",
    itemId: 2302,
    modelIndex: 62,
    productionSpeed: 1,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.smelter,
    slotMaxIndex: 7,
  },
  planeSmelter: {
    remark: "位面熔炉",
    name: "planeSmelter",
    itemId: 2315,
    modelIndex: 194,
    productionSpeed: 2,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.smelter,
    slotMaxIndex: 7,
  },
  负熵熔炉: {
    remark: "负熵熔炉",
    name: "负熵熔炉",
    itemId: 2319,
    modelIndex: 457,
    productionSpeed: 3,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.smelter,
    slotMaxIndex: 7,
  },
  assemblingMachineMk1: {
    remark: "制造台Mk.I",
    name: "assemblingMachineMk1",
    itemId: 2303,
    modelIndex: 65,
    productionSpeed: 0.75,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.assembling,
    slotMaxIndex: 8,
  },
  assemblingMachineMk2: {
    remark: "制造台MkⅡ",
    name: "assemblingMachineMk2",
    itemId: 2304,
    modelIndex: 66,
    productionSpeed: 1,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.assembling,
    slotMaxIndex: 8,
  },
  assemblingMachineMk3: {
    remark: "制造台Mk.III",
    name: "assemblingMachineMk3",
    itemId: 2305,
    modelIndex: 67,
    productionSpeed: 1.5,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.assembling,
    slotMaxIndex: 8,
  },
  重组式制造台: {
    remark: "重组式制造台",
    name: "重组式制造台",
    itemId: 2318,
    modelIndex: 456,
    productionSpeed: 3,
    size: { x: 3, y: 3 },
    type: buildingType.production,
    category: productionCategory.assembling,
    slotMaxIndex: 8,
  },
  chemicalPlant: {
    remark: "化工厂",
    name: "chemicalPlant",
    itemId: 2309,
    modelIndex: 64,
    productionSpeed: 1,
    type: buildingType.production,
    category: productionCategory.plant,
    slotMaxIndex: 6,
  },
  quantumChemicalPlant: {
    remark: "量子化工厂",
    name: "quantumChemicalPlant",
    itemId: 2317,
    modelIndex: 376,
    productionSpeed: 2,
    type: buildingType.production,
    category: productionCategory.plant,
    slotMaxIndex: 6,
  },
  oilRefinery: {
    remark: "原油精炼厂",
    name: "oilRefinery",
    itemId: 2308,
    modelIndex: 63,
    productionSpeed: 1,
    type: buildingType.production,
    category: productionCategory.refinery,
    slotMaxIndex: 5,
  },
  miniatureParticleCollider: {
    remark: "粒子对撞机",
    name: "miniatureParticleCollider",
    itemId: 2310,
    modelIndex: 69,
    productionSpeed: 1,
    type: buildingType.production,
    category: productionCategory.collider,
    slotMaxIndex: 8,
  },
  lab: {
    remark: "矩阵研究站",
    name: "lab",
    itemId: 2901,
    modelIndex: 70,
    productionSpeed: 1,
    type: buildingType.production,
    category: productionCategory.lab,
    height: 3,
    slotMaxIndex: 11,
  },
  自演化研究站: {
    remark: "自演化研究站",
    name: "自演化研究站",
    itemId: 2902,
    modelIndex: 455,
    productionSpeed: 3,
    type: buildingType.production,
    category: productionCategory.lab,
    height: 3,
    slotMaxIndex: 11,
  },
  sorterMk1: {
    name: "sorterMk1",
    itemId: 2011,
    modelIndex: 41,
    sortingSpeed: 1.5,
    size: { x: 1, y: 1 },
    type: buildingType.sorter,
    remark: "分拣器MK.I",
  },
  // sorterMk2: { remark: '高速分拣器', name: 'sorterMk2', itemId: 2012, modelIndex: 42 },
  sorterMk3: {
    name: "sorterMk3",
    itemId: 2013,
    modelIndex: 43,
    sortingSpeed: 6,
    size: { x: 1, y: 1 },
    type: buildingType.sorter,
    remark: "分拣器MK.Ⅲ",
  },
  conveyorBeltMk1: {
    name: "conveyorBeltMk1",
    itemId: 2001,
    modelIndex: 35,
    transportSpeed: 6,
    size: { x: 1, y: 1 },
    type: buildingType.conveyor,
    remark: "传送带MK.I",
  },
  // conveyorBeltMK2: { remark: '高速传送带', name: 'conveyorBeltMK2', itemId: 2002, modelIndex: 36 },
  conveyorBeltMK3: {
    name: "conveyorBeltMK3",
    itemId: 2003,
    modelIndex: 37,
    transportSpeed: 30,
    size: { x: 1, y: 1 },
    type: buildingType.conveyor,
    remark: "传送带MK.Ⅲ",
  },
  sprayCoater: {
    remark: "喷涂机",
    name: "sprayCoater",
    itemId: 2313,
    modelIndex: 120,
  },
  teslaTower: {
    remark: "电力感应塔",
    name: "teslaTower",
    itemId: 2201,
    modelIndex: 44,
  },
  satelliteSubstation: {
    remark: "卫星配电站",
    name: "satelliteSubstation",
    itemId: 2212,
    modelIndex: 68,
    powerDistribution: 30,
    size: { x: 3, y: 3 },
  },
  // piler: { remark: '自动集装机', name: 'piler', itemId: 2040, modelIndex: 257 },
  // monitor: { remark: '流速监测器', name: 'monitor', itemId: 2030, modelIndex: 208 },

  templateBuilding: {
    name: "templateBuilding",
    itemId: 0,
    modelIndex: 0,
    size: { x: 1, y: 1 },
    remark: "模板",
  },
};

const recipeMap = {
  "refinedOil+stone+water=sulfuricAcid": 24, // 硫酸
  "oil=hydrogen+refinedOil": 16, // 氢 精炼油
  "oil=hydrogenOutput+refinedOil": 16, // 氢 精炼油
  "gravityMatrix=spaceWarper": 79, // 空间翘曲器
  "gravitonLens=spaceWarper": 78, // 空间翘曲器
  "titaniumAlloy+deuterium+superMagneticRing=deuteriumFuelRod": 41, // 氘核燃料棒
  "diamond+strangeMatter=gravitonLens": 101, // 引力透镜
  "stone=siliconOre": 34, // 硅石
  "ironOre=ironIngot": 1, // 铁块
  "ironIngot=steel": 63, // 钢材
  "titaniumOre=titaniumIngot": 65, // 钛块
  "copperOre=copperIngot": 3, // 铜块
  "ironOre=magnet": 2, // 磁铁
  "magnet+copperIngot=magneticCoil": 6, // 磁线圈
  "ironIngot+copperIngot=circuitBoard": 50, // 电路板
  "ironIngot=gear": 5, // 齿轮
  "coal=energeticGraphite": 17, // 高级石墨
  "refinedOil+hydrogen+coal=refinedOil": -1, // 精炼油
  "fireIce=hydrogen+graphene": 32, // 氢 石墨烯
  "fireIce=hydrogenOutput+graphene": 32, // 氢 石墨烯
  "stone=glass": 57, // 玻璃
  "glass=prism": 11, // 棱镜
  "siliconOre=highPuritySilicon": 59, // 高纯硅块
  "highPuritySilicon+copperIngot=microcrystallineComponent": 53, // 微晶元件
  "circuitBoard+microcrystallineComponent=processor": 51, // 处理器
  "energeticGraphite=diamond": 60, // 金刚石
  "refinedOil+energeticGraphite=plastic": 23, // 塑料
  "plastic+refinedOil+water=organicCrystal": 25, // 有机晶体
  "organicCrystal+titaniumIngot=titaniumCrystal": 26, // 钛晶石
  "highPuritySilicon=crystalSilicon": 37, // 晶格硅
  "stone=stoneBrick": 4, // 石材
  "ironIngot+gear+magneticCoil=electricMotor": 97, // 电动机
  "electricMotor+magneticCoil=electromagneticTurbine": 98, // 电磁涡轮
  "sulfuricAcid+energeticGraphite=graphene": 31, // 石墨烯
  "graphene+titaniumIngot=carbonNanotube": 33, // 碳纳米管
  "spiniformStalagmiteCrystal=carbonNanotube": 35, // 碳纳米管
  "carbonNanotube+crystalSilicon+plastic=particleBroadband": 36, // 粒子带宽
  "glass+titaniumIngot+water=titaniumGlass": 30, // 钛化玻璃
  "titaniumCrystal+graphene+hydrogen=casimirCrystal": 28, // 卡西米尔晶片
  "casimirCrystal+titaniumGlass=planeFilter": 38, // 位面过滤器
  "processor+planeFilter=quantumChip": 52, // 量子芯片
  "electromagneticTurbine+copperIngot+graphene=particleContainer": 99, // 粒子容器
  "electromagneticTurbine+magnet+energeticGraphite=superMagneticRing": 103, // 超级磁场环
  "titaniumIngot+steel+sulfuricAcid=titaniumAlloy": 66, // 钛合金
  "magneticCoil+prism=plasmaExciter": 12, // 电浆激发器
  "carbonNanotube+titaniumAlloy+highPuritySilicon=frameMaterial": 80, // 框架材料
  "prism+circuitBoard=photonCombiner": 68, // 光子合并器
  "graphene+photonCombiner=solarSail": 70, // 太阳帆
  "frameMaterial+solarSail+processor=dysonSphereComponent": 81, // 戴森球组件
  "dysonSphereComponent+deuteriumFuelRod+quantumChip=smallCarrierRocket": 83, // 小型运载火箭
  "coal=proliferatorMk1": 106, // 增产剂Mk.Ⅰ
  "proliferatorMk1+diamond=proliferatorMk2": 107, // 增产剂Mk.Ⅱ
  "proliferatorMk2+carbonNanotube=proliferatorMk3": 108, // 增产剂Mk.Ⅲ
  "opticalGratingCrystal+graphene+hydrogen=casimirCrystal": 29, // 卡西米尔晶片
  "unipolarMagnet+copperIngot=particleContainer": 100, // 粒子容器
  "kimberliteOre=diamond": 61, // 金刚石
  "fractalSilicon=crystalSilicon": 62, // 晶格硅
  "stoneBrick+steel=foundation": 112, // 地基
  "titaniumIngot+hydrogen=hydrogenFuelRod": 19, // 液氢燃料棒
  "ironIngot+magneticCoil=teslaTower": 8, // 电力感应塔
  "teslaTower+plasmaExciter=wirelessPowerTower": 13, // 无线输电塔
  "wirelessPowerTower+superMagneticRing+frameMaterial=satelliteSubstation": 73, // 卫星配电站
  "ironIngot+gear+magneticCoil=windTurbine": 7, // 风力涡轮机
  "ironIngot+stoneBrick+gear+magneticCoil=thermalPowerPlant": 64, // 火力发电机
  "ironIngot+gear=conveyorBeltMk1": 84, // 传送带
  "conveyorBeltMk1+electromagneticTurbine=conveyorBeltMk2": 89, // 高速传送带
  "conveyorBeltMk2+superMagneticRing+graphene=conveyorBeltMk3": 92, // 极速传送带
  "ironIngot+stoneBrick=storageMk1": 86, // 小型储物仓
  "steel+stoneBrick=storageMk2": 91, // 大型储物仓
  "highPuritySilicon+copperIngot+circuitBoard=solarPanel": 67, // 太阳能板
  "ironIngot+superMagneticRing+crystalSilicon=accumulator": 76, // 蓄电池
  "steel+highPuritySilicon+photonCombiner+processor+superMagneticRing=rayReceiver": 72, // 射线接收站
  "titaniumAlloy+superMagneticRing+carbonNanotube+processor=miniFusionPowerPlant": 113, // 微型聚变发电站
  "steel+titaniumAlloy+processor+particleContainer=energyExchanger": 77, // 能量枢纽
  "ironIngot+stoneBrick+glass=storageTank": 114, // 储液灌
  "ironIngot+circuitBoard=sorterMk1": 85, // 分拣器
  "sorterMk1+electricMotor=sorterMk2": 88, // 高速分拣器
  "sorterMk2+electromagneticTurbine=sorterMk3": 90, // 极速分拣器
  "ironIngot+circuitBoard+magneticCoil+gear=miningMachine": 48, // 采矿机
  "ironIngot+stoneBrick+electricMotor+circuitBoard=waterPump": 49, // 抽水机
  "steel+stoneBrick+circuitBoard+plasmaExciter=oilExtractor": 14, // 原油萃取站
  "steel+stoneBrick+circuitBoard+plasmaExciter=oilRefinery": 15, // 原油精炼厂
  "titaniumAlloy+frameMaterial+gravitonLens+quantumChip=verticalLaunchingSilo": 82, // 垂直发射井
  "ironIngot+gear+circuitBoard=splitter": 87, // 四向分流器
  "ironIngot+gear+glass+circuitBoard=trafficMonitor": 117, // 流速监测器
  "ironIngot+gear+circuitBoard=assemblingMachineMk1": 45, // 制作台Mk.Ⅰ
  "assemblingMachineMk1+graphene+processor=assemblingMachineMk2": 46, // 制作台Mk.Ⅱ
  "assemblingMachineMk2+particleBroadband+quantumChip=assemblingMachineMk3": 47, // 制作台Mk.Ⅲ
  "ironIngot+stoneBrick+circuitBoard+magneticCoil=arcSmelter": 56, // 电弧熔炉
  "arcSmelter+frameMaterial+planeFilter+unipolarMagnet=planeSmelter": 116, // 位面熔炉
  "steel+stoneBrick+glass+processor=fractionator": 110, // 分馏塔
  "steel+stoneBrick+glass+circuitBoard=chemicalPlant": 22, // 化工厂
  "chemicalPlant+titaniumGlass+strangeMatter+quantumChip=quantumChemicalPlant": 124, // 量子化工厂
  "ironIngot+glass+circuitBoard+magneticCoil=lab": 10, // 矩阵研究站
  "steel+gear+processor+superMagneticRing=emRailEjector": 71, // 电磁轨道弹射器
  "steel+titaniumIngot+processor+particleContainer=planetaryLogisticStation": 93, // 行星内物流运输站
  "ironIngot+plasmaExciter+processor=logisticsDistributor": 122, // 物流配送器
  "titaniumAlloy+frameMaterial+superMagneticRing+graphene+processor=miniatureParticleCollider": 39, // 微型粒子对撞机
  "planetaryLogisticStation+titaniumAlloy+particleContainer=interstellarLogisticStation": 95, // 星际物流运输站
  "titaniumAlloy+electromagneticTurbine=reinforcedThruster": 21, // 加力推进器
  "interstellarLogisticStation+superMagneticRing+reinforcedThruster+accumulatorFull=orbitalCollector": 111, // 轨道采集器
  "steel+copperIngot=thruster": 20, // 推进器
  "ironIngot+electromagneticTurbine+processor=logisticsBot": 123, // 配送运输机
  "ironIngot+processor+thruster=logisticDrone": 94, // 物流运输机
  "titaniumAlloy+processor+reinforcedThruster=logisticVessel": 96, // 星际物流运输机
  "opticalGratingCrystal+circuitBoard=photonCombiner": 69, // 光子合并器
  "steel+copperIngot+photonCombiner+superMagneticRing=geothermalPowerStation": 118, // 地热发电站
  "steel+gear+superMagneticRing+processor=autoPiler": 120, // 自动集装机
  "steel+plasmaExciter+circuitBoard+microcrystallineComponent=sprayCoater": 109, // 喷涂机
  "hydrogen+refinedOil=hydrogen+energeticGraphite": -1, // 氢 高级石墨
  "electromagneticMatrix+energyMatrix+structureMatrix+informationMatrix+gravityMatrix+antimatter=universeMatrix": 75, // 宇宙矩阵
  "accumulator=accumulatorFull": -1, // 蓄电池满
  "magneticCoil+circuitBoard=electromagneticMatrix": 9, // 蓝矩阵
  "energeticGraphite+hydrogen=energyMatrix": 18, // 红矩阵
  "diamond+titaniumCrystal=structureMatrix": 27, // 黄矩阵
  "processor+particleBroadband=informationMatrix": 55, // 紫矩阵
  "quantumChip+gravitonLens=gravityMatrix": 102, // 绿矩阵
  "hydrogen=deuterium": 40, // 重氢
  "particleContainer+ironIngot+deuterium=strangeMatter": 104, // 奇异物质
  "criticalPhoton=antimatter+hydrogen": 74, // 反物质 氢
  "criticalPhoton=antimatter+hydrogenOutput": 74, // 反物质 氢
  "particleContainer+processor=annihilationConstraintSphere": 42, // 湮灭约束球
  "antimatter+hydrogen+annihilationConstraintSphere+titaniumAlloy=antimatterFuelRod": 44, // 反物质燃烧棒
  "titaniumAlloy+frameMaterial+annihilationConstraintSphere+quantumChip=artificialStar": 43, // 人造恒星
  "titaniumAlloy+frameMaterial+superMagneticRing+quantumChip+opticalGratingCrystal=advancedMiningMachine": 119, // 大型采矿机
  "gravitonLens=criticalPhoton": 74, // 临界光子
  "hydrogen=deuterium+hydrogen": -1, // 重氢 氢
  "magneticCoil+copperIngot=动力引擎": 105, //动力引擎
  "coal=燃烧单元": 133, //燃烧单元
  "燃烧单元+plastic+sulfuricAcid=爆破单元": 134, //爆破单元
  "爆破单元+casimirCrystal+crystalSilicon=晶石爆破单元": 135, //晶石爆破单元
  "copperIngot=机枪弹箱": 136, //机枪弹箱
  "机枪弹箱+titaniumIngot=钛化弹箱": 137, //钛化弹箱
  "钛化弹箱+titaniumAlloy=超合金弹箱": 138, //超合金弹箱
  "copperIngot+circuitBoard+燃烧单元+动力引擎=导弹组": 144, //导弹组
  "导弹组+processor+爆破单元+thruster=超音速导弹组": 145, //超音速导弹组
  "超音速导弹组+晶石爆破单元+strangeMatter=引力导弹组": 146, //引力导弹组
  "copperIngot+燃烧单元=炮弹组": 139, //炮弹组
  "炮弹组+titaniumIngot+爆破单元=高爆炮弹组": 140, //高爆炮弹组
  "高爆炮弹组+titaniumAlloy+晶石爆破单元=晶石炮弹组": 141, //晶石炮弹组
  "ironIngot+动力引擎+circuitBoard+plasmaExciter=原型机": 147, //原型机
  "原型机+electromagneticTurbine+circuitBoard+photonCombiner=精准无人机": 148, //精准无人机
  "原型机+electromagneticTurbine+processor+particleContainer=攻击无人机": 149, //攻击无人机
  "titaniumAlloy+reinforcedThruster+processor+particleContainer=护卫舰": 150, //护卫舰
  "frameMaterial+reinforcedThruster+processor+strangeMatter=驱逐舰": 151, //驱逐舰
  "graphene+magnet+deuterium=等离子胶囊": 142, //等离子胶囊
  "等离子胶囊+particleContainer+hydrogen+antimatter=反物质胶囊": 143, //反物质胶囊
  "assemblingMachineMk3+物质重组器+能量碎片+quantumChip=重组式制造台": 154, //重组式制造台
  "lab+硅基神经元+能量碎片+quantumChip=自演化研究站": 153, //自演化研究站
  "planeSmelter+负熵奇点+能量碎片+quantumChip=负熵熔炉": 155, //负熵熔炉
  "ironIngot+gear+circuitBoard+magneticCoil=高斯机枪塔": 125, //高斯机枪塔
  "steel+electricMotor+circuitBoard+动力引擎=导弹防御塔": 129, //导弹防御塔
  "steel+electricMotor+circuitBoard+superMagneticRing=聚爆加农炮": 127, //聚爆加农炮
  "steel+plasmaExciter+circuitBoard+photonCombiner=高频激光塔": 126, //高频激光塔
  "titaniumAlloy+titaniumGlass+superMagneticRing+plasmaExciter+processor=磁化电浆炮": 128, //磁化电浆炮
  "steel+circuitBoard+microcrystallineComponent+动力引擎=战场分析基站": 152, //战场分析基站
  "wirelessPowerTower+steel+crystalSilicon=信号塔": 131, //信号塔
  "steel+electromagneticTurbine+superMagneticRing+particleContainer=行星护盾发生器": 132, //行星护盾发生器
  "antimatterFuelRod+核心素+strangeMatter+frameMaterial=奇异湮灭燃料棒": 156,//奇异湮灭燃料棒
};

class Blueprint {
  constructor(title, iconId, recipe, config) {
    // this.name = target.name
    this.recipe = recipe;
    this.buildingIndex = -1;
    this.blueprintSize = { x: 0, y: 0 };
    this.occupiedArea = [];
    this.buildings = [];
    // this.config = {
    //     maxSorterNumOneBelt: 8,  // 一个传送带节点连接的最大分拣器数量
    //     conveyorBeltStackLayer: 4,  // 传送带物品最大堆叠层数
    //     x_y_ratio: 2,  // 长宽比
    //     compactLayout: false,  // 是否采用紧凑布局（紧凑布局的蓝图中炼油厂、化工厂和对撞机在布局上会更紧凑，适合摆放在赤道带，在高纬度可能会出现碰撞问题）
    //     upgradeConveyorBelt: false,  // 360/min的运力时使用3级传送带（无带流情况下，原料的需求和供应都是集中处理，1级传送带满运力情况下可能会有运送不及时问题导致产量低于预期
    //     onlyConveyorBeltMk3: false,  // 是否只使用三级传送带
    //     onlySorterMk3: false,  // 是否只使用三级分拣器
    //     maxLabLayers: 15,  // 研究站最大层数
    //     selfSpray: true,  // 增产剂是否自喷涂
    // }
    this.config = config;
    this.buildingArray = [];
    this.sorters = {};
    this.sprayCoaterOffsetList = [];
    this.itemSummary = {};
    this.conveyorStartOffsetX = 0;
    this.lastProductionBuildingType = -1;
    this.blueprintTemplate = {
      header: {
        layout: 10,
        icons: iconId,
        time: new Date(),
        gameVersion: "0.9.26.13026",
        shortDesc: title,
        desc: "",
      },
      version: 1,
      cursorOffset: { x: 0, y: 0 },
      cursorTargetArea: 0,
      dragBoxSize: { x: 1, y: 1 },
      primaryAreaIdx: 0,
      areas: [
        {
          index: 0,
          parentIndex: -1,
          tropicAnchor: 0,
          areaSegments: 200,
          anchorLocalOffset: { x: 0, y: 0 },
          size: { x: 1, y: 1 },
          // size: this.blueprintSize
        },
      ],
      buildings: [],
    };
  }

  mapRecipeID() {
    for (let subRecipe of this.recipe.subRecipes) {
      if (!subRecipe.input) {
        // 原料
        continue;
      }
      let recipeStr = "";
      let isFirst = true;
      for (let item of subRecipe.input) {
        if (isFirst) {
          recipeStr = item.name;
          isFirst = false;
        } else {
          recipeStr += "+" + item.name;
        }
      }
      isFirst = true;
      for (let item of subRecipe.output) {
        if (isFirst) {
          recipeStr += "=" + item.name;
          isFirst = false;
        } else {
          recipeStr += "+" + item.name;
        }
      }
      if (!recipeMap[recipeStr] || recipeMap[recipeStr] === -1) {
        cocoMessage.warning(
          `包含不支持的配方: ${recipeStr.replace(
            "=",
            "->"
          )}，<br/>请排除对应物品（目前只支持通过(位面)熔炉、制造台、精炼厂、对撞机、（量子）化工厂、研究站六类生产设施进行制造的物品）`,
          5000
        );
        throw `unknown recipe - ${recipeStr} ${subRecipe}`;
      }
      subRecipe.recipeID = recipeMap[recipeStr];
    }
  }

  getBuildingTemplate() {
    this.buildingIndex++;
    return {
      index: this.buildingIndex,
      areaIndex: 0,
      localOffset: null,
      yaw: [0, 0],
      itemId: 0,
      modelIndex: 0,
      outputObjIdx: -1,
      inputObjIdx: -1,
      outputToSlot: 0,
      inputFromSlot: 0,
      outputFromSlot: 0,
      inputToSlot: 0,
      outputOffset: 0,
      inputOffset: 0,
      recipeId: 0,
      filterId: 0,
      parameters: null,
    };
  }

  newSprayCoater(offset, yaw) {
    // 在offset位置生成一个喷涂机， direction<0 表示沿y轴负方向，否则为y轴正方向
    let sc = this.getBuildingTemplate();
    sc.localOffset = [offset, offset];
    sc.yaw = yaw;
    sc.itemId = buildingMap.sprayCoater.itemId;
    sc.modelIndex = buildingMap.sprayCoater.modelIndex;
    sc.outputToSlot = 14;
    sc.inputFromSlot = 15;
    sc.outputFromSlot = 15;
    sc.inputToSlot = 14;
    return sc;
  }

  newConveyorNode(
    offset,
    yaw,
    conveyor,
    outputObjIdx,
    outputToSlot,
    parameters
  ) {
    return {
      index: ++this.buildingIndex,
      areaIndex: 0,
      localOffset: [offset, offset],
      yaw: yaw,
      itemId: conveyor.itemId,
      modelIndex: conveyor.modelIndex,
      outputObjIdx: outputObjIdx,
      inputObjIdx: -1,
      outputToSlot: outputToSlot,
      inputFromSlot: 0,
      outputFromSlot: 0,
      inputToSlot: 1,
      outputOffset: 0,
      inputOffset: 0,
      recipeId: 0,
      filterId: 0,
      parameters: parameters,
    };
  }

  newConveyor(
    conveyor,
    direction,
    inputData,
    outputData,
    parameters = null,
    needSprayCoater = false
  ) {
    // needSprayCoater = false
    // 在y轴方向生成一条长度为length的传送带, direction = -1 表示y轴负方向， 1表示y轴正方向
    if (conveyor.type !== buildingType.conveyor) {
      throw `newConveyor error: error conveyor - ${conveyor}`;
    }
    let nodeNum = 0;
    let buildingX = 0,
      buildingY = 0,
      buildingZ = 0;
    for (let i = 0; i < inputData.length; i++) {
      if (direction < 0) {
        // 输入带不需要处理input，在最后加一个节点即可
        break;
      }
      if (i === 0) {
        buildingX = this.occupiedArea[this.occupiedArea.length - 1].x2 + 1;
        buildingY = this.occupiedArea[this.occupiedArea.length - 2].y2 + 1;
        buildingZ = 0;
        this.occupiedArea[this.occupiedArea.length - 1].x2 += 1;
      } else {
        buildingY += 1;
      }
      let outputObjIdx = this.buildingIndex + 2;
      let outputToSlot = 1;
      this.buildings.push(
        this.newConveyorNode(
          { x: buildingX, y: buildingY, z: buildingZ },
          [0, 0],
          conveyor,
          outputObjIdx,
          outputToSlot,
          null
        )
      );
      nodeNum++;
      // 修改分拣器指向这个传送带节点
      let toChangeNum = inputData[i].length;
      for (let b of this.buildings) {
        if (toChangeNum <= 0) {
          break;
        }
        if (inputData[i].includes(b.index)) {
          b.outputObjIdx = this.buildingIndex;
          toChangeNum--;
        }
      }
    }
    let sprayCoaterOffset = {};
    if (needSprayCoater && direction > 0) {
      // 添加节点用于放置喷涂机
      // 为避免供料口被堵，喷涂机只放在第偶数个节点上
      if (nodeNum % 2 === 0) {
        this.buildings.push(
          this.newConveyorNode(
            { x: buildingX, y: ++buildingY, z: buildingZ },
            [0, 0],
            conveyor,
            this.buildingIndex + 2,
            1,
            null
          )
        );
      }
      sprayCoaterOffset = { x: buildingX, y: ++buildingY, z: buildingZ };
      this.sprayCoaterOffsetList.push({
        x: buildingX,
        y: buildingY - 1,
        z: buildingZ,
      });
      this.buildings.push(
        this.newConveyorNode(
          sprayCoaterOffset,
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
    }

    for (let i = 0; i < outputData.length; i++) {
      let outputObjIdx = -1;
      let outputToSlot = 0;
      if (direction < 0 && i === 0) {
        buildingX = this.occupiedArea[this.occupiedArea.length - 1].x2 + 1;
        buildingY = this.occupiedArea[this.occupiedArea.length - 2].y2 + 1;
        buildingZ = 0;
        this.occupiedArea[this.occupiedArea.length - 1].x2 += 1;
      } else {
        buildingY += 1;
      }
      if (!(direction > 0 && i === outputData.length - 1)) {
        if (!(direction < 0 && i === 0)) {
          outputObjIdx = this.buildingIndex + 1 + direction;
        }
      }
      let nodeParameters = null;
      if (direction > 0 && i === outputData.length - 1) {
        nodeParameters = parameters;
      }
      if (outputObjIdx !== -1) {
        outputToSlot = 1;
      }
      let nodeYaw = [0, 0];
      if (direction < 0) {
        nodeYaw = [180, 180];
      }
      this.buildings.push(
        this.newConveyorNode(
          { x: buildingX, y: buildingY, z: buildingZ },
          nodeYaw,
          conveyor,
          outputObjIdx,
          outputToSlot,
          nodeParameters
        )
      );
      nodeNum++;
      // 修改分拣器指向这个传送带节点
      let toChangeNum = outputData[i].length;
      for (let b of this.buildings) {
        if (toChangeNum <= 0) {
          break;
        }
        if (outputData[i].includes(b.index)) {
          b.inputObjIdx = this.buildingIndex;
          b.inputFromSlot = -1;
          toChangeNum--;
        }
      }
    }
    if (direction < 0) {
      // let outputObjIdx = this.buildingIndex
      if (needSprayCoater) {
        if (nodeNum % 2 === 0) {
          this.buildings.push(
            this.newConveyorNode(
              { x: buildingX, y: ++buildingY, z: buildingZ },
              [0, 0],
              conveyor,
              this.buildingIndex,
              1,
              null
            )
          );
        }
        sprayCoaterOffset = { x: buildingX, y: ++buildingY, z: buildingZ };
        this.sprayCoaterOffsetList.push({
          x: buildingX,
          y: buildingY + 1,
          z: buildingZ,
        });
        this.buildings.push(
          this.newConveyorNode(
            sprayCoaterOffset,
            [180, 180],
            conveyor,
            this.buildingIndex,
            1,
            null
          )
        );
        this.buildings.push(
          this.newConveyorNode(
            { x: buildingX, y: ++buildingY, z: buildingZ },
            [180, 180],
            conveyor,
            this.buildingIndex,
            1,
            null
          )
        );
      }
      this.buildings.push(
        this.newConveyorNode(
          { x: buildingX, y: ++buildingY, z: buildingZ },
          [180, 180],
          conveyor,
          this.buildingIndex,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          { x: buildingX, y: ++buildingY, z: buildingZ },
          [180, 180],
          conveyor,
          this.buildingIndex,
          1,
          parameters
        )
      );
    }
    if (needSprayCoater) {
      let sprayYaw = [0, 0];
      if (direction < 0) {
        sprayYaw = [180, 180];
      }
      this.buildings.push(this.newSprayCoater(sprayCoaterOffset, sprayYaw));
    }
  }

  calculateBuildingArea(subRecipe) {
    // 计算某个配方中单个生产建筑的占地面积
    if (!subRecipe.building) {
      return { area: 0, x: 0, y: 0, centerPoint: [0, 0, 0, 0] };
    }
    switch (buildingMap[subRecipe.building.name].category) {
      case productionCategory.smelter:
        if (subRecipe.output.length + subRecipe.input.length <= 2) {
          return {
            area: 12,
            x: 3,
            y: 4,
            centerPoint: [2, 1, 1, 1],
            yaw: [0, 0],
          }; // centerPoint中数值依次为中心点到y轴负边界、x轴正边界、y轴正边界和x轴负边界的距离
        } else {
          return {
            area: 16,
            x: 4,
            y: 4,
            centerPoint: [2, 2, 1, 1],
            yaw: [0, 0],
          };
        }
      case productionCategory.assembling:
        return { area: 16, x: 4, y: 4, centerPoint: [2, 2, 1, 1], yaw: [0, 0] };
      case productionCategory.plant:
        return { area: 48, x: 8, y: 6, centerPoint: [2, 4, 3, 3], yaw: [0, 0] };
      case productionCategory.refinery:
        if (this.config.compactLayout) {
          return {
            area: 30,
            x: 7,
            y: 5,
            centerPoint: [2, 3, 2, 3],
            yaw: [90, 90],
          };
        }
        return {
          area: 40,
          x: 8,
          y: 5,
          centerPoint: [2, 3, 2, 4],
          yaw: [90, 90],
        };
      case productionCategory.collider:
        if (this.config.compactLayout) {
          return {
            area: 66,
            x: 11,
            y: 6,
            centerPoint: [3, 5, 2, 5],
            yaw: [0, 0],
          };
        }
        return {
          area: 77,
          x: 11,
          y: 7,
          centerPoint: [3, 5, 3, 5],
          yaw: [0, 0],
        };
      case productionCategory.lab:
        return { area: 42, x: 7, y: 6, centerPoint: [3, 3, 2, 3], yaw: [0, 0] };
      default:
        throw `unknown production build type - ${
          buildingMap[subRecipe.building.name].type
        }`;
    }
  }

  calculateBlueprintArea() {
    let totalArea = 0;
    for (let subRecipe of this.recipe.subRecipes) {
      if (!subRecipe.building) {
        continue;
      }
      totalArea +=
        this.calculateBuildingArea(subRecipe).area *
        Math.ceil(subRecipe.building.num);
    }
    // console.log(`total area ${totalArea}`)
    let y = Math.ceil(Math.sqrt(totalArea / this.config.x_y_ratio));
    // let x = Math.ceil(Math.sqrt(totalArea))
    this.blueprintSize = {
      x: Math.ceil(this.config.x_y_ratio * y),
      y: y,
    };
    this.occupiedArea = [{ x1: -1, y1: -1, x2: this.blueprintSize.x, y2: -1 }];
  }

  calculateSorterLocalOffsetAndYaw(
    buildingOffset,
    type,
    slotIndex,
    rotate = 0
  ) {
    // rotate = 0 表示分拣器出货， 1 表示进货
    let data = {
      offset: [],
      yaw: [],
    };
    if (
      type === productionCategory.smelter ||
      type === productionCategory.assembling
    ) {
      switch (slotIndex) {
        case 8:
          data.offset = [
            { x: buildingOffset.x - 0.9, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x - 0.9, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 7:
          data.offset = [
            { x: buildingOffset.x, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 6:
          data.offset = [
            { x: buildingOffset.x + 0.9, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x + 0.9, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 5:
          data.offset = [
            { x: buildingOffset.x + 1, y: buildingOffset.y - 0.8, z: 0 },
            { x: buildingOffset.x + 2, y: buildingOffset.y - 0.8, z: 0 },
          ];
          data.yaw = [(90 + rotate * 180) % 360, (90 + rotate * 180) % 360];
          break;
        case 4:
          data.offset = [
            { x: buildingOffset.x + 1, y: buildingOffset.y, z: 0 },
            { x: buildingOffset.x + 2, y: buildingOffset.y, z: 0 },
          ];
          data.yaw = [(90 + rotate * 180) % 360, (90 + rotate * 180) % 360];
          break;
        case 3:
          data.offset = [
            { x: buildingOffset.x + 1, y: buildingOffset.y + 0.8, z: 0 },
            { x: buildingOffset.x + 2, y: buildingOffset.y + 0.8, z: 0 },
          ];
          data.yaw = [(90 + rotate * 180) % 360, (90 + rotate * 180) % 360];
          break;
        default:
          throw `calculateSorterLocalOffset error: unsupported slotIndex < 3 for smelter or assembling - ${slotIndex}`;
      }
    } else if (type === productionCategory.plant) {
      switch (slotIndex) {
        case 6:
          // data.offset = [{x: buildingOffset.x-1, y: buildingOffset.y-1, z: 0}, {x: buildingOffset.x-1, y: buildingOffset.y-2, z: 0}]
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 5:
          data.offset = [
            { x: buildingOffset.x, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 4:
          // data.offset = [{x: buildingOffset.x+1, y: buildingOffset.y-1, z: 0}, {x: buildingOffset.x+1, y: buildingOffset.y-2, z: 0}]
          data.offset = [
            { x: buildingOffset.x + 0.8, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x + 0.8, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 3:
          // data.offset = [{x: buildingOffset.x+2, y: buildingOffset.y-1, z: 0}, {x: buildingOffset.x+2, y: buildingOffset.y-2, z: 0}]
          data.offset = [
            { x: buildingOffset.x + 1.6, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x + 1.6, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [(180 + rotate * 180) % 360, (180 + rotate * 180) % 360];
          break;
        case 2:
          data.offset = [
            { x: buildingOffset.x + 0.8, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x + 0.8, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 1:
          data.offset = [
            { x: buildingOffset.x, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 0:
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        default:
          throw `unsupported: plant slot < 0`;
      }
    } else if (type === productionCategory.refinery) {
      switch (slotIndex) {
        case 8:
          data.offset = [
            { x: buildingOffset.x - 3, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x - 4, y: buildingOffset.y - 1, z: 0 },
          ];
          data.yaw = [(270 + rotate * 180) % 360, (270 + rotate * 180) % 360];
          break;
        case 7:
          data.offset = [
            { x: buildingOffset.x - 3, y: buildingOffset.y, z: 0 },
            { x: buildingOffset.x - 4, y: buildingOffset.y, z: 0 },
          ];
          data.yaw = [(270 + rotate * 180) % 360, (270 + rotate * 180) % 360];
          break;
        case 6:
          data.offset = [
            { x: buildingOffset.x - 3, y: buildingOffset.y + 1, z: 0 },
            { x: buildingOffset.x - 4, y: buildingOffset.y + 1, z: 0 },
          ];
          data.yaw = [(270 + rotate * 180) % 360, (270 + rotate * 180) % 360];
          break;
        case 5:
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 1, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 2, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 4:
          data.offset = [
            { x: buildingOffset.x, y: buildingOffset.y + 1, z: 0 },
            { x: buildingOffset.x, y: buildingOffset.y + 2, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 3:
          data.offset = [
            { x: buildingOffset.x + 0.8, y: buildingOffset.y + 1, z: 0 },
            { x: buildingOffset.x + 0.8, y: buildingOffset.y + 2, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 2:
          data.offset = [
            { x: buildingOffset.x + 0.8, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x + 0.8, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 1:
          data.offset = [
            { x: buildingOffset.x, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 0:
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 2, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        default:
          throw `unsupported: refinery slot < 0`;
      }
    } else if (type === productionCategory.collider) {
      switch (slotIndex) {
        case 8:
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 2, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y - 3, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 7:
          data.offset = [
            { x: buildingOffset.x - 1.6, y: buildingOffset.y - 2, z: 0 },
            { x: buildingOffset.x - 1.6, y: buildingOffset.y - 3, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 6:
          data.offset = [
            { x: buildingOffset.x - 2.4, y: buildingOffset.y - 2, z: 0 },
            { x: buildingOffset.x - 2.4, y: buildingOffset.y - 3, z: 0 },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 5:
          data.offset = [
            { x: buildingOffset.x - 4, y: buildingOffset.y - 1, z: 0 },
            { x: buildingOffset.x - 5, y: buildingOffset.y - 1, z: 0 },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 270) % 360),
          ];
          break;
        case 4:
          data.offset = [
            { x: buildingOffset.x - 4, y: buildingOffset.y, z: 0 },
            { x: buildingOffset.x - 5, y: buildingOffset.y, z: 0 },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 270) % 360),
          ];
          break;
        case 3:
          data.offset = [
            { x: buildingOffset.x - 4, y: buildingOffset.y + 1, z: 0 },
            { x: buildingOffset.x - 5, y: buildingOffset.y + 1, z: 0 },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 270) % 360),
          ];
          break;
        case 2:
          data.offset = [
            { x: buildingOffset.x - 2.4, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x - 2.4, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 1:
          data.offset = [
            { x: buildingOffset.x - 1.6, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x - 1.6, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        case 0:
          data.offset = [
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 2, z: 0 },
            { x: buildingOffset.x - 0.8, y: buildingOffset.y + 3, z: 0 },
          ];
          data.yaw = [(rotate * 180) % 360, (rotate * 180) % 360];
          break;
        default:
          throw `unsupported: collider slot < 0`;
      }
    } else if (type === productionCategory.lab) {
      switch (slotIndex) {
        case 11:
          data.offset = [
            {
              x: buildingOffset.x + 2,
              y: buildingOffset.y + 0.8,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x + 3,
              y: buildingOffset.y + 0.8,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [90 + ((rotate * 180) % 360), 90 + ((rotate * 180) % 360)];
          break;
        case 10:
          data.offset = [
            {
              x: buildingOffset.x + 2,
              y: buildingOffset.y,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x + 3,
              y: buildingOffset.y,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [90 + ((rotate * 180) % 360), 90 + ((rotate * 180) % 360)];
          break;
        case 9:
          data.offset = [
            {
              x: buildingOffset.x + 2,
              y: buildingOffset.y - 0.8,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x + 3,
              y: buildingOffset.y - 0.8,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [90 + ((rotate * 180) % 360), 90 + ((rotate * 180) % 360)];
          break;
        case 8:
          data.offset = [
            {
              x: buildingOffset.x + 0.8,
              y: buildingOffset.y - 2,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x + 0.8,
              y: buildingOffset.y - 3,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 7:
          data.offset = [
            {
              x: buildingOffset.x,
              y: buildingOffset.y - 2,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x,
              y: buildingOffset.y - 3,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 6:
          data.offset = [
            {
              x: buildingOffset.x - 0.8,
              y: buildingOffset.y - 2,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x - 0.8,
              y: buildingOffset.y - 3,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            180 + ((rotate * 180) % 360),
            180 + ((rotate * 180) % 360),
          ];
          break;
        case 5:
          data.offset = [
            {
              x: buildingOffset.x - 2,
              y: buildingOffset.y - 0.8,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x - 3,
              y: buildingOffset.y - 0.8,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 180) % 360),
          ];
          break;
        case 4:
          data.offset = [
            {
              x: buildingOffset.x - 2,
              y: buildingOffset.y,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x - 3,
              y: buildingOffset.y,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 180) % 360),
          ];
          break;
        case 3:
          data.offset = [
            {
              x: buildingOffset.x - 2,
              y: buildingOffset.y + 0.8,
              z: buildingOffset.z,
            },
            {
              x: buildingOffset.x - 3,
              y: buildingOffset.y + 0.8,
              z: buildingOffset.z,
            },
          ];
          data.yaw = [
            270 + ((rotate * 180) % 360),
            270 + ((rotate * 180) % 360),
          ];
          break;
        default:
          throw `unsupported: lab slot < 3`;
      }
    } else {
      throw `calculateSorterLocalOffset error: unsupported production category - ${type}`;
    }
    if (rotate === 1) {
      data.offset.reverse();
    }
    return data;
  }

  calculateTeslaTowerOffset(buildingOffset, category) {
    let offset = {};
    let distance = 0;
    switch (category) {
      case productionCategory.smelter:
        offset = { x: buildingOffset.x - 1, y: buildingOffset.y - 2, z: 0 };
        distance = 3;
        break;
      case productionCategory.assembling:
        offset = { x: buildingOffset.x + 2, y: buildingOffset.y - 2, z: 0 };
        distance = 3;
        break;
      case productionCategory.plant:
        offset = { x: buildingOffset.x + 3, y: buildingOffset.y - 2, z: 0 };
        distance = 7;
        break;
      case productionCategory.refinery:
        offset = { x: buildingOffset.x - 3, y: buildingOffset.y - 2, z: 0 };
        distance = 7;
        break;
      case productionCategory.collider:
        offset = { x: buildingOffset.x + 1, y: buildingOffset.y - 3, z: 0 };
        distance = 10;
        break;
      case productionCategory.lab:
        offset = { x: buildingOffset.x + 3, y: buildingOffset.y - 3, z: 0 };
        distance = 6;
        break;
      default:
        cocoMessage.error("未知的建筑类型", 4000);
        throw `unknown building category: ${category}`;
    }
    return {
      offset: offset,
      distance: distance,
    };
  }

  newProductionBuilding(subRecipe) {
    let hasTeslaTowerThisLine = false;
    let teslaTowerDistance = 0;
    for (let i = 0; i < subRecipe.building.num; i++) {
      this.buildingIndex++;
      this.lastProductionBuildingType =
        buildingMap[subRecipe.building.name].category;
      let buildingArea, buildingX, buildingY, buildingZ;
      buildingArea = this.calculateBuildingArea(subRecipe);
      // }
      let needNewLine = false;
      // console.log(this.occupiedArea)
      // console.log(this.blueprintSize)
      if (
        this.blueprintSize.x -
          this.occupiedArea[this.occupiedArea.length - 1].x2 >=
        buildingArea.x / 2
      ) {
        // 在当前行继续添加
        // this.buildingArray[this.buildingArray.length-1].push({index: this.buildingIndex, sorterList: sorterList})
        buildingX =
          this.occupiedArea[this.occupiedArea.length - 1].x2 +
          1 +
          buildingArea.centerPoint[3];
        buildingY =
          this.occupiedArea[this.occupiedArea.length - 2].y2 +
          1 +
          buildingArea.centerPoint[0];
        buildingZ = 0;
        this.occupiedArea[this.occupiedArea.length - 1].x2 += buildingArea.x;
        if (
          buildingY + buildingArea.centerPoint[2] >
          this.occupiedArea[this.occupiedArea.length - 1].y2
        ) {
          // 当一行中出现更宽（y轴方向为宽度）的建筑时，占地区域的y2需要更新
          this.occupiedArea[this.occupiedArea.length - 1].y2 =
            buildingY + buildingArea.centerPoint[2];
        }
      } else {
        // 新的一行
        needNewLine = true;
        hasTeslaTowerThisLine = false;
        teslaTowerDistance = 0;
        // this.buildingArray.push([{index: this.buildingIndex, sorterList: sorterList}])
        buildingX = buildingArea.centerPoint[3];
        buildingY =
          buildingArea.centerPoint[0] +
          this.occupiedArea[this.occupiedArea.length - 1].y2 +
          1;
        buildingZ = 0;
        this.occupiedArea.push({
          x1: 0,
          y1: buildingY - buildingArea.centerPoint[0],
          x2: buildingX + buildingArea.centerPoint[1],
          y2: buildingY + buildingArea.centerPoint[2],
        });
      }
      let acceleratorMode = 0;
      if (subRecipe.acceleratorMode === 1) {
        acceleratorMode = 1;
      }
      let newBuilding = {
        index: this.buildingIndex,
        areaIndex: 0,
        localOffset: [
          {
            x: buildingX,
            y: buildingY,
            z: buildingZ,
          },
          {
            x: buildingX,
            y: buildingY,
            z: buildingZ,
          },
        ],
        yaw: buildingArea.yaw,
        itemId: buildingMap[subRecipe.building.name].itemId,
        modelIndex: buildingMap[subRecipe.building.name].modelIndex,
        outputObjIdx: -1,
        inputObjIdx: -1,
        outputToSlot: 0,
        inputFromSlot: 0,
        outputFromSlot: 0,
        inputToSlot: 0,
        outputOffset: 0,
        inputOffset: 0,
        recipeId: parseInt(subRecipe.recipeID),
        filterId: 0,
        parameters: {
          acceleratorMode: acceleratorMode,
        },
      };

      let stackLabBuildingIndexList = [];
      let layers = 1;
      if (
        buildingMap[subRecipe.building.name].category === productionCategory.lab
      ) {
        // 堆叠处理研究站
        newBuilding.outputToSlot = 14;
        newBuilding.inputFromSlot = 15;
        newBuilding.outputFromSlot = 15;
        newBuilding.inputToSlot = 14;
        newBuilding.parameters.researchMode = 1;
        this.buildings.push(newBuilding);
        for (
          i++;
          i < subRecipe.building.num && layers < this.config.maxLabLayers;
          i++, layers++
        ) {
          let labBuilding = this.getBuildingTemplate();
          labBuilding.localOffset = [
            { x: buildingX, y: buildingY, z: buildingZ },
            { x: buildingX, y: buildingY, z: buildingZ },
          ];
          labBuilding.localOffset[0].z = buildingMap.lab.height * layers;
          labBuilding.localOffset[1].z = buildingMap.lab.height * layers;
          labBuilding.yaw = newBuilding.yaw;
          labBuilding.itemId = buildingMap[subRecipe.building.name].itemId;
          labBuilding.modelIndex = buildingMap[subRecipe.building.name].modelIndex;
          labBuilding.recipeId = parseInt(subRecipe.recipeID);
          labBuilding.inputObjIdx = this.buildingIndex - 1;
          labBuilding.outputToSlot = 14;
          labBuilding.inputFromSlot = 15;
          labBuilding.outputFromSlot = 15;
          labBuilding.inputToSlot = 14;
          labBuilding.parameters = {
            acceleratorMode: acceleratorMode,
            researchMode: 1,
          };
          this.buildings.push(labBuilding);
          stackLabBuildingIndexList.push(this.buildingIndex);
        }
        i--;
      } else {
        this.buildings.push(newBuilding);
      }
      const nowBuildingIndex = newBuilding.index;
      if (this.config.generateTeslaTower) {
        if (
          (this.config.teslaTowerLineInterval > 1 &&
            ((this.buildingArray.length &&
              this.buildingArray.length % 2 === 0) ||
              (needNewLine && this.buildingArray.length % 2 === 1))) ||
          (this.config.teslaTowerLineInterval === 1 &&
            this.buildingArray.length)
        ) {
          let teslaTowerOffset = this.calculateTeslaTowerOffset(
            { x: buildingX, y: buildingY, z: buildingZ },
            buildingMap[subRecipe.building.name].category
          );
          teslaTowerDistance += teslaTowerOffset.distance;
          if (
            (hasTeslaTowerThisLine &&
              teslaTowerDistance >= this.config.teslaTowerInterval) ||
            (!hasTeslaTowerThisLine &&
              teslaTowerDistance >= this.config.teslaTowerInterval / 2) ||
            (teslaTowerDistance >= this.config.teslaTowerInterval / 2 &&
              this.blueprintSize.x - buildingX < this.config.teslaTowerInterval)
          ) {
            // 生成电力感应塔
            let teslaTower = this.getBuildingTemplate();
            teslaTower.itemId = buildingMap.teslaTower.itemId;
            teslaTower.modelIndex = buildingMap.teslaTower.modelIndex;
            teslaTower.localOffset = [
              teslaTowerOffset.offset,
              teslaTowerOffset.offset,
            ];
            teslaTowerDistance = 0;
            hasTeslaTowerThisLine = true;
            this.buildingArray[this.buildingArray.length - 1].push({
              index: teslaTower.index,
              sorterList: [],
            });
            this.buildings.push(teslaTower);
          }
        }
      }

      // 添加分拣器
      let slotIndex = buildingMap[subRecipe.building.name].slotMaxIndex;
      let productionSpeed =
        buildingMap[subRecipe.building.name].productionSpeed;
      let sorterList = [];
      let actual_building_num = Math.min(1, subRecipe.building.num - i); // 建筑不是整数的时候，最后一个建筑分拣器实际rate会更低
      if (
        buildingMap[subRecipe.building.name].category === productionCategory.lab
      ) {
        actual_building_num += stackLabBuildingIndexList.length;
      }

      let extra_rate = 1;
      if (this.recipe.proliferator) {
        if (subRecipe.acceleratorMode === 0) {
          extra_rate += itemMap[this.recipe.proliferator].extra_rate;
        } else if (subRecipe.acceleratorMode === 1) {
          extra_rate += itemMap[this.recipe.proliferator].accelerate;
        }
      }

      for (let outputItem of subRecipe.output) {
        let actual_rate =
          outputItem.rate * productionSpeed * actual_building_num * extra_rate;
        let sorter = buildingMap.sorterMk1;
        if (this.config.onlySorterMk3 || actual_rate > sorter.sortingSpeed) {
          // 一级分拣器不够用时直接使用三级分拣器，二级分拣器没太大价值，直接略过
          sorter = buildingMap.sorterMk3;
        }
        if (
          subRecipe.building.name === buildingMap.lab.name &&
          actual_rate > buildingMap.sorterMk3.sortingSpeed
        ) {
          // 研究站层数过高时会出现一个3级分拣器无法满足运力的问题
          let newSorter2 = this.getBuildingTemplate();
          newSorter2.itemId = sorter.itemId;
          newSorter2.modelIndex = sorter.modelIndex;
          newSorter2.inputObjIdx = nowBuildingIndex;
          newSorter2.outputToSlot = -1;
          newSorter2.inputToSlot = 1;
          newSorter2.inputFromSlot = slotIndex - 3;
          newSorter2.filterId = itemMap[outputItem.name].iconId;
          newSorter2.parameters = { length: 1 };
          const offsetInfo2 = this.calculateSorterLocalOffsetAndYaw(
            { x: buildingX, y: buildingY, z: buildingZ },
            buildingMap[subRecipe.building.name].category,
            slotIndex - 3
          );
          newSorter2.localOffset = offsetInfo2.offset;
          newSorter2.yaw = offsetInfo2.yaw;
          this.buildings.push(newSorter2);
          sorterList.push(this.buildingIndex);
          if (this.sorters[outputItem.name]) {
            // 已存在就append
            if (this.sorters[outputItem.name].output) {
              this.sorters[outputItem.name].output.push({
                index: newSorter2.index,
                rate: buildingMap.sorterMk3.sortingSpeed,
                ownerObjIdx: nowBuildingIndex, // 分拣器附属生产建筑的index
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              });
            } else {
              this.sorters[outputItem.name].output = [
                {
                  index: newSorter2.index,
                  rate: buildingMap.sorterMk3.sortingSpeed,
                  ownerObjIdx: nowBuildingIndex,
                  ownerName: subRecipe.building.name,
                  ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
                },
              ];
            }
          } else {
            // 不存在就新建
            this.sorters[outputItem.name] = {
              output: [
                {
                  index: newSorter2.index,
                  rate: buildingMap.sorterMk3.sortingSpeed,
                  ownerObjIdx: nowBuildingIndex,
                  ownerName: subRecipe.building.name,
                  ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
                },
              ],
            };
          }
          actual_rate -= buildingMap.sorterMk3.sortingSpeed;
        }
        let newSorter = this.getBuildingTemplate();
        newSorter.itemId = sorter.itemId;
        newSorter.modelIndex = sorter.modelIndex;
        newSorter.inputObjIdx = nowBuildingIndex;
        newSorter.outputToSlot = -1;
        newSorter.inputToSlot = 1;
        newSorter.inputFromSlot = slotIndex;
        newSorter.filterId = itemMap[outputItem.name].iconId;
        newSorter.parameters = { length: 1 };
        const offsetInfo = this.calculateSorterLocalOffsetAndYaw(
          { x: buildingX, y: buildingY, z: buildingZ },
          buildingMap[subRecipe.building.name].category,
          slotIndex
        );
        newSorter.localOffset = offsetInfo.offset;
        newSorter.yaw = offsetInfo.yaw;
        this.buildings.push(newSorter);
        sorterList.push(this.buildingIndex);
        // this.buildingArray[this.buildingArray.length-1].push({index: this.buildingIndex, type: buildingType.sorter})
        if (this.sorters[outputItem.name]) {
          // 已存在就append
          if (this.sorters[outputItem.name].output) {
            this.sorters[outputItem.name].output.push({
              index: newSorter.index,
              rate: actual_rate,
              ownerObjIdx: nowBuildingIndex, // 分拣器附属生产建筑的index
              ownerName: subRecipe.building.name,
              ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
            });
          } else {
            this.sorters[outputItem.name].output = [
              {
                index: newSorter.index,
                rate: actual_rate,
                ownerObjIdx: nowBuildingIndex,
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              },
            ];
          }
        } else {
          // 不存在就新建
          this.sorters[outputItem.name] = {
            output: [
              {
                index: newSorter.index,
                rate: actual_rate,
                ownerObjIdx: nowBuildingIndex,
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              },
            ],
          };
        }
        slotIndex--;
        if (!this.config.compactLayout) {
          // 非紧凑布局，调整对撞机的分拣器连接点
          if (
            buildingMap[subRecipe.building.name].category ===
              productionCategory.collider &&
            slotIndex === 5
          ) {
            slotIndex = 2;
          }
        }
      }
      for (let inputItem of subRecipe.input) {
        let actual_rate =
          inputItem.rate * productionSpeed * actual_building_num;
        if (subRecipe.acceleratorMode === 1) {
          // 加速时原料也要加速；增产时则不需要
          actual_rate *= extra_rate;
        }
        let sorter = buildingMap.sorterMk1;
        if (this.config.onlySorterMk3 || actual_rate > sorter.sortingSpeed) {
          // 一级分拣器不够用时直接使用三级分拣器
          sorter = buildingMap.sorterMk3;
        }

        if (
          subRecipe.building.name === buildingMap.lab.name &&
          actual_rate > buildingMap.sorterMk3.sortingSpeed
        ) {
          // 研究站层数过高时会出现一个3级分拣器无法满足运力的问题
          let newSorter2 = this.getBuildingTemplate();
          newSorter2.itemId = sorter.itemId;
          newSorter2.modelIndex = sorter.modelIndex;
          newSorter2.inputObjIdx = nowBuildingIndex;
          newSorter2.outputToSlot = slotIndex - 3;
          newSorter2.inputToSlot = 1;
          newSorter2.filterId = itemMap[inputItem.name].iconId;
          newSorter2.parameters = { length: 1 };
          const offsetInfo2 = this.calculateSorterLocalOffsetAndYaw(
            { x: buildingX, y: buildingY, z: buildingZ },
            buildingMap[subRecipe.building.name].category,
            slotIndex - 3,
            1
          );
          newSorter2.localOffset = offsetInfo2.offset;
          newSorter2.yaw = offsetInfo2.yaw;
          this.buildings.push(newSorter2);
          sorterList.push(this.buildingIndex);
          if (this.sorters[inputItem.name]) {
            // 已存在就append
            if (this.sorters[inputItem.name].output) {
              this.sorters[inputItem.name].output.push({
                index: newSorter2.index,
                rate: buildingMap.sorterMk3.sortingSpeed,
                ownerObjIdx: nowBuildingIndex, // 分拣器附属生产建筑的index
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              });
            } else {
              this.sorters[inputItem.name].output = [
                {
                  index: newSorter2.index,
                  rate: buildingMap.sorterMk3.sortingSpeed,
                  ownerObjIdx: nowBuildingIndex,
                  ownerName: subRecipe.building.name,
                  ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
                },
              ];
            }
          } else {
            // 不存在就新建
            this.sorters[inputItem.name] = {
              output: [
                {
                  index: newSorter2.index,
                  rate: buildingMap.sorterMk3.sortingSpeed,
                  ownerObjIdx: nowBuildingIndex,
                  ownerName: subRecipe.building.name,
                  ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
                },
              ],
            };
          }
          actual_rate -= buildingMap.sorterMk3.sortingSpeed;
        }

        let newSorter = this.getBuildingTemplate();
        newSorter.itemId = sorter.itemId;
        newSorter.modelIndex = sorter.modelIndex;
        newSorter.outputObjIdx = nowBuildingIndex;
        newSorter.outputToSlot = slotIndex;
        newSorter.inputToSlot = 1;
        newSorter.filterId = itemMap[inputItem.name].iconId;
        newSorter.parameters = { length: 1 };
        const offsetInfo = this.calculateSorterLocalOffsetAndYaw(
          { x: buildingX, y: buildingY, z: buildingZ },
          buildingMap[subRecipe.building.name].category,
          slotIndex,
          1
        );
        newSorter.localOffset = offsetInfo.offset;
        newSorter.yaw = offsetInfo.yaw;
        this.buildings.push(newSorter);
        sorterList.push(this.buildingIndex);
        // this.buildingArray[this.buildingArray.length-1].push({index: this.buildingIndex, type: buildingType.sorter})
        if (this.sorters[inputItem.name]) {
          // 已存在就append
          if (this.sorters[inputItem.name].input) {
            this.sorters[inputItem.name].input.push({
              index: newSorter.index,
              rate: actual_rate,
              ownerObjIdx: nowBuildingIndex, // 分拣器附属生产建筑的index
              ownerName: subRecipe.building.name,
              ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
            });
          } else {
            this.sorters[inputItem.name].input = [
              {
                index: newSorter.index,
                rate: actual_rate,
                ownerObjIdx: nowBuildingIndex,
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              },
            ];
          }
        } else {
          // 不存在就新建
          this.sorters[inputItem.name] = {
            input: [
              {
                index: newSorter.index,
                rate: actual_rate,
                ownerObjIdx: nowBuildingIndex,
                ownerName: subRecipe.building.name,
                ownerOffset: { x: buildingX, y: buildingY, z: buildingZ },
              },
            ],
          };
        }
        slotIndex--;
        if (!this.config.compactLayout) {
          // 非紧凑布局，调整对撞机的分拣器连接点
          if (
            buildingMap[subRecipe.building.name].category ===
              productionCategory.collider &&
            slotIndex === 5
          ) {
            slotIndex = 2;
          }
        }
      }

      if (needNewLine) {
        // 新的一行
        this.buildingArray.push([
          { index: nowBuildingIndex, sorterList: sorterList },
        ]);
      } else {
        // 在当前行继续添加
        this.buildingArray[this.buildingArray.length - 1].push({
          index: nowBuildingIndex,
          sorterList: sorterList,
        });
      }
      for (let labIndex of stackLabBuildingIndexList) {
        // 把堆叠的研究站加进去
        this.buildingArray[this.buildingArray.length - 1].push({
          index: labIndex,
          sorterList: [],
        });
      }
    }
  }

  init() {
    this.mapRecipeID();
    this.calculateBlueprintArea();
    if (this.config.onlyConveyorBeltMk3Downgrade) {
      buildingMap.conveyorBeltMK3.transportSpeed = 28;
    } else {
      buildingMap.conveyorBeltMK3.transportSpeed = 30;
    }
    // console.log(buildingMap)
    // this.blueprintTemplate.areas[0].size = this.blueprintSize
  }

  sortItemSummary(itemSummary) {
    // 排序，增产剂(取最高等级)、原料、终产物、多余产物(精炼油、氢、石墨烯、重氢)、其余中间产物
		let newSummary = {};
		let proliferator = ['proliferatorMk3', 'proliferatorMk2', 'proliferatorMk1'];
		let outItem = ['refinedOil', 'hydrogen', 'graphene', 'deuterium'];
		for (let key in proliferator) {
			if (itemSummary[proliferator[key]] && itemSummary[proliferator[key]].toBuildingNum === 0) {
				newSummary[proliferator[key]] = itemSummary[proliferator[key]];
				break;
			}
		}
		for (let key in itemSummary) {
			if (itemSummary[key].fromBuildingNum === 0) {
				newSummary[key] = itemSummary[key];
			}
		}
		for (let key in itemSummary) {
			if (itemSummary[key].toBuildingNum === 0) {
				newSummary[key] = itemSummary[key];
			}
		}
		for (let key in outItem) {
			if (itemSummary[outItem[key]] &&
				itemSummary[outItem[key]].fromBuildingNum - itemSummary[outItem[key]].toBuildingNum > 0) {
				newSummary[outItem[key]] = itemSummary[outItem[key]];
			}
		}
		for (let key in itemSummary) {
			if (itemSummary[key].toBuildingNum !== 0 && itemSummary[key].fromBuildingNum !== 0) {
				newSummary[key] = itemSummary[key];
			}
		}
		return newSummary;
  }

  generateConveyorBelts() {
    let itemSummary = {};
    // 计算物料统计信息，每个物料的产出速率、从多少个建筑产出、供给多少个建筑使用
    for (let subRecipe of this.recipe.subRecipes) {
      let extra_rate = 1;
      if (this.recipe.proliferator) {
        if (subRecipe.acceleratorMode === 0) {
          extra_rate += itemMap[this.recipe.proliferator].extra_rate;
        } else if (subRecipe.acceleratorMode === 1) {
          extra_rate += itemMap[this.recipe.proliferator].accelerate;
        }
      }
      for (let outputItem of subRecipe.output) {
        let outputRate = 0;
        let fromBuildingNum = 0;
        if (subRecipe.input === null) {
          outputRate = outputItem.rate;
        } else {
          if (subRecipe.building.name === buildingMap.lab.name) {
            // 研究站可堆叠，需特殊处理
            fromBuildingNum = Math.ceil(
              subRecipe.building.num / this.config.maxLabLayers
            );
          } else {
            fromBuildingNum = subRecipe.building.num;
          }
          outputRate =
            outputItem.rate *
            buildingMap[subRecipe.building.name].productionSpeed *
            subRecipe.building.num *
            extra_rate;
        }
        if (itemSummary[outputItem.name]) {
          itemSummary[outputItem.name].fromBuildingNum += fromBuildingNum;
          itemSummary[outputItem.name].rate += outputRate;
        } else {
          itemSummary[outputItem.name] = {
            rate: outputRate,
            fromBuildingNum: fromBuildingNum,
            toBuildingNum: 0,
          };
        }
      }
      if (subRecipe.input === null) {
        continue;
      }
      for (let inputItem of subRecipe.input) {
        let toBuildingNum = 0;
        if (subRecipe.building.name === buildingMap.lab.name) {
          toBuildingNum = Math.ceil(
            subRecipe.building.num / this.config.maxLabLayers
          );
        } else {
          toBuildingNum = subRecipe.building.num;
        }
        if (itemSummary[inputItem.name]) {
          itemSummary[inputItem.name].toBuildingNum += toBuildingNum;
          if (
            !itemSummary[inputItem.name].needProliferator &&
            subRecipe.acceleratorMode !== -1
          ) {
            itemSummary[inputItem.name].needProliferator = true;
          }
          if (subRecipe.acceleratorMode === 1) {
            // 加速时原料额外消耗
            itemSummary[inputItem.name].inputRate +=
              inputItem.rate *
              buildingMap[subRecipe.building.name].productionSpeed *
              subRecipe.building.num *
              extra_rate;
          } else {
            // 无增产剂或增产时原料速率不变
            itemSummary[inputItem.name].inputRate +=
              inputItem.rate *
              buildingMap[subRecipe.building.name].productionSpeed *
              subRecipe.building.num;
          }
        } else {
          let itemInputRate =
            inputItem.rate *
            buildingMap[subRecipe.building.name].productionSpeed *
            subRecipe.building.num;
          if (subRecipe.acceleratorMode === 1) {
            itemInputRate *= extra_rate;
          }
          let needProliferator = false;
          if (subRecipe.acceleratorMode !== -1) {
            needProliferator = true;
          }
          itemSummary[inputItem.name] = {
            rate: 0,
            inputRate: itemInputRate,
            fromBuildingNum: 0,
            toBuildingNum: toBuildingNum,
            needProliferator: needProliferator,
          };
        }
      }
    }
    for (let key in itemSummary) {
      // rate为0（rate是按output计算的）但inputRate不为0，说明该物品是被排除的中间产物， 把inputRate赋值给rate，生成蓝图时该产物就会被当作原料
      if (itemSummary[key].rate === 0 && itemSummary[key].inputRate !== 0) {
        itemSummary[key].rate = itemSummary[key].inputRate;
      }
    }
    // console.log(itemSummary)
    // throw `break`
    itemSummary = this.sortItemSummary(itemSummary);
    this.itemSummary = itemSummary;

    this.conveyorStartOffsetX =
      this.occupiedArea[this.occupiedArea.length - 1].x2;
    this.occupiedArea[this.occupiedArea.length - 1].x2++; // x轴方向空一格用于喷涂剂走线
    this.occupiedArea[this.occupiedArea.length - 2].y2++; // y轴方向空一格避免喷涂机和建筑碰撞
    // 生成传送带并连接到分拣器
    const zero = 0.0000000001; // rate是每秒生产量，除不尽时会有精度误差，小数点后16位都是准确的，取0.0000000001为判断标准足够了。
    for (let item in itemSummary) {
      const itemName = item;
      // console.log(itemName)
      item = itemSummary[item];

      let conveyorBelt = buildingMap.conveyorBeltMk1;
      if (this.config.onlyConveyorBeltMk3) {
        conveyorBelt = buildingMap.conveyorBeltMK3;
      } else if (item.rate >= conveyorBelt.transportSpeed) {
        if (
          item.rate === conveyorBelt.transportSpeed &&
          this.config.upgradeConveyorBelt
        ) {
          conveyorBelt = buildingMap.conveyorBeltMK3; // 直接使用三级传送带，跳过二级
        } else if (item.rate > conveyorBelt.transportSpeed) {
          conveyorBelt = buildingMap.conveyorBeltMK3;
        }
      }

      let maxTransportSpeed = buildingMap.conveyorBeltMK3.transportSpeed;
      if (item.fromBuildingNum === 0) {
        // 只有原料可以堆叠，中间产物不支持堆叠
        maxTransportSpeed =
          buildingMap.conveyorBeltMK3.transportSpeed *
          this.config.conveyorBeltStackLayer;
      }

      for (let totalDoneRate = 0; item.rate - totalDoneRate > zero; ) {
        let needSprayCoater = item.needProliferator;
        let doneRate = 0;
        let parameters = null;
        let inputRate = Math.min(maxTransportSpeed, item.rate - totalDoneRate);
        let inputData = [];
        let outputData = [];
        let doneSorterNum = 0;
        if (item.fromBuildingNum !== 0) {
          for (let j = this.sorters[itemName].output.length - 1; j >= 0; j--) {
            if (this.sorters[itemName].output[j].rate - inputRate > zero) {
              // if ((j>0)&&(i+1 >= Math.ceil(item.rate/maxTransportSpeed))){
              //     // 有分拣器还未连接 并且 不会再生成新的传送带了
              //     // 这种情况就是建筑非整数时计算误差导致的，继续处理未连接的分拣器就可以了

              // 当前带接受运力不能满足分拣器，则该分拣器连接下一个带上的节点
              break;
            }
            if (doneSorterNum % this.config.maxSorterNumOneBelt === 0) {
              inputData.push([this.sorters[itemName].output[j].index]);
            } else {
              inputData[inputData.length - 1].push(
                this.sorters[itemName].output[j].index
              );
            }
            inputRate -= this.sorters[itemName].output[j].rate;
            doneRate += this.sorters[itemName].output[j].rate;
            this.sorters[itemName].output.pop();
            doneSorterNum++;
          }
        } else {
          // 说明是原料
          inputData.push([]);
          parameters = {
            iconId: itemMap[itemName].iconId,
            count: (inputRate * 60).toFixed(0),
          };
          doneRate += inputRate;
          // inputRate = 0
        }
        totalDoneRate += doneRate;
        let outputRate = doneRate; // 当前传送带实际运力
        doneSorterNum = 0;
        if (item.toBuildingNum !== 0) {
          for (let j = this.sorters[itemName].input.length - 1; j >= 0; j--) {
            if (
              totalDoneRate + zero < item.rate &&
              outputRate + zero < this.sorters[itemName].input[j].rate
            ) {
              // 当前带输出运力不能满足分拣器且还会生成新的传送带，则传送带新增一个节点单独该分拣器连接上，同时给对应建筑增加一个分拣器连到下一个节点
              // console.log(`${itemName}: need add sorter`)
              outputData.push([this.sorters[itemName].input[j].index]);
              const newSorterRate =
                this.sorters[itemName].input[j].rate - outputRate;
              let sorter = buildingMap.sorterMk1;
              if (this.config.onlySorterMk3 || newSorterRate > sorter.sortingSpeed) {
                // 一级分拣器不够用时直接使用三级分拣器，先不支持二级分拣器
                sorter = buildingMap.sorterMk3;
              }
              let newSorter = this.getBuildingTemplate();
              // console.log(`new sorter: ${newSorter.index}`)
              newSorter.itemId = sorter.itemId;
              newSorter.modelIndex = sorter.modelIndex;
              newSorter.outputObjIdx =
                this.sorters[itemName].input[j].ownerObjIdx;
              if (
                [
                  productionCategory.assembling,
                  productionCategory.smelter,
                  productionCategory.lab,
                ].includes(
                  buildingMap[this.sorters[itemName].input[j].ownerName]
                    .category
                )
              ) {
                // 熔炉、制造台和研究站追加到3号槽位
                newSorter.outputToSlot = 3;
              } else if (
                buildingMap[this.sorters[itemName].input[j].ownerName]
                  .category === productionCategory.collider
              ) {
                newSorter.outputToSlot = 2;
              } else {
                // 其他追加到0号槽位
                newSorter.outputToSlot = 0;
              }
              newSorter.inputToSlot = 1;
              newSorter.parameters = { length: 1 };
              const offsetInfo = this.calculateSorterLocalOffsetAndYaw(
                this.sorters[itemName].input[j].ownerOffset,
                buildingMap[this.sorters[itemName].input[j].ownerName].category,
                newSorter.outputToSlot,
                1
              );
              newSorter.localOffset = offsetInfo.offset;
              newSorter.yaw = offsetInfo.yaw;
              // console.log(newSorter)
              this.buildings.push(newSorter);
              // console.log(`add sorter for ${this.sorters[itemName].input[j].ownerObjIdx}`)
              let startMove = false;
              let findTargetBuilding = false;
              for (let i = 0; i < this.buildingArray.length; i++) {
                for (let k = 0; k < this.buildingArray[i].length; k++) {
                  if (
                    this.buildingArray[i][k].index ===
                    this.sorters[itemName].input[j].ownerObjIdx
                  ) {
                    this.buildingArray[i][k].sorterList.push(newSorter.index);
                    findTargetBuilding = true;
                    if (
                      buildingMap[this.sorters[itemName].input[j].ownerName]
                        .category === productionCategory.smelter &&
                      this.buildingArray[i][k].sorterList.length === 3
                    ) {
                      // 熔炉加入新分拣器后分拣器总数为3，则之前分拣器总数为2，需要扩展熔炉侧边空间，即对后续建筑进行建筑位移
                      startMove = true;
                    } else {
                      break;
                    }
                  } else if (startMove) {
                    // move building and sorters
                    let toMoveNum =
                      1 + this.buildingArray[i][k].sorterList.length;
                    for (let b of this.buildings) {
                      if (b.index === this.buildingArray[i][k].index) {
                        // console.log(`move ${b.index}`)
                        b.localOffset[0].x += 1;
                        b.localOffset[1].x += 1;
                        toMoveNum--;
                      } else if (
                        this.buildingArray[i][k].sorterList.includes(b.index)
                      ) {
                        b.localOffset[0].x += 1;
                        b.localOffset[1].x += 1;
                        toMoveNum--;
                      }
                      if (toMoveNum <= 0) {
                        break;
                      }
                    }
                  }
                }
                if (findTargetBuilding) {
                  break;
                }
              }
              this.sorters[itemName].input.unshift({
                index: newSorter.index,
                rate: newSorterRate,
                ownerObjIdx: this.sorters[itemName].input[j].ownerObjIdx,
                ownerName: this.sorters[itemName].input[j].ownerName,
                ownerOffset: this.sorters[itemName].input[j].ownerOffset,
              });
              this.sorters[itemName].input.pop();
              break;
            }

            if (doneSorterNum % this.config.maxSorterNumOneBelt === 0) {
              outputData.push([this.sorters[itemName].input[j].index]);
            } else {
              outputData[outputData.length - 1].push(
                this.sorters[itemName].input[j].index
              );
            }
            outputRate -= this.sorters[itemName].input[j].rate;
            this.sorters[itemName].input.pop();
            doneSorterNum++;
            if (outputRate <= 0) {
              if (j > 0 && totalDoneRate >= item.rate) {
                // 有分拣器还未连接 并且 不会再生成新的传送带了
                // 这种情况就是建筑非整数时计算误差导致的，继续处理未连接的分拣器就可以了
                continue;
              }
              break;
            }
          }
        } else {
          // 说明是终产物
          outputData.push([]);
          parameters = {
            iconId: itemMap[itemName].iconId,
            count: (outputRate * 60).toFixed(0),
          };
          needSprayCoater = false;
        }

        let direction = 1; // 表示传送带方向沿y轴正方向，用于终产物和中间产物
        if (item.fromBuildingNum === 0) {
          direction = -1; // y轴负方向，用于原料
        }
        // console.log(itemName, inputData, outputData, direction)
        this.newConveyor(
          conveyorBelt,
          direction,
          inputData,
          outputData,
          parameters,
          needSprayCoater
        );
      }
    }
  }

  generateBuildings() {
    for (let subRecipe of this.recipe.subRecipes) {
      if (subRecipe.building === null) {
        continue;
      }
      this.newProductionBuilding(subRecipe);
    }
  }

  generateConveyorBeltsForSprayCoater() {
    if (this.sprayCoaterOffsetList.length === 0) {
      return;
    }
    let conveyor = buildingMap.conveyorBeltMk1;
    if (this.config.onlyConveyorBeltMk3) {
      conveyor = buildingMap.conveyorBeltMK3;
    } else if (
      this.itemSummary[this.recipe.proliferator] &&
      this.itemSummary[this.recipe.proliferator].rate > conveyor.transportSpeed
    ) {
      conveyor = buildingMap.conveyorBeltMK3;
    } else if (!this.itemSummary[this.recipe.proliferator]) {
      conveyor = buildingMap.conveyorBeltMK3;
    }
    let firstSprayOffset = this.sprayCoaterOffsetList[0];
    for (let spray of this.sprayCoaterOffsetList) {
      if (spray.y > firstSprayOffset.y) {
        firstSprayOffset = spray;
        continue;
      }
      if (spray.y === firstSprayOffset.y && spray.x < firstSprayOffset.x) {
        firstSprayOffset = spray;
      }
    }
    // console.log(this.sprayCoaterOffsetList)
    // console.log(firstSprayOffset)

    let proliferatorParameters = {
      iconId: itemMap[this.recipe.proliferator].iconId,
    };

    if (this.config.selfSpray) {
      // 生成自喷涂结构
      let selfSprayConveyorStartOffset = {
        x: firstSprayOffset.x,
        y: firstSprayOffset.y,
        z: firstSprayOffset.z,
      };
      switch (this.lastProductionBuildingType) {
        case productionCategory.lab:
        case productionCategory.collider:
          selfSprayConveyorStartOffset.y += 2;
          break;
        case productionCategory.plant:
          selfSprayConveyorStartOffset.y += 1;
          break;
        default:
          break;
      }
      this.buildings.push(
        this.newSprayCoater(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 4,
            z: 0,
          },
          [0, 0]
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 6,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          proliferatorParameters
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 5,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 4,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 3,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 2,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 2,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 3,
            z: 0,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 4,
            z: 0.5,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 5,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 6,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 6,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX,
            y: selfSprayConveyorStartOffset.y + 6,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX,
            y: selfSprayConveyorStartOffset.y + 5,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX,
            y: selfSprayConveyorStartOffset.y + 4,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX,
            y: selfSprayConveyorStartOffset.y + 3,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 3,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 3,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 2,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 2,
            y: selfSprayConveyorStartOffset.y + 1,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      this.buildings.push(
        this.newConveyorNode(
          {
            x: this.conveyorStartOffsetX - 1,
            y: selfSprayConveyorStartOffset.y + 1,
            z: 1,
          },
          [0, 0],
          conveyor,
          this.buildingIndex + 2,
          1,
          null
        )
      );
      for (
        let i = 0;
        i < selfSprayConveyorStartOffset.x - this.conveyorStartOffsetX;
        i++
      ) {
        this.buildings.push(
          this.newConveyorNode(
            {
              x: this.conveyorStartOffsetX + i,
              y: selfSprayConveyorStartOffset.y + 1,
              z: 1,
            },
            [0, 0],
            conveyor,
            this.buildingIndex + 2,
            1,
            null
          )
        );
      }
      for (
        let i = 0;
        i < selfSprayConveyorStartOffset.y - firstSprayOffset.y;
        i++
      ) {
        this.buildings.push(
          this.newConveyorNode(
            {
              x: selfSprayConveyorStartOffset.x - 1,
              y: selfSprayConveyorStartOffset.y - i,
              z: 1,
            },
            [0, 0],
            conveyor,
            this.buildingIndex + 2,
            1,
            null
          )
        );
      }
      proliferatorParameters = null;
    }
    this.buildings.push(
      this.newConveyorNode(
        { x: firstSprayOffset.x - 1, y: firstSprayOffset.y, z: 1 },
        [0, 0],
        conveyor,
        this.buildingIndex + 2,
        1,
        proliferatorParameters
      )
    );
    this.buildings.push(
      this.newConveyorNode(
        { x: firstSprayOffset.x, y: firstSprayOffset.y, z: 1 },
        [0, 0],
        conveyor,
        this.buildingIndex + 2,
        1,
        null
      )
    );
    let doneNum = 1;
    let nowSpray = firstSprayOffset;
    let direction = 1;
    while (doneNum < this.sprayCoaterOffsetList.length) {
      for (let spray of this.sprayCoaterOffsetList) {
        if (spray.y === nowSpray.y) {
          if (direction === 1) {
            // x 轴正向
            if (spray.x > nowSpray.x) {
              for (let x = nowSpray.x + 1; x <= spray.x; x++) {
                // console.log({x: x, y: nowSpray.y, z: 1})
                this.buildings.push(
                  this.newConveyorNode(
                    { x: x, y: nowSpray.y, z: 1 },
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
              nowSpray = spray;
              doneNum++;
            }
          } else {
            // x 轴负向
            if (spray.x < nowSpray.x) {
              for (let x = nowSpray.x - 1; x >= spray.x; x--) {
                // console.log({x: x, y: nowSpray.y, z: 1})
                this.buildings.push(
                  this.newConveyorNode(
                    { x: x, y: nowSpray.y, z: 1 },
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
              nowSpray = spray;
              doneNum++;
            }
          }
        }
      }
      if (doneNum === this.sprayCoaterOffsetList.length) {
        break;
      }

      let findNext = false;
      this.sprayCoaterOffsetList.reverse();
      for (let delta = 2; !findNext; delta += 2) {
        if (delta > nowSpray.y) {
          cocoMessage.error("喷涂剂排线错误", 4000);
          throw `generate sprayCoater error`;
        }
        for (let spray of this.sprayCoaterOffsetList) {
          if (spray.y === nowSpray.y - delta) {
            let lastNodeOffset = nowSpray;
            if (direction === 1 && spray.x > nowSpray.x) {
              for (let x = nowSpray.x + 1; x <= spray.x; x++) {
                lastNodeOffset = { x: x, y: nowSpray.y, z: 1 };
                // console.log(lastNodeOffset)
                this.buildings.push(
                  this.newConveyorNode(
                    lastNodeOffset,
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
            } else if (direction === -1 && spray.x < nowSpray.x) {
              for (let x = nowSpray.x - 1; x >= spray.x; x--) {
                lastNodeOffset = { x: x, y: nowSpray.y, z: 1 };
                // console.log(lastNodeOffset)
                this.buildings.push(
                  this.newConveyorNode(
                    lastNodeOffset,
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
            }
            lastNodeOffset = {
              x: lastNodeOffset.x + direction,
              y: lastNodeOffset.y,
              z: 1,
            };
            this.buildings.push(
              this.newConveyorNode(
                lastNodeOffset,
                [0, 0],
                conveyor,
                this.buildingIndex + 2,
                1,
                null
              )
            );
            for (let i = 1; i <= delta; i++) {
              lastNodeOffset = { x: lastNodeOffset.x, y: nowSpray.y - i, z: 1 };
              this.buildings.push(
                this.newConveyorNode(
                  lastNodeOffset,
                  [0, 0],
                  conveyor,
                  this.buildingIndex + 2,
                  1,
                  null
                )
              );
            }
            lastNodeOffset = { x: lastNodeOffset.x, y: lastNodeOffset.y, z: 1 };
            if (direction === -1 && spray.x > lastNodeOffset.x + 1) {
              for (let x = lastNodeOffset.x + 1; x < spray.x; x++) {
                this.buildings.push(
                  this.newConveyorNode(
                    { x: x, y: lastNodeOffset.y, z: 1 },
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
            } else if (direction === 1 && spray.x < lastNodeOffset.x - 1) {
              for (let x = lastNodeOffset.x - 1; x > spray.x; x--) {
                this.buildings.push(
                  this.newConveyorNode(
                    { x: x, y: lastNodeOffset.y, z: 1 },
                    [0, 0],
                    conveyor,
                    this.buildingIndex + 2,
                    1,
                    null
                  )
                );
              }
            }
            this.buildings.push(
              this.newConveyorNode(
                { x: spray.x, y: spray.y, z: 1 },
                [0, 0],
                conveyor,
                this.buildingIndex + 2,
                1,
                null
              )
            );
            doneNum++;
            nowSpray = spray;
            findNext = true;
            break;
          }
        }
      }
      // console.log(`next spray ${nowSpray}`)

      // console.log({x: nowSpray.x+direction, y: nowSpray.y, z: 1})
      direction = -direction;
      // break
    }
    this.buildings.push(
      this.newConveyorNode(
        { x: nowSpray.x + direction, y: nowSpray.y, z: 1 },
        [0, 0],
        conveyor,
        -1,
        -1,
        null
      )
    );
  }

  toStr() {
    // convert blueprint from json format to string
    // original author https://github.com/huww98/dsp_blueprint_editor
    let allAssemblers = new Set([
      // 如果要追加支持新建筑，就在这里追加对应建筑的id
      2303,
      2304,
      2305,
      2302,
      2315,
      2308,
      2309,
      2310,
      2317, // 追加量子化工厂
      2318, // 重组式制造台
      2319, // 负熵熔炉
      2902, // 自演化研究站
    ]);
    const K = Int32Array.of(
      0xd76aa478,
      0xe8d7b756,
      0x242070db,
      0xc1bdceee,
      0xf57c0faf,
      0x4787c62a,
      0xa8304623,
      0xfd469501,
      0x698098d8,
      0x8b44f7af,
      0xffff5bb1,
      0x895cd7be,
      0x6b9f1122,
      0xfd987193,
      0xa679438e,
      0x39b40821,
      0xf61e2562,
      0xc040b340,
      0x265e5a51,
      0xc9b6c7aa,
      0xd62f105d,
      0x02443453,
      0xd8a1e681,
      0xe7d3fbc8,
      0x21f1cde6,
      0xc33707d6,
      0xf4d50d87,
      0x475a14ed,
      0xa9e3e905,
      0xfcefa3f8,
      0x676f02d9,
      0x8d2a4c8a,
      0xfffa3942,
      0x8771f681,
      0x6d9d6122,
      0xfde5380c,
      0xa4beea44,
      0x4bdecfa9,
      0xf6bb4b60,
      0xbebfbc70,
      0x289b7ec6,
      0xeaa127fa,
      0xd4ef3085,
      0x04881d05,
      0xd9d4d039,
      0xe6db99e5,
      0x1fa27cf8,
      0xc4ac5665,
      0xf4292244,
      0x432aff97,
      0xab9423a7,
      0xfc93a039,
      0x655b59c3,
      0x8f0ccc92,
      0xffeff47d,
      0x85845dd1,
      0x6fa87e4f,
      0xfe2ce6e0,
      0xa3014314,
      0x4e0811a1,
      0xf7537e82,
      0xbd3af235,
      0x2ad7d2bb,
      0xeb86d391
    );
    const S = Uint8Array.of(
      7,
      12,
      17,
      22,
      7,
      12,
      17,
      22,
      7,
      12,
      17,
      22,
      7,
      12,
      17,
      22,
      5,
      9,
      14,
      20,
      5,
      9,
      14,
      20,
      5,
      9,
      14,
      20,
      5,
      9,
      14,
      20,
      4,
      11,
      16,
      23,
      4,
      11,
      16,
      23,
      4,
      11,
      16,
      23,
      4,
      11,
      16,
      23,
      6,
      10,
      15,
      21,
      6,
      10,
      15,
      21,
      6,
      10,
      15,
      21,
      6,
      10,
      15,
      21
    );
    const INIT_MD5F = new DataView(
      Uint8Array.of(
        0x01,
        0x23,
        0x45,
        0x67,
        0x89,
        0xab,
        0xdc,
        0xef,
        0xfe,
        0xdc,
        0xba,
        0x98,
        0x46,
        0x57,
        0x32,
        0x10
      ).buffer
    );
    const MASK32 = -1;
    function rotateLeft(x, s) {
      return ((x << s) | (x >>> (32 - s))) & MASK32;
    }
    function updateBlock(s, buf) {
      let a = s[0];
      let b = s[1];
      let c = s[2];
      let d = s[3];
      for (let i = 0; i < 64; i++) {
        let f, g;
        if (i < 16) {
          f = (b & c) | (~b & d);
          g = i;
        } else if (i < 32) {
          f = (d & b) | (~d & c);
          g = (5 * i + 1) % 16;
        } else if (i < 48) {
          f = b ^ c ^ d;
          g = (3 * i + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = (7 * i) % 16;
        }
        f =
          (f +
            a +
            K[i] +
            buf.getInt32(g * Int32Array.BYTES_PER_ELEMENT, true)) &
          MASK32;
        a = d;
        d = c;
        c = b;
        b = b + rotateLeft(f, S[i]);
      }
      s[0] = (s[0] + a) & MASK32;
      s[1] = (s[1] + b) & MASK32;
      s[2] = (s[2] + c) & MASK32;
      s[3] = (s[3] + d) & MASK32;
    }
    const BLOCK_SIZE = 64;
    function digest(data) {
      const s = Int32Array.of(
        INIT_MD5F.getInt32(0, true),
        INIT_MD5F.getInt32(Int32Array.BYTES_PER_ELEMENT, true),
        INIT_MD5F.getInt32(2 * Int32Array.BYTES_PER_ELEMENT, true),
        INIT_MD5F.getInt32(3 * Int32Array.BYTES_PER_ELEMENT, true)
      );
      let i = 0;
      for (; i <= data.byteLength - BLOCK_SIZE; i += BLOCK_SIZE) {
        updateBlock(s, new DataView(data, i, BLOCK_SIZE));
      }
      const last = new ArrayBuffer(
        Math.ceil((data.byteLength - i + 9) / BLOCK_SIZE) * BLOCK_SIZE
      );
      const dataView = new Uint8Array(data);
      const lastView = new DataView(last);
      let j = 0;
      for (; i + j < data.byteLength; j++) {
        lastView.setUint8(j, dataView[i + j]);
      }
      lastView.setUint8(j, 0x80);
      lastView.setUint32(last.byteLength - 8, data.byteLength * 8, true);
      for (i = 0; i <= last.byteLength - BLOCK_SIZE; i += BLOCK_SIZE) {
        updateBlock(s, new DataView(last, i, BLOCK_SIZE));
      }
      const result = new ArrayBuffer(16);
      const resultView = new DataView(result);
      for (let i = 0; i < s.length; i++) {
        resultView.setInt32(i * Int32Array.BYTES_PER_ELEMENT, s[i], true);
      }
      return result;
    }
    // digest = digest;
    class BufferIO {
      constructor(view) {
        this.view = view;
        this.pos = 0;
      }
      getView(length) {
        const r = new DataView(
          this.view.buffer,
          this.view.byteOffset + this.pos,
          length
        );
        this.pos += length;
        return r;
      }
    }
    class BufferWriter extends BufferIO {
      setUint8(value) {
        this.view.setUint8(this.pos, value);
        this.pos += 1;
      }
      setInt8(value) {
        this.view.setInt8(this.pos, value);
        this.pos += 1;
      }
      setInt16(value) {
        this.view.setInt16(this.pos, value, true);
        this.pos += 2;
      }
      setInt32(value) {
        this.view.setInt32(this.pos, value, true);
        this.pos += 4;
      }
      setFloat32(value) {
        this.view.setFloat32(this.pos, value, true);
        this.pos += 4;
      }
    }
    function btoUint8Array(b) {
      const arr = new Uint8Array(b.length);
      for (let i = 0; i < b.length; i++) {
        arr[i] = b.charCodeAt(i);
      }
      return arr;
    }
    function Uint8ArrayTob(a) {
      let out = "";
      for (let i = 0; i < a.length; i++) {
        out += String.fromCharCode(a[i]);
      }
      return out;
    }
    const uint8ToHex = new Array(0x100);
    for (let i = 0; i < uint8ToHex.length; i++) {
      uint8ToHex[i] = i.toString(16).toUpperCase().padStart(2, "0");
    }
    function hex(buffer) {
      const view = new Uint8Array(buffer);
      const hexBytes = new Array(view.length);
      for (let i = 0; i < view.length; i++) {
        hexBytes[i] = uint8ToHex[view[i]];
      }
      return hexBytes.join("");
    }
    function exportArea(w, area) {
      w.setInt8(area.index);
      w.setInt8(area.parentIndex);
      w.setInt16(area.tropicAnchor);
      w.setInt16(area.areaSegments);
      w.setInt16(area.anchorLocalOffset.x);
      w.setInt16(area.anchorLocalOffset.y);
      w.setInt16(area.size.x);
      w.setInt16(area.size.y);
    }
    function getParam(v, pos, defaultValue) {
      const p = pos * Int32Array.BYTES_PER_ELEMENT;
      if (p >= v.byteLength) {
        if (defaultValue === undefined) {
          throw new Error("参数解析错误：数据段太短");
        } else {
          return defaultValue;
        }
      }
      return v.getInt32(p, true);
    }
    function setParam(v, pos, value) {
      v.setInt32(pos * Int32Array.BYTES_PER_ELEMENT, value, true);
    }
    const stationDesc = {
      maxItemKind: 3,
      numSlots: 12,
    };
    const interstellarStationDesc = {
      maxItemKind: 5,
      numSlots: 12,
    };
    const AdvancedMiningMachineDesc = {
      maxItemKind: 1,
      numSlots: 9,
    };
    const stationParamsMeta = {
      base: 320,
      storage: { base: 0, stride: 6 },
      slots: { base: 192, stride: 4 },
    };
    function stationParamsParser(desc) {
      return {
        encodedSize() {
          return 2048;
        },
        encode(p, a) {
          const base = stationParamsMeta.base;
          setParam(a, base, p.workEnergyPerTick);
          setParam(a, base + 1, p.tripRangeOfDrones * 100000000.0);
          setParam(a, base + 2, p.tripRangeOfShips / 100.0);
          setParam(a, base + 3, p.includeOrbitCollector ? 1 : -1);
          setParam(a, base + 4, p.warpEnableDistance);
          setParam(a, base + 5, p.warperNecessary ? 1 : -1);
          setParam(a, base + 6, p.deliveryAmountOfDrones);
          setParam(a, base + 7, p.deliveryAmountOfShips);
          setParam(a, base + 8, p.pilerCount);
          {
            const { base, stride } = stationParamsMeta.storage;
            for (let i = 0; i < desc.maxItemKind; i++) {
              const s = p.storage[i];
              setParam(a, base + i * stride, s.itemId);
              setParam(a, base + i * stride + 1, s.localRole);
              setParam(a, base + i * stride + 2, s.remoteRole);
              setParam(a, base + i * stride + 3, s.max);
            }
          }
          {
            const { base, stride } = stationParamsMeta.slots;
            for (let i = 0; i < 12; i++) {
              const s = p.slots[i];
              setParam(a, base + i * stride, s.dir);
              setParam(a, base + i * stride + 1, s.storageIdx);
            }
          }
        },
        decode(a) {
          const base = stationParamsMeta.base;
          const result = {
            storage: [],
            slots: [],
            workEnergyPerTick: getParam(a, base),
            tripRangeOfDrones: getParam(a, base + 1) / 100000000.0,
            tripRangeOfShips: getParam(a, base + 2) * 100.0,
            includeOrbitCollector: getParam(a, base + 3) > 0,
            warpEnableDistance: getParam(a, base + 4),
            warperNecessary: getParam(a, base + 5) > 0,
            deliveryAmountOfDrones: getParam(a, base + 6),
            deliveryAmountOfShips: getParam(a, base + 7),
            pilerCount: getParam(a, base + 8),
          };
          {
            const { base, stride } = stationParamsMeta.storage;
            for (let i = 0; i < desc.maxItemKind; i++) {
              result.storage.push({
                itemId: getParam(a, base + i * stride),
                localRole: getParam(a, base + i * stride + 1),
                remoteRole: getParam(a, base + i * stride + 2),
                max: getParam(a, base + i * stride + 3),
              });
            }
          }
          {
            const { base, stride } = stationParamsMeta.slots;
            for (let i = 0; i < 12; i++) {
              result.slots.push({
                dir: getParam(a, base + i * stride),
                storageIdx: getParam(a, base + i * stride + 1),
              });
            }
          }
          return result;
        },
      };
    }
    function advancedMiningMachineParamParser() {
      const stationParser = stationParamsParser(AdvancedMiningMachineDesc);
      return {
        encodedSize: stationParser.encodedSize,
        encode(p, a) {
          stationParser.encode(p, a);
          const base = stationParamsMeta.base;
          setParam(a, base + 9, p.miningSpeed);
        },
        decode(a) {
          const p = stationParser.decode(a);
          const base = stationParamsMeta.base;
          return Object.assign(p, {
            miningSpeed: getParam(a, base + 9),
          });
        },
      };
    }
    const splitterParamParser = {
      encodedSize() {
        return 4;
      },
      encode(p, a) {
        for (let i = 0; i < 4; i++) {
          setParam(a, i, p.priority[i] ? 1 : 0);
        }
      },
      decode(a) {
        const result = {
          priority: [],
        };
        for (let i = 0; i < 4; i++) {
          result.priority[i] = getParam(a, i) > 0;
        }
        return result;
      },
    };
    const labParamParser = {
      encodedSize() {
        return 2;
      },
      encode(p, a) {
        setParam(a, 0, p.researchMode);
        setParam(a, 1, p.acceleratorMode);
      },
      decode(a) {
        return {
          researchMode: getParam(a, 0),
          acceleratorMode: getParam(a, 1),
        };
      },
    };
    const assembleParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.acceleratorMode);
      },
      decode(a) {
        return {
          acceleratorMode: getParam(a, 0),
        };
      },
    };
    const beltParamParser = {
      encodedSize() {
        return 2;
      },
      encode(p, a) {
        setParam(a, 0, p.iconId);
        setParam(a, 1, p.count);
      },
      decode(a) {
        return {
          iconId: getParam(a, 0),
          count: getParam(a, 1, 0),
        };
      },
    };
    const inserterParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.length);
      },
      decode(a) {
        return {
          length: getParam(a, 0),
        };
      },
    };
    const tankParamParser = {
      encodedSize() {
        return 2;
      },
      encode(p, a) {
        setParam(a, 0, p.output ? 1 : -1);
        setParam(a, 1, p.input ? 1 : -1);
      },
      decode(a) {
        return {
          output: getParam(a, 0) > 0,
          input: getParam(a, 1) > 0,
        };
      },
    };
    const storageParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.automationLimit);
      },
      decode(a) {
        return {
          automationLimit: getParam(a, 0),
        };
      },
    };
    const ejectorParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.orbitId);
      },
      decode(a) {
        return {
          orbitId: getParam(a, 0),
        };
      },
    };
    const powerGeneratorParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.productId);
      },
      decode(a) {
        return {
          productId: getParam(a, 0),
        };
      },
    };
    const energyExchangerParamParser = {
      encodedSize() {
        return 1;
      },
      encode(p, a) {
        setParam(a, 0, p.mode);
      },
      decode(a) {
        return {
          mode: getParam(a, 0),
        };
      },
    };
    const MonitorParamParser = {
      encodedSize() {
        return 128;
      },
      encode(p, a) {
        setParam(a, 0, p.targetBeltId);
        setParam(a, 1, p.offset);
        setParam(a, 2, p.targetCargoAmount);
        setParam(a, 3, p.periodTicksCount);
        setParam(a, 4, p.passOperator);
        setParam(a, 5, p.passColorId);
        setParam(a, 6, p.failColorId);
        setParam(a, 14, p.cargoFilter);
        setParam(a, 7, p.tone);
        setParam(a, 8, p.volume);
        setParam(a, 9, p.pitch);
        setParam(a, 11, p.repeat ? 1 : 0);
        setParam(a, 13, p.length * 10000);
        setParam(a, 18, p.falloffRadius[0] * 10);
        setParam(a, 19, p.falloffRadius[1] * 10);
        setParam(a, 10, p.systemWarningMode);
        setParam(a, 17, p.systemWarningIconId);
        setParam(a, 12, p.alarmMode);
      },
      decode(a) {
        return {
          targetBeltId: getParam(a, 0),
          offset: getParam(a, 1),
          targetCargoAmount: getParam(a, 2),
          periodTicksCount: getParam(a, 3),
          passOperator: getParam(a, 4),
          passColorId: getParam(a, 5),
          failColorId: getParam(a, 6),
          cargoFilter: getParam(a, 14),
          tone: getParam(a, 7),
          volume: getParam(a, 8),
          pitch: getParam(a, 9),
          repeat: getParam(a, 11) > 0,
          length: getParam(a, 13) / 10000,
          falloffRadius: [getParam(a, 18) / 10, getParam(a, 19) / 10],
          systemWarningMode: getParam(a, 10),
          systemWarningIconId: getParam(a, 17),
          alarmMode: getParam(a, 12),
        };
      },
    };
    const unknownParamParser = {
      encodedSize(p) {
        return p.parameters.length;
      },
      encode(p, a) {
        for (let i = 0; i < p.parameters.length; i++)
          setParam(a, i, p.parameters[i]);
      },
      decode(a) {
        const p = {
          parameters: new Int32Array(
            a.byteLength / Int32Array.BYTES_PER_ELEMENT
          ),
        };
        for (let i = 0; i < p.parameters.length; i++)
          p.parameters[i] = getParam(a, i);
        return p;
      },
    };
    const parameterParsers = new Map([
      [2103, stationParamsParser(stationDesc)],
      [2104, stationParamsParser(interstellarStationDesc)],
      [2316, advancedMiningMachineParamParser()],
      [2020, splitterParamParser],
      [2901, labParamParser],
      [2001, beltParamParser],
      [2002, beltParamParser],
      [2003, beltParamParser],
      [2011, inserterParamParser],
      [2012, inserterParamParser],
      [2013, inserterParamParser],
      [2101, storageParamParser],
      [2102, storageParamParser],
      [2106, tankParamParser],
      [2311, ejectorParamParser],
      [2208, powerGeneratorParamParser],
      [2209, energyExchangerParamParser],
      [2030, MonitorParamParser],
    ]);
    for (const id of allAssemblers) {
      parameterParsers.set(id, assembleParamParser);
    }
    function parserFor(itemId) {
      const parser = parameterParsers.get(itemId);
      if (parser !== undefined) return parser;
      return unknownParamParser;
    }
    function exportBuilding(w, b) {
      function writeXYZ(v) {
        w.setFloat32(v.x);
        w.setFloat32(v.y);
        w.setFloat32(v.z);
      }
      w.setInt32(b.index);
      w.setInt8(b.areaIndex);
      writeXYZ(b.localOffset[0]);
      writeXYZ(b.localOffset[1]);
      w.setFloat32(b.yaw[0]);
      w.setFloat32(b.yaw[1]);
      w.setInt16(b.itemId);
      w.setInt16(b.modelIndex);
      w.setInt32(b.outputObjIdx);
      w.setInt32(b.inputObjIdx);
      w.setInt8(b.outputToSlot);
      w.setInt8(b.inputFromSlot);
      w.setInt8(b.outputFromSlot);
      w.setInt8(b.inputToSlot);
      w.setInt8(b.outputOffset);
      w.setInt8(b.inputOffset);
      w.setInt16(b.recipeId);
      w.setInt16(b.filterId);
      if (b.parameters !== null) {
        const parser = parserFor(b.itemId);
        const length = parser.encodedSize(b.parameters);
        w.setInt16(length);
        parser.encode(
          b.parameters,
          w.getView(length * Int32Array.BYTES_PER_ELEMENT)
        );
      } else {
        w.setInt16(0);
      }
    }
    function encodedSize(bp) {
      let result =
        28 + // meta
        1 + // numAreas
        14 * bp.areas.length +
        4 + // numBuildings
        61 * bp.buildings.length;
      for (const b of bp.buildings) {
        if (b.parameters === null) continue;
        const parser = parserFor(b.itemId);
        result +=
          parser.encodedSize(b.parameters) * Int32Array.BYTES_PER_ELEMENT;
      }
      return result;
    }

    let bp = this.blueprintTemplate;
    let result = "BLUEPRINT:";
    const TIME_BASE = new Date(0).setUTCFullYear(1);
    result += "0,";
    result += bp.header.layout;
    result += ",";
    for (const i of bp.header.icons) {
      result += i;
      result += ",";
    }
    result += "0,";
    result += (bp.header.time.getTime() - TIME_BASE) * 10000;
    result += ",";
    result += bp.header.gameVersion;
    result += ",";
    result += encodeURIComponent(bp.header.shortDesc);
    result += ",";
    result += encodeURIComponent(bp.header.desc);
    result += '"';
    const decoded = new Uint8Array(encodedSize(bp));
    const writer = new BufferWriter(new DataView(decoded.buffer));
    writer.setInt32(bp.version);
    writer.setInt32(bp.cursorOffset.x);
    writer.setInt32(bp.cursorOffset.y);
    writer.setInt32(bp.cursorTargetArea);
    writer.setInt32(bp.dragBoxSize.x);
    writer.setInt32(bp.dragBoxSize.y);
    writer.setInt32(bp.primaryAreaIdx);
    writer.setUint8(bp.areas.length);
    for (const a of bp.areas) exportArea(writer, a);
    writer.setInt32(bp.buildings.length);
    for (const b of bp.buildings) exportBuilding(writer, b);
    result += btoa(Uint8ArrayTob(pako.default.gzip(decoded)));
    const d = hex(digest(btoUint8Array(result).buffer));
    result += '"';
    result += d;
    return result;
  }
}
