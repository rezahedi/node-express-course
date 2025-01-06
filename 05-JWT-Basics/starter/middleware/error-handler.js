const CustomError = require('../errors/CustomError')

const errorHandlerMiddleware = (err, req, res, next) => {
  // For debugging
  console.log(err)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware
