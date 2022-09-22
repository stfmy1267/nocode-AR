import express from 'express'
import dotenv from 'dotenv'
// import serveStatic from 'serve-static'
import cors from 'cors'
import auth from './routes/auth.js'
import post from './routes/post.js'

const port = process.env.PORT || 3000

dotenv.config()

const app = express()
app.use(express.json());

// デプロイ用ポート番号 herokuが用意してくれている (process.env.PORT)
// デバック用ポート番号 (3000)
// 開発環境のCORS対策
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use("/auth",auth)
app.use("/post",post)

// Buildしたときに生成されるdistディレクトリ（静的アセットファイル）を提供する
app.use(express.static('../client/docs'))

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}🚀`)
})
