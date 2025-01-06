const jwt = require('jsonwebtoken')
const CustomError = require('../errors/CustomError')

const authenticationMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if ( !authorizationHeader || !authorizationHeader.startsWith('Bearer ') ) {
    throw new CustomError('Authorization token not provided!', 401)
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()

  } catch (error) {
    throw new CustomError('Not authorized to access this route!', 401)
  }
}

module.exports = authenticationMiddleware