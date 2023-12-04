const User = require('../model/user.js')
const bcrypt = require('bcrypt')


const CREATE_USER = async (req, res) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword })
    if (!newUser) {
        res.json({ success: false, result: "User hasn't been created" })
    }
    try {
        const user = await newUser.save();
        res.json({ success: true, result: user })
    } catch (error) {
        res.json({ success: false, result: error })
    }
}

const LOG_IN = async (req, res) => {
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.send('User not found')
        }
        const isVerified = bcrypt.compareSync(req.body.password, user.password);
        

        res.json({ success: true, result: user })
    } catch (error) {
        res.json({ success: false, result: error })
    }
}

module.exports = {
    CREATE_USER
}