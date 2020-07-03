// IMPORT NECESSARY LIBRARIES AND MODULES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');


//SERIALIZE USER
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});


//DESERIALIZED VERSION
passport.deserializeUser(function(id, callback) {
    db.user.findByPk(id).then(function(user) {
        callback(null, user);
    }).catch(callback);
});


//PASSWORD LOCAL CONFIG
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, 
    function(email, password, callback) {
        db.user.findOne({ where: { email }}).then(function(user) {
            if (!user || !user.validPassword(password)) {
                callback(null, false);
            } else {
                callback(null, user);
            }
        }).catch(callback);
    })
);


module.exports = passport;
