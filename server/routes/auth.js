// GET	http://localhost:3000/users	ユーザーの一覧取得
// POST	http://localhost:3000/users	ユーザーを新規追加
// GET	http://localhost:3000/users/:id	特定のユーザー情報を取得
// UPDATE	http://localhost:3000/users/:id	特定のユーザー情報を更新
// DELETE	http://localhost:3000/users/:id	特定のユーザーを削除
// POST	http://localhost:3000/password-check
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const checkJWT = require('../middleware/checkJWT')
const model = require('../model/db.js')

const expiryTime = "3d"
const expiryTimeMs = 259200 * 1000
// ユーザー新規登録用のAPI
router.post(
  "/register",
  // 2:バリデーションチェック(ミドルウェアのように使う)
  body('email').not().isEmpty().isEmail(),
  body('password').not().isEmpty().not().isFullWidth().isLength({min:6}),
  async (req, res) => {
    const errors = validationResult(req);
    // エラーが空ではない時（エラーの時）
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    // 3:DBにユーザーが存在しているのか確認
    const user = await model.getData("select * from users where email = ?", [email]);
    if (user) {
      return res.status(400).json({message : "すでにそのユーザーは存在しています"})
    }
    // 4:パスワードの暗号化
    let hashedPassword = await bcrypt.hash(`${password}`, 10)
    // 5:dbへ保存
    await model.addData("insert into users(email,password) values(?,?)", [email, hashedPassword])
    const userId = await model.getData("select id from users where email = ?", [email])
    const id = userId.id
    // 6:クライアントへのJWTの発行
    const token = JWT.sign(
      { email,id },
      // 任意の文字列
      "SECRET_KEY",
      { expiresIn: expiryTime }
    );
    return res.json({
      token: token,
      expiresIn: expiryTimeMs
    })
  }
)

// ログイン用のAPI
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await model.getData("select * from users where email = ?", [email]);
  if (!user) {
    return res.status(400).json(
      {
        message: "メールアドレスが正しくありません。入力し直してください。"
      }
    )
  }
  // パスワードの復号と照合
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json(
      {
        message: "パスワードが正しくありません。入力し直してください。"
      },
    )
  }
  // ユーザーid取得
  const id = user.id
  // 6:クライアントへのJWTの発行
  const token = JWT.sign(
    // トークンを解読した時にemailだけがかえってくる（一意な値なので大丈夫emailだけで）
    { email, id},
    // 任意の文字列
    "SECRET_KEY",
    { expiresIn: expiryTime }
  );
  return res.json({
      token: token,
      expiresIn:expiryTimeMs
    })
})

router.get("/refreshToken",checkJWT,(req,res) => {
  const email= req.user.email;
  const id= req.user.id;
  const token = JWT.sign(
    { email,id},
    // 任意の文字列
    "SECRET_KEY",
    { expiresIn: expiryTime }
  );
  return res.json({
    token: token,
    expiresIn: expiryTimeMs
  })
})

// ユーザーの取得
router.get("/user",checkJWT, async (req, res) => {
  const user = await model.getData("select * from users where email = ?", [req.user.email]);
  if (!user) return res.status(404).json('ユーザは存在しません。');
  res.status(200).json(user);
})


// アカウント更新用API

// アカウント削除用API
router.get("/delete", checkJWT, async (req,res) => {
  const id = req.user.id
  await model.deleteData("DELETE FROM spots WHERE user_id = ?",[id])
  await model.deleteData("DELETE FROM stamp_rallies WHERE user_id = ?",[id])
  await model.deleteData("DELETE FROM users WHERE id = ?",[id])
  return res.status(200).json(
    {
      message:"アカウント削除"
    }
  )
})
module.exports = router;
