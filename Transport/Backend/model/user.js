const mongoose= require('mongoose')
const validator=require('validator')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        validate:[(value)=>validator.isEmail(value),'Email is not valid']
    },
    phone: {
        type: String,
        required: [true, 'Phone no. is required'],
        unique: true,
        validate: [(value) => validator.isMobilePhone(value), 'en-IN', 'Phone no. is not valid']
    },
    address: {
        type: String
    },
    password:{
        type:String,
        required: [true, 'Please set password']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User