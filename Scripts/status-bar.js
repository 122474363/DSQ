// status-bar.js - 网站状态栏提示组件
// 使用方法：在页面中引入此JS文件，然后调用 createStatusBar()

function createStatusBar(options = {}) {
  // 默认配置
  const defaultOptions = {
    message: "本站已更新域名，请更新您的收藏夹！",
    domain: "dsq.svlik.com",
    url: "https://dsq.svlik.com",
    warningText: "⚠️ 重要提示：",
    domainText: "新域名：",
    showCloseButton: false,
    autoShow: true,
    persistent: false, // 是否持久显示（不自动隐藏）
    adjustPagePadding: true, // 是否调整页面内边距避免遮挡
    statusBarHeight: 56, // 状态栏高度(px)
    mobileStatusBarHeight: 80 // 移动设备上状态栏高度(px)
  };
  
  // 合并配置
  const config = { ...defaultOptions, ...options };
  
  // 检查是否已存在状态栏
  if (document.getElementById('statusBar')) {
    console.log('状态栏已存在');
    return;
  }
  
  // 创建样式
  const style = document.createElement('style');
  style.textContent = `
    /* 状态栏样式 */
    .status-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #ffefef;
      border-bottom: 2px solid #ff6b6b;
      padding: 5px 20px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(255, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .status-bar.hidden {
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
    }
    
    /* 状态栏内容 */
    .status-content {
      color: #d32f2f;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.3px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      text-align: center;
    }
    
    /* 域名样式 */
    .domain {
      color: #b71c1c;
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid #ff8a80;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .domain:hover {
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(183, 28, 28, 0.2);
    }
    
    .close-btn {
      position: absolute;
      right: 15px;
      background: none;
      border: none;
      color: #d32f2f;
      font-size: 22px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .close-btn:hover {
      background-color: rgba(211, 47, 47, 0.1);
      transform: scale(1.1);
    }
    
    /* 闪烁动画效果 */
    .blink {
      animation: blink 2s infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0.8; }
    }
    
    /* 为页面内容添加顶部内边距，避免被状态栏遮挡 */
    body.has-status-bar {
      padding-top: ${config.statusBarHeight}px !important;
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      .status-content {
        font-size: 14px;
        flex-direction: column;
        gap: 5px;
      }
      
      .close-btn {
        position: relative;
        right: 0;
        margin-left: 15px;
        font-size: 20px;
      }
      
      .status-bar {
        flex-direction: column;
        padding: 10px 15px;
        text-align: center;
      }
      
      body.has-status-bar {
        padding-top: ${config.mobileStatusBarHeight}px !important;
      }
    }
    
    @media (max-width: 480px) {
      .status-content {
        font-size: 13px;
      }
      
      .domain {
        padding: 3px 8px;
        font-size: 13px;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // 创建状态栏HTML
  const statusBar = document.createElement('div');
  statusBar.className = 'status-bar';
  statusBar.id = 'statusBar';
  
  const statusContent = document.createElement('div');
  statusContent.className = 'status-content';
  
  // 添加闪烁警告图标
  const warningSpan = document.createElement('span');
  warningSpan.className = 'blink';
  warningSpan.textContent = config.warningText;
  
  // 添加消息文本
  const messageSpan = document.createElement('span');
  messageSpan.textContent = config.message;
  
  // 添加域名标签
  const domainLabelSpan = document.createElement('span');
  domainLabelSpan.textContent = config.domainText;
  
  // 添加域名链接
  const domainLink = document.createElement('a');
  domainLink.href = config.url;
  domainLink.className = 'domain';
  domainLink.textContent = config.domain;
  domainLink.target = '_blank';
  
  // 组装内容
  statusContent.appendChild(warningSpan);
  statusContent.appendChild(messageSpan);
  statusContent.appendChild(domainLabelSpan);
  statusContent.appendChild(domainLink);
  
  // 添加关闭按钮（如果启用）
  if (config.showCloseButton) {
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', '关闭提示');
    
    closeButton.addEventListener('click', function() {
      hideStatusBar();
      // 保存到localStorage，7天内不再显示
      localStorage.setItem('statusBarHidden', 'true');
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      localStorage.setItem('statusBarHiddenExpiry', expiry.toISOString());
    });
    
    statusBar.appendChild(closeButton);
  }
  
  statusBar.appendChild(statusContent);
  
  // 添加到页面
  document.body.insertBefore(statusBar, document.body.firstChild);
  
  // 为body添加类名（避免遮挡内容）
  if (config.adjustPagePadding) {
    document.body.classList.add('has-status-bar');
    
    // 为fixed定位的导航栏添加顶部边距
    const fixedElements = document.querySelectorAll('header, nav, .navbar, .header, .fixed-top, [style*="position: fixed"]');
    fixedElements.forEach(el => {
      if (getComputedStyle(el).position === 'fixed' && getComputedStyle(el).top === '0px') {
        const originalPadding = el.getAttribute('data-original-padding') || '';
        if (!originalPadding) {
          el.setAttribute('data-original-padding', el.style.paddingTop || '');
        }
        const currentPadding = parseInt(window.getComputedStyle(el).paddingTop) || 0;
        el.style.paddingTop = `${currentPadding + config.statusBarHeight}px`;
      }
    });
    
    // 为absolute定位且顶部为0的元素添加顶部边距
    const absoluteElements = document.querySelectorAll('[style*="position: absolute"]');
    absoluteElements.forEach(el => {
      const computedStyle = getComputedStyle(el);
      if (computedStyle.position === 'absolute' && computedStyle.top === '0px') {
        const originalMargin = el.getAttribute('data-original-margin') || '';
        if (!originalMargin) {
          el.setAttribute('data-original-margin', el.style.marginTop || '');
        }
        const currentMargin = parseInt(computedStyle.marginTop) || 0;
        el.style.marginTop = `${currentMargin + config.statusBarHeight}px`;
      }
    });
  }
  
  // 显示/隐藏状态栏的函数
  function showStatusBar() {
    statusBar.classList.remove('hidden');
    if (config.adjustPagePadding) {
      document.body.classList.add('has-status-bar');
    }
  }
  
  function hideStatusBar() {
    statusBar.classList.add('hidden');
    if (config.adjustPagePadding) {
      document.body.classList.remove('has-status-bar');
      
      // 恢复fixed定位元素的原始padding
      const fixedElements = document.querySelectorAll('header, nav, .navbar, .header, .fixed-top, [style*="position: fixed"]');
      fixedElements.forEach(el => {
        const originalPadding = el.getAttribute('data-original-padding');
        if (originalPadding !== null) {
          el.style.paddingTop = originalPadding;
        }
      });
      
      // 恢复absolute定位元素的原始margin
      const absoluteElements = document.querySelectorAll('[style*="position: absolute"]');
      absoluteElements.forEach(el => {
        const originalMargin = el.getAttribute('data-original-margin');
        if (originalMargin !== null) {
          el.style.marginTop = originalMargin;
        }
      });
    }
  }
  
  // 自动显示（如果配置允许）
  if (config.autoShow) {
    // 检查localStorage中是否已标记为隐藏
    const isHidden = localStorage.getItem('statusBarHidden');
    const expiry = localStorage.getItem('statusBarHiddenExpiry');
    
    if (isHidden === 'true' && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);
      
      if (now < expiryDate && !config.persistent) {
        // 在有效期内，不显示
        hideStatusBar();
      } else {
        // 已过期或配置为持久显示，显示并清除存储
        localStorage.removeItem('statusBarHidden');
        localStorage.removeItem('statusBarHiddenExpiry');
        showStatusBar();
      }
    } else {
      showStatusBar();
    }
  }
  
  // 返回控制函数
  return {
    show: showStatusBar,
    hide: hideStatusBar,
    element: statusBar
  };
}

// 自动初始化（如果配置了自动启动）
if (typeof window.statusBarAutoInit !== 'undefined' && window.statusBarAutoInit) {
  document.addEventListener('DOMContentLoaded', function() {
    createStatusBar(window.statusBarConfig || {});
  });
}

// 导出函数以便模块化使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createStatusBar;
}