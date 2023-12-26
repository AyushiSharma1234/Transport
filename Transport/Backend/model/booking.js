const mongoose = require('mongoose')
const validator = require('validator')

const bookingSchema = mongoose.Schema({
    coordinates: { 
        type: {},
        required:true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: "On the way" | "pending" | "completed",
        default: null
    },
    amount:{
        type:Number,
        default:0
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    verified:{
        type:Boolean,
        default:false
    }
});

bookingSchema.virtual('id', {
    id: this.id
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking