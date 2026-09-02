# Lookbook 画像格納フォルダ

`lookbook.html` のビジュアルグリッド（`.lookbook-grid` 内の14枚）用の画像。

現在は `lookbook-01.svg` 〜 `lookbook-14.svg` として、エディトリアル風の
抽象シルエット・プレースホルダー（グラデーション＋グレイン＋簡易な人物/物撮り
シルエット＋「LOOK 0N」ラベル）を実際に `lookbook.html` へ差し込み済みです。
実写・AI生成の写真素材ではありません。フォトジェネレーターが使えない環境で
`.ph` の単色プレースホルダーより完成度の高い仮組みとして用意したものです。

実写・AI生成画像が用意でき次第、同じファイル名（`lookbook-01.jpg` など）で
このフォルダに上書き保存し、`lookbook.html` 側の `src` 拡張子を `.svg` から
差し替えてください（比率さえ揃えればレイアウトは崩れません）。生成用の
プロンプトは `PROMPTS.md` を参照してください。

コード上の登場順・サイズパターン・比率と、ファイル名は以下の通り対応させます。

| ファイル名 | 登場順 | サイズパターン | 比率（向き） |
|---|---|---|---|
| `lookbook-01.jpg` | 1 | `lb-xl`（大） | 3:4 縦 |
| `lookbook-02.jpg` | 2 | `lb-lg`（中大） | 4:5 縦 |
| `lookbook-03.jpg` | 3 | `lb-md`（小） | 1:1 正方形 |
| `lookbook-04.jpg` | 4 | `lb-sm`（横長） | 16:9 横 |
| `lookbook-05.jpg` | 5 | `lb-lg`（中大） | 4:5 縦 |
| `lookbook-06.jpg` | 6 | `lb-xl`（大） | 3:4 縦 |
| `lookbook-07.jpg` | 7 | `lb-sm`（横長） | 16:9 横 |
| `lookbook-08.jpg` | 8 | `lb-md`（小） | 1:1 正方形 |
| `lookbook-09.jpg` | 9 | `lb-xl`（大） | 3:4 縦 |
| `lookbook-10.jpg` | 10 | `lb-lg`（中大） | 4:5 縦 |
| `lookbook-11.jpg` | 11 | `lb-md`（小） | 1:1 正方形 |
| `lookbook-12.jpg` | 12 | `lb-sm`（横長） | 16:9 横 |
| `lookbook-13.jpg` | 13 | `lb-lg`（中大） | 4:5 縦 |
| `lookbook-14.jpg` | 14 | `lb-xl`（大） | 3:4 縦 |

画像が揃ったら `lookbook.html` の該当する `<div class="ph ph-X"></div>` を
`<img src="assets/images/lookbook/lookbook-XX.jpg" alt="..." loading="lazy" class="ph-X">`
に差し替えます（`.ph` の代わりに実画像を敷き、`object-fit: cover` を当てる想定。
`aspect-ratio` 指定は `css/pages/lookbook.css` 側にすでにあるためそのまま流用可）。

画像生成プロンプトは `PROMPTS.md` を参照してください。
