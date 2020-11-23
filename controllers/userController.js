const { body, validationResult } = require('express-validator');
const passport = require('passport');

const Message = require('../models/message');
const User = require('../models/user');

exports.login_get = function(req, res, next) {
    res.render('log_in_form', { title: 'Please Login' });
};

// exports.login_post = function(req, res, next) {
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/log-in'
//     })
// };

// exports.logout_post = function(req, res, next) {
//     res.send('NOT IMPLEMENTED');
// }

exports.signup_get = function(req, res, next) {
    res.render('sign_up_form', { title: 'Sign Up Form' });
};

exports.signup_post = [
    body('first_name', 'First name must be specified').trim().isLength({ max: 15 }).escape(),
    body('last_name', 'Last name must be specified').trim().isLength({ max: 20 }).escape(),
    body('username', 'User name must be specified').trim().isLength({ max: 12 }).escape(),
    body('password', 'Password must be specified').trim().isLength({ min: 8, max: 20 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const user = new User(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            }
        );
        if (!errors.isEmpty()) {
            res.render('sign_up_form', { title: 'Sign Up Form', errors: errors.array(), user: user})
            return;
        } else {
            user.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/')
            });
        }
    }
];

exports.membership_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};

exports.membership_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};
