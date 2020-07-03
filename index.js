//REQUIRED NPM LIBRARIES
//CONFIGURE dotenv
require('dotenv').config();
//REQUIRE express AND SETUP AND express app INSTANCE
const Express = require('express');
//REQUIRE AND SET view engine USE ejs
const ejsLayouts = require('express-ejs-layouts');
//REQUIRE ALL MIDDLEWARE FOR APP/AUTHENTICATION
// helmet, morgan, passport, AND CUSTOM MIDDLEWARE, express-sessions, sequelize sessions, flash
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
//ADD A LINK TO OUR CUSTOMER MIDDLEWARE FOR isLoggedIn
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


//APP SETUP
const app = Express();
//SET app TO USE false urlencoding
app.use(Express.urlencoded({ extended: false }));
//SET app public directory FOR USE
app.use(Express.static(__dirname + '/public'));
//SET app ejs layouts FOR RENDER
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

//CREATE NEW INSTANCE OF CLASS Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

//INITIALIZE AND LINK flash MESSAGE AND passport AND session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})


//ROUTES
app.get('/', function(req, res) {
//CHECK TO SEE IF USER LOGGED IN
    res.render('index');
})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
})


//INCLUDE AUTH CONTROLLER
app.use('/auth', require('./controllers/auth'));



//INITIALIZE app ON PORT
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️☕️☕️`)
});