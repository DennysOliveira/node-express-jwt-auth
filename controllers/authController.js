require('dotenv').config();
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { create } = require('../models/User');

// Auth Error Handler
function handleErrors ( err ) {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Duplicate Error Code
    if (err.code === 11000) {
        errors.email = 'That email is already registered.'
        return errors;
    }

    // Validation Errors
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
function createToken ( id ) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
}

// GET Sign-up Page
function signup_get ( req, res ) {
    res.render('signup');
};

// GET Login Page
function login_get ( req, res ) {
    res.render('login');
};

// POST Sign-up Form Action
async function signup_post ( req, res ) {
    const { email, password } = req.body;
    
    try {
        const user = await User.create({ email: email, password: password })
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        
        res.status(201).json({ user: user._id });
    }
    catch ( err ) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// POST Login form action at Login form page
async function login_post ( req, res ) {
    const { email, password } = req.body;

    try {
        const user = await User.login( email, password );
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        res.status(400).json({});
        console.log(err);
    }
}

module.exports = {
    signup_get, 
    login_get,
    signup_post,
    login_post
}