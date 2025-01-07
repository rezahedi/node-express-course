const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, 'Username must be provided' ],
    enum: {
      values: [ 'Anna', 'Reza', 'John', 'Sarah' ],
      message: '\'{VALUE}\' is not supported'
    },
  },
  message: {
    type: String,
    required: [ true, 'Product\'s price must be provided' ]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('Messages', messageSchema)