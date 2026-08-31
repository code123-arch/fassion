# チケット04: Cart ページ

## 概要

カート内容の確認・数量変更・削除ができるページ。`tickets/README.md` の共通ルールに従うこと。

## 対象ファイル（新規作成のみ）

- `cart.html`
- `css/pages/cart.css`（必要な場合のみ）
- `js/pages/cart.js`

## 依存するAPI（チケット00）

```html
<script src="js/cart.js"></script>
```

```js
TacetCart.getCart()                          // -> Array<CartItem>
TacetCart.removeItem(id, color, size)
TacetCart.updateQty(id, color, size, qty)
TacetCart.getSubtotal()                      // -> number
```

チケット00未完成でも、このシグネチャ前提でコードを書いて進めてよい。

## 要件定義書の該当箇所

- 要件定義.md 5章「サイト構成」#5 Cart
- 要件定義.md 8章「技術要件」（`localStorage` キー: `tacet_cart`）

## 構成案

1. カート内商品を一覧表示（画像プレースホルダー・商品名・カラー・サイズ・単価・数量・小計）
2. 数量変更（変更したら即座に `TacetCart.updateQty` を呼び、表示と小計を再計算）
3. 削除ボタン（`TacetCart.removeItem` を呼び、一覧から即時除去）
4. 小計・合計金額の表示（`TacetCart.getSubtotal()`）
5. カートが空の場合は「Collectionを見る」導線を表示
6. Checkoutページへ進むボタン（`checkout.html` へ）

## Definition of Done

- [ ] `cart.html` を開くと `localStorage` の内容がそのまま一覧表示される
- [ ] 数量変更・削除が即座に画面と `localStorage` に反映される
- [ ] 空カート時の表示が用意されている
- [ ] 375 / 768 / 1024 / 1440px で崩れないことを確認済み
