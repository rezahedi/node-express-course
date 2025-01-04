const login = async (req, res) => {
  const { username, password } = req.body
  res.send(`Fake login route: username: ${username}, password: ${password}`)
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor( Math.random() * 100 )
  res.status(200).json({
    message: 'Hello Reza!',
    secret: `Here is your lucky number: ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}