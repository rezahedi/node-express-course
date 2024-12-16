const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')

/* Middlewares */
const logger = (request, response, next) => {
  console.log(new Date().toTimeString(), request.method, request.url)
  next()
}
app.use(logger)

app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

/* Routes - below this line */
app.use("/api/v1/tasks", tasksRouter)

/* Listener */
const port = 3000;

const start = async () => {
  try {
    await connectDB()
    app.listen(port, console.log(`Local server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()