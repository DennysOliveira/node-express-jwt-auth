const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,        
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email format.']
    },
    password: {
        type: String,        
        required: [true, 'Password is required.'],
        minlength: [6, 'The password needs at least 6 characters.']
    },
});

const User = mongoose.model('user', userSchema);

module.exports = (
    User
);