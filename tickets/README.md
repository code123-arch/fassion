# チケット一覧（並行開発ガイド）

前提ドキュメント: [`../要件定義.md`](../要件定義.md)

## 進め方

- 各チケットは独立したファイルとして切り出してあり、それぞれ**自分専用の新規ファイルのみ**を作成・変更する設計にしてあります。共有ファイル（`css/style.css`, `js/main.js`, `index.html`）は**変更しないこと**を全チケット共通のルールとします。
- 複数の Claude Code セッションで同時に着手して問題ありません。ファイルの奪い合いが起きないよう、下記「ファイル所有マップ」で担当範囲を確認してください。
- チケット00（基盤）は他ページが使う API（関数の呼び出し方）を定義しますが、**実ファイルの完成を待たずに他チケットは着手可能**です。各チケットに書かれている「依存するAPI」の記述どおりに `<script>` を読み込み、呼び出しコードを書いておけば、チケット00がマージされた時点でそのまま動きます。

## チケット一覧

| # | チケット | ファイル | 並行可否 |
|---|---|---|---|
| 00 | 基盤（商品データ・カートロジック） | [00-foundation-data-cart.md](00-foundation-data-cart.md) | 最優先で着手推奨。他チケットと同時進行可 |
| 01 | Concept ページ | [01-page-concept.md](01-page-concept.md) | 並行可（依存なし） |
| 02 | Collection ページ | [02-page-collection.md](02-page-collection.md) | 並行可（00のAPI契約に依存） |
| 03 | Product Detail ページ | [03-page-product-detail.md](03-page-product-detail.md) | 並行可（00のAPI契約に依存） |
| 04 | Cart ページ | [04-page-cart.md](04-page-cart.md) | 並行可（00のAPI契約に依存） |
| 05 | Checkout ページ | [05-page-checkout.md](05-page-checkout.md) | 並行可（00のAPI契約に依存） |
| 06 | Lookbook ページ | [06-page-lookbook.md](06-page-lookbook.md) | 並行可（依存なし） |
| 07 | Stores / Contact ページ | [07-page-contact-stores.md](07-page-contact-stores.md) | 並行可（依存なし） |
| 08 | Legal ページ | [08-page-legal.md](08-page-legal.md) | 並行可（依存なし） |

## ファイル所有マップ（衝突防止）

| チケット | 新規作成するファイル |
|---|---|
| 00 | `js/products.js`, `js/cart.js` |
| 01 | `concept.html`, `css/pages/concept.css`（必要な場合のみ） |
| 02 | `collection.html`, `css/pages/collection.css`, `js/pages/collection.js` |
| 03 | `product.html`, `css/pages/product.css`, `js/pages/product.js` |
| 04 | `cart.html`, `css/pages/cart.css`（必要な場合のみ）, `js/pages/cart.js` |
| 05 | `checkout.html`, `css/pages/checkout.css`（必要な場合のみ）, `js/pages/checkout.js` |
| 06 | `lookbook.html`, `css/pages/lookbook.css`（必要な場合のみ） |
| 07 | `contact.html`, `css/pages/contact.css`（必要な場合のみ） |
| 08 | `legal.html`, `css/pages/legal.css`（必要な場合のみ、基本はテキスト中心なので不要な想定） |

ページ固有のJS（一覧のフィルタリング、詳細ページのカラー/サイズ選択、カート・注文確認の描画など）は `js/pages/<ページ名>.js` に新規作成し、共通ファイルは触らないこと。

ページ専用CSSが必要な場合は `css/pages/<ページ名>.css` に新規作成し、そのページのHTML内で `css/style.css` の**後**に読み込むこと（共通トークンを上書きできるように）。既存の `css/style.css` へのクラス追加・変更が必要だと感じた場合は、直接編集せず「不足しているトークン／コンポーネント」としてチケットの完了報告に書き添え、後で統合すること。

## 共通ルール（全ページ共通）

- ヘッダー・フッターのマークアップは `index.html` にある実装をそのままコピーして使うこと（独自に作り直さない）。ナビゲーションの現在地表示など細かな差分のみ許容。
- `<head>` 内の Google Fonts 読み込み・`css/style.css` の読み込みは `index.html` と同一にすること。
- ページ末尾で `js/main.js` を読み込むこと（ヘッダーのカート件数表示に必要）。
- 画像は全てプレースホルダー（`.ph` / `.ph-1` 〜 `.ph-3` クラス）を使うこと。実素材の差し込みは対象外。
- レスポンシブ対応必須（375 / 768 / 1024 / 1440px）。

## カート・商品データ API 契約（サマリー）

詳細はチケット00参照。依存するチケットはこのインターフェースを前提にコーディングしてよい。

```html
<script src="js/products.js"></script>
<script src="js/cart.js"></script>
```

```js
// products.js が公開するもの
window.TACET_PRODUCTS // Array<Product>
TacetProducts.getById(id) // -> Product | undefined
TacetProducts.getByCategory(category) // 'All' | 'Outerwear' | 'Tops' | 'Bottoms' | 'Accessories' -> Array<Product>

// cart.js が公開するもの
TacetCart.getCart()                                            // -> Array<CartItem>
TacetCart.addItem({ id, name, price, color, size, qty, image }) // -> void
TacetCart.removeItem(id, color, size)                          // -> void
TacetCart.updateQty(id, color, size, qty)                      // -> void
TacetCart.getSubtotal()                                        // -> number
TacetCart.clearCart()                                          // -> void
```
