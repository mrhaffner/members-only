const { body, validationResult } = require('express-validator');
const passport = require('passport');

const Message = require('../models/message');
const User = require('../models/user');

const bcrypt = require('bcryptjs');

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
    body('password', 'Password must be specified').trim().escape(),
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashed) => {
    
            const errors = validationResult(req);
            const user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: hashed,
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
        })
    }
];

exports.membership_get = function(req, res, next) {
    res.render('membership', { user: req.user})
};

exports.membership_post = [
    body('member_status', 'Cannot be empty').isLength({ min: 1 }).escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('sign_up_form', { title: 'Sign Up Form', errors: errors.array(), user: user})
            return;
        } else if (req.body.member_status === 'password') {
            User.findByIdAndUpdate(res.locals.currentUser.id, { member_status: true },
                (err, data) => {
                    if (err) { return next(err); }
                    console.log(data, res.locals.currentUser.username)
                    res.redirect('/')
                }
            )
        } else if (req.body.member_status === 'penultimate') {
            User.findByIdAndUpdate(res.locals.currentUser.id, { admin_status: true, member_status: true },
                (err, data) => {
                    if (err) { return next(err); }
                    console.log(data, res.locals.currentUser.username)
                    res.redirect('/')
                }
            )
        }
    }
]