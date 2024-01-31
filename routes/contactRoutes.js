const express = require('express')
const router = express.Router()
const { getContact , deleteContact,createContact, getContacts, updateContact} = require('../controllers/ContactController')
const validateToken = require('../middleware/ValidateTokenHandler')


router.use(validateToken)
router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)



module.exports = router 


