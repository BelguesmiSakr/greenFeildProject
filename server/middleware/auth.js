const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { secret } = require("../config/settings");

module.exports = {
    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        // check json web token exists & verified
        if (token) {
            // if the token is verified, then execute the callback function in the 3rd parameter
            jwt.verify(token, secret, (err, decodedToken) => {
                // if there's an error, then redirect to login page
                if (err) res.redirect("/login");

                // else, call the next middleware
                next();
            });
            next();
        } else {
            res.status(401).json("you must login");
            // res.redirect("/login");
        }
    },
    checkUser: (req, res, next) => {
        const token = req.cookies?.jwt;
        if (token) {
            // if the token is verified, then execute the callback function in the 3rd parameter
            jwt.verify(token, secret, async (err, decodedToken) => {
                // if the token is not verified
                if (err) {
                    console.log(err.message);
                    res.locals.user = null; // to avoid the error "Cannot read properties of undefined (reading 'email')"
                    next();
                } else {
                    // here, we are sure that we have a user already logged in and its cookie is still alive
                    console.log(decodedToken);
                    let foundUser = await User.findById(decodedToken.id);
                    res.locals.user = foundUser;
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    },
};
