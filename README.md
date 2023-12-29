# 戴森球计划量产量化计算器工具
<a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://img.shields.io/badge/license-GPLV3-blue" alt="license GPLV3"></a>
- 支持多配方
- 支持可视化物品选择
- 支持多需求叠加
- 支持把计算结果进行保存（多方案）
- 开源，纯前端，只需要会点Javascript就能修改代码
- 常见问题可以进入<a href="https://github.com/122474363/DSQ/wiki">Wiki帮助</a>寻找答案
- <a href="https://github.com/122474363/DSQ/issues">Issues</a>中的待办事项，有能力有时间的小伙伴也可以进行修复。
- 如果提交PR长时间未处理，可以QQ艾特122474363进行合并。
- 戴森球计划工具交流讨论QQ群：<a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=UzzPv3ic7Fk9EDCyHo_4gkWQLR3WEA9Y&authKey=ysjOY0JQOSpT2ZCLkttSzI73sXyzu%2FXEqJXMmY2O645LpO6GOD5lRBrjdalqpO5k&noverify=0&group_code=53309723" target="_blank">53309723</a>

## 部署方式

- 使用PHPStudy或宝塔急速部署。

## 项目结构

```
┌── <DSQ> ---> (主目录)
│  ┌── <img> ---> (素材目录)
│  ├── <quote> ---> (页眉页脚目录)
│  │  ┌── advertise.html ---> (广告文件)
│  │  ├── explanation.html ---> (底部说明)
│  │  └── updata.html ---> (更新信息)
│  ├── <Scripts> ---> (核心数据目录)
│  │  ┌── blueprint.js ---> (蓝图核心库)
│  │  ├── cocoMessage.js ---> (消息提示框插件)
│  │  ├── data.js ---> (核心库)
│  │  ├── data.json ---> (图标库)
│  │  ├── jquery.cookie.min.1.4.1.js ---> (Cookie插件)
│  │  ├── jquery.min.2.1.4.js ---> (jquery库)
│  │  ├── jquery.tips.js ---> (提示框插件)
│  │  ├── pako.js ---> (压缩/解压插件)
│  │  ├── style.css ---> (样式文件)
│  │  └── vue.min.2.5.16.js ---> (vue库)
│  ├── favicon.ico ---> (网页图标)
│  ├── index.html ---> (首页)
│  ├── LICENSE ---> (开源协议)
│  └── README.md ---> (自述文件)
```

## 使用说明

- 输入每分钟需求的物品数量，然后点击后面的蓝色按钮选择物品即可。
- 参考数据：传送带360/min 高速传送带720/min 极速传送带1800/min
- 物品左边可以进行操作：
  - 标注:可以对某个物品进行(改颜色)比如已经完成生产线的物品
  - 多配方:可以对某个物品进行同时多个配方的计算
  - 排除:可以对某个物品进行排除计算
- 采矿机默认按6个矿脉，大型采矿机默认按20个
- 喷涂机的加速与增产剂同样，所以可以直接使用增产剂来进行设置。
- 临界光子、原油效率、分馏塔、轨道采集、运输站集装物流、大型采矿机 可从【参数配置】中配置
- 增产剂暂时只支持喷涂总量统计，不支持增产剂使用数量统计
- 关于蓝图生成，配置项移到了页面顶部的参数配置中，目前只支持通过(位面)熔炉、制造台、精炼厂、对撞机、（量子）化工厂、研究站六类生产设施进行制造的物品
