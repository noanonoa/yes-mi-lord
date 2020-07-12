//REQUIRE EXPRESS
const express = require('express');
//IMPORT ROUTER
const router = express.Router();
//IMPORT DB
const db = require('../models');
//IMPORT MIDDLEWARE
const flash = require('connect-flash');
//REQUIRE PASSPORT CONFIG FILE PATH
const passport = require('../config/ppConfig');

//REGISTER GET ROUTE
router.get('/register', function(req, res) {
    res.render('index');
})
//REGISTER POST ROUTE
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, 
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // IF USER WAS CREATED
        if (created) {
            // AUTHENTICATE USER AND START AUTHORIZATION PROCESS
            console.log("User created! 🙌🏼🙌🏼🙌🏼");
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Thanks for signing up!'
            })(req, res);
            // ELSE IF USER ALREADY EXISTS
        } else {
            console.log('User email already exists 🚫🚫🚫🚫🚫🚫');
            req.flash('error', 'Email already exists. Please try again.');
            res.redirect('/auth/register');
        }
    }).catch(function(err) {
        console.log('Error found 🔥🔥🔥🔥🔥\nPlease review' + err.message)
        console.log(err);
        // SEND ERROR USER THAT EMAIL ALREADY EXISTS
            req.flash('error', err.message);
            // REDIRECT BACK TO REGISTER GET ROUTE 
        res.redirect('/auth/register');
    })
})

//LOGIN GET ROUTE
router.get('/login', function(req, res) {
    res.render('auth/login');
})
//LOGIN POST ROUTE
//TODO: PASS next param TO FUNCTION
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        // IF NO USER AUTHENTICATED
        if (!user) {
            req.flash('error', 'Invalid email or password');
            console.log(`💩butts`)
            return res.redirect('/auth/login');
        }
        if (error) {
            return next(error);
        }

        req.login(user, function(error) {
            //IF ERROR MOVE TO ERROR
            if (error) next(error);
            //IF SUCCESS FLASH SUCCESS MESSAGE
            req.flash('success', 'You are validated and logged in.')
            //IF SUCCESS SAVE SESSION AND REDIRECT USER
            req.session.save(function () {
                return res.redirect('/profile');
            })
        })
    })(req, res, next);
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//export router
module.exports = router;