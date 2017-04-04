'use strict';

var express = require('express');
var controller = require('./mail.controller');

var router = express.Router();

router.post('/contact', controller.contactMail);

module.exports = router;
