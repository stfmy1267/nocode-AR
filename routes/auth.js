import express from 'express';
const router = express.Router();
import { body , validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { User } from '../db/user.js'

router.get("/", (req,res) => {
  res.send("Hello , Auth.js")
})

// ユーザー新規登録用のAPI
router.post(
  "/register",
  // 2:バリデーションチェック
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req,res) => {
    const email = req.body.email;
    // eslint-disable-next-line no-unused-vars
  const password = req.body.password;

  const errors = validationResult(req);
  // エラーが空ではない時（エラーの時）
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  // 3:DBにユーザーが存在しているのか確認
  const user = User.find((user) => user.email === email);
  if (user) {
    return res.status(400).json([
      {
        message: "すでにそのユーザーは存在しています"
      },
    ])
  }
  // 4:パスワードの暗号化
  let hashedPassword = await bcrypt.hash(`${password}`,10)

  // 5:dbへ保存
  User.push({
    email,
    password: hashedPassword
  })

  // 6:クライアントへのJWTの発行
  const token = await JWT.sign(
    {
      email,
    },
    // 任意の文字列
    "SECRET_KEY",
    {
      expiresIn:"24h",
    }
  );
  return res.json({
    token: token,
  })
})
// ログイン用のAPI
router.post("/login" , async (req,res) => {
  const { email, password } =req.body;

  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json([
      {
        message: "そのユーザーは存在しません"
      },
    ])
  }
  // パスワードの復号と照合
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) {
    return res.status(400).json([
      {
        message: "パスワードが異なります"
      },
    ])
  }
  // 6:クライアントへのJWTの発行
  const token = await JWT.sign(
    {
      email,
    },
    // 任意の文字列
    "SECRET_KEY",
    {
      expiresIn:"24h",
    }
  );
  return res.json({
    token: token,
  })
})
// DBのユーザー確認API
router.get("/allusers", (req,res) => {
  return res.json(User)
} )

export default router;
