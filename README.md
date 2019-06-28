chitoku.jp
==========

[![][travis-badge]][travis-link]

[ちとくのホームページ](https://chitoku.jp)の Gatsby テンプレートとコンテンツです。

## 構成

- [TypeScript](https://www.typescriptlang.org/)
- [Gatsby](https://github.com/gatsbyjs/gatsby)
- [Algolia](https://www.algolia.com/)

## 環境変数

```shell
# 公開 URL
export HISTORIA_URL=https://chitoku.jp

# メール送信先 URL
export GATSBY_MAIL_API=

# reCAPTCHA v3 API キー
export GATSBY_MAIL_SITE_KEY=

# Google Analytics ID
export GATSBY_GOOGLE_ANALYTICS_ID=

# Algolia
export GATSBY_ALGOLIA_APPID=
export GATSBY_ALGOLIA_APIKEY=
export GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY=
export GATSBY_ALGOLIA_INDEXNAME=
```

## ビルド

```shell
$ git clone https://github.com/chitoku-k/chitoku.jp.git --recursive
$ yarn install
$ yarn build
```

[travis-link]:          https://travis-ci.org/chitoku-k/chitoku.jp
[travis-badge]:         https://img.shields.io/travis/chitoku-k/chitoku.jp/master.svg?style=flat-square
