const express = require('express');
const checkJWT = require('../middleware/checkJWT');
const router = express.Router();
const model = require('../model/db.js')

// スタンプラリーの取得
router.get("/rallies",checkJWT, async (req, res) => {
  const stampRallies = await model.getAllRally("select * from stamp_rallies where user_id = ?", [req.user.id]);
  if (stampRallies.length === 0) {
    return res.status(400).json(
      {
        message: "スタンプラリーはありません"
      }
    )
  } else {
    return res.status(200).json(stampRallies[0])
  }
})

// スタンプラリーの保存

// スタンプラリーの削除


module.exports = router;
