const { Resource } = require('../models')

const fieldFilter = {
  status: 0,
  info: 0,
  'data.info.expire': 0,
  'data.info.year': 0,
  'data.list': 0,
}

// 获取不分类别的排行榜前十名
exports.allRank = async (req, res, next) => {
  try {
    const resources = await Resource.find({}, fieldFilter, {
      limit: 10,
      sort: { 'data.info.views': -1 },
    })
    res.json(resources)
  } catch (err) {
    next(err)
  }
}

// 获取指定地区分类下的排行榜前十名
exports.areaRank = async (req, res, next) => {
  try {
    const resources = await Resource.find(
      { 'data.info.area': req.params.area },
      fieldFilter,
      {
        limit: 10,
        sort: { 'data.info.views': -1 },
      }
    )
    res.json(resources)
  } catch (err) {
    next(err)
  }
}
