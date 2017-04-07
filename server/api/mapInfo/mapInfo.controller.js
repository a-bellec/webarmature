'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.query.url;

  console.log(url);

  request(url, function (error, response, body) {
    res.send(response);
  });

}

export function proxyMapInfo(req, res){

}

