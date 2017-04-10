'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.query.url;

  request(url, function (error, response, body) {
    res.send(response.body);
  });

}

export function proxyMapInfo(req, res){
  let url = req.query.url;

  request(url, function (error, response, body) {

    let dataToAnalyse = response.body;
    dataToAnalyse = JSON.parse(dataToAnalyse);
    let features = dataToAnalyse.features;

    let total = 0;
    let numberOfValidFeatures = 0;

    for( let i=0; i < features.length; i++){
      let percentageToCheck = features[i].properties.percent_a;

      if(percentageToCheck >= 0 && percentageToCheck <= 100){
        total += percentageToCheck;
        numberOfValidFeatures++;
      }
    }
    res.send((total/numberOfValidFeatures).toString());

  });

}

export function proxyTownInfo(req, res){
  let url = req.query.url;

  request(url, function (error, response, body) {
    console.log(response);
  });
}
