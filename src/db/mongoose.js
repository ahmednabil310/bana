//This file is used only for connecting to the database

const mongoose = require('mongoose');

//connect to the databse
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });