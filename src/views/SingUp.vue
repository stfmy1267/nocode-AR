<template>
  <div>
    <div class="flex justify-center items-center w-full h-20 mb-8 text-center border-b-2 border-black">
      <div class="text-4xl">nocode-AR</div>
    </div>
    <h3 class="text-4xl mb-12 text-center">ユーザー登録</h3>
    <div class="flex flex-col justify-around items-center mb-4">
      <input
        id="email"
        type="email"
        name="email"
        placeholder="メールアドレス"
        class="focus:border-blue-500 appearance-none border rounded-2xl w-1/2 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        autocomplete="email"
        required
      >
      <input
        id="password"
        type="password"
        name="password"
        placeholder="パスワード"
        class="focus:border-blue-500 appearance-none border rounded-2xl w-1/2 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        autocomplete="current-password"
        required
      >
      <button
        to="/rallylist"
        type="submit"
        value="ユーザー登録"
        class="w-[250px] h-[60px] text-white text-2xl text-center bg-black rounded-[20px]"
        @click="$router.push('/rallylist')"
      >
        ユーザー登録
      </button>
    </div>

    <div class="text-center">
      パスワードを忘れた場合：<a href="" class="text-blue-600">パスワードリセット</a><br><br>
      まだユーザーを登録していない場合：<a href="" class="text-blue-600">ユーザー登録</a><br><br>
      <a href="" class="text-blue-600">Webサイトに戻る</a>
    </div>
  </div>
</template>
