bigquery-extension

## これはなに
BigQueryを便利に扱うChromeExtensionです

## 機能

### BigQueryの拡張表示

#### グラフ表示
BigQueryのクエリ実行結果を簡易的にグラフ表示できます。

クエリエディタ上部にある*グラフ*ボタンを押すとクエリエディタがグラフビューに入れ替わります。もう一度押すとクエリエディタに戻ります。
クエリ実行結果のヘッダにて *maker* や *line* を選ぶとY軸のグラフとして表示されます。 *x* を選ぶとX軸として扱われます。  

#### 画像URLをサムネイル表示
BigQueryのクエリ実行結果のプレビューに表示される画像URLは文字列なので中身の確認が大変です。自動で画像URLのサムネイルを表示します。

参考
[BigQuery の画像 URLを表示するブックマークレット](https://zenn.dev/hrsma2i/articles/show-bigquery-image-url)

#### ColorCodeをセルの背景色で表示
カラムにColorCodeがある場合、そのセルの背景をそのColorCodeの色で表示します。#で始める必要があります

#### labをrgbに変換
d3.jsを使ってlabの値をrgbのColorCodeに変換して表示します。
そのColorCodeを使って背景色も表示します。
カラム名を `lab` にして、カンマ区切りで一つのセルにしておく必要があります

## CI/CD
gitのtagに `v0.1` など、vで始まるなにかをtagにしてpushするとリリースされます。
```
git tag v0.1;  git push origin --tags
```