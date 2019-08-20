require('./config/config');
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Enable the access to public folder
app.use(express.static(path.resolve(__dirname, '../public')));

//Global configuration of routes
app.use(require('./routes/index'));

//Connecting to MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('data base online');
});
mongoose.set('useCreateIndex', true)
app.listen(process.env.PORT, () => {
    console.log('Listen port:', process.env.PORT);
})