# Concept ページ用画像

画像生成APIがこの環境になかったため、暫定措置として `concept.html` には写真の代わりに
ブランドカラー（#F5F3EF / #EAE6DE / #1A1917 / #8C8275 / #D8D3C9）を使った抽象SVG画像
（グラデーション＋グレイン＋幾何学的モチーフ）を作成し、`<img class="ph ...">` として
挿入済み。実写素材が用意でき次第、同じファイル名（拡張子は `.jpg` 等に変更可）で
このフォルダに配置し、`concept.html` 内の `src` 属性を差し替えれば良い。

| ファイル名（現状） | 出現箇所（concept.html） | 推奨サイズ比 |
|---|---|---|
| `concept-hero.svg` | ヒーロー背景（`.hero-media`） | 縦 4:5〜3:4 推奨（画面幅いっぱいに `cover` 表示されるため、天地に余裕のある構図） |
| `concept-material.svg` | Our Commitments「01 — 素材」（`.ph.ph-1`） | 縦 3:4 |
| `concept-tailoring.svg` | Our Commitments「02 — 仕立て」（`.ph.ph-2`） | 縦 3:4 |
| `concept-presence.svg` | Our Commitments「03 — 佇まい」（`.ph.ph-3`） | 縦 3:4 |

以下のプロンプトは、外部の画像生成サービス（Midjourney／DALL-E／Stable Diffusion等）で
実写風の代替画像を作りたい場合の参考として残してある。

## 生成プロンプト

ブランドトーン: ラグジュアリー・ミニマル、モノトーン〜低彩度、静けさ・余白。
共通カラーガイド: 背景 #F5F3EF / #EAE6DE、基調色 #1A1917、アクセント #8C8275、彩度低めのウォームグレー〜アイボリー系。

### 1. concept-hero.jpg（ヒーロー背景）

```
Editorial fashion photography, a single model standing in a minimalist studio space,
wearing an oversized wool coat in muted charcoal and stone tones, quiet and still pose,
gaze lowered or looking away from camera, no visible facial expression of emotion,
vast negative space around the subject, subject positioned off-center,
soft directional studio light, low contrast, desaturated warm-grey and ivory palette
(#F5F3EF, #1A1917, #8C8275), fine film grain, muted moody atmosphere,
luxury minimalist brand campaign style, vertical portrait orientation,
darker tone toward the bottom of the frame for text overlay legibility,
shot on medium format film, shallow depth of field, no logos, no text, no bright colors
```

ネガティブ要素: 派手な色、笑顔・強い表情、ロゴ・柄物、賑やかな背景、複数人物。

### 2. concept-material.jpg（素材クローズアップ）

```
Extreme close-up macro photograph of luxury fabric texture, wool-silk blend cloth
draped and folded, visible weave and soft drape, natural fiber texture,
neutral warm-grey and ivory tones (#EAE6DE, #D8D3C9), soft diffused natural light,
shallow depth of field, no people, no logos, minimalist still-life product photography,
fine grain, quiet and tactile mood, editorial luxury fashion material shot
```

ネガティブ要素: 光沢の強い化繊素材感、原色、ロゴプリント。

### 3. concept-tailoring.jpg（仕立てディテール）

```
Close-up detail photograph of tailored garment construction, focus on stitching line,
collar or shoulder seam, clean minimal silhouette, sharp linear composition,
monochrome charcoal and ivory tones (#1A1917, #F5F3EF), directional side light
creating subtle shadow to emphasize fabric structure, no visible face,
editorial luxury fashion detail shot, fine film grain, quiet precise mood
```

ネガティブ要素: 装飾的なボタンやアクセサリー、派手な色、ロゴ。

### 4. concept-presence.jpg（佇まいポートレート）

```
Editorial fashion portrait, model from behind or in profile, wearing minimalist
tailored outerwear in muted stone and charcoal tones, calm still posture,
large negative space, subject placed to one side of frame, soft overcast-style
studio lighting, desaturated warm-grey palette (#F5F3EF, #8C8275, #1A1917),
fine film grain, quiet contemplative mood, luxury minimalist brand photography,
vertical portrait orientation, no visible facial expression, no logos, no text
```

ネガティブ要素: 正面からの笑顔、強いポーズ、鮮やかな色、複数人物。
