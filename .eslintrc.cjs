
module.exports = {
  // ブラウザで使用するのでbrowserとes2021をONにしておく
  env: {
    'browser': true,
    // es2022 -すべてのECMAScript2022グローバルを追加し、 ecmaVersion パーサーオプションを自動的に13に設定します。
    'es2022': true,
    'node': true,
    // Vue3で使用するdefinePropsやdefineEmits,defineExposeなどを使用できるようにする
    'vue/setup-compiler-macros': true
  },
  // パッケージが提供してくれているおすすめ設定を使う設定
  extends: [
    // eslint-plugin-vueが提供してくれている設定
    'plugin:vue/vue3-recommended',
    // eslintが提供してくれている設定
    'eslint:recommended',
  ],
  parserOptions: {
    'ecmaVersion': 12,
    // VueをTypescriptで使う場合は指定する必要がある。vue-eslint-parser固有のオプション
  },
  //プラグインの使用
  plugins: [
    'vue',
  ],
  rules: {
    // ファイル名を2単語以上で構成する必要がある:off
    'vue/multi-word-component-names': 'off',
    // タグの中身を新しい行で書くする必要がある:off
    "vue/singleline-html-element-content-newline": 'off',
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        // 開始タグが 1 行の場合の 1 行あたりの最大属性数
        "max": 3
      },
      // 開始タグが複数行にわたる場合の 1 行あたりの属性の最大数
      "multiline": {
        "max": 3
      }
    }]
    }
}

