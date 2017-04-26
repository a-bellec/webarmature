'use strict';

var express = require('express');
var controller = require('./mapInfo.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.post('/downloadInfo', auth.isAuthenticated(), controller.downloadMapInfo);
router.post('/pointInfo', controller.proxyPointInfo);
router.post('/town', controller.proxyTownInfo);
router.post('/', controller.proxyMapInfo);

module.exports = router;
