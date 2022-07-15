#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド
npm run build

# ビルド出力ディレクトリに移動
# cd dist

# カスタムドメインにデプロイする場合
# echo 'www.example.com' > CNAME

# git init
git checkout gh-pages
git add dist -f
git commit -m 'deploy'
git subtree push --prefix dist origin gh-pages
git checkout master
# https://<USERNAME>.github.io にデプロイする場合
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# https://<USERNAME>.github.io/<REPO> にデプロイする場合
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

# cd -
