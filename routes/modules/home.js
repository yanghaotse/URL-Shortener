const express = require('express')
const router = express.Router()
// const {shortUrlGenerator, myHttp, http} = require("./shortUrlGenerator")
// const URLshortener = require('./models/urlShortener') //mongodb資料

router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router