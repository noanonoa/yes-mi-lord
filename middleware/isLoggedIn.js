//WRITE A FUNCTION WE ARE GOING TO USE AS MIDDLEWARE
module.exports = function(req, res, next) {
    //CHECK AND SEE IF WE HAVE A USER VARIABLE SET
    //IF WE DO WE WILL ALLOW OUR APP TO CARRY ON
    if (!req.user) {
        req.flash('error', 'You must be logged in to view this page.');
        res.redirect('/auth/login');
    } else {
        next();
    }
};
//BUT IF WE DON'T WE WILL LET USER KNOW THEY HAVE TO BE LOGGED IN TO ACCESS
//REDIRECT USER TO /auth/login