const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { verifyAccessToken } = require('./../helpers/jwt_helper')

router.post('/login', userController.login)
router.post('/logout', verifyAccessToken, userController.logout)
router.post('/register', userController.register)
router.post('/refresh-token', verifyAccessToken, userController.refreshToken)

module.exports = router
