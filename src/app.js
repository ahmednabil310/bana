// Native Node Modules
const path = require('path');
const fs = require('fs');


// NPM Modules
const express = require('express');

// const sslRedirect = require('heroku-ssl-redirect');
const cors = require('cors')

// local file imports
require('./db/mongoose');
const imageUploadRoutes = require('./Routers/imageUploadRoutes');
const usersRoutes = require('./Routers/usersRoutes');
const recipeRoutes = require('./Routers/recipeRoutes');
const videosRoutes = require('./Routers/videosRoutes');
const ingredientsRoutes = require('./Routers/ingredientsRoutes');


const app = express();

const port = process.env.PORT;
const ReactPath = path.join(__dirname, '..', '/client/build');

// enable ssl redirect ( forcing https protocol )
// app.use(sslRedirect());


app.use(cors()); //cors origin issues
app.use(express.json()) //auto parse data (in req or res) to json

//server Static HTML (index.html)
app.use(express.static(ReactPath));

//Using the Routers defined in the routers dirctory
app.use(imageUploadRoutes);
app.use(usersRoutes);
app.use(recipeRoutes);
app.use(videosRoutes);
app.use(ingredientsRoutes);


// if user typed any undefined route will send the heml of the rect app to be handeled with react
app.get('*', (req, res) => {
    res.sendFile(ReactPath + '/index.html');
});

app.listen(port, () => {
    console.log('App started on port ' + port);
})