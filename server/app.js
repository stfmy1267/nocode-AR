// import express from 'express'
// import dotenv from 'dotenv'
// import serveStatic from 'serve-static'
// import cors from 'cors'
// import auth from './routes/auth.js'
// import post from './routes/post.js'
const express = require('express')
const app = express()
const path = require('path');
const dotenv = require('dotenv')
const cors = require('cors')
const auth = require('./routes/auth')
const rally = require('./routes/rally')
// デプロイ用ポート番号 herokuが用意してくれている (process.env.PORT) || デバック用ポート番号 (3000)
const port = process.env.PORT || 3000
// カレントディレクトリに置かれた .envを参照する
dotenv.config()
app.use(express.json());
// Buildしたときに生成されるpublicディレクトリ（静的アセットファイル）を提供する
app.use(express.static(path.join(__dirname ,'/public/index.html')))

// 開発環境のCORS対策
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use("/api/users",auth)
app.use("/api/user/",rally)


app.listen(port, () => console.log(`Server running on http://localhost:${port}🚀`))