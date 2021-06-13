const express = require('express')

const router = express.Router()

// 资源相关 api
router.use(require('./resource'))

// 排行榜相关 api
router.use('/v1.0/rank', require('./rank'))

module.exports = router
