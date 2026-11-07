/*!
 * old.js —— 全站共用的「版本选择器」：清单 + 渲染 + 跳转，都在这一个文件里。
 *
 * 目录约定
 *   最新版            → 站点根目录
 *   历史版本          → /<游戏版本号>/   例如 /0.10.29.28154/
 *   每个历史版本目录都是完整快照（自己的 Scripts、quote、图片，页面里全是相对路径），能独立打开。
 *
 * 引用方式：每个页面的 </body> 前放一段自定位加载器（各版本页面里那段代码一字不差，复制页面时自然带过去）
 *   它的逻辑：URL 最后一级目录长得像版本号（0.10.29.28154）就取 ../old.js，否则取 ./old.js。
 *   所以整个目录从根目录挪进 /0.10.35.29057/ 之后，这一段不用改。
 *
 * 缓存：各页面引的是固定的 old.js，不带 ?t= / ?v=，由浏览器正常缓存。
 *   · 改完本文件、自己要立刻看效果：Ctrl+F5
 *   · 访客按各自缓存策略更新（一般一天内就会拿到新清单）
 *   · 要逼所有人立即更新：把加载器里那句改成 add(up + 'old.js?v=2')，以后每次改完就递增（10 个页面都要改）
 *
 * 发新版（页面文件一个都不用改，只动下面的 VERSIONS 两行）
 *   1) 把根目录整份（旧版）复制进 /<旧版本号>/ 目录，版本号就是目录名，一个字符都别差
 *   2) 把新版整份覆盖到根目录
 *   3) 改下面 VERSIONS：
 *        · 上一版那行 dir: ''  →  dir: '<上一版版本号>/'      ← 别忘了结尾的斜杠
 *        · 最上面插一行       { v: '<新版版本号>', dir: '', news: '<新版公告地址>' }
 *      news 留空也能用，下拉里的「当前版本更新详情」会指向游戏更新列表。
 *
 * 页面里的挂载点
 *   优先找 <span data-version-bar></span>（新版 quote/updata.html 里就是这个，内联显示）；
 *   找不到就找页面里原来那个硬编码的版本下拉（首个 option 含「当前版本」的 select）并原地替换；
 *   再找不到就挂到页面底部。
 *
 * 切版本的行为
 *   在当前页直接跳过去（不开新标签页），浏览器后退可以回到上一版。
 *   所有版本共用站点根目录这同一个 old.js，所以这一行为对根目录和全部历史版本目录同时生效。
 *   想恢复成开新标签页：把下面的 OPEN_IN_NEW_TAB 改成 true（同样只需改这一处）。
 */
