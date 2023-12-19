const express = require("express")
const { CREATE_USER, LOG_IN, LOG_OUT } = require("../controller/user")
const {auth,isAdmin} = require("../middleware/autheMiddleware")
const router = express.Router()

router.post('/signUp',CREATE_USER)
router.post('/login', LOG_IN)
router.get('/logout', LOG_OUT)

module.exports=router