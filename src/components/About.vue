<template>
    <div id="About" class="flex-col overflow-auto mb-12" >
        <h3 class="text-4xl mb-10">About</h3>
        <p class="text-2xl max-w-md">nocode-ARは誰でも簡単にWebARスタンプラリーが作成できるサービスです。</p>
        <div>
            <section class="float-right -translate-y-10">
                <h4>ダウンロード不要</h4>
                <img src="../assets/augmented-reality.png">
                <p>ブラウザでアクセスするだけで参加可能。専用アプリのダウンロードは必要ありません。</p>
            </section>
            <section class="-translate-y-20">
                <h4>５分で作れる</h4>
                <img src="../assets/settings.png" alt="">
                <p>操作が簡単で、専門的な知識は必要なし。誰でも瞬時に作成・体験ができます。</p>
            </section>
            <section class="float-right -translate-y-32">
                <h4>自由に作成</h4>
                <img src="../assets/customization.png" alt="">
                <p>2種類のARから選択可能。しかも、機能が豊富で自由にアレンジできます。</p>
            </section>
    </div>
    </div>
</template>

<style lang="scss" scoped>
section{
    // transform: translateY(-30px);
    box-sizing: border-box;
    border-radius: 50%;
    width: 500px;
    height: 500px;
    background: #FFFFFF;
    border: 1px solid #000000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    h4{
            font-size: 20px;
            margin-bottom: 30px;
        }
        img{
            width: 167px;
            height: 167px;
            margin-bottom: 30px;
        }
        p{
            width: 250px;
            font-size: 16px;
        }
    }

</style>
