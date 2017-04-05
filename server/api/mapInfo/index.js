'use strict';

var express = require('express');
var controller = require('./mapInfo.controller');

var router = express.Router();

router.get('/', controller.proxyMapInfo);

module.exports = router;
