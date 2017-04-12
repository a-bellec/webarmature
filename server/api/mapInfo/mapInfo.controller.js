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
    try{
      dataToAnalyse = JSON.parse(dataToAnalyse);

      let features = dataToAnalyse.features;

      let dataToReturn = [];
      for( let i=0; i < features.length; i++){
        let percentageToCheck = features[i].properties.percent_aa;

        if(percentageToCheck >= 0 && percentageToCheck <= 100){
          dataToReturn.push(percentageToCheck.toFixed(2));
        }
      }

      res.send(dataToReturn.sort((a, b) => a - b));
    }
    catch(err){
      res.status(500).send(err);
    }

  });

}

export function proxyTownInfo(req, res){
  let url = req.query.url;

  request(url, function (error, response, body) {
    console.log(response);
  });
}
