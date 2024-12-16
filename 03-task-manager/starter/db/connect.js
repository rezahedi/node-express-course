const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = (url) => {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB