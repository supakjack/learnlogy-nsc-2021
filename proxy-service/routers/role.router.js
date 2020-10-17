const express = require('express')
const router = express.Router()
const roleController = require('../controllers/role.controller')

router.get('/', roleController.get)
router.post('/', roleController.add)

module.exports = router
