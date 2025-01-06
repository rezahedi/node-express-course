const { login, dashboard } = require('../controllers/main')
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router()
router.route('/login').post(login)
router.route('/dashboard').get(authMiddleware, dashboard)

module.exports = router