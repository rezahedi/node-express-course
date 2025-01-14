require('dotenv').config();
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Username or password is missing!')
  }

  // Create a fake login
  const id = new Date().getTime()

  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  )

  res.status(200).json({message: 'User created', token})
}

const dashboard = async (req, res) => {
  const { username, id } = req.user
  
  const luckyNumber = Math.floor( Math.random() * 100 )
  res.status(200).json({
    msg: `Hello ${username}!`,
    secret: `Here is your lucky number: ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}