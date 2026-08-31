# チケット03: Product Detail ページ

## 概要

商品詳細ページ。カラー・サイズ選択の上でカートに追加できるようにする。`tickets/README.md` の共通ルールに従うこと。

## 対象ファイル（新規作成のみ）

- `product.html`
- `css/pages/product.css`（必要な場合のみ）
- `js/pages/product.js`

## 依存するAPI（チケット00）

```html
<script src="js/products.js"></script>
<script src="js/cart.js"></script>
```

```js
TacetProducts.getById(id)   // -> Product
TacetCart.addItem({ id, name, price, color, size, qty, image })
```

チケット00未完成でも、このシグネチャ前提でコードを書いて進めてよい。

## 要件定義書の該当箇所

- 要件定義.md 5章「サイト構成」#4 Product Detail
- 要件定義.md 6章「コンテンツ要件」（商品情報項目：商品名・カテゴリ・価格・説明文・カラー・サイズ・画像）

## 構成案

1. `location.search` から `id` を取得し、`TacetProducts.getById(id)` で商品情報を取得・描画（見つからない場合は Collection ページへの導線を表示）
2. 画像ギャラリー（`product.images` を使い、複数の `.ph` ブロックを並べる。左右送りなどのギミックは不要、縦並びで可）
3. 商品名・価格・説明文
4. カラー選択（ボタン列、選択状態を視覚的に表現）
5. サイズ選択（同上）
6. 数量選択（デフォルト1、+/-または数値入力）
7. 「カートに入れる」ボタン → `TacetCart.addItem(...)` を呼び出し、追加後にフィードバック表示（トースト的なメッセージでよい。ページ遷移はしない）

## Definition of Done

- [ ] `product.html?id=p01` 等でURLパラメータに応じた商品情報が表示される
- [ ] カラー・サイズを選択しないと「カートに入れる」を実行できない（未選択時はボタン無効化 or バリデーションメッセージ）
- [ ] カートに追加後、ヘッダーのカート件数がその場で更新される
- [ ] 375 / 768 / 1024 / 1440px で崩れないことを確認済み
