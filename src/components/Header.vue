<template>
    <header class="sticky top-0 z-50 h-[88px] flex justify-between items-center bg-white shadow-md">
        <h1 class="ml-8 text-3xl font-bold"><a href="#">nocode-AR</a></h1>
        <nav>
            <ul class="flex items-center">
                <li><a href="#About">About</a></li>
                <li><a href="#Marker">マーカーAR</a></li>
                <li><a href="#Location">ロケーションAR</a></li>
                <li><a href="#SingUp">Sing Up</a></li>
                <div class="ml-8">
                    <button class="w-[150px] h-[50px] border-[3px] border-black rounded-[20px]"><a href="">新規登録</a></button>
                    <button class="w-[150px] h-[50px] text-white bg-black rounded-[20px]"><a href="">ログイン</a></button>
                </div>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    li{
        font-size: 20px;
        margin:0 15px ;
    }
    button{
        margin:0 15px ;
    }
</style>
