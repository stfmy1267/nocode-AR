import express from 'express'
// import serveStatic from 'serve-static'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000

// 開発環境のCORS対策
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}
// eslint-disable-next-line no-unused-vars
const __dirname = new URL(import.meta.url).pathname
// Buildしたときに生成されるdistディレクトリ（静的アセットファイル）を提供する
// app.use(serveStatic(__dirname +'/docs'))
app.use(express.static('docs'))
// app.get('/', (req, res) => res.sendFile(__dirname + '/docs/index.html'))
// app.get('/api/message', (req, res) => {
// 	res.send('get message')
// })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
