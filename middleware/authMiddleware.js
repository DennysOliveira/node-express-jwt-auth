const jwt = require('jsonwebtoken');
const User = require('../models/User');

var tempRedirected = false;

function requireAuth ( req, res, next ){
    const token = req.cookies.jwt;

    // checks JWT exists
    if (token) { // if it exists, check for JWT authenticity
        jwt.verify(token, process.env.JWT_SECRET, ( err, decodedToken ) => {
            if (err) { // if it fails verification
                tempRedirected = true;
                
                console.log(err.message);
                res.redirect('/login');
            } else { // passes verification successfully a.k.a. correctly authenticated
                tempRedirected = false;
                console.log(decodedToken);
                next();
            }
        })
    } else { // if JWT is non-existence aka user not logged in
        tempRedirected = true;
        res.redirect('/login');
    }
};

// check current user 
function checkUser ( req, res, next ) {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async ( err, decodedToken ) => {
            if (err) {
                if (tempRedirected) {
                    res.locals.redirected = true;
                }
                tempRedirected = false;

                console.log(err.message);
                res.locals.user = null;
                next();
            } else { // If the user exists and it's auth token is verified correctly
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        if (tempRedirected) {
            res.locals.redirected = true;
        }
        tempRedirected = false;
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
};