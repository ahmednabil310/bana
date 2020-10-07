const express = require('express');
const router = new express.Router();
const sendMail = require('../mail/sendMail');
const _ = require('lodash')
var generator = require('generate-password');
//auth
const memberAuth = require('../middleware/memberAuth');
const adminAuth = require('../middleware/adminAuth');
//models
const User = require('../Models/userModel')
const Recipe = require('../Models/recipeModel');
const Video = require('../Models/videosModel');

//Rout for creating a User (Signing Up a user)
router.post('/users/emailsignup', async (req, res) => {
    //expected data => {email, password, name}
    const data = req.body;
    data.signupMethod = 'email';
    data.activated = false;
    data.image = '/static/media/default-profile-picture.96f6bf15.png';
    const user = new User(data);
    try {
        await user.save();
        const token = await user.generateToken();
        await user.save();

        // const mailData = {
        //     email: user.email,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     link: `${process.env.BASEURL}/activation?token=${token}`
        // }
        // sendMail.activationEmail(mailData)

        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

//check for existing email
router.post('/users/checkEmail', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({ message: 'Email is available' })
        }
        res.send({ message: 'Email is Taken' })
    } catch (error) {
        res.send({ error: error.message });
    }
})

//Rout for creating a User with linkedin
router.post('/users/linkedinsignup', async (req, res) => {
    const data = req.body;
    data.signupMethod = 'linkedin';

    var password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        strict: true
    });

    data.password = password;

    const user = new User(data);

    try {
        await user.save();
        const token = await user.generateToken();
        await user.save();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

//logging in the users
router.post('/users/emailLogin', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateToken();
        await user.save();

        res.send({ user, token }); //sending the user + the generated token + the populated favorites

    } catch (error) {
        res.send({ error: error.message })
    }
})

//activating account
router.post('/activateaccount', memberAuth, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { activated: true } }, { new: true, useFindAndModify: false });
        const token = await updatedUser.generateToken();

        res.send({ user: updatedUser, token });
    } catch (error) {
        res.send({ error: error.message });
    }
})

//getting user profile
router.get('/users/profile', memberAuth, (req, res) => {
    res.send(req.user);
})

//logging out user
router.post('/users/logout', memberAuth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

//not authinticated route to get user data ( public data )
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) res.status(404).send()

        res.send(_.pick(user, 'firstName', 'lastName', 'image'))

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//route to update profile data
router.post('/updateprofile', memberAuth, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true, useFindAndModify: false })
        res.send(updatedUser)
    } catch (error) {
        res.status(500).send();
    }
})

//route to get all users (without the requester)
router.get('/users', adminAuth, async (req, res) => {
    const { filter } = req.query;
    const requesterId = req.user.id;

    let match;
    if (filter === 'pending') match = { _id: { $ne: requesterId }, activated: false };
    else if (filter === 'approved') match = { _id: { $ne: requesterId }, activated: true };
    else if (filter === 'admins') match = { _id: { $ne: requesterId }, userRole: 'admin' };
    else match = { _id: { $ne: requesterId } };

    try {
        const users = await User.find(match);
        res.send(users)
    } catch (error) {
        res.send({ error: error.message })
    }
})

//route to toggle admin role
router.post('/users/admin', adminAuth, async (req, res) => {
    const { userId, admin } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { userRole: admin ? 'admin' : 'member' }, { new: true, useFindAndModify: false })
        res.send(updatedUser)
    } catch (error) {
        res.send({ error: error.message })
    }
})

//route to delete a user and all his recipes and videos
router.delete('/users', adminAuth, async (req, res) => {
    const { userId } = req.body;

    try {
        //1. deleting all recipes for that user
        const deletedVideos = await Video.deleteMany({ owner: userId })
        //2. deleting all videos for that user
        const deletedRecipes = await Recipe.deleteMany({ owner: userId })
        //3.deleting the user from the database
        const deletedUser = await User.deleteOne({ _id: userId })

        res.send({ deletedUser, deletedRecipes, deletedVideos });
    } catch (error) {
        res.send({ error: error.message })
    }
})

//route to approve a user given his id
router.post('/users/approve', adminAuth, async (req, res) => {
    const { userId } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { activated: true }, { new: true, useFindAndModify: false });
        res.send(updatedUser);
    } catch (error) {
        res.send({ error: error.message })
    }
})

module.exports = router;
