const express = require("express")
const { CREATE_USER } = require("../controller/user")
const router = express.Router()

router.post('/signUp',CREATE_USER)

module.exports=router