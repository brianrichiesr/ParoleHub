const jwt = require('jsonwebtoken');
// Run environmental variables
require('dotenv').config();

// Verifying the JWT (making sure the credentials from token are valid).
async function authenticateSupportToken(req, res, next, data='default') {
    // Get token from headers (client side)
    const authHeader = req.headers['authorization'];
    // Get the token by  splitting the token from Bearer <Token>
    const token = authHeader && authHeader.split(' ')[1];
    // Check to see if token exists
    if(!token) return res.sendStatus(401); // Unauthorized request
    // Else, check if token is valid
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // Create session for user
        const {id} = user;
        req.user = id;
        next(); // Proceed with the next operation
    });
}

module.exports = authenticateSupportToken;