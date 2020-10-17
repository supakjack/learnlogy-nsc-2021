const express = require('express')
const router = express.Router()
const testController = require('./../controllers/test.controller')

router.get('/', testController.get)
router.post('/', testController.post)

module.exports = router
