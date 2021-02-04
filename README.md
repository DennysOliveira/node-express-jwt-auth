# A JWT Authenticated Node Express Application

Simple web-page made with Node and Express with MVC principles.  
The user is able to sign-up a new account and login to see the "Recipes" page.  
User credentials are stored in a NoSQL MongoDB database with hashed passwords using BCrypt.  
Session is kept with JWT tokens and authenticated in every request that needs it with middleware.  

### Dependencies
Node, Express, EJS, JsonWebTokens, BCrypt.
