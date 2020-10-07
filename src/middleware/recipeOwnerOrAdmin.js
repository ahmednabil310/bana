const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Recipe = require('../Models/recipeModel');

const recipeOwnerOrAdmin = async (req, res, next) => {
    const { id } = req.params;

    try {
        const encryptedToken = req.header('Authorization').replace('Bearer ', '');

        const bytes = CryptoJS.AES.decrypt(encryptedToken.toString(), process.env.SECRET_KEY);
        const token = bytes.toString(CryptoJS.enc.Utf8);

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': encryptedToken });

        if (!user) throw new Error();

        const isAdmin = user.userRole === 'admin';
        const recipe = await Recipe.findOne({ _id: id });

        const isRecipeOwner = recipe._id.toString() === id;

        if (!(isAdmin || isRecipeOwner)) throw new Error();

        req.user = user;

        next();

    } catch (error) {
        console.log(error.message)
        res.status(401).send({ error: 'Please Authenticate' });
    }
}

module.exports = recipeOwnerOrAdmin;