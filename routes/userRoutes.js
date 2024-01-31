const express = require('express');
const router = express.Router()
const {login , register, currentUser} = require('../controllers/UserController')
const validateToken = require('../middleware/ValidateTokenHandler')


router.post('/register',register)

router.post('/login', login)

router.get('/current', validateToken, currentUser)





module.exports = router