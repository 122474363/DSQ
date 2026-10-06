// 「手搓产线蓝图」页（blueprint/<版本>/index.html，由 dsp-handcraft 打包，源码 https://github.com/zoujack018/dsp-handcraft）嵌进本站用的小桥：
// 1. 物品图标用本站 Scripts/data.json 里的（按 Scripts/handcraft-link.js 的 HANDCRAFT_IDS 换成游戏物品 ID）；
// 2. 页面最上面加一条：返回计算器、蓝图生成器的源码链接。
// 页面那边：window.DSPHC.icon(物品) 返回图片地址，图标准备好后收到 dsphc-icons 事件重画（见 dsp-handcraft 的 web/src/handoff.js）。
(function () {
  var icons = {}; // 游戏物品 ID → data:image/png;base64,…
  window.DSPHC = {
    icon: function (it) {
      return icons[it.id];
    },
  };

  function loadIcons() {
    fetch('../../Scripts/data.json')
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        var list = (d.icons1 || []).concat(d.icons2 || []);
        for (var i = 0; i < list.length; i++) {
          var name = list[i].name.split('-').slice(2).join('-') || list[i].name; // 「1-1-铁块」→「铁块」
          var id = window.HANDCRAFT_IDS && window.HANDCRAFT_IDS[name];
          if (id && !icons[id]) icons[id] = 'data:image/png;base64,' + list[i].value;
        }
        window.dispatchEvent(new Event('dsphc-icons'));
      })
      .catch(function () {
        /* 图标加载不了就用页面自带的线条图形 */
      });
  }
  var s = document.createElement('script');
  s.src = '../../Scripts/handcraft-link.js';
  s.onload = loadIcons;
  document.head.appendChild(s);

  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:8px 16px;font-size:13px;background:#1d3557;color:#e8eef6';
    bar.innerHTML =
      '<a href="../../" style="color:inherit;text-decoration:none">← 返回量产量化计算器</a>' +
      '<span>蓝图由 <a href="https://github.com/zoujack018/dsp-handcraft" target="_blank" rel="noopener" style="color:inherit">dsp-handcraft</a> 生成（源码）</span>';
    document.body.insertBefore(bar, document.body.firstChild);
    // 右上角的版本按钮挪到这条下面，不压住源码链接
    var st = document.createElement('style');
    st.textContent = '#dshv{top:46px}';
    document.head.appendChild(st);
  });
})();
