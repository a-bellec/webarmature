'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.query.url;

  request(url, function (error, response, body) {
    res.send(response);
  });

}

export function proxyMapInfo(req, res){
  let url = req.query.url;

  request(url, function (error, response, body) {
    let dataToAnalyse = response.body;
    dataToAnalyse = JSON.parse(dataToAnalyse);
    let features = dataToAnalyse.features;

    let total = 0;
    for( var i=0; i < features.length; i++){
      total += features[i].properties.percent_a;
    }
    res.send((total/features.length).toString());
  });
}

export function proxyTownInfo(req, res){

  request(url, function (error, response, body) {

  });
}

let getTownBoundingBox = function(town){

};

