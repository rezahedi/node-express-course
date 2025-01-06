const { AuthenticationError, BadRequestError } = require('../errors')

const login = async (req, res) => {
  // TODO: Sign a JWT token to the user and send it back to the client for authentication purposes
  // To test the error handler
  throw new AuthenticationError('Test - AuthenticationError')
  res.send('login')
}

const dashboard = async (req, res) => {
  // To test the error handler
  throw new BadRequestError('Test - BadRequestError')
  res.send('dashboard')
}

module.exports = {
  login,
  dashboard,
}