require('./config/config');
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'));

//Connecting to MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('data base online');
});
mongoose.set('useCreateIndex', true)
app.listen(process.env.PORT, () => {
    console.log('Listen port:', process.env.PORT);
})