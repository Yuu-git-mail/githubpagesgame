/**
 * common.js - 共通ヘッダー・フッター・ナビゲーション制御
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 共通ヘッダーの自動生成
  const headerElem = document.getElementById('game-header');
  if (headerElem) {
    const title = headerElem.getAttribute('data-title') || 'GAME';
    const backPath = headerElem.getAttribute('data-back') || '../../index.html';
    const hasReset = headerElem.hasAttribute('data-reset');

    headerElem.innerHTML = `
      <a href="${backPath}" class="btn btn-secondary header-btn" aria-label="メニューに戻る">← メニュー</a>
      <h1 class="header-title">${title}</h1>
      ${hasReset ? `<button id="btn-header-reset" class="btn btn-secondary header-btn" aria-label="リセット">リセット</button>` : `<div style="width: 70px;"></div>`}
    `;

    if (hasReset) {
      const resetBtn = document.getElementById('btn-header-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (typeof window.resetGame === 'function') {
            window.resetGame();
          } else {
            window.location.reload();
          }
        });
      }
    }
  }

  // 2. 共通フッターの挿入
  const footerElem = document.getElementById('game-footer');
  if (footerElem) {
    footerElem.innerHTML = `
      <p class="info-ss">© 2026 Game Hub Portal | GitHub Pages Static Game Collection</p>
    `;
  }
});

// タッチデバウンス処理ユーティリティ
window.createTouchDebounce = function(fn, delay = 100) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
};
