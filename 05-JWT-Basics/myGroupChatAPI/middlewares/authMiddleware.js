const authMiddleware = (req, res, next) => {
  // TODO: Check the JWT token and authenticate the user
  console.log('authMiddleware is here')
  next()
}

module.exports = authMiddleware