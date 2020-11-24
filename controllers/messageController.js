//const { body, validationResult } = require('express-validator')
//probably need to install this - do I need it?
const Message = require('../models/message');
const User = require('../models/user');

exports.index = function(req, res, next) {
    Message.find({}, 'title text date author')
        .populate('author')
        .exec(function(err, list_messages) {
            if (err) {return next(err); }
            res.render('index', { title: 'Members Only', message_list: list_messages, user: req.user });
        })
};

exports.create_get = function(req, res, next) {
    res.render('message_form', { title: 'Create New Message', user: req.user})
};

exports.create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};

exports.delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};

exports.delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};
