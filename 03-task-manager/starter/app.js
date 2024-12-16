require('./db/connect')
const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks')

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
app.listen(port, console.log(`Local server is listening on port ${port}`))
