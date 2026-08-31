# チケット00: 基盤（商品モックデータ・カートロジック）

## 概要

Collection / Product Detail / Cart / Checkout の各ページが共通で使う「商品データ」と「カート操作ロジック」を実装する。他チケットはこのチケットが公開するAPIに依存するため、シグネチャを変更する場合は `tickets/README.md` のAPI契約サマリーも合わせて更新すること。

## 対象ファイル（新規作成のみ）

- `js/products.js`
- `js/cart.js`

既存ファイル（`js/main.js`, `css/style.css`, `index.html`）は変更しない。

## 要件定義書の該当箇所

- 要件定義.md 6章「コンテンツ要件」（商品ラインナップ・価格帯・情報項目）
- 要件定義.md 8章「技術要件」（`localStorage` キー: `tacet_cart`）

## 実装詳細

### `js/products.js`

- カテゴリ: `Outerwear` / `Tops` / `Bottoms` / `Accessories` の4カテゴリで、合計14点程度のモック商品データを定義する。
- 価格帯: ¥18,000〜¥98,000 の範囲でばらけさせる。
- 画像は実素材がないため、`css/style.css` に定義済みの `.ph-1` / `.ph-2` / `.ph-3` のいずれかをクラス名で指定する形にする（配列で複数枚持たせ、Product Detailのギャラリーで使い回す）。

```js
// js/products.js
window.TACET_PRODUCTS = [
  {
    id: 'p01',
    name: 'ウールメルトン ロングコート',
    category: 'Outerwear',
    price: 68000,
    description: '上質なウールメルトン素材を用いた、シルエットにこだわったロングコート。',
    colors: ['Black', 'Greige'],
    sizes: ['S', 'M', 'L'],
    images: ['ph-1', 'ph-2'],
  },
  // ...計14点程度
];

window.TacetProducts = {
  getById(id) {
    return window.TACET_PRODUCTS.find((p) => p.id === id);
  },
  getByCategory(category) {
    if (!category || category === 'All') return window.TACET_PRODUCTS;
    return window.TACET_PRODUCTS.filter((p) => p.category === category);
  },
};
```

### `js/cart.js`

- `localStorage` のキーは `tacet_cart` で固定（`js/main.js` が既にこのキーを読んでカート件数を表示しているため、キー名・データ形状を変えないこと）。
- カート内の1商品は「商品ID＋カラー＋サイズ」の組み合わせで一意に扱う（同じ商品でも色・サイズ違いは別明細行）。
- 各操作の後、ヘッダーのカート件数表示（`[data-cart-count]`）をその場で更新すること。ページ再読み込みなしで反映されるようにする（`js/main.js` は変更せず、`cart.js` 内で完結させる）。

```js
// js/cart.js
const CART_KEY = 'tacet_cart';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  refreshHeaderCount();
}

function refreshHeaderCount() {
  const el = document.querySelector('[data-cart-count]');
  if (!el) return;
  const count = readCart().reduce((sum, item) => sum + item.qty, 0);
  el.textContent = `(${count})`;
}

window.TacetCart = {
  getCart: readCart,

  // item: { id, name, price, color, size, qty, image }
  addItem(item) {
    const items = readCart();
    const existing = items.find(
      (i) => i.id === item.id && i.color === item.color && i.size === item.size
    );
    if (existing) {
      existing.qty += item.qty;
    } else {
      items.push(item);
    }
    writeCart(items);
  },

  removeItem(id, color, size) {
    const items = readCart().filter(
      (i) => !(i.id === id && i.color === color && i.size === size)
    );
    writeCart(items);
  },

  updateQty(id, color, size, qty) {
    const items = readCart();
    const target = items.find((i) => i.id === id && i.color === color && i.size === size);
    if (target) target.qty = qty;
    writeCart(items.filter((i) => i.qty > 0));
  },

  getSubtotal() {
    return readCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  clearCart() {
    writeCart([]);
  },
};

document.addEventListener('DOMContentLoaded', refreshHeaderCount);
```

上記はそのまま実装の出発点として使ってよい。commodityとして14点分のデータ拡充と、カテゴリ・価格帯の妥当性チェックのみ行うこと。

## Definition of Done

- [ ] `js/products.js` に14点程度の商品データと `TacetProducts.getById` / `getByCategory` が実装されている
- [ ] `js/cart.js` に上記APIが実装され、`tacet_cart` キーで `localStorage` に永続化される
- [ ] `addItem` / `removeItem` / `updateQty` 実行後、同一タブ内でヘッダーのカート件数表示が即時更新される
- [ ] ブラウザの開発者ツールから `TacetCart.addItem({id:'p01', name:'test', price:1000, color:'Black', size:'M', qty:1})` を実行し、`localStorage.getItem('tacet_cart')` に反映されることを確認済み
