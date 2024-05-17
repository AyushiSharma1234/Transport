const express = require("express")
const { CREATE_BOOKING, GET_QUOTE, CONFIRM_BOOKING, DELIVERED, BOOKING_VERIFICATION, GET_BOOKINGS, AWAITING_PAYMENT, BOOKING_WITH_FILTER } = require("../controller/booking")
const { auth, isAdmin } = require("../middleware/autheMiddleware")
const router = express.Router()

// router.post('/signUp', CREATE_USER)
router.post('/', auth, CREATE_BOOKING)
router.get('/', auth, GET_BOOKINGS)
router.get('/get-quote', GET_QUOTE)
router.put('/confirm-booking', isAdmin, CONFIRM_BOOKING)
router.put('/delivered', auth, DELIVERED)
router.get('/verify-booking/:id', BOOKING_VERIFICATION)
router.get('/awaiting-payment', AWAITING_PAYMENT)
router.get('/filter-payment/:paymentStatus', BOOKING_WITH_FILTER)

module.exports = router