#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド
npm run build

# ビルド出力ディレクトリに移動
# cd dist/

# git init
# git checkout -b main
git add -A
git commit -m 'deploy'
git push
# git push -f git@github.com:stfmy1267/nocode-AR.git main:gh-pages

# cd -
