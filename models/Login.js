const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    fname: {
        type:String,
        required: true
    },
    lname: {
        type:String,
        required: true
    },
    contact: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Login', LoginSchema);