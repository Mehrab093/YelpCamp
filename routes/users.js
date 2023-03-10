const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');
const user = require('../models/user');

router.route('/register')
        .get(users.renderRegister)
        .post(catchAsync(users.newRegister))

router.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local' ,{ keepSessionInfo: true, failureFlash: true, failureRedirect: '/login' } ), users.login)

router.get('/logout', users.logout);

module.exports = router;