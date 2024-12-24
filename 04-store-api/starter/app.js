const connectDB = require('./db/connect')
const notFoundHandler = require('./middleware/notFoundHandler')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config();

const LOCAL_PORT = 3000

const express = require('express')
const app = express()

/**
 * Middlewares
 */
const logger = (request, response, next) => {
  console.log(new Date().toTimeString(), request.method, request.url)
  next()
}
app.use(logger)
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(notFoundHandler);
app.use(errorHandler);


/* Listener */
const port = process.env.PORT || LOCAL_PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, console.log(`Local server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
