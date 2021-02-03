const User = require('../models/User')

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
        res.status(201).json(user)
    }
    catch ( err ) {
        res.status(400).send(err);
    }
};

// POST Login form action at Login form page
async function login_post ( req, res ) {
    const { email, password } = req.body;

    res.send('login operation')
}

module.exports = {
    signup_get, 
    login_get,
    signup_post,
    login_post
}