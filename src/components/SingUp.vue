<template>
    <div id="SingUp" class="flex flex-col justify-around items-center">
        <h3 class="text-4xl mb-12">Sign Up</h3>
        <input type="email"  name="email" id="email"  placeholder="メールアドレス" class="focus:border-blue-500 appearance-none border rounded-2xl w-3/5 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="email" required>
        <input type="password" name="password" id="password" placeholder="パスワード" class="focus:border-blue-500 appearance-none border rounded-2xl w-3/5 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required>
        <button type="submit" value="ユーザー登録" class="w-[250px] h-[60px] text-white bg-black rounded-[20px]">ユーザー登録</button>
    </div>
</template>
