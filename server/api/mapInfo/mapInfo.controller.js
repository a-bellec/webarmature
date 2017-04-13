'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.query.url;

  request(url, function (error, response, body) {
    res.send(response.body);
  });

}

export function proxyMapInfo(req, res) {
  let url = req.query.url;

  request(url, function (error, response, body) {

    let dataToAnalyse = response.body;
    dataToAnalyse = JSON.parse(dataToAnalyse);

    let features = dataToAnalyse.features;

    let dataToReturn = [];
    for (let i = 0; i < features.length; i++) {
      let itemToAdd = {"percentPermeable": 0, "shapeArea": 0};

      let percentageToCheck = features[i].properties.percent_aa;

      if (percentageToCheck >= 0 && percentageToCheck <= 100) {
        itemToAdd["percentPermeable"] = parseFloat(percentageToCheck.toFixed(2));
        itemToAdd["shapeArea"] = Math.round(features[i].properties.Shape_Area.toFixed(2));
        dataToReturn.push(itemToAdd);
      }
    }
    
    let dataToShow = {"darkGreen": 0, "lightGreen": 0, "yellow": 0, "orange": 0, "red": 0};
    for (let point of dataToReturn) {
      if (point.percentPermeable <= 20) {
        dataToShow.darkGreen += point.shapeArea;
      }
      else if (point.percentPermeable > 20 && point.percentPermeable <= 40) {
        dataToShow.lightGreen += point.shapeArea;
      }
      else if (point.percentPermeable > 40 && point.percentPermeable <= 60) {
        dataToShow.yellow += point.shapeArea;
      }
      else if (point.percentPermeable > 60 && point.percentPermeable <= 80) {
        dataToShow.orange += point.shapeArea;
      }
      else {
        dataToShow.red += point.shapeArea;
      }
    }

    res.send(dataToShow);

  });

}

export function proxyTownInfo(req, res) {
  let url = req.query.url;

  request(url, function (error, response, body) {
    console.log(response);
  });
}
