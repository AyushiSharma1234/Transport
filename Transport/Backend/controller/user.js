const jwt = require('jsonwebtoken');
const User = require('../model/user.js')
const bcrypt = require('bcrypt')

const EXPIRE_TIME_IN_MINS = 60 * 60 * 1000;

const getError = (errorObj) => {
    const errors = { name: '', email: '', password: '', phone: '' }
    if (errorObj.message.includes('user validation failed')) {
        Object.values(errorObj.errors).map((err) => {
            errors[err.path] = err.properties.message
        })
    }
    if (errorObj.message.includes('duplicate key error')) {
        errors.email = 'Email already existed'
    }
    return errors;
};

const CREATE_USER = async (req, res) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword })
    if (!newUser) {
        res.json({ success: false, result: "User hasn't been created" })
    }
    try {
        await newUser.save();
        res.json({
            success: true, result: "User has been created"
        })
    } catch (error) {
        const err = getError(error)
        res.json({ success: false, result: err })
    }
}

const LOG_IN = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }, 'name email password isAdmin')
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin,name:user.name }, process.env.SECRET_STRING, { expiresIn: '1w' });
            res.cookie('jwt', token, { expiresIn: 24 * EXPIRE_TIME_IN_MINS });
            return res.status(200).json({ success: true, result: "Logged in successfully!" })
        } else {
            return res.status(403).json({ success: false, result: 'Incorrect password or username' })
        }
    } catch (error) {
        res.json({ success: false, result: error })
    }
}

const LOG_OUT = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).send('User has been logged out')
    } catch (error) {
        res.json({ success: false, result: error })
    }
}

module.exports = {
    CREATE_USER, LOG_IN, LOG_OUT
}