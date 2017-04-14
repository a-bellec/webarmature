'use strict';

var express = require('express');
var controller = require('./mapInfo.controller');

var router = express.Router();

router.post('/pointInfo', controller.proxyPointInfo);
router.post('/town', controller.proxyTownInfo);
router.post('/', controller.proxyMapInfo);

module.exports = router;
