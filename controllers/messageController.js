const { body, validationResult } = require('express-validator')
//probably need to install this - do I need it?
const Message = require('/models/message');
const User = require('/models/user');

exports.index = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
};

exports.create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED');
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
