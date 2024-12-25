require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const productsDummyData = require('./products.json')

const start = async () => {
  try {
    console.log('Starting populate...')
    await connectDB(process.env.MONGODB_URI)
    // NOTICE: This will delete all the documents in the collection
    await Product.deleteMany()
    await Product.create( productsDummyData )
    console.log('Populate complete.')
    process.exit(0)

  } catch (error) {
    console.log(error)
  }
}

start()