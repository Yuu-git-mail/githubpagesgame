# HTML/CSS画面レイアウト & UIガイドライン (docs/ui_guidelines.md)

本ドキュメントは、スマートフォン・タブレット・PCでの閲覧・プレイを前提としたWeb画面レイアウトおよび統一UIのデザイン規約です。

---

## 1. Viewport (視域) 設定規約

ヘッダー領域（`<head>` 内）には必ず端末適応用の viewport タグを定義します。

* **ズーム許可標準設定**:
  ```html
  <meta name="viewport" content="width=device-width, minimum-scale=1.0">
  ```
* **アプリ風固定設定（タッチ操作中心のゲーム等）**:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  ```

---

## 2. 画面はみ出し・見切れ防止 (左右余白5%ルール)

画面横幅全体を100%としたとき、左右にそれぞれ **5%** の余白（合計10%）を確保し、中央寄せで配置します。

* **実装パターン**:
  ```css
  .container {
    width: 90%;
    max-width: 600px; /* PC・タブレット時の過大拡大防止 */
    margin: 0 auto;
  }
  ```
* **注意**: 幅指定には絶対値（`px`）ではなく必ず相対値（`%` や `max-width`）を使用します。

---

## 3. フォントサイズの土台と標準パターン (`1.0rem = 10px`)

ルート要素 `html` の `font-size` を `62.5%` に設定することで、`1.0rem = 10px` 基準で計算が容易かつ高精度な設計を実現します。

```css
html {
  font-size: 62.5%; /* 16px × 0.625 = 10px 基準 */
}
```

### 用途別フォントサイズ一覧
| 用途 | サイズ | CSS指定 | 備考 |
|---|---|---|---|
| **ページタイトル (H1相当)** | 30px | `font-size: 3.0rem; font-weight: 700;` | 画面最上部タイトル |
| **コーナー見出し (H2相当)** | 19px | `font-size: 1.9rem; font-weight: 700;` | カテゴリー・セクション名 |
| **通常説明文・ボタン (M)** | 15px | `font-size: 1.5rem;` | 本文、標準操作ボタン |
| **詳細説明文 (S)** | 12px | `font-size: 1.2rem;` | サブテキスト、操作説明 |
| **インフォメーション等 (SS)** | 10px | `font-size: 1.0rem;` | 著作権表示、注釈 |

---

## 4. 可読性を高める行間設定 (`line-height`)

文章の読みやすさを確保するため、`body` に推奨範囲（1.4〜1.7倍）の行間を設定します。

```css
body {
  line-height: 1.4; /* 1.4〜1.7倍を推奨 */
}
```

---

## 5. カラーテーマ & OSダークモード対応

OSのダークモード設定に自動追従するCSSカスタムプロパティ（変数）設計を採用します。

```css
:root {
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --accent-color: #2563eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #121820;      /* 濃いダークグレー */
    --card-bg: #1a202c;
    --text-main: #f7fafc;      /* 白・薄グレー */
    --text-muted: #e2e8f0;
    --accent-color: #3182ce;  /* 落ち着いたブルー */
  }
}
```

---

## 6. 共通フレームワーク & コンポーネント構造

全ゲーム共通のUI統一を図るため、以下のHTML/CSS構造を遵守します。

1. **共通ヘッダー (`#game-header`)**:
   `<header id="game-header" data-title="[タイトル]" data-back="../../index.html" data-reset></header>`
2. **キャンバス保護フレーム (`.game-canvas-wrapper`)**:
   `canvas.game-canvas` の `touch-action: none;` でスワイプ・スクロール干渉を完全カット。
3. **タッチ操作キーパッド (`.controls-panel`)**:
   スマホ閲覧用に最小44px高さの大きなタッチボタンを配置。
