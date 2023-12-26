const Booking = require("../model/booking")
const geolib = require('geolib');
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const bookingVerificationMail = require("../utils/sendBookingVerificatoinMail");
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

const GET_QUOTE = async (req, res) => {
    const totalAmout = calculateAmount();
    res.json({ success: true, totalAmout })
}

const CREATE_BOOKING = async (req, res) => {
    let { id } = getUser(req.cookies.jwt);
    if(!id){
        res.status(403).json({sucess:false,result:"User is not authenticated"})
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
        verified: false
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
        const booking = await Booking.findOneAndUpdate({_id:req.params.id}, { verified: true }, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, result: 'Booking not found!' })
        }
        console.log('asdfadsfasd',booking._id);
        const user=await User.findOneAndUpdate({ _id: id }, { $push: { Booking:booking._id } })
        console.log(user);
        res.status(200).json({ success: true, result: 'Booking confirmed' })
    } catch (error) {
        res.status(400).json({ success: false, error:'Something went wrong' })
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

module.exports = {
    CREATE_BOOKING,
    GET_QUOTE,
    CONFIRM_BOOKING,
    DELIVERED,
    BOOKING_VERIFICATION
}