const { login, dashboard } = require('../controllers/main')
const express = require('express')

const router = express.Router()
router.route('/login').post(login)
router.route('/dashboard').get(dashboard)

module.exports = router