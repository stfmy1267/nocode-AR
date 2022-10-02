// import express from 'express';
const express = require('express')
const router = express.Router();
const model = require('../model/db.js')

// スタンプラリーの取得
router.post("/rallies", async (req, res) => {
  const stampRallies = await model.getAllRally("select * from stamp_rallies where user_id = ?", [req.body.id]);
  // console.log(stampRallies)
  res.status(200).json(stampRallies[0])
})

// スタンプラリーの保存

// スタンプラリーの削除


module.exports = router;
