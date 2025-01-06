const jwt = require('jsonwebtoken')
const CustomError = require('../errors/CustomError')
const { AuthenticationError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if ( !authorizationHeader || !authorizationHeader.startsWith('Bearer ') ) {
    throw new AuthenticationError('Authorization token not provided!')
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()

  } catch (error) {
    throw new AuthenticationError('Not authorized to access this route!')
  }
}

module.exports = authenticationMiddleware