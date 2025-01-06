require('dotenv').config();
require('express-async-errors');
const express = require('express')
const router = require('./routes');
const app = express()

// Middlewares
app.use(express.static('./public'))
app.use(express.json())


// Routes
app.use('/api/v1', router)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
