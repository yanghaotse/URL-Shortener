const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const route = require('./modules/route')
const myHttp = require('../shortUrlGenerator').myHttp


router.use('/', home)
router.use(`/${myHttp}`, route)

module.exports = router