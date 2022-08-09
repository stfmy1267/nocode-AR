#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド
npm run build

# ビルド出力ディレクトリに移動

git add .
git commit -m 'deploy'
git push
