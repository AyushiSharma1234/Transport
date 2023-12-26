const express = require("express")
const { CREATE_BOOKING, GET_QUOTE, CONFIRM_BOOKING, DELIVERED, BOOKING_VERIFICATION } = require("../controller/booking")
const { auth, isAdmin } = require("../middleware/autheMiddleware")
const router = express.Router()

// router.post('/signUp', CREATE_USER)
router.post('/', CREATE_BOOKING)
router.get('/get-quote', GET_QUOTE)
router.put('/confirm-booking', CONFIRM_BOOKING)
router.put('/delivered', DELIVERED)
router.get('/verify-booking/:id', BOOKING_VERIFICATION)

module.exports = router