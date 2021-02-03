// GET Sign-up Page
function signup_get ( req, res ) {
    res.render('signup');
};

// GET Login Page
function login_get ( req, res ) {
    res.render('login');
};

// POST Sign-up Form Action
function signup_post ( req, res ) {
    const { email, password } = req.body;
    

    res.send('signup operation');
};

// POST Login form action at Login form page
function login_post ( req, res ) {
    const { email, password } = req.body;
    
    res.send('login operation')
}

module.exports = {
    signup_get, 
    login_get,
    signup_post,
    login_post
}