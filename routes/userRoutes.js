const express = require('express')
const router = express.Router()
//const path = require('path')

const userController = require('../controllers/userController')

router.post('/users', userController.registerUser);

module.exports = router;