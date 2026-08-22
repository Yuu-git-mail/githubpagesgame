# AGENT_LESSONS.md (開発知見・マルチゲーム構築ルール)

本ドキュメントは、Antigravity AI Agentチームによるモバイルゲームポータル開発で得られたナレッジベースです。

---

## 1. 共通アーキテクチャとGitHub Pages配信戦略

### サブフォルダ配信と相対パス (`base: './'`) の鉄則
- ポータルサイト（`index.html`）配下に各ゲーム（`games/<game_name>/index.html`）を配置する静的構成。
- サブフォルダからのルート参照は常に `../../` （`../../css/common.css`, `../../js/common.js`, `../../index.html`）を使用。
- `.nojekyll` ファイルを直下に設置し、アンダースコア等のアセット除外事故を防止。

---

## 2. モバイル/iOS Safari 互換性ハマりポイント

1. **タッチ・ポインター二重発火の防止**:
   - iOS Safari で `pointerdown` / `touchstart` / `click` が重複発火する問題を防止するため、デバウンス制御 (`createTouchDebounce`) または `touch-action: manipulation;` を適用。
2. **キャンバス解像度と Retina スケーリング**:
   - `window.devicePixelRatio` に基づく Canvas 内部解像度補正と、CSSサイズ (`width: 100%`) の分離設計。
3. **Web Audio API 自動再生制限対策**:
   - 音響再生コードは全て `try { ... } catch {}` で保護し、初回のユーザー操作（ボタンタップ等）で `AudioContext.resume()` をコール。

---

## 3. サブエージェント並列制作での統一仕様管理

- 各ゲームのHTMLには直接重複するスタイルやスクリプトを書かず、`common.css` と `common.js` をインポート。
- ヘッダー内のタイトル・戻るボタン・リセットボタンは `data-title`, `data-back`, `data-reset` 属性によって `common.js` が統一レンダリング。
- 各ゲームコンポーネントは `window.resetGame()` グローバルメソッドを実装し、統一ヘッダーのリセットボタンからいつでもゲームを初期化可能。
