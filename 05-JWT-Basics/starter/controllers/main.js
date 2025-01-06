require('dotenv').config();
const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Username or password is missing!', 400)
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
  const authorizationHeader = req.headers.authorization

  if ( !authorizationHeader || !authorizationHeader.startsWith('Bearer ') ) {
    throw new CustomAPIError('Authorization token not provided!', 401)
  }

  const token = authorizationHeader.split(' ')[1]
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor( Math.random() * 100 )
    res.status(200).json({
      msg: `Hello ${decoded.username}!`,
      secret: `Here is your lucky number: ${luckyNumber}`,
    })

  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route!', 401)
  }
  
}

module.exports = {
  login,
  dashboard,
}