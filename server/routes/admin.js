const express = require('express');
const checkJWT = require('../middleware/checkJWT');
const router = express.Router();
const db = require('../model/db.js')


// -------------------- スタンプラリー関連 -------------------- //
// 全てのスタンプラリーの取得
router.get("/rallies",checkJWT ,async (req, res) => {
  const stampRallies = await db.getAllRally("select * from stamp_rallies where user_id = ?", [req.user.id]);
  if (stampRallies.length === 0) {
    return res.status(400).json(
      {
        message: "スタンプラリーはありません"
      }
    )
  } else {
    return res.status(200).json(stampRallies)
  }
})

// スタンプラリーの新規作成
router.post("/rally-register",checkJWT, async (req, res) => {
  const { title, type, public_url, test_url } = req.body;
  await db.addData("INSERT INTO stamp_rallies (user_id,title,catch_copy,introduction,type,model,public_url,test_url) VALUES ( ?, ? ,null,null,?,null,?,?)", [req.user.id, title, type, public_url, test_url])
  await db.addData("INSERT INTO public_state (stamp_rally_url,enabled) VALUES (?,'0')",[public_url])
  return res.status(200).json(req.body)
})

// スタンプラリーの保存
router.post("/save-rally",checkJWT , async (req,res) => {
  const { id, user_id, title, image, catch_copy, introduction, type, model, public_url, test_url, created_at, updated_at} = req.body;
  await db.updateDate("UPDATE stamp_rallies SET title = ?, image = ?, catch_copy = ?, introduction = ?, model = ? WHERE id = ?",[title,image,catch_copy,introduction,model,id])
  return res.status(200)
})

// スタンプラリーの削除
router.post("/delete-rally",checkJWT,async(req,res) => {
  const {id, url} = req.body
  console.log(url)
  await db.deleteData("DELETE FROM stamp_rallies WHERE id = ?",[id])
  await db.deleteData("DELETE FROM spots WHERE stamp_rally_id = ?",[id])
  await db.deleteData("DELETE FROM public_state WHERE stamp_rally_url = ?",[url])
  return res.status(200).json({messeage:"削除"})
})

// -------------------- スポット関連 -------------------- //
// 全てのスポットの取得
router.post("/spots",checkJWT ,async (req, res) => {
  const spots = await db.getAllRally("select * from spots where user_id = ?", [req.user.id]);
  if (spots.length === 0) {
    return res.status(400).json(
      {
        message: "スポットはありません"
      }
    )
  } else {
    return res.status(200).json(spots)
  }
})

// スポットの作成
router.post("/spot-register",checkJWT, async (req, res) => {
  const { name, stamp_rally_id } = req.body;
  await db.addData("INSERT INTO spots (user_id, stamp_rally_id,name,lat,lng) VALUES (?,?,?,null,null)",[req.user.id, stamp_rally_id, name])
  return res.status(200).json({messeage:"作成"})
})

router.post("/save-spot",checkJWT , async (req,res) => {
  const { id, user_id, stamp_rally_id, name, image,  lat, lng, created_at, updated_at} = req.body;
  await db.updateDate("UPDATE spots SET name = ?, image = ?, lat = ?, lng = ? WHERE id = ?",[name,image,lat,lng,id])
  return res.status(200)
})

// スポットの削除
router.post("/delete-spot",checkJWT ,async (req, res ) => {
  const id = req.body.id
  await db.deleteData("DELETE FROM spots WHERE id = ?",[id])
  return res.status(200).json({messeage:"削除"})
})

// -------------------- 公開関連 -------------------- //
router.post("/public",checkJWT ,async (req, res) => {
  await db.deleteData("UPDATE public_state SET enabled = '1' WHERE stamp_rally_url = ?",[req.body.url])
  return res.status(200).json({messeage:"公開"})
})


module.exports = router;
