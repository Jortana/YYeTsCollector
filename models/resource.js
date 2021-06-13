const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  data: {
    type: Object,
  },
})

module.exports = resourceSchema