(function () {
  'use strict';

  /* ---------- 一、清单：新增版本改这里 ---------- */
  /* 第一条就是最新版（放在站点根目录，dir 留空）；下面按从新到旧排。news 不填则链接到游戏更新列表。 */
  /* @versions:start */
  var VERSIONS = [
    { v: '0.10.35.29057', dir: '', news: 'https://store.steampowered.com/news/app/1366540/view/687517794773762137' },
    { v: '0.10.29.28154', dir: '0.10.29.28154/', news: 'https://store.steampowered.com/news/app/1366540/view/4034730703034688289?l=schinese' },
    { v: '0.10.28.20729', dir: '0.10.28.20729/', news: 'https://store.steampowered.com/news/app/1366540/view/3887233545927082161?l=schinese' },
    { v: '0.9.27.14546', dir: '0.9.27.14546/', news: 'https://store.steampowered.com/news/app/1366540/view/3288214038337615948' },
    { v: '0.9.26.12891', dir: '0.9.26.12891/', news: 'https://store.steampowered.com/news/app/1366540/view/3337744192478386623' },
    { v: '0.9.24.11240', dir: '0.9.24.11240/', news: 'https://store.steampowered.com/news/app/1366540/view/3144076654141997450' },
    { v: '0.9.24.11182', dir: '0.9.24.11182/', news: 'https://store.steampowered.com/news/app/1366540/view/3144076654124101385' },
    { v: '0.8.23.9989', dir: '0.8.23.9989/', news: 'https://store.steampowered.com/news/app/1366540/view/3149701804347427984' },
    { v: '0.8.22.8915', dir: '0.8.22.8915/', news: 'https://store.steampowered.com/news/app/1366540/view/2909879326025819168' },
    { v: '0.7.18.6931', dir: '0.7.18.6931/', news: 'https://store.steampowered.com/news/app/1366540/view/3044975900132654798' }
  ];
  /* @versions:end */

  var NEWS_HUB = 'https://store.steampowered.com/news/app/1366540'; // 没单独填 news 的版本用这个
  /* 切版本的方式：false = 在当前页直接跳过去（本站默认，所有版本共用这一份 old.js，改一处即全站生效）
     想恢复成开新标签页，把这里改成 true 即可 */
  var OPEN_IN_NEW_TAB = false;

  /* ---------- 二、下面的不用改 ---------- */
  var LATEST = VERSIONS[0];

  // 本站根地址：由 old.js 自己的地址推出来，所以在 /、/t/dsq/、/0.10.29.28154/ 里都对
  var self = document.currentScript;
  var BASE = self && self.src ? new URL('.', self.src).href : location.href.replace(/[?#].*$/, '').replace(/[^/]*$/, '');

  /** 当前页面对应清单里的哪一条 */
  function currentVersion(legacySel) {
    var path = location.pathname;
    try { path = decodeURIComponent(path); } catch (e) {}
    var segs = path.split('/');
    // 1) 看路径：只要有一个路径段正好等于版本号目录就算（/0.10.29.28154/、/t/dsq/0.10.29.28154 都认，末尾有没有斜杠都认）
    for (var i = 1; i < VERSIONS.length; i++) {
      var name = String(VERSIONS[i].dir || VERSIONS[i].v).replace(/\/+$/, '');
      if (name && segs.indexOf(name) !== -1) return VERSIONS[i];
    }
    // 2) 路径认不出来（例如被 rewrite 成 /?v=x）：老快照自己写着「当前版本:最新版[版本号]」，用页面自报的版本兜底
    var hint = '';
    if (legacySel && legacySel.options && legacySel.options[0]) {
      hint = legacySel.options[0].textContent;
    } else if (document.body) {
      var m = /当前版本[:：][^\[\]]*\[([0-9][0-9.]*)\]/.exec(document.body.textContent || '');
      if (m) hint = m[1];
    }
    var mm = /(\d+\.\d+\.\d+\.\d+)/.exec(hint || '');
    if (mm) {
      for (var j = 0; j < VERSIONS.length; j++) if (VERSIONS[j].v === mm[1]) return VERSIONS[j];
    }
    return LATEST;
  }

  function urlOf(item) {
    return item.dir ? BASE + item.dir : BASE;
  }

  /**
   * 切版本。sel 传进来是为了把下拉还原成「你正在看的这一版」——
   * 否则下拉会停在刚选过的那一项，用户再选同一项时浏览器不触发 change，看起来就是「点了没反应」。
   */
  function go(v, sel) {
    for (var i = 0; i < VERSIONS.length; i++) {
      if (VERSIONS[i].v !== v) continue;
      var target = VERSIONS[i];
      var cur = CURRENT || currentVersion();
      if (sel && sel.value !== cur.v) sel.value = cur.v; // 先还原，任何时候下拉都等于当前页面版本
      if (target === cur) return;                        // 已经在这一版，别动

      var url = urlOf(target);
      if (OPEN_IN_NEW_TAB) {
        var w = null;
        // 注意：不能带 'noopener' 特性——那样 window.open 一律返回 null，就分不清「被拦截」还是「开成功」了。
        // 先不带特性拿到窗口句柄，再手动掐掉 opener，效果一样，但能判断是否真的开出来了。
        try { w = window.open(url, '_blank'); } catch (e) { w = null; }
        if (w) { try { w.opener = null; } catch (e) {} return; }
        // 被弹窗拦截（用户在长长的下拉里挑了很久，浏览器认为不再是即时手势）：退回当前页直接跳，绝不静默失败
      }
      location.href = url;
      return;
    }
  }

  function style() {
    if (document.getElementById('dsq-ver-style')) return;
    var st = document.createElement('style');
    st.id = 'dsq-ver-style';
    st.textContent = [
      // 挂载点本身也要跟着文字走（新版 quote/updata.html 里是 <span>，老页面有可能是 <div>，一律内联，别另起一行）
      '[data-version-bar]{display:inline;}',
      '.dsq-ver{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;vertical-align:middle;margin-left:4px;font:inherit;color:inherit;}',
      '.dsq-ver-select{font:inherit;font-size:12px;line-height:1.6;padding:1px 4px;color:inherit;background:transparent;border:1px solid currentColor;border-radius:4px;cursor:pointer;opacity:.85;}',
      '.dsq-ver-select:hover,.dsq-ver-select:focus{opacity:1;}',
      '.dsq-ver-select option{color:#111;background:#fff;}',
      '.dsq-ver-news{color:inherit;}',
      '.dsq-ver-tip{opacity:.9;}',
      '.dsq-ver-tip a{color:inherit;font-weight:700;text-decoration:underline;}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  function buildBar(cur) {
    var bar = document.createElement('span');
    bar.className = 'dsq-ver';
    bar.setAttribute('data-dsq-ver', cur.v);

    var sel = document.createElement('select');
    sel.className = 'dsq-ver-select';
    sel.setAttribute('aria-label', '切换计算器版本');
    sel.title = '换一个历史版本看看（数据各自独立存在浏览器里）';
    VERSIONS.forEach(function (item, i) {
      var opt = document.createElement('option');
      opt.value = item.v;
      opt.textContent = i === 0
        ? (cur === LATEST ? '—当前版本:最新版[' + item.v + ']—' : '—最新版[' + item.v + ']—')
        : item.v;
      if (item === cur) {
        opt.selected = true;
        opt.defaultSelected = true; // 同时写进 selected 属性：DOM 被克隆/重绘、浏览器恢复表单状态后都不会跳回第一项
      }
      sel.appendChild(opt);
    });
    sel.value = cur.v; // 再按值兜一次
    sel.addEventListener('change', function () { go(sel.value, sel); });
    bar.appendChild(sel);

    var news = document.createElement('a');
    news.className = 'dsq-ver-news';
    news.target = '_blank';
    news.rel = 'noopener';
    // 链接文案固定「当前版本更新详情」：不管在根目录还是历史版本目录，都指「你正在看的这一版」，
    // 不在文案里带版本号（版本号已经在下拉里了）
    var showNews = function (item) {
      news.href = item.news || NEWS_HUB;
      news.textContent = '当前版本更新详情';
    };
    showNews(cur);
    bar.appendChild(news);

    // 正在看历史版本：提示一句 + 一键回最新版
    if (cur !== LATEST) {
      var tip = document.createElement('span');
      tip.className = 'dsq-ver-tip';
      tip.appendChild(document.createTextNode('（你正在看历史版本 ' + cur.v + '，'));
      var back = document.createElement('a');
      back.href = urlOf(LATEST);
      back.textContent = '回到最新版';
      tip.appendChild(back);
      tip.appendChild(document.createTextNode('）'));
      bar.appendChild(tip);
    }
    return bar;
  }

  /** 老快照里那份硬编码的版本下拉（option 文案含「当前版本」），用于原地替换 */
  function legacySelect() {
    var list = document.querySelectorAll('select');
    for (var i = 0; i < list.length; i++) {
      // 跳过我们自己生成的那个（它的首项文案也含「当前版本」），否则会自己认成自己
      if (/dsq-ver-select/.test(list[i].className || '')) continue;
      var first = list[i].options[0];
      if (first && /当前版本/.test(first.textContent)) return list[i];
    }
    return null;
  }

  var mounted = false;
  var MODE = '';      // 这一坨是怎么挂上去的：'host' 挂载点 / 'legacy' 替换旧下拉 / 'footer' 临时兜底
  var CURRENT = null; // 本页对应的版本，mount 时定下来
  var BAR = null;     // 已挂上去的那一坨，用来判断它有没有被页面的重绘冲掉

  /** 把下拉拉回「当前页面这一版」：浏览器恢复表单状态、后退回来时都要拉一次 */
  function syncSel(sel, cur) {
    var fix = function () { if (sel.value !== cur.v) sel.value = cur.v; };
    fix();
    if (window.requestAnimationFrame) window.requestAnimationFrame(fix);
    setTimeout(fix, 300);
  }

  /** 把旧快照里那份写死的下拉和紧跟的「更新详情」链接藏掉 */
  function hideLegacy(legacy) {
    legacy.style.display = 'none';
    var next = legacy.nextElementSibling;
    if (next && next.tagName === 'A' && /steampowered\.com/.test(next.href)) next.style.display = 'none';
  }

  /**
   * 网速慢的时候 quote/updata.html 要好几秒才到，版本栏会先被兜底挂到页脚。
   * 真正的挂载点一出现就把它搬过去——否则就永远留在页面最底部了。
   */
  function relocate(host, legacy) {
    if (!BAR || !BAR.parentNode) return;
    if (host) {
      if (BAR.parentNode !== host) { host.appendChild(BAR); MODE = 'host'; }
      return;
    }
    if (legacy && MODE !== 'legacy') {
      legacy.parentNode.insertBefore(BAR, legacy);
      hideLegacy(legacy);
      MODE = 'legacy';
    }
  }

  function mount(force) {
    var host = document.querySelector('[data-version-bar]');

    if (mounted) {
      // 稳态：已经挂在真正的挂载点上、也没被冲掉，直接走。
      // （计算器每次重算都会改 DOM，观察器回调很频繁，别每次都去扫一遍全页的 select）
      if (MODE === 'host' && BAR && (!document.contains || document.contains(BAR))) return;
      relocate(host, host ? null : legacySelect());
      return;
    }

    var legacy = host ? null : legacySelect();
    // 挂载点还没出现（quote/updata.html 是 jQuery.load 异步塞进来的）：先等，别急着挂到别处
    if (!host && !legacy && (!force || !document.body)) return;

    style();
    var cur = CURRENT = currentVersion(legacy);
    var bar = buildBar(cur);

    if (host) {
      host.appendChild(bar);
      MODE = 'host';
    } else if (legacy) {
      // 老快照：把它那份写死的下拉和紧跟的「更新详情」链接换成统一的一份
      legacy.parentNode.insertBefore(bar, legacy);
      hideLegacy(legacy);
      MODE = 'legacy';
    } else {
      var tail = document.querySelector('footer') || document.body;
      tail.appendChild(bar);
      MODE = 'footer'; // 只是临时寄存，挂载点晚到会搬走
    }
    mounted = true;
    BAR = bar;

    // 有的环境（浏览器恢复表单状态、页面脚本重绘）会在挂载之后把选中项改回第一项：稍后再确认一次
    var sel = bar.querySelector('.dsq-ver-select');
    if (sel) syncSel(sel, cur);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mount(); });
  else mount();

  // quote/updata.html 是 jQuery.load 异步塞进来的，挂载点可能晚于本文件出现
  if (window.MutationObserver) {
    new MutationObserver(function () {
      // 片段被重新 load 过一次时，原来那坨会变成游离节点（还在内存里、但页面上没有）：
      // 不清掉 mounted 标志就会一直以为「已经挂好了」，页面上于是出现一个点了没反应的下拉
      if (mounted && BAR && document.contains && !document.contains(BAR)) {
        mounted = false;
        BAR = null;
        mount(true);
        return;
      }
      mount();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  // 兜底：2.5 秒后还没等到挂载点（比如很老的快照既没有占位也没有旧下拉），就挂到页面底部
  setTimeout(function () { mount(true); }, 2500);

  // 从后退/前进缓存（bfcache）恢复的页面：表单状态可能是旧的，把下拉拉回当前版本
  window.addEventListener('pageshow', function () {
    var cur = CURRENT || currentVersion();
    var sel = BAR && BAR.querySelector ? BAR.querySelector('.dsq-ver-select') : null;
    if (sel && cur) syncSel(sel, cur);
  });

  window.DSQ_old = {
    versions: VERSIONS,
    base: BASE,
    current: function () { return CURRENT || currentVersion(); },
    urlOf: urlOf,
    go: go
  };
})();
