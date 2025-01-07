const { AuthenticationError, BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const messages = require('../models/messages')
const users = require('../models/users')

const login = async (req, res) => {
  const { username } = req.body

  if (!username) {
    throw new BadRequestError('Username not provided!')
  }

  let userDetails = await users.findOne({ username }).select('id username')
  // If user does not exists, create it!
  if (!userDetails) {
    userDetails = await users.create({ username })
  }
  
  const payloadObject = {
    username: userDetails.username,
    id: userDetails._id
  }
  const token = jwt.sign(payloadObject, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.status( StatusCodes.OK ).json({ message: 'User accessed', token })
}

const dashboard = async (req, res) => {
  const user = req.user
  const data = await messages.find().select('username message createdAt').sort('createdAt')
  res.status( StatusCodes.OK ).json({ user, messages: data })
}

const postMessage = async (req, res) => {
  const user = req.user
  const { username, message } = req.body

  if ( !message ) {
    throw new BadRequestError('Message not provided!')
  }

  const result = await messages.create({
    username: user.username,
    message,
  })

  res.status( StatusCodes.OK ).json(result)
}

module.exports = {
  login,
  dashboard,
  postMessage,
}