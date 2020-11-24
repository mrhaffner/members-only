const { body, validationResult } = require('express-validator');
const message = require('../models/message');
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

exports.create_post = [
    body('title', 'Title must be specified').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const message = new Message(
            {
                title: req.body.text,
                text: req.body.text,
                author: req.user
            }
        );
        if (!errors.isEmpty()) {
            res.render('message_form', { title: 'Create New Message', user: req.user, errors: errors.array(), message: message })
        } else {
            message.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/')
            })
        }
    }
]

exports.delete_post = function(req, res, next) {
    Message.findByIdAndRemove(req.body.id, function deleteItem(err) {
        if (err) { return next(err); }
        res.redirect('/')
    })
};
