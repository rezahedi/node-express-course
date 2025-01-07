const { AuthenticationError, BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const messages = require('../models/messages')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Username or password not provided!')
  }

  // TODO: Check user/pass with the database
  const userDetails = { username }
  // TODO: If user not found in db, throw authentication error
  if(!userDetails) {
    throw new AuthenticationError('User not found!')
  }

  const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.status( StatusCodes.OK ).json({ message: 'User accessed', token })
}

const dashboard = async (req, res) => {
  const user = req.user
  // TODO: Get the data from the database and send back to the client
  res.send(`dashboard accessed by ${user.username}`)
}

// TODO: Create a post message route
const postMessage = async (req, res) => {
  const { username, message } = req.body

  if (!username || !message) {
    throw new BadRequestError('Username or message not provided!')
  }

  const result = await messages.create({
    username,
    message,
  })

  res.status( StatusCodes.OK ).json(result)
}

module.exports = {
  login,
  dashboard,
  postMessage,
}