<script setup>
import RallyBottomMenu from '../../components/layouts/rally/RallyBottomMenu.vue';

let title = 'タイトル'
let cachcopy = 'ようこそ、タイトルラリーへ。スタンプをためて商品を獲得しよう。'
let spotInfos = [
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
  {
    spotImg: "../../../public/images/tpl-1.png",
    spotName:"spot_name",
  },
]
</script>

<template>
  <div>
    <div class="main_visual">
      <img src="../../../public/images/tpl-1.png">
      <div>
        <h1 class="title">{{ title }}</h1>
        <p>{{ cachcopy }}</p>
      </div>
    </div>

    <div class="spot_list">
      <h2>スポット一覧</h2>
      <div>
        <div v-for="(spotinfo, index) in spotInfos" :key="index" class="spot">
          <img :src="spotinfo.spotImg">
          <p>{{ spotinfo.spotName }}</p>
        </div>
      </div>
    </div>

    <section class="how">
      <h2>使い方</h2>
      <ol>
        <li>はじめに、松ヶ岡開墾場に移動してください。</li>
        <br>
        <li>
          画面下の「マップ」のボタンを押します。 <br>
          すると、スタンプラリーマップと書いてあるページに飛びます。 マップには、ラリーポイントが6つ表示されます。
        </li>
        <br>
        <li>
          「スタート」ボタンを押すと、現在地が表示されます。 ラリーポイントに近づくとARページに移動し、
          この時に、「カメラを許可するか」と表示される時がありますが、
          「許可する」と押しましょう。あたりを見渡すとましろちゃんを見ることができるはずです。
        </li>
        <br>
        <li>
          ましろちゃんを発見したら、真ん中のカーソルをましろちゃんに合わせてください。
          すると、施設情報の表示、スタンプの獲得、カメラ撮影ができるようになります。
        </li>
        <br>
        <li>スタンプを6つためてコンプリートを目指そう!</li>
      </ol>
    </section>
    <section class="notes">
      <h2>注意事項</h2>
      <li>
        危険な場所には行かない
      </li>
      <li>
        人の話を聞くべきときは画面を閉じる。
      </li>
      <li>
        全ては自己責任で楽しむ。
      </li>
      <li>
        誰かにやらせるときにはこれらを守らせる。
      </li>
      <li>
        交通ルール、公共のルールをしっかり守りましょう。
      </li>
      <li>
        歩きスマホは危険です。スマホを確認するときは立ち止まってしましょう。
      </li>
    </section>
    <br>
    <br>
    <RallyBottomMenu />
  </div>
</template>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: Georgia, 'Times New Roman', Times, serif, serif;
  margin: 0;
  padding: 0;
}
ol{
  list-style: decimal;
}
// メインビジュアル
div.main_visual {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 3rem;
  img{
    max-height: 400px;
    object-fit: cover;
    margin-bottom: 3rem;
  }
  div{
    min-height:100px;
    h1.title{
      font-size: larger;
      margin-bottom: 1rem;
    }
    p{
      display: block;
      max-width: 300px;
    }
  }
}

div.spot_list,
section.how,
section.notes{
  width: 80%;
  margin: 0 auto 3rem auto;
  h2{
    text-align: center;
    padding: 20px;
    font-size: larger;
  }
}

section.how,
section.notes{
  li{
    line-height: 2rem;
  }
}


// スポット一覧
div.spot_list{
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div.spot{
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 15px;
      width: 40%;
      overflow: hidden;
      img{
        max-height: 150px;
        border-radius: 10px;
      }
      p{
        font-size: large;
      }
    }
  }
}


// @media screen and (max-width: 768px) {

//   @media screen and (max-width: 768px) {
//   }
// }



</style>
