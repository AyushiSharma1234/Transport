const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.send(403).json({ success: false, result: 'User is unauthorized' })
    }
    jwt.verify(token, process.env.SECRET_STRING, async (err, decode) => {

        if (err) {
            return res.send(403).json({ success: false, result: 'User is unauthorized' })
        } else {
            const user = await User.findById(decode.id);
            if (!user) {
                return res.send(403).json({ success: false, result: 'User is unauthorized' })
            } next();
        }
    })
}

const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.send(403).json({ success: false, result: 'User is unauthorized' })
    }
    jwt.verify(token, process.env.SECRET_STRING, async (err, decode) => {
        console.log(decode);
        if (err) {
            return res.send(403).json({ success: false, result: 'User is unauthorized' })
        } else {
            const user = await User.findById(decode.id);
            console.log(user,decode.admin);
            if (user && decode.admin === true) {
                next();
            } else {
                return res.send(403).json({ success: false, result: 'User is unauthorized' })
            }
        }
    })
}

module.exports = { auth, isAdmin }