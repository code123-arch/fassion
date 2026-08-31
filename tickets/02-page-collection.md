# チケット02: Collection ページ

## 概要

商品一覧＋カテゴリフィルタページ。`tickets/README.md` の共通ルールに従うこと。

## 対象ファイル（新規作成のみ）

- `collection.html`
- `css/pages/collection.css`（必要な場合のみ）
- `js/pages/collection.js`

## 依存するAPI（チケット00）

```html
<script src="js/products.js"></script>
```

```js
window.TACET_PRODUCTS       // Array<Product>
TacetProducts.getByCategory(category) // 'All' | 'Outerwear' | 'Tops' | 'Bottoms' | 'Accessories'
```

チケット00がまだ完成していなくても、上記シグネチャを前提にコードを書いて進めてよい。実ファイルが揃い次第そのまま動作する想定。

## 要件定義書の該当箇所

- 要件定義.md 5章「サイト構成」#3 Collection
- 要件定義.md 6章「コンテンツ要件」（カテゴリ・価格帯・情報項目）

## 構成案

1. ページ見出し（「Collection」、簡潔な導入文）
2. カテゴリフィルタ（All / Outerwear / Tops / Bottoms / Accessories のタブまたはボタン列。クリックで一覧をクライアントサイドで絞り込み）
3. 商品グリッド（`index.html` の `.product-row` / `.product-card` パターンを流用。デスクトップ4列、タブレット2〜3列、モバイル2列）
4. 各商品カードは `product.html?id=<id>` へのリンクとする

## 実装メモ

- `js/pages/collection.js` で `TACET_PRODUCTS` を読み込み、DOMに動的にカードを描画する（静的に14枚書き並べるのではなく、データ駆動にする）。
- フィルタ状態はページ内メモリのみで良い（URLパラメータやlocalStorageへの永続化は不要）。

## Definition of Done

- [ ] `collection.html` が作成され、`index.html` と同一のヘッダー・フッターを持つ
- [ ] 全商品がグリッド表示され、カテゴリフィルタで絞り込める
- [ ] 各カードから `product.html?id=<id>` に正しく遷移する
- [ ] 375 / 768 / 1024 / 1440px で崩れないことを確認済み
