const express = require('express');
const router = express.Router();
const msg_controller = require('../controllers/messageController')
const user_controller = require('../controllers/userController')

router.get('/', msg_controller.index);

router.get('/log-in', user_controller.login_get);

router.get('/sign-up', user_controller.signup_get);

router.post('/sign-up', user_controller.signup_post);

router.get('/membership', user_controller.membership_get);

router.post('/membership', user_controller.membership_post);

router.get('/create', msg_controller.create_get);

router.post('/create', msg_controller.create_post);

router.post('/delete', msg_controller.delete_post);

module.exports = router;