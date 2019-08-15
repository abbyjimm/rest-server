const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let validRole = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid'
}

let user = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRole
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//toJSON will be to modify to delete password - this method is calling when show the information of schema
user.methods.toJSON = function() {
    let userData = this;
    let userObject = userData.toObject();
    delete userObject.password;

    return userObject;
}

user.plugin(uniqueValidator, { message: '{PATH} should be unique' });

module.exports = mongoose.model('User', user);