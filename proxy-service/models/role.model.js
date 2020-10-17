const mongoose = require('mongoose')
const schema = mongoose.Schema

const roleSchema = new schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  discription: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'use'
  }
})

const roleModel = mongoose.model('role', roleSchema)
module.exports = { roleModel, roleSchema }
