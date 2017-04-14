'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.body.url;

  request(url, function (error, response, body) {
    res.send(response.body);
  });

}

let getDataToSort = function(dataToAnalyse){
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

  return dataToReturn;
};

let sortData = function(dataToSort){
  let dataToShow = {"darkGreen": 0, "lightGreen": 0, "yellow": 0, "orange": 0, "red": 0};
  for (let point of dataToSort) {
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

  return dataToShow;
};

let convertDataToPercent = function(dataToConvert){
  let shapeAreaTotal = 0;
  console.log(dataToConvert);
  for(let key in dataToConvert){
    shapeAreaTotal += dataToConvert[key];
  }

  for(let key in dataToConvert){
    dataToConvert[key] = ((dataToConvert[key]/shapeAreaTotal) * 100).toFixed(2);
  }
  return dataToConvert;
};

export function proxyMapInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response, body) {

    let dataToAnalyse = response.body;

    try{
      dataToAnalyse = JSON.parse(dataToAnalyse);

      let dataToSort = getDataToSort(dataToAnalyse);
      let sortedData = sortData(dataToSort);
      let convertedData = convertDataToPercent(sortedData);
      res.send(convertedData);
    }
    catch(err){
      res.status(500).send(err);
    }

  });
}

export function proxyTownInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response, body) {
    console.log(response);
  });
}
