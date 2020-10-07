// This file defines the mongoose model for CyberSecurity Data
const mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    activated: {
        type: Boolean,
        default: false,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    userRole: {
        type: String,
        default: 'member',
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
});

//function to run every time a user object is sent in a request response
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

//document function to generate a Token to be
userSchema.methods.generateToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '100 days' });
    const cryptedToken = await CryptoJS.AES.encrypt(token, process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({ token: cryptedToken });
    await user.save();

    return cryptedToken.toString();
}

//Model function to fetch a user with a given credentials
userSchema.statics.findByCredentials = async (email, password) => {
    email = email.toLowerCase();

    //checking if there is a user with the given email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to Login')
    }

    if (!user.activated) {
        throw new Error('Please activate your account')
    }

    return user;
}

//a document middleware that hashes the passwred befor saving in the database
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;