<script>
export default {
  data() {
    return {
      isOpen: true,
    }
  },
}
</script>

<template>
  <div>
    <header class="sticky top-0 z-50 h-[88px] flex justify-between items-center bg-white shadow-md">
      <h1 class="ml-8 text-3xl font-bold">
        <a href="#">nocode-AR</a>
      </h1>
      <nav>
        <ul class="flex items-center">
          <li class="header-list">
            <a href="#About">About</a>
          </li>
          <li class="header-list">
            <a href="#Marker">MarkerAR</a>
          </li>
          <li class="header-list">
            <a href="#Location">LocationAR</a>
          </li>
          <li class="header-list">
            <a href="#SingUp">Sing Up</a>
          </li>
          <div class="ml-8">
            <button
              class="header-btn w-[150px] h-[50px] border-[3px] bg-white border-black rounded-[20px]"
              @click="$router.push('/singup')"
            >
              新規登録
            </button>
            <button class="header-btn w-[150px] h-[50px] text-white bg-black rounded-[20px]" @click="$router.push('/singup')">
              ログイン
            </button>
          </div>
        </ul>
      </nav>
      <button class="relative md:hidden h-5 w-6" @click="isOpen = !isOpen">
        <span
          :class="isOpen ? 'transform rotate-45 top-2 w-7 transition duration-300' : 'top-0 w-6'"
          class="h-1 inline-block transition-all absolute right-0 bg-black"
        />
        <span :class="isOpen ? 'hidden' : 'top-2 w-6'" class="h-1 inline-block transition-all absolute right-0 bg-black" />
        <span
          :class="isOpen ? 'transform rotate-45 top-2 w-7 transition duration-300' : 'top-4 w-6'"
          class="h-1 inline-block transition-all absolute right-0 bg-black"
        />
      </button>
    </header>

    <div class="mb-20 h-[580px] w-full flex justify-around content-around items-center">
      <h2 class="text-4xl leading-[3rem]">誰でも簡単に作れる<br>WebARスタンプラリー</h2>
      <img src="" alt="メイン画像" class="w-64">
    </div>
    <div id="About" class="w-2/3 mx-auto flex-col overflow-auto mb-12">
      <h3 class="text-4xl mb-10">About</h3>
      <p class="text-2xl max-w-md">nocode-ARは誰でも簡単にWebARスタンプラリーが作成できるサービスです。</p>
      <div class="flex flex-col items-end">
        <section class="about-section -translate-y-10">
          <h4>ダウンロード不要</h4>
          <img src="">
          <p>ブラウザでアクセスするだけで参加可能。専用アプリのダウンロードは必要ありません。</p>
        </section>
        <section class="about-section mr-auto -translate-y-20">
          <h4>５分で作れる</h4>
          <img src="../assets/settings.png" alt="">
          <p>操作が簡単で、専門的な知識は必要なし。誰でも瞬時に作成・体験ができます。</p>
        </section>
        <section class="about-section -translate-y-32">
          <h4>自由に作成</h4>
          <img src="" alt="">
          <p>2種類のARから選択可能。しかも、機能が豊富で自由にアレンジできます。</p>
        </section>
      </div>
    </div>

    <div class="flex justify-between items-center mb-28">
      <div class="w-3/5 h-[500px] bg-slate-200 shadow-xl rounded-tr-[50px] rounded-br-[50px]">
        <video src="" />
      </div>
      <section class="course-section mr-16">
        <h4 id="Marker">マーカーベースAR</h4>
        <p class="">
          事前に登録されたマーカーをカメラで認識させ、ARを表示させる技術です。ARマーカーがトリガーとなり、指定された位置にARコンテンツが表示されます。
          <br>
          <br>
          利用シーン<br>
          「ショッピングモール」・「学校」・「水族館」など屋内の施設に向いています。
        </p>
        <button class="w-40 h-16 rounded-2xl border-2 border-black">はじめる</button>
      </section>
    </div>
    <div class="flex justify-between items-center mb-28">
      <section class="course-section ml-16">
        <h4 id="Location">ロケーションベースAR</h4>
        <p>
          予め表示したい場所を設定をGPS情報と連動させて設定しておき、設定された場所に向かってスマートフォンなどの端末をかざした場合にARを表示できます。
          <br>
          <br>
          利用シーン<br>
          「ゴルフ場」・「建築物・建物」・「観光地」など屋外でのイベントや広い場所に向いている。
        </p>
        <button class="w-40 h-16 rounded-2xl border-2 border-black">はじめる</button>
      </section>
      <div class="w-3/5 h-[500px] shadow-xl bg-slate-200 rounded-tl-[50px] rounded-bl-[50px]">
        <video src="" />
      </div>
    </div>
    <div id="SingUp" class="w-3/4 mx-auto mb-28 flex flex-col justify-around items-center">
      <h3 class="text-4xl mb-12">Sign Up</h3>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="メールアドレス"
        class="focus:border-blue-500 appearance-none border rounded-2xl w-3/5 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        autocomplete="email"
        required
      >
      <input
        id="password"
        type="password"
        name="password"
        placeholder="パスワード"
        class="focus:border-blue-500 appearance-none border rounded-2xl w-3/5 h-16 mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        autocomplete="current-password"
        required
      >
      <button type="submit" value="ユーザー登録" class="w-[250px] h-[60px] text-white bg-black rounded-[20px]">
        ユーザー登録
      </button>
    </div>
    <footer class="w-full h-6">
      <p class="text-center text-xl pb-10">&copy; 2022 nocode-AR</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.header-list {
  font-size: 20px;
  margin: 0 15px;
}
.header-btn {
  margin: 0 15px;
}
.about-section {
  /* transform: translateY(-30px); */
  box-sizing: border-box;
  border-radius: 50%;
  width: 500px;
  height: 500px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  h4 {
    font-size: 20px;
    margin-bottom: 30px;
  }
  img {
    width: 167px;
    height: 167px;
    margin-bottom: 30px;
  }
  p {
    width: 250px;
    font-size: 16px;
  }
}

.course-section {
  max-width: 450px;
  h4 {
    font-size: 38px;
    margin-bottom: 20px;
  }
  p {
    line-height: 2;
    font-size: 16px;
    margin-bottom: 2rem;
  }
  button {
    margin-left: 3rem;
  }
}
</style>
