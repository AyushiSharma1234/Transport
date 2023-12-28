const express = require("express")
const { CREATE_USER, LOG_IN, LOG_OUT, FORGET_PASSWORD, VERIFY_FORGET_PASSWORD_OTP } = require("../controller/user")
const {auth,isAdmin} = require("../middleware/autheMiddleware")
const router = express.Router()

router.post('/signUp',CREATE_USER)
router.get('/forget-password',FORGET_PASSWORD)
router.put('/verify-otp', VERIFY_FORGET_PASSWORD_OTP)
router.post('/login', LOG_IN)
router.get('/logout', LOG_OUT)

module.exports=router