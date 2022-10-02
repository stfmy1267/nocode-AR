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
const sqlite3 = require('sqlite3');
const checkJWT = require('../middleware/checkJWT')
const dataBasePath = "/home/fumiya/デスクトップ/github/nocode-AR/server/db.sqlite"

const db = new sqlite3.Database(
  dataBasePath,
  (err) => (err) ? console.error("database error: " + err.message) : console.log("Successful connection to database")
)

const dataBaseObj = {
  // For getting all data
  getAllData: (query,val = []) => new Promise((resolve, reject) => {
    db.all(query, val,(err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
    db.close
  }),
  // For getting one data
  getData: (query, val = []) => new Promise((resolve, reject) => {
    db.get(query, val, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
    db.close
  }),
  // For adding data
  addData: (query, val = []) => new Promise((resolve, reject) => {
    db.run(query, val, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    });
    db.close
  }),
  // For updating data
  updataData: () => console.log('更新'),
  // For data deletion
  deleteData: () => console.log('削除')
}

// DBのユーザー確認API
router.get("/", async (req, res) => {
  const users = await dataBaseObj.getAllData("select * from users")
  if (users) {
    if (users.length === 0) {
      return res.status(400).json(
        {
          message: "ユーザーが存在しません"
        }
      )
    }
    return res.json(users);
  }
  return res.status(400)[{
    message: err
  }]
})

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
    const user = await dataBaseObj.getData("select * from users where email = ?", [email]);
    if (user) {
      return res.status(400).json({message : "すでにそのユーザーは存在しています"})
    }
    // 4:パスワードの暗号化
    let hashedPassword = await bcrypt.hash(`${password}`, 10)
    // 5:dbへ保存
    await dataBaseObj.addData("insert into users(email,password) values(?,?)", [email, hashedPassword])
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
  const user = await dataBaseObj.getData("select * from users where email = ?", [email]);
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
    { expiresIn: "24h" }
  );
  res.cookie('token', token, { httpOnly: true });
  return res.json({ token: token, })
})

// ユーザーの取得
router.get("/user",checkJWT, async (req, res) => {
  console.log(req.user.email)
  const user = await dataBaseObj.getData("select * from users where email = ?", [req.user.email]);
  console.log(user)
  if (!user) return res.status(404).json('ユーザは存在しません。');
  res.status(200).json(user);
})

// アカウント更新用API

// アカウント削除用API

module.exports = router;
