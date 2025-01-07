require('dotenv').config();
require('express-async-errors');
const notFoundMiddleware = require('./middlewares/NotFoundMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const express = require('express')
const router = require('./routes');
const app = express()
const connectDB = require('./db/connect')

// Middlewares
app.use(express.static('./public'))
app.use(express.json())


// Routes
app.use('/api/v1', router)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
