const Booking = require("../model/booking")
const geolib = require('geolib');
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const bookingVerificationMail = require("../mail/sendBookingVerificatoinMail");
const getUser = require("../utils/getUser");

const getError = (errorObj) => {
    console.log(errorObj);
    const errors = { cordinates: '', address: '' }
    if (errorObj.message.includes('booking validation failed')) {
        Object.values(errorObj.errors).map((err) => {
            errors[err.path] = err.properties.message
        })
    }
    return errors;
};

const calculateAmount = (origion, destination) => {
    const ratePerKm = 5;

    const distanceInMeters = geolib.getDistance(
        { latitude: origion.latitude, longitude: origion.longitude },
        { latitude: destination.latitude, longitude: destination.longitude }
    );

    const distanceInKm = geolib.convertDistance(distanceInMeters, 'km');
    const amoutToPay = distanceInKm * ratePerKm;
    return amoutToPay;
}

const GET_BOOKINGS = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', '-OTP -isAdmin -password')
        if (!bookings) {
            return res.status(200).json({ success: false, result: 'No Bookings' })
        }
        return res.status(200).json({ success: true, result: bookings })
    } catch (error) {
        res.status(400).json({ success: false, result: error })
    }
}

const GET_QUOTE = async (req, res) => {
    const totalAmout = calculateAmount();
    res.json({ success: true, totalAmout })
}

const CREATE_BOOKING = async (req, res) => {
    let { id } = getUser(req.cookies.jwt);
    if (!id) {
        res.status(403).json({ sucess: false, result: "User is not authenticated" })
    }
    const { name, email } = await User.findById(id).select('name email');
    const { origion, destination } = req.body.coordinates
    const { address } = req.body;
    const totalAmout = calculateAmount(origion, destination);
    const newBooking = new Booking({
        coordinates: {
            origion,
            destination
        },
        address,
        amount: totalAmout,
        paymentStatus: false,
        verified: false,
        user: id
    });
    try {
        const newBookingObj = await newBooking.save();
        bookingVerificationMail(name, email, newBooking._id)
        res.status(200).json({ success: true, result: 'Mail has been sent to your ', email, name })

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

const BOOKING_VERIFICATION = async (req, res) => {
    let { id } = getUser(req.cookies.jwt);
    try {
        const booking = await Booking.findOneAndUpdate({ _id: req.params.id }, { verified: true }, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, result: 'Booking not found!' })
        }
        const user = await User.findOneAndUpdate({ _id: id }, { $push: { Booking: booking._id } })
        res.status(200).json({ success: true, result: 'Booking confirmed' })
    } catch (error) {
        res.status(400).json({ success: false, error: 'Something went wrong' })
    }
}

const CONFIRM_BOOKING = async (req, res) => {
    try {
        await Booking.findOneAndUpdate(req.params.id, { status: 'On the way' })
        res.status(200).json({ success: true, result: 'Shipped' })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

const DELIVERED = async () => {
    try {
        await Booking.findOneAndUpdate(req.params.id, { status: 'Completed' })
        res.status(200).json({ success: true, result: 'Delivered' })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

const AWAITING_PAYMENT = async (req, res) => {
    try {
        const awaitingBookings = await Booking.find({ paymentStatus: false })
        const totalAwaitingAmount = await Booking.aggregate([{ $match: { paymentStatus: false } },
        { $group: { _id: 'totalAmount', totalAmount: { $sum: "$amount" } } }]
        )
        res.status(200).json({ success: true, result: { awaitingBookings, awaitingTotalAmount: totalAwaitingAmount[0].totalAmount } })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

const BOOKING_WITH_FILTER = async (req, res) => {
    try {
        const paymentStatusToBeSearch = req.params.paymentStatus;
        if (paymentStatusToBeSearch != 'awaiting' && paymentStatusToBeSearch != 'fulfilled') {
            return res.status(200).json({ success: false, result: 'Payment status either be awaiting or fulfilled' })
        }
        const paymentStatus = paymentStatusToBeSearch === 'awaiting' ? false : true
        const Bookings = await Booking.aggregate([{ $match: { paymentStatus } }])
        res.status(200).json({ success: true, result: Bookings })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

module.exports = {
    CREATE_BOOKING,
    GET_QUOTE,
    CONFIRM_BOOKING,
    DELIVERED,
    BOOKING_VERIFICATION,
    GET_BOOKINGS,
    AWAITING_PAYMENT,
    BOOKING_WITH_FILTER
}