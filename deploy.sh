#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド
npm run build

# ビルド出力ディレクトリに移動
# cd dist/

# git init
# git checkout -b main
git add dist -f
# git add -A
git commit -m 'deploy'
# git push
git subtree push --prefix dist origin gh-pages
# git push -f git@github.com:stfmy1267/nocode-AR.git main:gh-pages

# cd -
