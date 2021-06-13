const express = require('express')
const rankService = require('../services/rank')

const router = express.Router()

// 获取不分类别的排行榜前十名
router.get('/', rankService.allRank)

// 获取指定地区分类下的排行榜前十名
router.get('/:area', rankService.areaRank)

module.exports = router
