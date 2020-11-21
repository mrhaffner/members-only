const express = require('express');
const router = express.Router();
const controller = require('../controller')

router.get('/', controller.index);

router.get('/login', controller.login_get);

router.post('/login', controller.login_post);

router.get('/signup', controller.signup_get);

router.post('/signup', controller.signup_post);

router.get('/membership', controller.membership_get);

router.post('/membership', controller.membership_post);

router.get('/create', controller.create_get);

router.post('/create', controller.create_post);

router.get('/message/:id/delete', controller.delete_get);

router.post('/message/:id/delete', controller.delete_post);

module.exports = router;
