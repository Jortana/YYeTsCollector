const express = require('express')
const resourceService = require('../services/resource')

const router = express.Router()

// 根据 id 查找资源
router.get('/v1.0/resource/:id', resourceService.findResourceById)

// 根据关键字查找资源
router.get('/v1.0/resources/:keyword', resourceService.findResourceByKeyword)

module.exports = router
