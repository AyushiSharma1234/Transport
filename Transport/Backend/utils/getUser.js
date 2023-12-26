const jwt = require("jsonwebtoken");
const User = require("../model/user");

const getUser = (token) => {
    let user={
        id:null,
        name:null
    };
    if (!token) {
        return user
    }
    jwt.verify(token, process.env.SECRET_STRING, async (err, decode) => {
        if (err) {
            user= null
        } else {
            user={id:decode.id,name:decode.name}
        }
    })
    return user;
}

module.exports = getUser;