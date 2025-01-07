const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, 'Username must be provided' ],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('Users', userSchema)