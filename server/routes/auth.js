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
    // 6:クライアントへのJWTの発行
    const token = JWT.sign(
      { email },
      // 任意の文字列
      "SECRET_KEY",
      { expiresIn: "24h" }
    );
    return res.json({ token: token, })
  }
)

// ログイン用のAPI
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
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
  // 6:クライアントへのJWTの発行
  const token = JWT.sign(
    // トークンを解読した時にemailだけがかえってくる（一意な値なので大丈夫emailだけで）
    { email },
    // 任意の文字列
    "SECRET_KEY",
    { expiresIn: "5h" }
  );
  res.cookie('token', token, { httpOnly: true });
  return res.json({ token: token, })
})

// ユーザーの取得
router.get("/user",checkJWT, async (req, res) => {
  const user = await model.getData("select * from users where email = ?", [req.user.email]);
  if (!user) return res.status(404).json('ユーザは存在しません。');
  res.status(200).json(user);
})

// アカウント更新用API

// アカウント削除用API

module.exports = router;
