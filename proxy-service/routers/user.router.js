const express = require('express')
const router = express.Router()
const testController = require('../controllers/user.controller')

router.post('/login', testController.login)
router.post('/logout', testController.logout)
router.post('/register', testController.regisster)
router.post('/refresh-token', testController.refreshToken)

module.exports = router
