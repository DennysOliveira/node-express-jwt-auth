const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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

// Calls this function before the event - e.g. before the save event:
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Calls this function after the event - e.g. post the save event:
// userSchema.post('save', ( doc, next ) => {
//     console.log('new user was created and saved', doc)
//     next();
// })

const User = mongoose.model('user', userSchema);

module.exports = (
    User
);