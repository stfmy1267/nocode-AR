<template>
    <div>
        <div class="flex justify-between items-center mb-28">
            <div class="w-3/5 h-[500px] bg-slate-200 shadow-xl rounded-tr-[50px] rounded-br-[50px]">
                <video src=""></video>
            </div>
            <section class="mr-16">
                <h4 id="Marker" >マーカーベースAR</h4>
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
            <section class="ml-16">
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
                <video src=""></video>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
section{
    max-width: 450px;
    h4{
        font-size:38px;
        margin-bottom: 20px;
    }
    p{
        line-height: 2;
        font-size: 16px;
        margin-bottom: 2rem;
    }
    button{
        margin-left: 3rem;
    }
}
</style>
