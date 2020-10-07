const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel')

const memberAuth = async (req, res, next) => {
    try {
        const encryptedToken = req.header('Authorization').replace('Bearer ', '');

        const bytes = CryptoJS.AES.decrypt(encryptedToken.toString(), process.env.SECRET_KEY);
        const token = bytes.toString(CryptoJS.enc.Utf8);

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': encryptedToken });

        if (!user) throw new Error();

        req.user = user;

        next();

    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
}

module.exports = memberAuth;