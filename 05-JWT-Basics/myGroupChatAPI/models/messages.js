const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, 'Username must be provided' ],
  },
  message: {
    type: String,
    required: [ true, 'Message must be provided' ]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('Messages', messageSchema)