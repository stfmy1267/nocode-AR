const express = require('express')
const router = express.Router();
const model = require('../model/db.js')

let meta = {title:'スポって名'}

// ホーム
router.get('/:url/home', async (req, res) => {
  let url = req.params.url
  flg = await model.getData("SELECT enabled FROM public_state WHERE stamp_rally_url = ?",[url])
  console.log(Boolean(flg.enabled))
  // if (flg.enabled)
  res.render("../views/home.ejs");
})
// マップ
router.get('/:url/map', async (req, res) => {
  res.render("../views/map.ejs",{
    "spotLocations" : [
      {
        "spot_name": '１個目の場所',
        "lat": 38.88061039150165,
        "lng": 139.83398437500003,
      },
      {
        "spot_name": '２個目の場所',
        "lat": 45.02695045318546,
        "lng": 134.16503906250003,
      },
      {
        "spot_name": '３個目の場所',
        "lat": 35.639441068973944,
        "lng": 139.52636718750003,
      },
      {
        "spot_name": '４個目の場所',
        "lat": 32.54681317351517,
        "lng": 131.61621093750003,
      },
      {
        "spot_name": '５個目の場所',
        "lat": 35.85343961959182,
        "lng": 136.66992187500003,
      },
      {
        "spot_name": '６個目の場所',
        "lat": 40.64730356252251,
        "lng": 140.80078125000003,
      },
    ]
  });
})
// AR
router.get('/:url/ar', async (req, res) => {
  res.render("../views/ar.ejs");
})
// スタンプリスト
router.get('/:url/stamplist', async (req, res) => {
  res.render("../views/stamp-list.ejs");
})
router.get('/:url/preview/home', async (req, res) => {
  res.render("../views/home.ejs");
})

module.exports = router;
