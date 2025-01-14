const jwt = require('jsonwebtoken')
require('dotenv').config()
const { AuthenticationError } = require('../errors')

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if ( !authorizationHeader || !authorizationHeader.startsWith('Bearer ') ) {
    throw new AuthenticationError('Authorization token not provided!')
  }
  const token = authorizationHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decodedToken
    req.user = { id, username }
    next()
  } catch (error) {
    throw new AuthenticationError('Not authorized to access this route!')
  }
}

module.exports = authMiddleware