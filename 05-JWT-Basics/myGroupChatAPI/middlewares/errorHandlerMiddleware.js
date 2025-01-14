const { CustomError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // TODO: Log the error somewhere for further debugging!
  console.log(err)
  return res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send('Something went wrong try again! Check the logs for more details.')
  next()
}

module.exports = errorHandlerMiddleware