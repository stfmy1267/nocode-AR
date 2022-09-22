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

app.get("/",(req,res) => {
	res.send("hello,world")
})


// eslint-disable-next-line no-unused-vars
// const __dirname = new URL(import.meta.url).pathname
// Buildしたときに生成されるdistディレクトリ（静的アセットファイル）を提供する
// app.use(serveStatic('./docs'))
// app.use("/api/users", userRoute);
// app.use(express.static('./docs'))
// app.get('/.*/', (req, res) => res.sendFile('./docs/index.html'))
// app.get('/api/message', (req, res) => {
// 	res.send('get message')
// })


app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}🚀`)
})
