const router = require('express').Router()
const AuthController = require('../controllers/auth')
const { sendSuccess } = require('../utils/middlewares')

router.get('/facebook', 
    AuthController.facebook,
)

router.get('/facebook/callback', 
    AuthController.facebookCallback,
    sendSuccess
)

module.exports = router