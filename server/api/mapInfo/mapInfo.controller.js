'use strict';

var request = require('request');

export function proxyMapInfo(req, res) {

  let url = req.query.url;

  request(url, function (error, response, body) {
    res.send(response);
  });

}
