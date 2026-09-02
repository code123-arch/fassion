# 商品画像 生成プロンプト集

`js/products.js` に定義した順（p01→p14）で、各商品2枚（メイン／ディテール）のプロンプトをまとめています。
画像生成AI（Midjourney / DALL-E / Stable Diffusion 等）にこのプロンプトをそのまま投げ、生成した画像は下記の**ファイル名で** `assets/images/` 直下に保存してください。

## 命名規則・共通仕様

- ファイル名: `p{商品ID2桁}-{1=メイン, 2=ディテール}.jpg`（例: `p01-1.jpg`, `p01-2.jpg`）
- アスペクト比: 縦長 3:4（`css/style.css` の `.product-card .ph { aspect-ratio: 3/4 }` に合わせる）
- 全画像共通スタイル（プロンプト末尾に必ず付与）:

```
editorial minimalist luxury fashion photography for a quiet, refined Japanese fashion brand called "TACET";
muted neutral color palette, warm off-white background (#F5F3EF) or warm greige background (#EAE6DE),
ink-black accents (#1A1917); soft diffused natural light, gentle low-contrast shadows; subtle fine film grain;
generous negative space around the subject; calm, serene, sophisticated mood; shot on medium-format film camera,
85mm lens look, shallow depth of field; no visible logos, no text, no other people in frame; vertical 3:4 aspect ratio
```

以下の各プロンプトは、この共通スタイル文を**末尾に結合**して使ってください（重複を避けるため個別プロンプトには含めていません）。

---

## Outerwear

### p01 ウールメルトン ロングコート（Black / Greige）
- **p01-1.jpg（メイン）**: `full-body front view of a model wearing a black wool melton long coat, floor-length hem visible, standing still, arms relaxed at sides`
- **p01-2.jpg（ディテール）**: `close-up of the coat's collar and shoulder area, dense brushed wool melton texture clearly visible, soft raking light`

### p02 カシミヤブレンド チェスターコート（Black / Camel）
- **p02-1.jpg（メイン）**: `three-quarter angle full-body view of a model wearing a black chesterfield coat with cashmere blend fabric, notch lapel clearly visible, elegant draping`
- **p02-2.jpg（ディテール）**: `macro close-up of cashmere blend coat fabric surface, soft subtle sheen, fine fiber texture`

### p03 ステンカラーコート（Greige / Black）
- **p03-1.jpg（メイン）**: `full-body front view of a model wearing a greige stand-fall collar coat, clean minimal collar, lightweight drape, framed to show full length`
- **p03-2.jpg（ディテール）**: `close-up of the stand-fall collar folded neatly, soft fabric drape around the neckline`

### p04 ノーカラーウールジャケット（Black）
- **p04-1.jpg（メイン）**: `front view half-to-full body of a model wearing a black collarless wool jacket draped over the shoulders, minimal clean neckline`
- **p04-2.jpg（ディテール）**: `close-up of the collarless neckline seam and shoulder line of the wool jacket, or a back view showing the clean silhouette`

## Tops

### p05 シルクブレンド ブラウス（Ivory / Black）
- **p05-1.jpg（メイン）**: `upper body shot of a model wearing an ivory silk-blend blouse, diagonal soft light catching subtle sheen, fabric skims the body without clinging`
- **p05-2.jpg（ディテール）**: `close-up of the blouse fabric drape near the waist, silk-blend sheen and soft folds visible`

### p06 コットンリネン シャツ（White / Greige）
- **p06-1.jpg（メイン）**: `upper body front shot of a model wearing a white cotton-linen shirt, natural relaxed stance, crisp yet soft fabric`
- **p06-2.jpg（ディテール）**: `close-up of the shirt cuff and button placket, visible linen texture with natural wrinkles and crisp weave`

### p07 ハイゲージ ニットプルオーバー（Black / Ivory）
- **p07-1.jpg（メイン）**: `upper body shot of a model wearing a black fine-gauge knit pullover, layered look, clean silhouette`
- **p07-2.jpg（ディテール）**: `macro close-up of the fine-gauge knit stitch pattern, tightly spun yarn texture`

### p08 タートルネック カットソー（Black / Greige / Ivory）
- **p08-1.jpg（メイン）**: `close-up bust-up shot of a model wearing a black fitted turtleneck, clean neckline fit, soft studio light`
- **p08-2.jpg（ディテール）**: `close-up of the turtleneck cotton jersey fabric texture, or a back view showing the fitted silhouette`

## Bottoms

### p09 テーパード ウールトラウザー（Black / Greige）
- **p09-1.jpg（メイン）**: `full-body shot of a model wearing black tapered wool trousers, silhouette narrowing gently toward the ankle, clean vertical line`
- **p09-2.jpg（ディテール）**: `close-up of the ankle hem showing the tapered line and wool fabric texture`

### p10 ワイドシルエット スラックス（Black）
- **p10-1.jpg（メイン）**: `full-body front shot of a model wearing black wide-leg slacks, voluminous relaxed silhouette, minimal styling`
- **p10-2.jpg（ディテール）**: `close-up of the waistband and hip area showing the fabric's relaxed volume, or a low-angle shot of the wide hem drape`

### p11 ストレートデニム（Indigo / Black）
- **p11-1.jpg（メイン）**: `full-body front shot of a model wearing straight-leg indigo denim jeans, classic rigid silhouette`
- **p11-2.jpg（ディテール）**: `macro close-up of the denim weave and indigo fading, visible fabric texture`

### p12 タックプリーツスカート（Black / Greige）
- **p12-1.jpg（メイン）**: `full-body shot of a model wearing a black tuck-pleat A-line long skirt, slight walking motion to show pleat movement`
- **p12-2.jpg（ディテール）**: `close-up of the pleats at hip and thigh level, soft shadow lines between each tuck pleat`

## Accessories

### p13 レザー ミニマルウォレット（Black / Brown）
- **p13-1.jpg（メイン）**: `still life product shot of a closed black minimal leather bifold wallet resting on a neutral off-white surface, soft top light`
- **p13-2.jpg（ディテール）**: `macro close-up of the leather grain and stitching detail of the wallet, or an angled shot of the wallet slightly open`

### p14 シルク混 ロングスカーフ（Black / Greige / Ivory）
- **p14-1.jpg（メイン）**: `still life shot of a black silk-blend long scarf loosely folded on a neutral surface, soft shadow and drape visible`
- **p14-2.jpg（ディテール）**: `close-up of the draped silk-blend scarf catching soft light, sheen and fluid fabric fall clearly visible`

---

## 生成後の運用について（メモ）

- `js/products.js` の `images` フィールドは現状 `.ph-1`〜`.ph-3` のプレースホルダークラス名を参照する設計です。実画像を `assets/images/` に配置した後、`images` を実ファイルパス（例: `['assets/images/p01-1.jpg', 'assets/images/p01-2.jpg']`）に差し替える対応は別タスクとして行ってください（HTML側のマークアップ構造は変えずに `<img src>` / `background-image` に差し替え可能な設計になっています）。
- 現在のデータ構造は商品1点につき画像2枚をカラーバリエーション共通で使い回します。色別の実写を用意する場合は、上記メインカットのカラーを代表色（配列の先頭色）で撮影・生成するのが最もシンプルです。
