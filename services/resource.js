const { Resource } = require('../models')

const fieldFilter = {
  status: 0,
  info: 0,
  'data.info.expire': 0,
  'data.info.year': 0,
  'data.info': 0,
}

// 根据 id 查找资源
exports.findResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id)
    if (!resource) {
      return res.status(404).end()
    }
    res.status(200).json(resource)
  } catch (err) {
    next(err)
  }
}

// 根据关键字查找资源
exports.findResourceByKeyword = async (req, res, next) => {
  try {
    let keyword = req.params.keyword
    /**
     * 有空格分隔的关键词处理，实现中英文有空格的模糊搜索
     * 比如搜西部世界(Westworld)可以是：
     * 1. 西部世界
     * 2. 西部 世界
     * 3. 西 世界
     * 4. westworld
     * 5. west world
     * 以此类推
     */
    let keywords = keyword.split(' ')
    let enFilter = []
    let cnFilter = []
    let aliasFilter = []
    for (let splitKeyword of keywords) {
      cnFilter.push({
        'data.info.cnname': { $regex: splitKeyword },
      })
      enFilter.push({
        'data.info.enname': { $regex: splitKeyword, $options: 'i' },
      })
      aliasFilter.push({
        'data.info.aliasname': { $regex: splitKeyword, $options: 'i' },
      })
    }
    // 多字段匹配
    const filter = {
      $or: [
        {
          $and: enFilter,
        },
        {
          $and: cnFilter,
        },
        {
          $and: aliasFilter,
        },
      ],
    }
    const resources = await Resource.find(filter, fieldFilter)
    if (resources.length === 0) {
      return res.status(404).end()
    }
    // 将最匹配的结果放在最前面
    resources.forEach((resource, index, resources) => {
      const info = resource.data.info
      const alias = info.aliasname.split('/')
      if (
        info.cnname === keyword ||
        info.enname === keyword ||
        alias.indexOf(keyword) !== -1
      ) {
        resources.slice(index, 1)
        resources.unshift(resource)
      }
    })
    res.json(resources)
  } catch (err) {
    next(err)
  }
}
